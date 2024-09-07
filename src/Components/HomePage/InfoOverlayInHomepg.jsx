import React, { useEffect, useState } from "react";
import tappablegif from "../../assets/tappablegif.gif";
import { useLocation, useNavigate } from "react-router";
import { baseURL } from "../../Constants/urls";
import share from "../../assets/Share.svg";
import comment from "../../assets/comment.svg";
  


const InfoOverlayInHomepg = ({ tappableContent, onClose }) => {
  const location = useLocation();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const searchParams = new URLSearchParams(location.search);
  // const [tappableContent, setTappableContent] = useState(null);
  const navigate = useNavigate();
  const imageId = searchParams.get("imageId");
  const tappableId = searchParams.get("tappableId");
  const [isMobile, setIsMobile] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  console.log("imageId 24 : ", imageId);
  console.log("tappableId 25 : ", tappableId);

  useEffect(() => {
    // Detect screen size to toggle between mobile and desktop views
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // `768px` is the breakpoint for mobile
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial state
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchTappableContent = async () => {
      // if (imageId && tappableId) {
      try {
        const response = await fetch(
          `${baseURL}/board/fetchTappableContain?imageId=${imageId}&tappableId=${tappableId}`,

          {
            method: "GET",
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.status && data.data) {
            setTappableContent(data.data);
          } else {
            console.error("Invalid data format received");
          }
        } else {
          console.error(
            "Failed to fetch tappable content:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching tappable content:", error);
      }
      // } else {
      //   console.error("Image ID or Tappable ID is missing");
    };

    fetchTappableContent();
  }, []);
  // }, [imageId, tappableId]);
  if (!tappableContent) {
    return <div>Loading...</div>;
  }
  const handleBack = () => {
    navigate("/home");
  };

  
  const handleNextSlide = () => {
    setActiveSlide(
      (prev) => (prev + 1) % tappableContent.tappableSliderImages.length
    );
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) =>
      prev === 0 ? tappableContent.tappableSliderImages.length - 1 : prev - 1
    );
  };
  
  return (
    <div>
      {isMobile ? (
        // Mobile View
        <div className="bg-[#202020] w-full h-full flex overflow-y-auto">
          <div className="w-full h-full min-w-[100vw] min-h-[100vh] relative bg-[#202020] overflow-y-auto">
            {isFullScreen && (
              <FullScreenImage
                src={tappableContent.tappablePrymrImage}
                onClose={() => setIsFullScreen(false)}
              />
            )}
            <div className="sticky top-0 z-10 w-full h-[80px] bg-[#141414]/75 backdrop-blur-[14px]">
              <div className="w-full px-4 pt-10 pb-4 flex justify-between items-center">
                <div className="text-white" onClick={onClose}>
  X 
          </div>
                <div className="flex items-center gap-[5px]">
                  <div className="text-white text-xl font-bold font-['Nunito']">
                    Tappable
                  </div>
                  <div className="w-[29px] h-[29px] relative">
                    <div className="w-[15.08px] h-[15.08px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0084ff] rounded-full"></div>
                    <img
                      className="w-full h-full"
                      src={tappablegif}
                      alt="Tappable gif"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 pt-4 pb-8 flex flex-col gap-7">
              <div className="flex flex-col gap-3">
                {/* <div className="w-full aspect-square rounded-[23px] overflow-hidden">
                  <img
                    src={tappableContent.tappablePrymrImage}
                    alt="Tappable Primary Image"
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setIsFullScreen(true)}
                  />
                </div> */}
                   {/* {/ Slider /} */}
                   <div className="relative w-full h-full text-black">
                <button
                  onClick={handlePrevSlide}
                  className="absolute  float-left left-3 cursor-pointer text-left top-1/2 transform -translate-y-1/2 z-10  text-white p-2 rounded-r"
                  // className="absolute right-0 cursor-pointer top-1/2 float-start"
                >
                  Prev
                </button>
                <img
                  src={tappableContent.tappableSliderImages[activeSlide]}
                  alt="Slider Image"
                  className="w-full h-full object-cover rounded-[23px]"
                />
                <button
                  onClick={handleNextSlide}
                  // className="absolute right-3 float-end cursor-pointer top-1/2"
                  className="absolute  right-3 cursor-pointer text-right top-1/2 transform -translate-y-1/2 z-10  text-white p-2 rounded-r"
                >
                  Next
                </button>
              </div>
          {/* {/ Dots /} */}
          <div className="flex justify-center mt-2">
            {tappableContent.tappableSliderImages.map((_, index) => (
              <div
                key={index}
                className={`w-[6px] h-[6px] rounded-full mx-1 ${
                  index === activeSlide ? "bg-[#fff400]" : "bg-[#a4a4a4]"
                }`}
              ></div>
            ))}
          </div>

                <div className="flex justify-between items-center">
                  {tappableContent.price && (
                    <div className="text-[#0084ff] text-xs font-semibold font-['Nunito']">
                      {tappableContent.assetType}
                    </div>
                  )}
                  <div className="flex items-center gap-2 flex-grow justify-center">
                    <div className="flex gap-1">
                      {Array.from(
                        { length: tappableContent.tappablePrymrImage },
                        (_, index) => (
                          <div
                            key={index}
                            className={`w-[6px] h-[6px] rounded-full ${
                              index === 0 ? "bg-[#fff400]" : "bg-[#a4a4a4]"
                            }`}
                          ></div>
                        )
                      )}
                    </div>
                  </div>
                  <div className="text-[#999999] text-xs font-normal font-['Nunito']">
                    {new Date(tappableContent.cratedAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </div>
                </div>
              </div>

              <div className=" h-[200px] flex flex-col gap-4">
                <h2 className="text-white text-xl font-bold font-['Nunito'] leading-relaxed">
                  {tappableContent.title}
                </h2>
                <p className="text-[#c9c9c9] text-base font-bold font-['Nunito'] leading-tight overflow-y-auto">
                  {tappableContent.tappableDescription}
                </p>
              </div>

              {tappableContent.price && (
                <div className="flex flex-col gap-4">
                  <button className="w-full p-2.5 bg-[#0084ff] rounded-[65px] text-white text-xl font-medium font-['Inter'] leading-snug">
                    ${tappableContent.price} Checkout
                  </button>
                  <button className="w-full p-2.5 bg-[#2a2a2a] rounded-[51px] border-2 border-[#0084ff] text-white text-base font-medium font-['Nunito'] leading-[17.60px] tracking-tight">
                    Add to cart
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Desktop View
        <div className="w-[854px] h-[556px] relative bg-[#0d0d0d] rounded-[33.57px] shadow">
          {isFullScreen && (
            <FullScreenImage
              src={tappableContent.tappablePrymrImage}
              onClose={() => setIsFullScreen(false)}
            />
          )}

          <div className="w-[854px] h-[54.77px] flex text-white justify-between px-4 pb-4 pt-2">
            <div onClick={onClose}>X</div>
            <div className="flex gap-3">
              <div className="text-lg font-bold font-['Nunito']">Tappable</div>
              <div className="w-[29px] h-[29px] relative">
                <div className="w-[15.08px] h-[15.08px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0084ff] rounded-full"></div>
                <img
                  className="w-full h-full"
                  src={tappablegif}
                  alt="Tappable gif"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-[12px] px-[13px]">
            <div className="w-[430px] h-[430px] relative bg-[#151515] border border-[#0d0d0d] place-content-center">
              {/* Slider */}
              <div className="relative w-full h-full text-black">
                <button
                  onClick={handlePrevSlide}
                  className="absolute  float-left left-3 cursor-pointer text-left top-1/2 transform -translate-y-1/2 z-10  text-white p-2 rounded-r"
                  // className="absolute right-0 cursor-pointer top-1/2 float-start"
                >
                  Prev
                </button>
                <img
                  src={tappableContent.tappableSliderImages[activeSlide]}
                  alt="Slider Image"
                  className="w-full h-full object-cover rounded-[23px]"
                />
                <button
                  onClick={handleNextSlide}
                  // className="absolute right-3 float-end cursor-pointer top-1/2"
                  className="absolute  right-3 cursor-pointer text-right top-1/2 transform -translate-y-1/2 z-10  text-white p-2 rounded-r"
                >
                  Next
                </button>
              </div>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center mt-2">
                {tappableContent.tappableSliderImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-[6px] h-[6px] rounded-full mx-1 ${
                      index === activeSlide ? "bg-[#fff400]" : "bg-[#a4a4a4]"
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            <div className="w-[370px] h-[430px] relative bg-[#151515] flex-col justify-start items-start inline-flex">
              <h2 className="text-white text-xl font-bold font-['Nunito'] leading-relaxed">
                {tappableContent.title}
              </h2>
              <div className="text-[#c9c9c9] text-base  w-[370px] p-3  font-bold font-['Nunito']  overflow-y-auto">
                {tappableContent.tappableDescription}
              </div>
              {tappableContent.price && (
                <div className="w-[312.74px] h-[35.28px] p-2 bg-[#0084ff] rounded-[52.12px] justify-center items-center gap-2 absolute bottom-0 ">
                  <div className="justify-center items-center gap-[6.42px] flex">
                    <div className="text-white font-medium leading-[17.81px]">
                      ${tappableContent.price} Checkout
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-[854px] h-[54.77px] absolute bottom-0 flex text-white justify-between px-4 pb-4 pt-2">
            {tappableContent.price && (
              <div className="w-[108.30px] h-[31.34px] p-[7.17px] bg-neutral-800 rounded-[28.68px] border-2 border-[#191919] justify-center items-center gap-[7.17px] inline-flex">
                <div className="text-white text-xs font-semibold font-['Nunito'] capitalize tracking-tight">
                  {tappableContent.assetType}
                </div>
              </div>
            )}
            <div className="text-sm font-italic font-['Nunito'] absolute right-7">
              {new Date(tappableContent.cratedAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long", // for number 2-digit
                year: "numeric",
              })}
            </div>
          </div>
        </div>
   
    
  )}
    </div>
  );
};

const FullScreenImage = ({ src, onClose }) => (
  <div className="fixed inset-0 z-50 bg-black flex justify-center items-center">
    <button
      className="absolute top-4 right-0 w-full justify-end text-white text-2xl"
      onClick={onClose}
    >
      ×
    </button>
    <img
      src={src}
      alt="Full screen"
      className="max-w-full max-h-full object-contain"
    />
  </div>
);

export default InfoOverlayInHomepg;



// import React, { useEffect, useState } from "react";
// import tappablegif from "../../assets/tappablegif.gif";
// import { useLocation, useNavigate } from "react-router";
// import { baseURL } from "../../Constants/urls";

// const InfoOverlayInHomepg = ({ tappableContent, onClose }) => {
//   const location = useLocation();
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [activeSlide, setActiveSlide] = useState(0); // For slider control
//   const searchParams = new URLSearchParams(location.search);
//   const imageId = searchParams.get("imageId");
//   const tappableId = searchParams.get("tappableId");
//   const [isMobile, setIsMobile] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768); // `768px` is the breakpoint for mobile
//     };
//     window.addEventListener("resize", handleResize);
//     handleResize(); // Set initial state
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const fetchTappableContent = async () => {
//       try {
//         const response = await fetch(
//           `${baseURL}/board/fetchTappableContain?imageId=${imageId}&tappableId=${tappableId}`,
//           {
//             method: "GET",
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           if (data.status && data.data) {
//             setTappableContent(data.data);
//           } else {
//             console.error("Invalid data format received");
//           }
//         } else {
//           console.error(
//             "Failed to fetch tappable content:",
//             response.statusText
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching tappable content:", error);
//       }
//     };

//     fetchTappableContent();
//   }, [imageId, tappableId]);

//   if (!tappableContent) {
//     return <div>Loading...</div>;
//   }

//   const handleNextSlide = () => {
//     setActiveSlide(
//       (prev) => (prev + 1) % tappableContent.tappableSliderImages.length
//     );
//   };

//   const handlePrevSlide = () => {
//     setActiveSlide((prev) =>
//       prev === 0 ? tappableContent.tappableSliderImages.length - 1 : prev - 1
//     );
//   };

//   return (
//     <div>
//       {isMobile ? (
//         // Mobile View
//         <div className="bg-[#202020] w-full h-full flex overflow-y-auto">
//           <div className="w-full h-full min-h-[100vh] relative bg-[#202020] overflow-y-auto">
//             {isFullScreen && (
//               <FullScreenImage
//                 src={tappableContent.tappablePrymrImage}
//                 onClose={() => setIsFullScreen(false)}
//               />
//             )}
//             <div className="sticky top-0 z-10 w-full h-[116px] bg-[#141414]/75 backdrop-blur-[14px]">
//               <div className="w-full px-4 pt-10 pb-4 flex justify-between items-center">
//                 <div className="text-white" onClick={onClose}>
//                   X
//                 </div>
//                 <div className="flex items-center gap-[5px]">
//                   <div className="text-white text-xl font-bold font-['Nunito']">
//                     Tappable
//                   </div>
//                   <div className="w-[29px] h-[29px] relative">
//                     <div className="w-[15.08px] h-[15.08px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0084ff] rounded-full"></div>
//                     <img
//                       className="w-full h-full"
//                       src={tappablegif}
//                       alt="Tappable gif"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="px-4 pt-4 pb-8 flex flex-col gap-7">
//               <div className="flex gap-[12px] px-[13px]">
//                 <div className="w-[430px] h-[430px] relative bg-[#151515] border border-[#0d0d0d] place-content-center">
//                   {/* Slider */}
//                   <div className="relative w-full h-full">
//                     <button
//                       onClick={handlePrevSlide}
//                       className="absolute left-0 h-full cursor-pointer transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-r"
//                     ></button>
//                     <img
//                       src={tappableContent.tappableSliderImages[activeSlide]}
//                       alt="Slider Image"
//                       className="w-full h-full object-cover rounded-[23px]"
//                     />
//                     <button
//                       onClick={handleNextSlide}
//                       className="absolute right-0 h-full cursor-pointer transform -translate-y-1/2 z-10 bg-opacity-50 text-white p-2 rounded-l"
//                     ></button>
//                   </div>

//                   {/* Dots */}
//                   <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center mt-2">
//                     {tappableContent.tappableSliderImages.map((_, index) => (
//                       <div
//                         key={index}
//                         className={`w-[6px] h-[6px] rounded-full mx-1 ${
//                           index === activeSlide
//                             ? "bg-[#fff400]"
//                             : "bg-[#a4a4a4]"
//                         }`}
//                       ></div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="flex flex-col gap-4">
//                   <h2 className="text-white text-xl font-bold font-['Nunito'] leading-relaxed">
//                     {tappableContent.title}
//                   </h2>
//                   <p className="text-[#c9c9c9] text-base font-bold font-['Nunito'] leading-tight">
//                     {tappableContent.tappableDescription}
//                   </p>
//                 </div>

//                 {tappableContent.price && (
//                   <div className="flex flex-col gap-4">
//                     <button className="w-full p-2.5 bg-[#0084ff] rounded-[65px] text-white text-xl font-medium font-['Inter'] leading-snug">
//                       ${tappableContent.price} Checkout
//                     </button>
//                     <button className="w-full p-2.5 bg-[#2a2a2a] rounded-[51px] border-2 border-[#0084ff] text-white text-base font-medium font-['Nunito'] leading-[17.60px] tracking-tight">
//                       Add to cart
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         // Desktop View
//         <div className="w-[854px] h-[556px] relative bg-[#0d0d0d] rounded-[33.57px] shadow">
//           {isFullScreen && (
//             <FullScreenImage
//               src={tappableContent.tappablePrymrImage}
//               onClose={() => setIsFullScreen(false)}
//             />
//           )}

//           <div className="w-[854px] h-[54.77px] flex text-white justify-between px-4 pb-4 pt-2">
//             <div onClick={onClose}>X</div>
//             <div className="flex gap-3">
//               <div className="text-lg font-bold font-['Nunito']">Tappable</div>
//               <div className="w-[29px] h-[29px] relative">
//                 <div className="w-[15.08px] h-[15.08px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0084ff] rounded-full"></div>
//                 <img
//                   className="w-full h-full"
//                   src={tappablegif}
//                   alt="Tappable gif"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="flex gap-[12px] px-[13px]">
//             <div className="w-[430px] h-[430px] relative bg-[#151515] border border-[#0d0d0d] place-content-center">
//               {/* Slider */}
//               <div className="relative w-full h-full text-black">
//                 <button
//                   onClick={handlePrevSlide}
//                   className="absolute  float-left left-3 cursor-pointer text-left top-1/2 transform -translate-y-1/2 z-10  text-white p-2 rounded-r"
//                   // className="absolute right-0 cursor-pointer top-1/2 float-start"
//                 >
//                   Prev
//                 </button>
//                 <img
//                   src={tappableContent.tappableSliderImages[activeSlide]}
//                   alt="Slider Image"
//                   className="w-full h-full object-cover rounded-[23px]"
//                 />
//                 <button
//                   onClick={handleNextSlide}
//                   // className="absolute right-3 float-end cursor-pointer top-1/2"
//                   className="absolute  right-3 cursor-pointer text-right top-1/2 transform -translate-y-1/2 z-10  text-white p-2 rounded-r"
//                 >
//                   Next
//                 </button>
//               </div>

//               {/* Dots */}
//               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center mt-2">
//                 {tappableContent.tappableSliderImages.map((_, index) => (
//                   <div
//                     key={index}
//                     className={`w-[6px] h-[6px] rounded-full mx-1 ${
//                       index === activeSlide ? "bg-[#fff400]" : "bg-[#a4a4a4]"
//                     }`}
//                   ></div>
//                 ))}
//               </div>
//             </div>

//             <div className="w-[370px] h-[430px] relative bg-[#151515] flex-col justify-start items-start inline-flex">
//               <h2 className="text-white text-xl font-bold font-['Nunito'] leading-relaxed">
//                 {tappableContent.title}
//               </h2>
//               <div className="text-[#c9c9c9] text-base  w-[370px] p-3  font-bold font-['Nunito']  overflow-y-auto">
//                 {tappableContent.tappableDescription}
//               </div>
//               {tappableContent.price && (
//                 <div className="w-[312.74px] h-[35.28px] p-2 bg-[#0084ff] rounded-[52.12px] justify-center items-center gap-2 absolute bottom-0 ">
//                   <div className="justify-center items-center gap-[6.42px] flex">
//                     <div className="text-white font-medium leading-[17.81px]">
//                       ${tappableContent.price} Checkout
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="w-[854px] h-[54.77px] absolute bottom-0 flex text-white justify-between px-4 pb-4 pt-2">
//             {tappableContent.price && (
//               <div className="w-[108.30px] h-[31.34px] p-[7.17px] bg-neutral-800 rounded-[28.68px] border-2 border-[#191919] justify-center items-center gap-[7.17px] inline-flex">
//                 <div className="text-white text-xs font-semibold font-['Nunito'] capitalize tracking-tight">
//                   {tappableContent.assetType}
//                 </div>
//               </div>
//             )}
//             <div className="text-sm font-italic font-['Nunito'] absolute right-7">
//               {new Date(tappableContent.cratedAt).toLocaleDateString("en-GB", {
//                 day: "2-digit",
//                 month: "long", // for number 2-digit
//                 year: "numeric",
//               })}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const FullScreenImage = ({ src, onClose }) => (
//   <div className="fixed inset-0 z-50 bg-black flex justify-center items-center">
//     <button
//       className="absolute top-4 right-4 text-white text-2xl"
//       onClick={onClose}
//     >
//       ×
//     </button>
//     <img
//       src={src}
//       alt="Full screen"
//       className="max-w-full max-h-full object-contain"
//     />
//   </div>
// );

// export default InfoOverlayInHomepg;


//   return (
//     <div className="w-[854px] h-[556px] relative bg-[#0d0d0d] rounded-[33.57px] shadow">
//       {isFullScreen && (
//           <FullScreenImage
//             src={tappableContent.tappablePrymrImage}
//             onClick={onClose}
//           />
//         )}

//       <div className="w-[854px] h-[54.77px] flex text-white justify-between px-4 pb-4 pt-2">
//         <div onClick={onClose}>
// X 
//         </div>
//         <div className="flex gap-3">
//         <div className="text-lg font-bold font-['Nunito']">
// Tappable
//         </div>
//         <div className="w-[29px] h-[29px] relative">
//                 <div className="w-[15.08px] h-[15.08px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0084ff] rounded-full"></div>
//                 <img
//                   className="w-full h-full"
//                   src={tappablegif}
//                   alt="Tappable gif"
//                 />
//               </div>
//               </div>
//       </div>

// <div className="flex gap-[12px] px-[13px]">
//       <div className="w-[430px] h-[430px] relative bg-[#151515] border border-[#0d0d0d] place-content-center">
//       <div className="w-full aspect-square rounded-[23px] overflow-hidden">
//               <img
//                 src={tappableContent.tappablePrymrImage}
//                 alt="Tappable Primary Image"
//                 className="w-full h-full object-cover cursor-pointer"
//                 onClick={() => setIsFullScreen(true)}
//               />
//             </div>
//       </div>
//       <div className="flex items-center gap-2 flex-grow justify-center">
//                 <div className="flex gap-1">
//                   {Array.from(
//                     { length: tappableContent.tappablePrymrImage },
//                     (_, index) => (
//                       <div
//                         key={index}
//                         className={`w-[6px] h-[6px] rounded-full ${
//                           index === 0 ? "bg-[#fff400]" : "bg-[#a4a4a4]"
//                         }`}
//                       ></div>
//                     )
//                   )}
//                 </div>
//               </div>
//       <div className="w-[370px] h-[430px] relative bg-[#151515] flex-col justify-start items-start inline-flex">
//       <h2 className="text-white text-xl font-bold font-['Nunito'] leading-relaxed">
//               {tappableContent.title}
//             </h2>
//             <p className="text-[#c9c9c9] text-base font-bold font-['Nunito'] leading-tight">
//               {tappableContent.tappableDescription}
//             </p>
//             {tappableContent.price && (
//       <div className="w-[312.74px] h-[35.28px] p-2 bg-[#0084ff] rounded-[52.12px] justify-center items-center gap-2 absolute bottom-0 ">
        
//   <div className="justify-center items-center gap-[6.42px] flex">
  
//     <div className="text-white  font-medium  leading-[17.81px]">
//                 ${tappableContent.price} Checkout
//               </div>
//             </div>
// </div>
//             )}
// </div>
//       </div>


//       <div className="w-[854px] h-[54.77px] absolute bottom-0 flex text-white justify-between px-4 pb-4 pt-2">
//       {tappableContent.price && (<div className="w-[108.30px] h-[31.34px] p-[7.17px] bg-neutral-800 rounded-[28.68px] border-2 border-[#191919] justify-center items-center gap-[7.17px] inline-flex">
//   <div className="text-white text-xs font-semibold font-['Nunito'] capitalize tracking-tight"> {tappableContent.assetType}</div>
// </div>)}
//         <div className="text-sm font-italic font-['Nunito'] absolute right-7">
//         {new Date(tappableContent.cratedAt).toLocaleDateString(
//                   "en-GB",
//                   {
//                     day: "2-digit",
//                     month: "long", // for number 2-digit
//                     year: "numeric",
//                   }
//                 )}
//         </div>
//       </div>
// </div>
 
  
// );
// }
// const FullScreenImage = ({ src, onClose }) => (
//   <div className="fixed inset-0 z-50 bg-black flex justify-center items-center">
//     <button
//       className="absolute top-4 right-4 text-white text-2xl"
//       onClick={onClose}
//     >
//       ×
//     </button>
//     <img
//       src={src}
//       alt="Full screen"
//       className="max-w-full max-h-full object-contain"
//     />
//   </div>
// );