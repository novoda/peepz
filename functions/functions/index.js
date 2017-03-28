'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.joinRoom = functions.database.ref('/wip/events/{key}')
    .onWrite(event => {
      const data = event.data.val();
      const user = data.payload.user;
      const roomId = data.payload.roomId;
      const wallPath = `wip/rooms/${roomId}/wall`;

      if (data.type === 'JOIN') {
        return event.data.adminRef.root
          .child(`/wip/users/${user.uid}/rooms/${roomId}/id`)
          .set(roomId)
          .then(updateUser(event.data.adminRef.root)(wallPath)(user));
      }
      return;
    });

const updateUser = ref => wallPath => user => {
  return ref.child(`${wallPath}/${user.uid}`).set({
    uid: user.uid,
    name: user.displayName
  });
};
