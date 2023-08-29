"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAppContext } from "@/context/AppContext";
import CardHeader from "./CardHeader";
import ServerSideAPI from "../utils/api";
import NoData from "./NoData";
import { pdfjs, Document, Page, View } from "react-pdf";
// import isMobile from 'is-mobile';
import PdfModal from "./PdfModal";
import Image from "next/image";
// import isMobile from "is-mobile";

const Card = ({ id, bon }) => {
  const cardRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [bonHeight, setBonHeight] = useState(20);
  const { data, setData } = useAppContext();
  // console.log(bon.file);
  const updateOrderReq = async () => {
    if (bon._id && data.session) {
      try {
        let res = await ServerSideAPI.updateOrderStatus(bon._id, data.session);
        if (res === true) {
          let tmp = data.orders;
          tmp.splice(id, 1);
          setData((prev) => ({ ...prev, orders: tmp }));
          // console.log(data.orders);
          // prints the right status res.data.length -1 but thr data.order become only with this item
          return;
        }
        // console.log(res);
      } catch (err) {
        console.log(err);
      }
    } else {
      // console.log(bon);
    }
  };
  // const onDocumentLoadSuccess = ({ numPages }) => {
  //   setNumPages(numPages);
  // };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleClick = () => {
    console.log("CLIECKED");
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
    productCount,
    servingName,
    prnName,
    items,
    file,
  } = bon;
  // console.log(file);
  // const file = pdfFile&&pdfFile!=''?require(pdfFile):null
  // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  //   "pdfjs-dist/build/pdf.worker.min.js",
  //   import.meta.url
  // ).toString();
  useEffect(() => {
    // console.log(`card height:${cardRef.current.offsetHeight}`);
    setBonHeight(cardRef.current.offsetHeight *0.45);
  }, [cardRef?.current?.offsetHeight]);

  const renderedPDF = useMemo(() => {
    //   const byteArray = new Uint8Array(file.data);
    //   const decoder = new TextDecoder('utf-8');
    // const htmlString = decoder.decode(byteArray);
    // console.log(file);
    return (
      // <Document
      //   className="flex items-start justify-center mx-1"
      //   file={{ data: file.data }}
      //   onLoadSuccess={onDocumentLoadSuccess}
      //   noData={NoData}
      // >
      //   <Page
      //     // width={pdfWidth}
      //     renderTextLayer={false}
      //     renderAnnotationLayer={false}
      //     pageNumber={pageNumber}
      //   />
      // </Document>
      // <div dangerouslySetInnerHTML={{__html:htmlString}} />
      <Image
        alt="BON"
        src={`data:image/jpeg;base64, ${Buffer.from(file.data).toString(
          "base64"
        )}`}
        width={window.innerWidth}
        height={20}
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
        <CardHeader tblNo={tblNo} servingName={servingName} queueId={queueId} />
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
          className="rounded-full mx-3 absolute bottom-1.5 mt-1 left-1/2 transform -translate-x-1/2 px-12 py-1 w-auto text-white bg-[#e4004a]"
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
