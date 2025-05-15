import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            user.googleId = profile.id;
            user.photo = profile.photos[0].value;
            user.accessToken = accessToken;
            if (refreshToken) user.refreshToken = refreshToken;
            await user.save();
          } else {
            user = await User.create({
              googleId: profile.id,
              displayName: profile.displayName,
              email: profile.emails[0].value,
              photo: profile.photos[0].value,
              accessToken,
              refreshToken,
              authType: "google",
              username: profile.displayName.replace(/\s+/g, "").toLowerCase(),
              password: "google-oauth",
            });
          }
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
