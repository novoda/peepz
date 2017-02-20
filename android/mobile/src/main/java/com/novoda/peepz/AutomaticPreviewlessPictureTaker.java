package com.novoda.peepz;

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
        final PictureTakeInterval interval = settings.getPictureTakeInterval();
        if (!autoPictureTakingEnabled(interval)) {
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
        stop();
        settings.setPictureTakeInterval(interval);

        if (autoPictureTakingEnabled(interval)) {
            start();
        }
    }

    public void takeNewPicture() {
        pictureTaker.takeNewPicture();
    }

    public void stop() {
        timer.stop();
        pictureTaker.stop();
    }

    private Duration getDelayFor(PictureTakeInterval interval) {
        if (interval == PictureTakeInterval.FREQUENT) {
            return Duration.minutes(2);
        }

        if (interval == PictureTakeInterval.INFREQUENT) {
            return Duration.minutes(5);
        }

        throw new IllegalArgumentException("no associated duration for given interval: " + interval);
    }

}
