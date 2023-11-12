import express from "express";

//controller import
import {
  createPostController,
  updatePostController,
  getPostController,
  getAllPostController,
  getUserPostController,
  deletePostController,
} from "../controllers/postController.js";

//import middleware
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/create", verifyToken, createPostController);

//UPDATE
router.put("/:id", verifyToken, updatePostController);

//DELETE
router.delete("/:id", verifyToken, deletePostController);

//GET POST DETAILS
router.get("/:id", verifyToken, getPostController);

//GET ALL POST
router.get("/", getAllPostController);

//GET USER POST
router.get("/user/:userId", verifyToken, getUserPostController);

export default router;
