import SwiftUI
import StorageClient
import StorageClientLive
import Authentication
import Gallery
import Login

class AppDelegate: NSObject, UIApplicationDelegate {
    private let dependencies = Dependencies.live
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {

        dependencies.storage.configure()

        return true
    }

    func application(_ application: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any]) -> Bool {
        return dependencies.authentication.appOpen(url)
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
    let storage: StorageClient
    let authentication: AuthenticationClient

    internal init(storage: StorageClient, authentication: AuthenticationClient) {
        self.storage = storage
        self.authentication = authentication
    }

    static var live: Dependencies = {
        return Dependencies(
            storage: .staticData,
            authentication: .authenticated
        )
    }()
}
