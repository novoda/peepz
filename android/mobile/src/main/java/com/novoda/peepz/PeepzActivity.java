package com.novoda.peepz;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.MenuItem;
import android.view.View;

import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.FirebaseDatabase;
import com.novoda.accessibility.AccessibilityServices;
import com.novoda.support.SystemClock;

import java.util.Comparator;
import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

public class PeepzActivity extends BaseActivity {

    @BindView(R.id.peepz_content)
    PeepzContentView peepzContentView;

    private AutomaticPictureTaker automaticPictureTaker;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_peepz);
        ButterKnife.bind(this);

        Toolbar toolbar = ButterKnife.findById(this, R.id.toolbar);
        final View takePictureButton = ButterKnife.findById(this, R.id.peepz_button_take_picture);

        if (AccessibilityServices.newInstance(this).isSpokenFeedbackEnabled() || !peepzContentView.isInTouchMode()) {
            toolbar.inflateMenu(R.menu.peepz);
            toolbar.setOnMenuItemClickListener(new Toolbar.OnMenuItemClickListener() {
                @Override
                public boolean onMenuItemClick(MenuItem item) {
                    if (item.getItemId() == R.id.peepz_menu_take_picture) {
                        onClickTakePicture();
                        return true;
                    }
                    return false;
                }
            });
            takePictureButton.setVisibility(View.GONE);
        } else {
            takePictureButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    onClickTakePicture();
                }
            });
            takePictureButton.setVisibility(View.VISIBLE);
        }

        // TODO: what if the user is not signed in?
        FirebaseUser signedInUser = firebaseApi().getSignedInUser();
        PeepUpdater peepUpdater = new PeepUpdater(new SystemClock(), FirebaseDatabase.getInstance(), signedInUser);
        PictureUploader pictureUploader = new PictureUploader(signedInUser);
        automaticPictureTaker = new AutomaticPictureTaker(peepzContentView.getCameraView(), pictureUploader, peepUpdater);

        Comparator<Peep> comparator = new PeepCompoundComparator(new SignedInUserIsFirstPeepComparator(signedInUser.getUid()), new LastSeenPeepComparator());
        PeepzService peepzService = new PeepzService(FirebaseDatabase.getInstance(), comparator);
        peepzService.observeChanges(onPeepsUpdatedCallback);
    }

    private final PeepzService.Callback onPeepsUpdatedCallback = new PeepzService.Callback() {
        @Override
        public void onNext(List<Peep> peepz) {
            peepzContentView.update(peepz);
            FirebaseUser signedInUser = firebaseApi().getSignedInUser();
            if (missingSignedInUserFromPeepz(peepz, signedInUser)) {
                automaticPictureTaker.requestPictureTake();
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
        automaticPictureTaker.start();
    }


    @Override
    protected void onPause() {
        automaticPictureTaker.stop();
        super.onPause();
    }

    private void onClickTakePicture() {
        startActivity(new Intent(this, SelfieActivity.class));
    }

}
