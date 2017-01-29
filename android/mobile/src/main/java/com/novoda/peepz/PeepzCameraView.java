package com.novoda.peepz;

import android.content.Context;
import android.util.AttributeSet;

import com.google.android.cameraview.CameraView;

public class PeepzCameraView extends CameraView {

    public PeepzCameraView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    @Override
    protected void onFinishInflate() {
        super.onFinishInflate();
        setFacing(FACING_FRONT);
        setFlash(FLASH_OFF);
        setAutoFocus(true);
    }

}
