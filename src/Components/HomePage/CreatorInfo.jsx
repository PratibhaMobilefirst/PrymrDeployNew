import React, { useEffect, useState } from "react";
import editToolNavbar from "../../assets/settings.png";
import handleBackk from "../../assets/handleBack.svg";
import cart from "../../assets/ShoppingCartpng.png";
import info from "../../assets/info.svg";
import bluepencile from "../../assets/bluepencil.svg";
import whitepencil from "../../assets/whitepencil.svg";
import { baseURL } from "../../Constants/urls";
import { useNavigate } from "react-router";

const CreatorInfo = () => {
  const [activeButton, setActiveButton] = useState("News");
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [profileCV, setProfileCV] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editingSection, setEditingSection] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const userRole = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchInfoForPrivate();
    }
    fetchInfoForPublic();
  }, []);

  const fetchInfoForPublic = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/auth/getPublicProfileInfo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.status && result.message) {
        const data = result.data.data;
        setProfileCV(data.cv);
        setNewsData(data.news);
        setProfileBio(data.bio);
      } else {
        setMessage("Failed to fetch public profile information.");
      }
    } catch (error) {
      setMessage("Error fetching public profile information.");
    } finally {
      setLoading(false);
    }
  };

  const fetchInfoForPrivate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/auth/getPrivateProfileInfo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.status && result.message) {
        const data = result.data.data;
        setProfileCV(data.cv);
        setNewsData(data.news);
        setProfileBio(data.bio);
      } else {
        setMessage("Failed to fetch private profile information.");
      }
    } catch (error) {
      setMessage("Error fetching private profile information.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditButtonClick = (section) => {
    setEditingSection(section);
    setIsEditing(true);
    setEditContent(
      section === "News" ? newsData : section === "Bio" ? profileBio : profileCV
    );
  };

  const handleSaveButtonClick = () => {
    // Add logic to save the edited content here
    setIsEditing(false);
  };

  return (
    <>
      <div className="w-full bg-[#191919] sm:text-xs h-screen lg:hidden">
        <header className="flex justify-between mt-[12vh] items-center">
          <div className="flex gap-2 ml-2 text-md">
            <img src={handleBackk} alt="Info" className="w-5 h-5" /> Info
            <img src={info} alt="Info" className="w-3 h-3 mt-1" />
          </div>

          <div className="flex gap-2 mr-2 ml-auto">
            <img
              src={editToolNavbar}
              alt="Edit Tool Navbar"
              className="w-8 h-8"
            />
            <img src={cart} alt="Cart" className="w-8 h-8" />
          </div>
        </header>

        <div className="flex py-2 justify-between  m-2 text-sm md:gap-28 sm:gap-3">
          <button
            className={`flex gap-2 justify-center text-center cursor-pointer rounded-full h-auto text-sm ${
              activeButton === "News"
                ? "active-class bg-blue-500 text-white"
                : ""
            }`}
            onClick={() => setActiveButton("News")}
          >
            News
            {(userRole === "publicUser" || userRole === "privateUser") && (
              <img
                src={whitepencil}
                className="w-5 h-5"
                onClick={() => handleEditButtonClick(activeButton)}
                alt="Edit"
              />
            )}
          </button>
          <button
            className={`flex gap-2  justify-center text-center rounded-full h-auto text-sm cursor-pointer ${
              activeButton === "Bio"
                ? "active-class bg-blue-500 text-white"
                : ""
            }`}
            onClick={() => setActiveButton("Bio")}
          >
            Bio
            {(userRole === "publicUser" || userRole === "privateUser") && (
              <img
                src={whitepencil}
                className="w-5 h-5"
                onClick={() => handleEditButtonClick(activeButton)}
                alt="Edit"
              />
            )}
          </button>
          <button
            className={`flex gap-2 justify-center text-center cursor-pointer rounded-full h-auto text-sm ${
              activeButton === "CV" ? "active-class bg-blue-500 text-white" : ""
            }`}
            onClick={() => setActiveButton("CV")}
          >
            CV
            {(userRole === "publicUser" || userRole === "privateUser") && (
              <img
                src={whitepencil}
                className="w-5 h-5"
                onClick={() => handleEditButtonClick(activeButton)}
                alt="Edit"
              />
            )}
          </button>
        </div>

        <div>
          {isEditing ? (
            <div>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows="10"
                className="w-full p-2 text-black"
              />
              <button onClick={handleSaveButtonClick}>Save</button>
            </div>
          ) : (
            <div>
              {activeButton === "News" && <p>{newsData}</p>}
              {activeButton === "Bio" && <p>{profileBio}</p>}
              {activeButton === "CV" && <p>{profileCV}</p>}
            </div>
          )}
          {message && <p>{message}</p>}
        </div>
      </div>
      <div className="gap-1 lg:mt-16 lg:flex justify-between hidden">
        <div className="bg-[#2A2A2A]">
          <div className="p-2 m-4 w-full h-[70vh]">
            <div className="flex -mt-4">
              <span className="flex bg-[#1E1E1E] w-auto p-2 m-3">News</span>
              <img src={editToolNavbar} className="ml-auto m-4" alt="Edit" />
            </div>
            <div>
              <div className="flex gap-1">
                News
                {(userRole === "publicUser" || userRole === "privateUser") && (
                  <img
                    src={bluepencile}
                    className="w-5 h-5"
                    onClick={() => handleEditButtonClick("News")}
                  />
                )}
              </div>
              {isEditing && editingSection === "News" ? (
                <div className="h-[58vh] w-[40vw]">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows="10"
                    className="w-full p-2 text-black"
                  />
                  <button onClick={handleSaveButtonClick}>Save</button>
                </div>
              ) : (
                <div className="p-2 rounded shadow max-h-[60vh] overflow-y-auto custom-scrollbar">
                  <p className=" text-xs ">{newsData}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-[#2A2A2A]">
          <div className="p-2 h-[70vh] w-full ml-2">
            <div className="flex">
              <span className="flex bg-[#1E1E1E] w-auto p-2 m-3">
                Biography
              </span>
              <img src={editToolNavbar} className="ml-auto m-4" alt="Edit" />
            </div>
            <div>
              <div className="flex gap-1">
                Biography
                {(userRole === "publicUser" || userRole === "privateUser") && (
                  <img
                    src={bluepencile}
                    className="w-5 h-5"
                    onClick={() => handleEditButtonClick("Bio")}
                  />
                )}
              </div>
              {isEditing && editingSection === "Bio" ? (
                <div className="h-[58vh] w-[40vw]">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows="10"
                    className="w-full p-2 text-black"
                  />
                  <button onClick={handleSaveButtonClick}>Save</button>
                </div>
              ) : (
                <div className="pt-2 rounded shadow max-h-[60vh] overflow-auto custom-scrollbar">
                  <p className="break-words text-xs">{profileBio}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-[#2A2A2A]">
          <div className="p-2 h-[70vh] w-full ml-2">
            <div className="flex">
              <span className="flex bg-[#1E1E1E] w-auto p-2 m-3">CV</span>
              <img src={editToolNavbar} className="ml-auto m-4" alt="Edit" />
            </div>
            <div className="flex gap-1">
              CV
              {(userRole === "publicUser" || userRole === "privateUser") && (
                <img
                  src={bluepencile}
                  className="w-5 h-5"
                  onClick={() => handleEditButtonClick("CV")}
                />
              )}
            </div>
            {isEditing && editingSection === "CV" ? (
              <div className="h-[58vh] w-[40vw]">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows="10"
                  className="w-full p-2 text-black"
                />
                <button onClick={handleSaveButtonClick}>Save</button>
              </div>
            ) : (
              <div className="p-2 rounded shadow max-h-[60vh] overflow-y-auto custom-scrollbar">
                <p className="break-words text-xs ">{profileCV}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatorInfo;
