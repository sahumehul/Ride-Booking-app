import axios from 'axios';
import React from 'react'
import {  useNavigate } from 'react-router-dom';

const FinishRide = ({rideData,setFinishRidePanel}) => {  

  const navigate = useNavigate();

  const endRide = async () => {
    try {
        const token = localStorage.getItem('token');

        if (!rideData || !rideData._id) {
            console.error('Ride data or ride ID is missing');
            return;
        }

        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
            {
                rideId: rideData._id, // Ensure rideData._id exists
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status === 200) {
            console.log('Ride ended successfully:', response.data);
            navigate("/captain-home");
        } else {
            console.error('Unexpected response status:', response.status);
        }
    } catch (error) {
        console.error("Error while finishing the ride:", error.response?.data || error.message);
    }
};

  return (
    <div>
      <h5
        onClick={() => {
            setFinishRidePanel(false);
        }}
        className="p-1 absolute w-[93%] text-center top-0"
      >
        <i className=" text-3xl text-gray-600 ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Finish this Ride</h3>
      <div className='flex items-center justify-between mt-4 border-2 border-yellow-500 rounded-lg p-3'>
        <div className='flex items-center gap-3'>
          <img className='h-12 w-12 rounded-full object-cover' src='https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg' alt='' />
          <h2 className='text-xl font-medium'>{rideData?.user.fullName.firstName + " " +rideData?.user.fullName.lastName}</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
      </div>
      <div className="flex  flex-col gap-2 justify-between items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 border-b-2 p-3">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Pickup Address</h3>
              <p className="text-sm text-gray-600 -mt-1">{rideData?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 border-b-2 p-3">
            <i className="ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Destination Address</h3>
              <p className="text-sm text-gray-600 -mt-1">{rideData?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{rideData?.fare}</h3>
              <p className="text-sm text-gray-600 -mt-1">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className='mt-10 w-full'>
          <button onClick={endRide} className="flex justify-center w-full mt-5 bg-green-600 p-3 text-lg text-white font-semibold rounded-lg">
            Complete Ride
          </button>
        </div>
      </div>
    </div>
  )
}

export default FinishRide