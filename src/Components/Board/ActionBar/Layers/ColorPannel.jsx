import React from "react";

const ColorPanel = ({ onSelectColor }) => {
  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#000000",
    ,
    "#3B2B3B",
  ];

  return (
    <div className="flex absolute z-10 -left-11 top-[1px] h-8 bg-[#4B4B4B]  rounded  shadow-md">
      {colors.map((color) => (
        <div
          key={color}
          onClick={() => onSelectColor(color)}
          className="w-5 h-5 rounded-full m-1 cursor-pointer"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default ColorPanel;
