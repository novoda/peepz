package com.novoda.peepz;

public enum PictureTakeInterval {

    FREQUENT(1),
    INFREQUENT(2),
    OFF(3);

    private final int id;

    PictureTakeInterval(int id) {
        this.id = id;
    }

    public int id() {
        return id;
    }

}
