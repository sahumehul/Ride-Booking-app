import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const UserLogin = () => {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState('')
    const {user, setUser} = useContext(UserDataContext)
    const navigate = useNavigate()
    const submitHandler=async(e)=>{
        e.preventDefault()
        const loginUser = {
            email:email,
            password: password
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,loginUser)
        if (response.status === 200) {
          const data = response.data
          setUser(data.user)
          localStorage.setItem('token', data.token)
          localStorage.setItem("id", data.user._id);
          navigate('/home')
        }
        setEmail('')
        setPassword('')
        
    }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        {/* <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1024px-Uber_logo_2018.svg.png"
        /> */}
        <h1 className="mb-8 text-2xl sm:text-5xl font-mono font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
  Mehul Rides
</h1>

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
          New here?{" "}
          <Link to="/signup" className="text-blue-600">
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link to="/captain-login" className="bg-[#10b461] flex justify-center items-center text-white font-semibold mb-5 py-2 px-4 rounded  w-full text-lg placeholde:text-base">
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
