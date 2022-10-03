import express from "express";
import { createNewUser, getAllUser, loginUserEmail } from "../controllers/User.js";
import { isUserAuthenticated, isRole } from "../middlewares/Auth.js";

const router = express.Router();

router.post("/register", createNewUser);

router.post("/login/email", loginUserEmail);

router.get("/admin/user/all", isUserAuthenticated, isRole("admin"), getAllUser);

export default router;
