import SwiftUI
import SDWebImageSwiftUI

public struct GalleryItemViewState: Hashable {
    let imageName: String?
    let location: String?
    let name: String
    let isActive: Bool
}

struct GalleryItemView: View {
    let state: GalleryItemViewState

    var body: some View {
        ZStack(alignment: .bottom) {
            WebImage(url: URL(string: state.imageName ?? ""))
                .resizable()
                .placeholder(Image("hodor"))
                .aspectRatio(1, contentMode: .fit)
                .if(!state.isActive) { image in
                    image
                        .overlay(Rectangle().foregroundColor(.gray))
                        .blendMode(.saturation)
                }
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

extension View {
    @ViewBuilder
    func `if`<TrueContent: View, FalseContent: View>(_ condition: Bool, then trueContent: (Self) -> TrueContent, else falseContent: (Self) -> FalseContent) -> some View {
        if condition {
            trueContent(self)
        } else {
            falseContent(self)
        }
    }

    @ViewBuilder
    func `if`<TrueContent: View>(_ condition: Bool, then trueContent: (Self) -> TrueContent) -> some View {
        if condition {
            trueContent(self)
        } else {
            self
        }
    }
}
