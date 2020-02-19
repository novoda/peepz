package com.novoda.peepz;

import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.FirebaseDatabase;
import com.novoda.support.Clock;

import java.util.HashMap;
import java.util.Map;

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

        Map<String, Object> i = new HashMap();
        i.put("payload", imageUrl);
        i.put("timestamp", currentTimeMillis);
        Map<String, Object> c = new HashMap<String, Object>();
        c.put("uid", signedInUser.getUid());
        c.put("name", signedInUser.getDisplayName());
        c.put("lastSeen", currentTimeMillis);
        c.put("image", i);

        firebaseDatabase
                .getReference(BaseActivity.KEY_ROOT)
                .child(signedInUser.getUid()).updateChildren(c);
    }

}
