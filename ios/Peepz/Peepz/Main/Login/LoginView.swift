import SwiftUI
import Authentication
import Gallery
import Combine

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

struct LoginView: View {
    @EnvironmentObject var dependencies: Dependencies

    var body: some View {
        VStack {
            Image(systemName: "person.circle").imageScale(.large)
            GoogleSignInViewController(viewModel: dependencies.login)

            NavigationLink(
                destination: GalleryView(model: dependencies.gallery),
                isActive: $dependencies.login.authenticated,
                label: { EmptyView() })
        }
    }
}

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView()
    }
}

// Google Sign in
struct GoogleSignInViewController: UIViewControllerRepresentable {
    let viewModel: LoginViewModel

    func makeUIViewController(context: Context) -> some UIViewController {
        // We need the view controller to set it as presentingViewController for Google Sign In.
        let vc = UIViewController()
        viewModel.restore(with: vc)

        return vc
    }

    func updateUIViewController(_ uiViewController: UIViewControllerType, context: Context) { }
}
