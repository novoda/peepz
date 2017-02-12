package com.novoda.support;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.drawable.Drawable;
import android.util.AttributeSet;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageView;

import com.novoda.peepz.R;

import butterknife.BindView;
import butterknife.ButterKnife;

public class FloatingActionButton extends FrameLayout {

    @BindView(R.id.floating_action_button_image)
    ImageView imageView;

    private final Drawable drawable;

    public FloatingActionButton(Context context, AttributeSet attrs) {
        super(context, attrs, R.attr.floatingActionButtonDefStyle);

        TypedArray typedArray = context.obtainStyledAttributes(attrs, R.styleable.FloatingActionButton);
        try {
            this.drawable = typedArray.getDrawable(R.styleable.FloatingActionButton_android_src);
        } finally {
            typedArray.recycle();
        }
    }

    @Override
    protected void onFinishInflate() {
        super.onFinishInflate();
        View.inflate(getContext(), R.layout.merge_floating_action_button, this);
        ButterKnife.bind(this);

        if (drawable == null) {
            throw new IllegalStateException("drawable not found. Did you forget to specify android:src attribute?");
        } else {
            imageView.setImageDrawable(drawable);
        }
    }

}
