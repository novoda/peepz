package com.novoda.peepz;

import org.junit.Before;
import org.junit.Test;

import static org.fest.assertions.api.Assertions.assertThat;

public class PeepFreshnessComparatorTest {

    private static final Peep PEEP = peep(Freshness.SUPER_FRESH);
    private static final Peep PEEP_STALE = peep(Freshness.NOT_SO_FRESH);

    PeepFreshnessComparator comparator;

    @Before
    public void setUp() {
        comparator = new PeepFreshnessComparator();
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

    private static Peep peep(Freshness freshness) {
        return new Peep(null, null, null, new LastSeen(0, freshness));
    }

}
