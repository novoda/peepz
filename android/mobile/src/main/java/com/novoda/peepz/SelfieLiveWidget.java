package com.novoda.peepz;

import android.content.Context;
import android.util.AttributeSet;
import android.view.View;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageView;

import com.google.android.cameraview.CameraView;

import butterknife.BindView;
import butterknife.ButterKnife;

class SelfieLiveWidget extends FrameLayout {

    @BindView(R.id.selfie_live_camera)
    CameraView cameraView;

    @BindView(R.id.selfie_live_button_take_picture)
    Button takePictureButton;

    public SelfieLiveWidget(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    @Override
    protected void onFinishInflate() {
        super.onFinishInflate();
        View.inflate(getContext(), R.layout.merge_selfie_live, this);
        ButterKnife.bind(this);
    }

    public void bind(final byte[] baos, final Listener listener) {
        cameraView.takePicture();
    }

    public interface Listener {

        void onPictureTake(byte[] baos);

    }

}
