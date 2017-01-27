package com.novoda.peepz;

import android.content.Context;
import android.util.AttributeSet;
import android.view.View;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageView;

import butterknife.BindView;
import butterknife.ButterKnife;

class SelfiePreviewWidget extends FrameLayout {

    @BindView(R.id.selfie_preview_image)
    ImageView imageView;

    @BindView(R.id.selfie_preview_button_retake)
    Button retakeButton;

    @BindView(R.id.selfie_preview_button_accept)
    Button acceptButton;

    public SelfiePreviewWidget(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    @Override
    protected void onFinishInflate() {
        super.onFinishInflate();
        View.inflate(getContext(), R.layout.merge_selfie_preview, this);
        ButterKnife.bind(this);
    }

    public void bind(final byte[] baos, final Listener listener) {
        // TODO: render baos

        retakeButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                listener.onClickRetakePicture();
            }
        });

        acceptButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                listener.onClickAccept(baos);
            }
        });
    }

    public interface Listener {

        void onClickRetakePicture();

        void onClickAccept(byte[] baos);

    }

}
