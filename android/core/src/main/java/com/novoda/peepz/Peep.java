package com.novoda.peepz;

import javax.annotation.Nullable;

class Peep {

    private final String id;
    private final String name;
    private final Image image;
    private final LastSeen lastSeen;

    Peep(String id, String name, @Nullable Image image, LastSeen lastSeen) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.lastSeen = lastSeen;
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

    public LastSeen lastSeen() {
        return lastSeen;
    }

}
