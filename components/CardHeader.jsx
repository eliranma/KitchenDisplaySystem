"use client"
import React from "react";
import Image from "next/image";
import {SERVING} from '../utils/enums'

const CardHeader = ({
  id,
  queueId,
  docPayTypeName,
  total,
  tblNo,
  tmOpen,
  servingId,
}) => {

  return (
    <div className="bg-white z-50 shadow-md flex flex-col items-start rounded-lg p-2 ">
      <div className=' flex flex-row items-center '>
      <h2 className="text-xs md:text-md md:text-lg font-semibold">{tblNo>0?`שולחן  ${tblNo}`:`הזמנה : ${queueId}`}</h2>
      <Image className="mx-3" src={SERVING[servingId].node} alt={SERVING[servingId].name} width={24} height={24} />
      {process.env.NODE_ENV==='development'&&<p>DEBUG {id} </p>}
      {/* {process.env.NODE_ENV==='development'&&<p>DEBUG x:{x} y:{y} w:{w} h:{h}</p>} */}
      </div>
      <p className="p-0 text-xs md:text-md md:text-lg font-semibold ">מועד הזמנה : {new Date(tmOpen).toLocaleString('he-IL').replace(',',"")}</p>
      <div className="border-t border-gray-200"></div>

    </div>
  );
};

export default CardHeader;
