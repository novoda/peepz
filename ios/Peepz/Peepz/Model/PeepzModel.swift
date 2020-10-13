import Foundation
import GoogleSignIn
import Firebase

class PeepzModel: NSObject, ObservableObject {
    @Published var isAuthenticated = false
    @Published var users = [User]()
    
    var fireDatabaseRef = Database.database().reference()

    override init() {
        super.init()
        configureGoogleSignIn()
    }

    private func configureGoogleSignIn() {
        GIDSignIn.sharedInstance().clientID = FirebaseApp.app()?.options.clientID
        GIDSignIn.sharedInstance().delegate = self
    }
}

extension PeepzModel: GIDSignInDelegate {
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

    func sign(_ signIn: GIDSignIn!, didDisconnectWith user: GIDGoogleUser!, withError error: Error!) {
        // Perform any operations when the user disconnects from app here.
        print("Logged out: Yet to be implemented")
    }

    func firebaseAuth(credential: AuthCredential) {
        Auth.auth().signIn(with: credential) { (authResult, error) in

            if let error = error {
                print("Firebase Login failed: \(error)")
                return
            }
            self.isAuthenticated = true
            self.getUsers() //ToDo: Should this be put in a different place?
        }
    }

    func signOut() {
        do {
            GIDSignIn.sharedInstance().signOut()
            try Auth.auth().signOut()

            isAuthenticated = false
        } catch let signOutError as NSError {
            print ("Error signing out: %@", signOutError)
        }
    }

    func getUsers() {
        var ref: DatabaseReference!

        ref = Database.database().reference()
        ref.child("wip/rooms/novoda/wall/").observe(.value, with: { [weak self] snapshot  in
            // Get user value
            guard let value = snapshot.value as? NSDictionary else {
                print("Error: No users here")
                return
            }
            self?.users = value.allValues.compactMap { User(dictionary: $0 as! NSDictionary) }
        }) { error in
            print(error.localizedDescription)
        }
    }
}
