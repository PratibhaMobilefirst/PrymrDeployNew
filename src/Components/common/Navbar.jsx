// import React from "react";
// import editToolNavbar from "../../assets/settings.png";
// import { GrHomeRounded } from "react-icons/gr";
// import { LuMessagesSquare } from "react-icons/lu";
// import plus from "../../assets/plus.svg";
// import smallavatar from "../../assets/smallAvatar.svg";
// import chats from "../../assets/ShoppingCartpng.png";
// import { useNavigate } from "react-router";
// import search from "../../assets/search.svg";
// import uparrow from "../../assets/uparrow.png";

// const Navbar = () => {
//   const isLoggedIn = localStorage.getItem("token") !== null;
//   const userRole = localStorage.getItem("userRole");
//   const navigate = useNavigate();
//   const handlePlus = () => {
//     navigate("/boardBuilder");
//   };

//   const handlProfile = () => {
//     navigate("/user-profile");
//   };
//   const handleSignUpClick = () => {
//     navigate("/loginscreen");
//   };
//   return (
//     <>
//       <div className="bg-black fixed bottom-0 w-full text-[#6B6B6B] flex justify-around items-center py-2 h-18 lg:w-[30%]">
//         <div className="flex flex-col items-center">
//           <GrHomeRounded className="text-[#FFF500] cursor-pointer" size={28} />
//         </div>
//         <div className="flex flex-col items-center">
//           <img
//             src={editToolNavbar}
//             className="text-gray-400 cursor-pointer"
//             size={24}
//           />
//         </div>
//         {isLoggedIn &&
//           (userRole === "publicUser" || userRole === "privateUser") && (
//             <div className="flex flex-col items-center cursor-pointer">
//               <img
//                 src={plus}
//                 className="text-gray-400 w-10 h-10 cursor-pointer"
//                 onClick={handlePlus}
//               />
//             </div>
//           )}
//         <div className="flex flex-col items-center relative cursor-pointer">
//           <img
//             src={chats}
//             className="w-10 h-10 text-[#6B6B6B] cursor-pointer"
//             alt="Chat Icon"
//           />
//           <span className="bg-yellow-500 h-2 w-2 rounded-full absolute top-0 right-0 mt-1 mr-1"></span>
//         </div>
//         <div className="flex flex-col items-center relative">
//           {isLoggedIn ? (
//             <img
//               className="rounded-full w-10 h-10"
//               src={smallavatar}
//               alt="Profile"
//             />
//           ) : (
//             <button onClick={handleSignUpClick}>Sign Up</button>
//           )}
//           {isLoggedIn && (
//             <span className="bg-yellow-500 h-2 w-2 rounded-full absolute top-0 right-0 mt-1 mr-1"></span>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;

import React from "react";
import editToolNavbar from "../../assets/settings.png";
import { GrHomeRounded } from "react-icons/gr";
import { LuMessagesSquare } from "react-icons/lu";
import plus from "../../assets/plus.svg";
import smallAvatar from "../../assets/smallAvatar.svg";
import bigAvatar from "../../assets/bigAvatar.jpg";
import deleteuserimg from "../../assets/deleteuserimg.png";

import chats from "../../assets/ShoppingCartpng.png";
import { useNavigate } from "react-router";
import search from "../../assets/search.svg";
import uparrow from "../../assets/uparrow.png";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("token") !== null;
  const userRole = localStorage.getItem("userRole");
  const navigate = useNavigate();

  const handlePlus = () => {
    navigate("/boardBuilder");
  };

  const handleProfile = () => {
    navigate("/user-profile");
  };

  const handleSignUpClick = () => {
    localStorage.removeItem("token");
    navigate("/loginscreen");
  };

  return (
    <>
      <div className="bg-black fixed bottom-0 w-full text-[#6B6B6B] flex justify-around items-center py-2 h-18 lg:w-[30%]">
        <div className="flex flex-col items-center">
          <GrHomeRounded className="text-[#FFF500] cursor-pointer" size={28} />
        </div>
        <div className="flex flex-col items-center">
          <img
            src={editToolNavbar}
            className="text-gray-400 cursor-pointer"
            size={24}
            alt="Settings"
          />
        </div>
        {isLoggedIn &&
          (userRole === "publicUser" || userRole === "privateUser") && (
            <div className="flex flex-col items-center cursor-pointer">
              <img
                src={plus}
                className="text-gray-400 w-10 h-10 cursor-pointer"
                onClick={handlePlus}
                alt="Plus"
              />
            </div>
          )}
        <div className="flex flex-col items-center relative cursor-pointer">
          <img
            src={chats}
            className="w-10 h-10 text-[#6B6B6B] cursor-pointer"
            alt="Chat Icon"
          />
          <span className="bg-yellow-500 h-2 w-2 rounded-full absolute top-0 right-0 mt-1 mr-1"></span>
        </div>
        <div className="flex flex-col items-center relative">
          {isLoggedIn ? (
            <img
              className="rounded-full w-10 h-10 cursor-pointer"
              src={
                userRole === "publicUser"
                  ? smallAvatar
                  : userRole === "user"
                  ? deleteuserimg
                  : bigAvatar
              }
              alt="Profile"
              onClick={handleProfile}
            />
          ) : (
            <button onClick={handleSignUpClick}>Sign Up</button>
          )}
          {isLoggedIn && (
            <span className="bg-yellow-500 h-2 w-2 rounded-full absolute top-0 right-0 mt-1 mr-1"></span>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

