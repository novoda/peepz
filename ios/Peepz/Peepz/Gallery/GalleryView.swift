import SwiftUI

struct GalleryView: View {
    @EnvironmentObject var model: PeepzModel
    
    var body: some View {
        Text("Hello, GalleryView!")
            .navigationTitle("Novodians")
            .navigationBarBackButtonHidden(true)
            .navigationBarItems(
                trailing:
                    Button(action: model.signOut) {
                        Image(systemName: "power").imageScale(.large)
                    }
            )
    }
}

struct GalleryView_Previews: PreviewProvider {
    static var previews: some View {
        GalleryView()
    }
}
