package com.novoda.peepz;

import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.view.View;

public class DebugActivity extends BaseActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_debug);
    }

    public void openDialog(View view) {
        View dialogView = getLayoutInflater().inflate(R.layout.debug_view_dialog, null, false);
        new AlertDialog.Builder(this)
                .setView(dialogView)
                .create()
                .show();
    }

}
