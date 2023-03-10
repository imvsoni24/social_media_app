const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const userRouter = require("./routes/users")
const authRouter = require("./routes/auth")
const postRouter = require("./routes/posts");
const connection =mongoose.connect(process.env.url)



app.use("/public", express.static("public"))

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/posts", postRouter);


app.listen(4500,async()=>{
    await connection
    console.log("Server is running")
})