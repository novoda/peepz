package com.novoda.peepz;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;

import com.google.android.cameraview.CameraView;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.FirebaseDatabase;
import com.novoda.accessibility.AccessibilityServices;
import com.novoda.support.SystemClock;

import java.util.Comparator;
import java.util.List;

import butterknife.ButterKnife;

public class PeepzActivity extends BaseActivity {

    private PeepzPageDisplayer peepzPageDisplayer;
    private PreviewlessPictureTaker previewlessPictureTaker;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_peepz);
        ButterKnife.bind(this);

        peepzPageDisplayer = createPageDisplayer();
        peepzPageDisplayer.bindMenu(callback);

        // TODO: what if the user is not signed in?
        FirebaseUser signedInUser = firebaseApi().getSignedInUser();
        PeepUpdater peepUpdater = new PeepUpdater(new SystemClock(), FirebaseDatabase.getInstance(), signedInUser);
        PictureUploader pictureUploader = new PictureUploader(signedInUser);
        previewlessPictureTaker = new PreviewlessPictureTaker((CameraView) ButterKnife.findById(this, R.id.peepz_secret_camera), pictureUploader, peepUpdater);

        Comparator<Peep> comparator = new PeepCompoundComparator(
                new SignedInUserIsFirstPeepComparator(signedInUser.getUid()),
                new PeepFreshnessComparator(),
                new ImageFreshnessPeepComparator()
        );
        PeepzService peepzService = new PeepzService(FirebaseDatabase.getInstance(), comparator);
        peepzService.observeChanges(onPeepsUpdatedCallback);
    }

    private PeepzPageDisplayer createPageDisplayer() {
        return new AndroidPeepzPageDisplayer(
                AccessibilityServices.newInstance(this),
                (Toolbar) ButterKnife.findById(this, R.id.toolbar),
                (PeepzView) ButterKnife.findById(this, R.id.peepz),
                ButterKnife.findById(this, R.id.peepz_button_take_picture)
        );
    }

    private final PeepzPageDisplayer.Callback callback = new PeepzPageDisplayer.Callback() {
        @Override
        public void onClickTakePicture() {
            startActivity(new Intent(getApplicationContext(), SelfieActivity.class));
        }

        @Override
        public void onClickSignOut() {
            firebaseApi().signOut();
            startActivity(new Intent(getApplicationContext(), SignInActivity.class));
            finish();
        }
    };

    private final PeepzService.Callback onPeepsUpdatedCallback = new PeepzService.Callback() {
        @Override
        public void onNext(List<Peep> peepz) {
            peepzPageDisplayer.display(peepz);
            FirebaseUser signedInUser = firebaseApi().getSignedInUser();
            if (missingSignedInUserFromPeepz(peepz, signedInUser)) {
                previewlessPictureTaker.requestPictureTake();
            }
        }

        private boolean missingSignedInUserFromPeepz(List<Peep> peepz, FirebaseUser signedInUser) {
            for (Peep peep : peepz) {
                if (peep.id().equals(signedInUser.getUid())) {
                    return false;
                }
            }
            return true;
        }
    };

    @Override
    protected void onResume() {
        super.onResume();
        previewlessPictureTaker.start();
    }

    @Override
    protected void onPause() {
        previewlessPictureTaker.stop();
        super.onPause();
    }

}
