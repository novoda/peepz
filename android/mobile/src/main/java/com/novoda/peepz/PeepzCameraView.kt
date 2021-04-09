package com.novoda.peepz

import android.content.Context
import android.util.AttributeSet
import android.widget.FrameLayout
import com.google.android.cameraview.CameraView

class PeepzCameraView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : FrameLayout(context, attrs, defStyleAttr) {

    private var cameraView: CameraView? = null

    override fun onFinishInflate() {
        super.onFinishInflate()
        if (isInEditMode) {
            return
        }
        addCameraView()
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
