import Foundation
import Combine
import GoogleSignIn
import Firebase

extension AuthenticationClient {
    static var firebase: AuthenticationClient {
        let instance = AuthenticationFirebase()
        instance.setup()

        return AuthenticationClient(authenticated: instance.authenticatedSubject.eraseToAnyPublisher(),
                                    signin: {},
                                    signOut: instance.signOut)
    }
}

private class AuthenticationFirebase: NSObject, GIDSignInDelegate {
    let authenticatedSubject = PassthroughSubject<Bool, Never>()

    func setup() {
        GIDSignIn.sharedInstance().clientID = FirebaseApp.app()?.options.clientID
        GIDSignIn.sharedInstance().delegate = self
    }

    func sign(_ signIn: GIDSignIn!, didSignInFor user: GIDGoogleUser!, withError error: Error?) {
        if let error = error {
            print("Sign In failed with error: \(error)")
            return
        }

        guard let authentication = user.authentication else { return }
        let credential = GoogleAuthProvider.credential(withIDToken: authentication.idToken,
                                                       accessToken: authentication.accessToken)

        firebaseAuth(credential: credential)
    }

    private func firebaseAuth(credential: AuthCredential) {
        Auth.auth().signIn(with: credential) { (authResult, error) in

            if let error = error {
                print("Firebase Login failed: \(error)")
                return
            }

            self.authenticatedSubject.send(true)
        }
    }

    func sign(_ signIn: GIDSignIn!, didDisconnectWith user: GIDGoogleUser!, withError error: Error!) {
        // Perform any operations when the user disconnects from app here.
        print("Logged out: Yet to be implemented")
    }

    func signOut() {
        do {
            GIDSignIn.sharedInstance().signOut()
            try Auth.auth().signOut()

            authenticatedSubject.send(false)
        } catch let signOutError as NSError {
            print("Error signing out: %@", signOutError)
        }
    }
}
