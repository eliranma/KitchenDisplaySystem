import Image from "next/image";
import React, { useMemo } from "react";
import { pdfjs, Document, Page } from "react-pdf";

const PdfModal = ({ onClose, file }) => {
  const renderBon = useMemo(() => {
    // For Html
    // const byteArray = new Uint8Array(file.data);
    // const decoder = new TextDecoder("utf-8");
    // const htmlString = decoder.decode(byteArray);
    // console.log(htmlString);
    return (
      //  For Pdf

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
      
      // For Receiving Html elements

      // <div style={{}} dangerouslySetInnerHTML={{ __html: htmlString }} />
      <Image src={`data:image/jpeg;base64, ${Buffer.from(file.data).toString('base64')}`} width={window.innerWidth*0.7} height={50} alt="bon" />
    );
  }, [file.data]);
  // TODO: Enlarge the modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed flex inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={onClose}
      ></div>
      <div className="relative h-auto w-full max-w-[50vw] mx-auto p-4  bg-white rounded-lg shadow-xl">
        {/* MODAL CONTENT */}
        <div className="flex flex-wrap overflow-y-auto items-center justify-center  max-h-[65vh] ">
          <div className=" flex justify-center items-center w-full py-5 ">
            {/* <Document  file={file}
        className="flex items-start" >
          <Page width={window.innerWidth*0.65}  pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
        </Document> */}
            {renderBon}
          </div>
        </div>
        <div className="bg-gray-50 flex justify-center items-center px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="inline-flex w-full items-center justify-center rounded-full bg-red-600 px-12 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            onClick={onClose}
          >
            <p className="text-center">סגור</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfModal;
