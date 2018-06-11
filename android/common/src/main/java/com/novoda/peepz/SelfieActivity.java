package com.novoda.peepz;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.View;

import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.FirebaseDatabase;
import com.novoda.peepz.common.R;
import com.novoda.peepz.common.R2;
import com.novoda.support.SystemClock;

import butterknife.BindView;
import butterknife.ButterKnife;

public class SelfieActivity extends BaseActivity {

    @BindView(R2.id.selfie_view)
    SelfieView selfieView;

    @BindView(R2.id.selfie_button_close)
    View closeButton;

    private PictureUploader pictureUploader;
    private PeepUpdater peepUpdater;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_selfie);
        ButterKnife.bind(this);

        // TODO: what if the user is not signed in?
        FirebaseUser signedInUser = firebaseApi().getSignedInUser();
        peepUpdater = new PeepUpdater(new SystemClock(), FirebaseDatabase.getInstance(), signedInUser);
        pictureUploader = new PictureUploader(signedInUser);

        closeButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
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

    private final PictureTakeListener listener = new PictureTakeListener() {
        @Override
        public void onPictureTake(byte[] data) {
            pictureUploader.upload(data, new PictureUploader.Callback() {
                @Override
                public void onSuccess(String pictureUrl) {
                    // TODO use startActivityForResult and send success back
                    peepUpdater.updatePeepImage(pictureUrl);
                    finish();
                }

                @Override
                public void onFailure() {
                    // TODO use startActivityForResult and send failure back
                    finish();
                }
            });
        }
    };

}
