package com.novoda.peepz;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.util.AttributeSet;
import android.util.DisplayMetrics;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageView;

import com.novoda.peepz.common.R;
import com.novoda.peepz.common.R2;

import butterknife.BindView;
import butterknife.ButterKnife;

public class SelfiePreviewWidget extends FrameLayout {

    private final static Matrix FLIP_HORIZONTAL_MATRIX = new Matrix();
    static {
        FLIP_HORIZONTAL_MATRIX.preScale(-1, 1);
    }

    @BindView(R2.id.selfie_preview_image)
    ImageView imageView;

    @BindView(R2.id.selfie_preview_button_retake)
    View retakeButton;

    @BindView(R2.id.selfie_preview_button_accept)
    View acceptButton;

    public SelfiePreviewWidget(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    @Override
    protected void onFinishInflate() {
        super.onFinishInflate();
        View.inflate(getContext(), R.layout.merge_selfie_preview, this);
        ButterKnife.bind(this);
    }

    public void bind(final byte[] data, final Listener listener) {
        Bitmap flippedBitmap = decodeAndFlipHorizontalBitmapFrom(data);
        imageView.setImageBitmap(flippedBitmap);

        retakeButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                listener.onClickRetakePicture();
            }
        });

        acceptButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                listener.onClickAccept(data);
            }
        });
    }


    private Bitmap decodeAndFlipHorizontalBitmapFrom(byte[] data) {
        Bitmap bitmap = BitmapFactory.decodeByteArray(data, 0, data.length);
        Bitmap flippedBitmap = Bitmap.createBitmap(bitmap, 0, 0, bitmap.getWidth(), bitmap.getHeight(), FLIP_HORIZONTAL_MATRIX, false);
        flippedBitmap.setDensity(DisplayMetrics.DENSITY_DEFAULT);
        return flippedBitmap;
    }

    public interface Listener {

        void onClickRetakePicture();

        void onClickAccept(byte[] baos);

    }

}
