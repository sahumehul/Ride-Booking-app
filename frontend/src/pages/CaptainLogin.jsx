import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const CaptainLogin = () => {
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({});

  const submitHandler=(e)=>{
      e.preventDefault()
      setUserData({
          email:email,
          password: password
      })
      console.log(userData);
      
      setEmail('')
      setPassword('')
  }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1024px-Uber_logo_2018.svg.png"
        />
        <form onSubmit={(e)=>{
            submitHandler(e)
        }}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
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