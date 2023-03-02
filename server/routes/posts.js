const express = require("express");
const postRouter = express.Router();
const PostModel = require("../models/post");
const UserModel = require("../models/user")
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+"-"+file.originalname);
  },
});
const upload = multer({ storage:storage});

postRouter.post("/create",upload.single("file") ,async (req, res) => {
  try {
    const newPost = new PostModel({
      userId: req.body.userId,
      desc: req.body.desc,
      img: req.file ? req.file.filename:null
    });
    const savedPost = await newPost.save()
    res.json(savedPost);
   
  } catch (err) {
    res.json(err);
  }
});

postRouter.get("/", async (req, res) => {
  try {
    const post = await PostModel.find();
    res.json(post)
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
      await post.updateOne({ $push: {likes:req.body.userId} });
      res.json({ msg: "Successfully liked" });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.json({ msg: "Successfully unliked" });
    }
  } catch (err) {
    res.json(err);
  }
});


postRouter.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await UserModel.findById(req.params.userId);
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

postRouter.get("/profile/:username", async (req, res) => {
  try {
    const user = await UserModel.findOne({username:req.params.username})
    const posts = await PostModel.find({userId:user._id})
    res.json(posts)
  } catch (err) {
    res.json(err);
  }
});
module.exports = postRouter;
