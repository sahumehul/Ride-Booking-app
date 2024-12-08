const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackListModel = require("../model/blackListToken.model");

module.exports.authUser= async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }

    const isBlackListed = await blackListModel.findOne({token : token});

    if(isBlackListed){
        res.status(401).json({message: "Unauthorized"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id)

        req.user = user;
        next()
    }catch(err){
        return res.status(401).json({message: "Unauthorized"})
    }
}