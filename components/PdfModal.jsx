import React from 'react';
import { pdfjs, Document, Page } from 'react-pdf';

const PdfModal = ({ onClose, file }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed flex inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
      <div className="relative h-auto w-full max-w-lg mx-auto p-4 bg-white rounded-lg shadow-xl">
        {/* MODAL CONTENT */}
        <div className='flex items-center justify-center max-h-[40vh] '>
        <div className=' flex py-5 overflow-y-auto'>
        <Document  file={file}
        className="flex items-center justify-center mx-1" >
          <Page  pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
        </Document>
        </div>
        </div>
        <div className="bg-gray-50 flex justify-center items-center px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="inline-flex w-full items-center justify-center rounded-full bg-red-600 px-12 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            onClick={onClose}
          >
          <p className='text-center'>

            סגור
          </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfModal;
