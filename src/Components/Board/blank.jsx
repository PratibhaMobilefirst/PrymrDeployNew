//Layers working fine

// import React, { useEffect, useRef, useState, useContext } from "react";
// import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
// import { fabric } from "fabric";
// import Hammer from "hammerjs";
// import { toast } from "react-toastify";
// import ActionBar from "./ActionBar/ActionBar";
// import { ImageContext } from "../Board/ImageContext/ImageContext";

// const EditBoard = () => {
//   const { editor, onReady } = useFabricJSEditor();
//   const { imageUrl } = useContext(ImageContext); // Use context to get imageUrl
//   const [isPanZoomEnabled, setIsPanZoomEnabled] = useState(false);
//   const [layers, setLayers] = useState([]); // Add layers state
//   const canvasRef = useRef(null);

//   const addImagesToCanvas = () => {
//     const canvas = editor?.canvas;
//     if (!canvas) {
//       toast.error("Canvas not found!");
//       console.log("Canvas not found!");
//       return;
//     }

//     canvas.clear(); // Clear the canvas before adding new layers

//     // Add images from layers array
//     layers.forEach((layer) => {
//       fabric.Image.fromURL(
//         layer.imageUrl,
//         function (oImg) {
//           oImg.set({
//             selectable: true,
//             evented: true,
//             left: layer.left || canvas.width / 2,
//             top: layer.top || canvas.height / 2,
//             originX: "center",
//             originY: "center",
//             hasControls: true,
//             hasBorders: true,
//           });
//           canvas.add(oImg);
//           canvas.moveTo(oImg, layer.zIndex); // Set z-index
//           canvas.requestRenderAll();
//         },
//         {
//           crossOrigin: "",
//         }
//       );
//     });

//     console.log("Images loaded and added to canvas");
//   };

//   useEffect(() => {
//     const canvas = editor?.canvas;
//     if (!canvas) return;

//     // Set the background image (non-selectable)
//     if (imageUrl) {
//       fabric.Image.fromURL(
//         imageUrl,
//         function (img) {
//           canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
//             scaleX: canvas.width / img.width,
//             scaleY: canvas.height / img.height,
//             selectable: false,
//             evented: false,
//           });
//         },
//         {
//           crossOrigin: "",
//         }
//       );
//     }
//   }, [editor?.canvas, imageUrl]);

//   useEffect(() => {
//     if (editor?.canvas && imageUrl) {
//       // Add the image from the context as a layer
//       setLayers((prevLayers) => [
//         ...prevLayers,
//         { imageUrl, zIndex: prevLayers.length },
//       ]);
//     }
//   }, [editor?.canvas, imageUrl]);

//   useEffect(() => {
//     addImagesToCanvas();
//   }, [editor?.canvas, layers]);

//   // Pan and zoom handlers (same as before)...

//   return (
//     <div className="App">
//       <div className="canvas-container" ref={canvasRef}>
//         <FabricJSCanvas className="fabric-canvas" onReady={onReady} />
//         <ActionBar imageUrl={imageUrl} className="" />
//       </div>
//     </div>
//   );
// };

// export default EditBoard;

// // bag working fine

// import React, { useEffect, useRef, useState, useContext } from "react";
// import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
// import { fabric } from "fabric";

// import Hammer from "hammerjs";
// import { useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import ActionBar from "./ActionBar/ActionBar";
// import { ImageContext } from "./ImageContext/ImageContext";

// const EditBoard = () => {
//   const { editor, onReady } = useFabricJSEditor();
//   const [isPanZoomEnabled, setIsPanZoomEnabled] = useState(false);
//   const canvasRef = useRef(null);
//   const location = useLocation();
//   const imageUrl = new URLSearchParams(location.search).get("image");
//   const { imageUrl } = useContext(ImageContext);

//   useEffect(() => {
//     const canvas = editor?.canvas;
//     if (!canvas) {
//       toast.error("Canvas not found!");
//       console.log("Canvas not found!");
//       return;
//     }

//     fabric.Image.fromURL(
//       imageUrl,
//       function (oImg) {
//         oImg.set({
//           selectable: false,
//           evented: false,
//         });

//         canvas.setWidth(oImg.width);
//         canvas.setHeight(window.innerHeight);

//         const canvasContainer = canvas.getElement().parentNode;
//         canvasContainer.style.width = `${oImg.width}px`;
//         canvasContainer.style.height = `${window.innerHeight}px`;

//         editor?.canvas.add(oImg);
//         editor?.canvas.requestRenderAll();

//         console.log("Image loaded and added to canvas");
//       },
//       {
//         crossOrigin: "",
//         id: `background-${getRandomNumber(100000, 999999999)}`,
//         isClosed: false,
//         eventName: "",
//         eventDescription: "",
//       }
//     );
//   }, [editor?.canvas]);

//   useEffect(() => {
//     const canvas = editor?.canvas;
//     if (!canvas) return;

//     let isDragging = false;
//     let lastPosX, lastPosY;

//     const handleMouseDown = (opt) => {
//       if ((opt.e.altKey || opt.e.touches) && isPanZoomEnabled) {
//         isDragging = true;
//         canvas.selection = false;
//         lastPosX = opt.e.clientX || opt.e.touches[0].clientX;
//         lastPosY = opt.e.clientY || opt.e.touches[0].clientY;
//       }
//     };

//     const handleMouseMove = (opt) => {
//       if (isDragging && isPanZoomEnabled) {
//         const e = opt.e;
//         const vpt = canvas.viewportTransform;
//         vpt[4] += (e.clientX || e.touches[0].clientX) - lastPosX;
//         vpt[5] += (e.clientY || e.touches[0].clientY) - lastPosY;
//         canvas.requestRenderAll();
//         lastPosX = e.clientX || e.touches[0].clientX;
//         lastPosY = e.clientY || e.touches[0].clientY;
//       }
//     };

//     const handleMouseUp = () => {
//       isDragging = false;
//       canvas.selection = true;
//     };

//     const handleWheel = (opt) => {
//       if (!isPanZoomEnabled) return;

//       const delta = opt.e.deltaY;
//       let zoom = canvas.getZoom();
//       zoom *= 0.999 ** delta;
//       if (zoom > 20) zoom = 20;
//       if (zoom < 0.01) zoom = 0.01;
//       canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
//       opt.e.preventDefault();
//       opt.e.stopPropagation();
//     };

//     if (isPanZoomEnabled) {
//       canvas.on("mouse:down", handleMouseDown);
//       canvas.on("mouse:move", handleMouseMove);
//       canvas.on("mouse:up", handleMouseUp);
//       canvas.on("mouse:wheel", handleWheel);
//     }

//     return () => {
//       canvas.off("mouse:down", handleMouseDown);
//       canvas.off("mouse:move", handleMouseMove);
//       canvas.off("mouse:up", handleMouseUp);
//       canvas.off("mouse:wheel", handleWheel);
//     };
//   }, [editor?.canvas, isPanZoomEnabled]);

//   //alway enable aur adding ele then it would be disable until the user uses canvas

//   // Initialize Hammer.js and add pinch event listener
//   useEffect(() => {
//     const canvasContainer = document.querySelector(".canvas-container");
//     const hammer = new Hammer(canvasContainer);
//     hammer.get("pinch").set({ enable: true });

//     let lastScale = 1;

//     hammer.on("pinchstart pinchmove", (ev) => {
//       if (!isPanZoomEnabled) return;

//       const canvas = editor?.canvas;
//       if (!canvas) return;

//       const scale = ev.scale / lastScale;
//       lastScale = ev.scale;

//       const zoom = canvas.getZoom() * scale;
//       if (zoom > 20) return;
//       if (zoom < 0.01) return;

//       canvas.zoomToPoint(new fabric.Point(ev.center.x, ev.center.y), zoom);
//     });

//     hammer.on("pinchend", () => {
//       lastScale = 1;
//     });

//     return () => {
//       hammer.off("pinchstart pinchmove");
//       hammer.off("pinchend");
//     };
//   }, [editor?.canvas, isPanZoomEnabled]);

//   useEffect(() => {
//     const canvas = editor?.canvas;
//     if (canvas) {
//       canvasRef.current = canvas;
//     }
//   }, [editor?.canvas]);

//   function getRandomNumber(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }

//   return (
//     <div className="App ">
//       <div className="canvas-container" ref={canvasRef}>
//         <div className="canvas-container" ref={canvasRef}>
//           <FabricJSCanvas className="fabric-canvas" onReady={onReady} />
//           <ActionBar imageUrl={imageUrl} className=" " />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditBoard;

import React from "react";

const Blank = () => {
  return (
    <>
      <div className="relative bg-blue-500 flex px-2 py-1 w-[8%] justify-content-center p-2 rounded-3xl ">
        {/* <img src={imageUrl.src} alt="Layer" className="w-full h-auto" /> */}
        {/* {selectedImage && ( */}
        <img
          src={checkSave}
          className=" bg-blue-500 w-50 h-50 text-white px-2 py-1 rounded"
        />
        <img src={fineWhiteLine} />
        <img
          src={deletee}
          className=" bg-blue-500  w-50 h-50 text-white px-2 py-1 rounded"
        />
        <div></div>
      </div>
    </>
  );
};

export default Blank;

//Added Web Cam

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

// export default NewBoard;
