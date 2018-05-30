package com.novoda.peepz;

import android.content.Context;
import android.graphics.ColorFilter;
import android.graphics.ColorMatrix;
import android.graphics.ColorMatrixColorFilter;
import android.graphics.Outline;
import android.graphics.Rect;
import android.support.annotation.Nullable;
import android.support.annotation.Px;
import android.util.AttributeSet;
import android.view.View;
import android.view.ViewOutlineProvider;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.novoda.peepz.common.R;
import com.novoda.peepz.common.R2;

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

    @BindView(R2.id.peep_image)
    ImageView imageView;

    @BindView(R2.id.peep_online_indicator)
    View onlineIndicatorView;

    @BindView(R2.id.peep_text_name)
    TextView nameTextView;

    public PeepView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    @Override
    protected void onFinishInflate() {
        super.onFinishInflate();
        View.inflate(getContext(), R.layout.merge_peep, this);
        ButterKnife.bind(this);

        int radiusPx = getResources().getDimensionPixelSize(R.dimen.grid_item_radius);
        setOutlineProvider(new RoundedCornersOutlineProvider(radiusPx));
        setClipToOutline(true);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        int desiredHeightMeasureSpec = widthMeasureSpec;
        super.onMeasure(widthMeasureSpec, desiredHeightMeasureSpec);
    }

    public void bind(Peep peep) {
        String name = getDisplayNameFrom(peep);
        nameTextView.setText(name);

        Image image = peep.image();
        if (image != null) {
            updateImage(peep);
            imageView.setColorFilter(getColorFilterFor(peep.lastSeen().freshness()));
        } else {
            imageView.setImageBitmap(null);
        }

        if (peep.image() != null && peep.image().freshness() == Freshness.SUPER_FRESH && peep.lastSeen().freshness() == Freshness.SUPER_FRESH) {
            onlineIndicatorView.setBackgroundResource(R.drawable.peep_indicator_fresh);
        } else if (peep.lastSeen().freshness() == Freshness.SUPER_FRESH) {
            onlineIndicatorView.setBackgroundResource(R.drawable.peep_indicator_idle);
        } else {
            onlineIndicatorView.setBackgroundResource(R.drawable.peep_indicator_offline);
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
    private ColorFilter getColorFilterFor(Freshness status) {
        if (status == Freshness.NOT_SO_FRESH) {
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

    private static class RoundedCornersOutlineProvider extends ViewOutlineProvider {

        private final Rect rect = new Rect();
        @Px
        private final int radiusPx;

        RoundedCornersOutlineProvider(@Px int radiusPx) {
            this.radiusPx = radiusPx;
        }

        @Override
        public void getOutline(View view, Outline outline) {
            view.getDrawingRect(rect);
            // TODO: getting artifacts - why?
            outline.setRoundRect(rect, radiusPx);
        }

    }

}
