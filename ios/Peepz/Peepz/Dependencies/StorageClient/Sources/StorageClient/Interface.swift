import Foundation
import Combine

public struct StorageClient {
    public var observe: () -> Void
    public var observeUsers: AnyPublisher<[User], Never>

    public init(observe: @escaping () -> Void, observeUsers: AnyPublisher<[User], Never>) {
        self.observe = observe
        self.observeUsers = observeUsers
    }
}
