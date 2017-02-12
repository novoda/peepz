package com.novoda.peepz;

import java.util.HashMap;
import java.util.Map;

public final class ApiPeep {

    static final String KEY_IMAGE_PAYLOAD = "payload";
    static final String KEY_IMAGE_TIMESTAMP = "timestamp";

    public String uid;
    public String name;
    public Map<String, Object> image;
    public long lastSeen;

    public ApiPeep() {
    }

    public static ApiPeep create(String uid, String name, String imagePayload, long imageTimestamp, long lastSeen) {
        Map<String, Object> image = new HashMap<>(2);
        image.put(KEY_IMAGE_PAYLOAD, imagePayload);
        image.put(KEY_IMAGE_TIMESTAMP, imageTimestamp);

        return new ApiPeep(uid, name, image, lastSeen);
    }

    private ApiPeep(String uid, String name, Map<String, Object> image, long lastSeen) {
        this.uid = uid;
        this.name = name;
        this.image = image;
        this.lastSeen = lastSeen;
    }

    @Override
    public String toString() {
        return "{ name: " + name + ", uid: " + uid + ", lastSeen: " + lastSeen + "}";
    }

}
