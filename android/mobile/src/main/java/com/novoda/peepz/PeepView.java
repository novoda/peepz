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

    private final ImageState imageState = new ImageState();

    @BindView(R.id.peep_text_name)
    TextView nameTextView;

    @BindView(R.id.peep_image)
    ImageView imageView;

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
            updateImage(peep);
        } else {
            imageView.setImageBitmap(null);
        }
    }

    private void updateImage(Peep peep) {
        if (imageState.shouldUpdateImageFor(peep)) {
            Glide.with(getContext())
                    .load(peep.image().payload())
                    .crossFade()
                    .into(imageView);
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

    private static class ImageState {

        private Peep peep;

        boolean shouldUpdateImageFor(Peep peep) {
            if (different(peep)) {
                this.peep = peep;
                return true;
            }

            return imageUpdatedFor(peep);
        }

        private boolean different(Peep peep) {
            return this.peep == null || !peep.id().equals(this.peep.id());
        }

        private boolean imageUpdatedFor(Peep peep) {
            long oldImage = this.peep.image().timestamp();
            long newImage = peep.image().timestamp();
            return oldImage < newImage;
        }

    }

}
