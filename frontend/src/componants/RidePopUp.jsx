import React, { useEffect } from 'react'

const RidePopUp = ({setRidePopUpPanel,setConfirmRidePopUpPanel,ride,user,confirmRide}) => {

 
  return (
    <div>
         <h5
        onClick={() => {
            setRidePopUpPanel(false);
        }}
        className="p-1 absolute w-[93%] text-center top-0"
      >
        <i className=" text-3xl text-gray-600 ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">New Ride Available !</h3>
      <div className='flex items-center justify-between mt-4 bg-yellow-300 rounded-lg p-3'>
        <div className='flex items-center gap-3'>
            <img className='h-12 w-12 rounded-full object-cover' src='https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg' alt=''/>
            <h2 className='text-xl font-medium'>{user.firstName + " " + user.lastName}</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
      </div>
      <div className="flex flex-col gap-2 justify-between items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 border-b-2 p-3">
          <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm text-gray-600 -mt-1">{ride.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 border-b-2 p-3">
            <i className="ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm text-gray-600 -mt-1">{ride.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
          <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{ride.fare}</h3>
              <p className="text-sm text-gray-600 -mt-1">Cash Cash</p>
            </div>
          </div>
        </div>
        
       <div className='flex w-full items-center justify-between mt-5 gap-2'>
       <button onClick={()=>{setRidePopUpPanel(false)}} className="w-full  bg-gray-400 p-3 px-8 text-white font-semibold rounded-lg">
          Ignore
        </button>
       <button onClick={()=>{confirmRide(),setConfirmRidePopUpPanel(true)}} className="w-full  bg-green-600 p-3 px-8 text-white font-semibold rounded-lg">
          Accept
        </button>
       
       </div>
      </div>
    </div>
  )
}

export default RidePopUp