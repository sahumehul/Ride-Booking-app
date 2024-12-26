const rideModel = require("../model/ride.model")
const mapService = require("./maps.service")



getfare=async(pickup, destination)=>{
    if(!pickup || !destination){
        throw new Error("pickup And Destination Bothe Are Required")
    }
    
    const distanceTime = await mapService.getDistanceTime(pickup,destination)
    
    const basefare ={
        auto : 30,
        car : 50,
        motorcycle : 20
    }
    const perKmRate ={
        auto : 10,
        car : 15,
        motorcycle : 8
    }
    const perMinuteRate ={
        auto : 2,
        car : 3,
        motorcycle : 1.5
    }
    
    const fare= {
        auto : Math.round(basefare.auto + ((distanceTime.distance.value/1000) * perKmRate.auto) + ((distanceTime.duration.value/60) * perMinuteRate.auto)),
        car : Math.round(basefare.car + ((distanceTime.distance.value/1000) * perKmRate.car) + ((distanceTime.duration.value/60) * perMinuteRate.car)),
        motorcycle : Math.round(basefare.motorcycle + ((distanceTime.distance.value/1000) * perKmRate.motorcycle) + ((distanceTime.duration.value/60) * perMinuteRate.motorcycle))
    }
    
    return fare
    
}

module.exports.getfare = getfare


function getOtp(num) {
    function generateOtp(num) {
        const otp = Math.floor(Math.random() * (Math.pow(10, num) - Math.pow(10, num - 1)) + Math.pow(10, num - 1)).toString();
        return otp;
    }
    return generateOtp(num);
}

module.exports.createRide = async({user, pickup, destination, vehicleType})=>{

    if(!user || !pickup || !destination || !vehicleType){
        throw new Error("All fields are required")
    }

    const fare = await getfare(pickup,destination)

    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp :getOtp(6),
        fare : fare[vehicleType]
    })

    return ride
}