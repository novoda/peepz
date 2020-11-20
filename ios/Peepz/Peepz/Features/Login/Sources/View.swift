import SwiftUI
import FirebaseClient
import Combine

public struct LoginView<V>: View where V: View {
    private let destination: V
    @ObservedObject private var viewModel: LoginViewModel

    public init(destination: V, viewModel: LoginViewModel) {
        self.destination = destination
        self.viewModel = viewModel
    }

    public var body: some View {
        VStack {
            Image(systemName: "person.circle").imageScale(.large)
            Button("Login") {
                viewModel.signIn()
            }

            NavigationLink(
                destination: destination,
                isActive: $viewModel.isAuthenticated,
                label: { EmptyView() })
        }
    }
}

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView(
            destination: EmptyView(),
            viewModel: LoginViewModel(client: .authenticated)
        )
    }
}
