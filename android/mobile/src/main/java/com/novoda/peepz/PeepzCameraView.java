package com.novoda.peepz;

import android.content.Context;
import android.util.AttributeSet;

import android.widget.FrameLayout;
import androidx.annotation.Nullable;
import com.google.android.cameraview.CameraView;

public class PeepzCameraView extends FrameLayout {

    @Nullable
    private CameraView cameraView = null;

    public PeepzCameraView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    @Override
    protected void onFinishInflate() {
        super.onFinishInflate();
        if (isInEditMode()) {
            return;
        }
        addCameraView();
    }

    private void addCameraView() {
        cameraView = new CameraView(getContext());
        removeAllViews();
        addView(cameraView, new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
        cameraView.setFacing(CameraView.FACING_FRONT);
        cameraView.setFlash(CameraView.FLASH_OFF);
        cameraView.setAutoFocus(true);
    }

    public void addCallback(CameraView.Callback cameraViewCallback) {
       if (cameraView != null) {
           cameraView.addCallback(cameraViewCallback);
       }
    }

    public void start() {
        if (cameraView != null) {
            cameraView.start();
        }
    }

    public void takePicture() {
        if (cameraView != null) {
            cameraView.takePicture();
        }
    }

    public void stop() {
        if (cameraView != null) {
            cameraView.stop();
        }
    }

    public void removeCallback(CameraView.Callback cameraViewCallback) {
        if (cameraView != null) {
            cameraView.removeCallback(cameraViewCallback);
        }
    }
}
