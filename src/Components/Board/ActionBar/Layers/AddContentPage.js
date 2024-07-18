import React, { useRef, useState } from "react";
import hamburger from "../../../../assets/hamburger.svg";
import eye from "../../../../assets/Eye.svg";
import pin from "../../../../assets/pin.png";
import colorcircle from "../../../../assets/colorcircle.png";
import deletee from "../../../../assets/delete.svg";
import LayersPanel from "./Layers";
import ColorPanel from "./ColorPannel";
import { useDispatch, useSelector } from "react-redux";
import "./layers.css";

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
    <div>
        {layers.map((layer, index) => (
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
              colorPanelVisible && currentLayerId === layer.id ? "hidden" : ""
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
      </div> )) }
    </div>
  );
};

export default AddContentPage;
