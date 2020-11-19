import Foundation
import Combine

public struct StorageClient {
    public var configure: () -> Void
    public var observe: () -> Void
    public var observeUsers: AnyPublisher<[User], Never>

    public init(
        configure: @escaping () -> Void,
        observe: @escaping () -> Void,
        observeUsers: AnyPublisher<[User], Never>
    ) {
        self.configure = configure
        self.observe = observe
        self.observeUsers = observeUsers
    }
}
