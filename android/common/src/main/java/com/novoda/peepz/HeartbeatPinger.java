package com.novoda.peepz;

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
        ping();
    }

    private void ping() {
        peepUpdater.updatePeepLastSeen();
        scheduleNextHeartbeatPing();
    }

    private void scheduleNextHeartbeatPing() {
        timer.schedule(new Timer.Callback() {
            @Override
            public void onCountdownComplete() {
                ping();
            }
        }, Duration.minutes(DELAY_BETWEEN_PINGS_MINUTES));
    }

    public void stop() {
        timer.stop();
    }

}
