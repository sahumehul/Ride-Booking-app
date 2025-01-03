import React, { useEffect } from "react";

const WaitingForDriver = ({ ride, setVehicleFound, waitingForDriver, setWaitingForDriver }) => {
    useEffect(() => {
        console.log(ride); // This will log the captain's details passed as the `ride` prop.
    }, [ride]);

    return (
        <div>
            <h5
                onClick={() => {
                    setWaitingForDriver(false);
                    setVehicleFound(false); // Optionally close the waiting screen
                }}
                className="p-1 absolute w-[93%] text-center top-0"
            >
                <i className="text-3xl text-gray-600 ri-arrow-down-wide-fill"></i>
            </h5>

            <div className="flex justify-between items-center">
                <img
                    className="h-12"
                    src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
                    alt="Vehicle"
                />
                <div className="text-right">
                    {/* Captain's Name */}
                    <h2 className="text-lg font-medium">{ride?.captain.fullName?.firstName} {ride?.captain.fullName?.lastName}</h2>
                    {/* Vehicle Number */}
                    <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain.vehicle?.numPlate}</h4>
                    {/* Vehicle Type */}
                    <p className="text-sm text-gray-600">{ride?.captain.vehicle?.vehicleType}</p>
                    <h1 className="text-lg font-semibold">{ride?.otp}</h1>
                </div>
            </div>

            <div className="flex flex-col gap-2 justify-between items-center">
                <div className="w-full mt-5">
                    {/* Pickup Location */}
                    <div className="flex items-center gap-5 border-b-2 p-3">
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">{ride?.pickup}</h3>
                            <p className="text-sm text-gray-600 -mt-1">Pickup Location</p>
                        </div>
                    </div>
                    {/* Destination Location */}
                    <div className="flex items-center gap-5 border-b-2 p-3">
                        <i className="ri-map-pin-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">{ride?.destination}</h3>
                            <p className="text-sm text-gray-600 -mt-1">Destination Location</p>
                        </div>
                    </div>
                    {/* Fare */}
                    <div className="flex items-center gap-5 p-3">
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
                            <p className="text-sm text-gray-600 -mt-1">Fare</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WaitingForDriver;
