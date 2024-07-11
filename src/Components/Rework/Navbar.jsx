// import React from "react";

// import search from "../../assets/search.svg";
// import { GrHomeRounded } from "react-icons/gr";
// import { LuMessagesSquare } from "react-icons/lu";
// import plus from "../../assets/plus.svg";
// import smallavatar from "../../assets/smallAvatar.svg";
// import chats from "../../assets/Chats.svg";
// import { useNavigate } from "react-router";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const handlePlus = () => {
//     navigate("/boardBuilder");
//   };
//   return (
//     <div className="bg-black fixed bottom-0 w-full text-[#6B6B6B] flex justify-around items-center py-2 h-18 ">
//       <div className="flex flex-col items-center">
//         <GrHomeRounded className="text-[#FFF500]" size={28} />
//       </div>

//       <div className="flex flex-col items-center">
//         <img
//           src={plus}
//           className="text-gray-400 w-10 h-10"
//           onClick={handlePlus}
//         />
//       </div>
//       <div className="flex flex-col items-center relative">
//         <img
//           className="rounded-full w-10 h-10"
//           src={smallavatar}
//           alt="Profile"
//         />
//         <span className="bg-yellow-500 h-2 w-2 rounded-full absolute top-0 right-0 mt-1 mr-1"></span>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React from "react";

const boards = [
  // Your array of board objects with necessary data
  {
    id: 1,
    title: "Title of Board",
    status: "Draft",
    lastEdited: "12/10/2023",
    mainImage: "path/to/main/image1.jpg",
    images: ["path/to/image1.jpg", "path/to/image2.jpg" /* more images */],
  },
  // Add more board objects as needed
];
const Navbar = ({ title, status, lastEdited, mainImage, images }) => {
  return (
    <div className="flex flex-col bg-gray-800 rounded-lg p-4 mb-4">
      <div className="relative">
        <img src={mainImage} alt={title} className="rounded-lg" />
        <span
          className={`absolute top-2 left-2 px-2 py-1 rounded text-white text-xs ${
            status === "Published" ? "bg-green-500" : "bg-gray-500"
          }`}
        >
          {status.toUpperCase()}
        </span>
      </div>
      <div className="flex overflow-x-auto mt-2 space-x-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Board image ${index + 1}`}
            className="w-16 h-16 rounded"
          />
        ))}
      </div>
      <h3 className="mt-2 text-white font-bold">{title}</h3>
      <p className="text-gray-400 text-sm">Last Edited: {lastEdited}</p>
    </div>
  );
};

const BoardList = () => {
  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <h2 className="text-white text-xl mb-4">Saved Projects</h2>
      <div className="grid grid-cols-1 gap-4">
        {boards.map((board) => (
          <Board key={board.id} {...board} />
        ))}
      </div>
    </div>
  );
};

export default Navbar;
