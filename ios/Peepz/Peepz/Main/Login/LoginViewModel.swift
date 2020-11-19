import Combine
import Authentication
import UIKit

public class LoginViewModel: ObservableObject {
    private let client: AuthenticationClient
    private var cancellables = [AnyCancellable]()

    @Published var authenticated: Bool = false

    public init(client: AuthenticationClient) {
        self.client = client

        client.authenticated
            .assign(to: \.authenticated, on: self)
            .store(in: &cancellables)
    }

    func restore(with vc: UIViewController) {
        client.restore(vc)
    }
}
