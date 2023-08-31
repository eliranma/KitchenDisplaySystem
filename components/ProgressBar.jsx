"use client"
import React from "react";

const ProgressBar = ({ progress, height }) => {
  return (
    <div className=" py-10 px-5" style={{ height: height }}>
        {/* text */}
        <div className="flex flex-col mb-2 px-14 items-center justify-between">
          <div className="flex justify-center items-center w-5/6">
            <span className="text-md font-semibold inline-block py-1 px-5 uppercase rounded-full text-teal-600 bg-teal-200">
             .... טוען הזמנות
            </span>
          </div>
          {/* ProgressBar */}
          <div className="overflow-hidden w-full h-2 my-4 text-xs flex rounded bg-teal-200">
        <div 
          style={{ width: `${progress.toFixed(0)}%` }} 
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500 transition-all duration-500 ease-in-out"
        />
      </div>
          {/* Percents */}
          <div className="text-right">
            <span className="text-md font-semibold inline-block text-teal-600">
              {progress.toFixed(0)}%
            </span>
          </div>
        </div>
    
    </div>
  );
};

export default ProgressBar;



