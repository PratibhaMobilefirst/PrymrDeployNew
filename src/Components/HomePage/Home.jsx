//  akshada'
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

const Home = () => {
  const [allBoards, setAllBoards] = useState([]);
  const [layout, setLayout] = useState("grid");
  const navigate = useNavigate();

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const token = localStorage.getItem("token");

  const page = 1;
  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${baseURL}/board/fetchUserFeed1?page=${page}&pageSize=${pageSize}`,
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
      console.log("setpagesize ", data?.data?.count);
      setAllBoards(data?.data?.data || []);
      console.log("Feed data 1", data.data.data);

      if (data?.data?.hasMoreFollower === false) {
        console.log("Hasmorefollowers false");
        const response2 = await fetch(
          `${baseURL}/board/fetchUserFeed2?page=${page}&pageSize=${pageSize}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data2 = await response2.json();
        setPageSize(data2?.data?.count);
        console.log("setpagesize ", data2?.data?.count);
        console.log("Feed data 2", data2.data.data);
        setAllBoards(data2?.data?.data || []);
      }
    } catch (error) {
      console.log("Error fetching boards", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("allboards", allBoards);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!allBoards.length) {
    return <div className="text-white">No boards available.</div>;
  }

  const toggleArt = () => {
    setIsContactOpen(!isContactOpen);
  };

  const imagesforsmallpost = [
    { src: deleteBai, alt: "Avatar 1" },
    { src: deleteBai, alt: "Avatar 2" },
    { src: deleteBai, alt: "Avatar 3" },
  ];

    const handleContact = () => {
      navigate("/contact");
    };

  return (
    <>
      <div className="lg:w-[30%]">
        <Header />
        <nav className="p-4 pt-[14vh] text-white bg-[#2A2A2A]">
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
            <li className="flex items-center space-x-2 cursor-pointer" onClick={handleContact}>
              <img className="w-6 h-6" src={headerinfo} alt="headerinfo" />
              <span>Contact</span>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-[30%]">
          <div className="flex m-2 justify-between items-center">
            <p className="font-italic text-white">Most recent uploads</p>
            <div className="flex space-x-2 ml-auto">
              <img
                src={viewColumns}
                alt="viewColumns"
                onClick={() => setLayout("column")}
              />
              <img
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
                    ? "grid grid-cols-2 gap-4"
                    : "flex flex-col gap-4"
                }
              >
                {Array.isArray(allBoards) &&
                  allBoards.map((board, boardIndex) => (
                    <div
                      key={boardIndex}
                      className="text-[#747171] bg-[#414040] mt-2 m-2 flex flex-col gap-2 relative"
                      style={{ borderRadius: "1.5rem" }}
                    >
                      {Array.isArray(board.BoardImages) &&
                        board.BoardImages.map((image, imageIndex) => (
                          <img
                            key={imageIndex}
                            className="h-[40vh] rounded-3xl object-cover w-full"
                            src={image.imageUrl}
                            alt={`image-${imageIndex}`}
                          />
                        ))}
                      {/* <div className=" z-30 left-2 flex m-2 h-20 space-x-2">
                        <Swiper
                          spaceBetween={3}
                          slidesPerView="auto"
                          centeredSlides={true}
                        >
                          {Array.isArray(imagesforsmallpost) &&
                            imagesforsmallpost.map((image, index) => (
                              <SwiperSlide key={index}>
                                <img
                                  className="ml-1"
                                  src={image.src}
                                  alt={image.alt}
                                />
                              </SwiperSlide>
                            ))}
                        </Swiper>
                      </div> */}
                      <div className="left-2 flex m-2 h-20 space-x-2 relative z-0">
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
                                className="ml-1 w-2 w-h"
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
                      <h3 className="text-xl ml-3 text-[#BFBFBF]">
                        {board.title}
                      </h3>
                      <p className="ml-3 text-[#959595]">Interaction Poster</p>
                      <div className="px-3 flex italic mb-7">
                        <div className="text-[#999999]">
                          974 Post Interactions
                        </div>
                        <h2 className="ml-auto">2 days</h2>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <Navbar />
        </div>

        <div className="hidden lg:block lg:w-[70%] fixed right-0 top-0">
          <LoginScreen />
        </div>
      </div>
    </>
  );
};

export default Home;
