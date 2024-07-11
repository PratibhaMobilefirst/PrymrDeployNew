// Header as per New Figma
import React, { useState } from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import ShoppingCart from "../../assets/ShoppingCart.svg";

const Header = () => {
  return (
    <div className="flex fixed top-0 py-1 bg-opacity-45 bg-[#2A2A2A] backdrop-blur-sm justify-between items-start w-full z-10 text-white lg:w-[30%]">
      <header className="flex items-center justify-between p-4 font-bold">
        <div className="text-lg">Erik Jones art.com</div>
      </header>
      <img className="ml-auto pr-2 pt-3" src={ShoppingCart} />
    </div>
  );
};

export default Header;

// Header as per old Figma
// import leftarrow from "../../assets/leftarrow.svg";
// import logo from "../../assets/prymerLogo.svg";
// import ShoppingCart from "../../assets/ShoppingCart.svg";
// import Collections from "../../assets/Collections.svg";
// import p from "../../assets/p.svg";
// import allcreators from "../../assets/allcreators.svg";
// import { useState } from "react";
// import AboutPrymr from "../HomePage/AboutPrymr";
// import { useNavigate } from "react-router";

// const Header = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleToggle = () => {
//     console.log("clicked");
//     setIsVisible(!isVisible);
//   };
//   const handleAbout = () => {
//     navigate("/home-about-prymr");
//   };
//   const handleAllCreators = () => {
//     navigate("/home-about-allcreators");
//   };

//   return (
//     <div className="flex fixed top-0 py-4 justify-between items-start bg-gradient-to-t from-[#262626] to-black w-full z-10">
//       <div className="flex items-center justify-around gap-5">
//         <img src={logo} alt="logo" className="px-2" />{" "}
//         <div className=" flex">
//           <div className="relative -left-5 ">
//             <img
//               src={leftarrow}
//               alt="toggle menu"
//               onClick={handleToggle}
//               className="cursor-pointer"
//             />
//             {isVisible && (
//               <div className="absolute top-2 -left-10 mt-8 ml-8 w-52 h-auto bg-[#222222] text-white font-extrabold p-4 rounded-lg z-10">
//                 <div className="flex gap-2 mb-4">
//                   <img src={p} alt="About Prymr" />
//                   <span onClick={handleAbout}>About Prymr</span>
//                   {isOpen && <AboutPrymr />}
//                 </div>
//                 <div className="flex gap-2 ">
//                   <img src={allcreators} alt="All Creators" />
//                   <span onClick={handleAllCreators}>All Creators (beta)</span>
//                 </div>
//               </div>
//             )}
//           </div>
//           <div className="flex place-items-end gap-10"></div>
//         </div>
//       </div>
//       <div className="flex justify-end text-white items-end gap-4 px-6">
//         <span>
//           <img src={Collections} className="ml-3" />
//         </span>
//         <span>
//           <img src={ShoppingCart} />
//         </span>
//       </div>
//     </div>
//   );
// };

// export default Header;
