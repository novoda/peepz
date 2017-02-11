package com.novoda.support;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.drawable.Drawable;
import android.support.annotation.ColorInt;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageView;

import com.novoda.peepz.R;

import butterknife.BindView;
import butterknife.ButterKnife;

public class CircleActionButton extends FrameLayout {

    @BindView(R.id.circle_action_button_image)
    ImageView imageView;

    private final Drawable drawable;
    @Nullable
    private final Drawable backgroundDrawable;

    @ColorInt
    private final int backgroundResource;

    public CircleActionButton(Context context, AttributeSet attrs) {
        super(context, attrs, R.attr.peepzCircleActionButtonDefStyle);

        TypedArray typedArray = context.obtainStyledAttributes(attrs, R.styleable.CircleActionButton);
        try {
            this.drawable = typedArray.getDrawable(R.styleable.CircleActionButton_android_src);
            this.backgroundDrawable = typedArray.getDrawable(R.styleable.CircleActionButton_android_background);
            this.backgroundResource = typedArray.getColor(R.styleable.CircleActionButton_android_background, getResources().getColor(R.color.transparent));
        } finally {
            typedArray.recycle();
        }
    }

    @Override
    protected void onFinishInflate() {
        super.onFinishInflate();
        View.inflate(getContext(), R.layout.merge_circle_action_button, this);
        ButterKnife.bind(this);

        if (drawable == null) {
            throw new IllegalStateException("drawable not found. Did you forget to specify android:src attribute?");
        } else {
            imageView.setImageDrawable(drawable);
        }

        if (backgroundDrawable != null) {
            setBackground(backgroundDrawable);
        } else {
            setBackgroundColor(backgroundResource);
        }
    }

}
