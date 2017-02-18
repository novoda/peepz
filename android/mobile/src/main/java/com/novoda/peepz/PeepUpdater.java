package com.novoda.peepz;

import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.FirebaseDatabase;
import com.novoda.support.Clock;

class PeepUpdater {

    private final Clock clock;
    private final FirebaseDatabase firebaseDatabase;
    private final FirebaseUser signedInUser;

    public PeepUpdater(Clock clock, FirebaseDatabase firebaseDatabase, FirebaseUser signedInUser) {
        this.clock = clock;
        this.firebaseDatabase = firebaseDatabase;
        this.signedInUser = signedInUser;
    }

    public void updatePeepLastSeen() {
        long currentTimeMillis = clock.currentTimeMillis();
        firebaseDatabase
                .getReference(BaseActivity.KEY_ROOT)
                .child(signedInUser.getUid())
                .child("lastSeen")
                .setValue(currentTimeMillis);
    }

    public void updatePeepImage(String imageUrl) {
        long currentTimeMillis = clock.currentTimeMillis();

        ApiPeep apiPeep = ApiPeep.create(
                signedInUser.getUid(),
                signedInUser.getDisplayName(),
                imageUrl,
                currentTimeMillis,
                currentTimeMillis
        );

        firebaseDatabase
                .getReference(BaseActivity.KEY_ROOT)
                .child(signedInUser.getUid())
                .setValue(apiPeep);
    }

}
