import UIKit
import Combine
import Authentication

public class LoginViewModel: ObservableObject {
    private let client: AuthenticationClient
    private var cancellables = [AnyCancellable]()

    @Published public var isAuthenticated = false

    public init(client: AuthenticationClient) {
        self.client = client

        client.authenticated
            .assign(to: \.isAuthenticated, on: self)
            .store(in: &cancellables)
    }

    func restore(with vc: UIViewController) {
        client.restore(vc)
    }
}
