// swift-tools-version:5.3
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "Authentication",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "Authentication",
            type: .dynamic,
            targets: ["Authentication"]
        ),
        .library(
            name: "AuthenticationLive",
            type: .dynamic,
            targets: ["AuthenticationLive"]
        )
    ],
    dependencies: [
        .package(name: "Firebase", url: "https://github.com/firebase/firebase-ios-sdk.git", from: "7.0.0")
    ],
    targets: [
        .target(
            name: "Authentication",
            dependencies: []
        ),
        .target(
            name: "AuthenticationLive",
            dependencies: [
                .byName(name: "Authentication"),
                .product(name: "FirebaseAuth", package: "Firebase")
            ]
        ),
        .testTarget(
            name: "AuthenticationTests",
            dependencies: ["Authentication"]),
    ]
)
