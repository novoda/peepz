import Foundation
import Combine

public struct AuthenticationClient {
    public var authenticated: AnyPublisher<Bool, Never>
    public var signin: () -> Void
    public var signOut: () -> Void
}
