package com.novoda.peepz;

import org.junit.Before;
import org.junit.Test;

import static org.fest.assertions.api.Assertions.assertThat;

public class ImageFreshnessPeepComparatorTest {

    private static final Peep PEEP = peep(0);
    private static final Peep PEEP_NO_IMAGE = peep(null);

    ImageFreshnessPeepComparator comparator;

    @Before
    public void setUp() {
        comparator = new ImageFreshnessPeepComparator();
    }

    @Test
    public void noImagePeepIsGreaterThanPeep() {
        int compare = comparator.compare(PEEP_NO_IMAGE, PEEP);

        assertThat(compare).isEqualTo(1);
    }

    @Test
    public void peepIsLessThanNoImagePeep() {
        int compare = comparator.compare(PEEP, PEEP_NO_IMAGE);

        assertThat(compare).isEqualTo(-1);
    }

    @Test
    public void noImagePeepIsSameAsNoImagePeep() {
        int compare = comparator.compare(PEEP_NO_IMAGE, PEEP_NO_IMAGE);

        assertThat(compare).isEqualTo(0);
    }

    @Test
    public void peepIsSameAsPeep() {
        int compare = comparator.compare(PEEP, PEEP);

        assertThat(compare).isEqualTo(0);
    }

    private static Peep peep(long imageTimestamp) {
        return peep(new Image("", imageTimestamp, null));
    }

    private static Peep peep(Image image) {
        return new Peep(null, null, image, null);
    }

}
