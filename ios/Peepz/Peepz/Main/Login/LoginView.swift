import SwiftUI
import Authentication
import Gallery
import Combine

struct LoginView<V>: View where V: View {
    @EnvironmentObject var dependencies: Dependencies
    private let destination: V
    private let viewModel: LoginViewModel

    internal init(destination: V, viewModel: LoginViewModel) {
        self.destination = destination
        self.viewModel = viewModel
    }

    var body: some View {
        VStack {
            Image(systemName: "person.circle").imageScale(.large)
            GoogleSignInViewController(viewModel: dependencies.login)

            NavigationLink(
                destination: destination,
                isActive: $dependencies.login.authenticated,
                label: { EmptyView() })
        }
    }
}

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView(destination: EmptyView(), viewModel: LoginViewModel(client: .authenticated))
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
