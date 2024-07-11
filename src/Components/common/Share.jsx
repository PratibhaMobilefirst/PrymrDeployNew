import React, { useState } from "react";
import copy from "../../assets/CopyIcon.svg";
import smallavatar from "../../assets/smallAvatar.svg";
import storyframe from "../../assets/storyFrame.svg";
import { LuShare2 } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import share from "../../assets/Share.svg";
import X from "../../assets/x-mark.svg";
import tumbler from "../../assets/tumbler.svg";
import instagram from "../../assets/instagram.svg";
import flower from "../../assets/HD-wallpaper-white-flower-daisy-flores-flowers-sunflowers-vintage-thumbnail.jpg";
import Toastify from "toastify-js";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Share = () => {
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Adjusted for better layout
    slidesToScroll: 1,
  };

  // const handleCopy = () => {
  //   navigator.clipboard.writeText(link);
  //   setCopied(true);
  //   Toastify({
  //     text: "Link copied!",
  //     duration: 2000,
  //     close: true,
  //     gravity: "top",
  //     position: "right",
  //     style: {
  //       background: "linear-gradient(to right, #00b09b, #96c93d)",
  //     },
  //   }).showToast();
  // };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("Link copied!");
        // alert("Link copied!");
        // console.log("Link copied!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleShare = () => {
    console.log("Sharing to Instagram...");
    window.open("https://www.instagram.com", "_blank");
    setIsShared(true);
  };

  return (
    <>
      {/* <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>
     */}

      <div className="ml-2 mr-2 items-center justify-center text-white container  py-6 px-3">
        <div className="flex justify-between">
          {/* <p className="font-semibold text-[24px]">The History of it all </p> */}
          <img src={X} className="text-white text-xl -mt-2" />
          <h1 className="ml-auto">Share</h1>
          <img src={share} className="text-white text-xl -mt-2" />
        </div>

        <div className="pt-5 flex h-auto w-auto align-middle items-center justify-center">
          <div>
            <div className="flex justify-center items-center">
              <div className="w-[112px] h-[259px] lg:w-[212px] lg:h-[359px]  text-center">
                <img src={flower} />
              </div>
            </div>

            <div>
              <div className="mt-3 ">
                <button className="flex gap-3" disabled={isShared}>
                  <img src={instagram} />
                  <p className="text-md mb-2 mt-1" onClick={handleShare}>
                    Share via Instagram
                  </p>
                </button>
                <span className="flex gap-3 pl-1">
                  <img src={tumbler} className="ml-1" />
                  <p className="text-md ">Share via Tumbler</p>
                </span>
              </div>

              <div className="flex items-center justify-center h-9 border-2 mt-2">
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-60 bg-transparent py-2 rounded-sm placeholder:text-md  text-white text-center"
                  placeholder="https://prymer.com"
                />
                <div className="flex text-md px-4 items-center bg-[#2D78E6] gap-2 py-[2px]">
                  <img src={copy} alt="copy" />
                  <p onClick={handleCopy}>Copy</p>
                </div>
              </div>

              <div className="fixed bottom-0 text-xs mb-8 ">
                {/* <div className="mt-8 mb-3"> */}
                <p className="text-xs">SHARE VIA MESSAGE ON PRYMER</p>

                <div className="flex gap-2 mt-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="text-center">
                      <img
                        src={smallavatar}
                        alt="smallavatar"
                        className="h-10 w-10 rounded-full mx-auto"
                      />
                      <p>Lipita</p>
                      <small className="text-gray-400 text-xs">
                        @lipita.com
                      </small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Share;

// import React, { useState } from "react";
// import copy from "../../assets/CopyIcon.svg";
// import smallavatar from "../../assets/smallAvatar.svg";
// import storyframe from "../../assets/storyFrame.svg";
// import { LuShare2 } from "react-icons/lu";
// import { RxCross2 } from "react-icons/rx";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import share from "../../assets/Share.svg";
// import X from "../../assets/x-mark.svg";
// import tumbler from "../../assets/tumbler.svg";
// import instagram from "../../assets/instagram.svg";
// import Toastify from "toastify-js";
// import { useNavigate } from "react-router";

// const Share = () => {
//   const [link, setLink] = useState("");
//   const [copied, setCopied] = useState(false);
//   const [isShared, setIsShared] = useState(false);
//   const navigate = useNavigate();

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3, // Adjusted for better layout
//     slidesToScroll: 1,
//   };

//   // const handleCopy = () => {
//   //   navigator.clipboard.writeText(link);
//   //   setCopied(true);
//   //   Toastify({
//   //     text: "Link copied!",
//   //     duration: 2000,
//   //     close: true,
//   //     gravity: "top",
//   //     position: "right",
//   //     style: {
//   //       background: "linear-gradient(to right, #00b09b, #96c93d)",
//   //     },
//   //   }).showToast();
//   // };

//   const handleCopy = () => {
//     navigator.clipboard
//       .writeText(link)
//       .then(() => {
//         toastr.success("Link copied!");
//       })
//       .catch((err) => {
//         console.error("Failed to copy: ", err);
//       });
//   };

//   const handleShare = () => {
//     console.log("Sharing to Instagram...");
//     navigate("https://www.instagram.com/");
//     setIsShared(true);
//   };
//   return (
//     <div className="mx-auto items-center justify-center text-white container  py-6 px-3">
//       <div className="flex justify-between">
//         {/* <p className="font-semibold text-[24px]">The History of it all </p> */}
//         <img src={X} className="text-white text-xl -mt-2" />
//         <h1 className="ml-auto">Share</h1>
//         <img src={share} className="text-white text-xl -mt-2" />
//       </div>

//       <div className="pt-5 flex h-auto w-auto align-middle items-center justify-center">
//         <div>
//           <div className=" pl-12">
//             <div className="w-[212px]  h-[370px] text-center  bg-slate-500">
//               Image you're about to bookmark
//             </div>
//           </div>

//           <div>
//             <div className="mt-10 items-center">
//               <button
//                 className="flex gap-3"
//                 onClick={handleShare}
//                 disabled={isShared}
//               >
//                 <img src={instagram} />
//                 <p className="text-xl mb-3 ">Share via Instagram</p>
//                 {isShared && (
//                   <span className="ml-2 text-green-500">Shared!</span>
//                 )}
//               </button>
//               <span className="flex gap-3">
//                 <img src={tumbler} />
//                 <p className="text-xl ">Share via Tumbler</p>
//               </span>
//             </div>

//             <div className="flex mt-5 items-center justify-center border-2 ">
//               <input
//                 type="text"
//                 value={link}
//                 onChange={(e) => setLink(e.target.value)}
//                 className="w-60 bg-transparent py-2 rounded-sm placeholder:text-xl placeholder:py-4 text-white text-center"
//                 placeholder="https://prymer.com"
//               />
//               <div className="flex text-xl px-4 items-center bg-[#2D78E6] gap-2 py-[11px]">
//                 <img src={copy} alt="copy" />
//                 <p onClick={handleCopy}>Copy</p>
//               </div>
//             </div>

//             <div className="fixed bottom-0 mb-8 mt-3">
//               <p>SHARE VIA MESSAGE ON PRYMER</p>

//               <div className="flex gap-2 mt-2">
//                 {Array.from({ length: 5 }).map((_, index) => (
//                   <div key={index} className="text-center">
//                     <img
//                       src={smallavatar}
//                       alt="smallavatar"
//                       className="h-10 w-10 rounded-full mx-auto"
//                     />
//                     <p>Lipita</p>
//                     <small className="text-gray-400 text-xs">@lipita.com</small>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Share;
