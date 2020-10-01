import SwiftUI

struct LoginView: View {
    @EnvironmentObject var model: PeepzModel
    @State var isShowingGalleryView: Bool = false

    var body: some View {
        VStack {
            Image(systemName: "person.circle").imageScale(.large)
            TextField("Login ID", text: $model.loginId)
            SecureField("Password", text: $model.password)
            Button(action: authenticate) {
                Text("Log In")
            }
            // isActive - means is it showing its destination
            NavigationLink(destination: GalleryView(), isActive: $isShowingGalleryView) { EmptyView() }
        }
    }

    func authenticate() {
        print("Login Id \(model.loginId), Password Id \(model.password)")
        isShowingGalleryView = true
    }
}

struct LoginView_Previews: PreviewProvider {

    static var previews: some View {
        LoginView()
            .environmentObject(PeepzModel())
    }
}
