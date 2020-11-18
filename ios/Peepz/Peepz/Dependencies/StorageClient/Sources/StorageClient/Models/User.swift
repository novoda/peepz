import Foundation

public struct User: Codable, Hashable {
    public let uid: String
    public let name: String
    public let lastSeen: Double
    public let imageUrl: String?
    public let imageTimestamp: Double?
    public let location: String?
}

extension User {
    init?(dictionary: NSDictionary) {
        guard
            let uid = dictionary["uid"] as? String,
            let name = dictionary["name"] as? String,
            let lastSeen = dictionary["lastSeen"] as? Double
        else { return nil }
        self.name = name
        self.uid = uid
        self.lastSeen = lastSeen

        imageUrl = User.imgUrl(dictionary: dictionary["image"] as? NSDictionary)
        imageTimestamp = User.imgTimeStamp(dictionary: dictionary["image"] as? NSDictionary)
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
