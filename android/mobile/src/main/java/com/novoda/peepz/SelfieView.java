package com.novoda.peepz;

import android.content.Context;
import androidx.annotation.Nullable;
import android.util.AttributeSet;
import android.view.View;
import android.widget.FrameLayout;

import butterknife.BindView;
import butterknife.ButterKnife;

public class SelfieView extends FrameLayout {

    @BindView(R.id.selfie_live)
    SelfieLiveWidget liveWidget;

    @BindView(R.id.selfie_preview)
    SelfiePreviewWidget previewWidget;

    @Nullable
    private PictureTakeListener listener;

    public SelfieView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    @Override
    protected void onFinishInflate() {
        super.onFinishInflate();
        View.inflate(getContext(), R.layout.merge_selfie, this);
        ButterKnife.bind(this);
    }

    public void attach(PictureTakeListener listener) {
        this.listener = listener;
        liveWidget.attachListener(wrappedListener);
    }

    private final PictureTakeListener wrappedListener = new PictureTakeListener() {
        @Override
        public void onPictureTake(byte[] baos) {
            previewWidget.bind(baos, new SelfiePreviewWidget.Listener() {
                @Override
                public void onClickRetakePicture() {
                    liveWidget.setVisibility(VISIBLE);
                    previewWidget.setVisibility(GONE);
                }

                @Override
                public void onClickAccept(byte[] baos) {
                    if (listener != null) {
                        listener.onPictureTake(baos);
                    }
                }
            });

            previewWidget.setVisibility(VISIBLE);
            liveWidget.setVisibility(GONE);
        }
    };

    public void detachListeners() {
        liveWidget.teardown();
    }
}
