const rideModel = require("../model/ride.model")
const { sendMessageToSocketId } = require("../socket")
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

module.exports.confirmRide =async({rideId,captain})=>{
    if(!rideId){
        throw new Error('Ride id is required')
    }

    await rideModel.findOneAndUpdate({_id : rideId},{status : 'accepted',captain : captain._id})

    const ride = await rideModel.find({
        _id : rideId
    }).populate('user').populate('captain').select('+otp')

    if(!ride){
        throw new Error('Ride not found')
    }

    return ride
}

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
      throw new Error('Ride ID and OTP are required');
    }
  
    const ride = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');  
    if (!ride) {
      throw new Error('Ride not found');
    }
  
    if (ride.status !== "accepted") {
      throw new Error('Ride not accepted');
    }
  
    if (String(ride.otp) !== String(otp)) {
        console.log(otp);
        
      throw new Error('Invalid OTP');
    }
  
    await rideModel.findOneAndUpdate({ _id: rideId }, { status: 'ongoing' });
  
  
    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-started',
      data: ride,
    });
  
    return ride; // return the full ride data to the controller
  };
  

  module.exports.endRide=async({rideId,captain})=>{
    if (!rideId) {
        throw new Error('Ride ID are required');
      }
    
      const ride = await rideModel.findOne({ _id: rideId,captain: captain._id }).populate('user').populate('captain').select('+otp');  
      if (!ride) {
        throw new Error('Ride not found');
      }
    
      if (ride.status !== "ongoing") {
        throw new Error('Ride not ongoing');
      }
    
    
      await rideModel.findOneAndUpdate({ _id: rideId }, { status: 'completed' });

      return ride
  }