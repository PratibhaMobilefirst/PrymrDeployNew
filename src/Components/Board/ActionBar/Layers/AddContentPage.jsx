import React, { useState, useRef, useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import checkCircleWhite from "../../../../assets/checkCircleWhite.png";
import redDelete from "../../../../assets/redDelete.svg";
import hamburger from "../../../../assets/hamburger.svg";
import "./layers.css";
import ColorPanel from "./ColorPannel";
import { baseURL } from "../../../../Constants/urls";
import { useToastManager } from "../../../Context/ToastContext";

const AddContentPage = () => {
  const toast = useToastManager();
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { layer } = location.state || {};
  const fileInputRef = useRef(null);
  const [colorPanelVisible, setColorPanelVisible] = useState(false);
  const [currentLayerId, setCurrentLayerId] = useState(null);
  const [isForSale, setIsForSale] = useState(false);
  const [isPhysical, setIsPhysical] = useState(false);
  const [value, setValue] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [actionName, setActionName] = useState("");
  const [errors, setErrors] = useState({});
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const boardImageId = sessionStorage.getItem("boardImageId");
  const [tappableData, setTappableData] = useState(null);
  const [assetType, setAssetType] = useState("");
  const [fetchedTappableInfo, setFetchedTappableInfo] = useState(null);
  const [images, setImages] = useState([]);
  const [layers, setLayers] = useState([
    {
      id: 1,
      name: layer?.name,
      selectedColor: "#4B4B4B",
      tappableContent: null,
      selectedImage: null,
    },
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [layerName, setLayerName] = useState("");
  const [imageId, setImageId] = useState("");
  const [top, setTop] = useState("");
  const [left, setLeft] = useState("");
  const [showAssetType, setShowAssetType] = useState(false);
  const [activeTappable, setActiveTappable] = useState(null);

  useEffect(() => {
    // Retrieve activeLayerId from sessionStorage
    const storedLayerId = sessionStorage.getItem("activeLayerId");
    if (storedLayerId) {
      setCurrentLayerId(storedLayerId); // Update state with the retrieved layer ID
      console.log("Retrieved activeLayerId:", storedLayerId);
      // Log the active layer ID
    } else {
      console.log("No activeLayerId found in session storage.");
    }
  }, []);

  useEffect(() => {
    const storedTappableData = sessionStorage.getItem("tappableData");
    if (storedTappableData) {
      const parsedData = JSON.parse(storedTappableData);
      setTappableData(parsedData);
      const activeTappable = parsedData.find(
        (tappable) => tappable.tappableId === currentLayerId // Use currentLayerId instead of activeLayerId
      );

      if (activeTappable) {
        setActiveTappable(activeTappable);
        console.log("Retrieved tappable data:", activeTappable);
        console.log("Tappable ID:", activeTappable.tappableId);
        console.log("Left position:", activeTappable.left);
        console.log("Top position:", activeTappable.top);
        console.log("Image ID:", activeTappable.imageId);
        console.log("Points:", activeTappable.points);
      } else {
        console.log("No active tappable found for the selected layer.");
      }
    }
  }, [currentLayerId]);

  const handleSave = async () => {
    if (isSaving || !activeTappable) return;

    setIsSaving(true);
    try {
      const storedToken = localStorage.getItem("token");
      const tappableImage =
        uploadedImageUrls.length > 0 ? uploadedImageUrls[0] : null;

      // const tappableImage =
      //   // layer?.tappableContent ||
      //   uploadedImageUrls.length > 0 || null;

      const payload = {
        addContentImagesLinks: uploadedImageUrls,
        tappableImage: tappableImage,
        title: title,
        description: description,
        layerName: layer.name,
        isSaleItem: isForSale,
        price: isForSale ? parseInt(value) : undefined,
        assetType: isPhysical ? "physical" : "digital" || null,
        imageId: activeTappable.imageId,
        top: activeTappable?.top?.toString(),
        left: activeTappable?.left?.toString(),
        actionName: "open info overlay",
        tappableId: activeTappable?.tappableId,
      };

      console.log("Payload before sending:", payload);

      Object.keys(payload).forEach(
        (key) => payload[key] === undefined && delete payload[key]
      );

      const response = await fetch(`${baseURL}/board/createTappable`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Tappable created:", result);
        toast("Tappable created");
        navigate("/board-builder-edit-board");
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        setErrors(
          errorData.errors.reduce(
            (acc, err) => ({ ...acc, [err.property]: err.message }),
            {}
          )
        );
        toast("Failed to create tappable");
      }
    } catch (error) {
      console.error("Error creating tappable:", error);
      toast("Error creating tappable");
    }
  };

  useEffect(() => {
    const fetchTappableInfo = async () => {
      const storedToken = localStorage.getItem("token");
      const boardImageId = sessionStorage.getItem("boardImageId");
      const tappableId = tappableData?.tappableId;
      console.log("tappableId 76 : ", boardImageId);
      if (!boardImageId || !tappableId) {
        console.log("BoardImageId or TappableId not available");
        return;
      }
      const testingURL = `${baseURL}/board/fetchEditTappableInfo?tappableId=${tappableId}`;
      console.log("testingURL", testingURL);
      try {
        const response = await fetch(
          `${baseURL}/board/fetchEditTappableInfo?boardImageId=${boardImageId}&tappableId=${tappableId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Data : ", data);
          setFetchedTappableInfo(data);
          // Update other state variables with fetched data
          setTitle(data.title || "");
          setDescription(data.description || "");
          setIsForSale(data.isSaleItem || false);
          setValue(data.price ? data.price.toString() : "");
          setIsPhysical(data.assetType === "physical");
          setUploadedImageUrls(data.addContentImagesLinks || []);
          // Update other relevant state variables as needed
        } else {
          console.error("Failed to fetch tappable info");
        }
      } catch (error) {
        console.error("Error fetching tappable info:", error);
      }
    };

    fetchTappableInfo();
  }, [tappableData]);

  //upload the layere.tappbleContent since it comes form layers in imagebase64
  const uploadTappableContent = async (base64Content) => {
    const storedToken = localStorage.getItem("token");
    const formData = new FormData();

    // Convert base64 to blob
    const byteCharacters = atob(base64Content.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpeg" });

    formData.append("file", blob, "tappable_content.jpg");

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
        if (result.status && result.data && result.data.url) {
          return result.data.url;
        } else {
          console.error("Unexpected response structure:", result);
          return null;
        }
      } else {
        console.error(
          "Failed to upload tappable content",
          response.status,
          response.statusText
        );
        return null;
      }
    } catch (error) {
      console.error("Error uploading tappable content:", error);
      return null;
    }
  };

  useEffect(() => {
    const uploadInitialContent = async () => {
      if (layer?.tappableContent) {
        const uploadedUrl = await uploadTappableContent(layer.tappableContent);
        if (uploadedUrl) {
          setImages([{ id: "tappable", url: uploadedUrl }]);
          setUploadedImageUrls([uploadedUrl]);
        } else {
          console.error("Failed to upload initial tappable content");
        }
      }
    };

    uploadInitialContent();
  }, [layer]);

  const handleImageChange = async (event) => {
    event.preventDefault();
    let files = event.target.files;
    let newImages = [];
    let uploadedUrls = [];

    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      let file = files[i];

      reader.onloadend = async () => {
        const imageUrl = reader.result;
        newImages.push({ id: new Date().getTime() + i, url: imageUrl });

        if (newImages.length === files.length) {
          const updatedImages = [...images, ...newImages];
          setImages(updatedImages);

          // Upload the new images immediately
          uploadedUrls = await uploadImages(newImages);
          setUploadedImageUrls([...uploadedImageUrls, ...uploadedUrls]);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const validateAndSave = async () => {
    if (isSaving) return;
    if (!boardImageId) {
      toast("Board image ID is missing");
      return;
    }

    // Check if there are images to upload
    if (uploadedImageUrls.length === 0 && images.length > 0) {
      toast("Uploading images, please wait...");
      // Wait for all images to be uploaded before proceeding
      const urls = await uploadImages(images);
      setUploadedImageUrls(urls);
    }

    handleSave();
  };

  const handleClickChangeContent = () => {
    fileInputRef.current.click();
  };
  useEffect(() => {
    if (layer?.tappableContent) {
      setImages([{ id: "tappable", url: layer.tappableContent }]);
      setUploadedImageUrls([layer.tappableContent]);
    }
  }, [layer]);

  // const handleImageChange = async (event) => {
  //   event.preventDefault();

  //   let files = event.target.files;
  //   let newImages = [];

  //   for (let i = 0; i < files.length; i++) {
  //     let reader = new FileReader();
  //     let file = files[i];

  //     reader.onloadend = async () => {
  //       const imageUrl = reader.result;
  //       newImages.push({ id: new Date().getTime() + i, url: imageUrl });

  //       if (newImages.length === files.length) {
  //         const updatedImages = [...images, ...newImages];
  //         setImages(updatedImages);

  //         // Upload the new images
  //         const uploadedUrls = await uploadImages(newImages);
  //         setUploadedImageUrls([...uploadedImageUrls, ...uploadedUrls]);
  //       }
  //     };

  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleBack = () => {
    navigate("/board-builder-edit-board");
  };

  const handleImageDelete = async (index) => {
    if (images.length > 1) {
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);

      const newUploadedImageUrls = uploadedImageUrls.filter(
        (_, i) => i !== index
      );
      setUploadedImageUrls(newUploadedImageUrls);
    }
  };

  //uploading image from carocel
  const uploadImages = async (imagesToUpload) => {
    const storedToken = localStorage.getItem("token");
    const uploadedUrls = [];

    for (const image of imagesToUpload) {
      const formData = new FormData();

      if (image.url.startsWith("http")) {
        const response = await fetch(image.url);
        const blob = await response.blob();
        formData.append("file", blob, "image.jpg");
      } else {
        const response = await fetch(image.url);
        const blob = await response.blob();
        formData.append("file", blob, "image.jpg");
      }

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
          if (result.status && result.data && result.data.url) {
            uploadedUrls.push(result.data.url);
            console.log("Uploaded URL:", result.data.url);
          } else {
            console.error("Unexpected response structure:", result);
          }
        } else {
          console.error(
            "Failed to upload image",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    setUploadedImageUrls(uploadedUrls);
    return uploadedUrls;
  };

  const handleToggle = () => {
    setIsForSale(!isForSale);
    setShowAssetType(!isForSale);
    setActionName(isForSale ? "no" : "yes");
  };

  const handleTypeToggle = (type) => {
    setIsPhysical(type === "Physical");
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const regex = /^[\d.,₹$€¥£]*$/;
    if (regex.test(value)) {
      setValue(value);
    }
  };
  const totalImageCount =
    (layer?.tappableContent ? 1 : 0) + selectedImages.length;

  return (
    <>
      {/* <div className="flex no-select w-full max-w-[430px]  flex-col p-2 space-y-2">

      </div> */}
      <div className="w-full md:w-[30%] no-select h-auto relative bg-[#151515] backdrop-blur-md p-2 space-y-2">
        {layers?.map((layer) => (
          <div
            key={layer.id}
            className="flex items-center justify-between p-2 mx-4"
            style={{
              backgroundColor: layer.selectedColor,
              borderRadius: "0.25rem",
            }}
          >
            <span
              className="text-sm text-white w-full cursor-pointer"
              onClick={() => setCurrentLayerId(layer.id)}
            >
              {layer.name}
            </span>
            <button
              className="text-sm text-white py-1 rounded text-right"
              onClick={() => handleBack(layer.id)}
            >
              Back
            </button>
          </div>
        ))}
        <div className="w-full flex justify-center ">
          <div className="w-11/12 h-[400px] relative bg-white/80">
            <input
              type="file"
              accept="image/*"
              id="fileInput1"
              className="hidden"
              onChange={handleImageChange}
              ref={fileInputRef}
              multiple
            />

            <div className="carousel-container place-content-center">
              <Carousel
                showThumbs={false}
                infiniteLoop
                useKeyboardArrows
                swipeable
                emulateTouch
                showStatus={false}
                showIndicators={true}
                showArrows={true}
                className="custom-carousel"
              >
                {images.map((image, index) => (
                  <div key={image.id} className="slide">
                    <img src={image.url} alt={`Image ${index + 1}`} />
                    {images.length > 1 && (
                      <div
                        className="absolute top-2 right-2 cursor-pointer z-50 object-contain"
                        //  className="max-w-full max-h-full object-contain"
                        onClick={() => handleImageDelete(index)}
                      >
                        <img
                          src={redDelete}
                          alt="Delete Icon"
                          className="h-6 w-6"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </Carousel>
              <div className="add-content-btn">
                <button
                  className="bg-black/50 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                  onClick={() => fileInputRef.current.click()}
                >
                  <img
                    src={hamburger}
                    alt="Hamburger Icon"
                    className="w-4 h-4"
                  />
                  <span>Add / Change Content</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center py-4">
          <div className="w-11/12 flex flex-col items-start space-y-4">
            <div className="flex justify-between w-full">
              <span className="text-white text-xl font-semibold">
                Make Item for sale
              </span>
              <div className="flex items-center space-x-2">
                <span
                  className={`text-white ${!isForSale ? "" : "text-gray-400"}`}
                >
                  No
                </span>
                <div
                  className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                    isForSale ? "bg-blue-500" : "bg-gray-400"
                  }`}
                  onClick={handleToggle}
                >
                  <div
                    className={`h-5 w-5 bg-white rounded-full shadow-md transform duration-300 ${
                      isForSale ? "translate-x-6" : ""
                    }`}
                  ></div>
                </div>
                <span
                  className={`text-white ${isForSale ? "" : "text-gray-400"}`}
                >
                  Yes
                </span>
              </div>
            </div>

            {isForSale && (
              <div className="self-stretch flex-col justify-start items-center gap-3.5 flex">
                <div className="w-full">
                  <div className=" text-[#bfbfbf] text-base font-medium font-['Nunito']">
                    What type of asset is this?
                  </div>
                </div>
                <div className="justify-start items-start gap-[19px] inline-flex">
                  <div className="h-[50.44px] pt-[11.72px] pb-[11.72px] bg-[#202324] rounded-[46.88px] border-2 border-[#383a3b] justify-center items-center gap-[11.72px] flex">
                    <button
                      className={`text-white text-xl font-semibold font-['Nunito'] capitalize tracking-tight ${
                        isPhysical
                          ? "bg-[#0084ff] text-white rounded-[46.88px]"
                          : " text-white rounded-[46.88px]"
                      }`}
                      onClick={() => handleTypeToggle("Physical")}
                    >
                      Physical
                    </button>
                  </div>
                  <div className="w-[22px] h-[50px] justify-center items-center gap-2.5 flex">
                    <div className="text-[#808080] text-base font-semibold font-['Nunito'] tracking-tight">
                      or
                    </div>
                  </div>
                  <div className="h-[50.44px] pt-[11.72px] pb-[11.72px] bg-[#202324] rounded-[46.88px] border-2 border-[#383a3b] justify-center items-center gap-[11.72px] flex">
                    <button
                      className={`text-white text-xl font-semibold font-['Nunito'] capitalize tracking-tight ${
                        !isPhysical
                          ? "bg-[#0084ff] text-white  rounded-[46.88px] "
                          : " text-white  rounded-[46.88px] "
                      }`}
                      onClick={() => handleTypeToggle("Digital")}
                    >
                      Digital
                    </button>
                  </div>
                </div>
                <div className="flex-col justify-start items-start w-full flex">
                  <div className="w-full">
                    <label className="text-gray-400 text-sm">Price</label>
                    <input
                      type="text"
                      value={value}
                      onChange={handleChange}
                      className="w-full p-2 bg-gray-800 text-white rounded-md"
                      placeholder="$000.00"
                    />
                    {errors.price && (
                      <div className="text-red-500">{errors.price}</div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="w-full">
              <label className="text-gray-400 text-sm">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 bg-gray-800 text-white rounded-md"
              />
            </div>
            <div className="w-full">
              <label className="text-gray-400 text-sm">Description</label>
              <textarea
                style={{ minHeight: "70px" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 bg-gray-800 text-white rounded-md h-32"
              />
            </div>
            <button
              className="w-full py-3 bg-blue-500 text-white text-center rounded-md"
              onClick={validateAndSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save the board"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddContentPage;



// import React, { useState, useRef, useEffect } from "react";
// import { AiOutlineArrowLeft } from "react-icons/ai";
// import { useNavigate, useLocation } from "react-router";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import checkCircleWhite from "../../../../assets/checkCircleWhite.png";
// import redDelete from "../../../../assets/redDelete.svg";
// import hamburger from "../../../../assets/hamburger.svg";
// import "./layers.css";
// import ColorPanel from "./ColorPannel";
// import { baseURL } from "../../../../Constants/urls";
// import { useToastManager } from "../../../Context/ToastContext";

// const AddContentPage = () => {
//   const toast = useToastManager();
//   const [selectedImages, setSelectedImages] = useState([]);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { layer } = location.state || {};
//   const fileInputRef = useRef(null);
//   const [colorPanelVisible, setColorPanelVisible] = useState(false);
//   const [currentLayerId, setCurrentLayerId] = useState(null);
//   const [isForSale, setIsForSale] = useState(false);
//   const [isPhysical, setIsPhysical] = useState(false);
//   const [value, setValue] = useState("");
//   const [isInputVisible, setIsInputVisible] = useState(false);
//   const [actionName, setActionName] = useState("");
//   const [errors, setErrors] = useState({});
//   const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
//   const boardImageId = sessionStorage.getItem("boardImageId");
//   const [tappableData, setTappableData] = useState(null);
//   const [assetType, setAssetType] = useState("");
//   const [fetchedTappableInfo, setFetchedTappableInfo] = useState(null);
//   const [layers, setLayers] = useState([
//     {
//       id: 1,
//       name: layer?.name,
//       selectedColor: "#4B4B4B",
//       tappableContent: null,
//       selectedImage: null,
//     },
//   ]);

//   const [isSaving, setIsSaving] = useState(false);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [layerName, setLayerName] = useState("");
//   const [imageId, setImageId] = useState("");
//   const [top, setTop] = useState("");
//   const [left, setLeft] = useState("");
//   const [showAssetType, setShowAssetType] = useState(false);
//   const [activeTappable, setActiveTappable] = useState(null);

//   console.log("activeLayerId");
//   useEffect(() => {
//     // Retrieve activeLayerId from sessionStorage
//     const storedLayerId = sessionStorage.getItem("activeLayerId");
//     if (storedLayerId) {
//       setCurrentLayerId(storedLayerId); // Update state with the retrieved layer ID
//       console.log("Retrieved activeLayerId:", storedLayerId);
//       // Log the active layer ID
//     } else {
//       console.log("No activeLayerId found in session storage.");
//     }
//   }, []);

//   useEffect(() => {
//     const storedTappableData = sessionStorage.getItem("tappableData");
//     if (storedTappableData) {
//       const parsedData = JSON.parse(storedTappableData);
//       setTappableData(parsedData);
//       const activeTappable = parsedData.find(
//         (tappable) => tappable.tappableId === currentLayerId // Use currentLayerId instead of activeLayerId
//       );

//       if (activeTappable) {
//         setActiveTappable(activeTappable);
//         console.log("Retrieved tappable data:", activeTappable);
//         console.log("Tappable ID:", activeTappable.tappableId);
//         console.log("Left position:", activeTappable.left);
//         console.log("Top position:", activeTappable.top);
//         console.log("Image ID:", activeTappable.imageId);
//         console.log("Points:", activeTappable.points);
//       } else {
//         console.log("No active tappable found for the selected layer.");
//       }
//     }
//   }, [currentLayerId]);

//   const handleSave = async () => {
//     if (isSaving || !activeTappable) return;

//     setIsSaving(true);
//     try {
//       const storedToken = localStorage.getItem("token");
//       const tappableImage =
//         uploadedImageUrls.length > 0 ? uploadedImageUrls[0] : null;

//       const payload = {
//         addContentImagesLinks: uploadedImageUrls,
//         tappableImage: tappableImage,
//         title: title,
//         description: description,
//         layerName: layer.name,
//         isSaleItem: isForSale,
//         price: isForSale ? parseInt(value) : undefined,
//         assetType: isPhysical ? "physical" : "digital" || null,
//         imageId: activeTappable.imageId,
//         top: activeTappable?.top?.toString(),
//         left: activeTappable?.left?.toString(),
//         actionName: "open info overlay",
//         tappableId: activeTappable?.tappableId,
//       };

//       console.log("Payload before sending:", payload);

//       Object.keys(payload).forEach(
//         (key) => payload[key] === undefined && delete payload[key]
//       );

//       const response = await fetch(`${baseURL}/board/createTappable`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${storedToken}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log("Tappable created:", result);
//         toast("Tappable created");
//         navigate("/board-builder-edit-board");
//       } else {
//         const errorData = await response.json();
//         console.error("Error response:", errorData);
//         setErrors(
//           errorData.errors.reduce(
//             (acc, err) => ({ ...acc, [err.property]: err.message }),
//             {}
//           )
//         );
//         toast("Failed to create tappable");
//       }
//     } catch (error) {
//       console.error("Error creating tappable:", error);
//       toast("Error creating tappable");
//     }
//   };

//   // useEffect(() => {
//   //   const storedTappableData = sessionStorage.getItem("tappableData");
//   //   if (storedTappableData) {
//   //     const parsedData = JSON.parse(storedTappableData);
//   //     setTappableData(parsedData);
//   //     console.log("Retrieved tappable data:", storedTappableData);
//   //   }
//   // }, []);

//   // useEffect(() => {
//   //   if (tappableData) {
//   //     console.log("Tappable ID:", tappableData.tappableId);
//   //     console.log("Left position:", tappableData.left, " 377.23661200944764");
//   //     console.log("Top position:", tappableData.top, " 503.9672070880269");
//   //     console.log("Image ID:", tappableData.imageId);
//   //     console.log("Points:", tappableData.points);
//   //   }
//   // }, [tappableData]);

//   useEffect(() => {
//     const fetchTappableInfo = async () => {
//       const storedToken = localStorage.getItem("token");
//       const boardImageId = sessionStorage.getItem("boardImageId");
//       const tappableId = tappableData?.tappableId;
//       console.log("tappableId 76 : ", boardImageId);
//       if (!boardImageId || !tappableId) {
//         console.log("BoardImageId or TappableId not available");
//         return;
//       }
//       const testingURL = `${baseURL}/board/fetchEditTappableInfo?tappableId=${tappableId}`;
//       console.log("testingURL", testingURL);
//       try {
//         const response = await fetch(
//           `${baseURL}/board/fetchEditTappableInfo?boardImageId=${boardImageId}&tappableId=${tappableId}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${storedToken}`,
//             },
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           console.log("Data : ", data);
//           setFetchedTappableInfo(data);
//           // Update other state variables with fetched data
//           setTitle(data.title || "");
//           setDescription(data.description || "");
//           setIsForSale(data.isSaleItem || false);
//           setValue(data.price ? data.price.toString() : "");
//           setIsPhysical(data.assetType === "physical");
//           setUploadedImageUrls(data.addContentImagesLinks || []);
//           // Update other relevant state variables as needed
//         } else {
//           console.error("Failed to fetch tappable info");
//         }
//       } catch (error) {
//         console.error("Error fetching tappable info:", error);
//       }
//     };

//     fetchTappableInfo();
//   }, [tappableData]);

//   // const handleSave = async () => {
//   //   if (isSaving) return;

//   //   setIsSaving(true);
//   //   try {
//   //     const storedToken = localStorage.getItem("token");
//   //     const tappableImage =
//   //       uploadedImageUrls.length > 0 ? uploadedImageUrls[0] : null;

//   //     const payload = {
//   //       addContentImagesLinks: uploadedImageUrls,
//   //       tappableImage: tappableImage,
//   //       title: title,
//   //       description: description,
//   //       layerName: layer.name,
//   //       isSaleItem: isForSale,
//   //       price: isForSale ? parseInt(value) : undefined,
//   //       assetType: isPhysical ? "physical" : "digital" || null,
//   //       imageId: tappableData.imageId,
//   //       top: tappableData?.top,
//   //       left: tappableData?.left,
//   //       actionName: "open info overlay",
//   //       tappableId: tappableData?.tappableId,
//   //     };

//   //     console.log("Payload before sending:", payload);

//   //     Object.keys(payload).forEach(
//   //       (key) => payload[key] === undefined && delete payload[key]
//   //     );

//   //     const response = await fetch(`${baseURL}/board/createTappable`, {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Authorization: `Bearer ${storedToken}`,
//   //       },
//   //       body: JSON.stringify(payload),
//   //     });

//   //     if (response.ok) {
//   //       const result = await response.json();
//   //       console.log("Tappable created:", result);
//   //       toast("Tappable created");
//   //       navigate("/board-builder-edit-board");
//   //     } else {
//   //       const errorData = await response.json();
//   //       console.error("Error response:", errorData);
//   //       setErrors(
//   //         errorData.errors.reduce(
//   //           (acc, err) => ({ ...acc, [err.property]: err.message }),
//   //           {}
//   //         )
//   //       );
//   //       toast("Failed to create tappable");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error creating tappable:", error);
//   //     toast("Error creating tappable");
//   //   }
//   // };

//   const validateAndSave = () => {
//     if (isSaving) return;
//     if (!boardImageId) {
//       toast("Board image ID is missing");
//       return;
//     }

//     if (uploadedImageUrls.length === 0) {
//       toast("Please upload at least one image");
//       return;
//     }

//     handleSave();
//   };
//   const handleClickChangeContent = () => {
//     fileInputRef.current.click();
//   };

//   const handleImageChange = async (event) => {
//     event.preventDefault();

//     let files = event.target.files;
//     let images = [];

//     for (let i = 0; i < files.length; i++) {
//       let reader = new FileReader();
//       let file = files[i];

//       reader.onloadend = async () => {
//         const imageUrl = reader.result;
//         images.push({ id: new Date().getTime() + i, url: imageUrl });

//         if (images.length === files.length) {
//           const newImages = [...selectedImages, ...images];
//           setSelectedImages(newImages);

//           // Upload the new images
//           const uploadedUrls = await uploadImages(newImages);
//           setUploadedImageUrls(uploadedUrls);
//         }
//       };

//       reader.readAsDataURL(file);
//     }
//   };
//   const handleBack = () => {
//     navigate("/board-builder-edit-board");
//   };
//   const handleImageDelete = async (index) => {
//     const newSelectedImages = selectedImages.filter((_, i) => i !== index);
//     setSelectedImages(newSelectedImages);

//     // Re-upload the remaining images
//     const uploadedUrls = await uploadImages(newSelectedImages);
//     setUploadedImageUrls(uploadedUrls);
//   };

//   const getAllImageUrls = () => {
//     const imageUrls = [];
//     if (layer?.tappableContent) {
//       imageUrls.push(layer.tappableContent);
//     }
//     selectedImages.forEach((image) => {
//       imageUrls.push(image.url);
//     });
//     return imageUrls;
//   };

//   const uploadImages = async (imagesToUpload) => {
//     const storedToken = localStorage.getItem("token");
//     const uploadedUrls = [];

//     for (const image of imagesToUpload) {
//       const formData = new FormData();

//       if (image.url.startsWith("http")) {
//         const response = await fetch(image.url);
//         const blob = await response.blob();
//         formData.append("file", blob, "image.jpg");
//       } else {
//         const response = await fetch(image.url);
//         const blob = await response.blob();
//         formData.append("file", blob, "image.jpg");
//       }

//       try {
//         const response = await fetch(`${baseURL}/file-upload/uploadFile`, {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${storedToken}`,
//           },
//           body: formData,
//         });

//         if (response.ok) {
//           const result = await response.json();
//           if (result.status && result.data && result.data.url) {
//             uploadedUrls.push(result.data.url);
//             console.log("Uploaded URL:", result.data.url);
//           } else {
//             console.error("Unexpected response structure:", result);
//           }
//         } else {
//           console.error(
//             "Failed to upload image",
//             response.status,
//             response.statusText
//           );
//         }
//       } catch (error) {
//         console.error("Error uploading image:", error);
//       }
//     }

//     setUploadedImageUrls(uploadedUrls);
//     return uploadedUrls;
//   };

//   const handleToggle = () => {
//     setIsForSale(!isForSale);
//     setShowAssetType(!isForSale);
//     setActionName(isForSale ? "no" : "yes");
//   };

//   const handleTypeToggle = (type) => {
//     setIsPhysical(type === "Physical");
//   };

//   const handleChange = (e) => {
//     const { value } = e.target;
//     const regex = /^[\d.,₹$€¥£]*$/;
//     if (regex.test(value)) {
//       setValue(value);
//     }
//   };

//   return (
//     <>
//       {/* <div className="flex no-select w-full max-w-[430px]  flex-col p-2 space-y-2">
        
//       </div> */}
//       <div className="w-full md:w-[30%] no-select h-auto relative bg-[#151515] backdrop-blur-md p-2 space-y-2">
//         {layers?.map((layer) => (
//           <div
//             key={layer.id}
//             className="flex items-center justify-between p-2 mx-4"
//             style={{
//               backgroundColor: layer.selectedColor,
//               borderRadius: "0.25rem",
//             }}
//           >
//             <span
//               className="text-sm text-white w-full cursor-pointer"
//               onClick={() => setCurrentLayerId(layer.id)}
//             >
//               {layer.name}
//             </span>
//             <button
//               className="text-sm text-white py-1 rounded text-right"
//               onClick={() => handleBack(layer.id)}
//             >
//               Back
//             </button>
//           </div>
//         ))}
//         <div className="w-full flex justify-center ">
//           <div className="w-11/12 h-[400px] relative bg-white/80">
//             <input
//               type="file"
//               accept="image/*"
//               id="fileInput1"
//               className="hidden"
//               onChange={handleImageChange}
//               ref={fileInputRef}
//               multiple
//             />
//             <div className="carousel-container">
//               <Carousel
//                 showThumbs={false}
//                 infiniteLoop
//                 useKeyboardArrows
//                 swipeable
//                 emulateTouch
//                 showStatus={false}
//                 showIndicators={true}
//                 showArrows={true}
//                 className="custom-carousel"
//               >
//                 {layer?.tappableContent && (
//                   <div className="slide">
//                     <img src={layer.tappableContent} alt="Tappable Content" />
//                     <div
//                       className="absolute top-2 right-2 cursor-pointer z-50"
//                       onClick={() => handleImageDelete(0)}
//                     >
//                       <img
//                         src={redDelete}
//                         alt="Delete Icon"
//                         className="h-6 w-6"
//                       />
//                     </div>
//                   </div>
//                 )}
//                 {selectedImages.map((image, index) => (
//                   <div key={image.id} className="slide">
//                     <img src={image.url} alt={`Selected ${index}`} />
//                     <div
//                       className="absolute top-2 right-2 cursor-pointer z-50"
//                       onClick={() => handleImageDelete(index)}
//                     >
//                       <img
//                         src={redDelete}
//                         alt="Delete Icon"
//                         className="h-6 w-6"
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </Carousel>
//               <div className="add-content-btn">
//                 <button
//                   className="bg-black/50 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
//                   onClick={handleClickChangeContent}
//                 >
//                   <img
//                     src={hamburger}
//                     alt="Hamburger Icon"
//                     className="w-4 h-4"
//                   />
//                   <span>Add / Change Content</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="w-full flex justify-center py-4">
//           <div className="w-11/12 flex flex-col items-start space-y-4">
//             <div className="flex justify-between w-full">
//               <span className="text-white text-xl font-semibold">
//                 Make Item for sale
//               </span>
//               <div className="flex items-center space-x-2">
//                 <span
//                   className={`text-white ${!isForSale ? "" : "text-gray-400"}`}
//                 >
//                   No
//                 </span>
//                 <div
//                   className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
//                     isForSale ? "bg-blue-500" : "bg-gray-400"
//                   }`}
//                   onClick={handleToggle}
//                 >
//                   <div
//                     className={`h-5 w-5 bg-white rounded-full shadow-md transform duration-300 ${
//                       isForSale ? "translate-x-6" : ""
//                     }`}
//                   ></div>
//                 </div>
//                 <span
//                   className={`text-white ${isForSale ? "" : "text-gray-400"}`}
//                 >
//                   Yes
//                 </span>
//               </div>
//             </div>

//             {isForSale && (
//               <div className="self-stretch flex-col justify-start items-center gap-3.5 flex">
//                 <div className="w-full">
//                   <div className=" text-[#bfbfbf] text-base font-medium font-['Nunito']">
//                     What type of asset is this?
//                   </div>
//                 </div>
//                 <div className="justify-start items-start gap-[19px] inline-flex">
//                   <div className="h-[50.44px] pt-[11.72px] pb-[11.72px] bg-[#202324] rounded-[46.88px] border-2 border-[#383a3b] justify-center items-center gap-[11.72px] flex">
//                     <button
//                       className={`text-white text-xl font-semibold font-['Nunito'] capitalize tracking-tight ${
//                         isPhysical
//                           ? "bg-[#0084ff] text-white rounded-[46.88px]"
//                           : " text-white rounded-[46.88px]"
//                       }`}
//                       onClick={() => handleTypeToggle("Physical")}
//                     >
//                       Physical
//                     </button>
//                   </div>
//                   <div className="w-[22px] h-[50px] justify-center items-center gap-2.5 flex">
//                     <div className="text-[#808080] text-base font-semibold font-['Nunito'] tracking-tight">
//                       or
//                     </div>
//                   </div>
//                   <div className="h-[50.44px] pt-[11.72px] pb-[11.72px] bg-[#202324] rounded-[46.88px] border-2 border-[#383a3b] justify-center items-center gap-[11.72px] flex">
//                     <button
//                       className={`text-white text-xl font-semibold font-['Nunito'] capitalize tracking-tight ${
//                         !isPhysical
//                           ? "bg-[#0084ff] text-white  rounded-[46.88px] "
//                           : " text-white  rounded-[46.88px] "
//                       }`}
//                       onClick={() => handleTypeToggle("Digital")}
//                     >
//                       Digital
//                     </button>
//                   </div>
//                 </div>
//                 <div className="flex-col justify-start items-start w-full flex">
//                   <div className="w-full">
//                     <label className="text-gray-400 text-sm">Price</label>
//                     <input
//                       type="text"
//                       value={value}
//                       onChange={handleChange}
//                       className="w-full p-2 bg-gray-800 text-white rounded-md"
//                       placeholder="$000.00"
//                     />
//                     {errors.price && (
//                       <div className="text-red-500">{errors.price}</div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//             <div className="w-full">
//               <label className="text-gray-400 text-sm">Title</label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="w-full p-2 bg-gray-800 text-white rounded-md"
//               />
//             </div>
//             <div className="w-full">
//               <label className="text-gray-400 text-sm">Description</label>
//               <textarea
//                 style={{ minHeight: "70px" }}
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full p-2 bg-gray-800 text-white rounded-md h-32"
//               />
//             </div>
//             <button
//               className="w-full py-3 bg-blue-500 text-white text-center rounded-md"
//               onClick={validateAndSave}
//               disabled={isSaving}
//             >
//               {isSaving ? "Saving..." : "Save the board"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddContentPage;
