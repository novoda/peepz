package com.novoda.peepz

import android.os.Bundle
import com.google.firebase.database.FirebaseDatabase
import com.novoda.peepz.databinding.ActivitySelfieBinding
import com.novoda.support.SystemClock

class SelfieActivity : BaseActivity() {
    private lateinit var binding: ActivitySelfieBinding

    private lateinit var pictureUploader: PictureUploader
    private lateinit var peepUpdater: PeepUpdater

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySelfieBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // TODO: what if the user is not signed in?
        val signedInUser = firebaseApi().signedInUser
        peepUpdater = PeepUpdater(SystemClock(), FirebaseDatabase.getInstance(), signedInUser)
        pictureUploader = PictureUploader(signedInUser)
        binding.selfieButtonClose.setOnClickListener { finish() }
    }

    override fun onResume() {
        super.onResume()
        binding.selfieView.attach(listener)
    }

    override fun onPause() {
        binding.selfieView.detachListeners()
        super.onPause()
    }

    private val listener = PictureTakeListener { data ->
        pictureUploader.upload(data, object : PictureUploader.Callback {
            override fun onSuccess(pictureUrl: String) {
                // TODO use startActivityForResult and send success back
                peepUpdater.updatePeepImage(pictureUrl)
                finish()
            }

            override fun onFailure() {
                // TODO use startActivityForResult and send failure back
                finish()
            }
        })
    }
}
