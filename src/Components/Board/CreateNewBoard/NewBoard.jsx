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

const NewBoard = () => {
  const navigate = useNavigate();
  const [selectedImageFromGalary, setSelectedImageFromGalary] = useState(true);
  const [selectImageFromCamera, setImageFromCamera] = useState(false);
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
    <div className="container bg-[#2A2A2A] ">
      <div className="flex items-center  ">
        <button className="w-auto h-auto" onClick={handleBackFunction}>
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
        <div className="border-2 border-dashed border-[#8B8B8B] bg-[#010101] h-[70vh] w-[65vw]  mb-3">
          {/* {  selectedImageFromGalary && (
            <img src={selectedImageFromGalary} alt="Selected" className="h-full w-full object-contain " />
          ) } */}
        </div>
      </div>

      <div className="flex py-3 bg-[#2A2A2A] text-[#8B8B8B]">
        <h1 className="font-bold text-sm pl-5 mx-5 ">Add Board Background</h1>
        <img src={questionmarkcircle} className="ml-auto px-14" />
      </div>

      <div className="flex p-3 py-2  bg-[#2A2A2A] gap-8 justify-center items-center">
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
            className=" w-22 h-16 lg:w-24 lg:h-24 rounded-xl "
            onClick={handleBlank}
          />

          {createBlankCanvas && (
            <EditBoard createBlankCanvas={createBlankCanvas} />
          )}
        </label>
      </div>
    </div>
  );
};

export default NewBoard;

// Added Web Cam

// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router";
// import "./board.css";
// import fromGalary from "../../assets/fromGalary.svg";
// import fromBlank from "../../assets/fromBlank.svg";
// import fromPhone from "../../assets/fromPhone.svg";
// import Line from "../../assets/Line.svg";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import Webcam from "react-webcam";

// // import "./newBoard.css";
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/pagination";

// // import required modules
// import { FreeMode, Pagination } from "swiper/modules";
// import ImageFromCamera from "./ImageFromCamera";
// import EditBoard from "./EditBoard";

// const NewBoard = ({ onImageSelect }) => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   // const [showImageFromCamera, setShowImageFromCamera] = useState(false);
//   const [cameraimage, setCameraImage] = useState(null);
//   const [showCamera, setShowCamera] = useState(false);
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const navigate = useNavigate();

//   // -------------Web Cam---------------------
//   const handleCameraClick = () => {
//     setShowCamera(true);
//     console.log("showcam true");
//   };

//   const capture = useCallback(() => {
//     const cameraImageSrc = webcamRef.current.getScreenshot();
//     setCameraImage(cameraImageSrc);
//     setShowCamera(false);
//   }, [webcamRef]);

//   const drawImageOnCanvas = (cameraImageSrc) => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const img = new CameraImage();
//     img.src = cameraImageSrc;
//     img.onload = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.drawCameraImage(img, 0, 0, canvas.width, canvas.height);
//     };
//   };

//   React.useEffect(() => {
//     if (cameraImage) {
//       drawCameraImageOnCanvas(cameraImage);
//     }
//   }, [cameraImage]);

//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) {
//       console.error("No file selected.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     const storedToken = localStorage.getItem("token");

//     try {
//       const response = await fetch(
//         "https://prymr-dev-backend.vercel.app/api/file-upload/uploadFile",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${storedToken}`,
//           },
//           body: formData,
//         }
//       );

//       if (response.ok) {
//         const result = await response.json();
//         const imageUrl = result.data.url;

//         setSelectedImage(imageUrl);
//         navigate(
//           `/board-builder-edit-board?image=${encodeURIComponent(imageUrl)}`
//         );
//       } else {
//         console.error(
//           "Failed to upload file",
//           response.status,
//           response.statusText
//         );
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   };

//   // const handleCameraClick = () => {
//   //   console.log("clicked on cam");
//   //   setShowImageFromCamera(true);
//   // };
//   const handleBlankUpload = () => {};

//   return (
//     <div className="flex flex-col items-center mt-1">
//       <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-4">
//         <div className="">
//           <label htmlFor="fileInput1">
//             <img src={fromGalary} alt="From Image" className="cursor-pointer" />
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             id="fileInput1"
//             className="hidden"
//             onChange={handleImageUpload}
//           />
//         </div>

//         <div className="">
//           <label htmlFor="fileInput2">
//             <img
//               src={fromPhone}
//               alt="From Image"
//               className="cursor-pointer"
//               onClick={handleCameraClick}
//             />
//           </label>
//           {/* <input
//             type="file"
//             accept="image/*"
//             id="fileInput2"
//             className="hidden"
//             onChange={handleCameraClick}
//           /> */}

//           {showCamera && (
//             <div className="flex flex-col items-center">
//               <Webcam
//                 audio={false}
//                 ref={webcamRef}
//                 screenshotFormat="image/jpeg"
//                 className="w-full h-64 bg-gray-300"
//               />
//               <button
//                 onClick={capture}
//                 className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//               >
//                 Capture Photo
//               </button>
//             </div>
//           )}
//           {/* <EditBoard
//             ref={canvasRef}
//             width={640}
//             height={480}
//             className="border border-gray-500"
//           /> */}
//           {image && <EditBoard image={image} />}
//         </div>
//         <div className="">
//           <label htmlFor="fileInput3">
//             <img src={fromBlank} alt="From Image" className="cursor-pointer" />
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             id="fileInput3"
//             className="hidden"
//             onChange={handleBlankUpload}
//           />
//         </div>
//       </div>
//       {selectedImage && (
//         <div className="selected-image-container mt-4">
//           <img src={selectedImage} alt="Selected" className="selected-image" />
//         </div>
//       )}
//       <div className="flex flex-wrap justify-center items-center gap-4 mt-2"></div>
//       <img className="m-3" src={Line} alt="Line" />

//       <div className="float-left flex justify-start w-full gap-1 text-white">
//         <div className="p-1"> Phone / </div>
//         <div className="p-1"> Saved / </div>
//         <div className="p-1"> Gif </div>
//       </div>
//       <Swiper
//         slidesPerView={3}
//         spaceBetween={15}
//         freeMode={true}
//         pagination={{
//           clickable: true,
//         }}
//         modules={[FreeMode, Pagination]}
//         className="mySwiper"
//       >
//         {Array.from({ length: 7 }).map((_, index) => (
//           <SwiperSlide>
//             <img
//               className="h-48 object-cover"
//               src="https://w0.peakpx.com/wallpaper/193/363/HD-wallpaper-white-flower-daisy-flores-flowers-sunflowers-vintage-thumbnail.jpg"
//               alt="flower"
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <div className="float-left flex justify-start w-full py-1 text-white">
//         Continue Editing
//       </div>
//       <Swiper
//         slidesPerView={3}
//         spaceBetween={15}
//         freeMode={true}
//         pagination={{
//           clickable: true,
//         }}
//         modules={[FreeMode, Pagination]}
//         className="mySwiper"
//       >
//         {Array.from({ length: 7 }).map((_, index) => (
//           <SwiperSlide>
//             <div className="mt-2 bg-slate-800 p-2 rounded-md">
//               <img
//                 src="https://img.freepik.com/free-photo/purple-osteospermum-daisy-flower_1373-16.jpg"
//                 alt="flower"
//               />
//               <div className="flex justify-between">
//                 <div className="text-slate-200">
//                   <p className="bg-slate-100 mt-1 rounded-lg px-1 py-[2px] text-sm text-black w-20 text-center">
//                     draft
//                   </p>
//                   <h3 className="text-xl font-semibold">Hindi Shadow</h3>
//                   <span className="text-slate-400 text-sm">
//                     Last updated : 20/03/2002
//                   </span>
//                 </div>
//                 <BsThreeDotsVertical className="text-slate-200" />
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//     // </div>
//   );
// };

// export default EditBoard;
