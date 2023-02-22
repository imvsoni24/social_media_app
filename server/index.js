const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const userRouter = require("./routes/users")
const authRouter = require("./routes/auth")

const connection =mongoose.connect(process.env.url)

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users",userRouter)
app.use("/api/auth",authRouter)


app.listen(4500,async()=>{
    await connection
    console.log("Server is running")
})