package com.novoda.peepz;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import androidx.annotation.NonNull;

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
        bmp.compress(Bitmap.CompressFormat.WEBP, 100, stream);

        String path = BaseActivity.KEY_ROOT + "/" + signedInUser.getUid() + "/" + signedInUser.getUid() + ".webp";
        StorageReference destination = FirebaseStorage.getInstance().getReference().child(path);

        UploadTask uploadTask = destination.putStream(new ByteArrayInputStream(stream.toByteArray()));
        uploadTask.addOnCompleteListener(task -> {
            if (task.isSuccessful()) {
                task.getResult().getStorage().getDownloadUrl().addOnCompleteListener(t -> {
                    callback.onSuccess(t.getResult().toString());
                });
            } else {
                callback.onFailure();
            }
        });
    }

    public interface Callback {

        void onSuccess(String pictureUrl);

        void onFailure();

    }

}
