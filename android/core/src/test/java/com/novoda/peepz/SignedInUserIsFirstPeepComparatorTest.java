package com.novoda.peepz;

import org.junit.Before;
import org.junit.Test;

import static org.fest.assertions.api.Assertions.assertThat;

public class SignedInUserIsFirstPeepComparatorTest {

    private static final String SIGNED_IN_USER_ID = "signedInUserId";

    private static final Peep PEEP_SIGNED_IN = peep(SIGNED_IN_USER_ID);
    private static final Peep PEEP_RANDOM = peep("any");
    private static final Peep PEEP_ANOTHER_RANDOM = peep("anyOther");

    SignedInUserIsFirstPeepComparator comparator;

    @Before
    public void setUp() {
        comparator = new SignedInUserIsFirstPeepComparator(SIGNED_IN_USER_ID);
    }

    @Test
    public void signedInUserIsLessThanRandomUser() {
        int compare = comparator.compare(PEEP_SIGNED_IN, PEEP_RANDOM);

        assertThat(compare).isEqualTo(-1);
    }

    @Test
    public void randomUserIsSameAsRandomUser() {
        int compare = comparator.compare(PEEP_RANDOM, PEEP_ANOTHER_RANDOM);

        assertThat(compare).isEqualTo(0);
    }

    @Test
    public void randomUserIsGreaterThanSignedInUser() {
        int compare = comparator.compare(PEEP_RANDOM, PEEP_SIGNED_IN);

        assertThat(compare).isEqualTo(1);
    }

    private static Peep peep(String id) {
        return new Peep(id, "", null, 0, Peep.OnlineStatus.FRESH);
    }

}