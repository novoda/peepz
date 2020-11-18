// swift-tools-version:5.3
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "StorageClient",
    platforms: [.iOS(.v13)],
    products: [
        .library(
            name: "StorageClient",
            targets: ["StorageClient"]),
    ],
    dependencies: [
        .package(name: "Firebase", url: "https://github.com/firebase/firebase-ios-sdk.git", .branch("6.34-spm-beta"))
    ],
    targets: [
        .target(
            name: "StorageClient",
            dependencies: [
                .product(name: "FirebaseDatabase", package: "Firebase"),
            ]
        ),
        .testTarget(
            name: "StorageClientTests",
            dependencies: ["StorageClient"]),
    ]
)
