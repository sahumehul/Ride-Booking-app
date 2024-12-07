const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectToDb = require("./db/db");
const userRouter = require("./routes/user.routes")

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extented : true}))

connectToDb();

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.use("/users",userRouter)

module.exports = app;