
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { Stage, Layer, Image as KonvaImage, Circle } from "react-konva";
// import useImage from "use-image";
// import VerticalActionBar from "../Board/ActionBar/VerticalActionBar";
// import tappablegif from "../../assets/tappablegif.gif";
// import { useNavigate } from "react-router";
// import LongPressPopUp from "./LongPressPopUp";
// import { useToastManager } from "../Context/ToastContext";
// import ViewReaction from "./ViewReaction";
// import Avatar_pizzaboy from "../../assets/Avatar_pizzaboy.png";
// import XIcon from "../../assets/X.svg";
// import { baseURL } from "../../Constants/urls";
// import TappableArea from "../../Profile Settings/TappableArea";

// const FullImageWithTappables = ({
//   imageUrl,
//   imageId,
//   boardId,
//   onClose,
//   closeFullImage,
//   tappableAreas,
//   reactionId,
//   setReactionId,
//   singleTappableId,
//   singleReactionId,
//   privateBoardImageId,
//   publicBoardImageId,
//   privateBoardId,
//   publicBoardId,
// }) => {
//   const stageRef = useRef(null);

//   const [stageSize, setStageSize] = useState({
//     width: window.innerWidth * 0.7,
//     height: window.innerHeight,
//   });
//   const [scale, setScale] = useState(1);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [loadedImage, status] = useImage(imageUrl, "anonymous");

//   const isPrivateBoardImageIdValid =
//     privateBoardImageId != null && privateBoardImageId !== undefined;
//   const isPublicBoardImageIdValid =
//     publicBoardImageId != null && publicBoardImageId !== undefined;
//   const isPrivateBoardIdValid =
//     privateBoardId != null && privateBoardId !== undefined;
//   const isPublicBoardIdValid =
//     publicBoardId != null && publicBoardId !== undefined;
//   const [tappableId, setTappableId] = useState(null);
//   const [adjustedTappableAreas, setAdjustedTappableAreas] = useState([]);
//   const [isVisible, setIsVisible] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isTapsOn, setIsTapsOn] = useState(true);
//   const [isDropsOn, setIsDropsOn] = useState(true);
//   const [fixedReactions, setFixedReactions] = useState([]);
//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
//   const [selectedReaction, setSelectedReaction] = useState(null);
//   const [reactionTime, setReactionTime] = useState(null);
//   const longPressTimeout = useRef(null);
//   const canvasRef = useRef(null);
//   const toast = useToastManager();
//   const navigate = useNavigate();
//   const [longPressPosition, setLongPressPosition] = useState({ x: 0, y: 0 });
//   const [isLongPressed, setIsLongPressed] = useState(false);
//   const [popupText, setPopupText] = useState("");
//   const [fixedTexts, setFixedTexts] = useState([]);
//   const [adjustedReactions, setAdjustedReactions] = useState([]);
//   const [newReactions, setNewReactions] = useState([]);
//   const [reactionData, setReactionData] = useState();
//   const [reactionDetails, setReactionDetails] = useState([]);
//   const profileImage = localStorage.getItem("profileImage");
//   const [selectedEmoji, setSelectedEmoji] = useState(null);
//   const [reactionEmojis, setReactionEmojis] = useState();
//   const [profileIcon, setProfileIcon] = useState({});
//   const [imageDimensions, setImageDimensions] = useState({
//     width: 0,
//     height: 0,
//     x: 0,
//     y: 0,
//   });


  // // Detect if the device is a touch device
  // const isTouchDevice = () => {
  //   return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  // };

//   useEffect(() => {
//     const handleStageTransform = () => {
//       const stage = stageRef.current;
//       if (stage) {
//         setImageDimensions({
//           width: stage.width(),
//           height: stage.height(),
//           x: stage.x(),
//           y: stage.y(),
//         });
//       }
//     };
  
//     if (stageRef.current) {
//       stageRef.current.on('transform', handleStageTransform);
//     }
  
//     return () => {
//       if (stageRef.current) {
//         stageRef.current.off('transform', handleStageTransform);
//       }
//     };
//   }, []);

// useEffect(() => {
//   const handleResize = () => {
//     if (isTouchDevice()) {
//       // Full width for touch devices
//       setStageSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     } else {
//       // Keep the size for desktop unchanged
//       setStageSize({
//         width: window.innerWidth * 0.7,
//         height: window.innerHeight,
//       });
//     }
//   };

//   window.addEventListener('resize', handleResize);
//   return () => {
//     window.removeEventListener('resize', handleResize);
//   };
// }, [scale, position, loadedImage]);


//   useEffect(() => {
//     console.log("Reactions updated 1604 : ", tappableId);
//   }, [tappableId]);

//   useEffect(() => {
//     console.log("Updated reactions:", reactionId); // Check if the state updates correctly
//   }, [reactionId]);

//   console.log(tappableAreas);

//   useEffect(() => {
//     if (boardId && imageId) {
//       fetchAreas(boardId, imageId); // Fetch reactions after a new one is added
//     }
//   }, [boardId, imageId, isPopupVisible]);

//   // Adjust tappable areas when receiving props or when visibility changes
//   useEffect(() => {
//     // console.log("entered usseffect");

//     // if (tappableAreas) {
//     if (tappableAreas && isVisible) {
//       // console.log("Adjusting tappable areas with visibility:", isVisible);
//       const adjustedCoordinates = tappableAreas.map((area) => {
//         console.log("Processing tappable area:", area);
//         return {
//           ...area,
//           left: parseFloat(area.left) || 0,
//           top: parseFloat(area.top) || 0,
//           width: area.width || 50,
//           height: area.height || 50,
//         };
//       });
//       console.log("Adjusted tappable areas:", adjustedCoordinates);
//       setAdjustedTappableAreas(adjustedCoordinates);
//     }
//   }, [tappableAreas, isVisible]);
//   useEffect(() => {
//     if (reactionId && Array.isArray(reactionId)) {
//       setReactionId(reactionId);
//     }
//   }, []);

//   useEffect(() => {
//     if (reactionId && reactionId?.length > 0) {
//       console.log("Original area data:", reactionId);
//       const adjustedReactionCoordinates = reactionId?.map((reaction) => ({
//         ...reaction,
//         left: parseFloat(reaction?.left),
//         top: parseFloat(reaction?.top),
//       }));
//       setAdjustedReactions(adjustedReactionCoordinates);
//     }
//   }, []);

//   "Component props:",
//     {
//       publicBoardId,
//       publicBoardImageId,
//       privateBoardId,
//       privateBoardImageId,
//     };
//   "Base URL:", baseURL;
//   useEffect(() => {
//     if (status === "loaded" && loadedImage && loadedImage.width && loadedImage.height) {
//       const imageAspectRatio = loadedImage.width / loadedImage.height;
//       const stageAspectRatio = stageSize.width / stageSize.height;
  
//       let newWidth, newHeight, newX, newY;
  
//       if (imageAspectRatio > stageAspectRatio) {
//         newWidth = stageSize.width;
//         newHeight = stageSize.width / imageAspectRatio;
//       } else {
//         newHeight = stageSize.height;
//         newWidth = stageSize.height * imageAspectRatio;
//       }
  
//       newX = (stageSize.width - newWidth) / 2;
//       newY = (stageSize.height - newHeight) / 2;
  
//       setScale(newWidth / loadedImage.width);
//       setPosition({ x: newX, y: newY });
//     }
//   }, [loadedImage, stageSize, status, imageUrl]);
  

// const renderReactions = () => {
//   if (!isDropsOn) {
//     return null;
//   }
//   return reactionId?.reactions?.map((reaction, idx) => {
//     const singleReactionId = reaction.reactionId;


//     // Calculate the adjusted left and top positions based on the current image dimensions and stage scale
//     const adjustedLeft = (reaction.left + idx * 10 / imageDimensions.width) * stageSize.width;
//     const adjustedTop = (reaction.top + idx * 10 / imageDimensions.height) * stageSize.height;
//     // {
//     //   console.log("reaction detailss 20", singleReactionId);
//     // }

//     //yellow box postion
//     const yellowBoxLeft = Math.min(reaction.left + 96); // 105.14px - 9.14px (the difference between yellow box and popup left)
//     const yellowBoxTop = Math.min(reaction.top - 81); // 3px - 84px (the difference between yellow box top and popup top)

//     return (
//       <div
//         key={`reaction-${idx}`}
//         style={{
//           position: "absolute",
//           left: `${reaction.left + idx * 10}px`,
//           top: `${reaction.top + idx * 10}px`,
//           cursor: "pointer",
//           zIndex: 10,
//         }}
//         onClick={() => setSelectedReaction(reaction)}
//       >
//         <img
//           src={Avatar_pizzaboy}
//           // src={profileImage}
//           alt="Reaction"
//           className="w-8 h-8 rounded-full "
//           id={reaction.reactionId}
//           onClick={() => fetchReactionInfo({ singleReactionId })}
//         />
//         {selectedEmoji && (
//           <span
//             className="absolute top-0 right-0 text-lg"
//             style={{ transform: "translate(50%, -50%)" }}
//           >
//             {selectedEmoji}
//           </span>
//         )}
//       </div>
//     );
//   });
// };


//   const handleTextEnter = async (data) => {
//     console.log("Handling text entry...");
//     const isComment = data.text.trim() !== "" && !data.image && !data.gif;
//     let capturedImage = null;
//     let contentUrl = "";

//     if (isComment) {
//       try {
//         // Capture the background image under the cursor if it's a comment
//         console.log("Capturing background image...");
//         capturedImage = await captureBackground(popupPosition);
//         console.log("Captured Image (Base64):", capturedImage);

//         // Upload the captured image to the server and get the URL
//         contentUrl = await uploadImage(capturedImage);
//         if (!contentUrl) {
//           console.error("Failed to upload captured image.");
//           throw new Error("Failed to upload captured image.");
//         }
//       } catch (error) {
//         console.error("Error processing comment:", error);
//         toast(`Error processing comment: ${error.message}`);
//         return;
//       }
//     }
//     // const relativeX = selectionBox.x / imageUrl.width;
//     // const relativeY = selectionBox.y / imageUrl.height;

//     if (!imageUrl) return;
//     const absoluteYellowBoxPosition = {
//       x: popupPosition.x + data.yellowBoxPosition.x,
//       y: popupPosition.y + data.yellowBoxPosition.y,
//     };
//     console.log("check 1  1313  : ", absoluteYellowBoxPosition);

//     setFixedReactions((prevReactions) => [
//       ...prevReactions,
//       {
//         ...data,
//         position: absoluteYellowBoxPosition,
//         time: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//         backgroundCapture: capturedImage,
//       },
//     ]);

//     setIsPopupVisible(false);
//     setReactionTime(
//       new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       })
//     );

//     try {
//       if (!imageId) {
//         console.error("imageId is not available");
//         throw new Error("imageId is not available");
//       }

//       let reactionType = "emoji";
//       let contentText = "";

//       if (data.image) {
//         reactionType = "photo";
//         contentText = data.text;
//         contentUrl = data.image;
//       } else if (data.gif) {
//         reactionType = "video";
//         contentUrl = data.gif;
//         contentText = data.text;
//       } else if (isComment) {
//         // Set the reactionType to 'text' for comments
//         reactionType = "photo";
//         contentText = data.text;
//       }

//       console.log("Preparing to send reaction data 1353 :", {
//         boardImageId: imageId,
//         reactionType,
//         contentText,
//         contentUrl,
//         top: absoluteYellowBoxPosition.y,
//         left: absoluteYellowBoxPosition.x,
//       });

//       const postData = {
//         boardImageId: imageId,
//         reactionType: reactionType,
//         contentText: contentText,
//         contentUrl: contentUrl,
//         top: absoluteYellowBoxPosition.y,
//         left: absoluteYellowBoxPosition.x,
//       };

//       const response = await fetch(`${baseURL}/board/addReaction`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(postData),
//       });

//       const responseText = await response.text();

//       if (!response.ok) {
//         console.error("Failed to add reaction:", response.statusText);
//         throw new Error(
//           `Failed to add reaction: ${response.status} ${response.statusText}\n${responseText}`
//         );
//       }

//       console.log("Reaction added successfully.");
//       fetchAreas(boardId, imageId);
//       toast("Reaction added successfully");
//     } catch (error) {
//       console.error("Error adding reaction:", error);
//       toast(`Error adding reaction: ${error.message}`);
//     }
//   };

//   const handleResize = () => {
//       if (isTouchDevice()) {
//         // Full width for touch devices
//         setStageSize({
//           width: window.innerWidth,
//           height: window.innerHeight,
//         });
//       } else {
//         // Keep the size for desktop unchanged
//         setStageSize({
//           width: window.innerWidth * 0.7,
//           height: window.innerHeight,
//         });
//       }
//   };
//   useEffect(() => {
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const handleWheel = (e) => {
//     e.evt.preventDefault();
  
//     const scaleBy = 1.006;
//     const stage = stageRef.current;
//     const oldScale = stage.scaleX();
  
//     const mousePointTo = {
//       x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
//       y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
//     };
  
//     const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
  
//     setScale(newScale);
  
//     setPosition({
//       x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
//       y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
//     });
//   };
  
//   const handleTappableClick = () => {
//     const selectedArea = tappableAreas[0].id;
//     console.log("Tappable clicked with ID 1140:", tappableAreas[0].id);
//     if (selectedArea) {
//       const url = `/infoOverlay?imageId=${imageId}&tappableId=${selectedArea}`;
//       console.log("Navigating to:", url);
//       navigate(url);
//     } else {
//       console.log("No matching tappable area found.");
//     }
//   };


//   useEffect(() => {
//     const fetchTappableAreas = async () => {
//       try {
//         const response = await fetch("your-api-endpoint");
//         const data = await response.json();

//         setApiTappableAreas(data);
//       } catch (error) {
//         toast("Error fetching tappable areas:", error);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!isVisible) {
//       setIsVisible(true);
//     }
//   }, [imageUrl, isVisible]);

//   const fetchTappableAreas = async () => {
//     const storedToken = localStorage.getItem("token");
//     "Stored token:", storedToken ? "exists" : "not found";

//     if (publicBoardId && publicBoardImageId) {
//       ("Fetching public areas");
//       await fetchAreas("public", publicBoardId, publicBoardImageId);
//     } else {
//     }

//     if (privateBoardId && privateBoardImageId) {
//       ("Fetching private areas");
//       await fetchAreas(
//         "private",
//         privateBoardId,
//         privateBoardImageId,
//         storedToken
//       );
//     } else {
//     }
//   };

//   const handleImageTransition = useCallback(() => {
//     setIsVisible(false);
//     setTimeout(() => setIsVisible(true), 50);
//   }, []);

//   useEffect(() => {
//     handleImageTransition();
//   }, [imageUrl, handleImageTransition]);

//   const captureBackground = (rect) => {
//     const stage = stageRef.current;
//     const scaleFactor = scale;

//     const captureX =
//       (rect.left - stage.container().getBoundingClientRect().left) *
//       scaleFactor;
//     const captureY =
//       (rect.top - stage.container().getBoundingClientRect().top) * scaleFactor;
//     const captureWidth = rect.width * scaleFactor;
//     const captureHeight = rect.height * scaleFactor;

//     const captureCanvas = document.createElement("canvas");
//     captureCanvas.width = captureWidth;
//     captureCanvas.height = captureHeight;
//     const captureContext = captureCanvas.getContext("2d");

//     captureContext.drawImage(
//       stage.toCanvas(),
//       captureX,
//       captureY,
//       captureWidth,
//       captureHeight,
//       0,
//       0,
//       captureWidth,
//       captureHeight
//     );

//     const capturedImage = captureCanvas.toDataURL("image/png");
//     console.log(" capturedImage  1518 :", capturedImage);
//     return capturedImage;
//   };

//   const handleLongPress = (event) => {
//     if (event && typeof event.preventDefault === "function") {
//       event.preventDefault();
//     }

//     const storedToken = localStorage.getItem("token");

//     if (!storedToken) {
//       toast("Please login to add reactions.");
//       return;
//     }
//     if (!event.currentTarget) {
//       return;
//     }

//     const rect = event.currentTarget.getBoundingClientRect();
//     let x = event.clientX - rect.left;
//     let y = event.clientY - rect.top;

//     // Calculate the new popup position to make the yellow box surround the cursor or touch point
//     const yellowBoxOffsetX = 140.14; // Half of the yellow box width
//     const yellowBoxOffsetY = 50; // Offset for yellow box height

//     const adjustedX = Math.max(0, x - yellowBoxOffsetX);
//     const adjustedY = Math.max(0, y - yellowBoxOffsetY);

//     // Set the position of the popup below the yellow box
//     const popupOffsetY = 10;

//     setPopupPosition({
//       x: adjustedX,
//       y: adjustedY + popupOffsetY,
//     });

//     longPressTimeout.current = setTimeout(() => {
//       setIsPopupVisible(true);
//     }, 1500);

  
//   };

//   const handleLongPressEnd = (event) => {
//     event.preventDefault();
//     if (longPressTimeout.current) {
//       clearTimeout(longPressTimeout.current);
//     }
//   };

//   const handleLongPressPopUpClose = () => {
//     setIsLongPressed(false);
//   };

//   const handlePopupDragStart = (event) => {
//     event.stopPropagation();
//     setIsDragging(true);
//     const rect = event.currentTarget.getBoundingClientRect();
//     setDragOffset({
//       x: event.clientX - rect.left,
//       y: event.clientY - rect.top,
//     });
//   };

//   const handlePopupDrag = (event) => {
//     if (isDragging) {
//       const containerRect = event.currentTarget.getBoundingClientRect();
//       const newX = event.clientX - containerRect.left - dragOffset.x;
//       const newY = event.clientY - containerRect.top - dragOffset.y;

//       const maxX = containerRect.width - 296;
//       const maxY = containerRect.height - 302;

//       setPopupPosition({
//         x: Math.max(0, Math.min(newX, maxX)),
//         y: Math.max(0, Math.min(newY, maxY)),
//       });
//     }
//   };

//   const handlePopupDragEnd = () => {
//     setIsDragging(false);
//   };

//   // Converting base64 image from the capturedBackground
//   const base64ToBlob = (base64Data, contentType = "image/png") => {
//     // console.log("Converting base64 to Blob...");
//     const byteCharacters = atob(base64Data.split(",")[1]);
//     const byteArrays = [];

//     for (let offset = 0; offset < byteCharacters.length; offset += 512) {
//       const slice = byteCharacters.slice(offset, offset + 512);
//       const byteNumbers = new Array(slice.length);
//       for (let i = 0; i < slice.length; i++) {
//         byteNumbers[i] = slice.charCodeAt(i);
//       }
//       const byteArray = new Uint8Array(byteNumbers);
//       byteArrays.push(byteArray);
//     }

//     // console.log("Conversion to Blob completed.");
//     return new Blob(byteArrays, { type: contentType });
//   };

//   const uploadImage = async (base64Image) => {
//     // console.log("Starting image upload...");
//     const blob = base64ToBlob(base64Image);

//     const formData = new FormData();
//     formData.append("file", blob, "reaction-image.png");

//     const token = localStorage.getItem("token");

//     if (!token) {
//       console.error("No authorization token found. Please log in.");
//       toast("Please log in to upload the image.");
//       return null;
//     }

//     try {
//       const response = await fetch(`${baseURL}/file-upload/uploadFile`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         console.error("Failed to upload image:", response.statusText);
//         throw new Error(`Failed to upload image: ${response.statusText}`);
//       }

//       const data = await response.json();
//       return data.data.url;
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       toast(`Error uploading image: ${error.message}`);
//       return null;
//     }
//   };

//   //For fetchting tappbles and reaction
//   const fetchAreas = async (boardId, imageId) => {
//     const userRole = localStorage.getItem("userRole");
//     const token = localStorage.getItem("token");
//     // console.log("boardId 404 : ", boardId);
//     // console.log("boardId 405 : ", imageId);

//     let url;
//     if (userRole === "publicUser") {
//       url = `${baseURL}/board/fetchPublicUserTappableNonPagination?boardId=${boardId}&imageId=${imageId}`;
//     } else if (userRole === "privateUser") {
//       url = `${baseURL}/board/fetchPrivateUserTappableNonPagination?boardId=${boardId}&imageId=${imageId}`;
//     } else if (userRole === "user") {
//       url = `${baseURL}/board/fetchPublicUserTappableNonPagination?boardId=${boardId}&imageId=${imageId}`;
//     } else {
//       console.error("Invalid user role");
//       return;
//     }

//     const headers = {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     };

//     if (token && userRole === "privateUser") {
//       headers["Authorization"] = `Bearer ${token}`;
//     }

//     try {
//       const response = await fetch(url, {
//         method: "GET",
//         headers,
//       });

//       if (!response.ok) {
//         console.error(`Error: ${response.status} ${response.statusText}`);
//         const errorData = await response.json();
//         console.error("Error details:", errorData);
//         return;
//       }
//       // console.log("REsponse for non pagination  2002 : ", response);

//       const data = await response.json();

//       const reaction = data?.data;
//       // console.log("New Reactions 432 : ", reaction);
//       setReactionId(reaction);

//       if (data?.data?.reaction?.length > 0) {
//         const adjustedReactions = data?.data?.reaction?.map((reaction) => ({
//           id: reaction.reactionId,
//           left: parseFloat(reaction.left),
//           top: parseFloat(reaction.top),
//           type: reaction.type,
//         }));
//       }
//     } catch (error) {
//       console.error("Error fetching tappable areas:", error);
//     }
//   };

//   const fetchAllReactionInfo = async (reactionId) => {
//     if (!Array?.isArray(reactionId)) {
//       // console.log("reactionId is not an array:", reactionId);
//       return;
//     }

//     const reactionInfoPromises = reactionId?.map((item) =>
//       fetchReactionInfo(item?.reactionId)
//     );
//     const reactionInfoResults = await Promise?.all(reactionInfoPromises);

//     // Filter out any null results (failed fetches)
//     const validReactionInfo = reactionInfoResults?.filter(
//       (info) => info !== null
//     );

//     // Update state with the fetched information
//     setReactionDetails(validReactionInfo);
//   };

//   const fetchReactionInfo = async (reactionId) => {
//     // console.log(
//     //   "fetching API fetchReactionInfo : ",
//     //   reactionId.singleReactionId
//     // );

//     let testingURL;
//     const token = localStorage.getItem("token");
//     if (!token) {
//       testingURL = `${baseURL}/board/fetchReactionInfo?reactionId=${reactionId.singleReactionId}`;
//     } else {
//       testingURL = `${baseURL}/board/fetchLoggedUserReactionInfo?reactionId=${reactionId.singleReactionId}`;
//     }
//     // const testingURL = `${baseURL}/board/fetchLoggedUserReactionInfo?reactionId=${reactionId.singleReactionId}`;
//     // console.log("testingURL", testingURL);

//     try {
//       const response = await fetch(testingURL, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       // console.log("fetching API Response 2005 : ", data);/

//       setReactionData(data);
//     } catch (error) {
//       console.error("Error fetching reaction info:", error);
//       toast(`Error fetching reaction info: ${error.message}`);
//       return null;
//     }
//   };

//   const addReactionLike = async (reactionId) => {
//     try {
//       const response = await fetch(
//         `${baseURL}/board/addReactionLikes?imageId=${imageId}&reactionId=${reactionId.singleReactionId}`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(
//           `Failed to add reaction like: ${response.status} ${response.statusText}\n${errorText}`
//         );
//       }

//       const result = await response.json();
//       toast("Reaction like added successfully");
//       return result;
//     } catch (error) {
//       console.error("Error adding reaction like:", error);
//       toast(`Error adding reaction like: ${error.message}`);
//     }
//   };
//   const deleteReaction = async (reactionId) => {
//     try {
//       const response = await fetch(
//         `${baseURL}/board/deleteReaction?reactionId=${reactionId.singleReactionId}`,
//         {
//           method: "PUT",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       toast("Reaction deleted successfully");
//       fetchAreas(boardId, imageId);
//     } catch (error) {
//       console.error("Error deleting reaction:", error);
//       toast(`Error deleting reaction: ${error.message}`);
//     }
//   };

//   const handleEmojiSelect = (emoji, reactionId) => {
//     setReactionEmojis((prevEmojis) => ({
//       ...prevEmojis,
//       [reactionId]: emoji,
//     }));
//     setSelectedEmoji(emoji);
//   };

//   const handleMouseEnter = () => {
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };

//   const toggleTaps = () => {
//     setIsTapsOn((prevState) => !prevState);
//   };

//   const toggleDrops = () => {
//     setIsDropsOn((prevState) => !prevState);
//   };

//   const renderFixedTexts = () => {
//     return fixedTexts?.map((item, index) => (
//       <div
//         key={index}
//         className="absolute text-black bg-yellow-300 p-2 rounded"
//         style={{
//           left: `${item.position.x}px`,
//           top: `${item.position.y}px`,
//         }}
//       >
//         {item?.text}
//         {item?.image && (
//           <img
//             src={item.image}
//             alt="Uploaded"
//             className="w-20 h-20 object-cover"
//           />
//         )}
//         {item.gif && (
//           <img src={item.gif} alt="GIF" className="w-20 h-20 object-cover" />
//         )}
//       </div>
//     ));
//   };

//   const handleCapturedImage = async (capturedImage) => {
//     try {
//       const uploadedUrl = await uploadImage(capturedImage);
//       if (uploadedUrl) {
//         console.log("Image uploaded successfully:", uploadedUrl);
//       } else {
//         console.error("Failed to upload the captured image.");
//       }
//     } catch (error) {
//       console.error("Error uploading the captured image:", error);
//     }
//   };


//    // Handle pointer down for both touch and mouse
//    const handlePointerDown = (event) => {
//     event.preventDefault();
//     if (!isPopupVisible) {
//       startLongPress(event);
//     }
//   };

//   const startLongPress = (event) => {
//     const { clientX, clientY } = event.touches ? event.touches[0] : event;

//     longPressTimeout.current = setTimeout(() => {
//       setPopupPosition({ x: clientX, y: clientY });
//       setIsPopupVisible(true);
//     }, 1500);
//   };

//   // Cancel long press detection
//   const cancelLongPress = () => {
//     clearTimeout(longPressTimeout.current);
//   };

//   return (
//     <div
//       // className="relative w-full no-select h-full bg-black flex justify-center items-center transition duration-100"
//       className="relative h-screen bg-black"
//       style={{ width: "100%", position: "absolute", right: 0 }}
//       onPointerDown={handlePointerDown}
//       onPointerUp={cancelLongPress}
//       onPointerMove={cancelLongPress}
//       onPointerLeave={cancelLongPress}
//     >
//       <Stage
//         ref={stageRef}
//         width={stageSize.width}
//         height={stageSize.height}
//         // draggable
//         draggable={!isPopupVisible}
//         scaleX={scale}
//         scaleY={scale}
//         x={position.x}
//         y={position.y}
//         onWheel={handleWheel}
//       >
//         <Layer>
//           {status === "loaded" && loadedImage && (
//             <KonvaImage
//               image={loadedImage}
//               width={loadedImage.width}
//               height={loadedImage.height}
//               x={0}
//               y={0}
//             />
//           )}

//           {tappableAreas.map((area) => {
//             // Convert `left` and `top` from string to number
//             const leftPosition = parseFloat(area.left);
//             const topPosition = parseFloat(area.top);

//             if (loadedImage && loadedImage?.width && loadedImage?.height) {
//               // Calculate absolute positions based on the current loaded image dimensions

//               const absoluteX = leftPosition;
//               const absoluteY = topPosition;

//               return (
//                 <Circle
//                   key={area.tappableId}
//                   x={absoluteX}
//                   y={absoluteY}
//                   radius={10 / scale} // Adjust the size based on current scale
//                   fill="#0085FF"
//                   onClick={() => handleTappableClick(area.tappableId)}
//                 />
//               );
//             } 
//           })}
//         </Layer>
//       </Stage>
//       {renderReactions()}
//       {isPopupVisible && (
//         <div
//           className="absolute"
//           style={{
//             left: `${popupPosition.x}px`,
//             top: `${popupPosition.y}px`,
//             cursor: isDragging ? "grabbing" : "grab",
//             maxWidth: "296px",
//             maxHeight: "302px",
//           }}
//           onMouseDown={(e) => {
//             e.stopPropagation();
//             handlePopupDragStart(e);
//           }}
//           onMouseUp={(e) => {
//             e.stopPropagation();
//             handlePopupDragEnd(e);
//           }}
//           onClick={(e) => e.stopPropagation()}
//         >
//           <LongPressPopUp
//             onClose={() => setIsPopupVisible(false)}
//             onTextEnter={handleTextEnter}
//             reactionData={reactionData}
//             backgroundCapture={captureBackground(popupPosition)}
//             popupPosition={popupPosition}
//             onEmojiSelect={handleEmojiSelect}
//           />
//         </div>
//       )}
//       {selectedReaction && (
//         <div
//           className="absolute p-2 bg-[#303030] rounded-[15px] w-[314px] h-[178px] flex flex-col"
//           style={{
//             left: `${selectedReaction.left}px`,
//             top: `${selectedReaction.top}px`,
//             zIndex: 11,
//           }}
//         >
//           <ViewReaction
//             reactionData={reactionData}
//             reaction={selectedReaction}
//             onClose={() => setSelectedReaction(null)}
//             addReactionLike={() =>
//               addReactionLike({ singleReactionId: selectedReaction.reactionId })
//             }
//             deleteReaction={() =>
//               deleteReaction({ singleReactionId: selectedReaction.reactionId })
//             }
//           />
//         </div>
//       )}

//       <div
//         className="fixed top-0 right-0 h-full"
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <div
//           className={`top-0 right-0 h-full transition-transform duration-300 ${
//             isHovered ? "transform translate-x-0" : "transform translate-x-full"
//           }`}
//         >
//           <VerticalActionBar
//             isTapsOn={isTapsOn}
//             toggleTaps={toggleTaps}
//             closeFullImage={closeFullImage}
//             isDropsOn={isDropsOn}
//             toggleDrops={toggleDrops}
//           />
//         </div>
//       </div>
//       {/* Close button */}
//       <button
//         className="absolute z-10 top-2 left-0 p-2 w-10 text-white"
//         onClick={closeFullImage}
//       >
//         X
//       </button>
//     </div>
//   );
// };

// export default FullImageWithTappables;


import React, { useState, useEffect, useRef, useCallback } from "react";
import { Stage, Layer, Image as KonvaImage, Circle } from "react-konva";
import useImage from "use-image";
import VerticalActionBar from "../Board/ActionBar/VerticalActionBar";
import tappablegif from "../../assets/tappablegif.gif";
import { useNavigate } from "react-router";
import LongPressPopUp from "./LongPressPopUp";
import { useToastManager } from "../Context/ToastContext";
import ViewReaction from "./ViewReaction";
import Avatar_pizzaboy from "../../assets/Avatar_pizzaboy.png";
import XIcon from "../../assets/X.svg";
import { baseURL } from "../../Constants/urls";
import TappableArea from "../../Profile Settings/TappableArea";
import InfoOverlayInHomepg from "./InfoOverlayInHomepg";

const FullImageWithTappables = ({
  imageUrl,
  imageId,
  boardId,
  onClose,
  closeFullImage,
  tappableAreas,
  reactionId,
  setReactionId,
  singleTappableId,
  singleReactionId,
  privateBoardImageId,
  publicBoardImageId,
  privateBoardId,
  publicBoardId,
}) => {
  const stageRef = useRef(null);

  const [stageSize, setStageSize] = useState({
    width: window.innerWidth * 0.7,
    height: window.innerHeight,
  });
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [loadedImage, status] = useImage(imageUrl, "anonymous");

  const isPrivateBoardImageIdValid =
    privateBoardImageId != null && privateBoardImageId !== undefined;
  const isPublicBoardImageIdValid =
    publicBoardImageId != null && publicBoardImageId !== undefined;
  const isPrivateBoardIdValid =
    privateBoardId != null && privateBoardId !== undefined;
  const isPublicBoardIdValid =
    publicBoardId != null && publicBoardId !== undefined;
  const [tappableId, setTappableId] = useState(null);
  const [adjustedTappableAreas, setAdjustedTappableAreas] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTapsOn, setIsTapsOn] = useState(true);
  const [isDropsOn, setIsDropsOn] = useState(true);
  const [fixedReactions, setFixedReactions] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const longPressTimeout = useRef(null);
  const canvasRef = useRef(null);
  const toast = useToastManager();
  const navigate = useNavigate();
  const [longPressPosition, setLongPressPosition] = useState({ x: 0, y: 0 });
  const [isLongPressed, setIsLongPressed] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [fixedTexts, setFixedTexts] = useState([]);
  const [adjustedReactions, setAdjustedReactions] = useState([]);
  const [newReactions, setNewReactions] = useState([]);
  const [reactionData, setReactionData] = useState();
  const [reactionDetails, setReactionDetails] = useState([]);
  const profileImage = localStorage.getItem("profileIcon");
  const initialIconUrl = localStorage.getItem("initialIconUrl");
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [reactionEmojis, setReactionEmojis] = useState();
  const [profileIcon, setProfileIcon] = useState({});
  const [selectedTappableId, setSelectedTappableId] = useState(null); // State to manage the selected tappable
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedTappableContent, setSelectedTappableContent] = useState(null);

  
  // Detect if the device is a touch device
  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  };
  
  useEffect(() => {
    console.log("Reactions updated 1604 : ", tappableId);
  }, [tappableId]);

  useEffect(() => {
    console.log("Updated reactions:", reactionId); // Check if the state updates correctly
  }, [reactionId]);

  console.log(tappableAreas);

  useEffect(() => {
    if (boardId && imageId) {
      fetchAreas(boardId, imageId); // Fetch reactions after a new one is added
    }
  }, [boardId, imageId, isPopupVisible]);

  useEffect(() => {
    if (tappableAreas && isVisible) {
      const adjustedCoordinates = tappableAreas.map((area) => {
        console.log("Processing tappable area:", area);
        return {
          ...area,
          left: parseFloat(area.left) || 0,
          top: parseFloat(area.top) || 0,
          width: area.width || 50,
          height: area.height || 50,
        };
      });
      console.log("Adjusted tappable areas:", adjustedCoordinates);
      setAdjustedTappableAreas(adjustedCoordinates);
    }
  }, [tappableAreas, isVisible]);

  useEffect(() => {
    if (reactionId && Array.isArray(reactionId)) {
      setReactionId(reactionId);
    }
  }, []);

  useEffect(() => {
    if (reactionId && reactionId?.length > 0) {
      console.log("Original area data:", reactionId);
      const adjustedReactionCoordinates = reactionId?.map((reaction) => ({
        ...reaction,
        left: parseFloat(reaction?.left),
        top: parseFloat(reaction?.top),
      }));
      setAdjustedReactions(adjustedReactionCoordinates);
    }
  }, []);

  "Component props:",
    {
      publicBoardId,
      publicBoardImageId,
      privateBoardId,
      privateBoardImageId,
    };
  "Base URL:", baseURL;
  useEffect(() => {
    console.log("Image load status:", status);
    // Check if loadedImage is defined and has width and height properties
    if (
      status === "loaded" &&
      loadedImage &&
      loadedImage.width &&
      loadedImage.height
    ) {
      console.log(
        "Loaded image dimensions:",
        loadedImage.width,
        loadedImage.height
      );
      const imageAspectRatio = loadedImage.width / loadedImage.height;
      const stageAspectRatio = stageSize.width / stageSize.height;

      let newWidth, newHeight, newX, newY;

      if (imageAspectRatio > stageAspectRatio) {
        newWidth = stageSize.width;
        newHeight = stageSize.width / imageAspectRatio;
      } else {
        newHeight = stageSize.height;
        newWidth = stageSize.height * imageAspectRatio;
      }

      newX = (stageSize.width - newWidth) / 2;
      newY = (stageSize.height - newHeight) / 2;

      setScale(newWidth / loadedImage.width);
      setPosition({ x: newX, y: newY });
    } else {
      console.warn("Loaded image is not defined or missing width/height");
    }
  }, [loadedImage, stageSize, status, imageUrl]);

  const renderReactions = () => {
    if (
      !isDropsOn ||
      !loadedImage ||
      !loadedImage.width ||
      !loadedImage.height
    ) {
      return null; // Ensure loadedImage and its properties are available
    }
    return reactionId?.reactions?.map((reaction, idx) => {
      const singleReactionId = reaction.reactionId;
      // {
      //   console.log("reaction detailss 20", singleReactionId);
      // }

      //yellow box postion
      const yellowBoxLeft = Math.min(reaction.left + 96); // 105.14px - 9.14px (the difference between yellow box and popup left)
      const yellowBoxTop = Math.min(reaction.top - 81); // 3px - 84px (the difference between yellow box top and popup top)

      const absoluteX =
        reaction.left * scale + position.x + (loadedImage.width * scale) / 2;
      const absoluteY =
        reaction.top * scale + position.y + (loadedImage.height * scale) / 2;

      return (
        <div
          key={`reaction-${idx}`}
          style={{
            position: "absolute",
            left: `${reaction.left + idx * 10}px`,
            top: `${reaction.top + idx * 10}px`,
            cursor: "pointer",
            zIndex: 10,
          }}
          onClick={() => setSelectedReaction(reaction)}
        >
          <img
            src={Avatar_pizzaboy}
            // src={profileImage}
            alt="Reaction"
            className="w-8 h-8 rounded-full "
            id={reaction.reactionId}
            onClick={() => fetchReactionInfo({ singleReactionId })}
          />
          {selectedEmoji && (
            <span
              className="absolute top-0 right-0 text-lg"
              style={{ transform: "translate(50%, -50%)" }}
            >
              {selectedEmoji}
            </span>
          )}
        </div>
      );
    });
  };


  const handleTextEnter = async (data) => {
    console.log("Handling text entry...");
    const isComment = data.text.trim() !== "" && !data.image && !data.gif;
    let capturedImage = null;
    let contentUrl = "";

    if (isComment) {
      try {
        // Capture the background image under the cursor if it's a comment
        console.log("Capturing background image...");
        capturedImage = await captureBackground(popupPosition);
        console.log("Captured Image (Base64):", capturedImage);

        // Upload the captured image to the server and get the URL
        contentUrl = await uploadImage(capturedImage);
        if (!contentUrl) {
          console.error("Failed to upload captured image.");
          throw new Error("Failed to upload captured image.");
        }
      } catch (error) {
        console.error("Error processing comment:", error);
        toast(`Error processing comment: ${error.message}`);
        return;
      }
    }
    // const relativeX = selectionBox.x / imageUrl.width;
    // const relativeY = selectionBox.y / imageUrl.height;

    if (!imageUrl) return;
    const absoluteYellowBoxPosition = {
      x: popupPosition.x + data.yellowBoxPosition.x,
      y: popupPosition.y + data.yellowBoxPosition.y,
    };
    console.log("check 1  1313  : ", absoluteYellowBoxPosition);

    setFixedReactions((prevReactions) => [
      ...prevReactions,
      {
        ...data,
        position: absoluteYellowBoxPosition,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        backgroundCapture: capturedImage,
      },
    ]);

    setIsPopupVisible(false);
    setReactionTime(
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );

    try {
      if (!imageId) {
        console.error("imageId is not available");
        throw new Error("imageId is not available");
      }

      let reactionType = "emoji";
      let contentText = "";

      if (data.image) {
        reactionType = "photo";
        contentText = data.text;
        contentUrl = data.image;
      } else if (data.gif) {
        reactionType = "video";
        contentUrl = data.gif;
        contentText = data.text;
      } else if (isComment) {
        // Set the reactionType to 'text' for comments
        reactionType = "photo";
        contentText = data.text;
      }

      console.log("Preparing to send reaction data 1353 :", {
        boardImageId: imageId,
        reactionType,
        contentText,
        contentUrl,
        top: absoluteYellowBoxPosition.y,
        left: absoluteYellowBoxPosition.x,
      });

      const postData = {
        boardImageId: imageId,
        reactionType: reactionType,
        contentText: contentText,
        contentUrl: contentUrl,
        top: absoluteYellowBoxPosition.y,
        left: absoluteYellowBoxPosition.x,
      };

      const response = await fetch(`${baseURL}/board/addReaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(postData),
      });

      const responseText = await response.text();

      if (!response.ok) {
        console.error("Failed to add reaction:", response.statusText);
        throw new Error(
          `Failed to add reaction: ${response.status} ${response.statusText}\n${responseText}`
        );
      }

      console.log("Reaction added successfully.");
      fetchAreas(boardId, imageId);
      toast("Reaction added successfully");
    } catch (error) {
      console.error("Error adding reaction:", error);
      toast(`Error adding reaction: ${error.message}`);
    }
  };

 

  const handleResize = () => {
    if (isTouchDevice()) {
      // Full width for touch devices
      setStageSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    } else {
      // Keep the size for desktop unchanged
      setStageSize({
        width: window.innerWidth * 0.7,
        height: window.innerHeight,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleWheel = (e) => {
    e.evt.preventDefault();

    const scaleBy = 1.006;
    const stage = stageRef.current.getStage();
    const oldScale = stage.scaleX();

    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setScale(newScale);

    setPosition({
      x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    });
  };

  // const handleTappableClick = (tappableId) => {
  //   console.log("Tappable clicked with ID 1140 : ", tappableId);
  //   tappableAreas.forEach((area) => {
  //     console.log(area.id);
  //     // tappableId = area.id;
  //   });
  //   navigate(`/infoOverlay?imageId=${imageId}&tappableId=${tappableId}`);
  // };

  const handleTappableClick = async (tappableId) => {
    // Ensure tappableId is valid before proceeding
    if (!tappableId) {
      console.error("Invalid tappableId: ", tappableId);
      toast("Error: Tappable area is missing an ID.");
      return;
    }
  
    // Validate that tappableId is in UUID format
    const isValidUUID = (id) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
  
    if (!isValidUUID(tappableId)) {
      console.error("Invalid tappableId format: ", tappableId);
      toast("Error: Invalid tappableId format.");
      return;
    }
  
    try {
      const response = await fetch(
        `${baseURL}/board/fetchTappableContain?imageId=${imageId}&tappableId=${tappableId}`,
        {
          method: "GET",
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        setSelectedTappableContent(data.data); // Store fetched tappable data
        setShowOverlay(true); // Show the popup
      } else {
        console.error("Failed to fetch tappable content:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching tappable content:", error);
    }
  };
  

  useEffect(() => {
    const fetchTappableAreas = async () => {
      try {
        const response = await fetch("your-api-endpoint");
        const data = await response.json();

        setApiTappableAreas(data);
      } catch (error) {
        toast("Error fetching tappable areas:", error);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setIsVisible(true);
    }
  }, [imageUrl, isVisible]);

  const fetchTappableAreas = async () => {
    const storedToken = localStorage.getItem("token");
    "Stored token:", storedToken ? "exists" : "not found";

    if (publicBoardId && publicBoardImageId) {
      ("Fetching public areas");
      await fetchAreas("public", publicBoardId, publicBoardImageId);
    } else {
    }

    if (privateBoardId && privateBoardImageId) {
      ("Fetching private areas");
      await fetchAreas(
        "private",
        privateBoardId,
        privateBoardImageId,
        storedToken
      );
    } else {
    }
  };

  const handleImageTransition = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 50);
  }, []);

  useEffect(() => {
    handleImageTransition();
  }, [imageUrl, handleImageTransition]);

  useEffect(() => {
    console.log("Tappable Areas: ", tappableAreas); // Inspect tappable areas
  }, [tappableAreas]);

  const captureBackground = (rect) => {
    const stage = stageRef.current;
    const scaleFactor = scale;

    const captureX =
      (rect.left - stage.container().getBoundingClientRect().left) *
      scaleFactor;
    const captureY =
      (rect.top - stage.container().getBoundingClientRect().top) * scaleFactor;
    const captureWidth = rect.width * scaleFactor;
    const captureHeight = rect.height * scaleFactor;

    const captureCanvas = document.createElement("canvas");
    captureCanvas.width = captureWidth;
    captureCanvas.height = captureHeight;
    const captureContext = captureCanvas.getContext("2d");

    captureContext.drawImage(
      stage.toCanvas(),
      captureX,
      captureY,
      captureWidth,
      captureHeight,
      0,
      0,
      captureWidth,
      captureHeight
    );

    const capturedImage = captureCanvas.toDataURL("image/png");
    console.log(" capturedImage  1518 :", capturedImage);
    return capturedImage;
  };

  const handleLongPress = (event) => {
    if (event && typeof event.preventDefault === "function") {
      event.preventDefault();
    }

    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      toast("Please login to add reactions.");
      return;
    }
    if (!event.currentTarget) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    // Calculate the new popup position to make the yellow box surround the cursor or touch point
    const yellowBoxOffsetX = 140.14; // Half of the yellow box width
    const yellowBoxOffsetY = 50; // Offset for yellow box height

    const adjustedX = Math.max(0, x - yellowBoxOffsetX);
    const adjustedY = Math.max(0, y - yellowBoxOffsetY);

    // Set the position of the popup below the yellow box
    const popupOffsetY = 10;

    setPopupPosition({
      x: adjustedX,
      y: adjustedY + popupOffsetY,
    });

    longPressTimeout.current = setTimeout(() => {
      setIsPopupVisible(true);
    }, 1000);

  };

  const handleLongPressEnd = (event) => {
    event.preventDefault();
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
    }
  };

  const handleLongPressPopUpClose = () => {
    setIsLongPressed(false);
  };

  const handlePopupDragStart = (event) => {
    event.stopPropagation();
    setIsDragging(true);
    const rect = event.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handlePopupDrag = (event) => {
    if (isDragging) {
      const containerRect = event.currentTarget.getBoundingClientRect();
      const newX = event.clientX - containerRect.left - dragOffset.x;
      const newY = event.clientY - containerRect.top - dragOffset.y;

      const maxX = containerRect.width - 296;
      const maxY = containerRect.height - 302;

      setPopupPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    }
  };

  const handlePopupDragEnd = () => {
    setIsDragging(false);
  };

  // Converting base64 image from the capturedBackground
  const base64ToBlob = (base64Data, contentType = "image/png") => {
    // console.log("Converting base64 to Blob...");
    const byteCharacters = atob(base64Data.split(",")[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    // console.log("Conversion to Blob completed.");
    return new Blob(byteArrays, { type: contentType });
  };

  const uploadImage = async (base64Image) => {
    // console.log("Starting image upload...");
    const blob = base64ToBlob(base64Image);

    const formData = new FormData();
    formData.append("file", blob, "reaction-image.png");

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authorization token found. Please log in.");
      toast("Please log in to upload the image.");
      return null;
    }

    try {
      const response = await fetch(`${baseURL}/file-upload/uploadFile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        console.error("Failed to upload image:", response.statusText);
        throw new Error(`Failed to upload image: ${response.statusText}`);
      }

      const data = await response.json();
      return data.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast(`Error uploading image: ${error.message}`);
      return null;
    }
  };

  //For fetchting tappbles and reaction
  const fetchAreas = async (boardId, imageId) => {
    const userRole = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");
    // console.log("boardId 404 : ", boardId);
    // console.log("boardId 405 : ", imageId);

    let url;
    if (userRole === "publicUser") {
      url = `${baseURL}/board/fetchPublicUserTappableNonPagination?boardId=${boardId}&imageId=${imageId}`;
    } else if (userRole === "privateUser") {
      url = `${baseURL}/board/fetchPrivateUserTappableNonPagination?boardId=${boardId}&imageId=${imageId}`;
    } else if (userRole === "user") {
      url = `${baseURL}/board/fetchPublicUserTappableNonPagination?boardId=${boardId}&imageId=${imageId}`;
    } else {
      console.error("Invalid user role");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (token && userRole === "privateUser") {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        console.error(`Error: ${response.status} ${response.statusText}`);
        const errorData = await response.json();
        console.error("Error details:", errorData);
        return;
      }
      // console.log("REsponse for non pagination  2002 : ", response);

      const data = await response.json();

      const reaction = data?.data;
      // console.log("New Reactions 432 : ", reaction);
      setReactionId(reaction);

      if (data?.data?.reaction?.length > 0) {
        const adjustedReactions = data?.data?.reaction?.map((reaction) => ({
          id: reaction.reactionId,
          left: parseFloat(reaction.left),
          top: parseFloat(reaction.top),
          type: reaction.type,
        }));
      }
    } catch (error) {
      console.error("Error fetching tappable areas:", error);
    }
  };

  const fetchAllReactionInfo = async (reactionId) => {
    if (!Array?.isArray(reactionId)) {
      // console.log("reactionId is not an array:", reactionId);
      return;
    }

    const reactionInfoPromises = reactionId?.map((item) =>
      fetchReactionInfo(item?.reactionId)
    );
    const reactionInfoResults = await Promise?.all(reactionInfoPromises);

    // Filter out any null results (failed fetches)
    const validReactionInfo = reactionInfoResults?.filter(
      (info) => info !== null
    );

    // Update state with the fetched information
    setReactionDetails(validReactionInfo);
  };

  const fetchReactionInfo = async (reactionId) => {
    // console.log(
    //   "fetching API fetchReactionInfo : ",
    //   reactionId.singleReactionId
    // );

    let testingURL;
    const token = localStorage.getItem("token");
    if (!token) {
      testingURL = `${baseURL}/board/fetchReactionInfo?reactionId=${reactionId.singleReactionId}`;
    } else {
      testingURL = `${baseURL}/board/fetchLoggedUserReactionInfo?reactionId=${reactionId.singleReactionId}`;
    }
    // const testingURL = `${baseURL}/board/fetchLoggedUserReactionInfo?reactionId=${reactionId.singleReactionId}`;
    // console.log("testingURL", testingURL);

    try {
      const response = await fetch(testingURL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // console.log("fetching API Response 2005 : ", data);/

      setReactionData(data);
    } catch (error) {
      console.error("Error fetching reaction info:", error);
      toast(`Error fetching reaction info: ${error.message}`);
      return null;
    }
  };

  const addReactionLike = async (reactionId) => {
    // const testingURL = `${baseURL}/board/addReactionLikes?imageId=${imageId}&reactionId=${reactionId.singleReactionId}`;
    // console.log("testingURL : 472 : ", testingURL);
    try {
      const response = await fetch(
        `${baseURL}/board/addReactionLikes?imageId=${imageId}&reactionId=${reactionId.singleReactionId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to add reaction like: ${response.status} ${response.statusText}\n${errorText}`
        );
      }

      const result = await response.json();
      toast("Reaction like added successfully");
      return result;
    } catch (error) {
      console.error("Error adding reaction like:", error);
      toast(`Error adding reaction like: ${error.message}`);
    }
  };
  const deleteReaction = async (reactionId) => {
    // return reactionId?.reactions?.map((reaction, idx) => {
    //   const singleReactionId = reaction.reactionId;
    //   {
    //     console.log("reaction detailss 20", singleReactionId);
    //   }
    try {
      const response = await fetch(
        `${baseURL}/board/deleteReaction?reactionId=${reactionId.singleReactionId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      toast("Reaction deleted successfully");
      fetchAreas(boardId, imageId);
    } catch (error) {
      console.error("Error deleting reaction:", error);
      toast(`Error deleting reaction: ${error.message}`);
    }
  };

  const handleEmojiSelect = (emoji, reactionId) => {
    setReactionEmojis((prevEmojis) => ({
      ...prevEmojis,
      [reactionId]: emoji,
    }));
    setSelectedEmoji(emoji);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleTaps = () => {
    setIsTapsOn((prevState) => !prevState);
  };

  const toggleDrops = () => {
    setIsDropsOn((prevState) => !prevState);
  };

  const renderFixedTexts = () => {
    return fixedTexts?.map((item, index) => (
      <div
        key={index}
        className="absolute text-black bg-yellow-300 p-2 rounded"
        style={{
          left: `${item.position.x}px`,
          top: `${item.position.y}px`,
        }}
      >
        {item?.text}
        {item?.image && (
          <img
            src={item.image}
            alt="Uploaded"
            className="w-20 h-20 object-cover"
          />
        )}
        {item.gif && (
          <img src={item.gif} alt="GIF" className="w-20 h-20 object-cover" />
        )}
      </div>
    ));
  };

  const handleCapturedImage = async (capturedImage) => {
    try {
      const uploadedUrl = await uploadImage(capturedImage);
      if (uploadedUrl) {
        console.log("Image uploaded successfully:", uploadedUrl);
      } else {
        console.error("Failed to upload the captured image.");
      }
    } catch (error) {
      console.error("Error uploading the captured image:", error);
    }
  };
  

  return (
    <div
      // className="relative w-full no-select h-full bg-black flex justify-center items-center transition duration-100"
      className="relative h-screen bg-black"
      style={{ width: "100%", position: "absolute", right: 0 }}
      onMouseDown={(e) => {
        if (!isPopupVisible) {
          handleLongPress(e);
        }
      }}
      onMouseUp={handleLongPressEnd}
      onMouseMove={handlePopupDrag}
      onMouseLeave={handleLongPressEnd}
     >
      <Stage
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        // draggable
        draggable={!isPopupVisible}
        scaleX={scale}
        scaleY={scale}
        x={position.x}
        y={position.y}
        onWheel={handleWheel}
      >
        <Layer>
          {status === "loaded" && loadedImage && (
            <KonvaImage
              image={loadedImage}
              width={loadedImage.width}
              height={loadedImage.height}
              x={0}
              y={0}
            />
          )}

          {tappableAreas.map((area) => {
            // Convert `left` and `top` from string to number

            
            const leftPosition = parseFloat(area.left);
            const topPosition = parseFloat(area.top);

            if (loadedImage && loadedImage?.width && loadedImage?.height) {
              // Calculate absolute positions based on the current loaded image dimensions

              const absoluteX = leftPosition;
              const absoluteY = topPosition;

              return (
                <Circle
                  key={area.tappableId}
                  x={absoluteX}
                  y={absoluteY}
                  radius={10 / scale} // Adjust the size based on current scale
                  fill="#0085FF"
      onClick={() => handleTappableClick(area.id)} 
      onTap={() => handleTappableClick(area.id)} 
                />
              );
            } else {
              console.warn(
                "Loaded image is not defined or missing width/height"
              );
              return null;
            }
          })}
        </Layer>
      </Stage>
      {showOverlay && selectedTappableContent && (
  <div className="fixed inset-0 z-50 flex justify-end items-center">
    <div className="lg:w-[70%] w-full h-full flex justify-center items-center">
      <div className="p-4 rounded-lg shadow-md">
        <InfoOverlayInHomepg
          tappableContent={selectedTappableContent}
          onClose={() => setShowOverlay(false)} 
        />
      </div>
    </div>
  </div>
)}


      {renderReactions()}
      {isPopupVisible && (
        <div
          className="absolute"
          style={{
            left: `${popupPosition.x}px`,
            top: `${popupPosition.y}px`,
            cursor: isDragging ? "grabbing" : "grab",
            maxWidth: "296px",
            maxHeight: "302px",
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            handlePopupDragStart(e);
          }}
          onMouseUp={(e) => {
            e.stopPropagation();
            handlePopupDragEnd(e);
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <LongPressPopUp
            onClose={() => setIsPopupVisible(false)}
            onTextEnter={handleTextEnter}
            reactionData={reactionData}
            backgroundCapture={captureBackground(popupPosition)}
            popupPosition={popupPosition}
            onEmojiSelect={handleEmojiSelect}
          />
        </div>
      )}
      {selectedReaction && (
        <div
          className="absolute p-2 bg-[#303030] rounded-[15px] w-[314px] h-[178px] flex flex-col"
          style={{
            left: `${selectedReaction.left}px`,
            top: `${selectedReaction.top}px`,
            zIndex: 11,
          }}
        >
          <ViewReaction
            reactionData={reactionData}
            reaction={selectedReaction}
            onClose={() => setSelectedReaction(null)}
            addReactionLike={() =>
              addReactionLike({ singleReactionId: selectedReaction.reactionId })
            }
            deleteReaction={() =>
              deleteReaction({ singleReactionId: selectedReaction.reactionId })
            }
          />
        </div>
      )}

      <div
        className="fixed top-0 right-0 h-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`top-0 right-0 h-full transition-transform duration-300 ${
            isHovered ? "transform translate-x-0" : "transform translate-x-full"
          }`}
        >
          <VerticalActionBar
            isTapsOn={isTapsOn}
            toggleTaps={toggleTaps}
            closeFullImage={closeFullImage}
            isDropsOn={isDropsOn}
            toggleDrops={toggleDrops}
          />
        </div>
      </div>
      {/* Close button */}
      <button
        className="absolute z-10 top-2 left-0 p-2 w-10 text-white"
        onClick={closeFullImage}
        
      >
        X
      </button>
    </div>
  );
};

export default FullImageWithTappables;
