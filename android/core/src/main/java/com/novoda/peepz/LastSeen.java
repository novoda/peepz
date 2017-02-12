package com.novoda.peepz;

public class LastSeen {

    private final long timestamp;
    private final Freshness freshness;

    public LastSeen(long timestamp, Freshness freshness) {
        this.timestamp = timestamp;
        this.freshness = freshness;
    }

    public long timestamp() {
        return timestamp;
    }

    public Freshness freshness() {
        return freshness;
    }

}
