package com.novoda.peepz;

import com.google.firebase.auth.FirebaseUser;

public interface AuthenticationCallbacks {

    void onSuccess(FirebaseUser firebaseUser);

    void onAuthenticationFailure();
}
