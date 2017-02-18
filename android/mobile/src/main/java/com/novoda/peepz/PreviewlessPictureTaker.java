package com.novoda.peepz;

import android.util.Log;

import com.google.android.cameraview.CameraView;

class PreviewlessPictureTaker {

    private final CameraView cameraView;
    private final PictureUploader pictureUploader;
    private final PeepUpdater peepUpdater;

    private Callback callback;
    private boolean cameraReady;

    PreviewlessPictureTaker(CameraView cameraView, PictureUploader pictureUploader, PeepUpdater peepUpdater) {
        this.cameraView = cameraView;
        this.pictureUploader = pictureUploader;
        this.peepUpdater = peepUpdater;
    }

    public void start(Callback callback) {
        this.callback = callback;

        cameraView.addCallback(cameraViewCallback);
        cameraView.start();
    }

    public void takeNewPicture() {
        if (cameraReady) {
            log("takeNewPicture");
            cameraView.takePicture();
        } else {
            log("takeNewPicture but camera not ready");
        }
    }

    public void stop() {
        cameraReady = false;
        cameraView.stop();
        cameraView.removeCallback(cameraViewCallback);

        this.callback = null;
    }

    private final CameraView.Callback cameraViewCallback = new CameraView.Callback() {

        @Override
        public void onCameraOpened(CameraView cameraView) {
            log("onCameraOpened");
            cameraReady = true;
        }

        @Override
        public void onPictureTaken(CameraView cameraView, byte[] data) {
            pictureUploader.upload(data, new PictureUploader.Callback() {
                @Override
                public void onSuccess(String pictureUrl) {
                    if (callback != null) {
                        callback.onPictureUploaded();
                    }
                    peepUpdater.updatePeepImage(pictureUrl);
                }

                @Override
                public void onFailure() {
                    // TODO: log errors uploading
                }
            });
        }

        @Override
        public void onCameraClosed(CameraView cameraView) {
            log("onCameraClosed");
            cameraReady = false;
        }

    };

    public interface Callback {

        void onPictureUploaded();

    }

    private static int log(String msg) {
        return Log.v("!!!", PreviewlessPictureTaker.class.getName() + ": " + msg);
    }

}
