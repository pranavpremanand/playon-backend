import express from "express";
import { doLogin, doSignup } from "../controllers/userController.js";
const router = express.Router();

router.post("/signup", doSignup);

router.post("/login", doLogin);

export default router;