import SwiftUI
import Gallery
import Login

struct PeepzView: View {
    @EnvironmentObject var dependencies: Dependencies

    var body: some View {
        NavigationView {
            LoginView(
                destination: GalleryView(model: dependencies.gallery),
                viewModel: dependencies.login
            )
        }
    }
}

struct PeepzView_Previews: PreviewProvider {
    static var previews: some View {
        PeepzView()
    }
}
