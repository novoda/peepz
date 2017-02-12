package com.novoda.peepz;

import android.content.Context;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.AttributeSet;
import android.view.View;
import android.widget.FrameLayout;

import com.ataulm.rv.SpacesItemDecoration;
import com.google.android.cameraview.CameraView;

import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

public class PeepzContentView extends FrameLayout {

    @BindView(R.id.peepz_content_collection)
    RecyclerView recyclerView;

    @BindView(R.id.peepz_content_secret_camera)
    CameraView secretCameraView;

    public PeepzContentView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    @Override
    protected void onFinishInflate() {
        super.onFinishInflate();
        View.inflate(getContext(), R.layout.merge_peepz_content, this);
        ButterKnife.bind(this);

        int spans = getResources().getInteger(R.integer.spans);
        recyclerView.setLayoutManager(new GridLayoutManager(getContext(), spans));
        int dimensionPixelSize = getResources().getDimensionPixelSize(R.dimen.grid_spacing);
        recyclerView.addItemDecoration(SpacesItemDecoration.newInstance(dimensionPixelSize, dimensionPixelSize, spans));
    }

    public CameraView getCameraView() {
        return secretCameraView;
    }

    public void update(List<Peep> peepz) {
        if (recyclerView.getAdapter() == null) {
            PeepAdapter peepAdapter = new PeepAdapter();
            peepAdapter.update(peepz);
            recyclerView.setAdapter(peepAdapter);
        } else {
            ((PeepAdapter) recyclerView.getAdapter()).update(peepz);
        }
    }



}
