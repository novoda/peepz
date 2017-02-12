#!/bin/sh

mkdir -p dist/public
npm run build
cp index.html dist/public/
cp -r assets dist/public/
cd dist &&  ../node_modules/.bin/firebase deploy --token=$FIREBASE_TOKEN --non-interactive
