import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-primary border-gray-300 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
