import React, { useState, useEffect, useCallback } from "react";
import Frame from "../assets/images/Frame.png";
import HeaderDiv from "./HeaderDiv";
import BottomDiv from "./BottomDiv";
import SelectTools from "./SelectTools";
import CropTool from "./CropTool";
import BrushTool from "./BrushTool";
import SelectiveTool from "./SelectiveTool";
import DetailsModal from "./DetailsModal";
import CurvesModal from "./CurvesModal";
import WhiteBalancesModal from "./WhiteBalancesModal";
import PerspectiveTool from "./PerspectiveTool";
import FullScreenTool from "./FullScreenTool";
import HealingTool from "./HealingTool";
import TonalContrastTool from "./TonalContrastTool";
import GlamourTool from "./GlamourTool";
import GrainyFilmTool from "./GrainyFilmTool";
import RetroluxTool from "./RetroluxTool";
import DramaTool from "./DramaTool";
import RotateTool from "./RotateTool";
import TuneImageTool from "./TuneImageTool";
import HDRScapeTool from "./HDRScapeTool";
import BlackAndWhiteTool from "./BlackAndWhiteTool";
import VintageTool from "./VintageTool";
import GrungeTool from "./GrungeTool";
import { useLocation } from "react-router";
// const imageUrl =
//   "https://artstudiolife.com/wp-content/uploads/2022/03/roman-painting.jpg";
const BoardEdit = () => {
  const location = useLocation();
  // const imageUrl = location.state; // Access imageUrl from location.state
  const imageUrl = JSON.parse(sessionStorage.getItem("state"))?.imageUrl; // Access imageUrl from location.state
  console.log("Editor ", imageUrl);
  const [currentImage, setCurrentImage] = useState(imageUrl);
  const [showTools, setShowTools] = useState(false);
  const [showTuneImageTool, setShowTuneImageTool] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [isBrushing, setIsBrushing] = useState(false);
  const [isSelective, setIsSelective] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCurvesOpen, setIsCurvesOpen] = useState(false);
  const [showWhiteBalancesModal, setShowWhiteBalancesModal] = useState(false);
  const [isPerspectiveOpen, setIsPerspectiveOpen] = useState(false);
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
  const [isHealing, setIsHealing] = useState(false);
  const [isTonalContrastOpen, setIsTonalContrastOpen] = useState(false);
  const [isGlamourOpen, setIsGlamourOpen] = useState(false);
  const [isGrainyFilmOpen, setIsGrainyFilmOpen] = useState(false);
  const [isRetroluxOpen, setIsRetroluxOpen] = useState(false);
  const [isDramaOpen, setIsDramaOpen] = useState(false);
  const [isHDRScapeOpen, setIsHDRScapeOpen] = useState(false);
  const [isBlackAndWhiteOpen, setIsBlackAndWhiteOpen] = useState(false);
  const [isVintageOpen, setIsVintageOpen] = useState(false);
  const [isGrungeOpen, setIsGrungeOpen] = useState(false);
  // const [currentImage, setCurrentImage] = useState(Frame);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleToggleTools = () => {
    setShowTools(!showTools);
  };

  const handleRotate = () => {
    setIsRotating(true);
  };

  const handleCrop = () => {
    setIsCropping(!isCropping);
  };

  const handleTuneImage = () => {
    setShowTuneImageTool(true);
  };

  const handleSelective = () => {
    setIsSelective(!isSelective);
  };

  const handleBrush = () => {
    setIsBrushing(!isBrushing);
  };

  const handleDetails = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };

  const handleDetailsClose = () => {
    setIsDetailsOpen(false);
  };

  const handleDetailsApply = (updatedImageDataUrl) => {
    setCurrentImage(updatedImageDataUrl);
    setIsDetailsOpen(false);
  };

  const handleCurves = () => {
    setIsCurvesOpen(!isCurvesOpen);
  };

  const handleWhiteBalances = () => {
    setShowWhiteBalancesModal(!showWhiteBalancesModal);
  };

  const handlePerspective = () => {
    setIsPerspectiveOpen(!isPerspectiveOpen);
  };

  const handleFullScreenOpen = () => {
    setIsFullScreenOpen(!isFullScreenOpen);
  };

  const handleHealing = () => {
    setIsHealing(!isHealing);
  };

  const handleTonalContrast = () => {
    setIsTonalContrastOpen(!isTonalContrastOpen);
  };

  const handleGlamour = () => {
    setIsGlamourOpen(!isGlamourOpen);
  };

  const handleGrainyFilm = () => {
    setIsGrainyFilmOpen(!isGrainyFilmOpen);
  };

  const handleRetrolux = () => {
    setIsRetroluxOpen(!isRetroluxOpen);
  };

  const handleDrama = () => {
    setIsDramaOpen(!isDramaOpen);
  };

  const handleHDRScape = () => {
    setIsHDRScapeOpen(!isHDRScapeOpen);
  };

  const handleBlackAndWhite = () => {
    setIsBlackAndWhiteOpen(!isBlackAndWhiteOpen);
  };

  const handleVintage = () => {
    setIsVintageOpen(!isVintageOpen);
  };

  const handleGrunge = () => {
    setIsGrungeOpen(!isGrungeOpen);
  };

  const calculateImageStyle = useCallback(() => {
    const img = new Image();
    img.src = currentImage;
    const windowWidth = windowSize.width;
    const windowHeight = windowSize.height;

    let width, height, top, left;

    top = (windowHeight - height) / 2;
    left = (windowWidth - width) / 2;

    return {
      width: `${width}px`,
      height: `${height}px`,
      top: `${top}px`,
      left: `${left}px`,
      position: "absolute",
    };
  }, [currentImage, windowSize]);

  useEffect(() => {
    const imgStyle = calculateImageStyle();
    const imgElement = document.getElementById("imageFrame");
    if (imgElement) {
      Object.assign(imgElement.style, imgStyle);
    }
  }, [calculateImageStyle]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    let resizeTimer;
    const debouncedHandleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  return (
    <div className="bg-black h-screen flex flex-col">
      {!showTuneImageTool &&
        !isCropping &&
        !isBrushing &&
        !isSelective &&
        !isDetailsOpen &&
        !isCurvesOpen &&
        !showWhiteBalancesModal &&
        !isPerspectiveOpen &&
        !isGrainyFilmOpen &&
        !isRetroluxOpen &&
        !isTonalContrastOpen &&
        !isGlamourOpen &&
        !isDramaOpen &&
        !isHealing &&
        !isGrungeOpen &&
        !isVintageOpen &&
        !isBlackAndWhiteOpen &&
        !isHDRScapeOpen && (
          <div>
            <HeaderDiv />
          </div>
        )}
      <div className="flex-grow flex justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 flex justify-center items-center">
          <img
            id="imageFrame"
            src={currentImage}
            alt="Frame"
            className="max-w-full max-h-full object-contain"
          />
          {isSelective && (
            <SelectiveTool
              image={currentImage}
              onClose={() => setIsSelective(false)}
              onApply={(newImageDataUrl) => {
                setCurrentImage(newImageDataUrl);
                setIsSelective(false);
              }}
            />
          )}
        </div>
      </div>
      {!showTuneImageTool &&
        !isCropping &&
        !isBrushing &&
        !isSelective &&
        !isDetailsOpen &&
        !isCurvesOpen &&
        !showWhiteBalancesModal &&
        !isPerspectiveOpen &&
        !isGrainyFilmOpen &&
        !isRetroluxOpen &&
        !isRotating &&
        !isTonalContrastOpen &&
        !isGlamourOpen &&
        !isDramaOpen &&
        !isHealing &&
        !isGrungeOpen &&
        !isVintageOpen &&
        !isBlackAndWhiteOpen &&
        !isHDRScapeOpen && (
          <BottomDiv
            onToggleTools={handleToggleTools}
            onRotate={handleRotate}
            onCrop={handleCrop}
            onTuneImage={handleTuneImage}
            onSelective={handleSelective}
            onBrush={handleBrush}
          />
        )}
      {showTools && (
        <div className="absolute inset-0 z-20">
          <SelectTools
            onClose={() => setShowTools(false)}
            onTuneImage={handleTuneImage}
            onRotate={handleRotate}
            onCrop={handleCrop}
            onSelective={handleSelective}
            onBrush={handleBrush}
            onDetails={handleDetails}
            onCurves={handleCurves}
            onWhiteBalances={handleWhiteBalances}
            onPerspective={handlePerspective}
            onFullScreenOpen={handleFullScreenOpen}
            onHealing={handleHealing}
            onTonalContrast={handleTonalContrast}
            onGlamour={handleGlamour}
            onGrainyFilm={handleGrainyFilm}
            onRetrolux={handleRetrolux}
            onDrama={handleDrama}
            onHDRScape={handleHDRScape}
            onBlackAndWhite={handleBlackAndWhite}
            onVintage={handleVintage}
            onGrunge={handleGrunge}
          />
        </div>
      )}
      {isCropping && (
        <CropTool
          image={currentImage}
          onClose={() => setIsCropping(false)}
          onCrop={(newImage) => {
            setCurrentImage(newImage);
            setIsCropping(false);
          }}
        />
      )}
      {isBrushing && (
        <BrushTool
          image={currentImage}
          onClose={() => setIsBrushing(false)}
          onBrush={(newImage) => {
            setCurrentImage(newImage);
            setIsBrushing(false);
          }}
        />
      )}
      {isDetailsOpen && (
        <DetailsModal
          image={currentImage}
          onClose={handleDetailsClose}
          onApply={handleDetailsApply}
        />
      )}
      {isCurvesOpen && (
        <CurvesModal
          image={currentImage}
          onClose={() => setIsCurvesOpen(false)}
          onApply={(newImageDataUrl) => {
            setCurrentImage(newImageDataUrl);
            setIsCurvesOpen(false);
          }}
        />
      )}
      {showWhiteBalancesModal && (
        <WhiteBalancesModal
          image={currentImage}
          onClose={() => setShowWhiteBalancesModal(false)}
          onApply={(newImageDataUrl) => {
            setCurrentImage(newImageDataUrl);
            setShowWhiteBalancesModal(false);
          }}
        />
      )}
      {isPerspectiveOpen && (
        <PerspectiveTool
          image={currentImage}
          onClose={() => setIsPerspectiveOpen(false)}
          onApply={(newImageDataUrl) => {
            setCurrentImage(newImageDataUrl);
            setIsPerspectiveOpen(false);
          }}
        />
      )}
      {isFullScreenOpen && (
        <FullScreenTool
          image={currentImage}
          onClose={() => setIsFullScreenOpen(false)}
        />
      )}
      {isHealing && (
        <HealingTool
          image={currentImage}
          onClose={() => setIsHealing(false)}
          onApply={(newImageDataUrl) => {
            setCurrentImage(newImageDataUrl);
            setIsHealing(false);
          }}
        />
      )}
      {isTonalContrastOpen && (
        <TonalContrastTool
          image={currentImage}
          onClose={() => setIsTonalContrastOpen(false)}
          onApply={(newImageDataUrl) => {
            setCurrentImage(newImageDataUrl);
            setIsTonalContrastOpen(false);
          }}
        />
      )}
      {isGlamourOpen && (
        <GlamourTool
          image={currentImage}
          onClose={() => setIsGlamourOpen(false)}
          onApply={(newImageDataUrl) => {
            setCurrentImage(newImageDataUrl);
            setIsGlamourOpen(false);
          }}
        />
      )}{" "}
      {isGrainyFilmOpen && (
        <GrainyFilmTool
          image={currentImage}
          onClose={() => setIsGrainyFilmOpen(false)}
          onApply={(newImageDataUrl) => {
            setCurrentImage(newImageDataUrl);
            setIsGrainyFilmOpen(false);
          }}
        />
      )}
      {isRetroluxOpen && (
        <RetroluxTool
          image={currentImage}
          onClose={() => setIsRetroluxOpen(false)}
          onApply={(newImageDataUrl) => {
            setCurrentImage(newImageDataUrl);
            setIsRetroluxOpen(false);
          }}
        />
      )}
      {isDramaOpen && (
        <DramaTool
          image={currentImage}
          onClose={() => setIsDramaOpen(false)}
          onApply={(newImageDataUrl) => {
            setCurrentImage(newImageDataUrl);
            setIsDramaOpen(false);
          }}
        />
      )}
      {isRotating && (
        <RotateTool
          image={currentImage}
          onClose={() => setIsRotating(false)}
          onRotate={(newImage) => {
            setCurrentImage(newImage);
            setIsRotating(false);
          }}
        />
      )}
      {showTuneImageTool && (
        <TuneImageTool
          image={currentImage}
          onClose={() => setShowTuneImageTool(false)}
          onApply={(adjustedImage) => {
            setCurrentImage(adjustedImage);
            setShowTuneImageTool(false);
          }}
        />
      )}{" "}
      {isHDRScapeOpen && (
        <HDRScapeTool
          image={currentImage}
          onClose={() => setIsHDRScapeOpen(false)}
          onApply={(newImageDataUrl) => {
            setCurrentImage(newImageDataUrl);
            setIsHDRScapeOpen(false);
          }}
        />
      )}
      {isBlackAndWhiteOpen && (
        <BlackAndWhiteTool
          image={currentImage}
          onClose={() => setIsBlackAndWhiteOpen(false)}
          onApply={(newImageDataUrl) => {
            setCurrentImage(newImageDataUrl);
            setIsBlackAndWhiteOpen(false);
          }}
        />
      )}
      {isVintageOpen && (
        <VintageTool
          image={currentImage}
          onClose={() => setIsVintageOpen(false)}
          onApply={(newImageDataUrl) => {
            setCurrentImage(newImageDataUrl);
            setIsVintageOpen(false);
          }}
        />
      )}
      {isGrungeOpen && (
        <GrungeTool
          image={currentImage}
          onClose={() => setIsGrungeOpen(false)}
          onApply={(newImageDataUrl) => {
            setCurrentImage(newImageDataUrl);
            setIsGrungeOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default BoardEdit;
