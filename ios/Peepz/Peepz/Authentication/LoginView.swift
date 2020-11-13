import SwiftUI
import GoogleSignIn

struct LoginView: View {
    @ObservedObject var model: GalleryModel

    var body: some View {
        VStack {
            Image(systemName: "person.circle").imageScale(.large)
            GoogleSignInViewController()

            // isActive - means is it showing its destination
            NavigationLink(destination: GalleryView(model: model), isActive: $model.isAuthenticated, label: { EmptyView() })
        }
    }
}

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView(model: .mock)
    }
}

// Google Sign in
struct GoogleSignInViewController: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> some UIViewController {

        // We need the view controller to set it as presentingViewController for Google Sign In.
        let vc = UIViewController()
        GIDSignIn.sharedInstance()?.presentingViewController = vc
        vc.view = GIDSignInButton()

        // Automatically sign in the user.
        GIDSignIn.sharedInstance()?.restorePreviousSignIn()

        return vc
    }

    func updateUIViewController(_ uiViewController: UIViewControllerType, context: Context) { }
}
