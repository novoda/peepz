import SwiftUI

public struct GalleryView: View {
    let model: GalleryViewModel

    public init(model: GalleryViewModel) {
        self.model = model
    }

    var columns = [
        GridItem(.flexible(), spacing: 0),
        GridItem(.flexible(), spacing: 0)
    ]

    public var body: some View {
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
            GalleryView(model: .init(storageClient: .staticData, authenticationClient: .authenticated))
                .environmentObject(GalleryViewModel(storageClient: .staticData,
                                                    authenticationClient: .authenticated))
                .navigationTitle("Smoothies")
        }
    }
}
