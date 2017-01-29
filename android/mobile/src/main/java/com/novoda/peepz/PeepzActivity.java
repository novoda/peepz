package com.novoda.peepz;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;

import com.ataulm.rv.SpacesItemDecoration;
import com.google.android.cameraview.CameraView;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.novoda.accessibility.AccessibilityServices;
import com.novoda.support.SystemClock;

import java.util.ArrayList;
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
    private PictureUploader pictureUploader;
    private PeepUpdater peepUpdater;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_peepz);
        ButterKnife.bind(this);

        accessibilityServices = AccessibilityServices.newInstance(this);

        // TODO: what if the user is not signed in?
        FirebaseUser signedInUser = firebaseApi().getSignedInUser();
        peepUpdater = new PeepUpdater(new SystemClock(), FirebaseDatabase.getInstance(), signedInUser);
        pictureUploader = new PictureUploader(signedInUser);

        int spans = getResources().getInteger(R.integer.spans);
        recyclerView.setLayoutManager(new GridLayoutManager(this, spans));
        int dimensionPixelSize = getResources().getDimensionPixelSize(R.dimen.grid_spacing);
        recyclerView.addItemDecoration(SpacesItemDecoration.newInstance(dimensionPixelSize, dimensionPixelSize, spans));

        Toolbar toolbar = ButterKnife.findById(this, R.id.toolbar);
        setSupportActionBar(toolbar);

        fetchData();
    }

    @Override
    protected void onResume() {
        super.onResume();
        secretCameraView.start();
        secretCameraView.addCallback(cameraViewCallback);
    }

    private final CameraView.Callback cameraViewCallback = new CameraView.Callback() {
        @Override
        public void onPictureTaken(CameraView cameraView, byte[] data) {
            pictureUploader.upload(data, new PictureUploader.Callback() {
                @Override
                public void onSuccess(String pictureUrl) {
                    peepUpdater.updatePeepImage(pictureUrl);
                }

                @Override
                public void onFailure() {
                    toast("couldn't upload picture :(");
                }
            });
        }
    };

    @Override
    protected void onPause() {
        secretCameraView.removeCallback(cameraViewCallback);
        secretCameraView.stop();
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
        } else if (item.getItemId() == R.id.peepz_menu_debug_secret_picture) {
            secretCameraView.takePicture();
            return true;
        } else {
            return super.onOptionsItemSelected(item);
        }
    }

    private void fetchData() {
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference wallRef = database.getReference(KEY_ROOT);
        wallRef.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot wall) {
                Converter converter = new Converter();
                List<Peep> peepz = new ArrayList<>((int) wall.getChildrenCount());
                for (DataSnapshot item : wall.getChildren()) {
                    try {
                        Peep peep = converter.convert(item);
                        peepz.add(peep);
                    } catch (Converter.ConverterException e) {
                        Log.e("!!!", "error converting peep: " + item);
                    }
                }
                onNext(peepz);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                // TODO: on error?
            }
        });
    }

    private void onNext(List<Peep> peepz) {
        if (recyclerView.getAdapter() == null) {
            String signedInUserUid = firebaseApi().getSignedInUser().getUid();
            Comparator<Peep> comparator = new PeepCompoundComparator(new SignedInUserIsFirstPeepComparator(signedInUserUid), new LastSeenPeepComparator());
            PeepAdapter peepAdapter = new PeepAdapter(comparator);
            peepAdapter.update(peepz);
            recyclerView.setAdapter(peepAdapter);
        } else {
            ((PeepAdapter) recyclerView.getAdapter()).update(peepz);
        }
    }

}
