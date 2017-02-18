package com.novoda.peepz;

import com.novoda.support.Duration;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.experimental.runners.Enclosed;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.mockito.InOrder;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;

import java.util.Arrays;
import java.util.Collection;

import static com.novoda.peepz.PictureTakeInterval.FREQUENT;
import static com.novoda.peepz.PictureTakeInterval.INFREQUENT;
import static com.novoda.peepz.PictureTakeInterval.OFF;
import static com.novoda.peepz.PictureTakeInterval.VERY_FREQUENT;
import static com.novoda.peepz.Timer.Callback;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(Enclosed.class)
public class AutomaticPreviewlessPictureTakerTest {

    private static final Duration DURATION_VERY_FREQUENT = Duration.seconds(30);
    private static final Duration DURATION_FREQUENT = Duration.minutes(2);
    private static final Duration DURATION_INFREQUENT = Duration.minutes(5);

    public abstract static class TestSetup {

        @Rule
        public MockitoRule rule = MockitoJUnit.rule();

        @Mock
        public Settings settings;

        @Mock
        public Timer timer;

        @Mock
        public PreviewlessPictureTaker pictureTaker;

        public AutomaticPreviewlessPictureTaker service;

        @Before
        public void setUp() {
            service = new AutomaticPreviewlessPictureTaker(settings, timer, pictureTaker);
        }

    }

    public static class Off extends TestSetup {

        @Test
        public void startDoesNotSchedule() {
            when(settings.getPictureTakeInterval()).thenReturn(OFF);

            service.start();

            verify(timer, never()).schedule(any(Callback.class), any(Duration.class));
        }

        @Test
        public void changeStopsButDoesNotReschedule() {
            when(settings.getPictureTakeInterval()).thenReturn(OFF);

            service.change(OFF);

            InOrder inOrder = Mockito.inOrder(timer, settings);
            inOrder.verify(timer).stop();
            inOrder.verify(settings).setPictureTakeInterval(OFF);

            verify(timer, never()).schedule(any(Callback.class), any(Duration.class));
        }

        @Test
        public void stopCancelsTimer() {
            service.stop();

            verify(timer).stop();
        }

        @Test
        public void stopCancelsPictureTaker() {
            service.stop();

            verify(pictureTaker).stop();
        }

    }

    @RunWith(Parameterized.class)
    public static class Intervals extends TestSetup {

        @Parameterized.Parameters
        public static Collection<Parameter[]> data() {
            return Arrays.asList(
                    new Parameter[]{new Parameter(VERY_FREQUENT, DURATION_VERY_FREQUENT)},
                    new Parameter[]{new Parameter(FREQUENT, DURATION_FREQUENT)},
                    new Parameter[]{new Parameter(INFREQUENT, DURATION_INFREQUENT)}
            );
        }

        @Parameterized.Parameter
        public Parameter parameter;

        @Test
        public void startSchedulesWithCorrectDelay() {
            when(settings.getPictureTakeInterval()).thenReturn(parameter.interval);

            service.start();

            verify(timer).schedule(any(Timer.Callback.class), eq(parameter.duration));
        }

        @Test
        public void startInitializesPictureTaker() {
            when(settings.getPictureTakeInterval()).thenReturn(parameter.interval);

            service.start();

            verify(pictureTaker).start(any(PreviewlessPictureTaker.Callback.class));
        }

        @Test
        public void changeStopsThenReschedulesWithCorrectDelay() {
            when(settings.getPictureTakeInterval()).thenReturn(parameter.interval);

            service.change(parameter.interval);

            InOrder inOrder = Mockito.inOrder(timer, settings);
            inOrder.verify(timer).stop();
            inOrder.verify(settings).setPictureTakeInterval(parameter.interval);
            inOrder.verify(timer).schedule(any(Timer.Callback.class), eq(parameter.duration));
        }

        @Test
        public void changeStopsThenReinitializesWithCorrectDelay() {
            when(settings.getPictureTakeInterval()).thenReturn(parameter.interval);

            service.change(parameter.interval);

            InOrder inOrder = Mockito.inOrder(pictureTaker, settings);
            inOrder.verify(pictureTaker).stop();
            inOrder.verify(settings).setPictureTakeInterval(parameter.interval);
            inOrder.verify(pictureTaker).start(any(PreviewlessPictureTaker.Callback.class));
        }

        private static class Parameter {

            final PictureTakeInterval interval;
            final Duration duration;

            Parameter(PictureTakeInterval interval, Duration duration) {
                this.interval = interval;
                this.duration = duration;
            }

        }

    }

}
