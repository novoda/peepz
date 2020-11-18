import Combine
import UIKit
import StorageClient
import Authentication

public class PeepzModel: ObservableObject {
    private let galleryClient: StorageClient
    private let authenticationClient: AuthenticationClient
    private var cancellables = [AnyCancellable]()
    
    @Published var isAuthenticated = false
    @Published var items = [GalleryItemViewState]()

    init(storageClient: StorageClient, authenticationClient: AuthenticationClient) {
        self.galleryClient = storageClient
        self.authenticationClient = authenticationClient

        self.authenticationClient.authenticated
            .assign(to: \.isAuthenticated, on: self)
            .store(in: &cancellables)

        self.galleryClient.observeUsers
            .map { $0.sorted { $0.lastSeen > $1.lastSeen } }
            .map { $0.map(toGalleryItemViewState(user:)) }
            .assign(to: \.items, on: self)
            .store(in: &cancellables)

        self.authenticationClient.authenticated
            .sink { isAuthenticated in
                if isAuthenticated {
                    storageClient.observe()
                }
            }
            .store(in: &cancellables)
    }

    func restore(with vc: UIViewController) {
        authenticationClient.restore(vc)
    }

    func signOut() {
        authenticationClient.signOut()
    }
}


extension PeepzModel {
    static var live: PeepzModel {
        PeepzModel(storageClient: .staticData, authenticationClient: .authenticated)
    }
}

extension PeepzModel {
    static var mock: PeepzModel {
        PeepzModel(storageClient: .staticData, authenticationClient: .authenticated)
    }
}

private func toGalleryItemViewState(user: User) -> GalleryItemViewState {
    GalleryItemViewState(imageName: user.imageUrl,
                         location: user.location,
                         name: user.name,
                         isActive: user.isActive())
}

fileprivate extension User {
    func isActive(now: Date = Date()) -> Bool {
        let fifteenMinutes: Double = 60 * 15
        let lastSeenInMinutes = self.lastSeen * 0.001
        return now.timeIntervalSince1970 - lastSeenInMinutes < fifteenMinutes
    }
}
