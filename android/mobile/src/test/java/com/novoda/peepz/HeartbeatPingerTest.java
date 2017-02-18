package com.novoda.peepz;

import com.novoda.support.Duration;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.verify;

public class HeartbeatPingerTest {

    @Rule
    public MockitoRule rule = MockitoJUnit.rule();

    @Mock
    Timer timer;

    @Mock
    PeepUpdater peepUpdater;

    private HeartbeatPinger heartbeatPinger;

    @Before
    public void setUp() {
        heartbeatPinger = new HeartbeatPinger(timer, peepUpdater);
    }

    @Test
    public void startSendsHeartbeatImmediately() {
        heartbeatPinger.start();

        verify(peepUpdater).updatePeepLastSeen();
    }

    @Test
    public void startSchedulesNextHeartbeatFor2Minutes() {
        heartbeatPinger.start();

        verify(timer).schedule(any(Timer.Callback.class), eq(Duration.minutes(2)));
    }

    @Test
    public void stopCancelsTimer() {
        heartbeatPinger.stop();

        verify(timer).stop();
    }

}