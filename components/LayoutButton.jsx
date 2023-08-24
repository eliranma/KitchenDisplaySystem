import React, {useState} from "react";
import { useLayoutContext } from "@/context/LayoutContext";

const LayoutButton = () => {
    const {layoutDraggable, setLayoutDraggable} = useLayoutContext()
  const handleLayoutStatic = () => {
    setLayoutDraggable(prev=>!prev)
    // console.log(layoutRef)
  };
  return (
    <div className="flex justify-center w-max py-1 mr-1">
      {!layoutDraggable?<button
        className="flex items-center rounded-full px-5 bg-emerald-400"
        onClick={() => handleLayoutStatic()}
      >
        <p className="whitespace-nowrap overflow-hidden text-white overflow-ellipsis">שנה מיקום</p>
      </button>
      :      <button
        className="flex items-center rounded-full px-5 bg-[#a70035]"
        onClick={() => handleLayoutStatic()}
      >
        <p className="whitespace-nowrap overflow-hidden text-white overflow-ellipsis">שמור מיקום</p>
      </button>}
    </div>
  );
};

export default LayoutButton;
