package com.novoda.peepz

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log
import com.google.android.gms.location.Geofence
import com.google.android.gms.location.GeofenceStatusCodes
import com.google.android.gms.location.GeofencingEvent
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FieldValue
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.GeoPoint

class CheckInReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context?, intent: Intent?) {
        val db = FirebaseFirestore.getInstance()
        val auth = FirebaseAuth.getInstance().currentUser
        val geofencingEvent = GeofencingEvent.fromIntent(intent)
        if (geofencingEvent.hasError()) {
            val errorMessage = GeofenceStatusCodes.getStatusCodeString(geofencingEvent.errorCode)
            Log.e("TEST", errorMessage)
            return
        }
        val geofenceTransition = geofencingEvent.geofenceTransition
        if ((geofenceTransition == Geofence.GEOFENCE_TRANSITION_ENTER) or (geofenceTransition == Geofence.GEOFENCE_TRANSITION_EXIT)) {
            val triggeringGeofences = geofencingEvent.triggeringGeofences
            db.collection("peepz/${auth?.uid}/places").add(hashMapOf(
                    "transition" to geofencingEvent.geofenceTransition,
                    "place" to triggeringGeofences[0].requestId,
                    "when" to FieldValue.serverTimestamp(),
                    "position" to GeoPoint(geofencingEvent.triggeringLocation.latitude, geofencingEvent.triggeringLocation.longitude)
            ))
        } else {
        }
    }
}