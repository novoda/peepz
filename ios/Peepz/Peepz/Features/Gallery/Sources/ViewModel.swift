import Combine
import UIKit
import StorageClient
import Authentication

public class GalleryViewModel: ObservableObject {
    private let storageClient: StorageClient
    private let authenticationClient: AuthenticationClient
    private var cancellables = [AnyCancellable]()

    @Published var items = [GalleryItemViewState]()

    public init(storageClient: StorageClient, authenticationClient: AuthenticationClient) {
        self.storageClient = storageClient
        self.authenticationClient = authenticationClient

        self.storageClient.observeUsers
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

    public func signOut() {
        authenticationClient.signOut()
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

