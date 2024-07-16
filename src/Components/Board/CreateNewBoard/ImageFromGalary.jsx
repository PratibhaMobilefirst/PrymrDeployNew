import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Cropper from "react-easy-crop";
import handleBack from "../../../assets/handleBack.svg";
import BoardBuilderText from "../../../assets/BoardBuilderText.svg";
import yellowpluscircle from "../../../assets/yellowpluscircle.svg";
import changeBg from "../../../assets/changeBg.png";
import questionmarkcircle from "../../../assets/questionmarkcircle.svg";
import { LuRectangleVertical, LuRectangleHorizontal } from "react-icons/lu";
import deletee from "../../../assets/redDelete.svg";
import fullScreen from "../../../assets/fullScreen.svg";
import getCroppedImg from "./CroppedImage";
import "./create.css";
import { baseURL } from "../../../Constants/urls";
import { object } from "superstruct";
import { FiFolderPlus } from "react-icons/fi";

const ImageFromGalary = () => {
  const location = useLocation();
  const { imagefromGalary, imageUrl } = location.state || {};
  const navigate = useNavigate();
  const imgGalaryRef = useRef();

  const [isVerticalSelected, setIsVerticalSelected] = useState(false);
  const [isHorizontalSelected, setIsHorizontalSelected] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [croppedImage, setCroppedImage] = useState(null);
  const [imageFromChangeBG, setImageFromChangeBG] = useState(null);
  const [file, setFile] = useState(null);

  const [isDesktopView, setIsDesktopView] = useState(false);

  const handleSaveDesktopView = () => {
    setIsDesktopView(true);
  };
  const handleBackFunction = () => {
    navigate("/create-new-board");
  };

  // const handleVerticalClick = () => {
  //     setShowCropper('portrait');
  //     setIsVerticalSelected(!isVerticalSelected);
  //     setIsHorizontalSelected(false);
  // };

  // const handleHorizontalClick = () => {
  //     setShowCropper('landscape');
  //     setIsHorizontalSelected(!isHorizontalSelected);
  //     setIsVerticalSelected(false);
  // };

  const handleDelete = () => {
    alert("Delete Content?");
    navigate("/create-new-board");
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log("Cropped area:", croppedArea);
    console.log("Cropped area pixels:", croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImageUrl = await getCroppedImg(
        imagefromGalary,
        croppedAreaPixels
      );
      setCroppedImage(croppedImageUrl);
      const encodedUrl = encodeURIComponent(croppedImageUrl);
      navigate("/board-builder-edit-board", {
        state: { imageUrl },
      });
    } catch (e) {
      console.error(e);
      navigate("/board-builder-edit-board", {
        state: { imagefromGalary, imageUrl },
      });
    }
  };

  //     const file = event.target.files[0];
  //     if (file) {
  //         const reader = new FileReader();
  //         reader.onloadend = () => {
  //             setImageFromChangeBG(reader.result);
  //         };
  //         reader.readAsDataURL(file);
  //     }
  // };

  const handleChangeBackground = async (event) => {
    console.log("handleChangeBackground clicked");

    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageDataUrl = reader.result;
        setImageFromChangeBG(imageDataUrl);

        // setSelectedImage(imageDataUrl);

        const formData = new FormData();
        formData.append("file", file);

        const storedToken = localStorage.getItem("token");

        try {
          const response = await fetch(`${baseURL}/file-upload/uploadFile`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
            body: formData,
          });

          if (response.ok) {
            const result = await response.json();
            const imageUrl = result.data.url;

            // Update the image URL after successful upload
            setImageFromChangeBG(imageUrl);

            // setSelectedImage(imageUrl);
            navigate("/create-new-board-galary", {
              state: { imageFromChangeBG: imageDataUrl, imageUrl },
            });

            console.log("imageFromChangeBG", imageUrl);
          } else {
            console.error(
              "Failed to upload file",
              response.status,
              response.statusText
            );
          }
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (file) {
      handleChangeBackground(file);
    }
  }, [file]);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const imgStyle = {
    width: "100%",
    height: "100%",
    // objectFit: 'cover'
    objectFit: "contain",
    // objectFit: 'content'
  };

  // useEffect(() => {
  //     if (showPreview) {
  //         console.log("previw cha useeffect");
  //         const timer = setTimeout(() => {
  //             setShowPreview(false);
  //         }, 10000);
  //         return () => clearTimeout(timer);
  //     }
  // }, [showPreview]);
  return (
    <div className="container sm:pl-4">
      <div className="flex items-center h-[15vh] w-full">
        <button className="flex w-auto h-auto" onClick={handleBackFunction}>
          <img src={handleBack} alt="Back" className="text-3xl border-white" />
        </button>
        <h1 className=" font-bold text-xl text-white ">BoardBuilder</h1>
        {/* <div className="flex items-end justify-between ml-auto">
          <img
            src={BoardBuilderText}
            alt="Board Builder Text"
            className="m-1 p-2 h-auto -pt-2 w-auto ml-auto"
          />
        </div> */}
      </div>

      {/* <div className="flex border-white w-auto">
        <button className="text-[#FFF500] flex font-bold text-xl">
          <img
            src={yellowpluscircle}
            alt="Yellow Plus Circle"
            className="mr-2 w-5 h-5"
          />
          <span>NEW</span>
        </button>
        <h1 className="text-[#757575] text-nowrap py-2 pr-2">
          Board view Entry point
        </h1>
        <img
          src={questionmarkcircle}
          alt="Question Mark Circle"
          className="pr-2"
        />
      </div> */}

      <div className="pl-[30px] flex items-center justify-center">
        <div className="border-2 border-dashed border-[#f5f4f4] rounded-[30px] h-[60vh] w-[70vw]">
          {imageFromChangeBG ? (
            <TransformWrapper>
              <TransformComponent
                wrapperStyle={{ width: "100%", height: "100%" }}
                contentStyle={{ width: "100%", height: "100%" }}
              >
                <img
                  ref={imgGalaryRef}
                  src={imageFromChangeBG}
                  alt="Selected"
                  style={imgStyle}
                />
              </TransformComponent>
            </TransformWrapper>
          ) : (
            imagefromGalary && (
              <TransformWrapper>
                <TransformComponent
                  wrapperStyle={{ width: "100%", height: "100%" }}
                  contentStyle={{ width: "100%", height: "100%" }}
                >
                  <img
                    ref={imgGalaryRef}
                    src={imagefromGalary}
                    alt="Selected"
                    style={imgStyle}
                  />
                </TransformComponent>
              </TransformWrapper>
            )
          )}

          {/* {showCropper && (
                        <Cropper
                            image={imagefromGalary}
                            crop={crop}
                            zoom={zoom}
                            aspect={isVerticalSelected ? 9 / 16 : 16 / 9}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                            style={{
                                containerStyle: {
                                    height: '38vh',
                                    width: '50vw',
                                    top: '155px',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    display: 'block',
                                },
                                cropAreaStyle: {
                                    width: '100%',
                                    height: '100%'
                                }
                            }}
                        />
                    )} */}

          {/* {isDesktopView ? (
            <div className="w-full h-64 bg-gray-700 rounded-lg">
              <img
                src="https://i.stack.imgur.com/Y7V8c.jpg"
                alt="Desktop View"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="w-full h-64 bg-gray-700 rounded-lg">
              <img
                src="https://i.stack.imgur.com/Y7V8c.jpg"
                alt="Mobile View"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )} */}
        </div>
      </div>

      <div className="flex justify-center items-center h-full">
        <div className="container flex items-center justify-between py-5 sm:py-3 text-[#8B8B8B] w-full gap-x-20">
          {/* <span className="flex mx-auto bg-[#313131] rounded-xl w-[20vw] h-[12vh] gap-2 p-2 px-3">
                        <LuRectangleVertical
                            className={`cursor-pointer w-[10vw] h-[10vh] ${isVerticalSelected ? 'text-yellow-500' : 'text-white'}`}
                            onClick={handleVerticalClick}
                        />
                        <LuRectangleHorizontal
                            className={`cursor-pointer w-[10vw] h-[10vh] ${isHorizontalSelected ? 'text-yellow-500' : 'text-white'}`}
                            onClick={handleHorizontalClick}
                        />
                    </span> */}
          {/* {/ <img src={fullScreen} alt="Full Screen" className="sm:pr-2 pr-3" onClick={() => setShowPreview(!showPreview)} /> /} */}
          <label htmlFor="fileInput1" className="m-3 flex justify-center pl-4">
            <div className="flex items-center w-auto px-3 text-white bg-[#363636] p-2 gap-2 rounded">
              <img
                src={changeBg}
                alt="Change Background Icon"
                className="h-5 w-5  text-wrap "
              />
              <span>Change Background</span>
              <input
                type="file"
                accept="image/*"
                id="fileInput1"
                className="hidden"
                onChange={handleChangeBackground}
              />{" "}
            </div>
          </label>

          <img
            src={deletee}
            alt="Delete"
            className="right-2 w-56 h-10 bg-black text-white bg-transparent px-4 py-2 rounded-full"
            onClick={handleDelete}
          />
        </div>
      </div>

      <div className="bg-black py-5 h-[10vh] w-full mt-[1vh] flex items-center justify-center">
        <div
          className="bg-[#0085FF] h-10 flex items-center justify-center text-black w-full max-w-xs sm:w-50 sm:bottom-0 md:max-w-sm lg:max-w-md xl:max-w-lg rounded-full font-bold px-4 cursor-pointer"
          onClick={showCroppedImage}
        >
          Save Mobile View
        </div>
      </div>
    </div>
  );
};

export default ImageFromGalary;
