import React, {useState} from "react";

const LayoutButton = ({ action }) => {
    const [button, setButton] = useState(true)
  const handleLayoutStatic = () => {
    setButton(prev=>!prev)
    action((prev) => !prev);
    // console.log(layoutRef)
  };
  return (
    <div className="flex justify-center w-max py-1 mr-1">
      {button?<button
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
