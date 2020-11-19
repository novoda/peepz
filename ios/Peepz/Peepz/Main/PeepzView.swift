import SwiftUI
import Gallery
import Login

struct PeepzView: View {
    @EnvironmentObject var dependencies: Dependencies

    var body: some View {
        NavigationView {
            LoginView(
                destination: GalleryView(model: dependencies.galleryViewModel),
                viewModel: dependencies.loginViewModel
            )
        }
    }
}

struct PeepzView_Previews: PreviewProvider {
    static var previews: some View {
        PeepzView()
    }
}

extension Dependencies {
    var galleryViewModel: GalleryViewModel {
        GalleryViewModel(storageClient: storage, authenticationClient: authentication)
    }

    var loginViewModel: LoginViewModel {
        LoginViewModel(client: authentication)
    }
}
