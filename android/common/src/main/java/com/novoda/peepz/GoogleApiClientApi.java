package com.novoda.peepz;

import android.content.Intent;
import android.support.annotation.NonNull;

import com.google.android.gms.auth.api.Auth;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.auth.api.signin.GoogleSignInResult;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.novoda.peepz.common.R;

class GoogleApiClientApi {

    private final BaseActivity activity;

    private GoogleApiClient apiClient;

    public GoogleApiClientApi(BaseActivity activity) {
        this.activity = activity;
    }

    public void setupGoogleApiClient() {
        String string = activity.getString(R.string.default_web_client_id);
        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(string)
                .requestEmail()
                .build();
        apiClient = new GoogleApiClient.Builder(activity)
                .enableAutoManage(
                        activity, new GoogleApiClient.OnConnectionFailedListener() {
                            @Override
                            public void onConnectionFailed(@NonNull ConnectionResult connectionResult) {
                                activity.log("Failed to connect to GMS");
                            }
                        })
                .addApi(Auth.GOOGLE_SIGN_IN_API, gso)
                .build();
    }

    public Intent getSignInIntent() {
        return Auth.GoogleSignInApi.getSignInIntent(apiClient);
    }

    public GoogleSignInResult getSignInResultFromIntent(Intent data) {
        return Auth.GoogleSignInApi.getSignInResultFromIntent(data);
    }

    public void signOut() {
        Auth.GoogleSignInApi.signOut(apiClient);
    }

}
