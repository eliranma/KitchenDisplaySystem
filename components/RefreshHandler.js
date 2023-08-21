import React, {useState, useEffect} from "react";
import ServerSideAPI from "../utils/api";

const RefreshHandler = ({ timeInterval = 10 }) => {
  const [autoRefresh, setAutoRefresh] = useState(false)
  let refreshTimeout = null
  let interval = 1000*parseInt(timeInterval)

  useEffect(() => {
    if (autoRefresh===true){
      refreshTimeout = setInterval(() => {
        console.log("10 sec refresh!")
      }, interval)
    }
    else if (autoRefresh===false) clearInterval(refreshTimeout)
    return () => {
      clearInterval(refreshTimeout)
    }
  }, [autoRefresh])
  
  return (
    <div className="w-max flex items-center justify-center mx-1 rounded-full bg-lime-200 px-1">
      <label className="relative  inline-flex items-center justify-center cursor-pointer">
        <input value={autoRefresh} type="checkbox" className="sr-only peer"  onClick={()=>setAutoRefresh(prev=>!prev)}/>
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#a70035]"></div>
        <p className="whitespace-nowrap overflow-hidden  overflow-ellipsis mx-1">רענון אוטומטי (10 ש&apos;)</p>
      </label>
    </div>
  );
};

export default RefreshHandler;
