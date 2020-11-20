import UIKit
import Combine
import FirebaseClient
import FirebaseAuth

extension AuthenticationClient {
    public static var live: AuthenticationClient {
        let instance = FirebaseAuthentication()

        return AuthenticationClient(
            authenticated: instance.authenticated.eraseToAnyPublisher(),
            signin: instance.signIn,
            signOut: instance.signOut,
            restore: instance.restore(vc:),
            appOpen: instance.appOpen(url:)
        )
    }
}

class FirebaseAuthentication {
    let auth = Auth.auth()

    init() {
    }

    let authenticated = CurrentValueSubject<Bool, Never>(false)

    func signIn() {
        auth.signIn(with: FUIGoogleAuth(), uiDelegate: self) { result, error in
            
        }
    }

    func signOut() {

    }

    func loginVC() -> UIViewController {
        let vc = Auth
    }

    func restore(vc: UIViewController) {

    }

    func appOpen(url: URL) -> Bool {
        return true
    }
}
