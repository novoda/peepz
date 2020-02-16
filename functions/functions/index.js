'use strict'

const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { Storage } = require('@google-cloud/storage')

if (process.env.FIREBASE_CONFIG) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://peepz-2f400.firebaseio.com'
  })
} else {
  admin.initializeApp(functions.config().firebase)
}

exports.updateRoomId = functions.auth.user().onCreate(user => {
  // if(user.email.con)
  return admin
    .database()
    .ref(`wip/users/${user.uid}/rooms/novoda`)
    .set({
      id: 'novoda'
    })
})

exports.updateLocation = functions.firestore.document('/peepz/{uid}/places/{placeId}').onWrite((change, context) => {
  const uid = context.params.uid
  const place = change.after.data()
  const isEntereing = place.transition == 1
  const name = place.place || ''
  return admin
    .database()
    .ref(`wip/rooms/novoda/wall/${uid}`)
    .update({
      place: name
    })
})
