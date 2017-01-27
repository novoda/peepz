package com.novoda.peepz;

import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;

import butterknife.BindView;
import butterknife.ButterKnife;

public class SelfieActivity extends BaseActivity {

    @BindView(R.id.selfie_view)
    SelfieView selfieView;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_selfie);
        ButterKnife.bind(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        selfieView.attach(listener);
    }

    @Override
    protected void onPause() {
        selfieView.detachListeners();
        super.onPause();
    }

    private final SelfieView.Listener listener = new SelfieView.Listener() {
        @Override
        public void onPictureTaken(byte[] data) {
            final FirebaseUser user = firebaseApi().getSignedInUser();
            final long currentTimeMillis = System.currentTimeMillis();
            StorageReference destination = FirebaseStorage.getInstance().getReference().child(KEY_ROOT + "/" + user.getUid() + ".png");

            UploadTask uploadTask = destination.putBytes(data);
            uploadTask.addOnCompleteListener(new OnCompleteListener<UploadTask.TaskSnapshot>() {
                @Override
                public void onComplete(@NonNull Task<UploadTask.TaskSnapshot> task) {
                    if (task.isSuccessful()) {
                        Uri downloadUrl = task.getResult().getDownloadUrl();

                        ApiPeep apiPeep = ApiPeep.create(
                                user.getUid(),
                                user.getDisplayName(),
                                downloadUrl.toString(),
                                currentTimeMillis,
                                currentTimeMillis
                        );

                        FirebaseDatabase database = FirebaseDatabase.getInstance();
                        database.getReference(KEY_ROOT).child(user.getUid()).setValue(apiPeep);
                    } else {
                        // TODO: image upload failed - retry a couple times and then give up
                    }
                }
            });
        }
    };

}
