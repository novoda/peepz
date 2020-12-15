import SwiftUI
import GoogleSignIn

struct LoginView: View {
    @EnvironmentObject var model: PeepzModel

    var body: some View {
        VStack {
            Image(systemName: "person.circle").imageScale(.large)
            GoogleSignInViewController(model: model)

            // isActive - means is it showing its destination
            NavigationLink(destination: GalleryView(), isActive: $model.isAuthenticated, label: { EmptyView() })
        }
    }
}

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView()
            .environmentObject(PeepzModel.mock)
    }
}

// Google Sign in
struct GoogleSignInViewController: UIViewControllerRepresentable {
    let model: PeepzModel

    func makeUIViewController(context: Context) -> some UIViewController {        
        // We need the view controller to set it as presentingViewController for Google Sign In.
        let vc = UIViewController()
        model.restore(with: vc)

        return vc
    }

    func updateUIViewController(_ uiViewController: UIViewControllerType, context: Context) { }
}
