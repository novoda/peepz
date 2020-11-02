import Foundation

struct User: Codable, Hashable {
    let uid: String
    let name: String
    let lastSeen: Double
    let imageUrl: String?
    let imageTimestamp: Double?
    let location: String?

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

    func isActive(now: Date = Date()) -> Bool {
        let fifteenMinutes: Double = 60 * 15
        let lastSeenInMinutes = self.lastSeen * 0.001
        return now.timeIntervalSince1970 - lastSeenInMinutes < fifteenMinutes
    }
}
