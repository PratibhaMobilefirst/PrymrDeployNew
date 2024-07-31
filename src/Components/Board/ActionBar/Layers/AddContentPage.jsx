import React, { useState, useRef } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import checkCircleWhite from "../../../../assets/checkCircleWhite.png";
import redDelete from "../../../../assets/redDelete.svg";
import AddChnageContent from "../../../../assets/hamburger.svg";
import stars from "../../../../assets/hamburger.svg";
import eye from "../../../../assets/Eye.svg";
import pin from "../../../../assets/pin.png";
import deletee from "../../../../assets/delete.svg";
import colorcircle from "../../../../assets/colorcircle.png";
import smallAvatar from "../../../../assets/smallAvatar.svg";
import downarrow from "../../../../assets/downArrow.svg";

import ColorPanel from "./ColorPannel";

const AddContentPage = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { layer } = location.state || {};
  const fileInputRef = useRef(null);
  const [colorPanelVisible, setColorPanelVisible] = useState(false);
  const [currentLayerId, setCurrentLayerId] = useState(null);
  const [layers, setLayers] = useState([
    {
      id: 1,
      name: "Layer 1",
      selectedColor: "#4B4B4B",
      tappableContent: null,
      selectedImage: null,
    },
  ]);

  const handleImageChange = (event) => {
    event.preventDefault();

    let files = event.target.files;
    let images = [];

    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      let file = files[i];

      reader.onloadend = () => {
        images.push({ id: new Date().getTime() + i, url: reader.result });
        if (images.length === files.length) {
          setSelectedImages((prevImages) => [...prevImages, ...images]);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleBack = () => {
    navigate("/board-builder-edit-board");
  };

  const handleClickChangeContent = () => {
    fileInputRef.current.click();
  };

  const handleImageDelete = (id) => {
    if (id === "tappable-content") {
      if (layer) {
        delete layer.tappableContent;
      }
    } else {
      setSelectedImages((prevImages) =>
        prevImages.filter((image) => image.id !== id)
      );
    }
  };

  const handleSave = async () => {
    navigate("/board-builder-edit-board");
  };

  const handleColorCircleClick = (id) => {
    setCurrentLayerId(id);
    setColorPanelVisible(true);
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
  };

  const handleColorSelect = (color) => {
    setLayers(
      layers.map((layer) =>
        layer.id === currentLayerId ? { ...layer, selectedColor: color } : layer
      )
    );
    setColorPanelVisible(false);
  };

  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden lg:pl-[10vw] lg:pr-[10vw]">
        <div className="mb-2">
          {layers.map((layer) => (
            <div
              key={layer.id}
              className="flex items-center justify-between p-2 mb-1 rounded bg-gray-800"
            >
              <input
                type="text"
                value={layer.name}
                onChange={(e) =>
                  setLayers(
                    layers.map((l) =>
                      l.id === layer.id ? { ...l, name: e.target.value } : l
                    )
                  )
                }
                className="text-sm bg-transparent border-none outline-none text-white"
              />

              <div className="flex items-center space-x-2">
                <button onClick={() => handleNewLayerAddClick()}>
                  <img src={pin} className="h-6 w-6" alt="Pin Icon" />
                </button>
                <button onClick={() => handleImageDelete(layer.id)}>
                  <img src={deletee} className="h-6 w-6" alt="Delete Icon" />
                </button>
                <button onClick={() => handleColorCircleClick(layer.id)}>
                  <img
                    src={colorcircle}
                    className="h-6 w-6"
                    alt="Color Circle Icon"
                  />
                </button>
                {colorPanelVisible && currentLayerId === layer.id && (
                  <div className="absolute z-10">
                    <ColorPanel onSelectColor={handleColorSelect} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-2 flex items-center justify-between p-2 bg-gray-800 rounded">
          <div className="flex items-center text-white space-x-2">
            <img src={downarrow} className="h-5 w-5" alt="Down Arrow" />
            <span>Close</span>
          </div>
          <div className="flex items-center text-white space-x-2">
            <span>Info Pop-Up</span>
            <img src={stars} className="h-5 w-5" alt="Stars" />
          </div>
        </div>

        <header
          onClick={handleBack}
          className="flex items-center space-x-2 mb-4 cursor-pointer"
        >
          <AiOutlineArrowLeft className="text-xl" />
          <span className="text-lg">Back</span>
        </header>

        <div className="flex-grow overflow-auto">
          <input
            type="file"
            accept="image/*"
            id="fileInput1"
            className="hidden"
            onChange={handleImageChange}
            ref={fileInputRef}
            multiple
          />
          <Carousel
            showThumbs={false}
            infiniteLoop
            useKeyboardArrows
            swipeable
            emulateTouch
            showStatus={false}
            showIndicators={true}
            showArrows={true}
            className="h-full"
          >
            {layer?.tappableContent && (
              <div className="relative">
                <img
                  src={layer.tappableContent}
                  className="w-full h-64 object-contain sm:h-96 lg:h-[60vh]"
                  alt="Tappable Content"
                />
                <div
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() => handleImageDelete("tappable-content")}
                >
                  <img src={redDelete} className="w-6 h-6" alt="Red Delete" />
                </div>
                <div
                  className=" cursor-pointer absolute bottom-2 right-2 bg-gray-800 text-white text-xs flex items-center p-1 rounded w-auto h-auto"
                  onClick={handleClickChangeContent}
                >
                  Add/Change Content
                  <img
                    src={AddChnageContent}
                    className="w-3 h-3 ml-1"
                    alt="Change Content Icon"
                  />
                </div>
              </div>
            )}
            {selectedImages.map((image) => (
              <div key={image.id} className="relative">
                <img
                  src={image.url}
                  className="w-full h-64 object-contain sm:h-96 lg:h-[60vh]"
                  alt="Uploaded Preview"
                />
                <div
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() => handleImageDelete(image.id)}
                >
                  <img src={redDelete} className="w-6 h-6" alt="Red Delete" />
                </div>
                <div
                  className="absolute bottom-2 right-2 bg-gray-800 text-white text-xs flex items-center p-1 rounded cursor-pointer"
                  onClick={handleClickChangeContent}
                >
                  Add/Change Content
                  <img
                    src={AddChnageContent}
                    className="w-3 h-3 ml-1"
                    alt="Change Content Icon"
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        <div className="flex flex-col p-4 bg-black bg-opacity-50">
          <input
            className="text-lg mb-2 bg-transparent text-white border-none outline-none resize-none"
            placeholder="Title Board"
          />
          <textarea
            className="w-full bg-transparent text-white border-none outline-none resize-none h-32"
            placeholder="Enter Board Description"
            style={{ lineHeight: "1.5em" }}
          />
        </div>

        <div
          className="fixed bottom-5 left-[10vw] right-[10vw] bg-blue-400 h-10 flex items-center rounded-full justify-center font-bold text-xl text-white cursor-pointer"
          onClick={handleSave}
        >
          Save
          <img
            src={checkCircleWhite}
            alt="Check Circle White"
            className="ml-3 w-5 h-5"
          />
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default AddContentPage;