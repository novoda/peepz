package com.novoda.peepz;

import android.content.Context;
import android.content.res.TypedArray;
import android.util.AttributeSet;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;


import com.google.android.material.internal.ForegroundLinearLayout;

import butterknife.BindView;
import butterknife.ButterKnife;

public class RadioButtonWidget extends ForegroundLinearLayout {

    @BindView(R.id.radio_button_text_label)
    TextView labelTextView;

    private final String labelText;

    public RadioButtonWidget(Context context, AttributeSet attrs) {
        super(context, attrs, R.attr.radioButtonWidgetDefStyle);
        super.setOrientation(HORIZONTAL);

        TypedArray typedArray = context.obtainStyledAttributes(attrs, R.styleable.RadioButtonWidget);
        try {
            this.labelText = typedArray.getString(R.styleable.RadioButtonWidget_android_text);
        } finally {
            typedArray.recycle();
        }
    }

    @Override
    public final void setOrientation(int orientation) {
        // cannot change orientation
    }

    @Override
    protected void onFinishInflate() {
        super.onFinishInflate();
        View.inflate(getContext(), R.layout.merge_radio_button, this);
        ButterKnife.bind(this);

        labelTextView.setText(labelText);
    }

}
