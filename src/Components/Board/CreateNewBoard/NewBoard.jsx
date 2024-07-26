import React, { useState } from "react";
import handleBack from "../../../assets/handleBack.svg";
import BoardBuilderText from "../../../assets/BoardBuilderText.svg";
import plusGrayCircle from "../../../assets/plusGrayCircle.svg";
import savedBoards from "../../../assets/savedBoards.svg";
import ADS from "../../../assets/ADS.svg";
import questionmarkcircle from "../../../assets/questionmarkcircle.svg";

import fromGalary from "../../../assets/Group115.png";
import fromBlank from "../../../assets/fromBlank.svg";
import fromPhone from "../../../assets/fromPhone.svg";
import { useNavigate } from "react-router";
import EditBoard from "../EditBoard";
import ImageFromGalary from "./ImageFromGalary";
import { baseURL } from "../../../Constants/urls";
import DesktopNavbar from "../../common/DesktopNavbar";

const NewBoard = () => {
  const navigate = useNavigate();
  const [selectedImageFromGalary, setSelectedImageFromGalary] = useState(true);
  // const [selectImageFromCamera, setImageFromCamera] = useState(false);
  const [createBlankCanvas, setCreateBlankCanvas] = useState(false);
  const [SelectedImage, setSelectedImage] = useState();
  const [buttonIsClicked, setButtonIsClicked] = useState(null);

  const handleBackFunction = () => {
    navigate("/boardBuilder");
  };

  const handleImageUpload = async (event) => {
    console.log("handleImageUpload");
    // navigate("/create-new-board-galary");

    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setSelectedImageFromGalary(reader.result);

        const formData = new FormData();
        formData.append("file", file);

        const storedToken = localStorage.getItem("token");

        try {
          const response = await fetch(`${baseURL}/file-upload/uploadFile`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
            body: formData,
          });

          if (response.ok) {
            const result = await response.json();
            const imageUrl = result.data.url;

            setSelectedImage(imageUrl);
            sessionStorage.setItem("imagefromGalary", reader.result);
            sessionStorage.setItem("state", JSON.stringify({ imageUrl }));

            navigate("/create-new-board-galary", {
              state: { imagefromGalary: reader.result, imageUrl },
            });

            console.log("imageUrl", imageUrl);
          } else {
            console.error(
              "Failed to upload file",
              response.status,
              response.statusText
            );
          }
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoFromCamera = () => {
    navigate("/Camera");
    // setImageFromCamera(true) ;
    console.log("clicked on Camera");
  };

  const handleBlank = () => {
    console.log("clicked on blank");
    setCreateBlankCanvas(true);
    navigate("/board-builder-edit-board", {
      state: { createBlankCanvas: true },
    });
  };
  const handleNewBoardCreator = () => {
    navigate("/create-new-board");
    setButtonIsClicked("NEW");
  };

  const handleSaved = () => {
    setButtonIsClicked("SAVED");
    navigate("/create-new-board-saved");
  };

  const handleADS = () => {
    setButtonIsClicked("ADS");
    navigate("/create-new-board-ADS");
  };
  return (
    <div className="container h-auto bg-[#2A2A2A] ">
      <div className="flex items-center  ">
        <button
          className="w-auto cursor-pointer h-auto"
          onClick={handleBackFunction}
        >
          <img src={handleBack} className="text-3xl border-white" />
        </button>
        <div className="flex items-center justify-between flex-grow">
          <img
            src={BoardBuilderText}
            className="m-4 p-2 h-auto -pt-1 text-sm text-white w-auto ml-auto"
          />
        </div>
      </div>

      {/* <div className=" flex border-white w-auto">
        <button
          className="text-[#757575] flex items-center justify-center font-bold text-xl"
          onClick={handleNewBoardCreator}
        >
          <img
            src={plusGrayCircle}
            className="-m-1 mr-2   sm:w-5 sm:h-5 lg:w-10 lg:h-10"
          />
          <span className="text-base text-yellow-500 font-extrabold"> NEW</span>
        </button>
        <button
          className="text-[#757575] flex items-center justify-center font-bold text-xl"
          onClick={handleSaved}
        >
          <img
            src={savedBoards}
            className="-m-1 mr-2  sm:w-5 sm:h-5 lg:w-10 lg:h-10"
          />
          <span
            className={`text-base font-extrabold ${
              buttonIsClicked === "SAVED" ? "text-yellow-500" : "text-gray-700"
            }`}
          >
            SAVED
          </span>
        </button>
        <button
          className="text-[#757575] flex items-center justify-center font-bold text-xl"
          onClick={handleADS}
        >
          <img src={ADS} className="-m-1 mr-2  sm:w-5 sm:h-5 lg:w-9 lg:h-9" />
          <span
            className={`text-base font-extrabold ${
              buttonIsClicked === "ADS" ? "text-yellow-500" : "text-gray-700"
            }`}
          >
            ADS
          </span>
        </button>
      </div> */}

      <div className=" lg:pl-[67px] sm:pl-[47px]  bg-[#2A2A2A] flex justify-center">
        <div className="border-2 border-dashed border-[#8B8B8B] bg-[#010101] h-[60vh] w-[65vw]  lg:w-[50vw] mb-3">
          {/* {  selectedImageFromGalary && (
            <img src={selectedImageFromGalary} alt="Selected" className="h-full w-full object-contain " />
          ) } */}
        </div>
      </div>

      <div className="flex py-3 bg-[#2A2A2A] text-[#8B8B8B]">
        <h1 className="font-bold text-sm pl-5 mx-5 ">Add Board Background</h1>
        <img src={questionmarkcircle} className="ml-auto px-14" />
      </div>

      <div className="flex p-3 -py-1 cursor-pointer bg-[#2A2A2A] gap-8 justify-center items-center">
        <label htmlFor="fileInput1">
          <img
            src={fromGalary}
            alt="From Image"
            className=" w-22 h-16 lg:w-28 lg:h-24   rounded-xl "
          />

          <input
            type="file"
            accept="image/*"
            id="fileInput1"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
        {/* <label htmlFor="fileInput2">
          <img
            src={fromPhone}
            alt="From Image"
            className="w-22 h-16  lg:w-24 lg:h-24   border border-[#2d2c2c] border-1 rounded-xl "
            onClick={handlePhotoFromCamera}
          />
          {/* {selectImageFromCamera && <ImageFromCamera />}
        </label>*/}
        <label htmlFor="fileInput3">
          <img
            src={fromBlank}
            alt="From Image"
            className=" w-22 h-16 lg:w-24  cursor-pointer lg:h-24 rounded-xl "
            onClick={handleBlank}
          />

          {createBlankCanvas && (
            <EditBoard createBlankCanvas={createBlankCanvas} />
          )}
        </label>
        <DesktopNavbar />
      </div>
    </div>
  );
};

export default NewBoard;

// Full screen

// import React, { useRef, useState } from "react";
// import handleBack from "../../../assets/handleBack.svg";
// import BoardBuilderText from "../../../assets/BoardBuilderText.svg";
// import plusGrayCircle from "../../../assets/plusGrayCircle.svg";
// import savedBoards from "../../../assets/savedBoards.svg";
// import ADS from "../../../assets/ADS.svg";
// import questionmarkcircle from "../../../assets/questionmarkcircle.svg";
// import changeBg from "../../../assets/changeBg.png";
// import fromGalary from "../../../assets/Group115.png";
// import fromBlank from "../../../assets/fromBlank.svg";
// import fromPhone from "../../../assets/fromPhone.svg";
// import FrameGalary from "../../../assets/FrameGalary.svg";
// import { useNavigate } from "react-router";
// import EditBoard from "../EditBoard";
// import ImageFromGalary from "./ImageFromGalary";
// import { baseURL } from "../../../Constants/urls";
// import DesktopNavbar from "../../common/DesktopNavbar";
// import FrameSaved from "../../../assets/FrameSaved.svg";
// import FrameBlank from "../../../assets/FrameBlank.svg";

// const NewBoard = ({ isTappableVisible }) => {
//   const navigate = useNavigate();
//   const [selectedImageFromGalary, setSelectedImageFromGalary] = useState(true);
//   const [selectImageFromCamera, setImageFromCamera] = useState(false);
//   const [createBlankCanvas, setCreateBlankCanvas] = useState(false);
//   const [SelectedImage, setSelectedImage] = useState();
//   const [buttonIsClicked, setButtonIsClicked] = useState(null);
//   const [
//     selectedImageFromGalaryforDesktop,
//     setSelectedImageFromGalaryForDesktop,
//   ] = useState(true);
//   const fileInputRef = useRef(null);

//   const handleBackFunction = () => {
//     navigate("/boardBuilder");
//   };

//   const handleImageUpload = async (event) => {
//     console.log("handleImageUpload");
//     // navigate("/create-new-board-galary");

//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = async () => {
//         setSelectedImageFromGalary(reader.result);
//         setSelectedImageFromGalaryForDesktop(reader.result);

//         const formData = new FormData();
//         formData.append("file", file);

//         const storedToken = localStorage.getItem("token");

//         try {
//           const response = await fetch(`${baseURL}/file-upload/uploadFile`, {
//             method: "POST",
//             headers: {
//               Authorization: `Bearer ${storedToken}`,
//             },
//             body: formData,
//           });

//           if (response.ok) {
//             const result = await response.json();
//             const imageUrl = result.data.url;

//             setSelectedImage(imageUrl);
//             sessionStorage.setItem("imagefromGalary", reader.result);
//             sessionStorage.setItem("state", JSON.stringify({ imageUrl }));

//             navigate("/board-builder-edit-board", {
//               state: { imagefromGalary: reader.result, imageUrl },
//             });

//             console.log("imageUrl", imageUrl);
//           } else {
//             console.error(
//               "Failed to upload file",
//               response.status,
//               response.statusText
//             );
//           }
//         } catch (error) {
//           console.error("Error uploading file:", error);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleImageUploadToDesktop = () => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = async () => {
//         setSelectedImageFromGalaryForDesktop(reader.result);

//         const formData = new FormData();
//         formData.append("file", file);

//         const storedToken = localStorage.getItem("token");

//         try {
//           const response = await fetch(`${baseURL}/file-upload/uploadFile`, {
//             method: "POST",
//             headers: {
//               Authorization: `Bearer ${storedToken}`,
//             },
//             body: formData,
//           });

//           if (response.ok) {
//             const result = await response.json();
//             const imageUrl = result.data.url;

//             setSelectedImageFromGalaryForDesktop(imageUrl);

//             sessionStorage.setItem("imagefromGalary", reader.result);
//             sessionStorage.setItem("state", JSON.stringify({ imageUrl }));

//             navigate("/create-new-board-galary", {
//               state: { imagefromGalary: reader.result, imageUrl },
//             });

//             console.log("imageUrl", imageUrl);
//           } else {
//             console.error(
//               "Failed to upload file",
//               response.status,
//               response.statusText
//             );
//           }
//         } catch (error) {
//           console.error("Error uploading file:", error);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handlePhotoFromCamera = () => {
//     navigate("/Camera");
//     // setImageFromCamera(true) ;
//     console.log("clicked on Camera");
//   };

//   const handleBlank = () => {
//     console.log("clicked on blank");
//     setCreateBlankCanvas(true);
//     navigate("/board-builder-edit-board", {
//       state: { createBlankCanvas: true },
//     });
//   };
//   const handleNewBoardCreator = () => {
//     navigate("/create-new-board");
//     setButtonIsClicked("NEW");
//   };

//   const handleSaved = () => {
//     setButtonIsClicked("SAVED");
//     navigate("/create-new-board-saved");
//   };

//   const handleADS = () => {
//     setButtonIsClicked("ADS");
//     navigate("/create-new-board-ADS");
//   };
//   const triggerFileInput = () => {
//     fileInputRef.current.click();
//   };
//   return (
//     <>
//       <div className="container h-auto py-10 bg-[#2A2A2A] lg:hidden">
//         <div className="flex items-center  ">
//           <button className="w-auto h-auto" onClick={handleBackFunction}>
//             <img src={handleBack} className="text-3xl cursor-pointer border-white lg:hidden" />
//           </button>
//           <div className="flex items-center justify-between flex-grow">
//             <img
//               src={BoardBuilderText}
//               className="m-4 p-2 h-auto -pt-1 text-sm text-white w-auto ml-auto"
//             />
//           </div>
//         </div>

//         <div className=" lg:pl-[67px] sm:pl-[47px]  bg-[#2A2A2A] flex justify-center">
//           <div className="border-2 border-dashed border-[#8B8B8B] bg-[#010101] h-[60vh] w-[65vw]  lg:w-[50vw] mb-3"></div>
//         </div>

//         <div className="flex p-3 -py-1  bg-[#2A2A2A] gap-8 justify-center items-center">
//           <label htmlFor="fileInput1" className="cursor-pointer">
//             <img
//               src={fromGalary}
//               alt="From Image"
//               className=" w-22 h-16 lg:w-28 lg:h-24   rounded-xl "
//             />

//             <input
//               type="file"
//               accept="image/*"
//               id="fileInput1"
//               className="hidden"
//               onChange={handleImageUpload}
//             />
//           </label>

//           <label htmlFor="fileInput3" className="cursor-pointer">
//             <img
//               src={fromBlank}
//               alt="From Image"
//               className=" w-22 h-16 lg:w-24 lg:h-24 rounded-xl "
//               onClick={handleBlank}
//             />

//             {createBlankCanvas && (
//               <EditBoard createBlankCanvas={createBlankCanvas} />
//             )}
//           </label>
//         </div>
//       </div>

//       <div className="hidden lg:flex lg:items-center lg:justify-center lg:w-full lg:h-full fixed inset-0">
//         <div className="text-white rounded-lg ">
//           <div className="bg-[#2B2B2B] text-sm flex justify-between p-2 rounded-t-3xl">
//             <span className="ml-2">New Project </span>
//             <span>Select Background For Board </span>
//             <span className="mr-2">X </span>
//           </div>
//           <div className="bg-[#3B3B3B] rounded-b-3xl flex gap-2 p-4 cursor-pointer">
//             <div className="cursor-pointer">
//               {" "}
//               <img src={FrameGalary} className="w-40 h-40 p-1 mt-2 " />
//             </div>

//             <div className="cursor-pointer">
//               {" "}
//               <img src={FrameSaved} className="w-40 h-40  p-1 mt-2" />
//             </div>
//             <div className="cursor-pointer">
//               {" "}
//               <img src={FrameBlank} className="w-40 h-40  p-1 mt-2" />
//             </div>
//           </div>
//         </div>
//         {isTappableVisible && <NewTappable />}
//         <DesktopNavbar />
//       </div>
//     </>
//   );
// };

// export default NewBoard;
