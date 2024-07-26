import React, { useContext, useRef, useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import hamburger from "../../../../assets/hamburger.svg";
import eye from "../../../../assets/Eye.svg";
import pin from "../../../../assets/pin.png";
import colorcircle from "../../../../assets/colorcircle.png";
import deletee from "../../../../assets/delete.svg";
import search from "../../../../assets/search.svg";
import arrowspointingout from "../../../../assets/arrowspointingout.svg";
import LayerTappable from "../../../../assets/tappable.svg";
import AddAction from "../../../../assets/AddActions.svg";
import AddContent from "../../../../assets/AddContent.svg";
import * as fabric from "fabric";
import { ImageContext } from "../../ImageContext/ImageContext";
import TapAction from "./TapAction";
import AddContentPage from "./AddContentPage";
import ColorPanel from "./ColorPannel";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { setCount } from "../../../../redux/LayerCountSlice";
import "swiper/css";
import "./layers.css";
import { useNavigate } from "react-router";

const LayersPanel = ({
  isVisible,
  tappableContent,
  lastAddedTappableContent,
  layers = [],
  setLayers,
  handleFixTappableContent,
  selectedLayerId,
  onLayerClick,
  onLayerDelete,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [layerIsClicked, setLayerIsClicked] = useState(false);
  const [isTapActionOpen, setTapActionOpen] = useState(false);
  const [isAddContentOpen, setAddContentOpen] = useState(false);
  const [colorPanelVisible, setColorPanelVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#4B4B4B");
  const [isSwiperView, setIsSwiperView] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const [currentLayerId, setCurrentLayerId] = useState(null);
  const swiperInstanceRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isVisible && selectedLayerId && swiperInstanceRef.current) {
      const index = layers.findIndex((layer) => layer.id === selectedLayerId);
      if (index !== -1) {
        swiperInstanceRef.current.slideTo(index);
      }
    }
  }, [isVisible, selectedLayerId, layers]);

  const NavigateToAddContent = (layer) => {
    navigate("/add-content", { state: { layer } });
  };

  const handleLayerAddClick = () => {
    if (selectedImage) {
      onAddSticker(selectedImage);
    }
  };

  const handleTapActionClick = () => {
    navigate("/infoOverlay");
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
    onLayerDelete(layerId);
    dispatch(setCount(layers.length - 1));
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
    setIsSwiperView(!isSwiperView);
  };

  const handleLayerNameChange = (layerId, newName) => {
    setLayers(
      layers.map((layer) =>
        layer.id === layerId ? { ...layer, name: newName } : layer
      )
    );
  };

  const handleTappableClick = (layerId) => {
    onLayerClick(layerId);
  };

  const renderTappableContent = (content) => {
    if (!content) {
      return (
        <img
          src={LayerTappable}
          alt="Layer Tappable"
          className="cursor-pointer max-w-[129px] max-h-[130px] object-contain"
        />
      );
    }

    if (typeof content === "string" && content.startsWith("data:image")) {
      return (
        <img
          src={content}
          alt="Tappable Content"
          className="cursor-pointer max-w-[129px] max-h-[130px] object-contain"
        />
      );
    } else {
      return (
        <span className="cursor-pointer max-w-[120px] max-h-[120px] flex items-center justify-center text-6xl">
          {content}
        </span>
      );
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredLayers = layers.filter((layer) =>
    layer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    isVisible && (
      <div className="fixed bottom-20 w-full left-0">
        {isTapActionOpen && <TapAction imageUrl={selectedImage} />}
        {isAddContentOpen && <AddContentPage />}
        <header className="flex items-center justify-between bg-[#00000047]">
          <h2 className="text-lg text-white px-2">Layers</h2>
          <button className="text-white" onClick={handleNewLayerAddClick}>
            <FaPlus />
          </button>
          <div className="flex mr-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search layers..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="text-black px-2 py-1 pl-8 mb-0"
              />
              <img
                src={search}
                alt="search"
                className="w-5 h-5 absolute top-1/3 transform -translate-y-1/3 left-2"
              />
            </div>
          </div>
          <img
            src={arrowspointingout}
            alt="arrowspointingout"
            className="w-5 h-5 mr-2 cursor-pointer"
            onClick={toggleView}
          />
        </header>
        <div className="bg-gray-800 text-white opacity-500 p-2">
          {isTapActionOpen ? (
            <TapAction
              imageUrl={selectedImage}
              onClose={() => setIsTapActionOpen(false)}
            />
          ) : (
            <>
              {isSwiperView ? (
                <Swiper
                  onSwiper={(swiper) => {
                    swiperInstanceRef.current = swiper;
                  }}
                  slidesPerView={1}
                  spaceBetween={10}
                  loop={false}
                  navigation
                >
                  {filteredLayers.map((layer) => (
                    <SwiperSlide key={layer.id}>
                      <div className="relative flex flex-col space-y-1">
                        <div
                          className="flex items-center h-9 justify-between p-2"
                          style={{
                            backgroundColor: layer.selectedColor,
                            borderRadius: "0.25rem",
                          }}
                        >
                          <input
                            type="text"
                            value={layer.name}
                            onChange={(e) =>
                              handleLayerNameChange(layer.id, e.target.value)
                            }
                            className="text-sm bg-transparent border-none outline-none text-white"
                          />
                          <div
                            className={`flex h-8 w-60 transition-transform duration-30 ease-in-out bg-[#4B4B4B] ${
                              colorPanelVisible && currentLayerId === layer.id
                                ? "transform -translate-x-36"
                                : ""
                            }`}
                          >
                            <button
                              onClick={() => setLayerIsClicked(!layerIsClicked)}
                              className="p-2 "
                            >
                              <img
                                src={eye}
                                className="h-[10px] w-[10px] "
                                alt="Eye Icon"
                              />
                            </button>
                            <button
                              onClick={handleNewLayerAddClick}
                              className="p-0 ml-2"
                            >
                              <img
                                src={pin}
                                className="h-8 w-8 "
                                alt="Pin Icon"
                              />
                            </button>
                            <button
                              onClick={() => handleLayerDeleteClick(layer.id)}
                              className="p-1 ml-2"
                            >
                              <img
                                src={deletee}
                                className="w-[29px] "
                                alt="Delete Icon"
                              />
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
                            {colorPanelVisible &&
                              currentLayerId === layer.id && (
                                <div className="absolute left-16 top-0 z-10">
                                  <div className="overflow-y-auto">
                                    <ColorPanel
                                      onSelectColor={handleColorSelect}
                                      onClose={() =>
                                        setColorPanelVisible(false)
                                      }
                                    />
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <button
                            className="flex flex-col items-center justify-center"
                            style={{
                              backgroundColor: layer.selectedColor,
                              borderRadius: "0.25rem",
                            }}
                            onClick={() => handleTappableClick(layer.id)}
                          >
                            <label htmlFor={`fileInput${layer.id}`}>
                              {renderTappableContent(layer.tappableContent)}
                            </label>
                          </button>
                          <button
                            className="flex flex-col items-center justify-center"
                            style={{
                              backgroundColor: layer.selectedColor,
                              borderRadius: "0.25rem",
                            }}
                            onClick={handleTapActionClick}
                          >
                            <img src={AddAction} alt="Add Actions" />
                          </button>
                          <button
                            className="flex flex-col items-center justify-center"
                            style={{
                              backgroundColor: layer.selectedColor,
                              borderRadius: "0.25rem",
                            }}
                            onClick={() => NavigateToAddContent(layer)}
                          >
                            <img src={AddContent} alt="Add Content" />
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="flex flex-col space-y-1 m-3 max-h-[70vh] overflow-y-auto">
                  {filteredLayers.map((layer) => (
                    <div
                      key={layer.id}
                      className="relative flex flex-col space-y-1 m-3"
                      style={{
                        backgroundColor: layer.selectedColor,
                        borderRadius: "0.25rem",
                        padding: "10px",
                      }}
                      onClick={() => handleTappableClick(layer.id)}
                    >
                      <div
                        className="flex items-center h-9 justify-between p-2"
                        style={{
                          backgroundColor: layer.selectedColor,
                          borderRadius: "0.25rem",
                        }}
                      >
                        <input
                          type="text"
                          value={layer.name}
                          onChange={(e) =>
                            handleLayerNameChange(layer.id, e.target.value)
                          }
                          className="text-sm bg-transparent border-none outline-none text-white"
                        />
                        <div
                          className={`flex h-8 w-60 transition-transform duration-30 ease-in-out bg-[#4B4B4B] ${
                            colorPanelVisible && currentLayerId === layer.id
                              ? "transform -translate-x-36"
                              : ""
                          }`}
                        >
                          <button
                            onClick={() => setLayerIsClicked(!layerIsClicked)}
                            className="p-2 "
                          >
                            <img
                              src={eye}
                              className="h-[10px] w-[10px] "
                              alt="Eye Icon"
                            />
                          </button>
                          <button
                            onClick={handleNewLayerAddClick}
                            className="p-0 ml-2"
                          >
                            <img
                              src={pin}
                              className="h-8 w-8 "
                              alt="Pin Icon"
                            />
                          </button>
                          <button
                            onClick={() => handleLayerDeleteClick(layer.id)}
                            className="p-1 ml-2"
                          >
                            <img
                              src={deletee}
                              className="w-[29px] "
                              alt="Delete Icon"
                            />
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
                                <ColorPanel
                                  onSelectColor={handleColorSelect}
                                  onClose={() => setColorPanelVisible(false)}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          className="flex flex-col items-center justify-center"
                          style={{
                            backgroundColor: layer.selectedColor,
                            borderRadius: "0.25rem",
                          }}
                          onClick={() => handleTappableClick(layer.id)}
                        >
                          <label htmlFor={`fileInput${layer.id}`}>
                            {renderTappableContent(layer.tappableContent)}
                          </label>
                        </button>
                        <button
                          className="flex flex-col items-center justify-center"
                          style={{
                            backgroundColor: layer.selectedColor,
                            borderRadius: "0.25rem",
                          }}
                          onClick={handleTapActionClick}
                        >
                          <img src={AddAction} alt="Add Actions" />
                        </button>
                        <button
                          className="flex flex-col items-center justify-center"
                          style={{
                            backgroundColor: layer.selectedColor,
                            borderRadius: "0.25rem",
                          }}
                          onClick={() => NavigateToAddContent(layer)}
                        >
                          <img src={AddContent} alt="Add Content" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {filteredLayers.length === 0 && (
                    <div className="text-center text-white">
                      No layers found.
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )
  );
};

export default LayersPanel;
