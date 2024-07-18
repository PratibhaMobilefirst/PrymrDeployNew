import React, { useRef, useState } from "react";
import hamburger from "../../../../assets/hamburger.svg";
import eye from "../../../../assets/Eye.svg";
import pin from "../../../../assets/pin.png";
import colorcircle from "../../../../assets/colorcircle.png";
import checkCircleWhite from "../../../../assets/checkCircleWhite.png";
import deletee from "../../../../assets/delete.svg";

import smallAvatar from "../../../../assets/smallAvatar.svg";
import downarrow from "../../../../assets/downArrow.svg";
import redDelete from "../../../../assets/redDelete.svg";
import AddChnageContent from "../../../../assets/hamburger.svg";
import stars from "../../../../assets/hamburger.svg";
import LayersPanel from "./Layers";
import ColorPanel from "./ColorPannel";
import { useDispatch, useSelector } from "react-redux";
import "./layers.css";
import { ToastContainer } from "react-toastify";

const AddContentPage = ({
  isVisible,
  tappableContent,
  lastAddedTappableContent,
  layer,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [layerIsClicked, setLayerIsClicked] = useState(false);
  const [isTapActionOpen, setTapActionOpen] = useState(false);
  const [isAddContentOpen, setAddContentOpen] = useState(false);
  const [colorPanelVisible, setColorPanelVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#4B4B4B");
  const [isSwiperView, setIsSwiperView] = useState(true);
  const dispatch = useDispatch();

  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [colorPanelOpen, setColorPanelOpen] = useState(false);
  const [currentLayerId, setCurrentLayerId] = useState(null);
  const [isTappableVisible, setIsTappableVisible] = useState(false);
  const [layers, setLayers] = useState([
    {
      id: 1,
      name: "Layer 1",
      selectedColor: "#4B4B4B",
      tappableContent: null,
      selectedImage: null,
    },
  ]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];

    if (file) {
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleClickChangeContent = () => {
    fileInputRef.current.click();
  };
  const handleLayerAddClick = () => {
    if (selectedImage) {
      onAddSticker(selectedImage);
    }
  };
  const handleTapAction = () => {
    setTapActionOpen(!isTapActionOpen);
    setLayerIsClicked(false);
  };

  const handleAddContent = () => {
    setAddContentOpen(!isAddContentOpen);
    setLayerIsClicked(false);
  };

  const handleColorCircleClick = (id) => {
    setCurrentLayerId(id);
    setColorPanelVisible(true);
  };
  const handleColorSelect = (color) => {
    setLayers(
      layers.map((layer) =>
        layer.id === currentLayerId ? { ...layer, selectedColor: color } : layer
      )
    );
    setColorPanelVisible(false);
  };

  const handleLayerDeleteClick = (layerId) => {
    if (layerId === 1) {
      alert("The first layer cannot be deleted.");
    } else {
      setLayers(layers.filter((layer) => layer.id !== layerId));
      dispatch(setCount(layers.length - 1));
    }
  };

  const handleNewLayerAddClick = () => {
    const newLayerId = layers.length + 1;

    setLayers([
      ...layers,
      {
        id: newLayerId,
        name: `Layer ${newLayerId}`,
        selectedColor: "#4B4B4B",
        tappableContent: null,
        selectedImage: null,
      },
    ]);
    dispatch(setCount(layers.length + 1));
  };

  const toggleView = () => {
    console.log("toggle swiper");
    setIsSwiperView(!isSwiperView);
  };
  const handletapbale = () => {
    setIsTappableVisible(true);
  };
  const handleLayerNameChange = (layerId, newName) => {
    setLayers(
      layers.map((layer) =>
        layer.id === layerId ? { ...layer, name: newName } : layer
      )
    );
  };

  return (
    <>
      <div>
        {layers.map((layer, index) => (
          <div
            className="flex items-center h-9 justify-between p-2 m-1"
            style={{
              backgroundColor: layer.selectedColor,
              borderRadius: "0.25rem",
            }}
          >
            <input
              type="text"
              value={layer.name}
              onChange={(e) => handleLayerNameChange(layer.id, e.target.value)}
              className="text-sm bg-transparent border-none outline-none text-white"
            />

            <div
              className={`flex h-8 w-60 transition-transform duration-30 ease-in-out bg-[#4B4B4B] ${
                colorPanelVisible && currentLayerId === layer.id
                  ? "transform -translate-x-20"
                  : ""
              }`}
            >
              <button
                onClick={() => setLayerIsClicked(!layerIsClicked)}
                className="p-2 "
              >
                <img src={eye} className="h-[10px] w-[10px] " alt="Eye Icon" />
              </button>
              <button onClick={handleNewLayerAddClick} className="p-0 ml-2">
                <img src={pin} className="h-8 w-8 " alt="Pin Icon" />
              </button>
              <button
                onClick={() => handleLayerDeleteClick(layer.id)}
                className="p-1 ml-2"
              >
                <img src={deletee} className="w-[29px] " alt="Delete Icon" />
              </button>
              <button
                onClick={() => handleColorCircleClick(layer.id)}
                className={`p-1 ml-2 left-20 ${
                  colorPanelVisible && currentLayerId === layer.id
                    ? "hidden"
                    : ""
                }`}
              >
                <img
                  src={colorcircle}
                  className="w-[25px] "
                  alt="Color Circle Icon"
                />
              </button>

              {colorPanelVisible && currentLayerId === layer.id && (
                <div className="absolute left-16 top-0 z-10">
                  <div className="overflow-y-auto">
                    <ColorPanel onSelectColor={handleColorSelect} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex bg-[#4B4B4B] justify-between items-center   shadow-md m-1 ">
        <div className="flex  text-white items-center space-x-2">
          <img src={downarrow} className="h-5 w-5" alt="Down Arrow" />
          <span>Close</span>
        </div>

        <div className="flex items-center justify-center">
          <img
            src={smallAvatar}
            className="h-12 w-12 rounded-full"
            alt="Avatar"
          />
        </div>

        <div className="flex text-white items-center space-x-2">
          <span>Info Pop-Up</span>
          <img src={stars} className="h-5 w-5" alt="Stars" />
        </div>
      </div>
      {/  /}
      <div className="container top-[100vh] text-white">
        <div className="p-1 rounded-lg mb-2">
          <input
            type="file"
            accept="image/*"
            id="fileInput1"
            className="hidden"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          <div className="h-auto w-full ">
            <div>
              <img src={redDelete} className="ml-auto mt-1" />
            </div>{" "}
          </div>
          <div className="h-auto w-full">
            {imagePreviewUrl && (
              <img
                src={imagePreviewUrl}
                className="w-full h-auto"
                alt="Uploaded Preview"
              />
            )}
          </div>
          <div
            className="flex justify-end gap-1 bg-[#4B4B4B] text-wrap text-xs w-[39vw] p-1 ml-auto mr-1 cursor-pointer"
            onClick={handleClickChangeContent}
          >
            Add/Change Content
            <img
              src={AddChnageContent}
              className="w-3 h-3 pt-1"
              alt="Change Content Icon"
            />
          </div>
        </div>
      </div>
      <div className="w-full h-auto inset-0 bg-black bg-opacity-50 flex flex-col p-4">
        <div className="text-white mb-4">
          <h1 className="text-md top5">Title Board</h1>
        </div>
        <textarea
          className="w-full bg-transparent text-white border-none resize-none outline-none"
          // value={description}
          // onChange={handleDescriptionChange}
          placeholder="Enter Board Description"
          rows={4}
          style={{ lineHeight: "1.5em" }}
        />
      </div>
      <div
        className="flex bg-blue-400 w-full fixed bottom-1 h-16 font-bold text-3xl text-white justify-center items-center mb-3"
        // onClick={handleSave}
      >
        Save
        <img
          src={checkCircleWhite}
          alt="Check Circle White"
          className="ml-3 w-8 h-8"
        />
      </div>
    </>
  );
};

export default AddContentPage;
