package com.novoda.support.camera;

import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraCharacteristics;
import android.hardware.camera2.CameraDevice;
import android.hardware.camera2.CameraManager;
import android.os.Handler;
import android.util.SparseArray;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static android.hardware.camera2.CameraMetadata.LENS_FACING_BACK;
import static android.hardware.camera2.CameraMetadata.LENS_FACING_FRONT;

final class CameraHelper {

    private final CameraManager cameraManager;

    private CameraDevice camera;

    CameraHelper(CameraManager cameraManager) {
        this.cameraManager = cameraManager;
    }

    public void start() {
        try {
            foo();
        } catch (CameraHelperException e) {
            // TODO callback error
        }
    }

    private void foo() throws CameraHelperException {
        String cameraId = getCameraId();
        openCamera(cameraId, stateCallback);
    }

    private final CameraDevice.StateCallback stateCallback = new CameraDevice.StateCallback() {
        @Override
        public void onOpened(CameraDevice camera) {
            CameraHelper.this.camera = camera;
        }

        @Override
        public void onDisconnected(CameraDevice camera) {
            CameraHelper.this.camera = null;
        }

        @Override
        public void onError(CameraDevice camera, int error) {

        }
    };

    private void openCamera(String cameraId, CameraDevice.StateCallback stateCallback) throws CameraHelperException {
        try {
            cameraManager.openCamera(cameraId, stateCallback, new Handler());
        } catch (CameraAccessException e) {
            throw CameraHelperException.from(e);
        }
    }

    private String getCameraId() throws CameraHelperException {
        String[] cameraIdList = getCameraIdList();
        SparseArray<List<String>> cameraIds = new SparseArray<>(2);
        cameraIds.put(LENS_FACING_FRONT, new ArrayList<String>());
        cameraIds.put(LENS_FACING_BACK, new ArrayList<String>());

        for (String id : cameraIdList) {
            CameraCharacteristics characteristics = getCameraCharacteristicsForCameraWithId(id);
            Integer lensFacing = characteristics.get(CameraCharacteristics.LENS_FACING);
            if (lensFacing == null) {
                continue;
            }

            List<String> ids = cameraIds.get(lensFacing);
            if (ids != null) {
                ids.add(id);
            }
        }

        // TODO: let the user choose, but priority is first available front camera, then back
        List<String> ids = cameraIds.get(LENS_FACING_FRONT, cameraIds.get(LENS_FACING_BACK, Collections.<String>emptyList()));

        if (ids.isEmpty()) {
            throw new CameraHelperException("no cameras found");
        } else {
            return ids.get(0);
        }
    }

    private String[] getCameraIdList() throws CameraHelperException {
        try {
            return cameraManager.getCameraIdList();
        } catch (CameraAccessException e) {
            throw CameraHelperException.from(e);
        }
    }

    private CameraCharacteristics getCameraCharacteristicsForCameraWithId(String id) throws CameraHelperException {
        try {
            return cameraManager.getCameraCharacteristics(id);
        } catch (CameraAccessException e) {
            throw CameraHelperException.from(e);
        }
    }

}
