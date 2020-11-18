// swift-tools-version:5.3
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "Authentication",
    platforms: [.iOS(.v13)],
    products: [
        .library(
            name: "Authentication",
            type: .dynamic,
            targets: ["Authentication"])
    ],
    dependencies: [
//        .package(name: "Firebase", url: "https://github.com/firebase/firebase-ios-sdk.git", .branch("6.34-spm-beta")),
//        .package(name: "GoogleSignIn", url: "https://github.com/darrarski/GoogleSignIn-Swift.git", from: "0.0.5")
    ],
    targets: [
        .target(
            name: "Authentication",
            dependencies: [
//                .product(name: "FirebaseAuth", package: "Firebase"),
//                "GoogleSignIn"
            ]
        ),
        .testTarget(
            name: "AuthenticationTests",
            dependencies: ["Authentication"]),
    ]
)
