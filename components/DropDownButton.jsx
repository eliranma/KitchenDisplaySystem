"use client";
import React, { useState } from "react";

const DropdownButton = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" text-white px-4 py-2 rounded"
      >
        <svg
          class="h-6 w-6 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-1 mt-1 w-56 rounded-md shadow-lg bg-white">
          <div className="rounded-md bg-slate-700 p-1 shadow-xs">
            <div className="py-1 flex flex-col items-end justify-evenly">
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
