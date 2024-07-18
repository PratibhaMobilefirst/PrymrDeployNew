import { FaPlus, FaUndo, FaRedo } from "react-icons/fa";
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
// import { fabric } from "fabric";
import * as fabric from "fabric";
import { ImageContext } from "../../ImageContext/ImageContext";
import TapAction from "./TapAction";
import AddContentPage from "./AddContentPage";
import { useContext, useRef, useState, useEffect } from "react";
import { baseURL } from "../../../../Constants/urls";
import ColorPanel from "./ColorPannel";
import { Swiper, SwiperSlide } from "swiper/react";
import NewTappable from "../NewTappeable/Newtapable";
import { useDispatch, useSelector } from "react-redux";
import { setCount } from "../../../../redux/LayerCountSlice";
import "./layers.css";

const LayersPanel = ({
  isVisible,
  tappableContent,
  lastAddedTappableContent,
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
    isVisible && (
      <div className="fixed bottom-20 w-full left-0">
        {isTapActionOpen && <TapAction imageUrl={selectedImage} />}{ isAddContentOpen && <AddContentPage />}
        <header className="flex items-center justify-between bg-[#00000047]">
          <h2 className="text-lg text-white px-2">Layers</h2>
          <button className="text-white" onClick={handleNewLayerAddClick}>
            <FaPlus />
          </button>
          <img src={search} alt="search" className="w-5 mr-2 h-5" />
          <img
            src={arrowspointingout}
            alt="arrowspointingout"
            className="w-5 h-5 mr-2 cursor-pointer"
            onClick={toggleView}
          />
        </header>
        <div className="bg-gray-800 text-white opacity-500 p-2">
          {isSwiperView ? (
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              loop={false}
              navigation
              // style={{ paddingBottom: "20px" }}
            >
              {layers.map((layer, index) => (
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
                          <img src={pin} className="h-8 w-8 " alt="Pin Icon" />
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
                              <ColorPanel onSelectColor={handleColorSelect} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1">
                      <div
                        className="flex flex-col items-center justify-center"
                        style={{
                          backgroundColor: layer.selectedColor,
                          borderRadius: "0.25rem",
                          padding: "1rem",
                        }}
                      >
                        <label htmlFor={`fileInput${layer.id}`}>
                          {index === layers.length - 1 &&
                          lastAddedTappableContent ? (
                            typeof lastAddedTappableContent === "string" &&
                            lastAddedTappableContent.startsWith(
                              "data:image"
                            ) ? (
                              <img
                                src={lastAddedTappableContent}
                                alt="Tappable Content"
                                className="cursor-pointer w-[120px] h-[120px] rounded-md object-contain"
                              />
                            ) : (
                              <span className="cursor-pointer w-[120px] h-[120px] rounded-md flex items-center justify-center text-6xl">
                                {lastAddedTappableContent}
                              </span>
                            )
                          ) : layer.tappableContent ? (
                            <img
                              src={layer.selectedImage || LayerTappable}
                              // src={tappable}
                              alt="Tappable"
                              className="cursor-pointer w-[120px] h-[120px] rounded-md"
                              // onClick={handletapbale}
                            />
                          ) : null}
                          {/* {/ {isTappableVisible && <NewTappable />} /} */}
                        </label>
                        {/* <input
                          type="file"
                          accept="image/*"
                          id={`fileInput${layer.id}`}
                          style={{ display: "none" }}
                          onChange={(e) => handleImageUpload(e, layer.id)}
                        /> */}
                      </div>
                      <button
                        className="flex flex-col items-center justify-center"
                        style={{
                          backgroundColor: layer.selectedColor,
                          borderRadius: "0.25rem",
                        }}
                        onClick={handleTapAction}
                      >
                        <img src={AddAction} alt="Add Actions" />
                      </button>
                      <button
                        className="flex flex-col items-center justify-center"
                        style={{
                          backgroundColor: layer.selectedColor,
                          borderRadius: "0.25rem",
                        }}
                        onClick={handleAddContent}
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
              {layers.map((layer, index) => (
                <div
                  key={layer.id}
                  className="relative flex flex-col space-y-1 m-3"
                  style={{
                    backgroundColor: layer.selectedColor,
                    borderRadius: "0.25rem",
                    padding: "1rem",
                  }}
                >
                  <div
                    className="flex items-center h-9 justify-between p-2"
                    style={{
                      backgroundColor: layer.selectedColor,
                      borderRadius: "0.25rem",
                    }}
                  >
                    <h3 className="text-sm">Layer {layer.id}</h3>
                    {/* <div
                      className="flex h-8"
                      style={{ backgroundColor: "#4B4B4B" }}
                    > */}

                    <div
                      className={`flex h-8 w-60 transition-transform duration-30 ease-in-out bg-[#4B4B4B] ${
                        colorPanelVisible && currentLayerId === layer.id
                          ? "transform -translate-x-20"
                          : ""
                      }`}
                    >
                      <button
                        onClick={() => setLayerIsClicked(!layerIsClicked)}
                      >
                        <img src={eye} className="items-center -mt-1 h-6 w-6" />
                      </button>
                      <button onClick={handleNewLayerAddClick}>
                        <img src={pin} className="items-center -mt-1 h-6 w-6" />
                      </button>
                      <button onClick={() => handleLayerDeleteClick(layer.id)}>
                        <img
                          src={deletee}
                          className="items-center -mt-1 h-6 w-6"
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
                            {" "}
                            <ColorPanel onSelectColor={handleColorSelect} />
                          </div>{" "}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div
                      className="flex flex-col items-center justify-center"
                      style={{
                        backgroundColor: layer.selectedColor,
                        borderRadius: "0.25rem",
                      }}
                    >
                      <label htmlFor={`fileInput${layer.id}`}>
                        {index === layers.length - 1 &&
                        lastAddedTappableContent ? (
                          typeof lastAddedTappableContent === "string" &&
                          lastAddedTappableContent.startsWith("data:image") ? (
                            <img
                              src={lastAddedTappableContent}
                              alt="Tappable Content"
                              className="cursor-pointer w-[120px] h-[120px] rounded-md object-contain"
                            />
                          ) : (
                            <span className="cursor-pointer w-[120px] h-[120px] rounded-md flex items-center justify-center text-6xl">
                              {lastAddedTappableContent}
                            </span>
                          )
                        ) : layer.tappableContent ? (
                          <img
                            src={layer.selectedImage || LayerTappable}
                            // src={tappable}
                            alt="Tappable"
                            className="cursor-pointer w-[120px] h-[120px] rounded-md"
                            // onClick={handletapbale}
                          />
                        ) : null}
                        {/* {/ {isTappableVisible && <NewTappable />} /} */}
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        id={`fileInput${layer.id}`}
                        style={{ display: "none" }}
                        onChange={(e) => handleImageUpload(e, layer.id)}
                      />
                    </div>
                    <button
                      className="flex flex-col items-center justify-center"
                      style={{
                        backgroundColor: layer.selectedColor,
                        borderRadius: "0.25rem",
                      }}
                      onClick={handleTapAction}
                    >
                      <img src={AddAction} alt="Add Actions" />
                    </button>
                    <button
                      className="flex flex-col items-center justify-center"
                      style={{
                        backgroundColor: layer.selectedColor,
                        borderRadius: "0.25rem",
                      }}
                      onClick={handleAddContent}
                    >
                      <img src={AddContent} alt="Add Content" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  );
};
export default LayersPanel;
