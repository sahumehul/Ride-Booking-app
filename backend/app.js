const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookie = require("cookie-parser")
const bodyParser = require('body-parser');
const connectToDb = require("./db/db");
const userRouter = require("./routes/user.routes")
const captainRouter = require("./routes/caption.routes")
const mapsRoutes = require("./routes/maps.routes")
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extented : true}))
app.use(cookie())
connectToDb();

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.use("/users",userRouter)
app.use("/captain",captainRouter)
app.use("/maps",mapsRoutes)

module.exports = app;