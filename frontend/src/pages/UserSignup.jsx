import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

 

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );
      const data = response.data;
      

      // Update context state
      setUser(data.user);

      // Save token and reset form
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.user._id);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      navigate("/home");
    } catch (error) {
      console.error("Error during signup:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        {/* <img
          className="w-16 mb-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
        /> */}
        <h1 className="mb-8 text-2xl sm:text-5xl font-mono font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
  Mehul Rides
</h1>
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your Name</h3>
          <div className="flex gap-4 mb-7">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              className="bg-[#eeeeee] py-2 px-4 rounded-lg border w-1/2 text-lg placeholde:text-base"
              required
              placeholder="First Name"
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className="bg-[#eeeeee] py-2 px-4 rounded border w-1/2 text-lg placeholde:text-base"
              required
              placeholder="Last Name"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="bg-[#eeeeee] mb-7 py-2 px-4 rounded-lg border w-full text-lg placeholde:text-base"
            required
            placeholder="john@gmail.com"
          />
          <h3 className="text-lg mb-2 font-medium">Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 py-2 px-4 rounded-lg border w-full text-lg placeholde:text-base"
            type="password"
            required
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 py-2 px-4 rounded-lg w-full text-lg placeholde:text-base">
            Create Account
          </button>
        </form>
        <p className="text-center">
          Already registered?{" "}
          <Link to="/login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
