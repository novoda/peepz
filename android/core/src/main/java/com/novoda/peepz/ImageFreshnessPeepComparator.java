package com.novoda.peepz;

import java.util.Comparator;

class ImageFreshnessPeepComparator implements Comparator<Peep> {

    @Override
    public int compare(Peep peep1, Peep peep2) {
        if (peep1.image() != null && peep2.image() != null) {
            return compare(peep1.image(), peep2.image());
        }

        if (peep1.image() != null && peep2.image() == null) {
            return -1;
        }

        if (peep1.image() == null && peep2.image() != null) {
            return 1;
        }

        return 0;
    }

    private int compare(Image image1, Image image2) {
        if (image1.timestamp() < image2.timestamp()) {
            return 1;
        }

        if (image1.timestamp() > image2.timestamp()) {
            return -1;
        }

        return 0;
    }

}
