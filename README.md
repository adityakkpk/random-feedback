# Anonymous-Feedback

Anonymous-Feedback is a application the gather the feedback from random users about you or your product. It is a full stack application built using NextJS.

## Day by Day progress

### Day - 1 : ZOD for validation

Using ZOD for validation.

### Day - 2 : Connecting Database in Next JS

In NextJS, the server is not running every time it runs on demand. So we have to take care of the things like if we are already connected to the database or not.

### Day - 3 : Register and Sign up Algorithm

Code should effectively handle both scenarios of registering a new user and updating an existing but unverified user account with a new password and verification code.

- **Algorithm**

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

### Day 4 : Signup user and custom OTP in NextJS 

* Implementing the Algorithm for sign-up 
* Writing code for Sending OTP for verification

### Day 5 : Next auth or AuthJS

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

### Day - 6 : OTP verification and unique username check in Nextjs

* Check for unique username.
* OTP verification

### Day - 7 : Message API with aggregation pipeline

* Create routes for accepting messages
* Create routes for get-messages
* Create routes for send-messages

### Day - 8 : Integrating AI features in NextJS project

* Integrate the Gemini AI for suggesting messages.

### Day - 9 : React hook form, shadcn and debouncing

* Shadcn installation 
* using `useHooks-ts` library to handle debouncing
* React hook form
* Handling debouncing in sign-up page form

### Day - 10 : OTP Verification in NextJS 

* Create UI for Verify Code and handle the verification.

### Day - 11 : Handling signin with AuthJS

* Creating a SignIp page and handling the sign in using next-auth's Credentials

### Day - 12 : Navbar and message card with bug fixes in Nextjs

* Design a Navbar component
* Fix the Redirect Bug
* Create MessageCard Component
* And Added Delete Route also

### Day - 13 : Building User Dashboard

* Build the User dashboard.
* Handle the accept-messages switch with the React-hook forms to maintain the code consistency.

### Day 14 - Building Home Page with Shadcn Carousal

