package com.novoda.support.camera;

import android.hardware.camera2.CameraAccessException;

class CameraHelperException extends java.lang.Exception {

    public static CameraHelperException from(CameraAccessException exception) {
        int reason = exception.getReason(); // TODO: we can switch on reason and give better message
        return new CameraHelperException("internal error. reason: " + reason, exception);
    }

    public CameraHelperException(String message) {
        super(message);
    }

    private CameraHelperException(String message, CameraAccessException cameraAccessException) {
        super(message, cameraAccessException);
    }

}
