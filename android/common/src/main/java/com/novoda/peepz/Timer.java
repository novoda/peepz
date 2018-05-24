package com.novoda.peepz;

import android.os.Handler;

import com.novoda.support.Duration;

class Timer {

    private final Handler handler;

    private Callback callback;

    Timer(Handler handler) {
        this.handler = handler;
    }

    public void schedule(Callback callback, Duration delay) {
        this.callback = callback;
        handler.postDelayed(ping, delay.toMillis());
    }

    private final Runnable ping = new Runnable() {
        @Override
        public void run() {
            callback.onCountdownComplete();
        }
    };

    public void stop() {
        handler.removeCallbacks(ping);
        this.callback = null;
    }

    public interface Callback {

        void onCountdownComplete();

    }

}
