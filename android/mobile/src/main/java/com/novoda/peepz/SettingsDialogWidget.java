package com.novoda.peepz;

import android.content.Context;
import android.util.AttributeSet;
import android.view.View;
import android.widget.LinearLayout;

import java.util.Arrays;
import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

public class SettingsDialogWidget extends LinearLayout {

    @BindView(R.id.settings_dialog_timer_frequent)
    View frequentTimerView;

    @BindView(R.id.settings_dialog_timer_infrequent)
    View infrequentTimerView;

    @BindView(R.id.settings_dialog_timer_off)
    View offTimerView;

    @BindView(R.id.settings_dialog_switch_filter_offline)
    View filterOfflineSwitch;

    @BindView(R.id.settings_dialog_button_ok)
    View okButton;

    @BindView(R.id.settings_dialog_button_cancel)
    View cancelButton;

    public SettingsDialogWidget(Context context, AttributeSet attrs) {
        super(context, attrs);
        super.setOrientation(VERTICAL);
    }

    @Override
    public final void setOrientation(int orientation) {
        // cannot change orientation
    }

    @Override
    protected void onFinishInflate() {
        super.onFinishInflate();
        View.inflate(getContext(), R.layout.merge_settings_dialog_widget, this);
        ButterKnife.bind(this);
    }

    public void bind(final Callback callback, PictureTakeInterval pictureTakeInterval, boolean showOfflinePeepz) {
        updateActivatedStateOnTimerViews(pictureTakeInterval);
        updateClickListenersForTimerViews();

        filterOfflineSwitch.setActivated(showOfflinePeepz);
        filterOfflineSwitch.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                filterOfflineSwitch.setActivated(!filterOfflineSwitch.isActivated());
            }
        });

        okButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                PictureTakeInterval interval = null;
                for (View view : timerViews()) {
                    if (view.isActivated()) {
                        interval = getPictureTakeIntervalAssociatedWith(view);
                        break;
                    }
                }

                callback.onClickOk(interval, filterOfflineSwitch.isActivated());
            }
        });

        cancelButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                callback.onClickCancel();
            }
        });
    }

    private void updateClickListenersForTimerViews() {
        frequentTimerView.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                updateActivatedStateOnTimerViews(PictureTakeInterval.FREQUENT);
            }
        });

        infrequentTimerView.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                updateActivatedStateOnTimerViews(PictureTakeInterval.INFREQUENT);
            }
        });

        offTimerView.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                updateActivatedStateOnTimerViews(PictureTakeInterval.OFF);
            }
        });
    }


    private void updateActivatedStateOnTimerViews(PictureTakeInterval interval) {
        switch (interval) {
            case FREQUENT:
                frequentTimerView.setActivated(true);
                infrequentTimerView.setActivated(false);
                offTimerView.setActivated(false);
                break;
            case INFREQUENT:
                frequentTimerView.setActivated(false);
                infrequentTimerView.setActivated(true);
                offTimerView.setActivated(false);
                break;
            case OFF:
                frequentTimerView.setActivated(false);
                infrequentTimerView.setActivated(false);
                offTimerView.setActivated(true);
                break;
            default:
                throw new IllegalArgumentException("unknown interval: " + interval);
        }
    }

    private PictureTakeInterval getPictureTakeIntervalAssociatedWith(View view) {
        switch (view.getId()) {
            case R.id.settings_dialog_timer_frequent:
                return PictureTakeInterval.FREQUENT;
            case R.id.settings_dialog_timer_infrequent:
                return PictureTakeInterval.INFREQUENT;
            case R.id.settings_dialog_timer_off:
                return PictureTakeInterval.OFF;
            default:
                throw new IllegalArgumentException("no PictureTakeInterval associated with view");
        }
    }

    private List<View> timerViews() {
        return Arrays.asList(frequentTimerView, infrequentTimerView, offTimerView);
    }

    public interface Callback {

        void onClickOk(PictureTakeInterval interval, boolean shouldShowOfflinePeepz);

        void onClickCancel();

    }

}
