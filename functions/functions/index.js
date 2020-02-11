'use strict'

const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { Storage } = require('@google-cloud/storage')

// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   databaseURL: 'https://peepz-2f400.firebaseio.com'
// }) //functions.config().firebase)

// Creates a client
// const storage = new Storage()

// async function listFiles() {
//   // Lists files in the bucket
//   const [files] = await storage
//     .bucket('gs://peepz-2f400.appspot.com/')
//     .getFiles({ directory: 'wip/rooms/novoda/wall/vTtdPbyVBTMVKdLAlyP1fcSUvvS2', versions: true })

//   console.log('Files:')
//   files.forEach(file => {
//     console.log(file.generation)
//   })
// }

// listFiles().catch(console.error)

// exports.joinRoom = functions.database.ref('/wip/events/{key}').onWrite(event => {
//   const data = event.data.val()

//   if (data.type === 'JOIN') {
//     const user = data.payload.user
//     const roomId = data.payload.roomId
//     const wallPath = `wip/rooms/${roomId}/wall`
//     return event.data.adminRef.root
//       .child(`/wip/users/${user.uid}/rooms/${roomId}/id`)
//       .set(roomId)
//       .then(updateUser(event.data.adminRef.root)(wallPath)(user))
//   }

//   return
// })

// const updateUser = ref => wallPath => user => {
//   return ref.child(`${wallPath}/${user.uid}`).set({
//     uid: user.uid,
//     name: user.displayName
//   })
// }

// exports.createUser = functions.auth.user().onCreate(event => {
//   const user = event.data
//   return admin
//     .database()
//     .ref(`/wip/users/${user.uid}/profile/`)
//     .set({
//       displayName: user.displayName,
//       email: user.email,
//       uid: user.uid
//     })
// })

// `wip/users/{user.uid}/rooms/novoda/id`
exports.updateRoomId = functions.auth.user().onCreate(user => {
  // if(user.email.con)
  // console.log(user)
  return admin
    .database()
    .ref(`wip/users/${user.uid}/rooms/novoda`)
    .set({
      id: 'novoda'
    })
})
