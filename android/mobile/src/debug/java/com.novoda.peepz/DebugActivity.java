package com.novoda.peepz;

import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;

public class DebugActivity extends BaseActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_debug);
    }

    public void openDialog(View view) {
        SettingsDialogWidget dialogView = (SettingsDialogWidget) getLayoutInflater().inflate(R.layout.view_settings_dialog, null, false);
        final AlertDialog alertDialog = new AlertDialog.Builder(this)
                .setView(dialogView)
                .create();

        dialogView.bind(new SettingsDialogWidget.Callback() {
            @Override
            public void onClickOk(PictureTakeInterval interval, boolean shouldShowOfflinePeepz) {
                Toast.makeText(getApplicationContext(), "click: " + interval.name(), Toast.LENGTH_SHORT).show();
                alertDialog.dismiss();
            }

            @Override
            public void onClickCancel() {
                alertDialog.dismiss();
            }
        }, PictureTakeInterval.FREQUENT, true);

        alertDialog.show();
    }


}
