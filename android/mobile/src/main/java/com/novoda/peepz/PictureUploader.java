package com.novoda.peepz;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;

import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

class PictureUploader {

    private final FirebaseUser signedInUser;

    public PictureUploader(FirebaseUser signedInUser) {
        this.signedInUser = signedInUser;
    }

    public void upload(byte[] picture, final Callback callback) {
        new CompressAndUpload(callback).execute(picture);
    }


    public interface Callback {

        void onSuccess(String pictureUrl);

        void onFailure();

    }

    private class CompressAndUpload extends AsyncTask<byte[], Void, Void> {

        private Callback callback;

        public CompressAndUpload(final Callback callback) {
            this.callback = callback;
        }

        @Override
        protected Void doInBackground(byte[]... picture) {
            Bitmap bmp = BitmapFactory.decodeByteArray(picture[0], 0, picture[0].length);
            ByteArrayOutputStream stream = new ByteArrayOutputStream();

            bmp.compress(Bitmap.CompressFormat.WEBP, 100, stream);

            String path = BaseActivity.KEY_ROOT + "/" + signedInUser.getUid() + "/" + signedInUser.getUid() + ".webp";
            StorageReference destination = FirebaseStorage.getInstance().getReference().child(path);

            UploadTask uploadTask = destination.putStream(new ByteArrayInputStream(stream.toByteArray()));
            uploadTask.addOnCompleteListener(task -> {
                try {
                    stream.close();

                } catch (IOException e) {
                    e.printStackTrace();
                }
                if (task.isSuccessful()) {
                    task.getResult().getStorage().getDownloadUrl().addOnCompleteListener(t -> {
                        callback.onSuccess(t.getResult().toString());
                    });
                } else {
                    callback.onFailure();
                }
            });
            return null;
        }
    }

}
