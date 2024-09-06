import React, { useEffect, useState } from "react";
import tappablegif from "../../assets/tappablegif.gif";
import { useLocation, useNavigate } from "react-router";
import { baseURL } from "../../Constants/urls";
import share from "../../assets/Share.svg";
import comment from "../../assets/comment.svg";

const InfoOverlayInHomepg = () => {
  const location = useLocation();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const searchParams = new URLSearchParams(location.search);
  const [tappableContent, setTappableContent] = useState(null);
  const navigate = useNavigate();
  const imageId = searchParams.get("imageId");
  const tappableId = searchParams.get("tappableId");

  console.log("imageId 24 : ", imageId);
  console.log("tappableId 25 : ", tappableId);
  useEffect(() => {
    const fetchTappableContent = async () => {
      // if (imageId && tappableId) {
      try {
        const response = await fetch(
          `${baseURL}/board/fetchTappableContain?imageId=${imageId}&tappableId=${tappableId}`,

          {
            method: "GET",
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.status && data.data) {
            setTappableContent(data.data);
          } else {
            console.error("Invalid data format received");
          }
        } else {
          console.error(
            "Failed to fetch tappable content:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching tappable content:", error);
      }
      // } else {
      //   console.error("Image ID or Tappable ID is missing");
    };

    fetchTappableContent();
  }, []);
  // }, [imageId, tappableId]);
  if (!tappableContent) {
    return <div>Loading...</div>;
  }
  const handleBack = () => {
    navigate("/home");
  };
  return (
    <div className="bg-[#202020] min-h-screen flex ">
      <div className="w-full max-w-[430px] h-full min-h-[100vh] relative bg-[#202020] overflow-y-auto">
        {isFullScreen && (
          <FullScreenImage
            src={tappableContent.tappablePrymrImage}
            onClose={() => setIsFullScreen(false)}
          />
        )}
        <div className="sticky top-0 z-10 w-full h-[116px] bg-[#141414]/75 backdrop-blur-[14px]">
          <div className="w-full px-4 pt-10 pb-4 flex justify-between items-center">
            <div className="w-[38.57px] h-[38.57px] p-[14.47px] bg-black/0 rounded-[36.16px] border-white flex justify-center items-center">
              {" "}
              <button onClick={handleBack}> Back </button>
              <div className="w-[25.02px] h-[25.02px]"></div>
            </div>

            <div className="flex items-center gap-[5px]">
              <div className="text-white text-xl font-bold font-['Nunito']">
                Tappable
              </div>
              <div className="w-[29px] h-[29px] relative">
                <div className="w-[15.08px] h-[15.08px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0084ff] rounded-full"></div>
                <img
                  className="w-full h-full"
                  src={tappablegif}
                  alt="Tappable gif"
                />
              </div>
            </div>
          </div>
          {/* <div className="px-4 text-[#999999] text-xs font-normal font-['Nunito']">
            12,490 interactions
          </div> */}
        </div>

        <div className="px-4 pt-4 pb-8 flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <div className="w-full aspect-square rounded-[23px] overflow-hidden">
              <img
                src={tappableContent.tappablePrymrImage}
                alt="Tappable Primary Image"
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setIsFullScreen(true)}
              />
            </div>
            <div className="flex justify-between items-center">
              {tappableContent.price && (
                <div className="text-[#0084ff] text-xs font-semibold font-['Nunito']">
                  {tappableContent.assetType}
                </div>
              )}
              {/* <div className="flex items-center gap-2 flex-grow justify-center">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((_, index) => (
                    <div
                      key={index}
                      className={`w-[6px] h-[6px] rounded-full ${
                        index === 0 ? "bg-[#fff400]" : "bg-[#a4a4a4]"
                      }`}
                    ></div>
                  ))}
                </div>
              </div> */}
              <div className="flex items-center gap-2 flex-grow justify-center">
                <div className="flex gap-1">
                  {Array.from(
                    { length: tappableContent.tappablePrymrImage },
                    (_, index) => (
                      <div
                        key={index}
                        className={`w-[6px] h-[6px] rounded-full ${
                          index === 0 ? "bg-[#fff400]" : "bg-[#a4a4a4]"
                        }`}
                      ></div>
                    )
                  )}
                </div>
              </div>
              {/* <div className="text-[#999999] text-xs font-normal font-['Nunito']">
                {new Date(tappableContent.cratedAt).toLocaleDateString()}
              </div> */}
              <div className="text-[#999999] text-xs font-normal font-['Nunito']">
                {new Date(tappableContent.cratedAt).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "long", // for number 2-digit
                    year: "numeric",
                  }
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* <div className="flex gap-4">
              <img src={share} alt="Share" className="w-7 h-7" />
              <div className="flex items-center gap-2">
                <img src={comment} alt="Comment" className="w-7 h-7" />
                <span className="text-white">12</span>
              </div>
            </div> */}
            <h2 className="text-white text-xl font-bold font-['Nunito'] leading-relaxed">
              {tappableContent.title}
            </h2>
            <p className="text-[#c9c9c9] text-base font-bold font-['Nunito'] leading-tight">
              {tappableContent.tappableDescription}
            </p>
          </div>

          {tappableContent.price && (
            <div className="flex flex-col gap-4">
              <button className="w-full p-2.5 bg-[#0084ff] rounded-[65px] text-white text-xl font-medium font-['Inter'] leading-snug">
                ${tappableContent.price} Checkout
              </button>
              <button className="w-full p-2.5 bg-[#2a2a2a] rounded-[51px] border-2 border-[#0084ff] text-white text-base font-medium font-['Nunito'] leading-[17.60px] tracking-tight">
                Add to cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const FullScreenImage = ({ src, onClose }) => (
  <div className="fixed inset-0 z-50 bg-black flex justify-center items-center">
    <button
      className="absolute top-4 right-4 text-white text-2xl"
      onClick={onClose}
    >
      ×
    </button>
    <img
      src={src}
      alt="Full screen"
      className="max-w-full max-h-full object-contain"
    />
  </div>
);
export default InfoOverlayInHomepg;
