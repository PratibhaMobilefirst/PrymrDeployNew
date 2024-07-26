// import { useDispatch } from "react-redux";
// import eye from "../../../../assets/Eye.svg";
// import pin from "../../../../assets/pin.png";
// import colorcircle from "../../../../assets/colorcircle.png";
// import checkCircleWhite from "../../../../assets/checkCircleWhite.png";
// import React, { useRef, useState } from "react";
// import { AiOutlineArrowLeft } from "react-icons/ai";
// import { useLocation, useNavigate } from "react-router";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { baseURL } from "../../../../Constants/urls";
// import deletee from "../../../../assets/delete.svg";
// import smallAvatar from "../../../../assets/smallAvatar.svg";
// import downarrow from "../../../../assets/downArrow.svg";
// import redDelete from "../../../../assets/redDelete.svg";
// import AddChnageContent from "../../../../assets/hamburger.svg";
// import stars from "../../../../assets/hamburger.svg";
// import LayersPanel from "./Layers";
// import ColorPanel from "./ColorPannel";
// import "./layers.css";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
// import { Carousel } from "react-responsive-carousel";
// const AddContentPage = ({
//   isVisible,
//   tappableContent,
//   lastAddedTappableContent,
//   layer,
// }) => {
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [layerIsClicked, setLayerIsClicked] = useState(false);
//   const [isTapActionOpen, setTapActionOpen] = useState(false);
//   const [isAddContentOpen, setAddContentOpen] = useState(false);
//   const [colorPanelVisible, setColorPanelVisible] = useState(false);
//   const [selectedColor, setSelectedColor] = useState("#4B4B4B");
//   const [isSwiperView, setIsSwiperView] = useState(true);
//   const dispatch = useDispatch();
//   const imageUrl = JSON.parse(sessionStorage.getItem("state"))?.imageUrl;
//   const navigate = useNavigate();
//   const canvasRef = useRef(null);
//   const fabricCanvasRef = useRef(null);
//   const [colorPanelOpen, setColorPanelOpen] = useState(false);
//   const [currentLayerId, setCurrentLayerId] = useState(null);
//   const [isTappableVisible, setIsTappableVisible] = useState(false);
//   const [layers, setLayers] = useState([
//     {
//       id: 1,
//       name: "Layer 1",
//       selectedColor: "#4B4B4B",
//       tappableContent: null,
//       selectedImage: null,
//     },
//   ]);
//   const fileInputRef = useRef(null);
//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//   };
//   const handleImageChange = (event) => {
//     event.preventDefault();

//     let files = event.target.files;
//     let images = [];

//     for (let i = 0; i < files.length; i++) {
//       let reader = new FileReader();
//       let file = files[i];

//       reader.onloadend = () => {
//         images.push({ id: new Date().getTime() + i, url: reader.result });
//         if (images.length === files.length) {
//           setSelectedImages((prevImages) => [...prevImages, ...images]);
//         }
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   const handleBack = () => {
//     navigate("/board-builder-edit-board");
//   };
//   const handleClickChangeContent = () => {
//     fileInputRef.current.click();
//   };

//   const handleLayerAddClick = () => {
//     if (selectedImage) {
//       onAddSticker(selectedImage);
//     }
//   };

//   const handleTapAction = () => {
//     setTapActionOpen(!isTapActionOpen);
//     setLayerIsClicked(false);
//   };

//   const handleAddContent = () => {
//     setAddContentOpen(!isAddContentOpen);
//     setLayerIsClicked(false);
//   };

//   const handleColorCircleClick = (id) => {
//     setCurrentLayerId(id);
//     setColorPanelVisible(true);
//   };

//   const handleColorSelect = (color) => {
//     setLayers(
//       layers.map((layer) =>
//         layer.id === currentLayerId ? { ...layer, selectedColor: color } : layer
//       )
//     );
//     setColorPanelVisible(false);
//   };

//   const handleLayerDeleteClick = (layerId) => {
//     if (layerId === 1) {
//       alert("The first layer cannot be deleted.");
//     } else {
//       setLayers(layers.filter((layer) => layer.id !== layerId));
//       dispatch(setCount(layers.length - 1));
//     }
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
//     dispatch(setCount(layers.length + 1));
//   };

//   const toggleView = () => {
//     console.log("toggle swiper");
//     setIsSwiperView(!isSwiperView);
//   };

//   const handletapbale = () => {
//     setIsTappableVisible(true);
//   };

//   const handleLayerNameChange = (layerId, newName) => {
//     setLayers(
//       layers.map((layer) =>
//         layer.id === layerId ? { ...layer, name: newName } : layer
//       )
//     );
//   };

//   const handleImageDelete = (id) => {
//     setSelectedImages((prevImages) =>
//       prevImages.filter((image) => image.id !== id)
//     );
//   };
//   const handleSave = async (e) => {
   
//     navigate("/board-builder-edit-board");
//   };
//   return (
//     <>
//       <div className="flex lg:pl-[10vw] lg:pr-[10vw] flex-col h-screen overflow-hidden">
//         {/* Render layers */}
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
//         <div className="p-1 rounded-lg mb-2">
//           <div className="flex bg-[#4B4B4B] justify-between items-center shadow-md ">
//             <div className="flex text-white items-center space-x-2">
//               <img src={downarrow} className="h-5 w-5" alt="Down Arrow" />
//               <span>Close</span>
//             </div>

//             <div className="flex items-center justify-center">
//               <img
//                 src={imageUrl}
//                 className="h-12 w-12 rounded-full"
//                 alt="Avatar"
//               />
//             </div>

//             <div className="flex text-white items-center space-x-2">
//               <span>Info Pop-Up</span>
//               <img src={stars} className="h-5 w-5" alt="Stars" />
//             </div>
//           </div>

//           <div className="container mx-auto text-white flex-grow">
//             <div className="relative w-full h-full">
//               <header
//                 onClick={handleBack}
//                 className="flex items-center mt-2 space-x-2 mb-4 cursor-pointer"
//               >
//                 <AiOutlineArrowLeft className="text-xl" />
//                 <span className="text-lg">Back</span>
//               </header>

//               <div className="container top-[100vh] text-white p-2 sm:p-4">
               
//                 <input
//                   type="file"
//                   accept="image/*"
//                   id="fileInput1"
//                   className="hidden"
//                   onChange={handleImageChange}
//                   ref={fileInputRef}
//                   multiple
//                 />
//                 {selectedImages.length === 0 ? (
//                   <div className="h-auto w-auto flex justify-center mt-2">
//                     <button
//                       className="bg-blue-500 w-auto text-white p-2 float-right rounded-full"
//                       onClick={handleClickChangeContent}
//                     >
//                       Add Content
//                     </button>
//                   </div>
//                 ) : (
//                   <Carousel
//                     showThumbs={false}
//                     infiniteLoop
//                     useKeyboardArrows
//                     swipeable
//                     emulateTouch
//                     showStatus={false}
//                     showIndicators={true}
//                     showArrows={true}
//                   >
//                     {" "}
//                     {imageUrl && (
//                       <img
//                         src={imageUrl}
//                         alt="Board"
//                         className="w-full h-[30vh] object-contain mb-2"
//                       />
//                     )}
//                     {selectedImages.map((image) => (
//                       <div key={image.id} className="relative">
//                         <img
//                           src={image.url}
//                           className="w-full  object-contain sm:h-96"
//                           alt="Uploaded Preview"
//                         />

//                         <div className="absolute top-2 right-2">
//                           <img
//                             src={redDelete}
//                             className="w-6 h-6 cursor-pointer"
//                             alt="Red Delete"
//                             onClick={() => handleImageDelete(image.id)}
//                           />
//                         </div>
//                         <div
//                           className="absolute bottom-2 right-2 bg-[#4B4B4B] text-nowrap text-xs text-white cursor-pointer flex items-center p-1 rounded"
//                           onClick={handleClickChangeContent}
//                         >
//                           Add/Change Content
//                           <img
//                             src={AddChnageContent}
//                             className="w-3 h-3 ml-1"
//                             alt="Change Content Icon"
//                           />
//                         </div>
//                       </div>
//                     ))}
//                   </Carousel>
//                 )}
//               </div>
//             </div>
//             <div className="absolute top-1/1 left-0 right-0 bg-black bg-opacity-50 p-4 flex flex-col">
//               <input
//                 className=" text-lg mb-2  bg-transparent text-white border-none resize-none outline-no  overflow-auto"
//                 placeholder="Title Board"
//               />
//               <textarea
//                 className="w-full bg-transparent text-white border-none resize-none outline-none h-[20vh] overflow-auto"
//                 onChange={handleDescriptionChange}
//                 placeholder="Enter Board Description"
//                 style={{ lineHeight: "1.5em" }}
//               />
        
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

// export default AddContentPage;



import React, { useState, useRef } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import checkCircleWhite from "../../../../assets/checkCircleWhite.png";
import redDelete from "../../../../assets/redDelete.svg";
import AddChnageContent from "../../../../assets/hamburger.svg";
import stars from "../../../../assets/hamburger.svg";

const AddContentPage = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { layer } = location.state || {};
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    event.preventDefault();

    let files = event.target.files;
    let images = [];

    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      let file = files[i];

      reader.onloadend = () => {
        images.push({ id: new Date().getTime() + i, url: reader.result });
        if (images.length === files.length) {
          setSelectedImages((prevImages) => [...prevImages, ...images]);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleBack = () => {
    navigate("/board-builder-edit-board");
  };

  const handleClickChangeContent = () => {
    fileInputRef.current.click();
  };

  const handleImageDelete = (id) => {
    if (id === 'tappable-content') {
      if (layer) {
        delete layer.tappableContent;
      }
    } else {
      setSelectedImages((prevImages) =>
        prevImages.filter((image) => image.id !== id)
      );
    }
  };

  const handleSave = async () => {
    navigate("/board-builder-edit-board");
  };

  return (
    <>
      <div className="flex lg:pl-[10vw] lg:pr-[10vw] flex-col h-screen overflow-hidden">
        <div>
          <header
            onClick={handleBack}
            className="flex items-center mt-2 space-x-2 mb-4 cursor-pointer"
          >
            <AiOutlineArrowLeft className="text-xl" />
            <span className="text-lg">Back</span>
          </header>
          <div className="container mx-auto text-white flex-grow">
            <div className="relative w-full h-full">
              <input
                type="file"
                accept="image/*"
                id="fileInput1"
                className="hidden"
                onChange={handleImageChange}
                ref={fileInputRef}
                multiple
              />
              <Carousel
                showThumbs={false}
                infiniteLoop
                useKeyboardArrows
                swipeable
                emulateTouch
                showStatus={false}
                showIndicators={true}
                showArrows={true}
                preventDefaultTouchmoveEvent
              >
                {layer?.tappableContent && (
                  <div className="relative">
                    <img
                      src={layer.tappableContent}
                      className="w-full object-contain sm:h-96 pointer-events-none"
                      alt="Tappable Content"
                    />
                    <div className="absolute top-2 right-2 cursor-pointer" onClick={() => handleImageDelete('tappable-content')}>
                      <img
                        src={redDelete}
                        className="w-6 h-6"
                        alt="Red Delete"
                      />
                    </div>
                    <div
                      className="absolute bottom-2 right-2 bg-[#4B4B4B] text-nowrap text-xs text-white cursor-pointer flex items-center p-1 rounded"
                      onClick={handleClickChangeContent}
                    >
                      Add/Change Content
                      <img
                        src={AddChnageContent}
                        className="w-3 h-3 ml-1"
                        alt="Change Content Icon"
                      />
                    </div>
                  </div>
                )}
                {selectedImages.map((image) => (
                  <div key={image.id} className="relative">
                    <img
                      src={image.url}
                      className="w-full object-contain sm:h-96 pointer-events-none"
                      alt="Uploaded Preview"
                    />
                    <div className="absolute top-2 right-2 cursor-pointer" onClick={() => handleImageDelete(image.id)}>
                      <img
                        src={redDelete}
                        className="w-6 h-6"
                        alt="Red Delete"
                      />
                    </div>
                    <div
                      className="absolute bottom-2 right-2 bg-[#4B4B4B] text-nowrap text-xs text-white cursor-pointer flex items-center p-1 rounded"
                      onClick={handleClickChangeContent}
                    >
                      Add/Change Content
                      <img
                        src={AddChnageContent}
                        className="w-3 h-3 ml-1"
                        alt="Change Content Icon"
                      />
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          <div className="absolute top-1/1 left-0 right-0 bg-black bg-opacity-50 p-4 flex flex-col">
            <input
              className="text-lg mb-2 bg-transparent text-white border-none resize-none outline-none overflow-auto"
              placeholder="Title Board"
            />
            <textarea
              className="w-full bg-transparent text-white border-none resize-none outline-none h-[20vh] overflow-auto"
              placeholder="Enter Board Description"
              style={{ lineHeight: "1.5em" }}
            />
          </div>
          <div
            className="fixed bottom-0 left-[18vw] right-[18vw] bg-blue-400 h-10 mb-5 flex items-center rounded-full justify-center font-bold text-xl text-white cursor-pointer"
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
      <ToastContainer />
    </>
  );
};

export default AddContentPage;
