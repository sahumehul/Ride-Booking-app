import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const ConfirmRidePopUp = ({ setRidePopUpPanel, setConfirmRidePopUpPanel }) => {
  const [otp,setOtp] = useState("")

  const submitHandler = (e)=>{
    e.preventdefault()
  }
  return (
    <div>
      <h5
        onClick={() => {
          setConfirmRidePopUpPanel(false);
        }}
        className="p-1 absolute w-[93%] text-center top-0"
      >
        <i className=" text-3xl text-gray-600 ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm this Ride to start !</h3>
      <div className='flex items-center justify-between mt-4 border-2 border-yellow-300 rounded-lg p-3'>
        <div className='flex items-center gap-3'>
          <img className='h-12 w-12 rounded-full object-cover' src='https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg' alt='' />
          <h2 className='text-xl font-medium'>Mehul Sahu</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
      </div>
      <div className="flex  flex-col gap-2 justify-between items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 border-b-2 p-3">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11, 2A</h3>
              <p className="text-sm text-gray-600 -mt-1">nayapaara utai</p>
            </div>
          </div>
          <div className="flex items-center gap-5 border-b-2 p-3">
            <i className="ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11, 2A</h3>
              <p className="text-sm text-gray-600 -mt-1">nayapaara utai</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹193.20</h3>
              <p className="text-sm text-gray-600 -mt-1">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className='mt-6 w-full'>
          <form onSubmit={(e)=>{
            submitHandler(e)
          }}>
          <input type='text' value={otp} onChange={(e)=>{setOtp(e.target.value)}} placeholder='Enter OTP' className='bg-[#eee] w-full px-6 py-4 font-mono rounded-lg text-base mt-3'/>
          <Link to="/captain-riding" className="flex justify-center w-full mt-5 bg-green-600 p-3 text-white text-lg font-semibold rounded-lg">
            Confirm
          </Link>
          <button onClick={() => { setConfirmRidePopUpPanel(false), setRidePopUpPanel(false) }} className="w-full text-lg mt-1 bg-red-600 p-3 text-white font-semibold rounded-lg">
            Cancel
          </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ConfirmRidePopUp