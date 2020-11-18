import Foundation
import Firebase
import Combine
import StorageClient

extension StorageClient {
    public static var live: StorageClient {
        let instance = GalleryModelFirebase()

        return StorageClient(
            observe: instance.observe,
            observeUsers: instance.usersSubject.eraseToAnyPublisher()
        )
    }
}

private class GalleryModelFirebase {
    let usersSubject = PassthroughSubject<[User], Never>()

    func observe() {
        var ref: DatabaseReference!

        ref = Database.database().reference()
        ref.child("wip/rooms/novoda/wall/").observe(.value, with: { [weak self] snapshot  in
            guard let self = self else {
                return
            }

            guard let value = snapshot.value as? NSDictionary else {
                print("Error: No users here")
                return
            }
            
            self.usersSubject.send(value
                                    .allValues
                                    .compactMap { User(dictionary: $0 as! NSDictionary) })
        }) { error in
            print(error.localizedDescription)
        }
    }
}
