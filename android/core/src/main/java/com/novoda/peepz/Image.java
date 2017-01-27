package com.novoda.peepz;

public class Image {

    private final String payload;
    private final long timestamp;

    public Image(String payload, long timestamp) {
        this.payload = payload;
        this.timestamp = timestamp;
    }

    public String payload() {
        return payload;
    }

    public long timestamp() {
        return timestamp;
    }

}
