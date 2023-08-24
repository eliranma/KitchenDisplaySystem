"use client";
import React, { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { useAppContext } from "@/context/AppContext";
import CardHeader from "./CardHeader";
import ServerSideAPI from '../utils/api'
import NoData from "./NoData";
import { pdfjs, Document, Page, View } from "react-pdf";
// import isMobile from 'is-mobile';
import PdfModal from "./PdfModal";
import isMobile from "is-mobile";

const Card = ({id, bon }) => {
  // const bonState = useBonContext()
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const {data, setData} = useAppContext()
  // console.log(bon.file);
  const updateOrderReq = async()=>{
    if (bon._id && data.session){
      try{
        let res = await ServerSideAPI.updateOrderStatus(bon._id, data.session)
        if (res === true){
          let tmp =data.orders
          tmp.splice(id,1)
           setData(prev=>({...prev,orders:tmp}))
        console.log(data.orders);
        // prints the right status res.data.length -1 but thr data.order become only with this item
           return
        }
        console.log(res)
      }
      catch(err){
        console.log(err)
      }

    }else {
      console.log(bon)
    }
  }
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleClick = () => {
    console.log("CLIECKED");
    setIsOpen((prev) => !prev);
  };
  const handleDone = ()=>{
    let session = data.session
    let res = updateOrderReq(bon._id,session)
    return res;
  }
  const {
    dealId,
    docPayTypeName,
    total,
    tax,
    productCount,
    servingName,
    prnId,
    prnName,
    items,
    file,
  } = bon;
  console.log(file);
  // const file = pdfFile&&pdfFile!=''?require(pdfFile):null
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();

  const renderedPDF = useMemo(() => {
    return (
      <Document
        className="flex items-start justify-center mx-1"
        file={{ data: file.data }}
        onLoadSuccess={onDocumentLoadSuccess}
        noData={NoData}
      >
        <Page
          // width={pdfWidth}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          pageNumber={pageNumber}
        />
      </Document>
    );
  }, [file.data, pageNumber]);


  return (
    <>
      <div
        dir="rtl"
        className="flex flex-col p-4 h-fit relative"
      >
        <CardHeader dealId={dealId} />
        <div className="flex border rounded-lg my-1">
          <div
            className="w-full  flex flex-wrap justify-center items-start mt-2 overflow-y-auto overflow-x-hidden h-44 bg-violet-50" //IMPORTANT!!! this wraps all th pdf inside a predefined height component
            onClick={handleClick}
          >
            {/* <Document
              className="flex items-center justify-center mx-1"
              file={{ data: file.data }}
              onLoadSuccess={onDocumentLoadSuccess}
              noData={NoData}
            >
              <Page
                // scale={0.3}
                // width={
                //   150
                // }
                renderTextLayer={false}
                renderAnnotationLayer={false}
                pageNumber={pageNumber}
              />
            </Document> */}
            {renderedPDF}
          </div>
        </div>
        <button onClick={handleDone} className="rounded-full mx-3 absolute bottom-1.5 mt-1 left-1/2 transform -translate-x-1/2 px-12 py-1 w-auto text-white bg-[#e4004a]">
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
