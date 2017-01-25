#!/bin/sh

mkdir dist/public
npm run build
cp index.html dist/public/
cd dist && firebase deploy
