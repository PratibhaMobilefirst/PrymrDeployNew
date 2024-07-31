import React, { useState, useEffect } from "react";

const FullImageWithTappables = ({
  imageUrl,
  tappableAreas,
  closeFullImage,
}) => {
  const [adjustedTappableAreas, setAdjustedTappableAreas] = useState([]);

  useEffect(() => {
    const adjustedCoordinates = tappableAreas.map((area) => {
      // Adjust coordinates as per your requirements
      return {
        ...area,
        left: area.position.x,
        top: area.position.y,
        width: area.size.width,
        height: area.size.height,
      };
    });

    setAdjustedTappableAreas(adjustedCoordinates);
  }, [tappableAreas]);

  return (
    <div className="fixed inset-0 bg-gray-900 sm:bg-opacity-75 lg:bg-opacity-0 flex sm:justify-center lg:justify-end items-center z-50">
      <div className="relative w-full h-full lg:w-[70%] lg:h-[90vh] lg:ml-auto lg:mr-0 lg:top-0 lg:right-0 flex lg:justify-end items-center">
        <img
          src={imageUrl}
          alt="Full size"
          className="w-full h-full object-contain lg:h-auto lg:w-[90vw]"
        />
        {adjustedTappableAreas.map((area) => (
          <div
            key={area.id}
            style={{
              position: "absolute",
              left: `${area.left}px`,
              top: `${area.top}px`,
              width: "20px",
              height: "20px",
              backgroundColor: "blue",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            onClick={() => alert(`Tapped on area: ${area.id}`)}
          ></div>
        ))}
        <button
          className="absolute top-2 right-2 p-2 w-10 bg-red-500 text-white"
          onClick={closeFullImage}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default FullImageWithTappables;
