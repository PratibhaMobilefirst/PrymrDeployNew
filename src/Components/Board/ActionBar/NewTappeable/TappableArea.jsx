// import React, { useState, useEffect, useRef } from "react";
// import CheckSquare from "../../../../assets/CheckSquare.svg";
// import Subtract from "../../../../assets/Subtract.svg";

// const TappableArea = ({
//   id,
//   onRemove,
//   onFixContent,
//   content,
//   position,
//   setPosition,
//   imageBounds,
//   initialSize = { width: 100, height: 100 },
//   onCheckSquareClick,
//   onCircleClick,
//   setSize,
// }) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const [isResizing, setIsResizing] = useState(false);
//   const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
//   const [size, setSizeState] = useState(initialSize);
//   const [showBorders, setShowBorders] = useState(true);
//   const [isMinimized, setIsMinimized] = useState(false);
//   const tappableRef = useRef(null);

//   useEffect(() => {
//     const handleMove = (e) => {
//       const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//       const clientY = e.touches ? e.touches[0].clientY : e.clientY;

//       if (isDragging) {
//         let newX = clientX - dragOffset.x;
//         let newY = clientY - dragOffset.y;

//         newX = Math.max(
//           imageBounds.left,
//           Math.min(
//             newX,
//             imageBounds.left + imageBounds.width - tappableRef.current.offsetWidth
//           )
//         );
//         newY = Math.max(
//           imageBounds.top,
//           Math.min(
//             newY,
//             imageBounds.top + imageBounds.height - tappableRef.current.offsetHeight
//           )
//         );

//         setPosition({ x: newX, y: newY });
//       } else if (isResizing) {
//         const newWidth = Math.max(50, clientX - tappableRef.current.getBoundingClientRect().left);
//         const newHeight = Math.max(50, clientY - tappableRef.current.getBoundingClientRect().top);

//         // Ensure the tappable area stays within the image bounds during resizing
//         const maxWidth = imageBounds.width - (position.x - imageBounds.left);
//         const maxHeight = imageBounds.height - (position.y - imageBounds.top);
//         setSizeState({
//           width: Math.min(newWidth, maxWidth),
//           height: Math.min(newHeight, maxHeight),
//         });
//         setSize({
//           width: Math.min(newWidth, maxWidth),
//           height: Math.min(newHeight, maxHeight),
//         });
//       }
//     };

//     const handleUp = () => {
//       setIsDragging(false);
//       setIsResizing(false);
//     };

//     if (isDragging || isResizing) {
//       window.addEventListener("mousemove", handleMove);
//       window.addEventListener("mouseup", handleUp);
//       window.addEventListener("touchmove", handleMove);
//       window.addEventListener("touchend", handleUp);
//     }

//     return () => {
//       window.removeEventListener("mousemove", handleMove);
//       window.removeEventListener("mouseup", handleUp);
//       window.removeEventListener("touchmove", handleMove);
//       window.removeEventListener("touchend", handleUp);
//     };
//   }, [isDragging, isResizing, dragOffset, imageBounds, setPosition, setSize]);

//   const handleMouseDown = (e) => {
//     const rect = tappableRef.current.getBoundingClientRect();
//     const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//     const clientY = e.touches ? e.touches[0].clientY : e.clientY;
//     setDragOffset({
//       x: clientX - rect.left,
//       y: clientY - rect.top,
//     });
//     setIsDragging(true);
//   };

//   const handleResizeMouseDown = (e) => {
//     e.stopPropagation();
//     setIsResizing(true);
//   };

//   const handleSubtractClick = (e) => {
//     e.stopPropagation();
//     onRemove();
//   };

//   const handleCheckSquareClick = (e) => {
//     e.stopPropagation();
//     if (content) {
//       setIsMinimized(true);
//       setShowBorders(false);
//       setSizeState({ width: 50, height: 50 });
//     } else {
//       onCheckSquareClick(id, content, position, size);
//     }
//   };

//   const handleBlueDotClick = (e) => {
//     e.stopPropagation();
//     if (isMinimized) {
//       setIsMinimized(false);
//       setShowBorders(true);
//       setSizeState(initialSize);
//       onCircleClick(id); // Trigger opening corresponding layer when blue dot is clicked
//     } else {
//       setShowBorders((prev) => !prev);
//     }
//   };

//   return (
//     <div
//       ref={tappableRef}
//       style={{
//         position: "absolute",
//         left: `${position.x}px`,
//         top: `${position.y}px`,
//         width: `${size.width}px`,
//         height: `${size.height}px`,
//         cursor: isDragging || isResizing ? "grabbing" : "grab",
//       }}
//       onMouseDown={handleMouseDown}
//       onTouchStart={handleMouseDown}
//     >
//       <div
//         className={`relative rounded-[28px] ${
//           showBorders ? "border-4 border-sky-500 border-dashed" : ""
//         } flex items-center justify-center`}
//         style={{
//           width: "100%",
//           height: "100%",
//         }}
//       >
//         {content &&
//           (typeof content === "string" && content.startsWith("data:image") ? (
//             <img
//               src={content}
//               alt="Uploaded"
//               className="max-w-full max-h-full object-contain"
//               style={{ width: "100%", height: "100%" }}
//             />
//           ) : (
//             <span
//               className="text-9xl"
//               style={{
//                 fontSize: `${Math.min(size.width / 1.2, size.height / 1.2)}px`,
//               }}
//             >
//               {content}
//             </span>
//           ))}
//         {showBorders && !isMinimized && (
//           <div
//             className="absolute bottom-0 right-0 bg-white p-1 cursor-se-resize select-none"
//             onMouseDown={handleResizeMouseDown}
//             onTouchStart={handleResizeMouseDown}
//           >
//             ↘
//           </div>
//         )}
//       </div>
//       {showBorders && !isMinimized && (
//         <div
//           className="absolute bg-sky-500 rounded-[13.68px] flex items-center justify-center"
//           style={{
//             width: "100px",
//             height: "40px",
//             left: "50%",
//             transform: `translateX(-50%)`,
//           }}
//         >
//           <div className="flex justify-center items-center w-full h-full">
//             <div
//               className="flex justify-center items-center"
//               onClick={handleCheckSquareClick}
//               style={{ cursor: "pointer" }}
//             >
//               <div
//                 style={{
//                   width: "30px",
//                   height: "50px",
//                 }}
//               >
//                 <img
//                   src={CheckSquare}
//                   alt="CheckSquare"
//                   style={{ width: "100%", height: "100%" }}
//                 />
//               </div>
//             </div>
//             <div
//               style={{
//                 width: "3px",
//                 height: "100%",
//                 backgroundColor: "white",
//                 marginLeft: "10px",
//                 marginRight: "10px",
//               }}
//             ></div>
//             <div
//               className="flex justify-center items-center"
//               onClick={handleSubtractClick}
//               style={{ cursor: "pointer" }}
//             >
//               <div
//                 style={{
//                   width: "25px",
//                   height: "30px",
//                 }}
//               >
//                 <img
//                   src={Subtract}
//                   alt="Subtract"
//                   style={{ width: "100%", height: "100%" }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {isMinimized && (
//         <div
//           style={{
//             position: "absolute",
//             left: "50%",
//             top: "50%",
//             width: "20px",
//             height: "20px",
//             backgroundColor: "blue",
//             borderRadius: "50%",
//             cursor: "pointer",
//             transform: "translate(-50%, -50%)",
//             zIndex: 10, // Ensure the blue dot is always on top
//           }}
//           onClick={handleBlueDotClick}
//         ></div>
//       )}
//     </div>
//   );
// };

// export default TappableArea;


import React, { useState, useEffect, useRef } from "react";
import CheckSquare from "../../../../assets/CheckSquare.svg";
import Subtract from "../../../../assets/Subtract.svg";

const TappableArea = ({
  id,
  onRemove,
  onFixContent,
  content,
  position,
  setPosition,
  imageBounds,
  initialSize = { width: 100, height: 100 },
  onCheckSquareClick,
  setSize,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [size, setSizeState] = useState(initialSize);
  const tappableRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        let newX = clientX - dragOffset.x;
        let newY = clientY - dragOffset.y;

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
          clientX - tappableRef.current.getBoundingClientRect().left
        );
        const newHeight = Math.max(
          50,
          clientY - tappableRef.current.getBoundingClientRect().top
        );

        // Ensure the tappable area stays within the image bounds during resizing
        const maxWidth = imageBounds.width - (position.x - imageBounds.left);
        const maxHeight = imageBounds.height - (position.y - imageBounds.top);
        setSizeState({
          width: Math.min(newWidth, maxWidth),
          height: Math.min(newHeight, maxHeight),
        });
        setSize({
          width: Math.min(newWidth, maxWidth),
          height: Math.min(newHeight, maxHeight),
        });
      }
    };

    const handleUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleUp);
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("touchend", handleUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, [isDragging, isResizing, dragOffset, imageBounds, setPosition, setSize]);

  const handleMouseDown = (e) => {
    const rect = tappableRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragOffset({
      x: clientX - rect.left,
      y: clientY - rect.top,
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
    if (typeof onCheckSquareClick === "function") {
      onCheckSquareClick(id, content, position, size);
    }
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
      onTouchStart={handleMouseDown}
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
          onTouchStart={handleResizeMouseDown}
        >
          ↘
        </div>
      </div>
      <div
        className="absolute bg-sky-500 rounded-[13.68px] flex items-center justify-center"
        style={{
          width: "100px",
          height: "40px",
          left: "50%",
          transform: `translateX(-50%)`,
        }}
      >
        <div className="flex justify-center items-center w-full h-full">
          <div
            className="flex justify-center items-center"
            onClick={handleCheckSquareClick}
            style={{ cursor: "pointer" }}
          >
            <div
              style={{
                width: "30px",
                height: "50px",
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
              marginLeft: "10px",
              marginRight: "10px",
            }}
          ></div>
          <div
            className="flex justify-center items-center"
            onClick={handleSubtractClick}
            style={{ cursor: "pointer" }}
          >
            <div
              style={{
                width: "25px",
                height: "30px",
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