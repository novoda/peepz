// swift-tools-version:5.3
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "FirebaseClient",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "FirebaseClient",
            type: .dynamic,
            targets: ["FirebaseClient"]),
        .library(
            name: "FirebaseClientLive",
            type: .dynamic,
            targets: ["FirebaseClientLive"]),
    ],
    dependencies: [
        .package(name: "Firebase", url: "https://github.com/firebase/firebase-ios-sdk.git", from: "7.1.0"),
        .package(name: "FirebaseUI", url: "https://github.com/firebase/FirebaseUI-iOS.git", .branch("pb-spm"))
    ],
    targets: [
        .target(
            name: "FirebaseClient",
            dependencies: []
        ),
        .target(
            name: "FirebaseClientLive",
            dependencies: [
                .byName(name: "FirebaseClient"),
                .product(name: "FirebaseDatabase", package: "Firebase"),
                .product(name: "AuthUI", package: "FirebaseUI")
            ]
        ),
        .testTarget(
            name: "FirebaseClientTests",
            dependencies: ["FirebaseClient"]),
    ]
)
