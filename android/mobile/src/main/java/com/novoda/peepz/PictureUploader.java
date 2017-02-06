package com.novoda.peepz;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.support.annotation.NonNull;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

class PictureUploader {

    private final FirebaseUser signedInUser;

    public PictureUploader(FirebaseUser signedInUser) {
        this.signedInUser = signedInUser;
    }

    public void upload(byte[] picture, final Callback callback) {
        Bitmap bmp = BitmapFactory.decodeByteArray(picture, 0, picture.length);
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        bmp.compress(Bitmap.CompressFormat.WEBP, 0, stream);

        StorageReference destination = FirebaseStorage.getInstance().getReference().child(BaseActivity.KEY_ROOT + "/" + signedInUser.getUid() + ".webp");

        UploadTask uploadTask = destination.putStream(new ByteArrayInputStream(stream.toByteArray()));
        uploadTask.addOnCompleteListener(new OnCompleteListener<UploadTask.TaskSnapshot>() {
            @Override
            public void onComplete(@NonNull Task<UploadTask.TaskSnapshot> task) {
                if (task.isSuccessful()) {
                    String imageUrl = task.getResult().getDownloadUrl().toString();
                    callback.onSuccess(imageUrl);
                } else {
                    callback.onFailure();
                }
            }
        });
    }

    public interface Callback {

        void onSuccess(String pictureUrl);

        void onFailure();

    }

}
