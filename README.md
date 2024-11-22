# Anonymous-Feedback

Anonymous-Feedback is a application the gather the feedback from random users about you or your product. It is a full stack application built using NextJS.

### ZOD for validation

Using ZOD for validation.

### Connecting Database in Next JS

In NextJS, the server is not running every time it runs on demand. So we have to take care of the things like if we are already connected to the database or not.

### Register and Sign up Algorithm

Code should effectively handle both scenarios of registering a new user and updating an existing but unverified user account with a new password and verification code.

- _Algorithm_

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

- Using `resend email` for email verification
- Using `react email` for email templates

- We are using `next-auth` for signup.
- We are simply using credentials to sign up the user. For that we are using `credentials` feature from Next-auth.

```javascript
providers: [
    // Here we are creating a component for sign up. By using this below information, next-auth will create a component for signup which will render on the screen
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter password",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
            const user = await UserModel.findOne({
                $or: [
                    {email: credentials.identifier},
                    {username: credentials.identifier}
                ]
            })

            if (!user) {
              throw new Error("No user found")
            }

            if(!user.isVerified) {
              throw new Error("Please verify your account before login.")
            }

        } catch (error: any) {
            throw new Error(error);
        }
      },
    }),
  ],
```

### OTP verification and unique username check in Nextjs

* Check for unique username.
* OTP verification
