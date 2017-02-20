package com.novoda.peepz;

import android.content.Context;
import android.content.res.TypedArray;
import android.support.design.internal.ForegroundLinearLayout;
import android.util.AttributeSet;
import android.view.View;
import android.widget.TextView;

import butterknife.BindView;
import butterknife.ButterKnife;

public class SwitchWidget extends ForegroundLinearLayout {

    @BindView(R.id.switch_text_label)
    TextView labelTextView;

    private final String labelText;

    public SwitchWidget(Context context, AttributeSet attrs) {
        super(context, attrs, R.attr.switchWidgetDefStyle);
        super.setOrientation(HORIZONTAL);

        TypedArray typedArray = context.obtainStyledAttributes(attrs, R.styleable.SwitchWidget);
        try {
            this.labelText = typedArray.getString(R.styleable.SwitchWidget_android_text);
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
        View.inflate(getContext(), R.layout.merge_switch, this);
        ButterKnife.bind(this);

        labelTextView.setText(labelText);
    }

}
