# Anonymous-Feedback

Anonymous-Feedback is a application the gather the feedback from random users about you or your product. It is a full stack application built using NextJS.

### ZOD for validation

Using ZOD for validation.

### Connecting Database in Next JS

In NextJS, the server is not running every time it runs on demand. So we have to take care of the things like if we are already connected to the database or not.

### Register and Sign up Algorithm  

Code should effectively handle both scenarios of registering a new user and updating an existing but unverified user account with a new password and verification code.

* *Algorithm*
```
IF existingUserByEmail EXISTS THEN
    IF existingUserByEmail.isVerified THEN
        success: false
    ELSE
        // Save the updated user
    END IF
ELSE
    // create a new user with the provided details
    // Save the new user
END IF
```

* Using `resend email` for email verification
* Using `react email` for email templates