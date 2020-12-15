import SwiftUI

struct ContentView: View {
    @EnvironmentObject var model: PeepzModel
    
    var body: some View {
        NavigationView {
            LoginView()
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
