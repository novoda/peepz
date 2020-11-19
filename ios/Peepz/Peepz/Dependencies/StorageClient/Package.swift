// swift-tools-version:5.3
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "StorageClient",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "StorageClient",
            type: .dynamic,
            targets: ["StorageClient"]),
        .library(
            name: "StorageClientLive",
            type: .dynamic,
            targets: ["StorageClientLive"]),
    ],
    dependencies: [
        .package(name: "Firebase", url: "https://github.com/firebase/firebase-ios-sdk.git", .branch("6.34-spm-beta"))
    ],
    targets: [
        .target(
            name: "StorageClient",
            dependencies: []
        ),
        .target(
            name: "StorageClientLive",
            dependencies: [
                .byName(name: "StorageClient"),
                .product(name: "FirebaseDatabase", package: "Firebase"),
            ]
        ),
        .testTarget(
            name: "StorageClientTests",
            dependencies: ["StorageClient"]),
    ]
)
