
import Foundation

class PeepzModel: ObservableObject {
    var loginId: String = ""
    var password: String = ""
    @Published var isAuthenticated = false

    func authenticate() {
        print("Login Id \(loginId), Password Id \(password)")
        isAuthenticated = true
    }
}
