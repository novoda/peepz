package com.novoda.support;

public class StaticClock implements Clock {

    private final long fixedTimeMillis;

    public StaticClock() {
        this(0);
    }

    public StaticClock(long fixedTimeMillis) {
        this.fixedTimeMillis = fixedTimeMillis;
    }

    @Override
    public long currentTimeMillis() {
        return fixedTimeMillis;
    }

}
