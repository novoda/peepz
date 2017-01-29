package com.novoda.support;

public class SystemClock implements Clock {

    @Override
    public long currentTimeMillis() {
        return System.currentTimeMillis();
    }

}
