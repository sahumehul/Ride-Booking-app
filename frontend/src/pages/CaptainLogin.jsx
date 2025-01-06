import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainLogin = () => {
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState('')
  const {captain, setCaptain} = useContext(CaptainDataContext)
  const navigate = useNavigate()
  const submitHandler= async(e)=>{
      e.preventDefault()
      const captain = {
          email:email,
          password: password
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`,captain)
      if(response.status === 200){
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token',data.token)
        navigate("/captain-home")
      }
      setEmail('')
      setPassword('')
  }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        {/* <img
          className="w-20 mb-3"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
        /> */}
        <h1 className="mb-8 text-2xl sm:text-5xl font-mono font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
  Mehul Rides
</h1>
        <form onSubmit={(e)=>{
            submitHandler(e)
        }}>
          <h3 className="text-lg font-medium mb-2">What's your email Captain</h3>
          <input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
            type="email"
            className="bg-[#eeeeee] mb-7 py-2 px-4 rounded border w-full text-lg placeholde:text-base"
            required
            placeholder="john@gmail.com"
          ></input>
          <h3 className="text-lg mb-2 font-medium">Password</h3>
          <input
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 py-2 px-4 rounded border w-full text-lg placeholde:text-base"
            type="password"
            required
            placeholder="password"
          ></input>
          <button className="bg-[#111] text-white font-semibold mb-3 py-2 px-4 rounded  w-full text-lg placeholde:text-base">
            Login
          </button>
        </form>
        <p className="text-center">
          Join fleet ?{" "}
          <Link to="/captain-signup" className="text-blue-600">
            Register here
          </Link>
        </p>
      </div>
      <div>
        <Link to="/login" className="bg-[#b47010] flex justify-center items-center text-white font-semibold mb-5 py-2 px-4 rounded  w-full text-lg placeholde:text-base">
          Sign in as User
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin