import React, { useState } from "react";
import Header from "./common/Header";
import Navbar from "./common/Navbar";
import Galary from "../assets/Galary.png";
import viewColumns from "../assets/viewColumns.png";
import viewBox from "../assets/viewBox.png";
import leftarrow from "../assets/leftarrow.svg";
import headerinfo from "../assets/headerInfo.png";
import headershop from "../assets/headershop.png";
import message from "../assets/message.png";
import mailchimp from "../assets/mailchimp.png";

const Blank = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const toggleArt = () => {
    setIsContactOpen(!isContactOpen);
  };
  return (
    <div className="h-screen bg-black">
      {/* <Header />
      <nav className="p-4 pt-[14vh] h-screen text-white bg-[#2A2A2A]">
        <ul className="space-y-4">
          <li className="flex items-center space-x-2">
            <img className="w-6 h-6" src={headershop} alt="headershop" />
            <span>Shop</span>
          </li>
          <li className="flex items-center space-x-2">
            <img className="w-6 h-6" src={headerinfo} alt="headerinfo" />
            <span>Info</span>
          </li>
          <li
            className="flex items-center space-x-2 cursor-pointer"
            onClick={toggleArt}
          >
            <img className="w-6 h-6" src={Galary} alt="Galary" />
            <span>Art</span>
            <img
              className={`w-6 h-6 transform transition-transform ${
                isContactOpen ? "rotate-180" : "rotate-0"
              }`}
              src={leftarrow}
              alt="leftarrow"
            />
          </li>
          {isContactOpen && (
            <div className="space-y-4 mt-4 px-5">
              <div className="flex items-center space-x-2">
                <span>Traditional</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Digital</span>
              </div>
            </div>
          )}
        </ul>
      </nav>
      <div className="fixed bottom-20 flex flex-col gap-4 px-8">
        <div class="w-[230.87px] h-[27.88px] justify-start items-center gap-[13.94px] inline-flex">
          <div class="w-[27.88px] h-[27.88px] relative">
            <img src={message} alt="message" />
          </div>
          <div class="text-center text-white text-lg font-medium font-['Inter'] leading-[17.42px]">
            Erik@erikjonesart.com
          </div>
        </div>

        <div class="w-[160.30px] h-[45.30px] p-[8.71px] bg-black rounded-md flex-col justify-start items-start gap-[8.71px] inline-flex">
          <div class="self-stretch justify-start items-center gap-[13.94px] inline-flex">
            <div class="w-[27.88px] h-[27.88px] bg-white justify-center items-center flex">
              <img class="w-5 h-5" src={mailchimp} />
            </div>
            <div class="text-center text-white text-xs font-medium font-['Inter'] leading-[17.42px]">
              Join Mailing list
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Blank;
