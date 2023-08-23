"use client";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import CardHeader from "./CardHeader";
import NoData from "./NoData";
import { pdfjs, Document, Page, View } from "react-pdf";
// import isMobile from 'is-mobile';
import PdfModal from "./PdfModal";
import isMobile from "is-mobile";

const Card = ({ bon }) => {
  // const bonState = useBonContext()
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  // console.log(bon.file);
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
  return (
    <>
      <div
        dir="rtl"
        className="flex flex-col p-4 h-fit relative"
      >
        <CardHeader dealId={dealId} />
        <div className="flex border rounded-lg p-2 my-1">
          <div
            className="w-full  flex flex-wrap justify-center items-center mt-2 overflow-y-auto h-44 bg-violet-50" //IMPORTANT!!! this wraps all th pdf inside a predefined height component
            onClick={handleClick}
          >
            <Document
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
            </Document>
          </div>
        </div>
        <button className="rounded-full mx-3 absolute bottom-1.5 mt-1 left-1/2 transform -translate-x-1/2 px-12 py-1 w-auto text-white bg-[#e4004a]">
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

// import { useState } from 'react';
// import { Document, Page } from 'react-pdf';

// function MyApp() {

//   return (
//     <div>

//       <p>
//         Page {pageNumber} of {numPages}
//       </p>
//     </div>
//   );
// }
