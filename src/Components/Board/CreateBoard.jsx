import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import {
  FaQuestionCircle,
  FaDollarSign,
  FaLock,
  FaImage,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateBoard = () => {
  const [selectedRating, setSelectedRating] = useState("G");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const imageUrl = location.state;

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  const handleBack = () => {
    navigate("/boardBuilder");
  };

  const handleSave = () => {};

  const handleAddProgress = async () => {
    alert("Board created Successfully");
    const storedToken = localStorage.getItem("token");

    const postData = JSON.stringify({
      imageUrl: imageUrl,
      title: title,
      description: description,
      rating: selectedRating,
      jsonElement: {
        version: "5.3.0",
        objects: [
          // Replace this part with your API's "jsonElement"
        ],
      },
      jsonComment: {
        version: "5.3.0",
        objects: [
          // Replace this part with your API's "jsonComment"
        ],
      },
    });

    try {
      const response = await fetch(
        "https://prymr-dev-backend.vercel.app/api/board/createBoard",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: postData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create board");
      }

      const data = await response.json();
      // settimeout
      setTimeout(() => {
        navigate("/blank");
      }, 2000);
      toast.success("Board created successfully !!");
      console.log("Board created successfully:", data);
    } catch (error) {
      toast.error("Error creating board");
      console.error("Error creating board:", error);
    }
  };

  return (
    <>
      <div className="top-[100vh] w-[121%] h-[121vh] bg-black text-white p-4">
        <div>
          <header
            onClick={handleBack}
            className="flex items-center space-x-2 mb-4"
          >
            <AiOutlineArrowLeft className="text-xl" />
            <span className="text-lg">Back</span>
          </header>
          <div className="p-1 rounded-lg mb-2">
            <img src={imageUrl} alt="Board" className="h-[174px] w-[113vw] " />
          </div>

          <div className="flex items-center text-sm space-x-2  mb-4">
            <span className="text-[12px]">Select Asset Rating</span>
            <FaQuestionCircle className="text-sm" />

            {/* <div className="flex w-[60vw] h-[40px] space-x-1 text-xs ">
              {["G", "PG", "PG-13", "R"].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedRating === rating
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-500"
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div> */}
          </div>
          <div className="text-20 font-semibold leading-33 text-left">
            <input
              type="text"
              placeholder="Tap to Type Title"
              className="w-386 h-33 bg-black m-2  justify-between"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <textarea
            placeholder="Tap to Enter Description"
            className="w-full text-base font-normal leading-6 m-2 text-left bg-black"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div className="flex space-x-4 mb-4">
            <button className="bg-gray-700 p-2 rounded-md flex items-center  ">
              <span>PRIMARY CONTENT</span>

              <span className="absolute px-[40vw] mx-8  flex center">
                <button className="flex-1 bg-gray-700 p-2  ">
                  <FaImage className="text-left w-5 h-5" />
                </button>
                <button className="flex-1 bg-gray-700 p-2 ">
                  <FaLock className=" w-5 h-5" />
                </button>
                <button className=" bg-gray-700 p-2 ">
                  <FaDollarSign className=" w-5 h-5" />
                </button>{" "}
              </span>
            </button>{" "}
          </div>

          <div className="bottom-0 fixed justify-center left-1/2 transform -translate-x-1/2 mb-4">
            <button
              onClick={handleAddProgress}
              className="text-gray-900 opacity-50 bg-white w-[40vw] rounded-full"
            >
              Add Content
            </button>
            <button
              onClick={handleSave}
              className="rounded-full mt-4 mb-4 w-[40vw] bg-blue-500 border"
            >
              Save Progress
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default CreateBoard;
