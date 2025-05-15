import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import { generateToken } from "../utils/generateToken.js";

dotenv.config();

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    generateToken(res, req.user);
    res.redirect(process.env.CLIENT_URL);
  }
);

router.get("/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

router.get("/user", (req, res) => {
  res.send(req.user);
});

export default router;
