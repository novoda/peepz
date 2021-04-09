package com.novoda.peepz;

import com.google.android.cameraview.CameraView;

class PreviewlessPictureTaker {

    private final PeepzCameraView cameraView;
    private final PictureUploader pictureUploader;
    private final PeepUpdater peepUpdater;

    private Callback callback;
    private boolean cameraReady;

    PreviewlessPictureTaker(PeepzCameraView cameraView, PictureUploader pictureUploader, PeepUpdater peepUpdater) {
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
            cameraView.takePicture();
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
            cameraReady = false;
        }

    };

    public interface Callback {

        void onPictureUploaded();

    }

}
