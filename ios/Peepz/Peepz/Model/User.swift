import Foundation

struct User: Codable, Hashable {
    let uid: String
    let name: String
    let imageUrl: String?
    let imageTimestamp: Date?
    let lastSeen: Date?
    let location: String?

    init?(dictionary: NSDictionary) {
        guard
            let uid = dictionary["uid"] as? String,
            let name = dictionary["name"] as? String
        else { return nil }
        self.name = name
        self.uid = uid

        imageUrl = User.imgUrl(dictionary: dictionary["image"] as? NSDictionary)
        imageTimestamp = User.date(timestamp: User.imgTimeStamp(dictionary: dictionary["image"] as? NSDictionary)) //TODO: Point free about function composition would work great here.
        lastSeen = User.date(timestamp: dictionary["uid"] as? Double)
        location = dictionary["location"] as? String
    }

    static func date(timestamp: Double?) -> Date? {
        guard let timeSince1970 = timestamp else {
            return nil
        }
        return Date(timeIntervalSince1970: timeSince1970)
    }

    static func imgUrl(dictionary: NSDictionary?) -> String? {
        return dictionary?["payload"] as? String
    }

    static func imgTimeStamp(dictionary: NSDictionary?) -> Double? {
        return dictionary?["timestamp"] as? Double
    }
}
