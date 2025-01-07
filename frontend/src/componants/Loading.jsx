import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex items-center gap-2 text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
