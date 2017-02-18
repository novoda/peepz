package com.novoda.peepz;

import android.util.Log;

import com.novoda.support.Duration;

class AutomaticPreviewlessPictureTaker {

    private final Settings settings;
    private final Timer timer;
    private final PreviewlessPictureTaker pictureTaker;

    AutomaticPreviewlessPictureTaker(Settings settings, Timer timer, PreviewlessPictureTaker pictureTaker) {
        this.settings = settings;
        this.timer = timer;
        this.pictureTaker = pictureTaker;
    }

    public void start() {
        log("start");
        final PictureTakeInterval interval = settings.getPictureTakeInterval();
        if (!autoPictureTakingEnabled(interval)) {
            log("auto picture taking disabled");
            return;
        }

        pictureTaker.start(new PreviewlessPictureTaker.Callback() {
            @Override
            public void onPictureUploaded() {
                scheduleNextPictureTake(interval);
            }
        });
        scheduleNextPictureTake(interval);
    }

    private boolean autoPictureTakingEnabled(PictureTakeInterval interval) {
        return interval != PictureTakeInterval.OFF;
    }

    private void scheduleNextPictureTake(PictureTakeInterval interval) {
        if (autoPictureTakingEnabled(interval)) {
            Duration delay = getDelayFor(interval);
            log("scheduleNextPictureTake " + delay.toString());
            scheduleTimerWith(delay);
        }
    }

    private void scheduleTimerWith(Duration delay) {
        timer.schedule(new Timer.Callback() {
            @Override
            public void onCountdownComplete() {
                takeNewPicture();
            }
        }, delay);
    }

    public void change(PictureTakeInterval interval) {
        log("change");
        stop();
        settings.setPictureTakeInterval(interval);

        if (autoPictureTakingEnabled(interval)) {
            start();
        }
    }

    public void takeNewPicture() {
        log("takeNewPicture");
        pictureTaker.takeNewPicture();
    }

    public void stop() {
        log("stop");
        timer.stop();
        pictureTaker.stop();
    }

    private Duration getDelayFor(PictureTakeInterval interval) {
        if (interval == PictureTakeInterval.VERY_FREQUENT) {
            return Duration.seconds(30);
        }

        if (interval == PictureTakeInterval.FREQUENT) {
            return Duration.minutes(2);
        }

        if (interval == PictureTakeInterval.INFREQUENT) {
            return Duration.minutes(5);
        }

        throw new IllegalArgumentException("no associated duration for given interval: " + interval);
    }

    private static int log(String msg) {
        return Log.v("!!!", AutomaticPreviewlessPictureTaker.class.getName() + ": " + msg);
    }
}
