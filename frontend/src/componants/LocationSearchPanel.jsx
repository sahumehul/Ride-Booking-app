import React from 'react'

const LocationSearchPanel = ({setPanelOpen,setVehiclePanel}) => {

  const location = [
    "13/004, nayapaara utai, Durg (Chhattisgarh)",
    "15/004, bhaatapaara utai, Durg (Chhattisgarh)",
    "16/004, hathkhoj utai, Durg (Chhattisgarh)",
    "17/004, nevai utai, Durg (Chhattisgarh)",
  ]
  return (
    <div>
      {
        location.map(function(elem,idx){
          return <div key={idx} onClick={()=>{setVehiclePanel(true),setPanelOpen(false)}} className='flex gap-4 items-center justify-start my-2 border-gray-50 active:border-black  border-2 p-3 rounded-xl '>
        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-8 rounded-full'><i className="ri-map-pin-fill"></i></h2>
        <h4 className='font-medium'>{elem}</h4>
      </div>
        })
      }
      {/* <div className='flex gap-4 items-center justify-start my-2 border-gray-50 active:border-black border-2 p-3 rounded-xl '>
        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-8 rounded-full'><i className="ri-map-pin-fill"></i></h2>
        <h4 className='font-medium'>13/004, nayapaara utai, Durg (Chhattisgarh)</h4>
      </div>
      <div className='flex gap-4 items-center justify-start my-2 border-gray-50 active:border-black border-2 p-3 rounded-xl '>
        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-8 rounded-full'><i className="ri-map-pin-fill"></i></h2>
        <h4 className='font-medium'>13/004, nayapaara utai, Durg (Chhattisgarh)</h4>
      </div>
      <div className='flex gap-4 items-center justify-start my-2 border-gray-50 active:border-black border-2 p-3 rounded-xl '>
        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-8 rounded-full'><i className="ri-map-pin-fill"></i></h2>
        <h4 className='font-medium'>13/004, nayapaara utai, Durg (Chhattisgarh)</h4>
      </div> */}
    </div>
  )
}

export default LocationSearchPanel