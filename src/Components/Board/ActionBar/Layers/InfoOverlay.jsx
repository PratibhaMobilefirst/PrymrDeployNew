// import React, { useState } from "react";
// import { AiOutlineArrowLeft } from "react-icons/ai";
// import { useLocation, useNavigate } from "react-router";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Line68 from "../../../../assets/Line68.png";
// import crossCircle from "../../../../assets/crossCircle.png";
// import checkCircle from "../../../../assets/checkCircleblack.png";
// import checkCircleWhite from "../../../../assets/checkCircleWhite.png";
// import crossCircleWhite from "../../../../assets/x-circle.png";
// import questionmarkcircle from "../../../../assets/questionmarkcircle.svg";
// import comment from "../../../../assets/comment.svg";
// import { baseURL } from "../../../../Constants/urls";
// import eye from "../../../../assets/Eye.svg";
// import pin from "../../../../assets/pin.png";
// import deletee from "../../../../assets/delete.svg";
// import colorcircle from "../../../../assets/colorcircle.png";
// import smallAvatar from "../../../../assets/smallAvatar.svg";
// import downarrow from "../../../../assets/downArrow.svg";
// import stars from "../../../../assets/hamburger.svg";
// import ColorPanel from "./ColorPannel";

// const InfoOverlay = () => {
//   const [selectedRating, setSelectedRating] = useState("G");
//   const [title, setTitle] = useState("Enter Title");
//   const [description, setDescription] = useState("");
//   const [allowComments, setAllowComments] = useState(false);
//   const [isCheckCircleToggled, setIsCheckCircleToggled] = useState(false);
//   const [isCrossCircleToggled, setIsCrossCircleToggled] = useState(false);
//   const location = useLocation();
//   const imageUrl = JSON.parse(sessionStorage.getItem("state"))?.imageUrl;
//   const navigate = useNavigate();
//   const [colorPanelOpen, setColorPanelOpen] = useState(false);
//   const [colorPanelVisible, setColorPanelVisible] = useState(false);
//   const [currentLayerId, setCurrentLayerId] = useState(null);
//   const [layers, setLayers] = useState([
//     {
//       id: 1,
//       name: "Layer 1",
//       selectedColor: "#4B4B4B",
//       tappableContent: null,
//       selectedImage: null,
//     },
//   ]);

//   const handleBack = () => {
//     navigate("/board-builder-edit-board");
//   };

//   const handleColorCircleClick = (id) => {
//     setCurrentLayerId(id);
//     setColorPanelVisible(true);
//   };

//   const handleNewLayerAddClick = () => {
//     const newLayerId = layers.length + 1;

//     setLayers([
//       ...layers,
//       {
//         id: newLayerId,
//         name: `Layer ${newLayerId}`,
//         selectedColor: "#4B4B4B",
//         tappableContent: null,
//         selectedImage: null,
//       },
//     ]);
//   };
//   const handleColorSelect = (color) => {
//     setLayers(
//       layers?.map((layer) =>
//         layer.id === currentLayerId ? { ...layer, selectedColor: color } : layer
//       )
//     );
//     setColorPanelVisible(false);
//   };
//   const handleSave = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     if (!title.trim()) {
//       toast.error("Please enter a title for the board.");
//       return;
//     }

//     const postData = JSON.stringify({
//       imageUrl: imageUrl,
//       title: title,
//       description: description,
//       allowComments: allowComments,
//     });

//     try {
//       const response = await fetch(`${baseURL}/board/addBoardInfo`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: postData,
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success(data.message);
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }

//     navigate("/board-builder-edit-board");
//   };

//   const handleTitleChange = (e) => {
//     setTitle(e.target.value);
//   };

//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//   };

//   const [selectedOption, setSelectedOption] = useState(null);
//   const [selectedForSaleOption, setSelectedForSaleOption] = useState(null);

//   const handleYesClick = () => {
//     setSelectedOption(selectedOption === "yes" ? null : "yes");
//     setSelectedForSaleOption(selectedOption === "yes" ? null : "yes");
//   };

//   const handleNoClick = () => {
//     setSelectedOption(selectedOption === "no" ? null : "no");
//     setSelectedForSaleOption(selectedOption === "no" ? null : "no");
//   };

//   return (
//     <>
//       <div className="flex lg:pl-[10vw] lg:pr-[10vw] flex-col h-screen overflow-hidden">
//         {/ Render layers /}
//         <div className=" ">
//           {layers.map((layer) => (
//             <div
//               key={layer.id}
//               className="flex items-center h-9 justify-between p-2 mb-1"
//               style={{
//                 backgroundColor: layer.selectedColor,
//                 borderRadius: "0.25rem",
//               }}
//             >
//               <input
//                 type="text"
//                 value={layer.name}
//                 onChange={(e) =>
//                   handleLayerNameChange(layer.id, e.target.value)
//                 }
//                 className="text-sm bg-transparent border-none outline-none text-white"
//               />

//               <div
//                 className={`flex h-8 w-60 transition-transform duration-30 ease-in-out bg-[#4B4B4B] ${
//                   colorPanelVisible && currentLayerId === layer.id
//                     ? "transform -translate-x-20"
//                     : ""
//                 }`}
//               >
//                 <button
//                   onClick={() => setLayerIsClicked(!layerIsClicked)}
//                   className="p-2"
//                 >
//                   <img src={eye} className="h-[10px] w-[10px]" alt="Eye Icon" />
//                 </button>
//                 <button onClick={handleNewLayerAddClick} className="p-0 ml-2">
//                   <img src={pin} className="h-8 w-8" alt="Pin Icon" />
//                 </button>
//                 <button
//                   onClick={() => handleLayerDeleteClick(layer.id)}
//                   className="p-1 ml-2"
//                 >
//                   <img src={deletee} className="w-[29px]" alt="Delete Icon" />
//                 </button>
//                 <button
//                   onClick={() => handleColorCircleClick(layer.id)}
//                   className={`p-1 ml-2 ${
//                     colorPanelVisible && currentLayerId === layer.id
//                       ? "hidden"
//                       : ""
//                   }`}
//                 >
//                   <img
//                     src={colorcircle}
//                     className="w-[25px]"
//                     alt="Color Circle Icon"
//                   />
//                 </button>

//                 {colorPanelVisible && currentLayerId === layer.id && (
//                   <div className="absolute left-16 top-0 z-10">
//                     <div className="overflow-y-auto">
//                       <ColorPanel onSelectColor={handleColorSelect} />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="flex bg-[#4B4B4B] justify-between items-center shadow-md ">
//           <div className="flex text-white items-center space-x-2">
//             <img src={downarrow} className="h-5 w-5" alt="Down Arrow" />
//             <span>Close</span>
//           </div>

//           <div className="flex items-center justify-center">
//             <img
//               src={imageUrl}
//               className="h-12 w-12 rounded-full"
//               alt="Avatar"
//             />
//           </div>

//           <div className="flex text-white items-center space-x-2">
//             <span>Info Pop-Up</span>
//             <img src={stars} className="h-5 w-5" alt="Stars" />
//           </div>
//         </div>

//         <div className="container  text-white flex-grow">
//           <div className="relative ">
//             <header
//               onClick={handleBack}
//               className="flex items-center mt- space-x-2 mb-4 cursor-pointer"
//             >
//               <AiOutlineArrowLeft className="text-sm" />
//               <span className="text-sm">Back</span>
//             </header>

//             <img
//               src={imageUrl}
//               alt="Board"
//               className="w-full h-[30vh] object-contain "
//             />
//             <div className="flex justify-around m-3">
//               <div className="flex gap-2 mt-3 cursor-pointer">
//                 <img src={comment} className="w-5 h-5" alt="Comments" />
//                 Comments
//                 <img src={Line68} className="pl-5 h-6" alt="Line" />
//               </div>

//               <div className="flex gap-2">
//                 <div
//                   className="flex-col cursor-pointer"
//                   onClick={handleYesClick}
//                 >
//                   <img
//                     src={
//                       selectedOption === "yes" ? checkCircleWhite : checkCircle
//                     }
//                     className="cursor-pointer w-8 h-8"
//                     alt="Check Circle"
//                   />
//                   <span>Yes</span>
//                 </div>
//                 <div
//                   className="flex-col cursor-pointer"
//                   onClick={handleNoClick}
//                 >
//                   <img
//                     src={
//                       selectedOption === "no" ? crossCircleWhite : crossCircle
//                     }
//                     className="w-8 h-8"
//                     alt="Cross Circle"
//                   />
//                   <span>No</span>
//                 </div>
//               </div>
//               <img src={questionmarkcircle} alt="Question Mark" />
//             </div>
//             <div className="">
//               <div className="relative top-1/3 m-1  flex">
//                 <div className="flex gap-3 p-2 pl-2  pr-2 border-2 rounded-full">
//                   <div className="mt-1"> For Sale</div>
//                   <img src={Line68} />
//                   <div className="flex gap-2">
//                     <div
//                       className="flex-col cursor-pointer"
//                       onClick={handleYesClick}
//                     >
//                       <img
//                         src={
//                           selectedOption === "yes"
//                             ? checkCircleWhite
//                             : checkCircle
//                         }
//                         className="cursor-pointer w-8 h-8"
//                         alt="Check Circle"
//                       />
//                     </div>
//                     <div
//                       className="flex-col cursor-pointer"
//                       onClick={handleNoClick}
//                     >
//                       <img
//                         src={
//                           selectedOption === "no"
//                             ? crossCircleWhite
//                             : crossCircle
//                         }
//                         className="w-8 h-8"
//                         alt="Cross Circle"
//                       />
//                     </div>
//                   </div>
//                 </div>{" "}
//               </div>
//             </div>

//             <div className="absolute top-1/1 left-0 right-0 bg-black bg-opacity-50 p-4 flex flex-col">
//               <input
//                 className=" text-lg mb-2  bg-transparent text-white border-none resize-none outline-no  overflow-auto"
//                 placeholder="Title Board"
//               />
//               <textarea
//                 className="w-full bg-transparent text-white border-none resize-none outline-none h-[20vh] overflow-auto"
//                 value={description}
//                 onChange={handleDescriptionChange}
//                 placeholder="Enter Board Description"
//                 style={{ lineHeight: "1.5em" }}
//               />
//               <div className="text-white mt-2">
//                 {description.split("\n").map((line, index) => (
//                   <div key={index} className="border-b border-white"></div>
//                 ))}
//               </div>
//             </div>

//             <div
//               className="fixed bottom-0 left-[18vw] right-[18vw]  bg-blue-400 h-10 mb-5 flex items-center  rounded-full justify-center font-bold text-xl text-white cursor-pointer"
//               onClick={handleSave}
//             >
//               Save
//               <img
//                 src={checkCircleWhite}
//                 alt="Check Circle White"
//                 className="ml-3 w-5 h-5"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </>
//   );
// };

// export default InfoOverlay;
import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Line68 from "../../../../assets/Line68.png";
import crossCircle from "../../../../assets/crossCircle.png";
import checkCircle from "../../../../assets/checkCircleblack.png";
import checkCircleWhite from "../../../../assets/checkCircleWhite.png";
import crossCircleWhite from "../../../../assets/x-circle.png";
import questionmarkcircle from "../../../../assets/questionmarkcircle.svg";
import comment from "../../../../assets/comment.svg";
import { baseURL } from "../../../../Constants/urls";
import eye from "../../../../assets/Eye.svg";
import pin from "../../../../assets/pin.png";
import deletee from "../../../../assets/delete.svg";
import colorcircle from "../../../../assets/colorcircle.png";
import smallAvatar from "../../../../assets/smallAvatar.svg";
import downarrow from "../../../../assets/downArrow.svg";
import stars from "../../../../assets/hamburger.svg";
import ColorPanel from "./ColorPannel";

const InfoOverlay = () => {
  const [selectedRating, setSelectedRating] = useState("G");
  const [title, setTitle] = useState("Enter Title");
  const [description, setDescription] = useState("");
  const [allowComments, setAllowComments] = useState(false);
  const [isCheckCircleToggled, setIsCheckCircleToggled] = useState(false);
  const [isCrossCircleToggled, setIsCrossCircleToggled] = useState(false);
  const location = useLocation();
  const imageUrl = JSON.parse(sessionStorage.getItem("state"))?.imageUrl;
  const navigate = useNavigate();
  const [colorPanelOpen, setColorPanelOpen] = useState(false);
  const [colorPanelVisible, setColorPanelVisible] = useState(false);
  const [currentLayerId, setCurrentLayerId] = useState(null);
  const [layers, setLayers] = useState([
    {
      id: 1,
      name: "Layer 1",
      selectedColor: "#4B4B4B",
      tappableContent: null,
      selectedImage: null,
    },
  ]);

  const handleBack = () => {
    navigate("/board-builder-edit-board");
  };

  const handleColorCircleClick = (id) => {
    setCurrentLayerId(id);
    setColorPanelVisible(true);
  };

  const handleNewLayerAddClick = () => {
    const newLayerId = layers.length + 1;

    setLayers([
      ...layers,
      {
        id: newLayerId,
        name: `Layer ${newLayerId}`,
        selectedColor: "#4B4B4B",
        tappableContent: null,
        selectedImage: null,
      },
    ]);
  };

  const handleColorSelect = (color) => {
    setLayers(
      layers.map((layer) =>
        layer.id === currentLayerId ? { ...layer, selectedColor: color } : layer
      )
    );
    setColorPanelVisible(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!title.trim()) {
      toast.error("Please enter a title for the board.");
      return;
    }

    const postData = JSON.stringify({
      imageUrl: imageUrl,
      title: title,
      description: description,
      allowComments: allowComments,
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

      if (response.ok) {
        toast.success(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    navigate("/board-builder-edit-board");
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCommentOption, setSelectedCommentOption] = useState(null);
  const [selectedForSaleOption, setSelectedForSaleOption] = useState(null);
  const [selectedForCommentOption, setSelectedForCommentOption] = useState(null);

  const handleYesClick = () => {
    setSelectedOption(selectedOption === "yes" ? null : "yes");
    setSelectedForSaleOption(selectedOption === "yes" ? null : "yes");
  };

  const handleNoClick = () => {
    setSelectedOption(selectedOption === "no" ? null : "no");
    setSelectedForSaleOption(selectedOption === "no" ? null : "no");
  };

  const handleCommentYesClick = () => {
    setSelectedCommentOption(selectedCommentOption === "yes" ? null : "yes");
    setSelectedForCommentOption(selectedCommentOption === "yes" ? null : "yes");
  };

  const handleCommentNoClick = () => {
    setSelectedCommentOption(selectedCommentOption === "no" ? null : "no");
    setSelectedForCommentOption(selectedCommentOption === "no" ? null : "no");
  };

  return (
    <>
      <div className="flex lg:pl-[10vw] lg:pr-[10vw] flex-col h-screen overflow-hidden">
        <div className=" ">
          {layers?.map((layer) => (
            <div
              key={layer.id}
              className="flex items-center h-9 justify-between p-2 mb-1"
              style={{
                backgroundColor: layer.selectedColor,
                borderRadius: "0.25rem",
              }}
            >
              <input
                type="text"
                value={layer.name}
                onChange={(e) =>
                  handleLayerNameChange(layer.id, e.target.value)
                }
                className="text-sm bg-transparent border-none outline-none text-white"
              />
              <div
                className={`flex h-8 w-60 transition-transform duration-30 ease-in-out bg-[#4B4B4B] ${
                  colorPanelVisible && currentLayerId === layer.id
                    ? "transform -translate-x-20"
                    : ""
                }`}
              >
                <button
                  onClick={() => setLayerIsClicked(!layerIsClicked)}
                  className="p-2"
                >
                  <img src={eye} className="h-[10px] w-[10px]" alt="Eye Icon" />
                </button>
                <button onClick={handleNewLayerAddClick} className="p-0 ml-2">
                  <img src={pin} className="h-8 w-8" alt="Pin Icon" />
                </button>
                <button
                  onClick={() => handleLayerDeleteClick(layer.id)}
                  className="p-1 ml-2"
                >
                  <img src={deletee} className="w-[29px]" alt="Delete Icon" />
                </button>
                <button
                  onClick={() => handleColorCircleClick(layer.id)}
                  className={`p-1 ml-2 ${
                    colorPanelVisible && currentLayerId === layer.id
                      ? "hidden"
                      : ""
                  }`}
                >
                  <img
                    src={colorcircle}
                    className="w-[25px]"
                    alt="Color Circle Icon"
                  />
                </button>

                {colorPanelVisible && currentLayerId === layer.id && (
                  <div className="absolute left-16 top-0 z-10">
                    <div className="overflow-y-auto">
                      <ColorPanel onSelectColor={handleColorSelect} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex bg-[#4B4B4B] justify-between items-center shadow-md ">
          <div className="flex text-white items-center space-x-2">
            <img src={downarrow} className="h-5 w-5" alt="Down Arrow" />
            <span>Close</span>
          </div>

          <div className="flex items-center justify-center">
            <img
              src={imageUrl}
              className="h-12 w-12 rounded-full"
              alt="Avatar"
            />
          </div>

          <div className="flex text-white items-center space-x-2">
            <span>Info Pop-Up</span>
            <img src={stars} className="h-5 w-5" alt="Stars" />
          </div>
        </div>

        <div className="container  text-white flex-grow">
          <div className="relative ">
            <header
              onClick={handleBack}
              className="flex items-center mt- space-x-2 mb-4 cursor-pointer"
            >
              <AiOutlineArrowLeft className="text-sm" />
              <span className="text-sm">Back</span>
            </header>

            <img
              src={imageUrl}
              alt="Board"
              className="w-full h-[30vh] object-contain "
            />
            <div className="flex justify-around m-3">
              <div className="flex gap-2 mt-3 cursor-pointer">
                <img src={comment} className="w-5 h-5" alt="Comments" />
                Comments
                <img src={Line68} className="pl-5 h-6" alt="Line" />
              </div>

              <div className="flex gap-2">
                <div
                  className="flex-col cursor-pointer"
                  onClick={handleCommentYesClick}
                >
                  <img
                    src={
                      selectedCommentOption === "yes" ? checkCircleWhite : checkCircle
                    }
                    className="cursor-pointer w-8 h-8"
                    alt="Check Circle"
                  />
                  <span>Yes</span>
                </div>
                <div
                  className="flex-col cursor-pointer"
                  onClick={handleCommentNoClick}
                >
                  <img
                    src={
                      selectedCommentOption === "no" ? crossCircleWhite : crossCircle
                    }
                    className="w-8 h-8"
                    alt="Cross Circle"
                  />
                  <span>No</span>
                </div>
              </div>
              <img src={questionmarkcircle} alt="Question Mark" />
            </div>
            <div className="">
              <div className="relative top-1/3 m-1  flex">
                <div className="flex gap-3 p-2 pl-2  pr-2 border-2 rounded-full">
                  <div className="mt-1"> For Sale</div>
                  <img src={Line68} />
                  <div className="flex gap-2">
                    <div
                      className="flex-col cursor-pointer"
                      onClick={handleYesClick}
                    >
                      <img
                        src={
                          selectedOption === "yes"
                            ? checkCircleWhite
                            : checkCircle
                        }
                        className="cursor-pointer w-8 h-8"
                        alt="Check Circle"
                      />
                    </div>
                    <div
                      className="flex-col cursor-pointer"
                      onClick={handleNoClick}
                    >
                      <img
                        src={
                          selectedOption === "no"
                            ? crossCircleWhite
                            : crossCircle
                        }
                        className="w-8 h-8"
                        alt="Cross Circle"
                      />
                    </div>
                  </div>
                </div>{" "}
              </div>
            </div>

            <div className="absolute top-1/1 left-0 right-0 bg-black bg-opacity-50 p-4 flex flex-col">
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
      </div>
      <ToastContainer />
    </>
  );
};

export default InfoOverlay;
