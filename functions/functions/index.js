'use strict'

const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { Storage } = require('@google-cloud/storage')

admin.initializeApp(functions.config().firebase)

exports.updateRoomForUser = functions.auth.user().onCreate(user => {
  admin
    .database()
    .ref(`wip/users/${user.uid}/rooms/novoda`)
    .set({ id: 'novoda' })
})
