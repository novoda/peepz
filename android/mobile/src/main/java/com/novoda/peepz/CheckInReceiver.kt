package com.novoda.peepz

import android.os.Bundle
import com.google.android.gms.location.GeofencingClient
import com.google.android.gms.location.LocationServices

lateinit var geofencingClient: GeofencingClient

override fun onCreate(savedInstanceState: Bundle?) {
    geofencingClient = LocationServices.getGeofencingClient(this)
}