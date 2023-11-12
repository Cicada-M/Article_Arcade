import CommentSchema from "../models/Comment.js";

//create comment
export const createCommentController = async (req, res) => {
  try {
    const newComment = new CommentSchema(req.body);
    newComment.save().then((result) => {
      CommentSchema.populate(newComment, {
        path: "createdBy",
        select: "-password",
      }).then((comment) => {
        res.status(200).json(comment);
      });
    });
    // res.status(200).json(savedComment);
  } catch (error) {
    res.status(500).json(error);
  }
};

//update comment
export const updateCommentController = async (req, res) => {
  try {
    const comment = await CommentSchema.findById(req.params.id);
    if (comment.userId !== req.userId) {
      return res.status(401).json({ message: "unauthorized" });
    }

    const updatedComment = await CommentSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: { comment: req.body.comment },
      },
      { new: true }
    );

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json(error);
  }
};

//delete comment
export const deleteCommentController = async (req, res) => {
  try {
    const comment = await CommentSchema.findById(req.params.id);
    if (comment.userId !== req.userId) {
      return res.status(401).json({ message: "unauthorized" });
    }
    await CommentSchema.findByIdAndDelete(req.params.id);

    res.status(200).json("Comment has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET POST COMMENTS
export const getPostCommentController = async (req, res) => {
  try {
    const comments = await CommentSchema.find({
      postId: req.params.postId,
    }).populate({
      path: "createdBy",
      select: "-password",
    });
    // const { password, ...info } = user._doc;
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
};
