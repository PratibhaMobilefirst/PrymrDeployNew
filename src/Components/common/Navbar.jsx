import React from "react";
import editToolNavbar from "../../assets/navEdit.svg";
import navHome from "../../assets/navHome.svg";
import { useNavigate } from "react-router";
import plus from "../../assets/plus.svg";
import smallAvatar from "../../assets/smallAvatar.svg";
import bigAvatar from "../../assets/bigAvatar.jpg";
import deleteuserimg from "../../assets/deleteuserimg.png";
import chats from "../../assets/ShoppingCartpng.png";

const Navbar = ({ isFullImageActive }) => {
  const isLoggedIn = localStorage.getItem("token") !== null;
  const userRole = localStorage.getItem("userRole");
  const profileImage = localStorage.getItem("profileIcon");
  const initialIconUrl = localStorage.getItem("initialIconUrl");
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
  const handleHome = () => {
    navigate("/home");
  };
  return (
    <>
      <div
        className={`fixed bottom-0 w-full  text-[#6B6B6B] bg-[#212121] flex justify-around items-center py-2 h-18 lg:w-[30%] ${
          isFullImageActive ? "z-10" : ""
        }`}
      >
        <div className="flex flex-col items-center" onClick={handleHome}>
          <img
            src={navHome}
            className="w-6 h-6 text-[#FFF500] cursor-pointer"
            alt="Home"
          />
        </div>

        <div className="flex flex-col items-center relative cursor-pointer">
          <img
            src={chats}
            className="w-7 h-7 text-[#6B6B6B] cursor-pointer"
            alt="Chat Icon"
          />
          <span className="bg-yellow-500 h-2 w-2 rounded-full absolute top-0 right-0 mt-1 mr-1"></span>
        </div>

        {isLoggedIn &&
          (userRole === "publicUser" || userRole === "privateUser") && (
            <div className="flex flex-col items-center cursor-pointer">
              <img
                src={plus}
                className="w-8 h-8 text-gray-400 cursor-pointer"
                onClick={handlePlus}
                alt="Plus"
              />
            </div>
          )}

        <div className="flex flex-col items-center">
          <img
            src={editToolNavbar}
            className="w-8 h-8 text-gray-400 cursor-pointer"
            alt="Settings"
          />
        </div>

        <div className="flex flex-col items-center relative">
          {isLoggedIn ? (
            <img
              className="rounded-full w-6 h-6 cursor-pointer"
              src={profileImage || smallAvatar}
              alt="Profile"
              onClick={handleProfile}
            />
          ) : (
            <button className="text-sm" onClick={handleSignUpClick}>
              Sign Up
            </button>
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
