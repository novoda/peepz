
import SwiftUI

struct GalleryItemView: View {
    var body: some View {
        Image("hodor")
            .resizable()
            .aspectRatio(1, contentMode: .fill)
            .border(Color.black, width: 1)
    }
}

struct GalleryItemView_Previews: PreviewProvider {
    static var previews: some View {
        GalleryItemView()
    }
}
