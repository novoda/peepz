package com.novoda.peepz;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;

import com.ataulm.rv.SpacesItemDecoration;
import com.google.android.cameraview.CameraView;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.FirebaseDatabase;
import com.novoda.accessibility.AccessibilityServices;
import com.novoda.support.SystemClock;

import java.util.Comparator;
import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

public class PeepzActivity extends BaseActivity {

    @BindView(R.id.peepz_collection)
    RecyclerView recyclerView;

    @BindView(R.id.peepz_secret_camera)
    CameraView secretCameraView;

    private AccessibilityServices accessibilityServices;
    private AutomaticPictureTaker automaticPictureTaker;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_peepz);
        ButterKnife.bind(this);

        accessibilityServices = AccessibilityServices.newInstance(this);

        int spans = getResources().getInteger(R.integer.spans);
        recyclerView.setLayoutManager(new GridLayoutManager(this, spans));
        int dimensionPixelSize = getResources().getDimensionPixelSize(R.dimen.grid_spacing);
        recyclerView.addItemDecoration(SpacesItemDecoration.newInstance(dimensionPixelSize, dimensionPixelSize, spans));

        Toolbar toolbar = ButterKnife.findById(this, R.id.toolbar);
        setSupportActionBar(toolbar);

        // TODO: what if the user is not signed in?
        FirebaseUser signedInUser = firebaseApi().getSignedInUser();
        PeepUpdater peepUpdater = new PeepUpdater(new SystemClock(), FirebaseDatabase.getInstance(), signedInUser);
        PictureUploader pictureUploader = new PictureUploader(signedInUser);
        automaticPictureTaker = new AutomaticPictureTaker(secretCameraView, pictureUploader, peepUpdater);

        PeepzService peepzService = new PeepzService(FirebaseDatabase.getInstance());
        peepzService.observeChanges(onPeepsUpdatedCallback);
    }

    private final PeepzService.Callback onPeepsUpdatedCallback = new PeepzService.Callback() {
        @Override
        public void onNext(List<Peep> peepz) {
            FirebaseUser signedInUser = firebaseApi().getSignedInUser();
            String signedInUserUid = signedInUser.getUid();
            if (missingSignedInUserFromPeepz(peepz, signedInUser)) {
                automaticPictureTaker.requestPictureTake();
            }

            if (recyclerView.getAdapter() == null) {
                Comparator<Peep> comparator = new PeepCompoundComparator(new SignedInUserIsFirstPeepComparator(signedInUserUid), new LastSeenPeepComparator());
                PeepAdapter peepAdapter = new PeepAdapter(comparator);
                peepAdapter.update(peepz);
                recyclerView.setAdapter(peepAdapter);
            } else {
                ((PeepAdapter) recyclerView.getAdapter()).update(peepz);
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

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        if (shouldShowAppBarAction()) {
            getMenuInflater().inflate(R.menu.peepz, menu);
            return true;
        } else {
            // TODO: show fab instead
            return false;
        }
    }

    private boolean shouldShowAppBarAction() {
        // TODO: `return accessibilityServices.isSpokenFeedbackEnabled() || !recyclerView.isInTouchMode();` when fab is implemented
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.peepz_menu_take_picture) {
            // TODO: might wanna go startActivityForResult unless selfieActivity stays there til picture is uploaded
            startActivity(new Intent(this, SelfieActivity.class));
            return true;
        } else {
            return super.onOptionsItemSelected(item);
        }
    }

}
