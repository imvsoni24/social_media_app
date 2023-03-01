const express = require("express")
const userRouter = express.Router();
const bcrypt = require("bcrypt")
const UserModel = require("../models/user")

userRouter.put("/:id",async(req,res)=>{
    if(req.body.userId==req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt)

            }catch(err){
                return res.json(err)
            }
        }
        try{
            await UserModel.findByIdAndUpdate(req.params.id,
                {$set:req.body
                })
                return res.json({ msg: "Account has been updated" });

        }catch(err){
            return res.json(err);
        }

    }else{
        return res.json({msg:"You can not update others account"})   
    }
})

userRouter.delete("/:id", async (req, res) => {
  if (req.body.userId == req.params.id || req.body.isAdmin) {
    try {
      await UserModel.findByIdAndDelete(req.params.id);
      return res.json({ msg: "Account has been deleted" });
    } catch (err) {
      return res.json(err);
    }
  } else {
    return res.json({ msg: "You can not delete others account" });
  }
});

userRouter.get("/",async(req,res)=>{
  const userId = req.query.userId
  const username = req.query.username;
    try{
       const user = userId
         ? await UserModel.findById(userId)
         : await UserModel.findOne({username:username});
       const {password,updatedAt,...other} = user._doc
       res.json(other)
    }
    catch(err){
        res.json(err);
    }
})

userRouter.get("/friends/:userId",async(req,res)=>{
  try{
    const user = await UserModel.findById(req.params.userId)
    const friends = await Promise.all(
      user.followings.map((friendId)=>{
        return UserModel.findById(friendId)
      })
    )
    let friendList = []
    friends.map((friend)=>{
      const {_id,username,profilePicture} = friend
      friendList.push({ _id, username, profilePicture });
    })
   res.json(friendList)
  }
  catch(err){
    res.json(err)
  }

})

userRouter.put("/:id/follow",async(req,res)=>{
    if(req.body.userId!==req.params.id){
        try {
          const user = await UserModel.findById(req.params.id);
          const currentUser = await UserModel.findById(req.body.userId);
          if(!user.followers.includes(req.body.userId)){
            await user.updateOne({$push:{followers:req.body.userId}});
            await currentUser.updateOne({ $push: { followings: req.params.id } });
            res.json({ msg: "You are following now" });
        }else{
            res.json({msg:"You are already following"})
          }
          
          
        } catch (err) {
          res.json(err);
        }

    }else{
        res.json({msg:"You can not follow yourself"})
    }
})

userRouter.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await UserModel.findById(req.params.id);
      const currentUser = await UserModel.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.json({ msg: "You are unfollowing now" });
      } else {
        res.json({ msg: "You are not following" });
      }
    } catch (err) {
      res.json(err);
    }
  } else {
    res.json({ msg: "You can not unfollow yourself" });
  }
});
module.exports=userRouter