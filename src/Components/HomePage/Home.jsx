import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Suspense,
  lazy,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { useNavigate } from "react-router";
import { baseURL } from "../../Constants/urls";
import Galary from "../../assets/Galary.png";
import viewColumns from "../../assets/viewColumns.svg";
import viewBox from "../../assets/viewBox.png";
import viewColumnsYellow from "../../assets/viewColumnsYellow.svg";
import yellowViewBox from "../../assets/yellowViewBox.svg";
import leftarrow from "../../assets/leftarrow.svg";
import headerinfo from "../../assets/headerInfo.png";
import headershop from "../../assets/headershop.png";
import Header from "../common/Header";
import Navbar from "../common/Navbar";
import deleteBai from "../../assets/deleteBai.svg";
import DesktopNavbar from "../common/DesktopNavbar";
import Masonry from "react-masonry-css";
import { useToastManager } from "../Context/ToastContext";
import "./home.css";
import { PropagateLoader } from "react-spinners";

const FullImageWithTappables = lazy(() => import("./FullImageWithTappables"));
const Contact = lazy(() => import("./Contact"));
const CreatorInfo = lazy(() => import("./CreatorInfo"));
const Art = lazy(() => import("./Art"));
const Shop = lazy(() => import("./Shop"));

const Home = () => {
  const [singleTappableId, setSingleTappableId] = useState(null);
  const [allBoards, setAllBoards] = useState([]);
  const [layout, setLayout] = useState("grid");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isInfoOpen, setInfoOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState();
  const [useInfiniteScroll, setUseInfiniteScroll] = useState(false);
  const [isArtOpen, setIsArtOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [isFullImage, setIsFullImage] = useState(false);
  const [fullImageUrl, setFullImageUrl] = useState("");
  const [fullImageId, setFullImageId] = useState("");
  const [page, setPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [tappableAreas, setTappableAreas] = useState([]);
  const [publicPage, setPublicPage] = useState(1);
  const [privatePage, setPrivatePage] = useState(1);
  const [boardsPageSize, setBoardsPageSize] = useState(100);
  const [previousTappablePageSize, setPreviousTappablePageSize] = useState(3);
  const initialPublicFetchMade = useRef(false);
  const initialPrivateFetchMade = useRef(false);
  const [expandedTitles, setExpandedTitles] = useState({});
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [currentBoardId, setCurrentBoardId] = useState("");
  const [currentPublicBoardId, setCurrentPublicBoardId] = useState(null);
  const [currentPublicBoardImageId, setCurrentPublicBoardImageId] =
    useState(null);
  const [apiTappableAreas, setApiTappableAreas] = useState([]);
  const [currentPrivateBoardId, setCurrentPrivateBoardId] = useState(null);
  const [currentPrivateBoardImageId, setCurrentPrivateBoardImageId] =
    useState(null);
  const [privateBoardImageId, setPrivateBoardImageId] = useState(null);
  const [publicBoardImageId, setPublicBoardImageId] = useState(null);
  const userRole = localStorage.getItem("userRole");
  const [boardImageId, setBoardImageId] = useState();
  const [reactionId, setReactionId] = useState([]);
  const [singleReactionId, setSingleReactionId] = useState([]);

  const toast = useToastManager();
  const [adjustedReactions, setAdjustedReactions] = useState([]);

  // console.log("Reaction Coordinates home2 :", reactionId);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setLayout("column");
      } else {
        setLayout("grid");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchPublicBoards = useCallback(async () => {
    try {
      setLoading(true);
      const tappablePageSize = 3;
      const response = await fetch(
        `${baseURL}/board/fetchRecentPublicUserBoard?page=${publicPage}&pageSize=${boardsPageSize}&tappablePageSize=${tappablePageSize}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      const totalCount = data?.data?.count || 0;
      const newBoards = data?.data?.data || [];

      data?.data?.data.forEach((board, i) => {
        const publicBoardId = board.id;

        if (board.BoardImages && board.BoardImages.length > 0) {
          const publicBoardImageId = board.BoardImages[0].id;
        }

        setCurrentPublicBoardId(publicBoardId);
        setCurrentPublicBoardImageId(publicBoardImageId);
      });

      setAllBoards((prevBoards) => {
        const updatedBoards = [...newBoards, ...prevBoards];
        return Array.from(new Set(updatedBoards.map(JSON.stringify))).map(
          JSON.parse
        );
      });

      setBoardsPageSize(totalCount);

      if (totalCount > 40) {
        setUseInfiniteScroll(true);
      }

      setPublicPage((prevPage) => prevPage + 1);

      // Call fetchPublicUserBoardTappable if tappablePageSize is more than 3
      if (tappablePageSize > 3) {
        await fetchPublicUserBoardTappable(newBoards);
      }

      setPreviousTappablePageSize(tappablePageSize);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [publicPage, previousTappablePageSize]);

  const fetchBoards = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const tappablePageSize = 3;
      const response = await fetch(
        `${baseURL}/board/fetchRecentPrivateUserBoard?page=${privatePage}&pageSize=${boardsPageSize}&tappablePageSize=${tappablePageSize}`,
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
      const newBoards = data?.data?.data || [];

      data?.data?.data.forEach((board, i) => {
        const privateBoardId = board.id;
        console.log(" privateBoardId : 175 : ", privateBoardId);
        console.log("Data : 175 : ", boardImageId);
        console.log("Data : 176 : ", data?.data?.board?.BoardImages[0].id);

        setBoardImageId(boardImageId);
        if (board.BoardImages && board.BoardImages.length > 0) {
          const privateBoardImageId = board.BoardImages[0].id;
        }

        setCurrentPrivateBoardId(privateBoardId);
        setCurrentPrivateBoardImageId(privateBoardImageId);
      });

      setAllBoards((prevBoards) => {
        const updatedBoards = [...newBoards, ...prevBoards];
        return Array.from(new Set(updatedBoards.map(JSON.stringify))).map(
          JSON.parse
        );
      });

      setBoardsPageSize(totalCount);

      if (totalCount > 40) {
        setUseInfiniteScroll(true);
      }

      setPrivatePage((prevPage) => prevPage + 1);
      if (tappablePageSize > 3) {
        await fetchPrivateUserBoardTappable(newBoards);
      }

      setPreviousTappablePageSize(tappablePageSize);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [privatePage, previousTappablePageSize]);

  const fetchPublicUserBoardTappable = async (newBoards) => {
    try {
      const boardImageId = newBoards[0]?.BoardImages?.[0]?.id;
      setPublicBoardImageId(boardImageId);
      console.log("HOme boardImageId " + boardImageId);

      if (boardImageId) {
        const response = await fetch(
          `${baseURL}/board/fetchPublicUserBoardTappable?page=1&pageSize=10&boardImageId=${boardImageId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        const tappableBoards = data?.data;

        setTappableAreas(tappableBoards);

        const boardImageId = data?.data?.board?.BoardImages[0].id;

        setBoardImageId(boardImageId);

        setAllBoards((prevBoards) => {
          const updatedBoards = [...prevBoards, ...tappableBoards];
          return Array.from(new Set(updatedBoards.map(JSON.stringify))).map(
            JSON.parse
          );
        });
      }
    } catch (error) {
      toast("Error fetching tappable boards", error);
    }
  };
  const fetchPrivateUserBoardTappable = async (newBoards) => {
    try {
      const boardImageId = newBoards[0]?.BoardImages?.[0]?.id;

      if (boardImageId) {
        const response = await fetch(
          `${baseURL}/board/fetchPrivateUserBoardTappable?page=1&pageSize=10&boardImageId=${boardImageId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        const tappableBoards = data?.data?.data || [];
        setTappableAreas(tappableBoards);

        const boardImageId = data?.data?.board?.BoardImages[0].id;
        console.log("boardImageIdboardImageId : ", boardImageId);

        setBoardImageId(boardImageId);

        setAllBoards((prevBoards) => {
          const updatedBoards = [...prevBoards, ...tappableBoards];
          return Array.from(new Set(updatedBoards.map(JSON.stringify))).map(
            JSON.parse
          );
        });
      }
    } catch (error) {
      toast("Error fetching tappable boards", error);
    }
  };
  useEffect(() => {
    if (
      isVisible &&
      apiTappableAreas &&
      apiTappableAreas.data &&
      apiTappableAreas.data.tappables
    ) {
      const adjustedCoordinates = apiTappableAreas.data.tappables.map(
        (area) => {
          return {
            id: area.tappableId,
            left: parseInt(area.left),
            top: parseInt(area.top),
            width: 50, // Set a default width if not provided
            height: 50, // Set a default height if not provided
            onTapAction: area.onTapAction,
            type: area.type,
          };
        }
      );

      setAdjustedTappableAreas(adjustedCoordinates);
    } else {
    }
  }, [apiTappableAreas, isVisible]);

  useEffect(() => {
    if (
      isVisible &&
      apiTappableAreas &&
      apiTappableAreas.data &&
      apiTappableAreas.data.reactions
    ) {
      const adjustedReactions = apiTappableAreas.data.reactions.map(
        (reaction) => {
          console.log("Processing reaction:", reaction);
          return {
            id: reaction.reactionId,
            left: parseInt(reaction.left),
            top: parseInt(reaction.top),
            type: reaction.type,
            // Add any other properties you need
          };
        }
      );

      console.log("Adjusted useeffect reactions:", adjustedReactions);
      setAdjustedReactions(adjustedReactions);
    } else {
      // console.log("Conditions not met for processing reactions");
    }
  }, [apiTappableAreas, isVisible]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    const fetchData = async () => {
      if (
        userRole === "publicUser" ||
        (userRole === "user" && !initialPublicFetchMade.current)
      ) {
        initialPublicFetchMade.current = true;
        await fetchPublicBoards();
      } else if (
        token &&
        userRole === "privateUser" &&
        !initialPrivateFetchMade.current
      ) {
        initialPrivateFetchMade.current = true;
        await fetchBoards();
      }
    };

    fetchData();
  }, []);

  const fetchAreas = async (boardId, imageId) => {
    const userRole = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");

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

      // Check if the response status is not OK (e.g., 401 Unauthorized)
      if (!response.ok) {
        console.error(`Error: ${response.status} ${response.statusText}`);
        const errorData = await response.json();
        console.error("Error details:", errorData);
        return;
      }

      const data = await response.json();
      // console.log("API Response:", data);

      // console.log(data.data.tappables);
      if (data?.data?.tappables?.length > 0) {
        const tappableId = data?.data?.tappables;
        setSingleTappableId(tappableId);

        const adjustedCoordinates = data?.data?.tappables?.map((area) => ({
          id: area.tappableId,
          left: parseFloat(area.left),
          top: parseFloat(area.top),
          width: 50,
          height: 50,
          onTapAction: area.onTapAction,
          type: area.type,
        }));

        setTappableAreas(adjustedCoordinates);

        const reaction = data?.data;
        console.log("New Reactions 432 : ", reaction);
        setReactionId(reaction);

        if (data?.data?.reaction?.length > 0) {
          const adjustedReactions = data?.data?.reaction?.map((reaction) => ({
            id: reaction.reactionId,
            left: parseFloat(reaction.left),
            top: parseFloat(reaction.top),
            type: reaction.type,
          }));
        }
      } else {
        console.log("No tappable areas found.");
      }
    } catch (error) {
      console.error("Error fetching tappable areas:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-white place-content-center justify-center text-center h-screen ">
        <span className="mb-2"> Loading </span>
        <PropagateLoader color="white" className="mt-3" />
      </div>
    );
  }

  const toggleArt = () => {
    setIsArtOpen(!isArtOpen);
    if (isArtOpen) {
      setActiveItem(null); // Reset the active item to null when Art is closed
    } else {
      setIsContactOpen(false);
      setInfoOpen(false);
      setIsShopOpen(false);
      setActiveItem("Art"); // Set Art as the active item when opened
    }
  };

  const handleContact = () => {
    setIsContactOpen(true);
    setIsArtOpen(false);
    setIsShopOpen(false);
    setInfoOpen(false);
    setActiveItem("Contact");
  };

  const handleInfo = () => {
    setInfoOpen(true);
    setIsArtOpen(false);
    setIsShopOpen(false);
    setIsContactOpen(false);
    setActiveItem("Info");
  };

  const shouldShowPlus = () => {
    const publicToken = localStorage.getItem("publicToken");
    const privateToken = localStorage.getItem("token");
    return publicToken || privateToken;
  };

  const displayFullImage = async (
    url,
    imageId,
    boardId,
    isPublic,
    isPrivate
  ) => {
    setFullImageUrl(url);
    setFullImageId(imageId);
    setCurrentBoardId(boardId);

    if (isPublic) {
      setCurrentPublicBoardId(boardId);
      setCurrentPublicBoardImageId(imageId);
      await fetchAreas(boardId, imageId);
    } else {
      setCurrentPrivateBoardId(boardId);
      setCurrentPrivateBoardImageId(imageId);

      await fetchAreas(boardId, imageId);
    }

    if (isPrivate) {
      setCurrentPublicBoardId(boardId);
      setCurrentPublicBoardImageId(imageId);
      await fetchAreas(boardId, imageId);
    } else {
      setCurrentPrivateBoardId(boardId);
      setCurrentPrivateBoardImageId(imageId);

      await fetchAreas(boardId, imageId);
    }
    setIsFullImage(true);
  };

  const closeFullImage = () => {
    setIsFullImage(false);
    setFullImageUrl("");
    setFullImageId("");
  };

  const truncateText = (text, maxLength) => {
    if (text?.length <= maxLength) return text;
    return text?.slice(0, maxLength) + "...";
  };

  const toggleExpand = (type, id) => {
    if (type === "title") {
      setExpandedTitles((prev) => ({ ...prev, [id]: !prev[id] }));
    } else {
      setExpandedDescriptions((prev) => ({ ...prev, [id]: !prev[id] }));
    }
  };

  const handleShop = () => {
    setIsShopOpen(true);
    setIsArtOpen(false);
    setIsContactOpen(false);
    setInfoOpen(false);
    setActiveItem("Shop");
  };
  return (
    <>
      <div className="lg:w-[30%] ">
        <div className={`${isFullImage ? "hidden lg:block" : "block"}`}>
          <Header />
        </div>

        <nav className="px-4 font-semibold text-[22px] pt-[1vh] bg-[#2D2D2D] text-white">
          <ul className="space-y-4">
            <li
              className={`flex items-center space-x-2 cursor-pointer ${
                isArtOpen || activeItem === "Art" || !activeItem
                  ? "text-white"
                  : "text-gray-500"
              }`}
              onClick={toggleArt}
            >
              <img
                className={`w-6 h-6 ${
                  isArtOpen || activeItem === "Art" || !activeItem
                    ? "brightness-100"
                    : "brightness-50"
                }`}
                src={Galary}
                alt="Gallery"
              />
              <span>Art</span>
              <img
                className={`w-6 h-6 transform transition-transform ${
                  isArtOpen ? "rotate-180" : "rotate-0"
                } ${
                  isArtOpen || activeItem === "Art" || !activeItem
                    ? "brightness-100"
                    : "brightness-50"
                }`}
                src={leftarrow}
                alt="leftarrow"
              />
            </li>
            <div
              className={`transition-max-height mt-0 duration-500 ease-in-out overflow-hidden ${
                isArtOpen ? "max-h-40" : "max-h-0"
              }`}
              style={{
                marginTop: isArtOpen ? "10px" : "0px",
              }}
            >
              <div className="space-y-3 px-5">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <span>Traditional</span>
                </div>
                <div className="flex items-center cursor-pointer space-x-2">
                  <span>Digital</span>
                </div>
              </div>
            </div>

            <li
              className={`flex items-center space-x-2 cursor-pointer ${
                activeItem === "Shop" || !activeItem
                  ? "text-white"
                  : "text-gray-500"
              }`}
              onClick={handleShop}
            >
              <img
                className={`w-6 h-6 ${
                  activeItem === "Shop" || !activeItem
                    ? "brightness-100"
                    : "brightness-50"
                }`}
                src={headershop}
                alt="headershop"
              />
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
              <img
                className={`w-6 h-6 ${
                  activeItem === "Info" || !activeItem
                    ? "brightness-100"
                    : "brightness-50"
                }`}
                src={headerinfo}
                alt="headerinfo"
              />
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
              <img
                className={`w-6 h-6 ${
                  activeItem === "Contact" || !activeItem
                    ? "brightness-100"
                    : "brightness-50"
                }`}
                src={headerinfo}
                alt="headerinfo"
              />
              <span>Contact</span>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-[30%] bg-[#2D2D2D]">
          <div className="flex m-2 justify-between bg-[#2D2D2D] items-center">
            <p className=" text-[#696969] pl-2">Recent Projects</p>
            <div className="flex space-x-2 ml-auto gap-3 ">
              <img
                className={`cursor-pointer
                  `}
                src={layout === "grid" ? viewBox : viewBox}
                alt="viewBox"
                onClick={() => setLayout("grid")}
              />{" "}
              <img
                className={`cursor-pointer pr-3`}
                src={layout === "column" ? viewColumns : viewColumns}
                alt="viewColumns"
                onClick={() => setLayout("column")}
              />
            </div>
          </div>
          <div className="mb-[60px] rounded-3xl">
            <div className="text-white">
              <div
                className={
                  layout === "grid"
                    ? "grid grid-cols-1 gap-2  px-2"
                    : "flex flex-col gap-2 px-2"
                }
              >
                <Masonry
                  breakpointCols={{
                    default: 2,
                    700: 1,
                  }}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {!allBoards?.length ? (
                    <div className="text-white">No boards available.</div>
                  ) : (
                    Array.isArray(allBoards) &&
                    allBoards.map((board, boardIndex) => (
                      <div key={boardIndex} className="mb-2">
                        <div
                          className="text-[#747171] bg-[#0c0c0c]  flex flex-col gap-2 relative w-full overflow-hidden"
                          style={{
                            borderRadius: "1.5rem",
                          }}
                        >
                          <div className="aspect-w-1 aspect-h-1 w-full">
                            {Array.isArray(board.BoardImages) &&
                              board.BoardImages?.length > 0 && (
                                <img
                                  className="w-full h-full object-cover cursor-pointer"
                                  src={board.BoardImages[0].imageUrl}
                                  alt={`image-0`}
                                  onClick={() => {
                                    console.log(
                                      "Image clicked, board data:",
                                      board.BoardImages[0].id
                                    );
                                    displayFullImage(
                                      board.BoardImages[0].imageUrl,
                                      board.BoardImages[0].id,
                                      board.id,
                                      board.isPublic
                                    );
                                  }}
                                />
                              )}
                          </div>

                          <div className="px-3 z-0">
                            <Swiper
                              spaceBetween={10}
                              slidesPerView="auto"
                              className="overflow-visible"
                            >
                              {board.BoardImages &&
                                board.BoardImages[0] &&
                                board.BoardImages[0].tappable &&
                                board.BoardImages[0].tappable.map(
                                  (tappable, index) => (
                                    <SwiperSlide
                                      key={tappable.id}
                                      className="!w-auto"
                                    >
                                      <div
                                        className={`aspect-w-1 aspect-h-1 ${
                                          layout === "grid"
                                            ? "w-[29px] h-[29px]"
                                            : "w-[50px] h-[50px]"
                                        }`}
                                      >
                                        <img
                                          className="w-full h-full object-cover cursor-pointer rounded-md"
                                          src={tappable.tappableImage}
                                          alt={`Tappable-${index}`}
                                        />
                                      </div>
                                    </SwiperSlide>
                                  )
                                )}
                            </Swiper>
                          </div>

                          <div className="flex flex-col px-3 pb-3  mb-10">
                            <h3 className="text-xs text-[#BFBFBF] text-wrap text-[13px] font-bold ">
                              {expandedTitles[boardIndex]
                                ? board.BoardImages && board.BoardImages[0]
                                  ? board.BoardImages[0].title
                                  : ""
                                : truncateText(
                                    board.BoardImages && board.BoardImages[0]
                                      ? board.BoardImages[0].title
                                      : "",
                                    50
                                  )}
                              {board.BoardImages &&
                                board.BoardImages[0] &&
                                board.BoardImages[0].title?.length > 50 && (
                                  <span
                                    className="text-[#0084FF] cursor-pointer ml-1 "
                                    onClick={() =>
                                      toggleExpand("title", boardIndex)
                                    }
                                  >
                                    {expandedTitles[boardIndex]
                                      ? "Show Less"
                                      : "...Read More"}
                                  </span>
                                )}
                            </h3>
                            <h3 className="text-xs text-[#959595] text-wrap mb-5 text-[10px] font-semibold">
                              {expandedDescriptions[boardIndex]
                                ? board.BoardImages && board.BoardImages[0]
                                  ? board.BoardImages[0].description
                                  : ""
                                : truncateText(
                                    board.BoardImages && board.BoardImages[0]
                                      ? board.BoardImages[0].description
                                      : "",
                                    50
                                  )}
                              {board.BoardImages &&
                                board.BoardImages[0] &&
                                board.BoardImages[0].description?.length >
                                  50 && (
                                  <span
                                    className="text-[#0084FF] cursor-pointer ml-1"
                                    onClick={() =>
                                      toggleExpand("description", boardIndex)
                                    }
                                  >
                                    {expandedDescriptions[boardIndex]
                                      ? "Show Less"
                                      : "...Read More"}
                                  </span>
                                )}
                            </h3>
                            <h2 className="absolute bottom-2 text-[#959595] text-xs italic  mb-2">
                              {board.BoardImages && board.BoardImages[0]
                                ? new Date(
                                    board.BoardImages[0].createdAt
                                  ).toDateString()
                                : ""}
                            </h2>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </Masonry>
              </div>
            </div>
          </div>

          <Navbar />
        </div>
        <div
          className={`${
            isInfoOpen || isContactOpen || isFullImage ? "block" : "hidden"
          } block w-full lg:w-[70%] fixed right-0 top-0 h-full `}
        >
          <div className=" text-white h-full bg-[#2D2D2D]">
            {isInfoOpen && (
              <Suspense fallback={<div>Loading info...</div>}>
                <div className="flex justify-between  h-[90vh] bg-[#191919]">
                  <CreatorInfo closeInfo={() => setInfoOpen(false)} />
                </div>
              </Suspense>
            )}
            {isContactOpen && (
              <Suspense fallback={<div>Loading info...</div>}>
                <div className="flex justify-center h-full bg-[#2A2A2A]">
                  <Contact closeInfo={() => setIsContactOpen(false)} />
                </div>
              </Suspense>
            )}
            {/* {console.log("Rendering Home component 861 ", reactionId)} */}
            {isFullImage && (
              <Suspense fallback={<div>Loading full image...</div>}>
                <div className="w-full h-full">
                  {(currentPublicBoardId && currentPublicBoardImageId) ||
                  (currentPrivateBoardId && currentPrivateBoardImageId) ? (
                    <FullImageWithTappables
                      imageUrl={fullImageUrl}
                      imageId={fullImageId}
                      boardId={currentBoardId}
                      onClose={closeFullImage}
                      closeFullImage={closeFullImage}
                      tappableAreas={tappableAreas}
                      reactionId={reactionId}
                      setReactionId={setReactionId}
                      singleTappableId={singleTappableId}
                      singleReactionId={singleReactionId}
                    />
                  ) : (
                    <div>
                      Loading <PropagateLoader color="white" />
                    </div>
                  )}
                </div>
              </Suspense>
            )}
            {isShopOpen && (
              <Suspense fallback={<div>Loading shop...</div>}>
                <div className="flex justify-center h-full bg-[#2A2A2A]">
                  <Shop closeShop={() => setIsShopOpen(false)} />
                </div>
              </Suspense>
            )}
            {isArtOpen && (
              <Suspense fallback={<div>Loading shop...</div>}>
                <div className="flex justify-center h-full bg-[#2A2A2A]">
                  <Art closeArt={() => setIsArtOpen(false)} />
                </div>
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
