package com.novoda.peepz;

import java.util.Comparator;

class PeepFreshnessComparator implements Comparator<Peep> {

    @Override
    public int compare(Peep peep1, Peep peep2) {
        if (peep1.lastSeen().freshness() == peep2.lastSeen().freshness()) {
            return 0;
        }

        if (peep1.lastSeen().freshness() == Freshness.SUPER_FRESH) {
            return -1;
        } else {
            return 1;
        }
    }

}
