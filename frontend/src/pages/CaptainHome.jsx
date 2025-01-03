import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../componants/CaptainDetails";
import RidePopUp from "../componants/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {CaptainDataContext} from "../context/CaptainContext"
import ConfirmRidePopUp from "../componants/ConfirmRidePopUp";
import { SocketContext } from "../context/SocketContext";
import axios from "axios";
import LiveTracking from "../componants/LiveTracking";

const CaptainHome = () => {
  const {captain} =useContext(CaptainDataContext)
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
  const [ride, setRide] = useState({})
  const [user,setUser] = useState({}) 
  const ridePopUpPanelRef = useRef(null)
  const confirmRidePopUpPanelRef = useRef(null)

  const {socket} = useContext(SocketContext)

  useEffect(() => {
    try {
      // const id = localStorage.getItem("id")
      
      socket.emit("join", { userType: "captain", userId: captain._id });
      const updateLocation =()=>{
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(location=>{
            
              socket.emit('update-location-captain',{
                userId : captain._id,
                location :
                {ltd : location.coords.latitude,
                lng : location.coords.longitude}
              })
          })
        }
      }

      const locationInterval = setInterval(updateLocation ,10000)
      updateLocation();

      socket.on('new-ride',(data)=>{
        console.log("captain home: ", data);
        
        setRide(data)
        setUser(data.user.fullName)
        setRidePopUpPanel(true)
        
      })
    } catch (err) {
      console.error("Socket emit failed:", err);
    }
    
    
    
  }, []);

  const confirmRide = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Authorization token not found.');
        return;
      }
  
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm-ride`,
        {
          rideId: ride._id,
          captainId: captain._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log(response.data);
      
      // If the response is successful
      if (response.status === 200) {
        setRidePopUpPanel(false);
        setConfirmRidePopUpPanel(true);
      } else {
        console.error('Failed to confirm the ride:', response);
      }
    } catch (error) {
      console.log(error);
      
      // console.error('Error confirming the ride:', error);
    }
  };
  
  

  
  useGSAP(
    function () {
      if (ridePopUpPanel) {
        gsap.to(ridePopUpPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopUpPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopUpPanel]
  );
  useGSAP(
    function () {
      if (confirmRidePopUpPanel) {
        gsap.to(confirmRidePopUpPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopUpPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopUpPanel]
  );

  
  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-full">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        ></img>
        <Link
          to="/captain-home"
          className=" h-10 w-10 flex items-center justify-center rounded-full bg-white"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
      <LiveTracking/>
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails/>
      </div>
      <div
      ref={ridePopUpPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
      >
        <RidePopUp user={user} ride={ride} confirmRide = {confirmRide} setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
      </div>
      <div
      ref={confirmRidePopUpPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
      >
        <ConfirmRidePopUp user={user} ride={ride} setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
      </div>
    </div>
  );
};

export default CaptainHome;
