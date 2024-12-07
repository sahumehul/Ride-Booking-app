const userModel = require("../model/user.model");
const {validationResult} = require("express-validator");
const userService = require("../services/user.service")

module.exports.registerUser = async(req,res,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors : error.array()})
    }

    console.log(req.body);
    
    const {fullName, email, password} = req.body
    const hashedPassword = await userModel.hashPassword(password)

    const user = await userService.createUser({
        firstName : fullName.firstName,
        lastName: fullName.lastName,
        email,
        password : hashedPassword
    })

    const token =await  user.generateAuthToken();

    res.status(201).json({token,user})

}