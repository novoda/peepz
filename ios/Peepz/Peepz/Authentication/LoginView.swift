import SwiftUI

struct LoginView: View {
    @EnvironmentObject var model: PeepzModel

    var body: some View {
        VStack {
            TextField("Login ID", text: $model.loginId)
            SecureField("Password", text: $model.password)
            Button(action: authenticate) {
                Text("Log In")
            }
        }
    }

    func authenticate() {
        print("Login Id \(model.loginId), Password Id \(model.password)")
    }
}

struct LoginView_Previews: PreviewProvider {

    static var previews: some View {
        LoginView()
    }
}
