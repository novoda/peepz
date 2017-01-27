package com.novoda.peepz;

import android.content.Context;
import android.util.AttributeSet;
import android.view.View;
import android.widget.FrameLayout;

import butterknife.BindView;
import butterknife.ButterKnife;

class SelfieView extends FrameLayout {

    @BindView(R.id.selfie_live)
    SelfieLiveWidget liveWidget;

    @BindView(R.id.selfie_preview)
    SelfiePreviewWidget previewWidget;

    private Listener listener;

    public SelfieView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    @Override
    protected void onFinishInflate() {
        super.onFinishInflate();
        View.inflate(getContext(), R.layout.merge_selfie, this);
        ButterKnife.bind(this);
    }

    public void attach(Listener listener) {

    }

    public void detachListeners() {
        this.listener = null;
    }

    public interface Listener {

        void onPictureTaken(byte[] data);

    }

}
