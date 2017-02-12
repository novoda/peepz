package com.novoda.peepz;

public class Image {

    private final String payload;
    private final long timestamp;
    private final Freshness freshness;

    public Image(String payload, long timestamp, Freshness freshness) {
        this.payload = payload;
        this.timestamp = timestamp;
        this.freshness = freshness;
    }

    public String payload() {
        return payload;
    }

    public long timestamp() {
        return timestamp;
    }

    public Freshness freshness() {
        return freshness;
    }

}
