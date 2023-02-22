const express = require("express");
const postRouter = express.Router();
const PostModel = require("../models/post");
const UserModel = require("../models/user")

postRouter.post("/create", async (req, res) => {
  try {
    const newPost = new PostModel(req.body);
    await newPost.save()
    res.json({ msg: "Successfully Created" });
   
  } catch (err) {
    res.json(err);
  }
});

postRouter.get("/", async (req, res) => {
  try {
    const post = await PostModel.find();
    res.send(post)
  } catch (err) {
    res.json(err);
  }
});

postRouter.get("/:id", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    res.send(post);
  } catch (err) {
    res.json(err);
  }
});

postRouter.delete("/:id", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post.userId == req.body.userId) {
      await PostModel.deleteOne({ $set: req.body });
      res.json({ msg: "Successfully deleted" });
    } else {
      res.json({ msg: "You can deleted only your post" });
    }
  } catch (err) {
    res.json(err);
  }
});

postRouter.put("/:id", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if(post.userId==req.body.userId){
        await PostModel.updateOne({$set:req.body});
        res.json({ msg: "Successfully Updated" });
    }else{
        res.json({ msg: "You can update only your post" });
    }
  } catch (err) {
    res.json(err);
  }
});

postRouter.put("/:id/like", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await PostModel.updateOne({ $push: {likes:req.body.userId} });
      res.json({ msg: "Successfully liked" });
    } else {
      await PostModel.updateOne({ $pull: { likes: req.body.userId } });
      res.json({ msg: "Successfully unliked" });
    }
  } catch (err) {
    res.json(err);
  }
});


postRouter.get("/timeline/all", async (req, res) => {
  try {
    const currentUser = await UserModel.findById(req.body.userId);
    const userPosts = await PostModel.find({userId:currentUser._id})
    const friendPosts = await Promise.all(
        currentUser.followings.map((friendId)=>{
           return PostModel.find({userId:friendId})
        })
    )
    res.json(userPosts.concat(...friendPosts))
  } catch (err) {
    res.json(err);
  }
});
module.exports = postRouter;
