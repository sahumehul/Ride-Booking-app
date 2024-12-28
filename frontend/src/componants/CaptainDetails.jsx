import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainDetails = () => {

  const {captain} = useContext(CaptainDataContext)
  return (
    <div>
        <div className="flex justify-between items-center">
          <div className="flex  justify-between items-center gap-3">
            <img className="h-10 w-10 rounded-full object-cover" src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" alt="profile pic" />
            <h4 className="text-lg font-medium capitalize">{captain.fullName.firstName + " " + captain.fullName.lastName}</h4>
          </div>
          <div>
            <h4 className="text-xl font-semibold">₹295.20</h4>
            <p className="text-sm text-gray-600">Earned</p>
          </div>
        </div>
        <div className="flex justify-center items-start gap-4 p-3 mt-8 bg-gray-100 rounded-xl">
          <div className="text-center">
            <i className="text-3xl mb-2 font-extralight ri-timer-2-line"></i>
            <h5  className="text-lg font-medium">10.5</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="text-center">
            <i className="text-3xl mb-2 font-extralight ri-speed-up-fill"></i>
            <h5  className="text-lg font-medium">10.5</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="text-center">
            <i className="text-3xl mb-2 font-extralight ri-booklet-line"></i>
            <h5  className="text-lg font-medium">10.5</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetails