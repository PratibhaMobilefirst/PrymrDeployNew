import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import blueFly from "../../assets/mainpageclouds.svg";

const LoginScreen = () => {
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/signuppage");
  };
  const handleSignIn = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  // const handleForgetPassword = () => {
  //   navigate("/forgetpassword");
  // };
  return (
    //
    <div className="bg-cover bg-center absolute h-[100vh] w-full flex flex-col  justify-center items-center text-white ">
      <img
        src={blueFly}
        alt="Blue cloud"
        className="absolute w-full h-full object-cover"
      />
      <div className=" text-center relative bg-gray-800 bg-opacity-75 p-6 rounded-md space-y-4  ml-[18px] mr-[18px]">
        <div className="font-bold text-lg mb-4"> Sign in to interact</div>

        <div className="text-xs ">
          To purchase items or leave comments, you’ll
          <p> need to leave your email address, create a</p>
          <p> password, and choose an avatar.Simple :)</p>
        </div>

        <div>
          <button
            className="text-white font-bold bg-opacity-300 bg-blue-600  border-[#4e4e4e] gap-2 w-[100%] h-[45px] rounded-full mb- "
            type="submit"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>
        <div>
          <button
            className="text-white font-bold bg-opacity-300 bg-gray-600 border border-[#4e4e4e] gap-2 w-[100%] h-[45px] rounded-full mb-3 "
            type="submit"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
