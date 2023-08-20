"use client"
import React, {useState} from "react";
import isMobile from "is-mobile";

const CardHeader = ({
  dealId,
  docPayTypeName,
  total,
  tax,
  productCount,
  servingName,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const handleHeader = ()=>{
        console.log("clicked");
        setIsOpen(prev=>!prev)
    }
  return (
    <div className="bg-white z-50 shadow-md rounded-lg p-6 space-y-3">
    <button onClick={()=>handleHeader()}>

      <h2 className="text-xs md:text-md md:text-lg font-semibold">הזמנה: {dealId}</h2>
      <div className="border-t border-gray-200"></div>
    </button>
      {isOpen&&<div className="grid grid-cols-2 gap-1">
        <div dir="rtl" className="flex flex-row items-center ">
        <p className="text-sm text-gray-500">אמצעי תשלום</p>
          <p className="text-sm font-semibold">{docPayTypeName}</p>
          <p className="text-sm mx-1 text-gray-500"> סה״כ </p>
          <p className="text-sm font-semibold"> {total||0} ש״ח </p>
        </div>
        <div dir="rtl" className="flex flex-col">
        <p className="text-sm font-semibold mx-1">{servingName||"לשבת"}</p>
          <p className="text-sm text-gray-500 text-right mx-1">מספר פריטים :  </p>
          <p className="text-sm font-semibold">{productCount}</p>
        </div>
      </div>}
    </div>
  );
};

export default CardHeader;
