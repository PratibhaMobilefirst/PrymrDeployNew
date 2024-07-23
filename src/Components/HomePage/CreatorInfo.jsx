import React, { useEffect, useState } from "react";
import editToolNavbar from "../../assets/settings.png";
import handleBackk from "../../assets/handleBack.svg";
import cart from "../../assets/ShoppingCartpng.png";
import info from "../../assets/info.svg";
import bluepencile from "../../assets/bluepencil.svg"; // Add this import
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
  useEffect(() => {
    fetchNews();
    fetchBiography();
    fetchCV();
  }, []);

  const handleButtonClick = (button) => {
    setActiveButton(button);
    setIsEditing(false);
    setEditContent("");
  };

  // const handleEditButtonClick = () => {
  //   setIsEditing(true);
  //   if (activeButton === "News") {
  //     setEditContent(newsData);
  //   } else if (activeButton === "Bio") {
  //     setEditContent(profileBio);
  //   } else if (activeButton === "CV") {
  //     setEditContent(profileCV);
  //   }
  // };

  const handleEditButtonClick = (section) => {
    setIsEditing(true);
    setEditingSection(section);
    if (section === "News") {
      setEditContent(newsData);
    } else if (section === "Bio") {
      setEditContent(profileBio);
    } else if (section === "CV") {
      setEditContent(profileCV);
    }
  };

  const handleSaveButtonClick = async () => {
    let url = "";
    let payload = {};

    if (activeButton === "News") {
      url = `${baseURL}/auth/addProfileNews?addProfileNews=${newsData}`;
      payload = { addProfileNews: editContent };
    } else if (activeButton === "Bio") {
      url = `${baseURL}/auth/addProfileBio?addBio=${profileBio}`;
      payload = { addProfileBio: editContent };
    } else if (activeButton === "CV") {
      url = `${baseURL}/auth/addProfileCV?addProfileNews=${profileCV}`;
      payload = { addProfileCV: editContent };
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.status && result.message) {
        if (activeButton === "News") {
          setNewsData(editContent);
        } else if (activeButton === "Bio") {
          setProfileBio(editContent);
        } else if (activeButton === "CV") {
          setProfileCV(editContent);
        }
        setIsEditing(false);
        setEditContent("");
      } else {
        console.error("Failed to save data:", result.message);
      }
    } catch (error) {
      console.error("Error saving data", error);
    }
  };

  const fetchNews = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${baseURL}/auth/getProfileNews`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.status && result.message) {
        setNewsData(result.data.news);
      } else {
        setNewsData("Failed to fetch news.");
      }
    } catch (error) {
      console.log("Error fetching news", error);
      setNewsData("Error fetching news.");
    }
  };

  const fetchBiography = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${baseURL}/auth/getProfileBio`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.status && result.message) {
        setProfileBio(result.data.bio);
      } else {
        setProfileBio("Failed to fetch biography.");
      }
    } catch (error) {
      console.log("Error fetching biography", error);
      setProfileBio("Error fetching biography.");
    }
  };

  const fetchCV = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${baseURL}/auth/getProfileCV`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.status && result.message) {
        setProfileCV(result.data.CV);
        console.log("828", result.data.CV);
      } else {
        setProfileCV("Failed to fetch CV.");
      }
    } catch (error) {
      console.log("Error fetching CV", error);
      setProfileCV("Error fetching CV.");
    }
  };

  return (
    <>
      <div className="w-full bg-[#191919] sm:text-xs h-screen lg:hidden">
        <header className="flex justify-between mt-[18vh] items-center">
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

        <div className="flex py-2 justify-between gap-3 m-2 text-sm">
          <button
            className={`flex cursor-pointer rounded-full h-auto text-sm ${
              activeButton === "News" ? "active-class" : ""
            }`}
            onClick={() => handleButtonClick("News")}
          >
            News
          </button>
          <button
            className={`rounded-full h-auto text-sm cursor-pointer ${
              activeButton === "Bio" ? "active-class" : ""
            }`}
            onClick={() => handleButtonClick("Bio")}
          >
            Bio
          </button>
          <button
            className={`cursor-pointer rounded-full h-auto text-sm ${
              activeButton === "CV" ? "active-class" : ""
            }`}
            onClick={() => handleButtonClick("CV")}
          >
            CV
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
              <img
                src={bluepencile}
                className="w-5 h-5"
                onClick={handleEditButtonClick}
                alt="Edit"
              />
              {activeButton === "News" && <p>{newsData}</p>}
              {activeButton === "Bio" && <p>{profileBio}</p>}
              {activeButton === "CV" && <p>{profileCV}</p>}
            </div>
          )}
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
                <img
                  src={bluepencile}
                  className="w-5 h-5"
                  onClick={() => handleEditButtonClick("News")}
                />
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
                  <p className=" text-xs">{newsData}</p>
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
                <img
                  src={bluepencile}
                  className="w-5 h-5"
                  onClick={() => handleEditButtonClick("Bio")}
                />
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
              <img
                src={bluepencile}
                className="w-5 h-5"
                onClick={() => handleEditButtonClick("CV")}
              />
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
                <p className="break-words text-xs">{profileCV}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatorInfo;