import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router"; // Import useLocation here
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Line68 from "../../../../assets/Line68.png";
import crossCircle from "../../../../assets/crossCircle.png";
import checkCircle from "../../../../assets/checkCircleblack.png";
import checkCircleWhite from "../../../../assets/checkCircleWhite.png";
import questionmarkcircle from "../../../../assets/questionmarkcircle.svg";
import comment from "../../../../assets/comment.svg";
import { baseURL } from "../../../../Constants/urls";

const EditBoardInfo = () => {
  const [selectedRating, setSelectedRating] = useState("G");
  const [title, setTitle] = useState("Enter Title");
  const [description, setDescription] = useState("");
  const [allowComments, setAllowComments] = useState(false);
  const [isCheckCircleToggled, setIsCheckCircleToggled] = useState(false);
  const [isCrossCircleToggled, setIsCrossCircleToggled] = useState(false);
  const location = useLocation();
  const imageUrl = location.state;
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/board-builder-edit-board");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!title.trim()) {
      toast.error("Please enter a title for the board.");
      return; // Prevents the request from being sent if title is empty
    }

    const postData = JSON.stringify({
      imageUrl: imageUrl,
      title: "Board Title",
      description: description,
      allowComments: true,
    });

    try {
      const response = await fetch(`${baseURL}/board/addBoardInfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: postData,
      });

      const data = await response.json();

      if (response.status) {
        console.log("Comment saved");
        toast.success(data.message);
      } else {
        alert(data.message);
        console.log(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    navigate("/board-builder-edit-board");
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value); // Update title state
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // const handleCheckCircleToggle = () => {
  //   setIsCheckCircleToggled(!isCheckCircleToggled);
  //   if (!isCheckCircleToggled) {
  //     setIsCrossCircleToggled(false);
  //   }
  // };

  // const handleCrossCircleToggle = () => {
  //   setIsCrossCircleToggled(!isCrossCircleToggled);
  //   if (!isCrossCircleToggled) {
  //     setIsCheckCircleToggled(false);
  //   }
  // };
  const handleYesClick = () => {
    setSelectedOption(selectedOption === "yes" ? null : "yes");
  };

  const handleNoClick = () => {
    setSelectedOption(selectedOption === "no" ? null : "no");
  };

  const toggleComments = () => {
    setAllowComments(!allowComments);
  };

  return (
    // <div className="container top-[100vh] text-white">
    //   <div>
    //     <header
    //       onClick={handleBack}
    //       className="flex items-center mt-2 space-x-2 mb-4 cursor-pointer"
    //     >
    //       <AiOutlineArrowLeft className="text-xl" />
    //       <span className="text-lg">Back</span>
    //     </header>
    //     <div className="p-1 rounded-lg mb-2">
    //       <img src={imageUrl} alt="Board" className="h-[54vh] w-full" />

    //       <div className="absolute top-[50vh] w-full h-auto inset-0 bg-black bg-opacity-50 flex flex-col p-4">
    //         <div className="text-white mb-4">
    //           <h1 className="text-md top5">Title Board</h1>
    //         </div>
    //         <textarea
    //           className="w-full bg-transparent text-white border-none resize-none outline-none"
    //           value={description}
    //           onChange={handleDescriptionChange}
    //           placeholder="Enter Board Description"
    //           rows={4}
    //           style={{ lineHeight: "1.5em" }}
    //         />
    //         <div className="text-white">
    //           {description.split("\n").map((line, index) => (
    //             <div key={index} className="border-b border-white"></div>
    //           ))}
    //         </div>
    //       </div>

    //       <div
    //         className="flex bg-blue-400 w-full fixed bottom-1 h-16 font-bold text-3xl text-white justify-center items-center mb-3"
    //         onClick={handleSave}
    //       >
    //         Save
    //         <img
    //           src={checkCircleWhite}
    //           alt="Check Circle White"
    //           className="ml-3 w-8 h-8"
    //         />
    //       </div>
    //     </div>
    //   </div>
    //   <ToastContainer />
    // </div>
    <div className="container mx-auto text-white h-screen flex-grow">
      <div className="relative w-full h-full">
        <header
          onClick={handleBack}
          className="flex items-center mt-2 space-x-2 mb-4 cursor-pointer"
        >
          <AiOutlineArrowLeft className="text-xl" />
          <span className="text-lg">Back</span>
        </header>

        <img
          src={imageUrl}
          alt="Board"
          className="w-full h-[40vh] object-contain"
        />

        <div className="absolute top-1/2 h-auto left-0 right-0 bg-black bg-opacity-50 p-4 py-10 flex flex-col">
          <input
            className=" text-lg mb-2  bg-transparent text-white border-none resize-none outline-no  overflow-auto"
            placeholder="Title Board"
          />
          <textarea
            className="w-full bg-transparent text-white border-none resize-none outline-none h-[20vh] overflow-auto"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter Board Description"
            style={{ lineHeight: "1.5em" }}
          />
          <div className="text-white mt-2">
            {description.split("\n").map((line, index) => (
              <div key={index} className="border-b border-white"></div>
            ))}
          </div>
        </div>

        <div
          className="fixed bottom-0 left-[18vw] right-[18vw]  bg-blue-400 h-10 mb-5 flex items-center  rounded-full justify-center font-bold text-xl text-white cursor-pointer"
          onClick={handleSave}
        >
          Save
          <img
            src={checkCircleWhite}
            alt="Check Circle White"
            className="ml-3 w-5 h-5"
          />
        </div>
      </div>
    </div>
  );
};

export default EditBoardInfo;
