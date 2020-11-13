import SwiftUI

struct ContentView: View {
    var model: GalleryModel

    var body: some View {
        NavigationView {
            LoginView(model: model)
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView(model: .firebase)
    }
}
