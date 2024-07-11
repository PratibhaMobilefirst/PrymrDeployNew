// Rework

import React from "react";
import search from "../../assets/search.svg";
import { GrHomeRounded } from "react-icons/gr";
import { LuMessagesSquare } from "react-icons/lu";
import plus from "../../assets/plus.svg";
import smallavatar from "../../assets/smallAvatar.svg";
import chats from "../../assets/Chats.svg";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const handlePlus = () => {
    navigate("/boardBuilder");
  };

  const handlProfile = () => {
    navigate("/user-profile");
  };
  return (
    <div className="bg-black fixed bottom-0 w-full text-[#6B6B6B] flex justify-around items-center py-2 h-18 lg:w-[30%]">
      <div className="flex flex-col items-center">
        <GrHomeRounded className="text-[#FFF500]" size={28} />
      </div>
      <div className="flex flex-col items-center">
        <img
          src={plus}
          className="text-gray-400 w-10 h-10"
          onClick={handlePlus}
        />
      </div>
      <div className="flex flex-col items-center relative">
        <img
          className="rounded-full w-10 h-10"
          src={smallavatar}
          alt="Profile"
          onClick={handlProfile}
        />
        <span className="bg-yellow-500 h-2 w-2 rounded-full absolute top-0 right-0 mt-1 mr-1"></span>
      </div>
    </div>
  );
};

export default Navbar;

/* <div className="fixed bottom-0 w-full flex justify-between p-4 bg-gray-900">
<button className="text-yellow-500">Home</button>
<button className="text-yellow-500">+</button>
<button>
  <img
    src="/path/to/your/profile.jpg"
    alt="User"
    className="w-10 h-10 rounded-full"
  />
</button>
</div> */

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
//         <img src={search} className="text-gray-400" size={24} />
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
//           src={chats} className="text-gray-400 w-10 h-10" />
//         <span className="bg-yellow-500 h-2 w-2 rounded-full absolute top-0 right-0 mt-1 mr-1"></span>
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
