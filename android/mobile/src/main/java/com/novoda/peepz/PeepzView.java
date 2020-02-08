package com.novoda.peepz;

import android.content.Context;
import android.util.AttributeSet;

//import com.ataulm.rv.SpacesItemDecoration;

import java.util.List;

import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

public class PeepzView extends RecyclerView {

    public PeepzView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    @Override
    protected void onFinishInflate() {
        super.onFinishInflate();
        int spans = getResources().getInteger(R.integer.spans);
        setLayoutManager(new GridLayoutManager(getContext(), spans));
        int dimensionPixelSize = getResources().getDimensionPixelSize(R.dimen.grid_spacing);
//        addItemDecoration(SpacesItemDecoration.newInstance(dimensionPixelSize, dimensionPixelSize, spans));
    }

    public void update(List<Peep> peepz) {
        if (getAdapter() == null) {
            PeepAdapter peepAdapter = new PeepAdapter();
            peepAdapter.update(peepz);
            setAdapter(peepAdapter);
        } else {
            ((PeepAdapter) getAdapter()).update(peepz);
        }
    }

}
