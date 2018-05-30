package com.novoda.peepz;

import android.content.Context;
import android.content.res.TypedArray;
import android.support.design.internal.ForegroundLinearLayout;
import android.util.AttributeSet;
import android.view.View;
import android.widget.TextView;

import com.novoda.peepz.common.R;
import com.novoda.peepz.common.R2;

import butterknife.BindView;
import butterknife.ButterKnife;

public class RadioButtonWidget extends ForegroundLinearLayout {

    @BindView(R2.id.radio_button_text_label)
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
