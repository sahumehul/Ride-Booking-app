import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
        <div className='bg-cover bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-center h-screen pt-8 flex justify-between flex-col w-full'>
        {/* <img className='w-16 ml-8 bg-transparent' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'></img> */}
        <h1 className="text-3xl sm:text-5xl font-mono font-extrabold ml-8 bg-gradient-to-r from-teal-400 via-yellow-300 to-white bg-clip-text text-transparent drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
  Mehul Rides
</h1>


            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-3xl font-bold'>Get Started</h2>
                <Link to="/login" className='flex justify-center items-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start