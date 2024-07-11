// Header as per New Figma
import React, { useState } from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import ShoppingCart from "../../assets/ShoppingCart.svg";

const Header = () => {
  return (
    <div className="flex fixed top-0 py-4 bg-opacity-45 bg-[#2A2A2A] backdrop-blur-sm justify-between items-start w-full z-10 text-white">
      <header className="flex items-center justify-between p-4 font-bold">
        <div className="text-lg">Erik Jones art.com</div>
      </header>
      <img className="ml-auto pr-2 pt-3" src={ShoppingCart} />
    </div>
  );
};

export default Header;
