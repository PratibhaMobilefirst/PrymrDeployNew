
// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/free-mode";
// import { useNavigate } from "react-router";
// import { baseURL } from "../../Constants/urls"; // Assuming baseURL is defined here
// import Galary from "../../assets/Galary.png";
// import viewColumns from "../../assets/viewColumns.png";
// import viewBox from "../../assets/viewBox.png";
// import leftarrow from "../../assets/leftarrow.svg";
// import headerinfo from "../../assets/headerInfo.png";
// import headershop from "../../assets/headershop.png";
// import Header from "../common/Header";
// import Navbar from "../common/Navbar";
// import deleteBai from "../../assets/deleteBai.svg";
// import DesktopNavbar from "../common/DesktopNavbar";
// import Contact from "./Contact";
// import CreatorInfo from "./CreatorInfo";
// import InfiniteScroll from "react-infinite-scroll-component";

// const Home = () => {
//   const [allBoards, setAllBoards] = useState([]);
//   const [layout, setLayout] = useState("grid");
//   const navigate = useNavigate();

//   const [isContactOpen, setIsContactOpen] = useState(false);
//   const [isInfoOpen, setInfoOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [pageSize, setPageSize] = useState();

//   const [useInfiniteScroll, setUseInfiniteScroll] = useState(false);
//   const [isArtOpen, setIsArtOpen] = useState(false);
//   const [activeItem, setActiveItem] = useState(null);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     // Check if the user is logged in and fetch boards accordingly
//     const token = localStorage.getItem("token");
//     if (token) {
//       fetchBoards();
//     }
//     fetchPublicBoards();
//   }, []);

//   const fetchPublicBoards = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `${baseURL}/board/fetchRecentPublicUserBoard?page=${page}&pageSize=${10}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const data = await response.json();
//       const totalCount = data?.data?.count || 0;
//       console.log("Count 58" + data.data.count);
//       setAllBoards((prevBoards) => [
//         ...prevBoards,
//         ...(data?.data?.data || []),
//       ]);
//       setPageSize(totalCount);

//       if (totalCount > 40) {
//         setUseInfiniteScroll(true);
//       }

//       setPage((prevPage) => prevPage + 1);
//     } catch (error) {
//       console.log("Error fetching public boards", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchBoards = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         `${baseURL}/board/fetchRecentPrivateUserBoard?page=${page}&pageSize=${10}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await response.json();
//       const totalCount = data?.data?.count || 0;

//       setAllBoards((prevBoards) => [
//         ...prevBoards,
//         ...(data?.data?.data || []),
//       ]);
//       setPageSize(totalCount);

//       if (totalCount > 40) {
//         setUseInfiniteScroll(true);
//       }

//       setPage((prevPage) => prevPage + 1);
//     } catch (error) {
//       console.log("Error fetching private boards", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div className="text-white">Loading...</div>;
//   }

//   if (!allBoards.length) {
//     return <div className="text-white">No boards available.</div>;
//   }

//   const toggleArt = () => {
//     setIsArtOpen(!isArtOpen);
//     if (isArtOpen) {
//       setIsContactOpen(false);
//     }
//     setActiveItem("Art");
//   };

//   const imagesforsmallpost = [
//     { src: deleteBai, alt: "Avatar 1" },
//     { src: deleteBai, alt: "Avatar 2" },
//     { src: deleteBai, alt: "Avatar 3" },
//   ];

//   const handleContact = () => {
//     setIsContactOpen(true);
//     setInfoOpen(false);
//     setActiveItem("Contact");
//   };

//   const handleInfo = () => {
//     setInfoOpen(true);
//     setIsContactOpen(false);
//     setActiveItem("Info");
//   };

//   const shouldShowPlus = () => {
//     const publicToken = localStorage.getItem("publicToken");
//     const privateToken = localStorage.getItem("token");
//     return publicToken || privateToken;
//   };

//   return (
//     <>
//       <div className="lg:w-[30%]">
//         <Header />

//         <nav className="p-4 pt-[14vh] text-white">
//           <ul className="space-y-4">
//             <li
//               className={`flex items-center space-x-2 cursor-pointer ${
//                 activeItem === "Art" || !activeItem
//                   ? "text-white"
//                   : "text-gray-500"
//               }`}
//               onClick={toggleArt}
//             >
//               <img className="w-6 h-6" src={Galary} alt="Galary" />
//               <span>Art</span>
//               <img
//                 className={`w-6 h-6 transform transition-transform ${
//                   isArtOpen ? "rotate-180" : "rotate-0"
//                 }`}
//                 src={leftarrow}
//                 alt="leftarrow"
//               />
//             </li>
//             {isArtOpen && (
//               <div className="space-y-4 mt-4 px-5">
//                 <div className="flex items-center space-x-2 cursor-pointer">
//                   <span>Traditional</span>
//                 </div>
//                 <div className="flex items-center cursor-pointer space-x-2">
//                   <span>Digital</span>
//                 </div>
//               </div>
//             )}
//             <li
//               className={`flex items-center space-x-2 cursor-pointer ${
//                 activeItem === "Shop" || !activeItem
//                   ? "text-white"
//                   : "text-gray-500"
//               }`}
//               onClick={() => setActiveItem("Shop")}
//             >
//               <img className="w-6 h-6" src={headershop} alt="headershop" />
//               <span>Shop</span>
//             </li>
//             <li
//               className={`flex items-center space-x-2 cursor-pointer ${
//                 activeItem === "Info" || !activeItem
//                   ? "text-white"
//                   : "text-gray-500"
//               }`}
//               onClick={handleInfo}
//             >
//               <img className="w-6 h-6" src={headerinfo} alt="headerinfo" />
//               <span>Info</span>
//             </li>
//             <li
//               className={`flex items-center space-x-2 cursor-pointer ${
//                 activeItem === "Contact" || !activeItem
//                   ? "text-white"
//                   : "text-gray-500"
//               }`}
//               onClick={handleContact}
//             >
//               <img className="w-6 h-6" src={headerinfo} alt="headerinfo" />
//               <span>Contact</span>
//             </li>
//           </ul>
//         </nav>
//       </div>
//       <div className="flex flex-col lg:flex-row">
//         <div className="lg:w-[30%]">
//           <div className="flex m-2 justify-between items-center">
//             <p className="font-italic text-white italic">Most recent uploads</p>
//             <div className="flex space-x-2 ml-auto">
//               <img
//                 className={`cursor-pointer ${
//                   layout === "column"
//                     ? "filter brightness-100"
//                     : "filter brightness-50 hover:brightness-75"
//                 }`}
//                 src={viewColumns}
//                 alt="viewColumns"
//                 onClick={() => setLayout("column")}
//               />
//               <img
//                 className={`cursor-pointer h-6 w-6 ${
//                   layout === "grid"
//                     ? "filter brightness-100"
//                     : "filter brightness-50 hover:brightness-75"
//                 }`}
//                 src={viewBox}
//                 alt="viewBox"
//                 onClick={() => setLayout("grid")}
//               />
//             </div>
//           </div>

//           <InfiniteScroll
//             dataLength={allBoards.length}
//             next={fetchBoards}
//             hasMore={useInfiniteScroll && allBoards.length < pageSize}
//             loader={<h4>Loading...</h4>}
//           >
//             <div className="mb-4 rounded-3xl pt-[2vh]">
//               <div className="text-white">
//                 <div
//                   className={
//                     layout === "grid"
//                       ? "grid grid-cols-2"
//                       : "flex flex-col gap-2 m-3"
//                   }
//                 >
//                   {Array.isArray(allBoards) &&
//                     allBoards.map((board, boardIndex) => (
//                       <div
//                         key={boardIndex}
//                         className={`text-[#747171] bg-black m-1 flex flex-col gap-2 relative w-auto ${
//                           useInfiniteScroll ? "overflow-y-auto" : "overflow-y"
//                         }`}
//                         style={{
//                           height: "42vh",
//                           borderRadius: "1.5rem",
//                         }}
//                       >
//                         {Array.isArray(board.BoardImages) &&
//                           board.BoardImages.map((image, imageIndex) => (
//                             <img
//                               key={imageIndex}
//                               className="h-[25vh] w-full cursor-pointer rounded-t-3xl object-cover"
//                               src={image.imageUrl}
//                               alt={`image-${imageIndex}`}
//                             />
//                           ))}
//                         <div className="left-2 flex m-2 h-10 space-x-2 relative z-0">
//                           <Swiper
//                             spaceBetween={10}
//                             slidesPerView="auto"
//                             centeredSlides={true}
//                             className="overflow-visible"
//                           >
//                             {imagesforsmallpost.map((image, index) => (
//                               <SwiperSlide key={index}>
//                                 <img
//                                   className="ml-1 cursor-pointer"
//                                   src={image.src}
//                                   alt={image.alt}
//                                 />
//                                 <img
//                                   src={deleteBai}
//                                   className="ml-1 w-2 h-2 cursor-pointer"
//                                   alt="delete"
//                                 />
//                                 <img
//                                   src={deleteBai}
//                                   className="ml-1 cursor-pointer"
//                                   alt="delete"
//                                 />
//                               </SwiperSlide>
//                             ))}
//                           </Swiper>
//                         </div>
//                         <div className="flex flex-col">
//                           <h3 className="text-xs ml-3 text-[#BFBFBF]">
//                             {board.BoardImages[0].title}
//                           </h3>

//                           <h2 className="px-2 mt-1 text-blue-800 text-xs italic">
//                             {new Date(
//                               board.BoardImages[0].createdAt
//                             ).toDateString()}
//                           </h2>
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             </div>
//           </InfiniteScroll>
//           <Navbar />
//         </div>
//         <div
//           className={`${
//             isInfoOpen || isContactOpen ? "block" : "hidden"
//           } lg:block lg:w-[70%] fixed right-0 top-0`}
//         >
//           <div className="m-5 text-white">
//             {isInfoOpen && (
//               <div className="flex justify-between h-[90vh] bg-[#191919]">
//                 <CreatorInfo />
//               </div>
//             )}
//             {isContactOpen && (
//               <div className="flex justify-between h-[90vh] bg-[#2A2A2A]">
//                 <Contact />
//               </div>
//             )}
//           </div>
//         </div>
//         <div
//           className={`lg:hidden ${
//             isInfoOpen || isContactOpen ? "block" : "hidden"
//           } w-full fixed bottom-0 left-0 bg-gray-800`}
//         >
//           <div className="m-5 text-white">
//             {isInfoOpen && (
//               <div className="flex justify-between lg:h-[90vh] bg-[#191919]">
//                 <CreatorInfo />
//               </div>
//             )}
//             {isContactOpen && (
//               <div className="flex justify-between lg:h-[90vh] bg-[#2A2A2A]">
//                 <Contact />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;






import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { useNavigate } from "react-router";
import { baseURL } from "../../Constants/urls";
import Galary from "../../assets/Galary.png";
import viewColumns from "../../assets/viewColumns.png";
import viewBox from "../../assets/viewBox.png";
import leftarrow from "../../assets/leftarrow.svg";
import headerinfo from "../../assets/headerInfo.png";
import headershop from "../../assets/headershop.png";
import Header from "../common/Header";
import Navbar from "../common/Navbar";
import deleteBai from "../../assets/deleteBai.svg";
import DesktopNavbar from "../common/DesktopNavbar";
import Contact from "./Contact";
import CreatorInfo from "./CreatorInfo";
import InfiniteScroll from "react-infinite-scroll-component";
import deleteInitial from "../../assets/deleteInitial.jpg";
import FullImageWithTappables from "./FullImageWithTappables";

const Home = () => {
  const [allBoards, setAllBoards] = useState([]);
  const [layout, setLayout] = useState("grid");
  const navigate = useNavigate();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isInfoOpen, setInfoOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState();
  const [useInfiniteScroll, setUseInfiniteScroll] = useState(false);
  const [isArtOpen, setIsArtOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [isFullImage, setIsFullImage] = useState(false);
  const [fullImageUrl, setFullImageUrl] = useState("");
  const [page, setPage] = useState(1);
  const [tappableAreas, setTappableAreas] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchBoards();
    }
    fetchPublicBoards();
  }, []);

  const fetchPublicBoards = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${baseURL}/board/fetchRecentPublicUserBoard?page=${page}&pageSize=${10}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      const totalCount = data?.data?.count || 0;
      setAllBoards((prevBoards) => [
        ...prevBoards,
        ...(data?.data?.data || []),
      ]);
      setPageSize(totalCount);

      if (totalCount > 40) {
        setUseInfiniteScroll(true);
      }

      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.log("Error fetching public boards", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBoards = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${baseURL}/board/fetchRecentPrivateUserBoard?page=${page}&pageSize=${10}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      const totalCount = data?.data?.count || 0;

      setAllBoards((prevBoards) => [
        ...prevBoards,
        ...(data?.data?.data || []),
      ]);
      setPageSize(totalCount);

      if (totalCount > 40) {
        setUseInfiniteScroll(true);
      }

      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.log("Error fetching private boards", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!allBoards.length) {
    return <div className="text-white">No boards available.</div>;
  }

  const toggleArt = () => {
    setIsArtOpen(!isArtOpen);
    if (isArtOpen) {
      setIsContactOpen(false);
    }
    setActiveItem("Art");
  };

  const imagesforsmallpost = [
    { src: deleteBai, alt: "Avatar 1" },
    { src: deleteBai, alt: "Avatar 2" },
    { src: deleteBai, alt: "Avatar 3" },
    { src: deleteBai, alt: "Avatar 4" },
    { src: deleteBai, alt: "Avatar 5" },
  ];

  const handleContact = () => {
    setIsContactOpen(true);
    setInfoOpen(false);
    setActiveItem("Contact");
    setIsFullImage(false);
  };

  const handleInfo = () => {
    setInfoOpen(true);
    setIsContactOpen(false);
    setActiveItem("Info");
    setIsFullImage(false);
  };

  const shouldShowPlus = () => {
    const publicToken = localStorage.getItem("publicToken");
    const privateToken = localStorage.getItem("token");
    return publicToken || privateToken;
  };

  const displayFullImage = (url) => {
    setFullImageUrl(url);
    setIsFullImage(true);
    setInfoOpen(false);
    setIsContactOpen(false);

    const tappableData = JSON.parse(
      localStorage.getItem("fullImageWithTappables")
    );
    if (tappableData && tappableData.canvas && tappableData.tappableAreas) {
      setTappableAreas(tappableData.tappableAreas);
    }
  };

  const closeFullImage = () => {
    setIsFullImage(false);
    setFullImageUrl("");
  };

  return (
    <>
      <div className="lg:w-[30%]">
        <Header />
        <nav className="p-4 pt-[14vh] text-white">
          <ul className="space-y-4">
            <li
              className={`flex items-center space-x-2 cursor-pointer ${
                activeItem === "Art" || !activeItem
                  ? "text-white"
                  : "text-gray-500"
              }`}
              onClick={toggleArt}
            >
              <img className="w-6 h-6" src={Galary} alt="Galary" />
              <span>Art</span>
              <img
                className={`w-6 h-6 transform transition-transform ${
                  isArtOpen ? "rotate-180" : "rotate-0"
                }`}
                src={leftarrow}
                alt="leftarrow"
              />
            </li>
            {isArtOpen && (
              <div className="space-y-4 mt-4 px-5">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <span>Traditional</span>
                </div>
                <div className="flex items-center cursor-pointer space-x-2">
                  <span>Digital</span>
                </div>
              </div>
            )}
            <li
              className={`flex items-center space-x-2 cursor-pointer ${
                activeItem === "Shop" || !activeItem
                  ? "text-white"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveItem("Shop")}
            >
              <img className="w-6 h-6" src={headershop} alt="headershop" />
              <span>Shop</span>
            </li>
            <li
              className={`flex items-center space-x-2 cursor-pointer ${
                activeItem === "Info" || !activeItem
                  ? "text-white"
                  : "text-gray-500"
              }`}
              onClick={handleInfo}
            >
              <img className="w-6 h-6" src={headerinfo} alt="headerinfo" />
              <span>Info</span>
            </li>
            <li
              className={`flex items-center space-x-2 cursor-pointer ${
                activeItem === "Contact" || !activeItem
                  ? "text-white"
                  : "text-gray-500"
              }`}
              onClick={handleContact}
            >
              <img className="w-6 h-6" src={headerinfo} alt="headerinfo" />
              <span>Contact</span>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-[30%]">
          <div className="flex m-2 justify-between items-center">
            <p className="font-italic text-white italic">Most recent uploads</p>
            <div className="flex space-x-2 ml-auto">
              <img
                className={`cursor-pointer ${
                  layout === "column"
                    ? "filter brightness-100"
                    : "filter brightness-50 hover:brightness-75"
                }`}
                src={viewColumns}
                alt="viewColumns"
                onClick={() => setLayout("column")}
              />
              <img
                className={`cursor-pointer h-6 w-6 ${
                  layout === "grid"
                    ? "filter brightness-100"
                    : "filter brightness-50 hover:brightness-75"
                }`}
                src={viewBox}
                alt="viewBox"
                onClick={() => setLayout("grid")}
              />
            </div>
          </div>
          <div className="mb-4 rounded-3xl pt-[2vh]">
          <div className="text-white">
            <div
              className={
                layout === "grid"
                  ? "grid grid-cols-2 gap-4 p-4"
                  : "flex flex-col gap-4 p-4"
              }
            >
              {Array.isArray(allBoards) &&
                allBoards.map((board, boardIndex) => (
                  <div
                    key={boardIndex}
                    className="text-[#747171] bg-black m-1 flex flex-col gap-2 relative w-full overflow-hidden"
                    style={{
                      borderRadius: "1.5rem",
                    }}
                  >
                    <div className="aspect-w-1 aspect-h-1 w-full">
                      {Array.isArray(board.BoardImages) &&
                        board.BoardImages.length > 0 && (
                          <img
                            className="w-full h-full object-cover cursor-pointer"
                            src={board.BoardImages[0].imageUrl}
                            alt={`image-0`}
                            onClick={() => displayFullImage(board.BoardImages[0].imageUrl)}
                          />
                        )}
                    </div>
                    <div className="p-3 z-0">
                      <Swiper
                        spaceBetween={10}
                        slidesPerView={3}
                        className="overflow-visible"
                      >
                        {imagesforsmallpost.map((image, index) => (
                          <SwiperSlide key={index}>
                            <div className="aspect-w-1 aspect-h-1 w-full">
                              <img
                                className="w-full h-full object-cover cursor-pointer rounded-md"
                                src={image.src}
                                alt={image.alt}
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    <div className="flex flex-col p-3">
                      <h3 className="text-xs text-[#BFBFBF] truncate">
                        {board.BoardImages[0].title}
                      </h3>
                      <h2 className="mt-1 text-blue-800 text-xs italic">
                        {new Date(board.BoardImages[0].createdAt).toDateString()}
                      </h2>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <Navbar />
      </div>
        <div
          className={`${
            isInfoOpen || isContactOpen || isFullImage ? "block" : "hidden"
          } block lg:w-[70%] sm:w-[100%] fixed right-0 top-0`}
        >
          <div className="lg:m-5 text-white">
            {isInfoOpen && (
              <div className="flex justify-between h-[90vh] bg-[#191919]">
                <CreatorInfo />
              </div>
            )}
            {isContactOpen && (
              <div className="flex justify-between h-[90vh] bg-[#2A2A2A]">
                <Contact />
              </div>
            )}
            {isFullImage && (
              <FullImageWithTappables
                imageUrl={fullImageUrl}
                tappableAreas={tappableAreas}
                closeFullImage={closeFullImage}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;






