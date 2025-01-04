import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'

const Riding = () => {
    const location = useLocation()
    const ride = location.state || {}
    const {socket} = useContext(SocketContext)
    const navigate = useNavigate();
    useEffect(() => {

        if (!socket || typeof socket.on !== 'function') {
            console.error('Socket is not properly initialized.');
            return;
        }

        const handleRideEnded = () => {
            navigate('/home');
        };

        socket.on('ride-ended', handleRideEnded);

    }, [socket, navigate]);
    
    return (
        <div className='h-screen'>
        <Link to="/home" className='fixed right-2 top-2 h-10 w-10 flex items-center justify-center rounded-full bg-white'>
            <i className="text-lg font-medium ri-home-5-line"></i>
        </Link>
            <div className='h-1/2'>
                <img
                    className="object-cover h-full w-full"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt=""
                />
            </div>
            <div className='h/2 p-4'>
                <div className="flex justify-between items-center">
                    <img
                        className="h-12"
                        src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
                        alt=""
                    />
                    <div className="text-right">
                        <h2 className="text-lg font-medium">{ride?.captain.fullName.firstName + ' ' +ride?.captain.fullName.lastName}</h2>
                        <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain.vehicle.numPlate}</h4>
                        <p className="text-sm text-gray-600">{ride?.captain.vehicle.vehicleType}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 justify-between items-center">
                    <div className="w-full mt-5">
                       
                        <div className="flex items-center gap-5 border-b-2 p-3">
                            <i className="ri-map-pin-fill"></i>
                            <div>
                                <h3 className="text-lg font-medium">Pickup Address</h3>
                                <p className="text-sm text-gray-600 -mt-1">{ride?.pickup}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 p-3">
                            <i className="ri-currency-line"></i>
                            <div>
                                <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
                                <p className="text-sm text-gray-600 -mt-1">Cash Cash</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='w-full mt-5 bg-green-600 p-2 text-white font-semibold rounded-lg'>Make a payment</button>
            </div>
        </div>
    )
}

export default Riding