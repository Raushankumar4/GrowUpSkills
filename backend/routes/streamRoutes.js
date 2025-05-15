import express from "express";
import { streamVideo } from "../utils/stream.js";

const router = express.Router();

router.get("/stream/:filename", streamVideo);

export default router;
