import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const LoginScreen = () => {
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("./signuppage");
  };
  const handleSignIn = () => {
    navigate("./signin");
  };

  // const handleForgetPassword = () => {
  //   navigate("/forgetpassword");
  // };
  return (
    <div className=" text-white w-full h-screen flex justify-center items-center">
      <div className=" text-center">
        <div className="font-bold text-lg mb-4"> Sign in to interact</div>

        <div className="text-xs mb-2">
          To purchase items or leave comments, you’ll
        </div>
        <div className="text-xs mb-2">
          {" "}
          need to leave your email address, create a
        </div>
        <div className="text-xs mb-5">
          password, and choose an avatar.Simple :)
        </div>

        <div>
          <button
            className="text-white  cursor-pointer font-bold bg-opacity-300 bg-blue-600  border-[#4e4e4e] gap-2 w-[100%] h-[45px] rounded-full mb-5 "
            type="submit"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>
        <div>
          <button
            className="text-white cursor-pointer font-bold bg-opacity-300 bg-gray-600 border border-[#4e4e4e] gap-2 w-[100%] h-[45px] rounded-full mb-3 "
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
