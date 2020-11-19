import SwiftUI
import StorageClientLive
import Authentication
import Gallery
import Login

class AppDelegate: NSObject, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {

//        FirebaseApp.configure()

        return true
    }

    func application(_ application: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any]) -> Bool {
        return true
//        return GIDSignIn.sharedInstance().handle(url)
    }
}

@main
struct PeepzApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
    @StateObject private var dependencies: Dependencies = .live

    var body: some Scene {
        WindowGroup {
            PeepzView()
                .environmentObject(dependencies)
        }
    }
}

class Dependencies: ObservableObject {
    let gallery: GalleryViewModel
    var login: LoginViewModel

    internal init(gallery: GalleryViewModel, login: LoginViewModel) {
        self.gallery = gallery
        self.login = login
    }

    static var live: Dependencies {
        return Dependencies(
            gallery: GalleryViewModel(storageClient: .staticData, authenticationClient: .authenticated),
            login: LoginViewModel(client: .authenticated)
        )
    }
}
