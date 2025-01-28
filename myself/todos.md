# Random Feedback

* Create a User model.
  - Create an interface for Message
  - Create message schema
  - Create an interface for User
  - Create User schema

* Define Schemas for validation (using zod)
  - signUpSchema
  - verifySchema
  - signInSchema
  - acceptMessageSchema
  - messageSchema

* Database Connection (lib > dbConnect.ts)
  - create a `type` for `ConnectionObject` to check for `isConnected` is a number or not. It is optional.
  - Create database connection
    - Check if already database connected or not.
    - then connect database

* Setup Resend email (lib > resend.ts)
  - Create a file for Resend email setup
  - Create a template for verification-email
  - Write a helper function to send verification-emails
  - Create a ApiResponse type for response

* Create a SignUp API route using below algorithm (src > app> api > signup > route.ts)
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

* Setup Next-Auth & Creating signin API routes using next-auth
  - Setup Credential Provider:
    - In options.ts:
      - Providers
      - Pages
      - Session
      - Secret
      - CallBacks : Store the information of user in token and session
    - In routes.ts:
      - Create a handler and export it as GET and POST
    - Setup Middleware:
      - Setup the middleware for authentication routes


* OTP verification is and unique username check
  - Create a route to check unique username:
    - Create an query schema for username validation using username validation schema created in zod
    - Create a async function GET to check unique username: 
      - Extract username from search params
      - validate username with zod
      - Check if user is existing and isVerified in database with this username
      - If not user is existing and isVerified in database then Return a Response with success as true and message as "Username Available". 
  - Create a route to verify OTP:
    - Create an async function POST to verify OTP with username and otp provided in json format
    - Decode the username 
    - Find the user in database
    - Check code is valid and code is expected or not

* Message API with aggregation pipeline
  - Create an API route for accepting-messages
    - create a POST function to update the user accept message status
    - Create a GET function to get the user accept message status