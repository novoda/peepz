package com.novoda.peepz;

import android.content.Context;
import android.graphics.ColorFilter;
import android.graphics.ColorMatrix;
import android.graphics.ColorMatrixColorFilter;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;

import butterknife.BindView;
import butterknife.ButterKnife;

public class PeepView extends FrameLayout {

    private static final ColorFilter GRAYSCALE_FILTER;

    static {
        ColorMatrix matrix = new ColorMatrix();
        matrix.setSaturation(0);
        GRAYSCALE_FILTER = new ColorMatrixColorFilter(matrix);
    }

    @BindView(R.id.peep_text_name)
    TextView nameTextView;

    @BindView(R.id.peep_image)
    ImageView imageView;

    @BindView(R.id.peep_online_status)
    View onlineStatusView;

    public PeepView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    @Override
    protected void onFinishInflate() {
        super.onFinishInflate();
        View.inflate(getContext(), R.layout.merge_peep, this);
        ButterKnife.bind(this);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        int desiredHeightMeasureSpec = widthMeasureSpec;
        super.onMeasure(widthMeasureSpec, desiredHeightMeasureSpec);
    }

    public void bind(Peep peep) {
        String name = getDisplayNameFrom(peep);
        nameTextView.setText(name);
        imageView.setColorFilter(getColorFilterFor(peep.onlineStatus()));

        if (peep.image() != null) {
            Glide.with(getContext()).load(peep.image().payload()).into(imageView);
        } else {
            imageView.setImageBitmap(null);
        }
    }

    private String getDisplayNameFrom(Peep peep) {
        String[] names = peep.name().split(" ");
        return names.length == 1 ? names[0] : names[0] + " " + names[names.length - 1].substring(0, 1);
    }

    @Nullable
    private ColorFilter getColorFilterFor(Peep.OnlineStatus status) {
        if (status == Peep.OnlineStatus.STALE) {
            return GRAYSCALE_FILTER;
        } else {
            return null;
        }
    }

}
