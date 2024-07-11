import React from "react";

const ColorPanel = ({ onSelectColor }) => {
  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
  ];

  return (
    <div className="absolute z-10 mt-2 p-2 bg-white border rounded shadow-md">
      {colors.map((color) => (
        <div
          key={color}
          onClick={() => onSelectColor(color)}
          className="w-6 h-6 m-1 cursor-pointer"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default ColorPanel;

// import React, { useState } from "react";
// import { ChromePicker } from "react-color";

// const ColorPanel = ({ onSelectColor }) => {
//   const [displayColorPicker, setDisplayColorPicker] = useState(false);
//   const [currentColor, setCurrentColor] = useState("#FF0000");

//   const handleColorChange = (color) => {
//     setCurrentColor(color.hex);
//   };

//   const handleColorSelect = () => {
//     onSelectColor(currentColor);
//     setDisplayColorPicker(false); // Close the color picker after selecting
//   };

//   return (
//     <div className="absolute z-10 mt-2 p-2 bg-white border rounded shadow-md">
//       <div
//         className="w-6 h-6 m-1 cursor-pointer"
//         style={{ backgroundColor: currentColor }}
//         onClick={() => setDisplayColorPicker(!displayColorPicker)}
//       />

//       {displayColorPicker && (
//         <ChromePicker
//           color={currentColor}
//           onChange={handleColorChange}
//           onChangeComplete={handleColorSelect}
//         />
//       )}
//     </div>
//   );
// };

// export default ColorPanel;
