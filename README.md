
# Google OAuth 2.0 Authentication with Passport (Node.js)
A minimal implementation of Google OAuth 2.0 authentication using:
-   Express
-   Passport.js
-   passport-google-oauth20
-   express-session
This project demonstrates session-based authentication without a database, storing authenticated user data inside the session.

----------

## Features

-   Google OAuth 2.0 login
-   Session-based authentication
-   Protected route handling
-   Clean and minimal implementation
-   No database required (learning/demo setup)
----------

## Tech Stack

-   Node.js
-   Express
-   Passport.js
-   Google OAuth 2.0
-   express-session
-   dotenv
----------

## Project Structure

```
├── index.js
├── auth/
│   └── google.js
├── .env
├── package.json
```

----------

## How It Works

1.  User clicks **Login with Google**
2.  User is redirected to Google’s authentication page
3.  After successful login, Google redirects back to:
    `/auth/google/callback` 
4.  Passport extracts user profile information
5.  User data is stored in session
6.  Protected routes check authentication using:
    `req.isAuthenticated()` 
----------

## Setup Instructions

### 1. Clone the repository
`git clone <https://github.com/ashutoshh-jhaa/google-oauth-with-session.git> cd <project-folder-name>` 

----------

### 2. Install dependencies
`npm install` 

----------

### 3. Create a `.env` file
```
PORT=4000  
SESSION_SECRET_KEY=your_random_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:4000/auth/google/callback
```
----------

### 4. Configure Google OAuth Credentials
1.  Go to Google Cloud Console
2.  Create a new project
3.  Enable OAuth consent screen
4.  Create OAuth 2.0 credentials
5.  Add:
	- Authorized JavaScript origin:
	`http://localhost:4000` 
	- Authorized redirect URI:
	`http://localhost:4000/auth/google/callback` 
6.  Add your email as a Test User 
 
----------

### 5. Run the server
`node index.js` 
- Visit:
`http://localhost:4000` 

----------

## Session Behavior

-   User data is stored in the session    
-   Default session store: MemoryStore (development only)
-   Session persists until:
    -   Browser is closed
    -   Server restarts
----------

## Important Notes

-   This implementation stores user data inside the session (no database).
-   In production:
    -   Use a persistent session store (Redis, MongoDB, etc.)
    -   Use HTTPS
    -   Store only the user ID in session
    -   Add proper error handling and security middleware
