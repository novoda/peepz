import SwiftUI

struct LoginView: View {
    @EnvironmentObject var model: PeepzModel

    var body: some View {
        VStack {
            Image(systemName: "person.circle").imageScale(.large)
            TextField("Login ID", text: $model.loginId)
            SecureField("Password", text: $model.password)
            Button(action: model.authenticate) {
                Text("Log In")
            }
            // isActive - means is it showing its destination
            NavigationLink(destination: GalleryView(), isActive: $model.isAuthenticated) { EmptyView() }
        }
    }
}

struct LoginView_Previews: PreviewProvider {

    static var previews: some View {
        LoginView()
            .environmentObject(PeepzModel())
    }
}
