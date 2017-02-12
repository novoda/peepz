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

    public void updatePeepImage(String imageUrl) {
        long currentTimeMillis = clock.currentTimeMillis();

        ApiPeep apiPeep = ApiPeep.create(
                signedInUser.getUid(),
                signedInUser.getDisplayName(),
                imageUrl,
                currentTimeMillis,
                currentTimeMillis
        );

        // TODO: only really want to update their image, imageTimestamp and lastSeen
        firebaseDatabase
                .getReference(BaseActivity.KEY_ROOT)
                .child(signedInUser.getUid())
                .setValue(apiPeep);
    }

}
