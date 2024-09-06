import React, { useState } from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

const Header = () => {
  const userRole = localStorage.getItem("userRole");
  const profileImage = localStorage.getItem("profileIcon");
  const initialIconUrl = localStorage.getItem("initialIconUrl");
  console.log(profileImage);
  return (
    <div className="flex bg-[#2D2D2D]">
      <header className="flex items-center  justify-between p-3  gap-2">
        <img
          className="w-7 h-7 rounded-full cursor-pointer"
          src={profileImage}
        />

        <div className="text-[28px]  font-bold cursor-pointer text-white">
          {userRole === "publicUser" && <div>Erik Jones art.com</div>}
          {userRole === "user" && <div>Erik Jones art.com</div>}
          {userRole === "privateUser" && <div>Ben art.com</div>}
        </div>
      </header>
    </div>
  );
};

export default Header;
