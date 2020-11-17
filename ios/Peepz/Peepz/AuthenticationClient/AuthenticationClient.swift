import Foundation
import Combine
import UIKit

public struct AuthenticationClient {
    public var authenticated: AnyPublisher<Bool, Never>
    public var signin: () -> Void
    public var signOut: () -> Void
    public var restore: (UIViewController) -> Void
}
