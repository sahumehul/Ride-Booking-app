const captainModel = require("../model/caption.model");
const {validationResult} = require("express-validator");
const captainService = require("../services/captain.service")


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