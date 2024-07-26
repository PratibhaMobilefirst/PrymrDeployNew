import React from "react";
import editToolNavbar from "../../assets/settings.png";
import { GrHomeRounded } from "react-icons/gr";
import { LuMessagesSquare } from "react-icons/lu";
import plus from "../../assets/plus.svg";
import smallavatar from "../../assets/smallAvatar.svg";
import cart from "../../assets/ShoppingCartpng.png";
import { useNavigate } from "react-router";
import search from "../../assets/search.svg";
import uparrow from "../../assets/uparrow.png";
import arrowspointingout from "../../assets/arrowspointingout.svg";
import arrowpointingIn from "../../assets/arrowpointingIn.svg";
import zoomOutMinus from "../../assets/zoomOutMinus.svg";
import zoomInPlus from "../../assets/zoomOutPlus.svg";
import poweredByPrymr from "../../assets/poweredByPrymr.svg";

const DesktopNavbar = () => {
  const navigate = useNavigate();
  const handleArrow = () => {
    navigate("/homePage");
  };
  return (
    <div className="fixed bottom-0  w-[68%] text-[#6B6B6B] flex h-18 items-center justify-between ">
      <div className="flex gap-3">
        <div className="flex ml-2 bg-[#262626] pr-2 rounded-full items-center relative">
          <img
            className="rounded-full w-8 h-8 cursor-pointer"
            src={smallavatar}
            alt="Profile"
          />{" "}
          <img src={uparrow} className="cursor-pointer" onClick={handleArrow} />
        </div>
        <div className="cursor-pointer">
          <img
            src={plus}
            className=" cursor-pointer border rounded-full border-blue-600 w-8 h-8"
          />
        </div>
        <div className="cursor-pointer">
          <img src={editToolNavbar} className=" cursor-pointer w-8 h-8" />
        </div>
        <div className="cursor-pointer">
          <img src={cart} className="cursor-pointer  w-8 h-8" />
        </div>
      </div>

      <div
        className="flex"
        style={{
          left: "20%",
          transform: `translateX(-20%)`,
        }}
      >
        <img src={arrowpointingIn} className="cursor-pointer w-10 h-10" />
        <img src={zoomOutMinus} className="p-2 w-10 h-10 cursor-pointer" />
        <h1 className="text-white mt-2 cursor-pointer">100%</h1>
        <img src={zoomInPlus} className="p-2 w-10 h-10 cursor-pointer" />
        <img src={arrowspointingout} className="p-2 w-10 h-10 cursor-pointer" />
      </div>

      <div>
        <img src={poweredByPrymr} />
      </div>
    </div>
  );
};

export default DesktopNavbar;

// New Desktopnavbar

// import React, { useState } from "react";
// import { useNavigate } from "react-router";
// import { IoLayersOutline } from "react-icons/io5";
// import editToolNavbar from "../../assets/settings.png";
// import { GrHomeRounded } from "react-icons/gr";
// import { LuMessagesSquare } from "react-icons/lu";
// import plus from "../../assets/plus.svg";
// import smallavatar from "../../assets/smallAvatar.svg";

// import cart from "../../assets/ShoppingCartpng.png";
// import search from "../../assets/search.svg";
// import uparrow from "../../assets/uparrow.png";
// import arrowspointingout from "../../assets/arrowspointingout.svg";
// import arrowpointingIn from "../../assets/arrowpointingIn.svg";
// import zoomOutMinus from "../../assets/zoomOutMinus.svg";
// import zoomInPlus from "../../assets/zoomOutPlus.svg";
// import editor from "../../assets/editor.svg";
// import poweredByPrymr from "../../assets/poweredByPrymr.svg";
// import fingureprintTappable from "../../assets/fingureprintTappable.svg";
// import undo from "../../assets/images/undo.svg";
// import info from "../../assets/info.svg";
// import redo from "../../assets/images/redo.svg";
// import line from "../../assets/Line68.png";
// import previewTriangle from "../../assets/previewTriangle.svg";
// import NewTappable from "../Board/ActionBar/NewTappeable/Newtapable";
// import NewBoard from "../Board/CreateNewBoard/NewBoard";

// const DesktopNavbar = () => {
//   const navigate = useNavigate();
//   const [isTappableVisible, setIsTappableVisible] = useState(false);

//   const handleArrow = () => {
//     navigate("/homePage");
//   };

//   const handlePlus = () => {
//     navigate("/boardBuilder");
//   };

//   const handleTappableToggle = () => {
//     setIsTappableVisible(!isTappableVisible);
//   };

//   return (
//     <div className="fixed bottom-0 w-full bg-[#202020] text-[#6B6B6B] flex flex-wrap h-18 items-center justify-between px-4 py-2 mb-2">
//       <div className="flex gap-3 items-center flex-wrap">
//         <div className="flex bg-[#515151] items-center rounded-full cursor-pointer">
//           <img
//             className="rounded-full w-8 h-8"
//             src={smallavatar}
//             alt="Profile"
//           />
//           <img
//             src={uparrow}
//             onClick={handleArrow}
//             className="w-5 h-5 ml-2 cursor-pointer"
//             alt="Arrow"
//           />
//         </div>

//         <div className="flex items-center bg-[#363636] text-white rounded-lg px-3 py-2 gap-2 border-blue-600 border-solid border cursor-pointer">
//           <span className="text-sm">Editor</span>
//           <img src={editor} className="w-6 h-6" alt="Editor" />
//         </div>

//         <div className="flex items-center bg-[#363636] text-white rounded-lg px-3 py-2 gap-2 border-blue-600 border-solid border cursor-pointer">
//           <span>Layers</span>
//           <IoLayersOutline className="w-6 h-6" />
//         </div>

//         <div>
//           <div
//             className="flex ml-[5vw] items-center bg-[#363636] text-white rounded-full px-4 py-2 gap-2 cursor-pointer"
//             onClick={handleTappableToggle}
//           >
//             <span className="text-sm">Add Tappable</span>
//             <img
//               src={fingureprintTappable}
//               className="w-6 h-6"
//               alt="Tappable"
//             />
//           </div>

//           <NewBoard isTappableVisible={isTappableVisible} />
//         </div>

//         <div className="flex flex-col items-center ml-[5vw]">
//           <button className="hover:bg-gray-600 py-1 rounded-full flex flex-col items-center cursor-pointer">
//             <img src={undo} className="h-5 w-5 mb-1" alt="Undo" />
//           </button>
//           <span className="text-[#d1cdcdc8] text-sm">Undo</span>
//         </div>

//         <img src={line} className="h-8 mx-2" alt="Line" />

//         <div className="flex flex-col items-center">
//           <button className="hover:bg-gray-600 py-1 px-2 rounded-full flex flex-col items-center cursor-pointer">
//             <img src={redo} className="h-5 w-5 mb-1" alt="Redo" />
//           </button>
//           <span className="text-[#d1cdcdc8] text-sm">Redo</span>
//         </div>
//       </div>

//       <div className="flex items-center bg-[#363636] text-white rounded-full px-4 py-2 gap-2 cursor-pointer">
//         <span className="text-sm">Add Board Info</span>
//         <img src={info} className="w-6 h-6" alt="Info" />
//       </div>

//       <div className="flex items-center bg-[#363636] text-white rounded-full px-4 py-2 gap-2 border-blue-600 border-solid border cursor-pointer">
//         <span className="text-sm">Preview / Save</span>
//         <img src={previewTriangle} className="w-6 h-6" alt="Preview Triangle" />
//       </div>

//       <div className="flex items-center gap-2">
//         <img
//           src={arrowpointingIn}
//           className="w-10 h-10 cursor-pointer"
//           alt="Arrow In"
//         />
//         <img
//           src={zoomOutMinus}
//           className="w-10 h-10 cursor-pointer"
//           alt="Zoom Out"
//         />
//         <h1 className="text-white">100%</h1>
//         <img
//           src={zoomInPlus}
//           className="w-8 h-8 cursor-pointer"
//           alt="Zoom In"
//         />
//         <img
//           src={arrowspointingout}
//           className="w-6 h-6 cursor-pointer"
//           alt="Arrow Out"
//         />
//       </div>
//     </div>
//   );
// };

// export default DesktopNavbar;
