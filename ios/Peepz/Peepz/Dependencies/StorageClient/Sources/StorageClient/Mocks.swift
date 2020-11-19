import Combine
import Foundation

extension StorageClient {
    public static var staticData: Self {
        return Self(
            configure: {},
            observe: {},
            observeUsers: Just<[User]>(.bebopCrew).eraseToAnyPublisher()
        )
    }
}

extension Array where Element == User {
    static var bebopCrew: [User] {
        return [
            User(uid: "one",
                 name: "Spike Spiegel",
                 lastSeen: Date().timeIntervalSince1970 * 1000,
                 imageUrl: "https://openpsychometrics.org/tests/characters/test-resources/pics/CBP/1.jpg",
                 imageTimestamp: nil,
                 location: "Mars"),
            User(uid: "two",
                 name: "Jet Black",
                 lastSeen: 3000,
                 imageUrl: "https://static.wikia.nocookie.net/cowboybebop/images/9/94/Jet_Head.jpg/revision/latest?cb=20130709230234",
                 imageTimestamp: nil,
                 location: "Ganímedes"),
            User(uid: "three",
                 name: "Faye Valentine",
                 lastSeen: 3000,
                 imageUrl: "https://static.wikia.nocookie.net/cowboybebop/images/3/3a/G89kyozspj831.jpg/revision/latest/scale-to-width-down/310?cb=20191201005133",
                 imageTimestamp: nil,
                 location: "???"),
            User(uid: "four",
                 name: "Ed",
                 lastSeen: 3000,
                 imageUrl: "https://static.wikia.nocookie.net/cowboybebop/images/9/9d/9_EdFlyBebop2.png/revision/latest/scale-to-width-down/310?cb=20090406042712",
                 imageTimestamp: nil,
                 location: "Earth"),
            User(uid: "five",
                 name: "Ein",
                 lastSeen: 3000,
                 imageUrl: "https://static.wikia.nocookie.net/cowboybebop/images/d/d1/2_Ein2.png/revision/latest/scale-to-width-down/310?cb=20090316153743",
                 imageTimestamp: nil,
                 location: "Lab"),
        ]
    }
}
