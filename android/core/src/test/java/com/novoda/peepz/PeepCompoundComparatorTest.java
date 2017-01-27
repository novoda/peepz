package com.novoda.peepz;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;

import java.util.Comparator;

import static org.fest.assertions.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

public class PeepCompoundComparatorTest {

    private static final Peep PEEP_UNO = createNewPeep();
    private static final Peep PEEP_DOS = createNewPeep();

    private static Peep createNewPeep() {
        return new Peep(null, null, null, 0, null);
    }

    @Rule
    public MockitoRule rule = MockitoJUnit.rule();

    @Mock
    Comparator<Peep> PEEP_DOS_IS_GREATER_COMPARATOR;

    @Mock
    Comparator<Peep> PEEP_UNO_IS_GREATER_COMPARATOR;

    @Before
    public void setUp() {
        when(PEEP_UNO_IS_GREATER_COMPARATOR.compare(PEEP_UNO, PEEP_DOS)).thenReturn(1);
        when(PEEP_UNO_IS_GREATER_COMPARATOR.compare(PEEP_DOS, PEEP_UNO)).thenReturn(-1);

        when(PEEP_DOS_IS_GREATER_COMPARATOR.compare(PEEP_DOS, PEEP_UNO)).thenReturn(1);
        when(PEEP_DOS_IS_GREATER_COMPARATOR.compare(PEEP_UNO, PEEP_DOS)).thenReturn(-1);
    }

    @Test
    public void foo1() {
        Comparator<Peep> comparator = new PeepCompoundComparator(PEEP_DOS_IS_GREATER_COMPARATOR, PEEP_UNO_IS_GREATER_COMPARATOR);

        int compare = comparator.compare(PEEP_UNO, PEEP_DOS);

        assertThat(compare).isEqualTo(-1);
    }

    @Test
    public void foo2() {
        Comparator<Peep> comparator = new PeepCompoundComparator(PEEP_DOS_IS_GREATER_COMPARATOR, PEEP_UNO_IS_GREATER_COMPARATOR);

        int compare = comparator.compare(PEEP_DOS, PEEP_UNO);

        assertThat(compare).isEqualTo(1);
    }


    @Test
    public void foo3() {
        Comparator<Peep> comparator = new PeepCompoundComparator(PEEP_UNO_IS_GREATER_COMPARATOR, PEEP_DOS_IS_GREATER_COMPARATOR);

        int compare = comparator.compare(PEEP_UNO, PEEP_DOS);

        assertThat(compare).isEqualTo(1);
    }


    @Test
    public void foo4() {
        Comparator<Peep> comparator = new PeepCompoundComparator(PEEP_UNO_IS_GREATER_COMPARATOR, PEEP_DOS_IS_GREATER_COMPARATOR);

        int compare = comparator.compare(PEEP_DOS, PEEP_UNO);

        assertThat(compare).isEqualTo(-1);
    }

    @Test
    public void foo5() {
        Comparator<Peep> comparator = new PeepCompoundComparator(PEEP_DOS_IS_GREATER_COMPARATOR, PEEP_UNO_IS_GREATER_COMPARATOR);

        int compare = comparator.compare(PEEP_UNO, PEEP_UNO);

        assertThat(compare).isEqualTo(0);
    }

    @Test
    public void foo6() {
        Comparator<Peep> comparator = new PeepCompoundComparator(PEEP_UNO_IS_GREATER_COMPARATOR, PEEP_DOS_IS_GREATER_COMPARATOR);

        int compare = comparator.compare(PEEP_DOS, PEEP_DOS);

        assertThat(compare).isEqualTo(0);
    }
}