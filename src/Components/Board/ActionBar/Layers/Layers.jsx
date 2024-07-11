// import { FaPlus, FaUndo, FaRedo } from "react-icons/fa";
// import hamburger from "../../../../assets/hamburger.svg";
// import eye from "../../../../assets/Eye.svg";
// import deletee from "../../../../assets/delete.svg";
// import search from "../../../../assets/search.svg";
// import arrowspointingout from "../../../../assets/arrowspointingout.svg";
// import tappable from "../../../../assets/tappable.svg";
// import AddAction from "../../../../assets/AddActions.svg";
// import AddContent from "../../../../assets/AddContent.svg";
// import { fabric } from "fabric";
// import { ImageContext } from "../../ImageContext/ImageContext";
// import TapAction from "./TapAction";
// import { useContext, useRef, useState, useEffect } from "react";

// const LayersPanel = ({ isVisible, tappableContent }) => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [layerIsClicked, setLayerIsClicked] = useState(false);
//   const [isTapActionOpen, setTapActionOpen] = useState(false);
//   const canvasRef = useRef(null);
//   const fabricCanvasRef = useRef(null);
//   const { setImageUrl } = useContext(ImageContext);

//   useEffect(() => {
//     const canvas = new fabric.Canvas(canvasRef.current, {
//       width: 500,
//       height: 500,
//       backgroundColor: "#f3f3f3",
//     });

//     fabricCanvasRef.current = canvas;

//     canvas.on("object:added", () => {
//       console.log("Object added");
//     });

//     canvas.on("object:removed", () => {
//       console.log("Object removed");
//     });

//     return () => {
//       canvas.dispose();
//     };
//   }, []);

//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const imageUrl = reader.result;

//         triggerLayerAdd(imageUrl);
//         setImageUrl(imageUrl); // Notify CanvasBoard component via context
//       };
//       reader.readAsDataURL(file);
//     }

//     const storedToken = localStorage.getItem("token");

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       await fetch(
//         "https://prymr-dev-backend.vercel.app/api/file-upload/uploadFile",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${storedToken}`,
//           },
//           body: formData,
//         }
//       ).then(async (response) => {
//         // call back to fabric to add the image
//         console.log("Image response:", response);
//         if (response.ok) {
//           const data = await response.json();
//           console.log("Image uploaded:", data);
//           const layerImageUrl = data.secureUrl;
//           setSelectedImage(layerImageUrl);
//           triggerLayerAdd(layerImageUrl);
//           setImageUrl(layerImageUrl); // Notify CanvasBoard component via context

//           // setLayerImage(layerImageUrl);
//           // onImageUpload(layerImageUrl); // Callback to EditBoard to add the image
//         } else {
//           console.error("Failed to upload image");
//         }
//       });

//       // if (response.ok) {
//       //   const result = await response.json();
//       //   const layerImageUrl = result.data.url;
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   const triggerLayerAdd = (imageURL) => {
//     const canvas = fabricCanvasRef.current;
//     fabric.Image.fromURL(imageURL, (img) => {
//       img.scaleToWidth(canvas.width * 0.9);
//       img.scaleToHeight(canvas.height * 0.9);
//       canvas.add(img);
//       canvas.renderAll();
//     });
//   };

//   const onAddSticker = (imageURL) => {
//     const canvas = fabricCanvasRef.current;
//     fabric.Image.fromURL(
//       imageURL,
//       function (oImg) {
//         oImg.set({
//           selectable: true,
//           evented: true,
//         });
//         canvas.add(oImg);
//         canvas.renderAll();
//       },
//       {
//         crossOrigin: "anonymous",
//         id: `sticker-${getRandomNumber(100000, 999999999)}`,
//         imageLink: imageURL,
//         isClosed: false,
//         eventName: "",
//         eventDescription: "",
//       }
//     );
//   };

//   const getRandomNumber = (min, max) => {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   };

//   const handleLayerAddClick = () => {
//     if (selectedImage) {
//       onAddSticker(selectedImage);
//     }
//   };

//   const handleTapAction = () => {
//     setTapActionOpen(!isTapActionOpen);
//     setLayerIsClicked(false);
//   };

//   return (
//     isVisible && (
//       <div className="fixed bottom-20 w-full left-0">
//         {isTapActionOpen && <TapAction imageUrl={selectedImage} />}
//         <header className="flex items-center justify-between bg-[#00000047]">
//           <h2 className="text-lg text-white px-2">Layers</h2>
//           <button className="text-white" onClick={handleLayerAddClick}>
//             <FaPlus />
//           </button>
//           <img src={search} alt="search" className="w-5 mr-2 h-5" />
//           <img
//             src={arrowspointingout}
//             alt="arrowspointingout"
//             className="w-5 h-5 mr-2"
//           />
//         </header>
//         <div className="bg-gray-800 text-white opacity-500 p-2">
//           <div className="flex flex-col space-y-1">
//             <div className="flex items-center h-9 justify-between p-2 bg-gray-700 rounded">
//               <h3 className="text-sm">Layer 01</h3>
//               <div className="flex h-8 bg-[#4B4B4B]">
//                 <button onClick={() => setLayerIsClicked(!layerIsClicked)}>
//                   <img src={eye} className="items-center -mt-1 h-6 w-6" />
//                 </button>
//                 <button onClick={handleLayerAddClick}>
//                   <img src={deletee} className="items-center -mt-1 h-6 w-6" />
//                 </button>
//                 <button>
//                   <img src={hamburger} className="items-center -mt-1 h-6 w-6" />
//                 </button>
//               </div>
//             </div>
//             <div className="grid grid-cols-3 gap-2">
//               <div className="flex flex-col items-center justify-center bg-gray-700 rounded p-4">
//                 <label htmlFor="fileInput1">
//                   {tappableContent ? (
//                     typeof tappableContent === "string" &&
//                     tappableContent.startsWith("data:image") ? (
//                       <img
//                         src={tappableContent}
//                         alt="Tappable Content"
//                         className="cursor-pointer w-[120px] h-[120px] rounded-md object-contain"
//                       />
//                     ) : (
//                       <span className="cursor-pointer w-[120px] h-[120px] rounded-md flex items-center justify-center text-6xl">
//                         {tappableContent}
//                       </span>
//                     )
//                   ) : (
//                     <img
//                       src={selectedImage || tappable}
//                       alt="Tappable"
//                       className="cursor-pointer w-[120px] h-[120px] rounded-md"
//                     />
//                   )}
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   id="fileInput1"
//                   style={{ display: "none" }}
//                   onChange={handleImageUpload}
//                 />
//               </div>
//               <button
//                 className="flex flex-col items-center justify-center bg-gray-700 rounded"
//                 onClick={handleTapAction}
//               >
//                 <img src={AddAction} alt="Add Actions" />
//               </button>

//               <button className="flex flex-col items-center justify-center bg-gray-700 rounded">
//                 <img src={AddContent} alt="Add Content" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default LayersPanel;

import { FaPlus, FaUndo, FaRedo } from "react-icons/fa";
import hamburger from "../../../../assets/hamburger.svg";
import eye from "../../../../assets/Eye.svg";
import pin from "../../../../assets/pin.png";
import colorcircle from "../../../../assets/colorcircle.png";
import deletee from "../../../../assets/delete.svg";
import search from "../../../../assets/search.svg";
import arrowspointingout from "../../../../assets/arrowspointingout.svg";
import tappable from "../../../../assets/tappable.svg";
import AddAction from "../../../../assets/AddActions.svg";
import AddContent from "../../../../assets/AddContent.svg";
import { fabric } from "fabric";
import { ImageContext } from "../../ImageContext/ImageContext";
import TapAction from "./TapAction";
import { useContext, useRef, useState, useEffect } from "react";
import { baseURL } from "../../../../Constants/urls";
import ColorPanel from "./ColorPannel";
import { Swiper, SwiperSlide } from "swiper/react";
import NewTappable from "../NewTappeable/Newtapable";

const LayersPanel = ({ isVisible, tappableContent }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [layerIsClicked, setLayerIsClicked] = useState(false);
  const [isTapActionOpen, setTapActionOpen] = useState(false);
  const [colorPanelVisible, setColorPanelVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#4B4B4B");
  const [isSwiperView, setIsSwiperView] = useState(true);

  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const { setImageUrl } = useContext(ImageContext);
  const [currentLayerId, setCurrentLayerId] = useState(null);
  const [isTappableVisible, setIsTappableVisible] = useState(false);
  const [layers, setLayers] = useState([
    {
      id: 1,
      selectedColor: "#4B4B4B",
      tappableContent: null,
      selectedImage: null,
    },
  ]);
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 500,
      height: 500,
      backgroundColor: "#f3f3f3",
    });
    fabricCanvasRef.current = canvas;
    canvas.on("object:added", () => {
      console.log("Object added");
    });
    canvas.on("object:removed", () => {
      console.log("Object removed");
    });
    return () => {
      canvas.dispose();
    };
  }, []);
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        triggerLayerAdd(imageUrl);
        setImageUrl(imageUrl); // Notify CanvasBoard component via context
      };
      reader.readAsDataURL(file);
    }
    const storedToken = localStorage.getItem("token");
    try {
      const formData = new FormData();
      formData.append("file", file);
      await fetch(`${baseURL}/file-upload/uploadFile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
        body: formData,
      }).then(async (response) => {
        // call back to fabric to add the image
        console.log("Image response:", response);
        if (response.ok) {
          const data = await response.json();
          console.log("Image uploaded:", data);
          const layerImageUrl = data.secureUrl;
          setSelectedImage(layerImageUrl);
          triggerLayerAdd(layerImageUrl);
          setImageUrl(layerImageUrl); // Notify CanvasBoard component via context
          // setLayerImage(layerImageUrl);
          // onImageUpload(layerImageUrl); // Callback to EditBoard to add the image
        } else {
          console.error("Failed to upload image");
        }
      });
      // if (response.ok) {
      //   const result = await response.json();
      //   const layerImageUrl = result.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const triggerLayerAdd = (imageURL) => {
    const canvas = fabricCanvasRef.current;
    fabric.Image.fromURL(imageURL, (img) => {
      img.scaleToWidth(canvas.width * 0.9);
      img.scaleToHeight(canvas.height * 0.9);
      canvas.add(img);
      canvas.renderAll();
    });
  };
  const onAddSticker = (imageURL) => {
    const canvas = fabricCanvasRef.current;
    fabric.Image.fromURL(
      imageURL,
      function (oImg) {
        oImg.set({
          selectable: true,
          evented: true,
        });
        canvas.add(oImg);
        canvas.renderAll();
      },
      {
        crossOrigin: "anonymous",
        id: `sticker-${getRandomNumber(100000, 999999999)}`,
        imageLink: imageURL,
        isClosed: false,
        eventName: "",
        eventDescription: "",
      }
    );
  };
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    setLayers(layers.filter((layer) => layer.id !== layerId));
  };

  const handleNewLayerAddClick = () => {
    setLayers([
      ...layers,
      {
        id: layers.length + 1,
        selectedColor: "#4B4B4B",
        tappableContent: null,
        selectedImage: null,
      },
    ]);
  };

  const toggleView = () => {
    console.log("toggle swiper");
    setIsSwiperView(!isSwiperView);
  };
  const handletapbale = () => {
    setIsTappableVisible(true);
  };
  return (
    isVisible && (
      // mazi original layer
      // <div className="fixed bottom-20 w-full left-0 ">
      //   {isTapActionOpen && <TapAction imageUrl={selectedImage} />}
      //   <header className="flex items-center justify-between bg-[#00000047]">
      //     <h2 className="text-lg text-white px-2">Layers</h2>
      //     <button className="text-white" onClick={handleLayerAddClick}>
      //       <FaPlus />
      //     </button>
      //     <img src={search} alt="search" className="w-5 mr-2 h-5" />
      //     <img
      //       src={arrowspointingout}
      //       alt="arrowspointingout"
      //       className="w-5 h-5 mr-2"
      //     />
      //   </header>
      //   <div className="bg-gray-800 text-white opacity-500 p-2 ">
      //     <div className="flex flex-col space-y-1 m-3 ">
      //       <div className="flex items-center h-9 justify-between p-2 bg-gray-700 rounded">
      //         <h3 className="text-sm">Layer 01</h3>
      //         <div className="flex h-8 bg-[#4B4B4B]">
      //           <button onClick={() => setLayerIsClicked(!layerIsClicked)}>
      //             <img src={eye} className="items-center -mt-1 h-6 w-6" />
      //           </button>{" "}
      //           <button onClick={handleLayerAddClick}>
      //             <img src={pin} className="items-center -mt-1 h-6 w-6" />
      //           </button>
      //           <button onClick={handleLayerAddClick}>
      //             <img src={deletee} className="items-center -mt-1 h-6 w-6" />
      //           </button>
      //           <button onClick={handleLayerAddClick}>
      //             <img
      //               src={colorcircle}
      //               className="items-center -mt-1 h-6 w-6"
      //             />
      //           </button>
      //           {colorPanelVisible && (
      //             <ColorPanel onSelectColor={handleColorSelect} />
      //           )}
      //           {/* <button>
      //              <img src={hamburger} className="items-center -mt-1 h-6 w-6" />
      //            </button> */}
      //         </div>
      //       </div>
      //       <div className="grid grid-cols-3 gap-2">
      //         <div className="flex flex-col items-center justify-center bg-gray-700 rounded p-4">
      //           <label htmlFor="fileInput1">
      //             {tappableContent ? (
      //               typeof tappableContent === "string" &&
      //               tappableContent.startsWith("data:image") ? (
      //                 <img
      //                   src={tappableContent}
      //                   alt="Tappable Content"
      //                   className="cursor-pointer w-[120px] h-[120px] rounded-md object-contain"
      //                 />
      //               ) : (
      //                 <span className="cursor-pointer w-[120px] h-[120px] rounded-md flex items-center justify-center text-6xl">
      //                   {tappableContent}
      //                 </span>
      //               )
      //             ) : (
      //               <img
      //                 src={selectedImage || tappable}
      //                 alt="Tappable"
      //                 className="cursor-pointer w-[120px] h-[120px] rounded-md"
      //               />
      //             )}
      //           </label>
      //           <input
      //             type="file"
      //             accept="image/*"
      //             id="fileInput1"
      //             style={{ display: "none" }}
      //             onChange={handleImageUpload}
      //           />
      //         </div>
      //         <button
      //           className="flex flex-col items-center justify-center bg-gray-700 rounded"
      //           onClick={handleTapAction}
      //         >
      //           <img src={AddAction} alt="Add Actions" />
      //         </button>
      //         <button className="flex flex-col items-center justify-center bg-gray-700 rounded">
      //           <img src={AddContent} alt="Add Content" />
      //         </button>
      //       </div>
      //     </div>
      //   </div>
      // </div>

      <div className="fixed bottom-20 w-full left-0">
        {isTapActionOpen && <TapAction imageUrl={selectedImage} />}
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
              {layers.map((layer) => (
                <SwiperSlide key={layer.id}>
                  <div className="relative flex flex-col space-y-1 ">
                    <div
                      className="flex items-center h-9 justify-between p-2"
                      style={{
                        backgroundColor: layer.selectedColor,
                        borderRadius: "0.25rem",
                      }}
                    >
                      <h3 className="text-sm">Layer {layer.id}</h3>
                      <div
                        className="flex h-8"
                        style={{ backgroundColor: "#4B4B4B" }}
                      >
                        <button
                          onClick={() => setLayerIsClicked(!layerIsClicked)}
                        >
                          <img
                            src={eye}
                            className="items-center -mt-1 h-6 w-6"
                          />
                        </button>
                        <button onClick={handleNewLayerAddClick}>
                          <img
                            src={pin}
                            className="items-center -mt-1 h-6 w-6"
                          />
                        </button>
                        <button
                          onClick={() => handleLayerDeleteClick(layer.id)}
                        >
                          <img
                            src={deletee}
                            className="items-center -mt-1 h-6 w-6"
                          />
                        </button>
                        <button
                          onClick={() => handleColorCircleClick(layer.id)}
                        >
                          <img
                            src={colorcircle}
                            className="items-center -mt-1 h-6 w-6"
                          />
                        </button>
                      </div>
                    </div>
                    {colorPanelVisible && currentLayerId === layer.id && (
                      <ColorPanel onSelectColor={handleColorSelect} />
                    )}
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
                          {layer.tappableContent ? (
                            typeof layer.tappableContent === "string" &&
                            layer.tappableContent.startsWith("data:image") ? (
                              <img
                                src={layer.tappableContent}
                                alt="Tappable Content"
                                className="cursor-pointer w-[120px] h-[120px] rounded-md object-contain"
                              />
                            ) : (
                              <span className="cursor-pointer w-[120px] h-[120px] rounded-md flex items-center justify-center text-6xl">
                                {layer.tappableContent}
                              </span>
                            )
                          ) : (
                            <img
                              src={layer.selectedImage || tappable}
                              // src={tappable}
                              alt="Tappable"
                              className="cursor-pointer w-[120px] h-[120px] rounded-md"
                              // onClick={handletapbale}
                            />
                          )}
                          {/* {isTappableVisible && <NewTappable />} */}
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
                      >
                        <img src={AddContent} alt="Add Content" />
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex flex-col space-y-1 m-3 max-h-[80vh] overflow-y-auto">
              {layers.map((layer) => (
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
                    <div
                      className="flex h-8"
                      style={{ backgroundColor: "#4B4B4B" }}
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
                      <button onClick={() => handleColorCircleClick(layer.id)}>
                        <img
                          src={colorcircle}
                          className="items-center -mt-1 h-6 w-6"
                        />
                      </button>
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
                        {layer.tappableContent ? (
                          typeof layer.tappableContent === "string" &&
                          layer.tappableContent.startsWith("data:image") ? (
                            <img
                              src={layer.tappableContent}
                              alt="Tappable Content"
                              className="cursor-pointer w-[120px] h-[120px] rounded-md object-contain"
                            />
                          ) : (
                            <span className="cursor-pointer w-[120px] h-[120px] rounded-md flex items-center justify-center text-6xl">
                              {layer.tappableContent}
                            </span>
                          )
                        ) : (
                          <img
                            src={layer.selectedImage || tappable}
                            // src={tappable}
                            alt="Tappable"
                            className="cursor-pointer w-[120px] h-[120px] rounded-md"
                            // onClick={handletapbale}
                          />
                        )}
                        {/* {isTappableVisible && <NewTappable />} */}
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
