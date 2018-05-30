package com.novoda.peepz;

import com.google.firebase.database.DataSnapshot;

import java.util.concurrent.TimeUnit;

class Converter {

    private static final int MINUTES_UNTIL_STALE = 15;

    public Peep convert(DataSnapshot dataSnapshot) throws ConverterException {
        ApiPeep value = dataSnapshot.getValue(ApiPeep.class);

        if (value.uid == null || value.name == null) {
            throw new ConverterException("missing uid or name");
        }

        if (value.image == null) {
            throw new ConverterException("missing image");
        }

        String payload = (String) value.image.get(ApiPeep.KEY_IMAGE_PAYLOAD);
        long timestamp = (long) value.image.get(ApiPeep.KEY_IMAGE_TIMESTAMP);
        Image image = new Image(payload, timestamp, getFreshnessFor(timestamp));

        return new Peep(
                value.uid,
                value.name,
                image,
                new LastSeen(value.lastSeen, getFreshnessFor(value.lastSeen))
        );
    }

    private Freshness getFreshnessFor(long timestamp) {
        long diffMillis = System.currentTimeMillis() - timestamp;
        long diffMinutes = TimeUnit.MILLISECONDS.toMinutes(diffMillis);

        if (diffMinutes < MINUTES_UNTIL_STALE) {
            return Freshness.SUPER_FRESH;
        } else {
            return Freshness.NOT_SO_FRESH;
        }
    }

    public static class ConverterException extends Exception {

        public ConverterException(String message) {
            super(message);
        }
    }

}
