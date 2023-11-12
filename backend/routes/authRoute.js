import express from "express";

import {
  registerController,
  loginController,
  logoutController,
  refetchController,
} from "../controllers/authController.js";

const router = express.Router();

//REGISTER
router.post("/register", registerController);

//LOGIN

router.post("/login", loginController);

//LOGOUT
router.get("/logout", logoutController);

//REFETCH USER
router.get("/refetch", refetchController);

export default router;
