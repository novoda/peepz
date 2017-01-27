package com.novoda.peepz;

import java.util.Comparator;

class LastSeenPeepComparator implements Comparator<Peep> {

    @Override
    public int compare(Peep peep1, Peep peep2) {
        if (peep1.lastSeen() < peep2.lastSeen()) {
            return 1;
        }

        if (peep1.lastSeen() > peep2.lastSeen()) {
            return -1;
        }

        return 0;
    }

}
