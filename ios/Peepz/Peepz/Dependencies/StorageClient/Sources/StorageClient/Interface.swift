import Foundation
import Combine

public struct StorageClient {
    public var observe: () -> Void
    public var observeUsers: AnyPublisher<[User], Never>
}
