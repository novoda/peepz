import Combine
import UIKit

public class PeepzModel: ObservableObject {
    private let galleryClient: GalleryClient
    private let authenticationClient: AuthenticationClient
    private var cancellables = [AnyCancellable]()
    
    @Published var isAuthenticated = false
    @Published var items = [GalleryItemViewState]()

    init(galleryClient: GalleryClient, authenticationClient: AuthenticationClient) {
        self.galleryClient = galleryClient
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
                    galleryClient.observe()
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
        PeepzModel(galleryClient: .live, authenticationClient: .live)
    }
}

extension PeepzModel {
    static var mock: PeepzModel {
        PeepzModel(galleryClient: .staticData, authenticationClient: .authenticated)
    }
}

private func toGalleryItemViewState(user: User) -> GalleryItemViewState {
    GalleryItemViewState(imageName: user.imageUrl,
                         location: user.location,
                         name: user.name,
                         isActive: user.isActive())
}
