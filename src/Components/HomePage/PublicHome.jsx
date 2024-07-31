import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { useNavigate } from "react-router";
import { baseURL } from "../../Constants/urls"; // Assuming baseURL is defined here
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

const Home = () => {
  const [allBoards, setAllBoards] = useState([]);
  const [layout, setLayout] = useState("grid");
  const navigate = useNavigate();
  const [isFullImage, setIsFullImage] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isInfoOpen, setInfoOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(20);
  const [fullImageUrl, setFullImageUrl] = useState("");

  const [useInfiniteScroll, setUseInfiniteScroll] = useState(false);
  const [isArtOpen, setIsArtOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Check if the user is logged in and fetch boards accordingly
    // const token = localStorage.getItem("token");
    // if (token) {
    //   fetchBoards();
    // }
    fetchPublicBoards();
  }, []);

  const fetchPublicBoards = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${baseURL}/board/fetchRecentPublicUserBoard?page=${page}&pageSize=${pageSize}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      const totalCount = data?.data?.count || 0;
      console.log("Count 58" + data.data.count);
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

  // const fetchBoards = async () => {
  //   try {
  //     setLoading(true);
  //     const token = localStorage.getItem("token");
  //     const response = await fetch(
  //       `${baseURL}/board/fetchRecentPrivateUserBoard?page=${page}&pageSize=${10}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     const data = await response.json();
  //     const totalCount = data?.data?.count || 0;

  //     setAllBoards((prevBoards) => [
  //       ...prevBoards,
  //       ...(data?.data?.data || []),
  //     ]);
  //     setPageSize(totalCount);

  //     if (totalCount > 40) {
  //       setUseInfiniteScroll(true);
  //     }

  //     setPage((prevPage) => prevPage + 1);
  //   } catch (error) {
  //     console.log("Error fetching private boards", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
  ];

  const handleContact = () => {
    setIsContactOpen(true);
    setInfoOpen(false);
    setIsFullImage(false);
    setActiveItem("Contact");
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
  };

  const closeFullImage = () => {
    setIsFullImage(false);
    setFullImageUrl("");
  };
  return (
    <>
      <div className="lg:w-[30%]">
        <div className="flex fixed top-0 py-1 bg-opacity-45 bg-[#191919] backdrop-blur-sm justify-between items-start w-full z-10 text-white lg:w-[30%]">
          <header className="flex items-center justify-between p-4  gap-2 font-bold">
            <img
              className="w-12 h-12 rounded-full cursor-pointer"
              src={deleteInitial}
            />

            <div className="text-lg cursor-pointer">
              <div>Erik Jones art.com</div>
            </div>
          </header>
        </div>

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

          <InfiniteScroll
            dataLength={allBoards.length}
            next={fetchPublicBoards}
            hasMore={useInfiniteScroll && allBoards.length < pageSize}
            loader={<h4>Loading...</h4>}
          >
            <div className="mb-4 rounded-3xl pt-[2vh]">
              <div className="text-white">
                <div
                  className={
                    layout === "grid"
                      ? "grid grid-cols-2"
                      : "flex flex-col gap-2 m-3"
                  }
                >
                  {Array.isArray(allBoards) &&
                    allBoards.map((board, boardIndex) => (
                      <div
                        key={boardIndex}
                        className={`text-[#747171] bg-black m-1 flex flex-col gap-2 relative w-auto ${
                          useInfiniteScroll ? "overflow-y-auto" : "overflow-y"
                        }`}
                        style={{
                          height: "42vh",
                          borderRadius: "1.5rem",
                        }}
                      >
                        {Array.isArray(board.BoardImages) &&
                          board.BoardImages.map((image, imageIndex) => (
                            <img
                              key={imageIndex}
                              className="h-[25vh] w-full cursor-pointer rounded-t-3xl object-cover"
                              src={image.imageUrl}
                              alt={`image-${imageIndex}`}
                              onClick={() => displayFullImage(image.imageUrl)}
                            />
                          ))}
                        <div className="left-2 flex m-2 h-10 space-x-2 z-0">
                          <Swiper
                            spaceBetween={10}
                            slidesPerView="auto"
                            centeredSlides={true}
                            className="overflow-visible"
                          >
                            {imagesforsmallpost.map((image, index) => (
                              <SwiperSlide key={index}>
                                <img
                                  className="ml-1 cursor-pointer"
                                  src={image.src}
                                  alt={image.alt}
                                />
                                <img
                                  src={deleteBai}
                                  className="ml-1 w-2 h-2 cursor-pointer"
                                  alt="delete"
                                />
                                <img
                                  src={deleteBai}
                                  className="ml-1 cursor-pointer"
                                  alt="delete"
                                />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-xs ml-3 text-[#BFBFBF]">
                            {board.BoardImages[0].title}
                          </h3>

                          <h2 className="px-2 mt-1 text-blue-800 text-xs italic">
                            {new Date(
                              board.BoardImages[0].createdAt
                            ).toDateString()}
                          </h2>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </InfiniteScroll>
          <Navbar />
        </div>
        <div
          className={`${
            isInfoOpen || isContactOpen ? "block" : "hidden"
          } lg:block lg:w-[70%] fixed right-0 top-0`}
        >
          <div className="m-5 text-white">
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
          </div>
        </div>
        <div
          className={`${
            isInfoOpen || isContactOpen || isFullImage ? "block" : "hidden"
          } lg:block lg:w-[70%] fixed right-0 top-0`}
        >
          <div className="m-5 text-white">
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
              <div className=" inset-0 bg-gray  bg-opacity-75 flex justify-center items-center z-50">
                <div className="">
                  <img
                    src={fullImageUrl}
                    alt="Full size"
                    className="h-screen w-auto object-contain "
                  />
                  <button
                    className="absolute top-0 right-2 p-2 w-10 bg-red-500 text-white"
                    onClick={closeFullImage}
                  >
                    X
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
