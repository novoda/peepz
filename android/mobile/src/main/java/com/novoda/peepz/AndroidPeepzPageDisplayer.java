package com.novoda.peepz;

import android.support.v7.widget.Toolbar;
import android.view.MenuItem;
import android.view.View;

import com.novoda.accessibility.AccessibilityServices;

import java.util.List;

public class AndroidPeepzPageDisplayer implements PeepzPageDisplayer {

    private final AccessibilityServices accessibilityServices;
    private final Toolbar toolbar;
    private final PeepzView peepzView;
    private final View pictureTakeButton;

    public AndroidPeepzPageDisplayer(
            AccessibilityServices accessibilityServices,
            Toolbar toolbar,
            PeepzView peepzView,
            View pictureTakeButton
    ) {
        this.accessibilityServices = accessibilityServices;
        this.toolbar = toolbar;
        this.peepzView = peepzView;
        this.pictureTakeButton = pictureTakeButton;
    }

    @Override
    public void bindMenu(Callback callback) {
        if (inflateAppBarMenuInsteadOfFloatingActionButton()) {
            inflateAppBarMenu(callback);
        } else {
            bindFloatingActionButton(callback);
        }
    }

    private boolean inflateAppBarMenuInsteadOfFloatingActionButton() {
        return accessibilityServices.isSpokenFeedbackEnabled() || !peepzView.isInTouchMode();
    }

    private void inflateAppBarMenu(final Callback callback) {
        toolbar.inflateMenu(R.menu.peepz);
        toolbar.setOnMenuItemClickListener(new Toolbar.OnMenuItemClickListener() {
            @Override
            public boolean onMenuItemClick(MenuItem item) {
                if (item.getItemId() == R.id.peepz_menu_take_picture) {
                    callback.onClickTakePicture();
                    return true;
                }
                return false;
            }
        });
        pictureTakeButton.setVisibility(View.GONE);
    }

    private void bindFloatingActionButton(final Callback callback) {
        pictureTakeButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                callback.onClickTakePicture();
            }
        });
        pictureTakeButton.setVisibility(View.VISIBLE);
    }

    @Override
    public void display(List<Peep> peepz) {
        peepzView.update(peepz);
    }

}
