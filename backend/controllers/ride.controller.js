const rideService = require("../services/ride.service")
const {validationResult} = require("express-validator")

module.exports.createRide =async(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination , vehicleType} = req.body

    console.log(req.body);
    

    try {
        const ride = await rideService.createRide({user: req.user._id , pickup, destination, vehicleType})
        return res.status(201).json(ride)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports.getFare =async(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {pickup, destination} = req.query

    try {
        const response = await rideService.getfare(pickup,destination)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
}