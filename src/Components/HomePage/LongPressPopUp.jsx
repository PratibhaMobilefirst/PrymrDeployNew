// //working fine
// import React, { useEffect, useRef, useState } from "react";
// import "./home.css";
// import Avatar_pizzaboy from "../../assets/Avatar_pizzaboy.png";
// import Smily2 from "../../assets/Smily2.svg";
// import ImageSquare from "../../assets/ImageSquare.svg";
// import gif from "../../assets/gif.svg";
// import PaperPlaneRight from "../../assets/PaperPlaneRight.svg";
// import Line68 from "../../assets/Line68.png";
// import Gift_pop from "../../assets/Gift_pop.svg";
// import X from "../../assets/X.svg";
// import EmojiPicker from "emoji-picker-react";
// import Draggable from "react-draggable";

// const LongPressPopUp = ({
//   onClose,
//   onTextEnter,
//   reactionData,
//   backgroundCapture,
//   popupPosition,
//   onEmojiSelect,
// }) => {
//   const [text, setText] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [gifs, setGifs] = useState([]);
//   const userName = localStorage.getItem("userName");
//   const profileImage = localStorage.getItem("profileImage");
//   const [showGifPicker, setShowGifPicker] = useState(false);
//   const [selectedGif, setSelectedGif] = useState(null);
//   const inputRef = useRef(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedEmoji, setSelectedEmoji] = useState(null);
//   useEffect(() => {
//     if (reactionData) {
//       setIsLoading(false);
//     }
//     console.log(reactionData);
//   }, [reactionData]);

//   const fetchGifs = async (searchTerm = "") => {
//     console.log("Fetching GIFs...");
//     const apiKey = "LIVDSRZULELA"; // This is a test API key, replace with your own from Tenor
//     const url = `https://g.tenor.com/v1/search?q=${searchTerm}&key=${apiKey}&limit=50`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       console.log("GIFs fetched:", data.results);
//       setGifs(data.results || []); // Ensure we always set an array
//     } catch (error) {
//       console.error("Error fetching GIFs:", error);
//       setGifs([
//         {
//           id: "1",
//           media: [
//             {
//               tinygif: {
//                 url: "https://media1.tenor.com/images/xxxxxx/tenor.gif",
//               },
//             },
//           ],
//         },
//         {
//           id: "2",
//           media: [
//             {
//               tinygif: {
//                 url: "https://media2.tenor.com/images/xxxxxx/tenor.gif",
//               },
//             },
//           ],
//         },
//       ]);
//     }
//   };

//   const handleTextChange = (e) => {
//     const newText = e.target.innerText.replace(/\n$/, "");
//     setText(newText);
//     setText(e.target.innerText);
//   };

//   const handleAddText = () => {
//     if (text.trim() !== "" || selectedImage || selectedGif) {
//       const yellowBoxPosition = { x: 105.14, y: 3 }; // Position of yellow box relative to popup
//       onTextEnter({
//         text,
//         image: selectedImage,
//         gif: selectedGif,
//         yellowBoxPosition,
//         backgroundCapture,
//       });
//       // Clear the input field after submission
//       setText("");
//       setSelectedImage(null);
//       setSelectedGif(null);
//       if (inputRef.current) {
//         inputRef.current.innerText = "";
//       }
//     }
//   };

//   useEffect(() => {
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, []);

//   const handleEmojiClick = (emojiData, event) => {
//     const selectedEmoji = emojiData.emoji;
//     setSelectedEmoji(selectedEmoji);
//     setShowEmojiPicker(false);
//     onEmojiSelect(selectedEmoji); // Pass the selected emoji back to the parent
//   };
//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setSelectedImage(e.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   useEffect(() => {
//     console.log("showGifPicker:", showGifPicker);
//     if (showGifPicker) {
//       fetchGifs();
//     }
//   }, [showGifPicker]);

//   const handleGifClick = (gif) => {
//     setSelectedGif(gif.media[0].gif.url);
//     setShowGifPicker(false);
//   };

//   const removeSelectedMedia = () => {
//     setSelectedImage(null);
//     setSelectedGif(null);
//   };
//   const handleAddReaction = () => {
//     const newReaction = {
//       text: inputRef.current.textContent,
//       emoji: selectedEmoji,
//       image: selectedImage,
//       gif: selectedGif,
//     };
//     setReactions([...reactions, newReaction]);

//     // Reset input and selections
//     inputRef.current.textContent = "";
//     setSelectedEmoji(null);
//     setSelectedImage(null);
//     setSelectedGif(null);
//   };
//   //emoji album and gif
//   //   return (
//   //     <div className="w-auto h-[302px] relative bg-white/0 rounded-xl backdrop-blur-[34.29px] z-10">
//   //       <div className="w-[296px] h-[218px] left-0 top-[84px] absolute bg-gray-200 rounded-xl" />
//   //       <div
//   //         className="w-8 h-8 p-[10.29px] left-[254.86px] top-[91.86px] absolute bg-[#adadad]/20 rounded-[6.86px] border-white justify-center items-center gap-[8.57px] inline-flex cursor-pointer"
//   //         onClick={onClose}
//   //       >
//   //         <div className="grow shrink basis-0 self-stretch justify-center items-center flex">
//   //           <div className="w-[23.72px] h-[23.72px] relative">
//   //             <img src={X} alt="X" />
//   //           </div>
//   //         </div>
//   //       </div>
//   //       <div className="left-[198px] top-[275px] absolute text-[#676767] text-xs font-semibold font-['Nunito'] text-nowrap">
//   //         Send gift
//   //       </div>
//   //       <div className="left-[42px] top-[97px] absolute text-[#282828] text-sm font-bold font-['Nunito'] text-nowrap">
//   //         {userName || "User"}
//   //       </div>
//   //       <div className="w-7 h-7 p-0.5 left-[9px] top-[92px] absolute bg-white rounded-[31px] border border-black justify-center items-center inline-flex">
//   //         <img
//   //           className="grow shrink basis-0 self-stretch rounded-[28.50px] border-white"
//   //           src={profileImage || Avatar_pizzaboy}
//   //           // alt="Avatar"
//   //         />{" "}
//   //       </div>
//   //       <div className="absolute left-[9.14px] top-[131.86px] w-[276.58px] z-20">
//   //         <div
//   //           ref={inputRef}
//   //           contentEditable
//   //           className="w-full pl-[22.86px] pr-[22.86px] py-[11px] bg-[#f4f4f4] rounded text-black border border-black focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-y-auto"
//   //           onInput={handleTextChange}
//   //           onMouseDown={(e) => e.stopPropagation()}
//   //           style={{
//   //             minHeight: "2.5em",
//   //             maxHeight: "3.5em",
//   //             cursor: "text",
//   //             whiteSpace: "pre-wrap",
//   //             overflowWrap: "break-word",
//   //           }}
//   //           data-placeholder="Write a Reaction"
//   //         ></div>
//   //       </div>
//   //       {selectedImage && (
//   //         <div className="absolute left-0 z-10">
//   //           <img
//   //             src={selectedImage}
//   //             alt="Uploaded"
//   //             className="w-20 h-20 object-cover"
//   //           />
//   //         </div>
//   //       )}

//   //       {selectedGif && (
//   //         <div className="absolute  left-0">
//   //           <img
//   //             src={selectedGif}
//   //             alt="Selected GIF"
//   //             className="w-20 h-20 object-cover"
//   //           />
//   //         </div>
//   //       )}
//   //       <div className="left-[19.28px] top-[187px] absolute text-[#8a8a8a] text-xs font-semibold font-['Nunito'] text-nowrap">
//   //         Drop a reaction on the board
//   //       </div>
//   //       <div className="w-[275.44px] h-[0px] left-[9.14px] top-[179.86px] absolute border border-[#a1a0a0]"></div>
//   //       <div className="w-[275.44px] h-[0px] left-[9.14px] top-[253px] absolute border border-[#a1a0a0]"></div>
//   //       {/* // In the JSX for the yellow box (only show plain text, not emojis) */}
//   //       <div className="w-[75px] h-[75px] left-[105.14px] top-[3px] absolute bg-white/0 rounded-xl border-2 border-[#fff400] flex items-center justify-center overflow-hidden">
//   //         {/* Capture area indicator */}
//   //         <div className="absolute inset-2 border-2 border-dashed border-blue-500 bg-blue-200 bg-opacity-30 rounded-lg pointer-events-none">
//   //           <div className="absolute top-1 left-1 text-xs text-blue-700 font-bold">
//   //             Capture Area
//   //           </div>
//   //         </div>
//   //         <p className="text-xs text-black text-center p-1 overflow-y-auto max-h-full w-full">
//   //           {text.split("\n").map((line, index) => (
//   //             <React.Fragment key={index}>
//   //               {line}
//   //               {index < text.split("\n").length - 1 && <br />}
//   //             </React.Fragment>
//   //           ))}
//   //         </p>
//   //       </div>
//   //       <div className="left-[14.86px] top-[208px] absolute items-center flex gap-24">
//   //         <div className="h-[34.29px]  items-start gap-6 flex">
//   //           <div
//   //             className="w-[30.86px] h-[30.86px] justify-center items-center flex cursor-pointer"
//   //             onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//   //           >
//   //             <div className="w-[30.86px] h-[30.86px] relative">
//   //               <img src={Smily2} alt="Smiley" />
//   //             </div>
//   //           </div>

//   //           {showEmojiPicker && (
//   //             <div className="absolute bottom-16 left-0 ">
//   //               <EmojiPicker onEmojiClick={handleEmojiClick} />
//   //             </div>
//   //           )}
//   //           <div className="w-8 h-8 justify-center items-center flex cursor-pointer">
//   //             <label htmlFor="imageUpload" className="cursor-pointer">
//   //               <div className="w-8 h-8 relative">
//   //                 <img src={ImageSquare} alt="ImageSquare" />
//   //               </div>
//   //             </label>
//   //             <input
//   //               id="imageUpload"
//   //               type="file"
//   //               accept="image/*"
//   //               onChange={handleImageUpload}
//   //               style={{ display: "none" }}
//   //             />
//   //           </div>

//   //           <div
//   //             className="w-8 h-8 justify-center items-center flex cursor-pointer"
//   //             onClick={() => {
//   //               console.log("GIF button clicked");
//   //               setShowGifPicker((prev) => !prev);
//   //             }}
//   //           >
//   //             <div className="w-8 h-8 relative">
//   //               <img src={gif} alt="gif" />
//   //             </div>
//   //           </div>
//   //           {showGifPicker && (
//   //             <div className="absolute bottom-16 z-10 left-0 w-64 h-64 overflow-auto bg-white border border-gray-300 rounded">
//   //               <div className="grid grid-cols-3 gap-2 p-2">
//   //                 {gifs && gifs.length > 0 ? (
//   //                   gifs.map((gif) => (
//   //                     <img
//   //                       key={gif.id}
//   //                       src={gif.media[0].tinygif.url}
//   //                       alt="GIF"
//   //                       className="w-full h-auto cursor-pointer"
//   //                       onClick={() => handleGifClick(gif)}
//   //                     />
//   //                   ))
//   //                 ) : (
//   //                   <p>Loading GIFs...</p>
//   //                 )}
//   //               </div>
//   //             </div>
//   //           )}
//   //         </div>
//   //         <div
//   //           className="w-[28.57px] h-[28.57px]  items-center flex cursor-pointer"
//   //           onClick={handleAddText}
//   //         >
//   //           <div className="w-[28.57px] h-[28.57px] relative ">
//   //             <img src={PaperPlaneRight} alt="PaperPlaneRight" />
//   //           </div>
//   //         </div>
//   //       </div>
//   //       <div className="w-[32.28px] h-[32.28px] px-1 pt-[3.50px] pb-1.5 left-[253px] top-[261px] absolute items-center cursor-pointer">
//   //         <div className="w-[24.21px] h-[22.73px] relative">
//   //           <img src={Gift_pop} alt="gift" />
//   //         </div>
//   //       </div>
//   //       <div className="p-[11.50px] left-[12px] top-[127px] absolute justify-start items-start gap-[11.50px]">
//   //         <div className="w-[23px] h-[0px] origin-top-left rotate-90 border border-black"></div>
//   //       </div>
//   //     </div>
//   //   );
//   // };

//   // export default LongPressPopUp;
//   //emoji in yellow square

//   return (
//     <div className="w-[400px] h-[400px] relative bg-white/0  z-10">
//       {/* Yellow box for capturing area */}
//       <div
//         className="w-[75px] h-[75px] left-[105.14px] top-[3px] absolute bg-white/0 rounded-xl border-2 border-[#fff400] flex items-center justify-center overflow-hidden z-20 "
//         // style={{
//         //   top: `${popupPosition.y}px`,
//         //   left: `${popupPosition.x}px`,
//         // }}
//       >
//         <div
//           className="w-full h-full flex items-center justify-center cursor-pointer"
//           onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//         >
//           {selectedEmoji ? (
//             <span className="text-2xl absolute">{selectedEmoji}</span>
//           ) : (
//             <img
//               src={Smily2}
//               alt="Smiley"
//               className="absolute bottom-1 left-1 w-[30.86px] h-[30.86px]"
//             />
//           )}
//         </div>
//       </div>

//       <div className="w-[296px] left-0 top-[84px] absolute bg-gray-200 rounded-xl flex flex-col items-center">
//         {/* Scrollable container */}
//         <div className="max-h-[500px] overflow-y-auto w-full">
//           <div className="w-full flex justify-between items-center p-2">
//             <div className="flex items-center">
//               <div className="w-7 h-7 p-0.5 bg-white rounded-[31px] border border-black justify-center items-center inline-flex">
//                 <img
//                   className="grow shrink basis-0 self-stretch rounded-[28.50px] border-white"
//                   src={profileImage || Avatar_pizzaboy}
//                   alt="Avatar"
//                 />
//               </div>
//               <div className="ml-2 text-[#282828] text-sm font-bold font-['Nunito']">
//                 {userName || "User"}
//               </div>
//             </div>
//             <div
//               className="w-8 h-8 p-[10.29px] bg-[#adadad]/20 rounded-[6.86px] border-white justify-center items-center inline-flex cursor-pointer"
//               onClick={onClose}
//             >
//               <img src={X} alt="X" className="w-[23.72px] h-[23.72px]" />
//             </div>
//           </div>

//           {/* Input box */}
//           <div className="w-[276.58px]  mx-auto">
//             <div
//               ref={inputRef}
//               contentEditable
//               className="w-full pl-[22.86px] pr-[22.86px] py-[11px] bg-[#f4f4f4] rounded text-black border border-black focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-y-auto"
//               onInput={handleTextChange}
//               onMouseDown={(e) => e.stopPropagation()}
//               style={{
//                 minHeight: "2.5em",
//                 maxHeight: "3.5em",
//                 cursor: "text",
//                 whiteSpace: "pre-wrap",
//                 overflowWrap: "break-word",
//               }}
//               data-placeholder="Write a Reaction"
//             ></div>
//           </div>

//           {/* Selected Image or GIF Display */}

//           {(selectedImage || selectedGif) && (
//             <div className="m-1 w-auto h-auto flex items-center justify-center relative">
//               <img
//                 src={selectedImage || selectedGif}
//                 alt="Selected Media"
//                 className="w-24 h-24 object-contain"
//               />
//               <button
//                 onClick={removeSelectedMedia}
//                 className="absolute top-0 right-0  text-black rounded-full w-10 h-10 flex items-center justify-center"
//               >
//                 <img src={X} alt="Remove" className="w-20 h-20" />
//               </button>
//             </div>
//           )}
//           {/* "Drop a reaction" text */}
//           <div className="p-1 text-[#8a8a8a] text-xs font-semibold font-['Nunito'] ml-1">
//             Add image, video, GIF to reaction
//           </div>

//           {/* Action buttons */}
//           <div className="w-full flex justify-between items-center p-1">
//             <div className="flex items-center gap-6">
//               <label htmlFor="imageUpload" className="cursor-pointer">
//                 <img src={ImageSquare} alt="ImageSquare" className="w-8 h-8" />
//               </label>
//               <input
//                 id="imageUpload"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 style={{ display: "none" }}
//               />
//               <div
//                 className="w-8 h-8 justify-center items-center flex cursor-pointer"
//                 onClick={() => setShowGifPicker((prev) => !prev)}
//               >
//                 <img src={gif} alt="gif" className="w-full h-full" />
//               </div>
//             </div>
//             <div
//               className="w-[28.57px] h-[28.57px] items-center flex cursor-pointer"
//               onClick={handleAddText}
//             >
//               <img
//                 src={Line68}
//                 alt="PaperPlaneRight"
//                 className="w-full h-full"
//               />
//               <img
//                 src={PaperPlaneRight}
//                 alt="PaperPlaneRight"
//                 className="w-full h-full"
//               />
//             </div>
//           </div>

//           {/* Gift icon */}

//           <div className="justify-end w-auto  float-end pr-20 p-2">
//             <div className="w-[32.28px] h-[32.28px] cursor-pointer flex gap-2  ">
//               <span className="text-gray-400 text-nowrap">Send gift </span>
//               <img
//                 src={Gift_pop}
//                 alt="gift"
//                 className="w-[24.21px] h-[22.73px]"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       {/*
//       <Draggable bounds="parent">
//         <div className="w-[75px] h-[75px] absolute bg-white/0 rounded-xl border-2 border-[#fff400] flex items-center justify-center overflow-hidden z-20 cursor-move">
//           <div
//             className="w-full h-full flex items-center justify-center cursor-pointer"
//             onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//           >
//             {selectedEmoji ? (
//               <span className="text-2xl absolute">{selectedEmoji}</span>
//             ) : (
//               <img
//                 src={Smily2}
//                 alt="Smiley"
//                 className="absolute bottom-1 left-1 w-[30.86px] h-[30.86px]"
//               />
//             )}
//           </div>
//         </div>
//       </Draggable> */}

//       {/* Emoji Picker */}
//       {showEmojiPicker && (
//         <div className="absolute  z-30 bg-white p-2 rounded shadow-lg">
//           <button
//             className="absolute w-full text-black text-end pr-8 pb-2 text-sm z-10 cursor-pointer"
//             onClick={() => setShowEmojiPicker(false)}
//           >
//             X
//           </button>
//           <EmojiPicker onEmojiClick={handleEmojiClick} />
//         </div>
//       )}
//       {/* GIF Picker */}
//       {showGifPicker && (
//         <div className="absolute z-30 left-1 w-64 h-64 overflow-auto bg-white border border-gray-300 rounded relative">
//           <button
//             className="absolute w-full text-black text-end pr-8 pb-2 text-sm z-10 cursor-pointer"
//             onClick={() => setShowGifPicker(false)}
//           >
//             X
//           </button>
//           <div className="grid grid-cols-3 gap-2 p-2 mt-7">
//             {gifs && gifs.length > 0 ? (
//               gifs.map((gif) => (
//                 <img
//                   key={gif.id}
//                   src={gif.media[0].tinygif.url}
//                   alt="GIF"
//                   className="w-full h-auto cursor-pointer"
//                   onClick={() => handleGifClick(gif)}
//                 />
//               ))
//             ) : (
//               <p>Loading GIFs...</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LongPressPopUp;

//working fine
import React, { useEffect, useRef, useState } from "react";
import "./home.css";
import Avatar_pizzaboy from "../../assets/Avatar_pizzaboy.png";
import Smily2 from "../../assets/Smily2.svg";
import ImageSquare from "../../assets/ImageSquare.svg";
import gif from "../../assets/gif.svg";
import PaperPlaneRight from "../../assets/PaperPlaneRight.svg";
import Line68 from "../../assets/Line68.png";
import Gift_pop from "../../assets/Gift_pop.svg";
import X from "../../assets/X.svg";
import EmojiPicker from "emoji-picker-react";
import Draggable from "react-draggable";

const LongPressPopUp = ({
  onClose,
  onTextEnter,
  reactionData,
  backgroundCapture,
  popupPosition,
  onEmojiSelect,
}) => {
  const yellowBoxRef = useRef(null);
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [gifs, setGifs] = useState([]);
  const userName = localStorage.getItem("userName");
  const profileImage = localStorage.getItem("profileIcon");
  const initialIconUrl = localStorage.getItem("initialIconUrl");
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [selectedGif, setSelectedGif] = useState(null);
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [position, setPosition] = useState("bottom"); // State to manage position
  const whiteBoxRef = useRef(null);
  const smileyButtonRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    const checkPosition = () => {
      if (whiteBoxRef.current && smileyButtonRef.current) {
        const whiteBoxRect = whiteBoxRef.current.getBoundingClientRect();
        const smileyButtonRect =
          smileyButtonRef.current.getBoundingClientRect();

        // Calculate available space above and below
        const spaceAbove = smileyButtonRect.top;
        const spaceBelow = window.innerHeight - smileyButtonRect.bottom;

        // If space below is less than the white box height, position it above
        if (spaceBelow < whiteBoxRect.height) {
          setPosition("top");
        } else {
          setPosition("bottom");
        }
      }
    };

    window.addEventListener("resize", checkPosition);
    checkPosition(); // Initial check on mount

    return () => window.removeEventListener("resize", checkPosition);
  }, []);

  useEffect(() => {
    if (reactionData) {
      setIsLoading(false);
    }
    console.log(reactionData);
  }, [reactionData]);

  const fetchGifs = async (searchTerm = "") => {
    console.log("Fetching GIFs...");
    const apiKey = "LIVDSRZULELA"; // This is a test API key, replace with your own from Tenor
    const url = `https://g.tenor.com/v1/search?q=${searchTerm}&key=${apiKey}&limit=50`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("GIFs fetched:", data.results);
      setGifs(data.results || []); // Ensure we always set an array
    } catch (error) {
      console.error("Error fetching GIFs:", error);
      setGifs([
        {
          id: "1",
          media: [
            {
              tinygif: {
                url: "https://media1.tenor.com/images/xxxxxx/tenor.gif",
              },
            },
          ],
        },
        {
          id: "2",
          media: [
            {
              tinygif: {
                url: "https://media2.tenor.com/images/xxxxxx/tenor.gif",
              },
            },
          ],
        },
      ]);
    }
  };

  const handleTextChange = (e) => {
    const newText = e.target.innerText.replace(/\n$/, "");
    setText(newText);
    setText(e.target.innerText);
  };

  const handleAddText = () => {
    if (text.trim() !== "" || selectedImage || selectedGif) {
      const yellowBoxPosition = { x: 105.14, y: 3 }; // Position of yellow box relative to popup
      onTextEnter({
        text,
        image: selectedImage,
        gif: selectedGif,
        yellowBoxPosition,
        backgroundCapture,
      });
      // Clear the input field after submission
      setText("");
      setSelectedImage(null);
      setSelectedGif(null);
      if (inputRef.current) {
        inputRef.current.innerText = "";
      }
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleEmojiClick = (emojiData, event) => {
    const selectedEmoji = emojiData.emoji;
    setSelectedEmoji(selectedEmoji);
    setShowEmojiPicker(false);
    onEmojiSelect(selectedEmoji); // Pass the selected emoji back to the parent
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    console.log("showGifPicker:", showGifPicker);
    if (showGifPicker) {
      fetchGifs();
    }
  }, [showGifPicker]);

  const handleGifClick = (gif) => {
    setSelectedGif(gif.media[0].gif.url);
    setShowGifPicker(false);
  };

  const removeSelectedMedia = () => {
    setSelectedImage(null);
    setSelectedGif(null);
  };
  const handleAddReaction = () => {
    const newReaction = {
      text: inputRef.current.textContent,
      emoji: selectedEmoji,
      image: selectedImage,
      gif: selectedGif,
    };
    setReactions([...reactions, newReaction]);

    // Reset input and selections
    inputRef.current.textContent = "";
    setSelectedEmoji(null);
    setSelectedImage(null);
    setSelectedGif(null);
  };
  const handleDragStart = () => {
    setIsDragging(true);
    setShowEmojiPicker(false);
  };

  const handleDragStop = () => {
    setIsDragging(false);
  };
  // Function to capture the background when needed
  const handleCaptureBackground = () => {
    if (yellowBoxRef.current) {
      const rect = yellowBoxRef.current.getBoundingClientRect();
      // Capture the image content from the yellow box
      const capturedImage = captureBackground(rect);
      // Call the callback to send captured image back to FullImageWithTappables
      onCaptureBackground(capturedImage);
    }
  };
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
    return capturedImage;
  };
  
  return (
    <div className="w-[400px] h-[400px] relative bg-white/0 z-10">
      {/* Yellow box for capturing area */}
      <div
        ref={yellowBoxRef}
        className="w-[75px] h-[75px] left-[105.14px] top-[3px] absolute bg-white/0 rounded-xl border-2 border-[#fff400] flex items-center justify-center overflow-hidden z-20 "
        onClick={handleCaptureBackground}
      >
        <div
          className="w-full h-full flex items-center justify-center cursor-pointer"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          {selectedEmoji ? (
            <span className="text-2xl absolute">{selectedEmoji}</span>
          ) : (
            <img
              src={Smily2}
              alt="Smiley"
              className="absolute bottom-1 left-1 w-[30.86px] h-[30.86px]"
            />
          )}
        </div>
      </div>

      
      <div
        ref={whiteBoxRef}
        className={`w-[296px] absolute bg-gray-200 rounded-xl flex flex-col items-center z-10 ${
          position === "top" ? "bottom-[calc(100%+10px)]" : "top-[84px]"
        }`}
        style={{ left: "0" }}
      >
        {/* Scrollable container */}
        <div className="max-h-[500px] overflow-y-auto w-full">
          <div className="w-full flex justify-between items-center p-2">
            <div className="flex items-center">
              <div className="w-7 h-7 p-0.5 bg-white rounded-[31px] border border-black justify-center items-center inline-flex">
                <img
                  className="grow shrink basis-0 self-stretch rounded-[28.50px] "
                  src={profileImage || Avatar_pizzaboy}
                  alt="Avatar"
                />
              </div>
              <div className="ml-2 text-[#282828] text-sm font-bold font-['Nunito']">
                {userName || "User"}
              </div>
            </div>
            <div
              className="w-8 h-8 p-[10.29px] bg-[#adadad]/20 rounded-[6.86px] border-white justify-center items-center inline-flex cursor-pointer"
              onClick={onClose}
            >
              <img src={X} alt="X" className="w-[23.72px] h-[23.72px]" />
            </div>
          </div>

          {/* Input box */}
          <div className="w-[276.58px]  mx-auto">
            <div
              ref={inputRef}
              contentEditable
              className="w-full pl-[22.86px] pr-[22.86px] py-[11px] bg-[#f4f4f4] rounded text-black border border-black focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-y-auto"
              onInput={handleTextChange}
              onMouseDown={(e) => e.stopPropagation()}
              style={{
                minHeight: "2.5em",
                maxHeight: "3.5em",
                cursor: "text",
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
              }}
              data-placeholder="Write a Reaction"
            ></div>
          </div>

          {/* Selected Image or GIF Display */}

          {(selectedImage || selectedGif) && (
            <div className="m-1 w-auto h-auto flex items-center justify-center relative">
              <img
                src={selectedImage || selectedGif}
                alt="Selected Media"
                className="w-24 h-24 object-contain"
              />
              <button
                onClick={removeSelectedMedia}
                className="absolute top-0 right-0  text-black rounded-full w-10 h-10 flex items-center justify-center"
              >
                <img src={X} alt="Remove" className="w-20 h-20" />
              </button>
            </div>
          )}
          {/* "Drop a reaction" text */}
          <div className="p-1 text-[#8a8a8a] text-xs font-semibold font-['Nunito'] ml-1">
            Add image, video, GIF to reaction
          </div>

          {/* Action buttons */}
          <div className="w-full flex justify-between items-center p-1">
            <div className="flex items-center gap-6">
              <label htmlFor="imageUpload" className="cursor-pointer">
                <img src={ImageSquare} alt="ImageSquare" className="w-8 h-8" />
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <div
                className="w-8 h-8 justify-center items-center flex cursor-pointer"
                onClick={() => setShowGifPicker((prev) => !prev)}
              >
                <img src={gif} alt="gif" className="w-full h-full" />
              </div>
            </div>
            <div
              className="w-[28.57px] h-[28.57px] items-center flex cursor-pointer"
              onClick={handleAddText}
            >
              <img
                src={Line68}
                alt="PaperPlaneRight"
                className="w-full h-full"
              />
              <img
                src={PaperPlaneRight}
                alt="PaperPlaneRight"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Gift icon */}

          <div className="justify-end w-auto  float-end pr-20 p-2">
            <div className="w-[32.28px] h-[32.28px] cursor-pointer flex gap-2  ">
              <span className="text-gray-400 text-nowrap">Send gift </span>
              <img
                src={Gift_pop}
                alt="gift"
                className="w-[24.21px] h-[22.73px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && !isDragging && (
        <div className="absolute z-30 bg-white p-2 rounded shadow-lg">
          <button
            className="absolute w-full text-black text-end pr-8 pb-2 text-sm z-10 cursor-pointer"
            onClick={() => setShowEmojiPicker(false)}
          >
            X
          </button>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
      {/* GIF Picker */}
      {showGifPicker && (
        <div className="absolute z-30 left-1 w-64 h-64 overflow-auto bg-white border border-gray-300 rounded relative">
          <button
            className="absolute w-full text-black text-end pr-8 pb-2 text-sm z-10 cursor-pointer"
            onClick={() => setShowGifPicker(false)}
          >
            X
          </button>
          <div className="grid grid-cols-3 gap-2 p-2 mt-7">
            {gifs && gifs.length > 0 ? (
              gifs.map((gif) => (
                <img
                  key={gif.id}
                  src={gif.media[0].tinygif.url}
                  alt="GIF"
                  className="w-full h-auto cursor-pointer"
                  onClick={() => handleGifClick(gif)}
                />
              ))
            ) : (
              <p>Loading GIFs...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LongPressPopUp;
