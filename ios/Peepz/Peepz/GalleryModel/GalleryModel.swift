import Combine

public class GalleryModel: ObservableObject {
    private let galleryClient: GalleryClient
    private let authenticationClient: AuthenticationClient
    private var cancellables = [AnyCancellable]()
    
    @Published var isAuthenticated = false
    @Published var items = [GalleryItemViewState]()

    init(galleryClient: GalleryClient, authenticationClient: AuthenticationClient) {
        self.galleryClient = galleryClient
        self.authenticationClient = authenticationClient

        self.authenticationClient.authenticated
            .sink { isAuthenticated in
                self.isAuthenticated = isAuthenticated
                self.galleryClient.observe()
            }
            .store(in: &cancellables)

        self.galleryClient.observeUsers
            .map { users in
                let sorted = users.sorted { $0.lastSeen > $1.lastSeen}
                return sorted.map(toGalleryItemViewState(user:))
            }
            .sink { items in
                self.items = items
            }
            .store(in: &cancellables)
    }

    func signOut() {
        authenticationClient.signOut()
    }
}


extension GalleryModel {
    static var firebase: GalleryModel {
        GalleryModel(galleryClient: .firebase, authenticationClient: .firebase)
    }
}

extension GalleryModel {
    static var mock: GalleryModel {
        GalleryModel(galleryClient: .mock, authenticationClient: .mock)
    }
}

private func toGalleryItemViewState(user: User) -> GalleryItemViewState {
    GalleryItemViewState(imageName: user.imageUrl,
                         location: user.location,
                         name: user.name,
                         isActive: user.isActive())
}
