package com.novoda.peepz;

import android.Manifest;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.os.StrictMode;
import android.util.Log;

import com.google.android.gms.location.GeofencingClient;
import com.google.firebase.auth.FirebaseAuth;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

public abstract class BaseActivity extends AppCompatActivity {

    // TODO: this could be nicer - perhaps don't expose this but expose methods that return the thing this is used for
    protected static final String KEY_ROOT = "wip/rooms/novoda/wall";

    private FirebaseApi firebaseApi;
    private GoogleApiClientApi googleApiClientApi;
    private GeofencingClient geofencingClient;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        StrictMode.setThreadPolicy(new StrictMode.ThreadPolicy.Builder()
//                .detectDiskReads()
//                .detectDiskWrites()
//                .detectAll()
//                .penaltyLog()
//                .build());
//        StrictMode.setVmPolicy(new StrictMode.VmPolicy.Builder()
//                .detectLeakedSqlLiteObjects()
//                .detectLeakedClosableObjects()
//                .penaltyLog()
//                .penaltyDeath()
//                .build());
        googleApiClientApi = new GoogleApiClientApi(this);
        googleApiClientApi.setupGoogleApiClient();
        firebaseApi = new FirebaseApi(FirebaseAuth.getInstance(), googleApiClientApi);
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            Log.e("TEST", "Can't check for permission");
            return;
        }

        new GeoFence().register(this, getGeofencePendingIntent());


    }

    private PendingIntent geofencePendingIntent = null;

    private PendingIntent getGeofencePendingIntent() {
        if (geofencePendingIntent != null) {
            return geofencePendingIntent;
        }
        Intent intent = new Intent(this, CheckInReceiver.class);
        geofencePendingIntent = PendingIntent.getBroadcast(this, 0, intent, PendingIntent.
                FLAG_UPDATE_CURRENT);
        return geofencePendingIntent;
    }

    protected FirebaseApi firebaseApi() {
        return firebaseApi;
    }

    protected GoogleApiClientApi googleApiClientApi() {
        return googleApiClientApi;
    }

    protected void log(String text) {
        Log.d("!!!", text);
    }

}
