#!/bin/sh

mkdir -p dist/public
npm run build
cp index.html dist/public/
cp favicon.png dist/public/
cp assets dist/public/
cd dist && firebase deploy
