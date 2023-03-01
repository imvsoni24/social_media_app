const express = require("express");
const authRouter = express.Router();
const UserModel = require("../models/user")
const bcrypt = require("bcrypt");

authRouter.post("/register", async(req, res) => {
    const {username,password,email} = req.body
  try{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new UserModel({username,email,password:hashedPassword});
    console.log(user);
    await user.save();
    res.send(user);
  }
  catch(err){
    res.json(err);
  }
  
});

authRouter.post("/login",async(req,res)=>{
  try{
    const user = await UserModel.findOne({email:req.body.email});
    !user && res.json({msg:"User not found"})
    const checkPassword = await bcrypt.compare(req.body.password,user.password)
    !checkPassword && res.json({ msg: "user credential are wrong" });
    res.json(user)
  }
  catch(err){
    res.json(err)
  }
})

module.exports = authRouter;
