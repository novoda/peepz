import Combine

extension GalleryClient {
    static var mock: Self {
        return Self(observe: {}, observeUsers: Just<[User]>([]).eraseToAnyPublisher())
    }
}
