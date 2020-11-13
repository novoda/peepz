import Foundation
import Combine

public struct GalleryClient {
    public var observe: () -> Void
    public var observeUsers: AnyPublisher<[User], Never>
}
