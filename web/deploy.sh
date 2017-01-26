#!/bin/sh

mkdir dist/public
npm run build
cp index.html dist/public/
cp favicon.ico dist/public/
cd dist && firebase deploy
