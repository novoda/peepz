package com.novoda.peepz;

import android.util.Log;

import com.novoda.support.Duration;

class HeartbeatPinger {

    private static final int DELAY_BETWEEN_PINGS_MINUTES = 2;

    private final Timer timer;
    private final PeepUpdater peepUpdater;

    HeartbeatPinger(Timer timer, PeepUpdater peepUpdater) {
        this.timer = timer;
        this.peepUpdater = peepUpdater;
    }

    public void start() {
        log("start");
        ping();
    }

    private void ping() {
        log("ping");
        peepUpdater.updatePeepLastSeen();
        scheduleNextHeartbeatPing();
    }

    private void scheduleNextHeartbeatPing() {
        timer.schedule(new Timer.Callback() {
            @Override
            public void onCountdownComplete() {
                log("onCountdownComplete");
                ping();
            }
        }, Duration.minutes(DELAY_BETWEEN_PINGS_MINUTES));
    }

    public void stop() {
        log("stop");
        timer.stop();
    }

    private static int log(String msg) {
        return Log.v("!!!", HeartbeatPinger.class.getName() + ": " + msg);
    }

}
