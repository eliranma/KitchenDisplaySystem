"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAppContext } from "@/context/AppContext";
import CardHeader from "./CardHeader";
import ServerSideAPI from "../utils/api";
import PdfModal from "./PdfModal";
import Image from "next/image";
import Swal from "sweetalert2";


const Card = ({ id, bon }) => {
  const cardRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [bonHeight, setBonHeight] = useState(20);
  const { data, setData } = useAppContext();
  const updateOrderReq = async () => {
    if (bon._id && data.session) {
      try {
        setData(prev=>({...prev, autoRefresh:false}))
        let res = await ServerSideAPI.updateOrderStatus(bon._id, data.session);
        if (res === true) {
          let tmp = [...data.orders];
          tmp.splice(id, 1);
          setData((prev) => ({ ...prev, orders: tmp, autoRefresh:true }));
          return;
        }
      } catch (err) {
        Swal.fire({
          title:""
        })
        console.log(err);
      }
    } 
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };
  
  const handleDone = () => {
    let session = data.session;
    let res = updateOrderReq(bon._id, session);
    return res;
  };
  const {
    queueId,
    docPayTypeName,
    total,
    tblNo,
    tmOpen,
    servingId,
    prnName,
    items,
    file,
  } = bon;

  useEffect(() => {
    setBonHeight(cardRef.current.offsetHeight -150);
  }, [cardRef?.current?.offsetHeight]);

  const renderedPDF = useMemo(() => {
    return (
      <Image
        alt="BON"
        src={`data:image/jpeg;base64, ${Buffer.from(file.data).toString(
          "base64"
        )}`}
        width={window.innerWidth}
        height={20}
        // placeholder="empty"
        // blurDataURL='data:image/jpeg;base64,LEHV6nWB2yk8pyo0adR*.7kCMdnj'
      />
    );
  }, [file]);

  return (
    <>
      <div
        dir="rtl"
        ref={cardRef}
        className="flex flex-col p-4 h-full  relative"
      >
        <CardHeader id={id} tmOpen={tmOpen} tblNo={tblNo} servingId={servingId} queueId={queueId} />
        <div className="flex border rounded-lg my-1">
          <div
          style={{height:bonHeight}}
            className="w-full  flex flex-wrap justify-center items-start mt-2 overflow-y-auto overflow-x-hidden bg-white" //IMPORTANT!!! this wraps all th pdf inside a predefined height component
            onClick={handleClick}
          >
            {renderedPDF}
          </div>
        </div>
        <button
          onClick={handleDone}
          className="rounded-full mx-auto absolute bottom-1.5 mt-1 left-1/2 transform -translate-x-1/2 px-12 py-1 w-auto text-white bg-[#e4004a]"
        >
          בוצע
        </button>
      </div>
      {isOpen &&
        createPortal(
          <PdfModal file={file} onClose={handleClose} />,
          window.document.body
        )}
    </>
  );
};

export default Card;
