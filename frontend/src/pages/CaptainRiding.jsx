import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../componants/FinishRide';
import LiveTracking from '../componants/LiveTracking';

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)
  const location = useLocation()
  const rideData = location.state?.ride

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );
  return (
    <div className="h-screen">
      <div className="fixed p-2 top-0 flex items-center justify-between w-full">
      <img
          className="w-32"
          src="      https://mir-s3-cdn-cf.behance.net/project_modules/fs/4a7ce8105340349.5f76a68c6c5d6.gif"
        ></img>
        <Link
          to="/captain-home"
          className=" h-10 w-10 flex items-center justify-center rounded-full bg-white"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-4/5">
      <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div onClick={() => {
            setFinishRidePanel(true)
          }} className="h-1/5 p-6 flex items-center relative justify-between bg-yellow-400">
        <h5
          onClick={() => {
            // setFinishRidePanel(true)
          }}
          className="p-1 absolute w-[95%] text-center top-0 right-6"
        >
          <i className=" text-3xl text-gray-600 ri-arrow-up-wide-line"></i>
        </h5>
        <h4 className='text-xl font-semibold'>4 KM Away</h4>
        <button className="  bg-green-600 p-3 px-8 text-white font-semibold rounded-lg">Complete Ride</button>

      </div>
      <div
      ref={finishRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
      >
        <FinishRide rideData={rideData} setFinishRidePanel={setFinishRidePanel}/>
      </div>
    </div>
  )
}

export default CaptainRiding