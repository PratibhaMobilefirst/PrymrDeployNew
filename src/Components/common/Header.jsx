import React, { useState } from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import deleteInitial from "../../assets/deleteInitial.jpg";

const Header = () => {
  return (
    <div className="flex fixed top-0 py-1 bg-opacity-45 bg-[#2A2A2A] backdrop-blur-sm justify-between items-start w-full z-10 text-white lg:w-[30%]">
      <header className="flex items-center justify-between p-4  gap-2 font-bold">
        <img className="w-12 h-12 rounded-full " src={deleteInitial} />
        <div className="text-lg">Erik Jones art.com</div>
      </header>
    </div>
  );
};

export default Header;
