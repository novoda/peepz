package com.novoda.peepz;

import android.util.Log;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

class PeepzService {

    private final FirebaseDatabase database;
    private final Comparator<Peep> comparator;

    PeepzService(FirebaseDatabase database, Comparator<Peep> comparator) {
        this.database = database;
        this.comparator = comparator;
    }

    public void observeChanges(final Callback callback) {
        DatabaseReference wallRef = database.getReference(BaseActivity.KEY_ROOT);
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
                Collections.sort(peepz, comparator);
                callback.onNext(peepz);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                // TODO: on error?
            }

        });
    }

    public interface Callback {

        void onNext(List<Peep> peepz);

    }

}
