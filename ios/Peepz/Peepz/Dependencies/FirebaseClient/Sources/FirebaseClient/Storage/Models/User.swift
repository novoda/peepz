import Foundation

public struct User: Codable, Hashable {
    public let uid: String
    public let name: String
    public let lastSeen: Double
    public let imageUrl: String?
    public let imageTimestamp: Double?
    public let location: String?

    public init(uid: String, name: String, lastSeen: Double, imageUrl: String?, imageTimestamp: Double?, location: String?) {
        self.uid = uid
        self.name = name
        self.lastSeen = lastSeen
        self.imageUrl = imageUrl
        self.imageTimestamp = imageTimestamp
        self.location = location
    }
}
