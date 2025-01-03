const rideService = require("../services/ride.service")
const { validationResult } = require("express-validator")
const mapService = require("../services/maps.service")
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../model/ride.model");

module.exports.createRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        // Create ride
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride); // Send the response immediately

        // Perform additional operations after sending the response
        const pickUpCoordinates = await mapService.getAddressCoordinate(pickup);
        const captainInRadius = await mapService.getCaptainsInTheRadius(pickUpCoordinates.ltd, pickUpCoordinates.lng, 20000);

        ride.otp = ''; // Update ride object
        const rideWithUser = await rideModel.findOne({_id: ride._id}).populate('user')
        captainInRadius.map(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            });
        });
    } catch (error) {
        console.error(error); // Log error for debugging
        // If an error occurs before sending the response, handle it
        if (!res.headersSent) {
            return res.status(500).json({ message: error.message });
        }
    }
};


module.exports.getFare = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query

    try {
        const response = await rideService.getfare(pickup, destination)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}


module.exports.confirmRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { rideId } = req.body;
  
    try {
    
      const rideData = await rideService.confirmRide({ rideId, captain: req.captain });
   
  
      // Check if rideData is an array and get the first ride
      const ride = Array.isArray(rideData) ? rideData[0] : rideData;
  
      // Ensure ride and user details exist
      if (!ride) {
        console.error('Ride not found for ID:', rideId);
        return res.status(404).json({ message: 'Ride not found' });
      }
  
      if (!ride.user || !ride.user.socketId) {
        console.error('User or Socket ID missing in ride:', ride.user);
        return res.status(400).json({ message: 'User or Socket ID is missing' });
      }
  
      // Use the socketId to send a message
      sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-confirmed',
        data: ride,
      });
      // console.log(`Message sent to socket ID ${ride}`);
  
      return res.status(200).json(ride);
    } catch (error) {
      console.error('Error in confirmRide:', error.message, error.stack);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
  module.exports.startRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { rideId, otp } = req.query;
    try {
      const rideData = await rideService.startRide({
        rideId,
        otp,
        captain: req.captain // Make sure req.captain is properly set in your middleware
      });
  
      // Ensure ride exists before proceeding
      if (!rideData) {
        console.error('Ride not found for ID:', rideId);
        return res.status(404).json({ message: 'Ride not found' })
      }
  
      // Ensure the user object and socketId are valid
      if (!rideData.user || !rideData.user.socketId) {
        console.error('User or Socket ID missing in ride:', rideData.user);
        return res.status(400).json({ message: 'User or Socket ID is missing' });
      }
  
      // Send a message to the user's socket
      sendMessageToSocketId(rideData.user.socketId, {
        event: 'ride-started',
        data: rideData,
      });
  
      console.log(`Message sent to socket ID ${rideData.user.socketId}`);
  
      return res.status(200).json(rideData); // Send the ride data in the response
    } catch (error) {
      console.error('Error in startRide:', error.message, error.stack);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  module.exports.endRide=async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    const {rideId} = req.body
    try {
      const rideData = await rideService.endRide({rideId, captain : req.captain})
      sendMessageToSocketId(rideData.user.socketId, {
        event: 'ride-ended',
        data: rideData,
      });
      res.status(200).json(rideData)
    } catch (error) {
      console.error('Error in endRide:', error.message, error.stack);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  