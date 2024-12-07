const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors())
const connectToDb = require("./db/db");

connectToDb();

app.get("/",(req,res)=>{
    res.send("hello world")
})

module.exports = app;