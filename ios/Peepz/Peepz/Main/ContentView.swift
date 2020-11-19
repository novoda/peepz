import SwiftUI
import Gallery
import Login

struct ContentView: View {
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

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
