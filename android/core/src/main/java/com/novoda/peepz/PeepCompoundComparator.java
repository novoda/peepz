package com.novoda.peepz;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

class PeepCompoundComparator implements Comparator<Peep> {

    private final List<Comparator<Peep>> comparators;

    PeepCompoundComparator(Comparator<Peep>... comparators) {
        this.comparators = Arrays.asList(comparators);
    }

    @Override
    public int compare(Peep peep1, Peep peep2) {
        int last = 0;
        for (Comparator<Peep> comparator : comparators) {
            last = comparator.compare(peep1, peep2);
            if (last != 0) {
                break;
            }
        }
        return last;
    }

}
