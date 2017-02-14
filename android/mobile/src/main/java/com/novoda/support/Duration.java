package com.novoda.support;

import java.util.concurrent.TimeUnit;

public final class Duration {

    private final TimeUnit timeUnit;
    private final long value;

    public static Duration millis(long value) {
        return new Duration(TimeUnit.MILLISECONDS, value);
    }

    public static Duration seconds(long value) {
        return new Duration(TimeUnit.SECONDS, value);
    }

    public static Duration minutes(long value) {
        return new Duration(TimeUnit.MINUTES, value);
    }

    private Duration(TimeUnit timeUnit, long value) {
        this.timeUnit = timeUnit;
        this.value = value;
    }

    public long toMillis() {
        return timeUnit.toMillis(value);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Duration duration = (Duration) o;

        if (value != duration.value) return false;
        return timeUnit == duration.timeUnit;

    }

    @Override
    public int hashCode() {
        int result = timeUnit.hashCode();
        result = 31 * result + (int) (value ^ (value >>> 32));
        return result;
    }

    @Override
    public String toString() {
        return value + " " + timeUnit.name();
    }

}
