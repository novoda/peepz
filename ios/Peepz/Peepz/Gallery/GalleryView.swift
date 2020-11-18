import SwiftUI

struct GalleryView: View {
    @EnvironmentObject var model: PeepzModel

    var columns = [
        GridItem(.flexible(), spacing: 0),
        GridItem(.flexible(), spacing: 0)
    ]

    var body: some View {
        ScrollView {
            LazyVGrid(columns: columns, spacing: 0) {
                ForEach(model.items, id: \.self) { state in
                    GalleryItemView(state: state)
                }
            }
        }
        .navigationTitle("Novodans")
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
                .environmentObject(PeepzModel.mock)
                .navigationTitle("Smoothies")
        }
    }
}
