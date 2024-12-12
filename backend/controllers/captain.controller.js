const captainModel = require("../model/caption.model");
const {validationResult} = require("express-validator");
const captainService = require("../services/captain.service");
const blackListModel = require("../model/blackListToken.model");


module.exports.registerCaptain = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({erros: errors.array()})
    }

    
    const {fullName, email, password, vehicle} = req.body;
    const isAlreadyExist = await captainModel.findOne({email})
    if(isAlreadyExist){
        return res.status(400).json({message:'Email already exist'})
    }
    const hashedPassword = await captainModel.hashPassword(password)

    const captain = await captainService.createCaption({
        firstName : fullName.firstName,
        lastName : fullName.lastName,
        email,
        password: hashedPassword,
        color:vehicle.color,
        numPlate: vehicle.numPlate,
        capacity: vehicle.capacity,
        vehicleType : vehicle.vehicleType
    })

    const token = await captain.generateAuthToken()

    res.status(201).json({token,captain})
}

module.exports.loginCaptain= async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({erros: errors.array()})
    }

    const {email,password} = req.body;
    const captain = await captainModel.findOne({email}).select("+password");

    if(!captain){
        return res.status(401).json({message:"Unauthorized"})
    }

    const isPassword = await captain.comparePassword(password);
    if(!isPassword){
        return res.status(401).json({message:"Unauthorized"})
    }

    const token = await captain.generateAuthToken();
    res.cookie("token",token);
    res.status(200).json({token, captain})
}

module.exports.getCaptainProfile=async(req,res,next)=>{
    return res.status(200).json({captain : req.captain})
}

module.exports.logoutCaptain=async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    await blackListModel.create({token})
    res.clearCookie('token')
    res.status(200).json({message:"Logout successfully"})
}