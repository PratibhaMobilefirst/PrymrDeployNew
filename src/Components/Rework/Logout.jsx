import React from "react";
import smallavatar from "../../assets/smallAvatar.svg";
import backarrow from "../../assets/backarrow.png";
import Navbar from "../common/Navbar";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/home");
  };
  return (
    <div className="h-screen bg-black text-white">
      <header className="flex p-4">
        <div className="flex items-center space-x-1">
          <img
            src={backarrow}
            alt="Back Arrow"
            className="w-4 h-4"
            onClick={handleBack}
          />
          <img src={smallavatar} alt="User" className="w-8 h-8 rounded-full" />
          <div className="text-sm">
            <div>User Name Icon</div>
            <div>username@gmail.com</div>
          </div>
        </div>
        <button className="text-blue-500 ml-auto">edit</button>
      </header>
      <nav className="p-4">
        <ul className="space-y-4">
          <li className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .417-.164.823-.405 1.116L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span>Notifications</span>
            </span>
            <span className="bg-yellow-500 text-black rounded-full px-2 py-1">
              127
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7h18M3 12h18M3 17h18"
              />
            </svg>
            <span>History</span>
          </li>
        </ul>
      </nav>
      <footer className="p-4 fixed bottom-12 w-full ">
        <button className="text-red-500 text-xl flex items-center justify-center">
          Log Out
        </button>
      </footer>
      <Navbar />
    </div>
  );
};

export default Logout;
