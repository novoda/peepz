package com.novoda.peepz;

import android.os.Handler;
import android.util.Log;

import com.google.android.cameraview.CameraView;

import java.util.concurrent.TimeUnit;

class PreviewlessPictureTaker {

    private static final int DELAY_MINUTES_BETWEEN_AUTOMATIC_PHOTOS = 2;

    private final CameraView cameraView;
    private final PictureUploader pictureUploader;
    private final PeepUpdater peepUpdater;
    private final Handler handler = new Handler();

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

    private final CameraView.Callback cameraViewCallback = new CameraView.Callback() {

        @Override
        public void onCameraOpened(CameraView cameraView) {
            log("onCameraOpened");
            cameraReady = true;
            scheduleAutomaticPictureTake();
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
            handler.removeCallbacks(runnable);
        }

    };

    private void scheduleAutomaticPictureTake() {
        long delayMillis = TimeUnit.MINUTES.toMillis(DELAY_MINUTES_BETWEEN_AUTOMATIC_PHOTOS);
        handler.postDelayed(runnable, delayMillis);
    }

    private final Runnable runnable = new Runnable() {
        @Override
        public void run() {
            takeNewPicture();
            scheduleAutomaticPictureTake();
        }
    };

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

    public interface Callback {

        void onPictureUploaded();

    }

    private static int log(String msg) {
        return Log.v("!!!", PreviewlessPictureTaker.class.getName() + ": " + msg);
    }

}
