package com.novoda.peepz

import android.content.Intent
import android.os.Bundle
import butterknife.ButterKnife
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.firebase.auth.FirebaseUser
import com.novoda.peepz.databinding.ActivitySignInBinding

class SignInActivity : BaseActivity() {
    private lateinit var binding: ActivitySignInBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        if (firebaseApi().isSignedIn) {
            navigateToThingyAndFinish()
        } else {
            binding = ActivitySignInBinding.inflate(layoutInflater)
            setContentView(binding.root)
            ButterKnife.bind(this)
            binding.signInButton.setOnClickListener {
                val intent = googleApiClientApi().signInIntent
                startActivityForResult(intent, REQUEST_CODE_SIGN_IN)
            }
        }
    }

    private fun navigateToThingyAndFinish() {
        startActivity(Intent(this, PeepzActivity::class.java))
        finish()
    }

    public override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == REQUEST_CODE_SIGN_IN) {
            val result = googleApiClientApi().getSignInResultFromIntent(data)
            if (result.isSuccess) {
                signIntoFirebase(result.signInAccount)
            } else {
                displayError()
            }
        }
    }

    private fun signIntoFirebase(googleSignInAccount: GoogleSignInAccount?) {
        firebaseApi().signIntoFirebase(googleSignInAccount, object : AuthenticationCallbacks {
            override fun onSuccess(firebaseUser: FirebaseUser) {
                navigateToThingyAndFinish()
            }

            override fun onAuthenticationFailure() {
                displayError()
            }
        })
    }

    private fun displayError() {
        // TODO: show an error state, ideally with a reason
    }

    companion object {
        private const val REQUEST_CODE_SIGN_IN = 1
    }
}
