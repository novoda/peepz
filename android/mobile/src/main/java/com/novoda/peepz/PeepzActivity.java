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
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

public class PeepzActivity extends BaseActivity {

    @BindView(R.id.peepz_collection)
    RecyclerView recyclerView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_peepz);
        ButterKnife.bind(this);

        int spans = getResources().getInteger(R.integer.spans);
        recyclerView.setLayoutManager(new GridLayoutManager(this, spans));
        int dimensionPixelSize = getResources().getDimensionPixelSize(R.dimen.grid_spacing);
        recyclerView.addItemDecoration(SpacesItemDecoration.newInstance(dimensionPixelSize, dimensionPixelSize, spans));
        fetchData();

        Toolbar toolbar = ButterKnife.findById(this, R.id.toolbar);
        setSupportActionBar(toolbar);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.peepz, menu);
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
