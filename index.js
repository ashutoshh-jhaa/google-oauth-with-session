import express from "express";
import dotenv from "dotenv";
import passport from "./auth/google.js";
import session from "express-session";

dotenv.config({ quiet: true });

const PORT = process.env.PORT || 4000;
const app = express();

//initialize express session
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  }),
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//public home route
app.get("/", (req, res) => {
  res.send(`<a href="/auth/google">Login with google</a>`);
});

//initiate google auth
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

//OAuth callback
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/dashboard",
  }),
);

//protected route
app.get("/dashboard", (req, res) => {
  if (!req.isAuthenticated()) return res.redirect("/");

  res.send(`
      <h2>Welcome, ${req.user.displayName}</h2>
      <p>Email: ${req.user.email}</p>
    `);
});

app.listen(PORT, "localhost", (err) => {
  err
    ? console.log(err)
    : console.log(`Server is listening on localhost:${PORT}`);
});
