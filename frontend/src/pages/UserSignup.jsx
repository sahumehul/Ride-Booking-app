import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({})

  const submitHandler=(e)=>{
    e.preventDefault();
    setUserData({
      fullName :{
        firstName:firstName,
        lastName:lastName
      },
      email:email,
      password:password
    })
    console.log(userData);
    
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
  }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
        />
        <form onSubmit={(e)=>{
            submitHandler(e)
        }}>
        <h3 className="text-lg font-medium mb-2">What's your Name</h3>
        <div className='flex gap-4 mb-7'>
        <input
            value={firstName}
            onChange={(e)=>{
              setFirstName(e.target.value)
            }}
            type="text"
            className="bg-[#eeeeee]  py-2 px-4 rounded-lg border w-1/2 text-lg placeholde:text-base"
            required
            placeholder="First Name"
          ></input>
          <input
          value={lastName}
            onChange={(e)=>{
              setLastName(e.target.value)
            }}
            type="text"
            className="bg-[#eeeeee]  py-2 px-4 rounded border w-1/2 text-lg placeholde:text-base"
            required
            placeholder="Last Name"
          ></input>
        </div>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
          value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            type="email"
            className="bg-[#eeeeee] mb-7 py-2 px-4 rounded-lg border w-full text-lg placeholde:text-base"
            required
            placeholder="john@gmail.com"
          ></input>
          <h3 className="text-lg mb-2 font-medium">Password</h3>
          <input
          value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            className="bg-[#eeeeee] mb-7 py-2 px-4 rounded-lg border w-full text-lg placeholde:text-base"
            type="password"
            required
            placeholder="password"
          ></input>
          <button className="bg-[#111] text-white font-semibold mb-3 py-2 px-4 rounded-lg  w-full text-lg placeholde:text-base">
            SignUp
          </button>
        </form>
        <p className="text-center">
          Already registered ?{" "}
          <Link to="/login" className="text-blue-600">
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

export default UserSignup