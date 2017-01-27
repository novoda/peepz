package com.novoda.peepz;

import javax.annotation.Nullable;

class Peep {

    private final String id;
    private final String name;
    private final Image image;
    private final long lastSeen;
    private final OnlineStatus onlineStatus;

    Peep(String id, String name, @Nullable Image image, long lastSeen, OnlineStatus onlineStatus) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.lastSeen = lastSeen;
        this.onlineStatus = onlineStatus;
    }

    public String id() {
        return id;
    }

    public String name() {
        return name;
    }

    @Nullable
    public Image image() {
        return image;
    }

    public long lastSeen() {
        return lastSeen;
    }

    public OnlineStatus onlineStatus() {
        return onlineStatus;
    }

    public enum OnlineStatus {

        FRESH,
        STALE

    }

}
