import React, { useState, useEffect, useRef } from "react";
import CheckSquare from "../../../../assets/CheckSquare.svg";
import Subtract from "../../../../assets/Subtract.svg";

const TappableArea = ({
  onRemove,
  content,
  position,
  setPosition,
  imageBounds,
  initialSize = { width: 100, height: 100 },
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(initialSize);
  const tappableRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        let newX = e.clientX - dragOffset.x;
        let newY = e.clientY - dragOffset.y;

        newX = Math.max(
          imageBounds.left,
          Math.min(
            newX,
            imageBounds.left +
              imageBounds.width -
              tappableRef.current.offsetWidth
          )
        );
        newY = Math.max(
          imageBounds.top,
          Math.min(
            newY,
            imageBounds.top +
              imageBounds.height -
              tappableRef.current.offsetHeight
          )
        );

        setPosition({ x: newX, y: newY });
      } else if (isResizing) {
        const newWidth = Math.max(
          50,
          e.clientX - tappableRef.current.getBoundingClientRect().left
        );
        const newHeight = Math.max(
          50,
          e.clientY - tappableRef.current.getBoundingClientRect().top
        );

        // Ensure the tappable area stays within the image bounds during resizing
        const maxWidth = imageBounds.width - (position.x - imageBounds.left);
        const maxHeight = imageBounds.height - (position.y - imageBounds.top);
        setSize({
          width: Math.min(newWidth, maxWidth),
          height: Math.min(newHeight, maxHeight),
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, imageBounds, setPosition]);

  const handleMouseDown = (e) => {
    const rect = tappableRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
  };

  const handleResizeMouseDown = (e) => {
    e.stopPropagation();
    setIsResizing(true);
  };

  const handleSubtractClick = (e) => {
    e.stopPropagation();
    if (typeof onRemove === "function") {
      onRemove();
    } else {
      console.error("onRemove is not a function");
    }
  };

  const handleCheckSquareClick = (e) => {
    e.stopPropagation();
    const rect = tappableRef.current.getBoundingClientRect();
    const currentX = rect.left;
    const currentY = rect.top;

    console.log("Current position:", { x: currentX, y: currentY });
  };

  return (
    <div
      ref={tappableRef}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        cursor: isDragging || isResizing ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className="relative rounded-[28px] border-4 border-sky-500 border-dashed flex items-center justify-center"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {content &&
          (typeof content === "string" && content.startsWith("data:image") ? (
            <img
              src={content}
              alt="Uploaded"
              className="max-w-full max-h-full object-contain"
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <span
              className="text-9xl"
              style={{
                fontSize: `${Math.min(size.width / 1.2, size.height / 1.2)}px`,
              }}
            >
              {content}
            </span>
          ))}
        <div
          className="absolute bottom-0 right-0 bg-white p-1 cursor-se-resize select-none"
          onMouseDown={handleResizeMouseDown}
        >
          ↘
        </div>
      </div>
      <div
        className="absolute bg-sky-500 rounded-[13.68px] flex items-center justify-center"
        style={{
          width: `${Math.min(size.width * 0.6, 157)}px`, // Adjust as needed
          height: `${Math.min(size.height * 0.3, 52)}px`, // Adjust as needed
          left: "50%",
          transform: `translateX(-50%)`,
        }}
      >
        <div
          className="flex justify-between items-center w-full h-full"
          style={{ padding: `${Math.min(size.width * 0.04, 8)}px` }} // Adjust padding as needed
        >
          <div
            className="flex justify-center items-center"
            onClick={handleCheckSquareClick}
            style={{ cursor: "pointer" }}
          >
            <div
              style={{
                width: `${Math.min(
                  size.width * 0.2,
                  size.height * 0.6,
                  43.79
                )}px`, // Adjust width to stay within bounds
                height: `${Math.min(
                  size.width * 0.2,
                  size.height * 0.6,
                  43.79
                )}px`, // Adjust height to stay within bounds
              }}
            >
              <img
                src={CheckSquare}
                alt="CheckSquare"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
          <div
            style={{
              width: "3px",
              height: "100%",
              backgroundColor: "white",
            }}
          ></div>
          <div
            className="flex justify-center items-center"
            onClick={handleSubtractClick}
            style={{ cursor: "pointer" }}
          >
            <div
              style={{
                width: `${Math.min(
                  size.width * 0.2,
                  size.height * 0.6,
                  43.79
                )}px`, // Adjust width to stay within bounds
                height: `${Math.min(
                  size.width * 0.2,
                  size.height * 0.6,
                  40.79
                )}px`, // Adjust height to stay within bounds
              }}
            >
              <img
                src={Subtract}
                alt="Subtract"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TappableArea;

// import React, { useState, useEffect, useRef } from "react";
// import CheckSquare from "../../../../assets/CheckSquare.svg";
// import Subtract from "../../../../assets/Subtract.svg";

// const TappableArea = () => {
//   return (
//     <div>
//       <div
//         className="relative bg-black bg-opacity-25 rounded-[28px] border-4 border-sky-500 border-dashed flex items-center justify-center"
//         style={{
//           width: "100%",
//           height: "100%",
//         }}
//       >
//         <img
//           src={content}
//           alt="Uploaded"
//           className="max-w-full max-h-full object-contain"
//           style={{ width: "100%", height: "100%" }}
//         />
//         <span
//           className="text-9xl"
//           style={{
//             fontSize: `${Math.min(size.width / 1.2, size.height / 1.2)}px`,
//           }}
//         ></span>
//         <div className="absolute bottom-0 right-0 bg-white p-1 cursor-se-resize">
//           ↘
//         </div>
//       </div>
//       <div
//         className="w-[157px] h-[52px] relative bg-sky-500 rounded-[13.68px] ml-[80px]"
//         style={{
//           transform: `translateX(-50%)`,
//         }}
//       >
//         <div className="p-2.5 left-[8px] top-[-5.89px] absolute justify-start items-start gap-2.5 inline-flex">
//           <div
//             className="w-[43.79px] h-[43.79px] justify-center items-center flex"
//             style={{ cursor: "pointer" }}
//           >
//             <div className="w-[43.79px] h-[43.79px] relative">
//               <img src={CheckSquare} alt="CheckSquare" />
//             </div>
//           </div>
//         </div>
//         <div
//           className="px-3.5 py-2.5 left-[93px] top-[1px] absolute justify-start items-start gap-2.5 inline-flex"
//           style={{ cursor: "pointer" }}
//         >
//           <div className="w-[43.79px] h-[43.79px] justify-center items-center flex">
//             <div className="w-[43.79px] h-[43.79px] relative">
//               <img src={Subtract} alt="Subtract" />
//             </div>
//           </div>
//         </div>
//         <div className="w-[52px] h-[0px] left-[80.21px] top-0 absolute origin-top-left rotate-90 border border-white"></div>
//       </div>
//     </div>
//   );
// };

// export default TappableArea;
