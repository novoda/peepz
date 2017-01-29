package com.novoda.peepz;

import android.support.annotation.NonNull;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;

class PictureUploader {

    private final FirebaseUser signedInUser;
    private final PeepUpdater peepUpdater;

    public PictureUploader(FirebaseUser signedInUser, PeepUpdater peepUpdater) {
        this.signedInUser = signedInUser;
        this.peepUpdater = peepUpdater;
    }

    public void upload(byte[] picture) {
        StorageReference destination = FirebaseStorage.getInstance().getReference().child(BaseActivity.KEY_ROOT + "/" + signedInUser.getUid() + ".png");

        UploadTask uploadTask = destination.putBytes(picture);
        uploadTask.addOnCompleteListener(new OnCompleteListener<UploadTask.TaskSnapshot>() {
            @Override
            public void onComplete(@NonNull Task<UploadTask.TaskSnapshot> task) {
                if (!task.isSuccessful()) {
                    return;
                }
                String imageUrl = task.getResult().getDownloadUrl().toString();
                peepUpdater.updateLastSeen(imageUrl);
            }
        });
    }

}
