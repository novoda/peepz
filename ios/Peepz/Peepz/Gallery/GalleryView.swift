import SwiftUI

struct GalleryView: View {
    var body: some View {
        Text("Hello, GalleryView!")
            .navigationTitle("Novodians")
            .navigationBarBackButtonHidden(true)
    }
}

struct GalleryView_Previews: PreviewProvider {
    static var previews: some View {
        GalleryView()
    }
}
