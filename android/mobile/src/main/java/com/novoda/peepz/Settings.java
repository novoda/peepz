package com.novoda.peepz;

import android.content.Context;
import android.content.SharedPreferences;

class Settings {

    private static final String KEY_INTERVAL = "key_interval";
    private static final String KEY_SHOW_OFFLINE_PEEPZ = "key_show_offline_peepz";
    private static final String FILE = "com.novoda.peepz.settings";
    private static final PictureTakeInterval DEFAULT_INTERVAL = PictureTakeInterval.FREQUENT;

    private final SharedPreferences sharedPreferences;

    public static Settings create(Context context) {
        SharedPreferences preferences = context.getSharedPreferences(FILE, Context.MODE_PRIVATE);
        return new Settings(preferences);
    }

    Settings(SharedPreferences sharedPreferences) {
        this.sharedPreferences = sharedPreferences;
    }

    public PictureTakeInterval getPictureTakeInterval() {
        int id = sharedPreferences.getInt(KEY_INTERVAL, DEFAULT_INTERVAL.id());
        for (PictureTakeInterval interval : PictureTakeInterval.values()) {
            if (interval.id() == id) {
                return interval;
            }
        }
        return DEFAULT_INTERVAL;
    }

    public void setPictureTakeInterval(PictureTakeInterval interval) {
        sharedPreferences.edit().putInt(KEY_INTERVAL, interval.id()).apply();
    }

    public boolean shouldShowOfflinePeepz() {
        return sharedPreferences.getBoolean(KEY_SHOW_OFFLINE_PEEPZ, true);
    }

    public void setShouldShowOfflinePeepz(boolean shouldShowOfflinePeepz) {
        sharedPreferences.edit().putBoolean(KEY_SHOW_OFFLINE_PEEPZ, shouldShowOfflinePeepz).apply();
    }

}
