import express from "express";
import verifyToken from "../middlewares/verifyToken.js";

//controller import
import {
  updateController,
  getController,
  deleteController,
} from "../controllers/userController.js";
const router = express.Router();

//UPDATE
router.put("/:id", verifyToken, updateController);

//DELETE
router.delete("/:id", verifyToken, deleteController);

//GET USER
router.get("/:id", verifyToken, getController);
export default router;
