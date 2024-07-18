import React from "react";
import Navbar from "../common/Navbar";
import handleBack from "../../assets/handleBack.svg";
import mailchimp from "../../assets/mailchimp.png";
import instagram from "../../assets/instagram.svg";
import message from "../../assets/message.png";
import twitter from "../../assets/Twitter.png";

function Contact() {
  return (
    <>
      <div className="min-h-screen bg-[#2A2A2A] text-white flex flex-col items-center p-4">
        <div className="max-w-md w-full">
          <div className="flex items-center space-x-2 mb-4 py-[1vh]">
            <img src={handleBack} className="" />
            <h1 className="text-2xl font-bold">Contact</h1>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <img src={instagram} />
              <span className="text-md">@creatorart</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src={twitter} />
              <span className="text-md">@creatorartist</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src={message} />
              <span classname="text-md">creator@creator.com</span>
            </div>
          </div>
          <form className="space-y-2 mt-6 w-full">
            <input
              type="text"
              placeholder="First name"
              className=" p-2 bg-[#2A2A2A] border-2 h-[5vh] text-xs w-full rounded placeholder-italic"
            />
            <input
              type="email"
              placeholder="Email address"
              className=" p-2 bg-[#2A2A2A] border-2 h-[5vh] text-xs w-full rounded placeholder-italic"
            />
            <input
              type="text"
              placeholder="Subject Matter"
              className=" p-2 bg-[#2A2A2A] border-2 h-[5vh] text-xs w-full rounded placeholder-italic"
            />
            <textarea
              placeholder="Write Your Message Here"
              className=" p-2 bg-[#2A2A2A] border-2 text-sm w-full h-[20vh] rounded placeholder-italic"
            />
            <button
              type="submit"
              className=" p-2 bg-[#696969] py-2  w-full rounded-full "
            >
              Submit
            </button>
          </form>
          <div className="mt-6 bottom-[10vh] fixed">
            <button className="  w-auto flex  gap-3 p-2 bg-black rounded text-white">
              <img class="w-5 h-5" src={mailchimp} />
              Join Mailing list
            </button>
          </div>
        </div>

        <Navbar />
      </div>

      <div></div>
    </>
  );
}

export default Contact;
