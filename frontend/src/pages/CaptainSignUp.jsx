import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainSignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const navigate = useNavigate()
  const {captain, setCaptain} = useContext(CaptainDataContext)

  const submitHandler= async(e)=>{
    e.preventDefault();
    const captainData = {
      fullName :{
        firstName:firstName,
        lastName:lastName
      },
      email:email,
      password:password,
      vehicle:{
        color : vehicleColor,
        numPlate: vehiclePlate,
        capacity:vehicleCapacity,
        vehicleType : vehicleType
      }
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`,captainData)
    

    if(response.status === 201){
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token',data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
    setVehicleColor('')
    setVehicleCapacity('')
    setVehiclePlate('')
    setVehicleType('')
  }
  return (
    <div className="px-5 py-5 h-screen flex flex-col justify-between">
      <div>
        {/* <img
          className="w-20 mb-2"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
        /> */}
        <h1 className="mb-8 text-2xl sm:text-5xl font-mono font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
  Mehul Rides
</h1>
        <form onSubmit={(e)=>{
            submitHandler(e)
        }}>
        <h3 className="text-lg font-medium mb-2">What's your Name Captain</h3>
        <div className='flex gap-4 mb-3'>
        <input
            value={firstName}
            onChange={(e)=>{
              setFirstName(e.target.value)
            }}
            type="text"
            className="bg-[#eeeeee]  py-2 px-4 rounded-lg border w-1/2 text-lg placeholder:text-base"
            required
            placeholder="First Name"
          ></input>
          <input
          value={lastName}
            onChange={(e)=>{
              setLastName(e.target.value)
            }}
            type="text"
            className="bg-[#eeeeee]  py-2 px-4 rounded border w-1/2 text-lg placeholder:text-base"
            required
            placeholder="Last Name"
          ></input>
        </div>
          <h3 className="text-lg font-medium mb-2">What's your email Captain</h3>
          <input
          value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            type="email"
            className="bg-[#eeeeee] mb-3 py-2 px-4 rounded-lg border w-full text-lg placeholder:text-base"
            required
            placeholder="john@gmail.com"
          ></input>
          <h3 className="text-lg mb-2 font-medium">Password</h3>
          <input
          value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            className="bg-[#eeeeee] mb-3 py-2 px-4 rounded-lg border w-full text-lg placeholder:text-base"
            type="password"
            required
            placeholder="password"
          ></input>
          <h3 className="text-lg font-medium mb-3">Enter your vehicle details</h3>
          <div className='flex gap-4 mb-7'>
        <input
            value={vehicleColor}
            onChange={(e)=>{
              setVehicleColor(e.target.value)
            }}
            type="text"
            className="bg-[#eeeeee]  py-2 px-4 rounded-lg border w-1/2 text-lg placeholder:text-base"
            required
            placeholder="Color"
          ></input>
          <input
          value={vehiclePlate}
            onChange={(e)=>{
              setVehiclePlate(e.target.value)
            }}
            type="text"
            className="bg-[#eeeeee]  py-2 px-4 rounded border w-1/2 text-lg placeholder:text-base"
            required
            placeholder="Number plate"
          ></input>
        </div><div className='flex gap-4 mb-3'>
        <input
            value={vehicleCapacity}
            onChange={(e)=>{
              setVehicleCapacity(e.target.value)
            }}
            type="number"
            className="bg-[#eeeeee]  py-2 px-4 rounded-lg border w-1/2 text-lg placeholder:text-base"
            required
            placeholder="Capacity"
          ></input>
          <select 
          className="bg-[#eeeeee]  py-2 px-4 rounded-lg border w-1/2 text-base"
          value={vehicleType}
            onChange={(e)=>{
              setVehicleType(e.target.value)
            }}>
              <option>Select vehicle</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motocycle">Motorcycle</option>
            </select>
        </div>
          <button className="bg-[#111] text-white font-semibold mb-2 py-2 px-4 rounded-lg  w-full text-lg placeholder:text-base">
            Create Account
          </button>
        </form>
        <p className="text-center mb-1">
          Already registered ?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
      <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
      Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  )
}

export default CaptainSignUp