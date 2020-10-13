import SwiftUI

struct GalleryView: View {
    @EnvironmentObject var model: PeepzModel

    var columns = [
        GridItem(.flexible()),
        GridItem(.flexible())
    ]

    var body: some View {

        ScrollView {
            LazyVGrid(columns: columns) {
                ForEach(model.users, id: \.self) { user in
                    GalleryItemView()
                }
            }
        }
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
        NavigationView {
            GalleryView()
                .navigationTitle("Smoothies")
                .environmentObject(PeepzModel())
        }
    }
}
