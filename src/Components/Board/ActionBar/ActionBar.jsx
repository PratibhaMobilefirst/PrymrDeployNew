import React, { useState, useEffect } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { LuPencilLine } from "react-icons/lu";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import AddContent from "../../../assets/AddContent.svg";
import search from "../../../assets/search.svg";
import { IoLayersOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus, FaRedo, FaUndo } from "react-icons/fa";
import LayersPanel from "./Layers/Layers";
import NewTappable from "./NewTappeable/Newtapable";
import Play from "../../../assets/Play.svg";
import { useSelector } from "react-redux";
import undo from "../../../assets/images/undo.svg";
import redo from "../../../assets/images/redo.svg";
import info from "../../../assets/info.svg";
import line from "../../../assets/Line68.png";

const ActionBar = ({
  imageUrl,
  onSelectTappableArea,
  onImageSelect,
  onEmojiSelect,
  onLayersToggle,
  layers, // Receive layers as prop
}) => {
  const navigate = useNavigate();
  const [layerIsClicked, setLayerIsClicked] = useState(false);
  const [isBoardVisible, setBoardVisible] = useState(true);
  const [isNewTappableClicked, setNewTappableClicked] = useState(false);
  const [isBoardEditorVisible, setBoardEditorVisible] = useState(false);
  const { count } = useSelector((state) => state.layerId);
  const [showLayerCount, setShowLayerCount] = useState(null);

  useEffect(() => {
    // Update layer count whenever layers change
    setShowLayerCount(layers.length);
  }, [layers]);

  const handleBoardInfo = () => {
    alert("navigating to board info");
    console.log("check 3 from action bar");
    console.log("Navigating to BoardINFO with imageUrl:", imageUrl);
    navigate("/create-new-board-edit-board-info", { state: imageUrl });

    // navigate("/boardBuilder-BoardInfo-createPost", { state: imageUrl });
    toast.success("Navigating to Add / Save Process");
  };
  const handleImageEditor = () => {
    alert("navigating to board info");
    console.log("check handleImageEditor from action bar");
    console.log("Navigating to BoardEDITEDITEDITEDIT with imageUrl:", imageUrl);
    navigate("/board-builder-actionbar-image-edit", { state: imageUrl });
    // toast.success("Navigating to Add / Save Process");
  };

  const handleLayerClick = () => {
    setLayerIsClicked(!layerIsClicked);
    setBoardVisible(layerIsClicked);
    setNewTappableClicked(false);
    onLayersToggle(!layerIsClicked);
  };

  const handleTappableClick = () => {
    setNewTappableClicked(!isNewTappableClicked);
    // setBoardVisible(isNewTappableClicked);
    setLayerIsClicked(false);
    onLayersToggle(false);
  };

  const handleTappableClose = () => {
    setNewTappableClicked(false);
  };

  const handleBoardEditorClick = () => {
    navigate("/board-builder-actionbar-image-edit");
    setBoardEditorVisible(!isBoardEditorVisible);
  };
  const handleSelectTappableArea = () => {
    onSelectTappableArea();
    setNewTappableClicked(false);
  };
  const navigatetoahome = () => {
    navigate("/home");
  };

  return (
    <>
      <div style={{ position: "fixed", bottom: 0, left: 0, width: "100%" }}>
        

        {layerIsClicked && <LayersPanel />}
        {isNewTappableClicked && (
          <NewTappable
            onClose={handleTappableClose}
            onSelectTappableArea={handleSelectTappableArea}
            onImageSelect={onImageSelect}
            onEmojiSelect={onEmojiSelect}
          />
        )}
{isBoardVisible && (
          <div className="bg-gray-600 justify-center flex w-full p-1 items-center space-y-2 shrink">
            <div className="flex space-x-4 py-1">
              <button
                onClick={handleBoardInfo}
                className="py-1 px-6 sm:py-1 sm:px-5 md:py-1 md:px-6 lg:py-1 lg:px-7 rounded-[25px] border border-white flex items-center justify-center space-x-2"
              >
                <span className="flex-shrink-0"> Board Info</span>
                <span className="flex-shrink-0">
                  <BsInfoCircle />
                </span>
              </button>
              <button className="py-1 px-6 sm:py-1 sm:px-5 md:py-1 md:px-6 lg:py-1 lg:px-7  bg-sky-500 rounded-[55px]  flex items-center justify-center space-x-2">
                <span className="flex-shrink-0" onClick={navigatetoahome}>
                  Publish
                </span>
                <span className="flex-shrink-0">
                  <img src={Play} alt="" />
                </span>
              </button>
              <button
                className="py-1 px-4 sm:py-1 sm:px-5 md:py-1 md:px-6 lg:py-1 lg:px-7 rounded-[25px] border border-white flex items-center justify-center space-x-2"
                onClick={handleBoardEditorClick}
              >
                <span className="flex-shrink-0" onClick={handleImageEditor}>
                  Image Editors
                </span>
                <span className="flex-shrink-0">
                  <HiOutlineBookOpen />
                </span>
              </button>
            </div>
          </div>
        )}
        <div className="bg-gray-900 justify-center flex w-full p-1 items-center ">
          <div className="flex space-x-5 py-1">
            <div className="flex flex-col items-center space-x-2   mr-1">
              <button
                className={` py-2 px-8 rounded-full flex flex-col items-center ${
                  isNewTappableClicked
                    ? "bg-[#0085ff]"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                onClick={handleTappableClick}
                // onClick={handleBoardInfo}
              >
                <img src={info} className="text-xl  items-center" />
              </button>
              <span className="text-[#d1cdcdc8]  text-sm ">New tappable</span>
            </div>
            <div className="flex flex-col items-center ">
              <button className=" hover:bg-gray-600 py-1 px-4 rounded-full flex flex-col items-center">
                <img src={undo} className="text-xl h-5 w-5 mb-1" />
              </button>
              <span className="text-[#d1cdcdc8]  text-sm float-left">
                Undo{" "}
              </span>
            </div>
            <img src={line} className="h-8" />

            <div className="flex flex-col items-center ">
              <button className=" hover:bg-gray-600 py-1 px-4 rounded-full flex flex-col items-center">
                <img src={redo} className="text-xl h-5 w-5 mb-1" />
              </button>
              <span className="text-[#d1cdcdc8] text-sm float-left"> Redo</span>
            </div>
            <div className="flex flex-col items-center space-x-1 mr-1">
              <button
                className={`py-1 px-8 rounded-full flex flex-col items-center ${
                  layerIsClicked
                    ? "bg-yellow-500"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                onClick={handleLayerClick}
              >
                <span className="flex gap-2">
                  {showLayerCount}

                  <IoLayersOutline className="text-xl mb-1" />
                </span>
              </button>
              <span className="text-[#d1cdcdc8] text-sm">Layers</span>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default ActionBar;
