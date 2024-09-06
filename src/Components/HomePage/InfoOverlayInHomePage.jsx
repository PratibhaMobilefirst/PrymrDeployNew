import React, { useEffect, useState } from "react";
import tappablegif from "../../assets/tappablegif.gif";
import { useLocation, useNavigate } from "react-router";
import { baseURL } from "../../Constants/urls";
import share from "../../assets/Share.svg";
import comment from "../../assets/comment.svg";

const InfoOverlayInHomePage = () => {
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
    // <div className="bg-[#202020] min-h-screen flex ">
    //   <div className="w-full max-w-[430px] h-full min-h-[100vh] relative bg-[#202020] overflow-y-auto">
    //     {isFullScreen && (
    //       <FullScreenImage
    //         src={tappableContent.tappablePrymrImage}
    //         onClose={() => setIsFullScreen(false)}
    //       />
    //     )}
    //     <div className="sticky top-0 z-10 w-full h-[116px] bg-[#141414]/75 backdrop-blur-[14px]">
    //       <div className="w-full px-4 pt-10 pb-4 flex justify-between items-center">
    //         <div className="w-[38.57px] h-[38.57px] p-[14.47px] bg-black/0 rounded-[36.16px] border-white flex justify-center items-center">
    //           {" "}
    //           <button onClick={handleBack}> Back </button>
    //           <div className="w-[25.02px] h-[25.02px]"></div>
    //         </div>

    //         <div className="flex items-center gap-[5px]">
    //           <div className="text-white text-xl font-bold font-['Nunito']">
    //             Tappable
    //           </div>
    //           <div className="w-[29px] h-[29px] relative">
    //             <div className="w-[15.08px] h-[15.08px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0084ff] rounded-full"></div>
    //             <img
    //               className="w-full h-full"
    //               src={tappablegif}
    //               alt="Tappable gif"
    //             />
    //           </div>
    //         </div>
    //       </div>
    //       {/* <div className="px-4 text-[#999999] text-xs font-normal font-['Nunito']">
    //         12,490 interactions
    //       </div> */}
    //     </div>

    //     <div className="px-4 pt-4 pb-8 flex flex-col gap-7">
    //       <div className="flex flex-col gap-3">
    //         <div className="w-full aspect-square rounded-[23px] overflow-hidden">
    //           <img
    //             src={tappableContent.tappablePrymrImage}
    //             alt="Tappable Primary Image"
    //             className="w-full h-full object-cover cursor-pointer"
    //             onClick={() => setIsFullScreen(true)}
    //           />
    //         </div>
    //         <div className="flex justify-between items-center">
    //           {tappableContent.price && (
    //             <div className="text-[#0084ff] text-xs font-semibold font-['Nunito']">
    //               {tappableContent.assetType}
    //             </div>
    //           )}
    //           {/* <div className="flex items-center gap-2 flex-grow justify-center">
    //             <div className="flex gap-1">
    //               {[1, 2, 3, 4].map((_, index) => (
    //                 <div
    //                   key={index}
    //                   className={`w-[6px] h-[6px] rounded-full ${
    //                     index === 0 ? "bg-[#fff400]" : "bg-[#a4a4a4]"
    //                   }`}
    //                 ></div>
    //               ))}
    //             </div>
    //           </div> */}
    //           <div className="flex items-center gap-2 flex-grow justify-center">
    //             <div className="flex gap-1">
    //               {Array.from(
    //                 { length: tappableContent.tappablePrymrImage },
    //                 (_, index) => (
    //                   <div
    //                     key={index}
    //                     className={`w-[6px] h-[6px] rounded-full ${
    //                       index === 0 ? "bg-[#fff400]" : "bg-[#a4a4a4]"
    //                     }`}
    //                   ></div>
    //                 )
    //               )}
    //             </div>
    //           </div>
    //           {/* <div className="text-[#999999] text-xs font-normal font-['Nunito']">
    //             {new Date(tappableContent.cratedAt).toLocaleDateString()}
    //           </div> */}
    //           <div className="text-[#999999] text-xs font-normal font-['Nunito']">
    //             {new Date(tappableContent.cratedAt).toLocaleDateString(
    //               "en-GB",
    //               {
    //                 day: "2-digit",
    //                 month: "long", // for number 2-digit
    //                 year: "numeric",
    //               }
    //             )}
    //           </div>
    //         </div>
    //       </div>

    //       <div className="flex flex-col gap-4">
    //         {/* <div className="flex gap-4">
    //           <img src={share} alt="Share" className="w-7 h-7" />
    //           <div className="flex items-center gap-2">
    //             <img src={comment} alt="Comment" className="w-7 h-7" />
    //             <span className="text-white">12</span>
    //           </div>
    //         </div> */}
    //         <h2 className="text-white text-xl font-bold font-['Nunito'] leading-relaxed">
    //           {tappableContent.title}
    //         </h2>
    //         <p className="text-[#c9c9c9] text-base font-bold font-['Nunito'] leading-tight">
    //           {tappableContent.tappableDescription}
    //         </p>
    //       </div>

    //       {tappableContent.price && (
    //         <div className="flex flex-col gap-4">
    //           <button className="w-full p-2.5 bg-[#0084ff] rounded-[65px] text-white text-xl font-medium font-['Inter'] leading-snug">
    //             ${tappableContent.price} Checkout
    //           </button>
    //           <button className="w-full p-2.5 bg-[#2a2a2a] rounded-[51px] border-2 border-[#0084ff] text-white text-base font-medium font-['Nunito'] leading-[17.60px] tracking-tight">
    //             Add to cart
    //           </button>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
<div className="w-[854px] h-[556px] relative bg-[#0d0d0d] rounded-[33.57px] shadow">
  <div className="pl-[21.20px] pr-[10.57px] pt-[5.30px] pb-[6.18px] left-0 top-0 absolute bg-black justify-end items-center gap-[664.66px] inline-flex">
    <div className="w-[34.08px] self-stretch p-[12.78px] bg-black/0 rounded-[31.95px] border-white justify-center items-center gap-[10.65px] inline-flex">
      <div className="w-[22.10px] h-[22.10px] justify-center items-center flex">
        <div className="w-[22.10px] h-[22.10px] relative">
        </div>
      </div>
    </div>
    <div className="self-stretch p-[8.83px] justify-center items-center gap-[4.42px] inline-flex">
      <div className="text-white text-lg font-bold font-['Nunito']">Tappable</div>
      <div className="w-[25.62px] h-[25.62px] relative">
        <div className="w-[13.32px] h-[13.32px] left-[6.15px] top-[6.15px] absolute bg-[#0084ff] rounded-full" />
        <img className="w-[25.62px] h-[25.62px] left-0 top-0 absolute" src="https://via.placeholder.com/26x26" />
      </div>
    </div>
  </div>
  <div className="w-[854px] h-[58px] left-0 top-[498px] absolute bg-[#0d0d0d]">
    <div className="w-[53px] left-[773px] top-[18px] absolute justify-center items-center gap-[97px] inline-flex">
      <div className="justify-start items-start gap-36 flex">
        <div className="text-[#999999] text-[10.60px] font-normal font-['Nunito']">2 days ago</div>
      </div>
    </div>
    <div className="left-[26px] top-[7px] absolute flex-col justify-start items-center gap-[4.89px] inline-flex">
      <div className="h-[40.97px] justify-center items-center gap-4 inline-flex">
        <div className="h-[31.34px] p-[7.17px] bg-neutral-800 rounded-[28.68px] border-2 border-[#191919] justify-center items-center gap-[7.17px] flex">
          <div className="text-white text-xs font-semibold font-['Nunito'] capitalize tracking-tight">Digital</div>
        </div>
      </div>
    </div>
  </div>
  <div className="w-[807px] left-[18px] top-[68px] absolute justify-center items-center gap-3 inline-flex">
    <div className="w-[430px] h-[430px] relative bg-[#151515] border border-[#0d0d0d]">
      <div className="pl-[104.50px] pr-[77.26px] pb-[273.78px] left-[12px] top-[8px] absolute flex-col justify-start items-center inline-flex">
        <div className="self-stretch grow shrink basis-0 flex-col justify-start items-center gap-[11.61px] inline-flex">
          <div className="pt-[17.08px] bg-[#626262]/80 rounded-[29.02px] border-[#0084ff] flex-col justify-end items-center flex">
            <div className="self-stretch h-[402.66px] pl-[0.09px] pr-[104.48px] pt-2 pb-[40.58px] flex-col justify-start items-center inline-flex">
              <img className="w-[235.69px] h-[354.11px]" src="https://via.placeholder.com/236x354" />
            </div>
          </div>
          <div className="px-[5.80px] opacity-0 bg-[#0084ff] rounded-[9.93px] flex-col justify-start items-start gap-[7.26px] flex">
            <div className="justify-start items-center gap-[5.80px] inline-flex">
              <div className="p-[7.26px] justify-start items-start gap-[7.26px] flex">
                <div className="w-[31.77px] h-[31.77px] justify-center items-center flex">
                  <div className="w-[31.77px] h-[31.77px] relative">
                  </div>
                </div>
              </div>
              <div className="justify-start items-end gap-2 flex">
                <div className="w-[37.73px] h-[0px] origin-top-left rotate-90 border border-white"></div>
                <div className="bg-[#0084ff] rounded-[30.54px] justify-end items-center flex">
                  <div className="w-[42.63px] h-[42.63px] relative">
                    <div className="w-[23.44px] h-[23.44px] left-[15.11px] top-[4.43px] absolute bg-[#565656]/0 rounded-full border border-[#fff400]/0" />
                    <div className="w-[30.15px] h-[30.15px] p-[7.54px] left-0 top-[21.32px] absolute origin-top-left -rotate-45 border-[#fff400]/0 justify-center items-center inline-flex" />
                  </div>
                </div>
                <div className="justify-start items-center gap-[7.26px] flex">
                  <div className="p-[7.26px] justify-start items-start gap-[7.26px] flex">
                    <div className="w-[24.76px] h-[24.76px] justify-center items-center flex">
                      <div className="w-[24.76px] h-[24.76px] px-[4.64px] py-[3.87px] justify-center items-center inline-flex" />
                    </div>
                  </div>
                </div>
                <div className="w-[37.73px] h-[0px] origin-top-left rotate-90 border border-white"></div>
              </div>
              <div className="px-[10.16px] py-[7.26px] justify-start items-start gap-[7.26px] flex" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[356px] h-[434px] left-[37px] top-[-2px] absolute" />
    </div>
    <div className="pl-[5px] pb-[13px] bg-[#151515] flex-col justify-start items-center inline-flex">
      <div className="w-[370px] h-[418px] relative bg-[#151515] flex-col justify-start items-start flex">
        <div className="flex-col justify-start items-start gap-[16.84px] inline-flex">
          <div className="justify-start items-start gap-3 inline-flex">
            <div className="justify-start items-center flex">
              <div className="h-[35.28px] pl-[6.42px] pr-1 pt-2 pb-[6.41px] bg-[#020202]/0 flex-col justify-center items-center inline-flex">
                <div className="w-[20.85px] grow shrink basis-0 justify-center items-center inline-flex">
                  <div className="w-[20.85px] h-[20.85px] relative">
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-start items-center flex">
              <div className="w-[35.28px] h-[35.28px] relative bg-[#020202]/0">
                <div className="w-[25.66px] h-[25.66px] left-[4.81px] top-[4.81px] absolute" />
                <div className="w-[20.85px] h-[20.85px] left-[8.02px] top-[8.02px] absolute justify-center items-center inline-flex">
                  <div className="w-[20.85px] h-[20.85px] relative">
                  </div>
                </div>
              </div>
              <div className="w-4 text-right text-[#cfcfcf] text-xs font-semibold font-['Nunito'] leading-[13.20px] tracking-wide">12</div>
            </div>
          </div>
          <div className="text-white text-base font-bold font-['Nunito'] leading-[20.85px]">MG Mega Cap Cotton Denim Cap</div>
        </div>
        <div className="w-[313.54px]"><span style="text-[#c9c9c9] text-[12.83px] font-extrabold font-['Nunito'] leading-none">Limited edition Fakefroot Cap!!!<br/><br/>Product details<br/></span><span style="text-[#c9c9c9] text-[12.83px] font-bold font-['Nunito'] leading-none">Fabric type - Denim<br/>Care instructions - Machine Wash<br/>Fit type - Fitted<br/>Pattern - Solid<br/><br/>About this item<br/></span><span style="text-[#c9c9c9] text-[12.83px] font-bold font-['Nunito'] leading-none">Denim<br/>Machine Wash<br/></span><span style="text-[#c9c9c9] text-[12.83px] font-bold font-['Nunito'] leading-none"><br/>Allow 2 weeks for delivery.</span></div>
        <div className="h-[86.60px] flex-col justify-start items-end gap-4 inline-flex">
          <div className="h-[35.28px] flex-col justify-start items-start gap-[10.42px] flex">
            <div className="w-[312.74px] h-[35.28px] p-2 bg-[#0084ff] rounded-[52.12px] justify-center items-center gap-2 inline-flex">
              <div className="justify-center items-center gap-[6.42px] flex">
                <div className="text-white text-base font-medium font-['Inter'] leading-[17.81px]">$26.99</div>
                <div className="text-white text-[12.83px] font-medium font-['Nunito'] leading-[14.12px] tracking-tight"> Checkout</div>
              </div>
            </div>
          </div>
          <div className="h-[35.28px] flex-col justify-center items-center gap-[10.42px] flex">
            <div className="w-[310.33px] h-[35.28px] p-2 bg-[#2a2a2a] rounded-[40.90px] border-2 border-[#0084ff] justify-center items-center gap-2 inline-flex">
              <div className="justify-start items-center gap-[8.82px] flex">
                <div className="w-4 h-4 relative" />
                <div className="text-white text-[12.83px] font-medium font-['Nunito'] leading-[14.12px] tracking-tight">Add to cart</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="w-2.5 h-[443px] left-[837px] top-[56px] absolute bg-[#343434]">
    <div className="w-2.5 h-[371px] left-0 top-[12px] absolute bg-[#6b6b6b] rounded-[26px]" />
    <div className="w-3 h-3 left-0 top-0 absolute bg-[#202020]" />
    <div className="w-3 h-3 left-[-1px] top-0 absolute justify-center items-center inline-flex">
      <div className="w-3 h-3 relative">
      </div>
    </div>
    <div className="w-2.5 h-2.5 left-0 top-[433px] absolute">
      <div className="w-2.5 h-2.5 left-0 top-0 absolute bg-[#2b2b2b]" />
      <div className="w-2.5 h-2.5 left-[10px] top-[10px] absolute origin-top-left rotate-180 flex-col justify-center items-center inline-flex">
        <div className="w-2.5 h-2.5 relative">
        </div>
      </div>
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
export default InfoOverlayInHomePage;
