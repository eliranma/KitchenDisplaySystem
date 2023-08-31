"use client"
import React, {useState} from "react";
import isMobile from "is-mobile";
import LongText from "./LongText";
import Image from "next/image";
import {SERVING} from '../utils/enums'

const CardHeader = ({
  queueId,
  docPayTypeName,
  total,
  tblNo,
  tmOpen,
  servingId,
}) => {
    // const [isOpen, setIsOpen] = useState(false)
    // const handleHeader = ()=>{
    //     console.log("clicked");
    //     setIsOpen(prev=>!prev)
    // }
  return (
    <div className="bg-white z-50 shadow-md flex flex-col items-start rounded-lg p-2 ">
    {/* <button> */}
    {/* <button onClick={()=>handleHeader()}> */}
      <div className=' flex flex-row items-center '>
      <h2 className="text-xs md:text-md md:text-lg font-semibold">{tblNo>0?`שולחן  ${tblNo}`:`הזמנה : ${queueId}`}</h2>
      <Image className="mx-3" src={SERVING[servingId].node} alt={SERVING[servingId].name} width={24} height={24} />
      </div>
      <p className="p-0 text-xs md:text-md md:text-lg font-semibold ">מועד הזמנה : {new Date(tmOpen).toLocaleString('he-IL').replace(',',"")}</p>
      <div className="border-t border-gray-200"></div>
    {/* </button> */}
      {/* {isOpen&&<div className="grid grid-cols-2 gap-1">
        <div dir="rtl" className="flex flex-col">
        <p className="text-sm font-semibold mx-1">{servingName||"לשבת"}</p>
          <p className="text-sm text-gray-500 text-right mx-1">מספר פריטים :  </p>
          <p className="text-sm font-semibold">{productCount}</p>
        </div>
      </div>} */}
    </div>
  );
};

export default CardHeader;
