package com.novoda.peepz

import android.app.PendingIntent
import android.content.Context
import android.util.Log
import com.google.android.gms.location.Geofence
import com.google.android.gms.location.GeofencingRequest
import com.google.android.gms.location.LocationServices
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

class GeoFence {

    var store: FirebaseFirestore = FirebaseFirestore.getInstance()

    val TAG = "TEST"

    data class Place(val name: String = "", val description: String = "", val latitude: Double = 0.0, val longitude: Double = 0.0)

    private fun toGeofence(place: Place): Geofence {
        Log.v(TAG, "Adding ${place.name} to geofence")
        return Geofence.Builder()
                .setRequestId(place.name)
                .setCircularRegion(place.longitude, place.latitude, 50f)
                .setExpirationDuration(Geofence.NEVER_EXPIRE)
                .setTransitionTypes(Geofence.GEOFENCE_TRANSITION_ENTER or Geofence.GEOFENCE_TRANSITION_EXIT)
                .build()
    }

    fun getPlaces(): Deferred<List<Geofence>> {
        val d = CompletableDeferred<List<Geofence>>()
        store.collection("places").get().addOnSuccessListener { result ->
            d.complete(result.map { it.toObject(Place::class.java) }.map { toGeofence(it) })
        }.addOnFailureListener { exception ->
            d.completeExceptionally(exception)
        }
        return d
    }

    suspend fun getGeofenceRequest(): GeofencingRequest {
        val fences = getPlaces().await()
        val builder = GeofencingRequest.Builder()
        builder.setInitialTrigger(GeofencingRequest.INITIAL_TRIGGER_ENTER)
        builder.addGeofences(fences)
        return builder.build()
    }

    fun register(context: Context, intent: PendingIntent) {
        GlobalScope.launch {
            val geofencingClient = LocationServices.getGeofencingClient(context)
            geofencingClient.addGeofences(getGeofenceRequest(), intent).addOnCompleteListener {
                Log.i(TAG, "Registered")
            }.addOnFailureListener { Log.e(TAG, "Error") }
        }.start()
    }
}
