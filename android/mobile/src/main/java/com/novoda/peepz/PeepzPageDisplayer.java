package com.novoda.peepz;

import java.util.List;

public interface PeepzPageDisplayer {

    void bindMenu(Callback callback);

    void display(List<Peep> peepz);

    interface Callback {

        void onClickTakePicture();

        void onClickSetPictureTimer();

        void onClickSignOut();

    }

}
