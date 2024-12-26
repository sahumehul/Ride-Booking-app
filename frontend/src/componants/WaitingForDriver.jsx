import React from "react";

const WaitingForDriver = () => {
    return (
        <div>
            <h5
                onClick={() => {
                    setConfirmRidePanel(false);
                    // setVehicleFound(false)
                }}
                className="p-1 absolute w-[93%] text-center top-0"
            >
                <i className=" text-3xl text-gray-600 ri-arrow-down-wide-fill"></i>
            </h5>

            <div className="flex justify-between items-center">
                <img
                    className="h-12"
                    src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
                    alt=""
                />
                <div className="text-right">
                    <h2 className="text-lg font-medium">Mehul Sahu</h2>
                    <h4 className="text-xl font-semibold -mt-1 -mb-1">CG07 AU 7818</h4>
                    <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
                </div>
            </div>

            <div className="flex flex-col gap-2 justify-between items-center">
                <div className="w-full mt-5">
                    <div className="flex items-center gap-5 border-b-2 p-3">
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/11, 2A</h3>
                            <p className="text-sm text-gray-600 -mt-1">nayapaara utai</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 border-b-2 p-3">
                        <i className="ri-map-pin-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/11, 2A</h3>
                            <p className="text-sm text-gray-600 -mt-1">nayapaara utai</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-3">
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className="text-lg font-medium">₹193.20</h3>
                            <p className="text-sm text-gray-600 -mt-1">Cash Cash</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WaitingForDriver;