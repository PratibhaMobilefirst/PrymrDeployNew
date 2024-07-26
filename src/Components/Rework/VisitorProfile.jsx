import React from "react";
import smallavatar from "../../assets/smallAvatar.svg";
import backarrow from "../../assets/backarrow.png";
import BellNotification from "../../assets/BellNotification.png";
import logoutRedBtn from "../../assets/logoutRedBtn.png";
import Navbar from "../common/Navbar";
import { useNavigate } from "react-router";

const VisitorProfile = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/home");
  };
  return (
    <div className="h-screen bg-black text-white">
      <header className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <img
            src={backarrow}
            alt="Back Arrow"
            className="w-4 h-4 cursor-pointer"
            onClick={handleBack}
          />
          <img src={smallavatar} alt="User" className="w-8 h-8 rounded-full" />
          <div className="text-sm">
            <div>User Name Icon</div>
            <div>username@gmail.com</div>
          </div>
        </div>
        <div>
          <button className="text-blue-500 ml-auto mr-5 cursor-pointer">
            edit
          </button>
        </div>
      </header>

      <nav className="p-4">
        <ul className="space-y-4">
          <li className="flex items-center justify-between">
            <span className="flex gap-4">
              {" "}
              <img src={BellNotification} />
              Notifications
            </span>

            <span className="bg-yellow-500 text-black rounded-full px-2 py-1">
              127
            </span>
          </li>
        </ul>
      </nav>
      <footer className="p-4 fixed bottom-12 w-full ">
        <button className="text-[#FF0404] text-2xl cursor-pointer flex  gap-3">
          <img src={logoutRedBtn} className="h-6   w-6 mt-1" />
          Log Out
        </button>
      </footer>
      <Navbar />
    </div>
  );
};

export default VisitorProfile;
