import Foundation
import Combine
import UIKit

public struct AuthenticationClient {
    public var authenticated: AnyPublisher<Bool, Never>
    public var signin: () -> Void
    public var signOut: () -> Void
    public var restore: (UIViewController) -> Void
    public var appOpen: (URL) -> Bool

    public init(
        authenticated: AnyPublisher<Bool, Never>,
        signin: @escaping () -> Void,
        signOut: @escaping () -> Void,
        restore: @escaping (UIViewController) -> Void,
        appOpen: @escaping (URL) -> Bool
    ) {
        self.authenticated = authenticated
        self.signin = signin
        self.signOut = signOut
        self.restore = restore
        self.appOpen = appOpen
    }
}
