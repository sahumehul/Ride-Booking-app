const captainModel = require("../model/caption.model");


module.exports.createCaption = async({firstName,lastName,email,password,color,numPlate,capacity,vehicleType})=>{
    if(!firstName || !email || !password || !color || !numPlate || !capacity || !vehicleType){
        throw new error("All fields are required")
    }

    const captain = captainModel.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password,
        vehicle:{
            color,numPlate,capacity,vehicleType
        }
    })

    return captain
}