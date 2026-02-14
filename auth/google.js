import { Strategy as googleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config({ quiet: true });
import passport from "passport";

//OAuth strategy configuration
passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, cb) => {
      const user = {
        id: profile.id,
        displayName: profile.displayName,
        email: profile.emails?.[0]?.value,
        photo: profile.photos?.[0]?.value,
      };
      return cb(null, user);
    },
  ),
);

//stores user data in to session
passport.serializeUser((user, done) => {
  done(null, user);
});

//retrives user data from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
