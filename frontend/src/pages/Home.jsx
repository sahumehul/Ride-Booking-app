import React, { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios"
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../componants/LocationSearchPanel";
import VehiclePanel from "../componants/VehiclePanel";
import ConfirmRide from "../componants/ConfirmRide";
import LookingForDriver from "../componants/LookingForDriver";
import WaitingForDriver from "../componants/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../componants/LiveTracking";
import MehulRidesLogo from "../componants/MehulRidesLogo";


const Home = () => {
  const [pickup, setpickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [pickupSuggestion, setpickupSuggestion] = useState([])
  const [destinationSuggestion, setDestinationSuggestion] = useState([])
  const [fare, setFare] = useState({})
  const [activeField, setactiveField] = useState(null)
  const [ride, setRide] = useState(null)
  const [vehicleType, setVehicleType] = useState(null)
  const panelcloseRef = useRef(null);
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundPanelRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const {socket} = useContext(SocketContext)
   const { user } = useContext(UserDataContext);
   const navigate = useNavigate()

   useEffect(() => {
    const id = localStorage.getItem("id");
    
    socket.emit("join", { userType: "user", userId: id });
  
    const handleRideConfirmed = (ride) => {
      setWaitingForDriver(true);
      setVehicleFound(false);
      setRide(ride?.data || ride);
    };
  
    const handleRideStarted = (ride) => {
      setWaitingForDriver(false);
      navigate("/riding",{state: ride});
    };
  
    socket.on("ride-confirmed", handleRideConfirmed);
    socket.on("ride-started", handleRideStarted);
  
    // Cleanup on unmount
  }, [socket, navigate]); // Ensure these hooks depend on socket and navigate
  

  

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
          marginTop: 0
        });
        gsap.to(panelcloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
        });
        gsap.to(panelcloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );
  
  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );
  useGSAP(
    function () {
      if(waitingForDriver){
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  const handlepickupChange = async (e) => {
    const value = e.target.value;
    setpickup(value);
  
    if (!value) return; // Exit if input is empty
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("Authorization token is missing");
        return;
      }
  
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: value },
        headers: { Authorization: `Bearer ${token}` },
      });
      setpickupSuggestion(response.data || []);
    } catch (error) {
      console.error("Error fetching pickup suggestions:", error.response?.data || error.message);
    }
  };
  
  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);
  
    if (!value) return; // Exit if input is empty
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("Authorization token is missing");
        return;
      }
  
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: value },
        headers: { Authorization: `Bearer ${token}` },
      });

      setDestinationSuggestion(response.data || []);
    } catch (error) {
      console.error("Error fetching destination suggestions:", error.response?.data || error.message);
    }
  };
  
  const findTrip = async () => {
    // Validate inputs
    if (!pickup || !destination) {
      console.error("pickup and Destination are required to find a trip.");
      alert("Please provide both pickup and destination locations.");
      return;
    }
  
    // Close the panel and open vehicle panel
    setPanelOpen(false);
    setVehiclePanel(true);
  
    try {
      // Check for token
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("Authorization token is missing");
        alert("You need to be logged in to find a trip.");
        return;
      }
  
      // Make API request
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
     
  
      // Optionally set the fare or other state
      setFare(response.data); // Assuming `setFare` updates fare details in the state
    } catch (error) {
      console.error("Error fetching fare details:", error.response?.data || error.message);
      alert("Failed to retrieve fare details. Please try again later.");
    }
  };

  const createRide = async () => {
    // Validate inputs
    if (!pickup || !destination || !vehicleType) {
      console.error("pickup, Destination, and Vehicle Type are required to create a ride.");
      alert("Please provide pickup location, destination, and select a vehicle type.");
      return;
    }
  
    try {
      // Check for token
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("Authorization token is missing");
        alert("You need to be logged in to create a ride.");
        return;
      }
  
      // Make API request
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
     
  
      // Optionally set the ride details in state
      // setRide(response.data); // Assuming `setRide` updates the ride state
      alert("Ride created successfully!");
    } catch (error) {
      console.error("Error creating ride:", error.response?.data || error.message);
      alert("Failed to create ride. Please try again later.");
    }
  };
  
  
  return (
    <div className="relative h-screen overflow-hidden">
      <MehulRidesLogo className="w-48 absolute top-5" />
      <div className="h-screen w-screen">
      <div className='h-4/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

            </div>
      </div>
      <div className="flex flex-col justify-end w-full h-screen top-0 absolute">
        <div className="h-[30%] bg-white p-6 relative scroll ">
          <h5
            onClick={() => {
              setPanelOpen(false);
            }}
            ref={panelcloseRef}
            className="absolute top-6 right-6 opacity-0 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find A Trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setactiveField('pickup')
              }}
              value={pickup}
              onChange={handlepickupChange}
              type="text"
              className="bg-[#eee] w-full px-12 py-2 rounded-lg text-base mt-5"
              placeholder="Add a pickup location"
            />
            <input
              value={destination}
              onClick={() => {
                setPanelOpen(true);
                setactiveField('destination')
              }}
              onChange={handleDestinationChange}
              type="text"
              className="bg-[#eee] w-full px-12 py-2 rounded-lg text-base mt-3"
              placeholder="Enter your destination"
            />
          </form>
          
        </div>
        <div ref={panelRef} className="h-0 bg-white">
          <LocationSearchPanel
          findTrip={findTrip}
          suggestions = {activeField=== 'pickup' ? pickupSuggestion : destinationSuggestion}
            setDestination = {setDestination}
            setpickup = {setpickup}
            activeField = {activeField}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-10  pt-10"
      >
        <VehiclePanel vehiclePanel={vehiclePanel} selectVehicle = {setVehicleType}  fare={fare} setVehiclePanel={setVehiclePanel} setConfirmRidePanel={setConfirmRidePanel} />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-6  pt-12"
      >
        <ConfirmRide pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType} createRide={createRide} setVehicleFound={setVehicleFound} setConfirmRidePanel={setConfirmRidePanel} />
      </div>
      <div
        ref={vehicleFoundPanelRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-6  pt-12"
      >
        <LookingForDriver pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType} setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} setVehiclePanel={setVehiclePanel}/>
      </div>
      <div
      ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12"
      >
        <WaitingForDriver ride={ride} setVehicleFound={setVehicleFound} waitingForDriver={waitingForDriver} setWaitingForDriver={setWaitingForDriver}/>
      </div>
    </div>
  );
};

export default Home;
