package com.novoda.peepz;

import android.content.Context;
import android.content.res.TypedArray;
import android.support.design.internal.ForegroundLinearLayout;
import android.util.AttributeSet;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import butterknife.BindView;
import butterknife.ButterKnife;

public class SettingsDialogWidget extends LinearLayout {

    public SettingsDialogWidget(Context context, AttributeSet attrs) {
        super(context, attrs);
        super.setOrientation(VERTICAL);
    }

    @Override
    public final void setOrientation(int orientation) {
        // cannot change orientation
    }

    @Override
    protected void onFinishInflate() {
        super.onFinishInflate();
        View.inflate(getContext(), R.layout.merge_settings_dialog_widget, this);
        ButterKnife.bind(this);
    }

}
