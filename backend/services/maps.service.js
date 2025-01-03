const axios = require("axios")
const captainModel = require("../model/caption.model")

module.exports.getAddressCoordinate = async(address)=>{
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        console.log(response.statusText);
        
        if (response.statusText === 'OK') {
            const location = response.data.results[ 0 ].geometry.location;
            // console.log(location);
            
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}


module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {


        const response = await axios.get(url);
        if (response.data.status === 'OK') {

            if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }

            return response.data.rows[ 0 ].elements[ 0 ];
        } else {
            throw new Error('Unable to fetch distance and time');
        }

    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports.getSuggestions=async(input)=>{
    if(!input){
        throw new Error("Address is required")
    }
    const apiKey = process.env.GOOGLE_MAPS_API
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK'){
            
            return response.data.predictions;
        }else{
            throw new Error('Unable to fetch suggestion')
        }
    } catch (error) {
        console.log(error);
        throw error
        
    }
}

module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {
    // radius in kilometers
    console.log(lat, lng, radius);

    try {
        const captains = await captainModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[lng, lat], radius / 6371] // Note: GeoJSON uses [lng, lat]
                }
            }
        });

        // console.log("Captains found:", captains);
        return captains;
    } catch (error) {
        console.error("Error fetching captains:", error.message);
        throw error;
    }
};

