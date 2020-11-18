import SwiftUI

struct ContentView: View {
    var model: PeepzModel

    var body: some View {
        NavigationView {
            LoginView(model: model)
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView(model: .mock)
    }
}
