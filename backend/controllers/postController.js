import PostSchema from "../models/Post.js";
import CommentSchema from "../models/Comment.js";
import UserSchema from "../models/User.js";

export const createPostController = async (req, res) => {
  try {
    const newPost = new PostSchema(req.body);
    await newPost.save().then((result) => {
      UserSchema.populate(newPost, {
        path: "createdBy",
        select: "-password",
      }).then((post) => {
        res.status(200).json(post);
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updatePostController = async (req, res) => {
  try {
    const post = await PostSchema.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== req.userId) {
      return res.status(401).json({ message: "unauthorized" });
    }

    const updatedPost = await PostSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deletePostController = async (req, res) => {
  try {
    const post = await PostSchema.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "No post found" });
    }

    if (post.userId !== req.userId) {
      return res.status(401).json({ message: "unauthorized" });
    }

    await CommentSchema.deleteMany({ postId: req.params.id });
    await PostSchema.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET POST DETAILs
export const getPostController = async (req, res) => {
  try {
    await PostSchema.findById(req.params.id)
      .populate({
        path: "createdBy",
        select: "-password",
      })
      .then((post) => res.status(200).json(post));
    // const { password, ...info } = user._doc;
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllPostController = async (req, res) => {
  try {
    const query = req.query;
    console.log(query);
    const searchFilter = {
      $or: [
        { title: { $regex: query.search, $options: "i" } },
        { categories: { $regex: `^${query.search}$`, $options: "i" } },
      ],
    };
    const posts = await PostSchema.find(
      query.search ? searchFilter : null
    ).populate({ path: "createdBy", select: "-password" });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserPostController = async (req, res) => {
  try {
    const query = req.query;
    // console.log(query);
    const searchFilter = {
      $or: [
        { title: { $regex: query.search, $options: "i" } },
        { categories: { $in: [query.search] } },
      ],
    };
    const userId = req.params.userId;
    const posts = await PostSchema.find({
      userId,
      ...(query.search ? searchFilter : null),
    }).populate({ path: "createdBy", select: "-password" });
    // const { password, ...info } = user._doc;
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};
