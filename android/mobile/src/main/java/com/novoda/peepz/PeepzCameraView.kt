package com.novoda.peepz

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.util.AttributeSet
import android.widget.FrameLayout
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.content.ContextCompat
import com.google.android.cameraview.CameraView

class PeepzCameraView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : FrameLayout(context, attrs, defStyleAttr) {

    private val permissionChecker: PermissionChecker by lazy { PermissionChecker(context, Manifest.permission.CAMERA) }
    private var cameraView: CameraView? = null

    override fun onFinishInflate() {
        super.onFinishInflate()
        if (isInEditMode) {
            return
        }
        permissionChecker.runWhenPermissionGranted { addCameraView() }
    }

    private fun addCameraView() {
        removeAllViews()
        cameraView = CameraView(context).also { camera ->
            addView(camera, LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT))
            camera.facing = CameraView.FACING_FRONT
            camera.flash = CameraView.FLASH_OFF
            camera.autoFocus = true
        }
    }

    fun addCallback(cameraViewCallback: CameraView.Callback) {
        cameraView?.addCallback(cameraViewCallback)
    }

    fun start() {
        cameraView?.start()
    }

    fun takePicture() {
        cameraView?.takePicture()
    }

    fun stop() {
        cameraView?.stop()
    }

    fun removeCallback(cameraViewCallback: CameraView.Callback) {
        cameraView?.removeCallback(cameraViewCallback)
    }
}

private class PermissionChecker(
    private val context: Context,
    private val permission: String
) {
    private lateinit var action: () -> Unit
    private val permissionLauncher = (context as BaseActivity).registerForActivityResult(ActivityResultContracts.RequestPermission()) { isGranted ->
        if (isGranted) {
            action()
        } else {
            Toast.makeText(context, "$permission was not granted", Toast.LENGTH_SHORT).show()
        }
    }

    fun runWhenPermissionGranted(onGrantedAction: () -> Unit) {
        this.action = onGrantedAction
        if (ContextCompat.checkSelfPermission(context, permission) == PackageManager.PERMISSION_GRANTED) {
            action()
        } else {
            permissionLauncher.launch(permission)
        }
    }
}
