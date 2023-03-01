const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const userRouter = require("./routes/users")
const authRouter = require("./routes/auth")
const postRouter = require("./routes/posts");
const connection =mongoose.connect(process.env.url)



// app.use("/images", express.static(path.join(__dirname, "public/images")));
// app.use("/images", express.static(path.join(path.resolve(__dirname), "public/images")));

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"public/images");
//     },
//     filename:(req,file,cb)=>{
//         cb(null,req.body.name)
//     }
// })
// const upload = multer({storage});
// app.post("/api/upload",upload.single("file"),(req,res)=>{
//     try{
//      return res.json("File uploaded succesfully")
//     }
//     catch(err){
//         console.log(err)
//     }
// })
app.use("/api/users",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/posts", postRouter);


app.listen(4500,async()=>{
    await connection
    console.log("Server is running")
})