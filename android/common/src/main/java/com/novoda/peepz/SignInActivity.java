package com.novoda.peepz;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInResult;
import com.google.firebase.auth.FirebaseUser;
import com.novoda.peepz.common.R;
import com.novoda.peepz.common.R2;

import butterknife.BindView;
import butterknife.ButterKnife;

public class SignInActivity extends BaseActivity {

    private static final int REQUEST_CODE_SIGN_IN = 1;

    @BindView(R2.id.sign_in_button)
    TextView signInButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (firebaseApi().isSignedIn()) {
            navigateToThingyAndFinish();
        } else {
            setContentView(R.layout.activity_sign_in);
            ButterKnife.bind(this);

            signInButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = googleApiClientApi().getSignInIntent();
                    startActivityForResult(intent, REQUEST_CODE_SIGN_IN);
                }
            });
        }
    }

    private void navigateToThingyAndFinish() {
        startActivity(new Intent(this, PeepzActivity.class));
        finish();
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_CODE_SIGN_IN) {
            GoogleSignInResult result = googleApiClientApi().getSignInResultFromIntent(data);
            if (result.isSuccess()) {
                signIntoFirebase(result.getSignInAccount());
            } else {
                displayError();
            }
        }
    }

    private void signIntoFirebase(GoogleSignInAccount googleSignInAccount) {
        firebaseApi().signIntoFirebase(googleSignInAccount, new AuthenticationCallbacks() {
            @Override
            public void onSuccess(FirebaseUser firebaseUser) {
                navigateToThingyAndFinish();
            }

            @Override
            public void onAuthenticationFailure() {
                displayError();
            }
        });
    }

    private void displayError() {
        // TODO: show an error state, ideally with a reason
    }

}
