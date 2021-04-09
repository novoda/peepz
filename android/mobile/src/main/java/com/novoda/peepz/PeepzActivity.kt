package com.novoda.peepz

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import androidx.appcompat.app.AlertDialog
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.database.FirebaseDatabase
import com.novoda.accessibility.AccessibilityServices
import com.novoda.peepz.databinding.ActivityPeepzBinding
import com.novoda.support.SystemClock

class PeepzActivity : BaseActivity() {

    private lateinit var binding: ActivityPeepzBinding

    private val signedInUser: FirebaseUser by lazy {
        // TODO: what if the user is not signed in?
        firebaseApi().signedInUser
    }
    private val peepzPageDisplayer: PeepzPageDisplayer by lazy { createPageDisplayer() }
    private val peepUpdater: PeepUpdater by lazy { PeepUpdater(SystemClock(), FirebaseDatabase.getInstance(), signedInUser) }
    private val automaticPreviewlessPictureTaker: AutomaticPreviewlessPictureTaker by lazy {
        val pictureUploader = PictureUploader(signedInUser)
        val handler = Handler(Looper.getMainLooper())
        val previewlessPictureTaker = PreviewlessPictureTaker(binding.peepzSecretCamera, pictureUploader, peepUpdater)
        AutomaticPreviewlessPictureTaker(settings, Timer(handler), previewlessPictureTaker)
    }
    private val heartbeatPinger: HeartbeatPinger by lazy { HeartbeatPinger(Timer(Handler(Looper.getMainLooper())), peepUpdater) }
    private val settings: Settings by lazy { Settings.create(this) }
    private lateinit var peepzService: PeepzService

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityPeepzBinding.inflate(layoutInflater)
        setContentView(binding.root)

        peepzPageDisplayer.bindMenu(callback)

        val comparator: Comparator<Peep> = PeepCompoundComparator(
            SignedInUserIsFirstPeepComparator(signedInUser.uid),
            PeepFreshnessComparator(),
            ImageFreshnessPeepComparator()
        )
        peepzService = PeepzService(FirebaseDatabase.getInstance(), comparator, settings)
        peepzService.observeChanges(onPeepsUpdatedCallback)
    }

    private fun createPageDisplayer(): PeepzPageDisplayer = AndroidPeepzPageDisplayer(
        AccessibilityServices.newInstance(this),
        binding.toolbar,
        binding.peepz,
        binding.peepzButtonTakePicture
    )

    private fun startSelfieActivity() = startActivity(Intent(applicationContext, SelfieActivity::class.java))

    private val callback: PeepzPageDisplayer.Callback = object : PeepzPageDisplayer.Callback {
        override fun onClickTakePicture() {
            startSelfieActivity()
        }

        override fun onClickSetPictureTimer() {
            val dialogView = layoutInflater.inflate(R.layout.view_settings_dialog, null, false) as SettingsDialogWidget
            val alertDialog = AlertDialog.Builder(this@PeepzActivity)
                .setView(dialogView)
                .create()
            dialogView.bind(object : SettingsDialogWidget.Callback {
                override fun onClickOk(interval: PictureTakeInterval, shouldShowOfflinePeepz: Boolean) {
                    settings.setShouldShowOfflinePeepz(shouldShowOfflinePeepz)
                    automaticPreviewlessPictureTaker.change(interval)
                    peepzService.observeChanges(onPeepsUpdatedCallback)
                    alertDialog.dismiss()
                }

                override fun onClickCancel() {
                    alertDialog.dismiss()
                }
            }, settings.pictureTakeInterval, settings.shouldShowOfflinePeepz())
            alertDialog.show()
        }

        override fun onClickSignOut() {
            firebaseApi().signOut()
            startActivity(Intent(applicationContext, SignInActivity::class.java))
            finish()
        }
    }
    private val onPeepsUpdatedCallback: PeepzService.Callback = object : PeepzService.Callback {
        override fun onNext(peepz: List<Peep>) {
            peepzPageDisplayer.display(peepz)
            val signedInUser = firebaseApi().signedInUser
            if (missingSignedInUserFromPeepz(peepz, signedInUser)) {
                automaticPreviewlessPictureTaker.takeNewPicture()
            }
        }

        private fun missingSignedInUserFromPeepz(peepz: List<Peep>, signedInUser: FirebaseUser): Boolean {
            for (peep in peepz) {
                if (peep.id() == signedInUser.uid) {
                    return false
                }
            }
            return true
        }
    }

    override fun onResume() {
        super.onResume()
        heartbeatPinger.start()
        automaticPreviewlessPictureTaker.start()
    }

    override fun onPause() {
        automaticPreviewlessPictureTaker.stop()
        heartbeatPinger.stop()
        super.onPause()
    }
}
