package com.novoda.peepz;

import org.junit.Before;
import org.junit.Test;

import static org.fest.assertions.api.Assertions.assertThat;

public class LastSeenPeepComparatorTest {

    private static final Peep PEEP = peep(0);
    private static final Peep PEEP_STALE = peep(PEEP.lastSeen() - 1);

    LastSeenPeepComparator comparator;

    @Before
    public void setUp() {
        comparator = new LastSeenPeepComparator();
    }

    @Test
    public void stalePeepIsGreaterThanPeep() {
        int compare = comparator.compare(PEEP_STALE, PEEP);

        assertThat(compare).isEqualTo(1);
    }

    @Test
    public void peepIsSameAsPeep() {
        int compare = comparator.compare(PEEP, PEEP);

        assertThat(compare).isEqualTo(0);
    }

    @Test
    public void peepIsLessThanStalePeep() {
        int compare = comparator.compare(PEEP, PEEP_STALE);

        assertThat(compare).isEqualTo(-1);
    }

    private static Peep peep(long lastSeen) {
        return new Peep(null, null, null, lastSeen, null);
    }

}