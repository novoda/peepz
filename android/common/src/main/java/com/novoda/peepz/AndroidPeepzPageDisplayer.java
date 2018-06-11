package com.novoda.peepz;

import android.support.v7.widget.Toolbar;
import android.view.MenuItem;
import android.view.View;

import com.novoda.accessibility.AccessibilityServices;
import com.novoda.peepz.common.R;

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
        inflateAppBarMenu(callback);

        if (showTakePictureAsFabInsteadOfAppBarAction()) {
            bindFloatingActionButton(callback);
            toolbar.getMenu().removeItem(R.id.peepz_menu_take_picture);
            pictureTakeButton.setVisibility(View.VISIBLE);
        } else {
            pictureTakeButton.setVisibility(View.GONE);
        }
    }

    private boolean showTakePictureAsFabInsteadOfAppBarAction() {
        return !accessibilityServices.isSpokenFeedbackEnabled() && peepzView.isInTouchMode();
    }

    private void inflateAppBarMenu(Callback callback) {
        toolbar.inflateMenu(R.menu.peepz);
        toolbar.setOnMenuItemClickListener(createOnMenuItemClickListener(callback));
    }

    private Toolbar.OnMenuItemClickListener createOnMenuItemClickListener(final Callback callback) {
        return new Toolbar.OnMenuItemClickListener() {

            @Override
            public boolean onMenuItemClick(MenuItem item) {
                if (item.getItemId() == R.id.peepz_menu_take_picture) {
                    callback.onClickTakePicture();
                    return true;
                }

                if (item.getItemId() == R.id.peepz_menu_settings) {
                    callback.onClickSetPictureTimer();
                    return true;
                }

                if (item.getItemId() == R.id.peepz_menu_sign_out) {
                    callback.onClickSignOut();
                    return true;
                }

                return false;
            }

        };
    }

    private void bindFloatingActionButton(final Callback callback) {
        pictureTakeButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                callback.onClickTakePicture();
            }
        });
    }

    @Override
    public void display(List<Peep> peepz) {
        peepzView.update(peepz);
    }

}
