package com.novoda.peepz;

import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.view.View;
import android.widget.Toast;

public class DebugActivity extends BaseActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_debug);
    }

    public void openDialog(View view) {
        SettingsDialogWidget dialogView = (SettingsDialogWidget) getLayoutInflater().inflate(R.layout.debug_view_dialog, null, false);
        final AlertDialog alertDialog = new AlertDialog.Builder(this)
                .setView(dialogView)
                .create();

        dialogView.bind(new SettingsDialogWidget.Callback() {
            @Override
            public void onClickOk(PictureTakeInterval interval) {
                Toast.makeText(getApplicationContext(), "click: " + interval.name(), Toast.LENGTH_SHORT).show();
                alertDialog.dismiss();
            }

            @Override
            public void onClickCancel() {
                alertDialog.dismiss();
            }
        }, PictureTakeInterval.FREQUENT);

        alertDialog.show();
    }


}
