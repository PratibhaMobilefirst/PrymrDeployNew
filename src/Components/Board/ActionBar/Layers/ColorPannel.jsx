import React from "react";

const ColorPanel = ({ onSelectColor, onClose }) => {
  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#000000",
    "#4B4B4B",
  ];

  return (
    <div className="relative z-10 bg-[#4B4B4B] rounded shadow-md flex items-center ">
      <div className="flex space-x-2">
        {colors.map((color) => (
          <div
            key={color}
            onClick={() => onSelectColor(color)}
            className="w-5 h-5 rounded-full cursor-pointer"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <button
        onClick={() => {
          console.log("Close button clicked");
          if (typeof onClose === "function") {
            onClose();
          } else {
            console.error("onClose is not a function");
          }
        }}
        className="p-1 text-white hover:text-gray-300"
      >
        X
      </button>
    </div>
  );
};

export default ColorPanel;
