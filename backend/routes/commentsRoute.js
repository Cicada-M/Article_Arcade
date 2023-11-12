import express from "express";

//controller import
import {
  createCommentController,
  updateCommentController,
  getPostCommentController,
  deleteCommentController,
} from "../controllers/commentController.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/create", verifyToken, createCommentController);

//UPDATE
router.put("/:id", verifyToken, updateCommentController);

//DELETE
router.delete("/:id", verifyToken, deleteCommentController);

//GET POST COMMENT
router.get("/post/:postId", getPostCommentController);

export default router;
