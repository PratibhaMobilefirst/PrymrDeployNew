import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import LoginScreen from "../OnboardingScreen/LoginScreen";
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

const Home = () => {
  const [allBoards, setAllBoards] = useState([]);
  const [layout, setLayout] = useState("column");
  const navigate = useNavigate();

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const token = localStorage.getItem("token");
  const [useInfiniteScroll, setUseInfiniteScroll] = useState(false);

  const [isArtOpen, setIsArtOpen] = useState(false);

  const page = 1;
  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${baseURL}/board/fetchRecentBoard?page=${page}&pageSize=${pageSize}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setPageSize(data?.data?.count);

      if (data?.data?.count > 40) {
        setUseInfiniteScroll(true);
      }

      console.log("setpagesize ", data?.data?.count);
      setAllBoards(data?.data?.data || []);
      console.log("BoardImages 322", data.data.data.BoardImages);
    } catch (error) {
      console.log("Error fetching boards", error);
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
  };

  const imagesforsmallpost = [
    { src: deleteBai, alt: "Avatar 1" },
    { src: deleteBai, alt: "Avatar 2" },
    { src: deleteBai, alt: "Avatar 3" },
  ];

  const handleContact = () => {
    // navigate("/contact");
    setIsContactOpen(!isContactOpen);
    if (isContactOpen) {
      setIsArtOpen(false);
    }
  };

  return (
    <>
      <div className="lg:w-[30%]">
        <Header />
        {/* <nav className="p-4 pt-[14vh] text-white bg-[#2A2A2A]">
          <ul className="space-y-4">
            <li
              className="flex items-center space-x-2 cursor-pointer"
              onClick={toggleArt}
            >
              <img className="w-6 h-6" src={Galary} alt="Galary" />
              <span>Art</span>
              <img
                className={`w-6 h-6 transform transition-transform ${
                  isContactOpen ? "rotate-180" : "rotate-0"
                }`}
                src={leftarrow}
                alt="leftarrow"
              />
            </li>
            {isContactOpen && (
              <div className="space-y-4 mt-4 px-5">
                <div className="flex items-center space-x-2">
                  <span>Traditional</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Digital</span>
                </div>
              </div>
            )}
            <li className="flex items-center space-x-2">
              <img className="w-6 h-6" src={headershop} alt="headershop" />
              <span>Shop</span>
            </li>
            <li className="flex items-center space-x-2">
              <img className="w-6 h-6" src={headerinfo} alt="headerinfo" />
              <span>Info</span>
            </li>
            <li className="flex items-center space-x-2" onClick={handleContact}>
              <img className="w-6 h-6" src={headerinfo} alt="headerinfo" />
              <span>Contact</span>
            </li>
          </ul>
        </nav> */}
        <nav className="p-4 pt-[14vh] text-white bg-[#2A2A2A]">
          <ul className="space-y-4">
            <li
              className={`flex items-center text-white space-x-2 cursor-pointer `}
              onClick={toggleArt}
            >
              <img className="w-6 h-6" src={Galary} alt="Galary" />
              <span className="text-white">Art</span>
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
                <div className="flex items-center space-x-2">
                  <span>Traditional</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Digital</span>
                </div>
              </div>
            )}
            <li
              className={`flex items-center space-x-2 ${
                isArtOpen
                  ? "filter brightness-50 hover:brightness-75"
                  : "filter brightness-100"
              }`}
            >
              <img className="w-6 h-6" src={headershop} alt="headershop" />
              <span>Shop</span>
            </li>
            <li
              className={`flex items-center space-x-2 ${
                isArtOpen
                  ? "filter brightness-50 hover:brightness-75"
                  : "filter brightness-100"
              }`}
            >
              <img className="w-6 h-6" src={headerinfo} alt="headerinfo" />
              <span>Info</span>
            </li>
            <li
              className={`flex items-center space-x-2 ${
                isArtOpen
                  ? "filter brightness-50 hover:brightness-75"
                  : "filter brightness-100"
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
                    ? "grid grid-cols-2 "
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
                        height: "50vh",

                        borderRadius: "1.5rem",
                      }}
                    >
                      {Array.isArray(board.BoardImages) &&
                        board.BoardImages.map((image, imageIndex) => (
                          <img
                            key={imageIndex}
                            className="h-[30vh] w-full rounded-t-3xl object-cover"
                            src={image.imageUrl}
                            alt={`image-${imageIndex}`}
                          />
                        ))}
                      <div className="left-2 flex m-2 h-10 space-x-2 relative z-0">
                        <Swiper
                          spaceBetween={10}
                          slidesPerView="auto"
                          centeredSlides={true}
                          className="overflow-visible"
                        >
                          {imagesforsmallpost.map((image, index) => (
                            <SwiperSlide key={index}>
                              <img
                                className="ml-1"
                                src={image.src}
                                alt={image.alt}
                              />
                              <img
                                src={deleteBai}
                                className="ml-1 w-2 h-2"
                                alt="delete"
                              />
                              <img
                                src={deleteBai}
                                className="ml-1"
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
          <Navbar />
        </div>

        <div className="hidden lg:block lg:w-[70%] fixed right-0 top-0">
          <div className=" m-5 h-screen text-white">
            {isContactOpen ? <Contact /> : "Noting to Display!!"}
            <DesktopNavbar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
