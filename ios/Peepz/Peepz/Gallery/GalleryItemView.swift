import SwiftUI

struct GalleryItemViewState {
    let imageName: String
    let location: String?
    let name: String
    let isActive: Bool
}

struct GalleryItemView: View {
    let state: GalleryItemViewState

    var body: some View {
        ZStack(alignment: .bottom) {
            Image(state.imageName)
                .resizable()
                .aspectRatio(1, contentMode: .fit)
                .border(Color.black, width: 1)
            HStack {
                Circle()
                    .frame(width: 10, height: 10, alignment: .center)
                    .foregroundColor(state.isActive ? .green : .gray)
                VStack(alignment: .leading) {
                    Text(state.name)
                        .font(.caption)
                    if let location = state.location {
                        Text(location)
                            .font(.caption2)
                    }
                }
                Spacer()
            }
            .padding(5)
        }
    }
}

struct GalleryItemView_Previews: PreviewProvider {
    static var previews: some View {
        GalleryItemView(state:
                            GalleryItemViewState(
                                imageName: "hodor",
                                location: "Novoda",
                                name: "Michal", isActive: true)
        )
    }
}
