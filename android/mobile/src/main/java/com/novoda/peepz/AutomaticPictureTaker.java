package com.novoda.peepz;

import android.os.Handler;

import com.google.android.cameraview.CameraView;

import java.util.concurrent.TimeUnit;

class AutomaticPictureTaker {

    private static final int DELAY_MINUTES_BETWEEN_AUTOMATIC_PHOTOS = 2;

    private final CameraView cameraView;
    private final PictureUploader pictureUploader;
    private final PeepUpdater peepUpdater;

    private boolean cameraReady;

    AutomaticPictureTaker(CameraView cameraView, PictureUploader pictureUploader, PeepUpdater peepUpdater) {
        this.cameraView = cameraView;
        this.pictureUploader = pictureUploader;
        this.peepUpdater = peepUpdater;
    }

    public void start() {
        cameraView.addCallback(cameraViewCallback);
        cameraView.start();
    }

    private final CameraView.Callback cameraViewCallback = new CameraView.Callback() {

        @Override
        public void onCameraOpened(CameraView cameraView) {
            cameraReady = true;
            scheduleAutomaticPictureTake();
        }

        @Override
        public void onPictureTaken(CameraView cameraView, byte[] data) {
            pictureUploader.upload(data, new PictureUploader.Callback() {
                @Override
                public void onSuccess(String pictureUrl) {
                    peepUpdater.updatePeepImage(pictureUrl);
                }

                @Override
                public void onFailure() {
                    // TODO: log errors uploading
                }
            });
        }

    };

    private void scheduleAutomaticPictureTake() {
        long delayMillis = TimeUnit.MINUTES.toMillis(DELAY_MINUTES_BETWEEN_AUTOMATIC_PHOTOS);
        new Handler().postDelayed(runnable, delayMillis);
    }

    private final Runnable runnable = new Runnable() {
        @Override
        public void run() {
            if (cameraReady) {
                cameraView.takePicture();
                scheduleAutomaticPictureTake();
            }
        }
    };

    public void stop() {
        cameraReady = false;
        cameraView.stop();
        cameraView.removeCallback(cameraViewCallback);
    }

}
