import React from 'react'

const VehiclePanel = ({selectVehicle,fare,setVehiclePanel,setConfirmRidePanel}) => {
  return (
    <div>
        <h5
          onClick={() => {
            setVehiclePanel(false);
          }}
          className="p-1 absolute w-[93%] text-center top-0"
        >
          <i className=" text-3xl text-gray-600 ri-arrow-down-wide-fill"></i>
        </h5>
        <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
        <div onClick={()=>{selectVehicle('car'),setConfirmRidePanel(true),setVehiclePanel(false)}} className="flex p-3 mb-2 border-2 active:border-black rounded-xl w-full items-center justify-between">
          <img
            className="h-12"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
            alt=""
          />
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-base">
              UberGo
              <span>
                <i className="ri-user-3-fill"></i>
              </span>
              4
            </h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable, compact rides
            </p>
          </div>
          <h2 className="text-lg font-semibold">₹{fare.car}</h2>
        </div>
        <div onClick={()=>{selectVehicle('motorcycle'),setConfirmRidePanel(true),setVehiclePanel(false)}} className="flex p-3 mb-2 border-2 active:border-black rounded-xl w-full items-center justify-between">
          <img
            className="h-12"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTJw6dzEo1MYXOAbONCG1oL82rxU_Bitb-g&s"
            alt=""
          />
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-base">
              Moto
              <span>
                <i className="ri-user-3-fill"></i>
              </span>
              1
            </h4>
            <h5 className="font-medium text-sm">3 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable, motorcycle rides
            </p>
          </div>
          <h2 className="text-lg font-semibold">₹{fare.motorcycle}</h2>
        </div>
        <div onClick={()=>{selectVehicle('auto'),setConfirmRidePanel(true),setVehiclePanel(false)}} className="flex p-3 mb-2 border-2 active:border-black rounded-xl w-full items-center justify-between">
          <img
            className="h-12"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsFabRnJZ8deGXJSKA1QjN45920WytRrdFsA&s"
            alt=""
          />
          <div className="ml-2 w-1/2">
            <h4 className="font-medium text-base">
              Uberauto
              <span>
                <i className="ri-user-3-fill"></i>
              </span>
              1
            </h4>
            <h5 className="font-medium text-sm">3 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable, motorcycle rides
            </p>
          </div>
          <h2 className="text-lg font-semibold">₹{fare.auto}</h2>
        </div>

    </div>
  )
}

export default VehiclePanel