import React, { useState } from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import deleteInitial from "../../assets/deleteInitial.jpg";



const Header = () => {
  const userRole = localStorage.getItem("userRole");
  return (
    // bg-opacity-45 bg-[#191919] 
    <div className="flex fixed top-0 py-1  backdrop-blur-sm justify-between items-start w-auto z-10 text-white lg:w-[30%]">
      <header className="flex items-center justify-between p-4  gap-2 font-bold">
        <img
          className="w-8 h-8 rounded-full cursor-pointer"
          src={deleteInitial}
        />

        <div className="text-lg cursor-pointer">
          {userRole === "publicUser" && <div>Erik Jones art.com</div>}
          {userRole === "user" && <div>Erik Jones art.com</div>}
          {userRole === "privateUser" && <div>Ben art.com</div>}
        </div>
      </header>
    </div>
  );
};

export default Header;
