import express from "express";

import {
  createNewUser,
  getAllUser,
  getMe,
  loginUserEmail,
  loginUserRegd,
  loginUserUserName,
  logoutUser,
} from "../controllers/User.js";

import { isUserAuthenticated, isRole } from "../middlewares/Auth.js";

const router = express.Router();

router.post("/register", createNewUser);

router.post("/login/email", loginUserEmail);

router.post("/login/username", loginUserUserName);

router.post("/login/id", loginUserRegd);

router.get("/logout", isUserAuthenticated, logoutUser);

router.get("/me", isUserAuthenticated, getMe);

router.get("/admin/user/all", isUserAuthenticated, isRole("admin"), getAllUser);

export default router;
