package com.novoda.peepz;

import android.content.Context;
import android.util.AttributeSet;
import android.view.View;
import android.widget.FrameLayout;
import androidx.annotation.Nullable;
import butterknife.BindView;
import butterknife.ButterKnife;
import com.google.android.cameraview.CameraView;

public class SelfieLiveWidget extends FrameLayout {

    @BindView(R.id.selfie_live_camera)
    PeepzCameraView cameraView;

    @BindView(R.id.selfie_live_button_take_picture)
    View takePictureButton;

    @Nullable
    private PictureTakeListener listener;

    public SelfieLiveWidget(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    @Override
    protected void onFinishInflate() {
        super.onFinishInflate();
        View.inflate(getContext(), R.layout.merge_selfie_live, this);
        ButterKnife.bind(this);
    }

    @Override
    protected void onDetachedFromWindow() {
        teardown();
        super.onDetachedFromWindow();
    }

    public void attachListener(PictureTakeListener listener) {
        this.listener = listener;

        cameraView.start();
        cameraView.addCallback(callback);

        takePictureButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                cameraView.takePicture();
            }
        });
    }

    private final CameraView.Callback callback = new CameraView.Callback() {
        @Override
        public void onPictureTaken(CameraView cameraView, byte[] data) {
            super.onPictureTaken(cameraView, data);
            if (listener != null) {
                listener.onPictureTake(data);
            }
        }
    };

    public void teardown() {
        takePictureButton.setOnClickListener(null);
        takePictureButton.setClickable(false);

        cameraView.removeCallback(callback);
        cameraView.stop();

        listener = null;
    }

}
