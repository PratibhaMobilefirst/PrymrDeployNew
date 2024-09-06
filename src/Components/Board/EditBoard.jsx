import React, { useContext, useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image, Rect, Group, Circle, Text } from 'react-konva';
import useImage from 'use-image';
import CheckSquare from "../../assets/CheckSquare.svg"
import Subtract from "../../assets/Subtract.svg"
import tappable_plus from "../../assets/tappable_plus.svg"
import ArrowCircleDownRight from "../../assets/ArrowCircleDownRight.svg"
import ActionBar from "./ActionBar/ActionBar";
import LayersPanel from "./ActionBar/Layers/Layers";
import { useLocation, useNavigate } from "react-router-dom";
import { ImageContext } from "./ImageContext/ImageContext";
import DeletePopup from "./ActionBar/NewTappeable/DeletePopup";
import { baseURL } from '../../Constants/urls';
import { PropagateLoader } from 'react-spinners';

const EditBoard = () => {
  const fileInputRef = useRef(null);
  const stageRef = useRef(null);
  const navigate = useNavigate();
  const [checkSquareIcon] = useImage(CheckSquare, 'anonymous');
  const [subtractIcon] = useImage(Subtract, 'anonymous');
  const [plusIcon] = useImage(tappable_plus, 'anonymous');
  const [arrowDownCircleIcon] = useImage(ArrowCircleDownRight, 'anonymous');
  const [points, setPoints] = useState([]);
  const [stageSize, setStageSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [stateDrag, setStateDrag] = useState({
    isDragging: false,
    x: 0,
    y: 0,
  });
  const [resizing, setResizing] = useState(false);
  const [cursorStyle, setCursorStyle] = useState('default');
  const [image, setImageUrl] = useState(null)
  const { layerImageUrl } = useContext(ImageContext);
  const [activeLayerId, setActiveLayerId] = useState(null);
  const [layers, setLayers] = useState(
    JSON.parse(localStorage.getItem("layers")) || []
  );
  const [tappableAreas, setTappableAreas] = useState(
    JSON.parse(localStorage.getItem("tappableAreas")) || []
  );
  const [activeTappable, setActiveTappable] = useState(null);
  const [jsonContent, setJsonContent] = useState("");
  const layersPanelRef = useRef(null);
  const location = useLocation();
  const { createBlankCanvas, editedImage, changedBG } = location.state || {};
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [imageUrl, imageStatus] = useImage(currentImageUrl, 'anonymous'); 
  const [imageBounds, setImageBounds] = useState({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      });

//   const [imageUrl] = useImage(
//     changedBG ||
//     editedImage ||
//     JSON.parse(sessionStorage.getItem("state"))?.imageUrl
// );
  const [showTappableArea, setShowTappableArea] = useState(false);
  const [showNewTappable, setShowNewTappable] = useState(false);
  const [lastAddedTappableContent, setLastAddedTappableContent] = useState(null);
  const [activeTappableId, setActiveTappableId] = useState(
    localStorage.getItem("activeTappableId") || null
  );
  const boardId = sessionStorage.getItem("boardId");
  const boardImageId = sessionStorage.getItem("boardImageId");
  const [isLayersPanelVisible, setIsLayersPanelVisible] = useState(false);
  const [tappableContent, setTappableContent] = useState(null);
  const [selectedLayerId, setSelectedLayerId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [layerToDelete, setLayerToDelete] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [selectionBox, setSelectionBox] = useState(null);
  const [tappableType, setTappableType] = useState(null);
  const [loading, setLoading] = useState(false);
    const [tappablePosition, setTappablePosition] = useState({ x: 0, y: 0 });
    const [newTappableType, setNewTappableType] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedEmoji, setSelectedEmoji] = useState(null);


  const ACTION_BAR_HEIGHT = 80;
  const DOT_SIZE = 20;
  const ICON_SIZE = 24;
  const TAPPABLE_BOX_SIZE = 100;

  // console.log("boaddd");
  // console.log(boardImageId);
  
  // console.log("editedImage :",editedImage);
  // console.log("changedBG: ",changedBG);

  useEffect(() => {
    setLoading(true);
    const fetchLatestImage = () => {
      const latestImage = changedBG || editedImage || JSON.parse(sessionStorage.getItem("state"))?.imageUrl;
      
      setCurrentImageUrl(latestImage);
      
      const currentState = JSON.parse(sessionStorage.getItem("state")) || {};
      sessionStorage.setItem("state", JSON.stringify({ ...currentState, imageUrl: latestImage }));
      // setLoading(false);
    };

    fetchLatestImage();
    
  }, [changedBG, editedImage]);

  useEffect(() => {
    if (imageStatus === "loaded") {
      setLoading(false); // Hide loader when the image is loaded
    }
  }, [imageStatus]);

  useEffect(() => {
    const handleResize = () => {
      setStageSize({ 
        width: window.innerWidth, 
        height: window.innerHeight - ACTION_BAR_HEIGHT 
      });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    // Load data from localStorage
    const savedData = localStorage.getItem('editBoardData');
    if (savedData) {
      const { image: savedImageUrl, points: savedPoints, scale: savedScale, position: savedPosition, layers: layers } = JSON.parse(savedData);
      setImageUrl(savedImageUrl);
      setPoints(savedPoints);
      setScale(savedScale);
      setPosition(savedPosition);
      setLayers(layers)
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (imageUrl && stageSize.width && stageSize.height) {
      const imageAspectRatio = imageUrl.width / imageUrl.height;
      const stageAspectRatio = stageSize.width / stageSize.height;
  
      let newWidth, newHeight, newX, newY;
  
      if (imageAspectRatio > stageAspectRatio) {
        newWidth = stageSize.width;
        newHeight = stageSize.width / imageAspectRatio;
      } else {
        newHeight = stageSize.height;
        newWidth = stageSize.height * imageAspectRatio;
      }
  
      newX = (stageSize.width - newWidth) / 2;
      newY = (stageSize.height - newHeight) / 2;
  
      setScale(newWidth / imageUrl.width);
      setPosition({ x: newX, y: newY });
    }
  }, [imageUrl, stageSize]);

  useEffect(() => {
    if (imageUrl) {
      // Save data to localStorage
      const dataToSave = { imageUrl:imageUrl?.currentSrc, points, scale, position, layers  };
      localStorage.setItem('editBoardData', JSON.stringify(dataToSave));
      // console.log("currentSrc");
      // console.log(imageUrl.currentSrc);
    }
    
  }, [imageUrl, points, scale, position, layers]);

  const calculateCenteredPosition = (imageWidth, imageHeight, stageWidth, stageHeight) => {
    return {
      x: (stageWidth - imageWidth * scale) / 2,
      y: (stageHeight - imageHeight * scale) / 2
    };
  };

  const handleStageClick = (e) => {
    if (!imageUrl || selectionBox) return;
    const stage = e.target.getStage();
    // console.log("stage",stage);
  const stagePosition = stage.position();
  const stageScale = stage.scaleX();
    
    const pointerPosition = stage.getPointerPosition();
    
    const clickX = (pointerPosition?.x - position?.x) / scale;
    const clickY = (pointerPosition?.y - position?.y) / scale;

    const x = (pointerPosition.x - stagePosition.x) / stageScale - position.x;
  const y = (pointerPosition.y - stagePosition.y) / stageScale - position.y;

  // Check if the click is within the image bounds
  if (x < 0 || y < 0 || x > imageUrl.width || y > imageUrl.height) {
    return; // Click is outside the image bounds
  }
    
  const clickedArea = tappableAreas.find((area) => {
    const { x, y, width, height } = area.position;
    return (
      clickX >= x &&
      clickX <= x + width &&
      clickY >= y &&
      clickY <= y + height
    );
  });

  if (clickedArea) {
    setSelectionBox({
      x: clickedArea.position.x,
      y: clickedArea.position.y,
      width: clickedArea.size.width,
      height: clickedArea.size.height,
    });
    setActiveTappableId(clickedArea.id);
    setSelectedLayerId(clickedArea.id);
    setIsLayersPanelVisible(true);
  } else {
      const boxSize = 100 / scale;
      setSelectionBox({
        x: clickX - boxSize / 2,
        y: clickY - boxSize / 2,
        width: boxSize,
        height: boxSize,
      });
    }
    
    const dataToSave = { image, points, scale, position, layers };
    localStorage.setItem('editBoardData', JSON.stringify(dataToSave));
    const newTappableArea = {
      id: `${getRandomNumber(100000, 999999999)}`,
    };
  
    const newLayer = {
      id: newTappableArea.id,
      name: `Layer ${layers.length + 1}`,
      tappableContent: null,
      selectedImage: null,
    };
  
  };

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleCheckClick = async () => {
    if (selectionBox && stageRef.current) {
      try {
        const stage = stageRef.current;
        const scaleFactor = scale; // Scale factor based on the stage scaling
  
        // Get the bounding box details with adjustments for scaling
        const captureX = selectionBox.x * scaleFactor + position.x;
        const captureY = selectionBox.y * scaleFactor + position.y;
        const captureWidth = selectionBox.width * scaleFactor;
        const captureHeight = selectionBox.height * scaleFactor;
  
        // Create an offscreen canvas
        const captureCanvas = document.createElement('canvas');
        captureCanvas.width = captureWidth;
        captureCanvas.height = captureHeight;
        const captureContext = captureCanvas.getContext('2d');
  
        // Ensure that stage.toCanvas() is correctly returning a canvas element
        const stageCanvas = stage.toCanvas();
        if (stageCanvas instanceof HTMLCanvasElement) {
          captureContext.drawImage(
            stageCanvas,
            captureX,
            captureY,
            captureWidth,
            captureHeight,
            0,
            0,
            captureWidth,
            captureHeight
          );
  
          // Convert the canvas to a Data URL (image format)
          const capturedImage = captureCanvas.toDataURL('image/png');
  
          // Calculate relative positions based on the image size
          const relativeX = selectionBox.x / imageUrl.width;
          const relativeY = selectionBox.y / imageUrl.height;
          const relativeWidth = selectionBox.width / imageUrl.width;
          const relativeHeight = selectionBox.height / imageUrl.height;
  
          // Create the new tappable area
          const newTappableArea = {
            id: `${getRandomNumber(100000, 999999999)}`,
            content:
              newTappableType === 'image'
                ? selectedImage
                : newTappableType === 'emoji'
                ? selectedEmoji
                : capturedImage,
            position: { x: relativeX, y: relativeY },
            size: { width: relativeWidth, height: relativeHeight },
            isFixed: true,
            isVisible: true, 
          };
  
          // Calculate the exact pixel positions based on the loaded image dimensions
          const centerX = selectionBox.x + selectionBox.width / 2;
          const centerY = selectionBox.y + selectionBox.height / 2;
          const newPoint = { x: centerX / imageUrl.width, y: centerY / imageUrl.height };
  
          // Update state and add the new tappable area
          setTappableAreas((prev) => [...prev, newTappableArea]);
          setPoints((prev) => [...prev, newPoint]);
          setLayers((prev) => [
            ...prev,
            {
              id: newTappableArea.id,
              name: `Layer ${prev.length + 1}`,
              tappableContent: capturedImage,
              selectedImage: null,
            },
          ]);
  
          // Save updated data to localStorage
          const dataToSave = {
            tappableAreas: [...tappableAreas, newTappableArea],
            points: [...points, newPoint],
            imageUrl: imageUrl?.currentSrc,
            layers,
          };
          localStorage.setItem('editBoardData', JSON.stringify(dataToSave));
  
          // Retrieve existing tappables from sessionStorage
          const existingTappables = JSON.parse(sessionStorage.getItem('tappableData')) || [];
  
          // Add the new tappable
          existingTappables.push({
            tappableId: newTappableArea.id,
            left: newPoint.x * imageUrl.width,
            top: newPoint.y * imageUrl.height,
            imageId: boardImageId,
            points: [...points, newPoint], // Include updated points
          });
  
          // Store the updated tappables in sessionStorage
          sessionStorage.setItem('tappableData', JSON.stringify(existingTappables));
  
          // Reset states after addition
          setSelectionBox(null);
          setNewTappableType(null);
          setSelectedImage(null);
          setSelectedEmoji(null);
  
          console.log('Captured image saved successfully.');
        } else {
          console.error('Failed to convert the stage to a valid canvas.');
        }
      } catch (error) {
        console.error('Error handling check click:', error);
      }
    }
  };  
  
  const handleDeleteClick = () => {
    setShowDeletePopup(true);
    setSelectionBox(null);
  };

  const handleWheel = (e) => {
    e.evt.preventDefault();
    const scaleBy = 1.01;
    const stage = e.target.getStage();
    const oldScale = scale;
    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
  
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - position.x / oldScale,
      y: stage.getPointerPosition().y / oldScale - position.y / oldScale,
    };
  
    const newPos = {
      x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    };
  
    setScale(newScale);
    setPosition(newPos);
  };

  const handleBack = () => {
    navigate("/home");
  };

  const viewBoardPage = () => {
    navigate("/infoOverlay");
  };

  const handleTappableBoxDragMove = (e) => {
    if (!imageUrl) return;
    
    
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    
    const clickX = (pointerPosition?.x - position?.x) / scale;
    const clickY = (pointerPosition?.y - position?.y) / scale;
    
    if (clickX >= 0 && clickX <= imageUrl?.width && clickY >= 0 && clickY <= imageUrl?.height) {
    const newX = Math.max(0, Math.min(e.target.x(), imageUrl?.width - selectionBox?.width));
    const newY = Math.max(0, Math.min(e.target.y(), imageUrl?.height - selectionBox?.height));

    setSelectionBox({
      ...selectionBox,
      x: newX,
      y: newY,
    });
  }
  };




  const handleSelectTappableArea = () => {
    setShowTappableArea(true);
    setShowNewTappable(false);
    addTappableArea();
  };

  const handleRemoveTappableArea = (id) => {
    // Save current state to undo stack
    setUndoStack((prev) => [...prev, { tappableAreas, layers }]);
    // setRedoStack([]); // Clear the redo stack when a new action is performed

    setTappableAreas((prev) => prev.filter((area) => area.id !== id));
    setLayers((prev) => prev.filter((layer) => layer.id !== id));
    setShowTappableArea(false);
    setTappableContent(null);
    setActiveTappable(null);
    setActiveTappableId(null); // Reset active tappable ID
    setTappableAreas((prev) =>
      prev.map((area) => ({ ...area, isVisible: true }))
    ); // Activate all tappable areas
  };

  const handleUndo = () => {
    // console.log("Undo stack before undo:", undoStack);
    // console.log("Redo stack before undo:", redoStack);/

    if (undoStack.length === 0) return;

    const lastState = undoStack.pop();
    setRedoStack((prev) => [...prev, { tappableAreas, layers }]); // Save current state to redo stack

    setTappableAreas(lastState.tappableAreas);
    setLayers(lastState.layers);
    setUndoStack([...undoStack]); // Update undo stack

    // console.log("Undo stack after undo:", undoStack);
    // console.log("Redo stack after undo:", redoStack);
  };

  const handleRedo = () => {
    // console.log("Undo stack before redo:", undoStack);
    // console.log("Redo stack before redo:", redoStack);

    if (redoStack.length === 0) return;

    const lastState = redoStack.pop();
    setUndoStack((prev) => [...prev, { tappableAreas, layers }]); // Save current state to undo stack

    setTappableAreas(lastState.tappableAreas);
    setLayers(lastState.layers);
    setRedoStack([...redoStack]); // Update redo stack

    // console.log("Undo stack after redo:", undoStack);
    // console.log("Redo stack after redo:", redoStack);
  };

  const handleLayerDelete = (layerId) => {
    setLayerToDelete(layerId);
    setShowDeletePopup(true);
  };

  const confirmLayerDelete = () => {
    if (layerToDelete) {
      setLayers((prev) => {
        const updatedLayers = prev.filter(
          (layer) => layer.id !== layerToDelete
        );
        return updatedLayers;
      });
      setTappableAreas((prev) =>
        prev.filter((area) => area.id !== layerToDelete)
      );
      setActiveTappable(null);
      setShowDeletePopup(false);
      setLayerToDelete(null);
      setActiveTappableId(null); // Reset active tappable ID
      setTappableAreas((prev) =>
        prev.map((area) => ({ ...area, isVisible: true }))
      ); // Activate all tappable areas
    }
  };

  const cancelLayerDelete = () => {
    setShowDeletePopup(false);
    setLayerToDelete(null);
  };

  const handleFixTappableContent = (id, content, position, size) => {
    setTappableAreas((prev) =>
      prev.map((area) =>
        area.id === id ? { ...area, isFixed: true, position, size } : area
      )
    );
    setActiveTappableId(null);
  };

  const toggleTappableVisibility = (id) => {
    setTappableAreas((prev) =>
      prev.map((area) =>
        area.id === id ? { ...area, isVisible: !area.isVisible } : area
      )
    );
  };

  const handleNewTappableSelect = (type) => {
    setNewTappableType(type);
    const centerX = imageUrl.width / 2 - TAPPABLE_BOX_SIZE / 2;
    const centerY = imageUrl.height / 2 - TAPPABLE_BOX_SIZE / 2;
    setSelectionBox({
      x: centerX,
      y: centerY,
      width: TAPPABLE_BOX_SIZE,
      height: TAPPABLE_BOX_SIZE,
    });
  };

  const handleImageSelect = (imageDataUrl) => {
    const img = new window.Image(); // Correct way to create an HTMLImageElement
    img.src = imageDataUrl;
    img.crossOrigin = "anonymous"; // Optional: if dealing with CORS issues
    img.onload = () => {
      setSelectedImage(img); // Only set the image when it has fully loaded
    };
    img.onerror = () => {
      console.error("Failed to load image");
    };
  };  

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const handleNewTappableClose = () => {
    setShowNewTappable(false);
  };


  const handleCircleClick = (index) => {
    const tappableArea = tappableAreas[index];

    if (tappableArea) {
      setSelectedLayerId(tappableArea.id);
      setIsLayersPanelVisible(true);

      // Set the clicked tappable as the active selection
      setSelectionBox({
        x: tappableArea.position.x * imageUrl.width,
        y: tappableArea.position.y * imageUrl.height,
        width: tappableArea.size.width * imageUrl.width,
        height: tappableArea.size.height * imageUrl.height,
      });

      setActiveTappableId(tappableArea.id);
    } else {
      console.error(`No tappable area found for index ${index}`);
    }
  
  };

  const handleLayerTappableClick = (layerId) => {
    setActiveTappableId(layerId); // Set the active tappable area
    setTappableAreas((prev) =>
      prev.map((area) => ({
        ...area,
        isVisible: area.id === layerId, // Ensure only one tappable area is visible
      }))
    );
  };

  const handleLayerClick = (id) => {
    setActiveLayerId(id);
    sessionStorage.setItem('activeLayerId', id);
    console.log('Saved activeLayerId:', id);
  setTappableAreas((prev) =>
    prev.map((area) =>
      area.id === id ? { ...area, isVisible: true } : { ...area, isVisible: false }
    )
  );
    setSelectedLayerId(id);
  };
  

  const handleResizeStart = (e) => {
    e.cancelBubble = true;
    setResizing(true);
  };
  
  const handleResizeEnd = () => {
    setResizing(false);
  };
  
  const handleResize = (e) => {
    if (!resizing) return;
  
    const stage = stageRef.current.getStage();
    const pointerPosition = stage.getPointerPosition();
    
    // Calculate the new dimensions relative to the scale and cursor position
    const newWidth = Math.max(50, (pointerPosition.x - (position.x + selectionBox.x * scale)) / scale);
    const newHeight = Math.max(50, (pointerPosition.y - (position.y + selectionBox.y * scale)) / scale);
  
    // Update the selection box size with the new calculated width and height
    setSelectionBox((prev) => ({
      ...prev,
      width: newWidth,
      height: newHeight,
    }));
  };

  const handleMouseEnter = () => {
    setCursorStyle('se-resize');
  };

  const handleMouseLeave = () => {
    setCursorStyle('default');
  };




  useEffect(() => {
    const storedTappableData = sessionStorage.getItem('tappableData');
    if (storedTappableData) {
      const tappableArray = JSON.parse(storedTappableData);
  
      // Ensure the active tappable matches the currently clicked layer
      const activeTappable = tappableArray.find((tappable) => tappable.tappableId === activeLayerId);
  
      if (activeTappable) {
        console.log('Retrieved tappable data:', activeTappable);
        console.log('Tappable ID:', activeTappable.tappableId);
        console.log('Left position:', activeTappable.left);
        console.log('Top position:', activeTappable.top);
        console.log('Image ID:', activeTappable.imageId);
        console.log('Points:', activeTappable.points);
      } else {
        console.log('No active tappable found for the selected layer.');
      }
    }
  }, [activeLayerId]); // Ensure this effect runs whenever the active layer ID changes
  

  

  const updateImageUrl = (newUrl) => {
    setImageUrl(newUrl);
  };

  const handleLayerActivate = (layerId) => {
    setSelectedLayerId(layerId);
    setIsLayersPanelVisible(true);
    handleLayerTappableClick(layerId);
  };

  

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PropagateLoader color="#0085FF" />
      </div>
    );
  }



// console.log("url",imageUrl?.currentSrc);

   return (
    <div className="relative h-screen">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
      />

<div>
      <button 
        onClick={handleBack}
        className="absolute w-auto top-2 left-2 z-10 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Back
      </button>

      <button 
        onClick={viewBoardPage}
        className="absolute w-auto top-12 left-2 z-10 bg-blue-500 text-white px-4 py-2 rounded"
      >
        viewBoard
      </button>
      </div>
      
      
      <Stage ref={stageRef}
  width={stageSize?.width} 
  height={stageSize?.height} 
  onWheel={handleWheel}
  onClick={handleStageClick}
  onTouchStart={handleStageClick}
  onMouseMove={handleResize}
  onTouchMove={handleResize}
  onMouseUp={handleResizeEnd}
  onTouchEnd={handleResizeEnd}
  style={{ cursor: cursorStyle }}
  x={stateDrag.x}
  y={stateDrag.y}
  draggable
  onDragStart={() => {
    if (!selectionBox) {
      setStateDrag({ isDragging: true });
    }
  }}
  onDragEnd={(e) => {
    if (!selectionBox) {
      setStateDrag({
        isDragging: false,
        x: e.target.x(),
        y: e.target.y(),
      });
    }
  }}
>
  <Layer>
    <Group
      x={position?.x}
      y={position?.y}
      scaleX={scale}
      scaleY={scale}
    >
      {imageUrl && (
        <Image
          image={imageUrl}
          width={imageUrl?.width}
          height={imageUrl?.height}
        />
      )}
     

{/* Render Tappable Areas */}
{tappableAreas.map((area) => (
        <Group
          key={area.id}
          x={area.position.x * imageUrl.width}
          y={area.position.y * imageUrl.height}
        >
          
          {area.content && (
            area.content instanceof HTMLImageElement ? (
              <Image
                image={area.content}
                width={area.size.width * imageUrl.width}
                height={area.size.height * imageUrl.height}
              />
            ) : (
              <Text
                text={area.content}
                fontSize={(area.size.width * imageUrl.width) / 2}
                width={area.size.width * imageUrl.width}
                height={area.size.height * imageUrl.height}
                align="center"
                verticalAlign="middle"
              />
            )
          )}
        </Group>
      ))}

      {selectionBox && (
        <Group
          x={selectionBox?.x}
          y={selectionBox?.y}
          draggable
          onDragMove={handleTappableBoxDragMove}
        >
          {/* Grouping the Rect and the icons together */}
          <Group>
            <Rect
              width={selectionBox?.width}
              height={selectionBox?.height}
              stroke="#0085FF"
              strokeWidth={4 / scale}
              cornerRadius={10 / scale}
            />
            {newTappableType === 'image' && selectedImage && (
                  <Image
                    image={selectedImage}
                    width={selectionBox?.width}
                    height={selectionBox?.height}
                  />
                )}
                {newTappableType === 'emoji' && selectedEmoji && (
                  <Text
                    text={selectedEmoji}
                    fontSize={selectionBox?.width / 2}
                    width={selectionBox?.width}
                    height={selectionBox?.height}
                    align="center"
                    verticalAlign="middle"
                  />
                )}
            <Image
              image={arrowDownCircleIcon}
              x={selectionBox?.width - 20 / scale}
              y={selectionBox?.height - 20 / scale}
              width={20 / scale}
              height={20 / scale}
              onMouseDown={handleResizeStart}
              onTouchStart={handleResizeStart}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            
          </Group>

          <Group
            y={selectionBox?.height + 4 / scale}
            x={selectionBox?.width / 2 - TAPPABLE_BOX_SIZE / 2 / scale}
          >
            <Rect
              width={TAPPABLE_BOX_SIZE / scale}
              height={40 / scale}
              fill="#0085FF"
              cornerRadius={10 / scale}
            />
            <Image
              image={checkSquareIcon}
              x={5 / scale}
              y={10 / scale}
              width={ICON_SIZE / scale}
              height={ICON_SIZE / scale}
              onClick={handleCheckClick}
              onTouchStart={handleCheckClick}
            />
            <Image
              image={plusIcon}
              x={35 / scale}
              y={10 / scale}
              width={ICON_SIZE / scale}
              height={ICON_SIZE / scale}
            />
            <Image
              image={subtractIcon}
              x={68 / scale}
              y={10 / scale}
              width={ICON_SIZE / scale}
              height={ICON_SIZE / scale}
              onClick={handleDeleteClick}
              onTap={handleDeleteClick}
            />
          </Group>
        </Group>
      )}
      {points.map((point, index) => (
        <Circle
          key={index}
          x={point?.x * imageUrl?.width}
          y={point?.y * imageUrl?.height}
          radius={DOT_SIZE / 2 / scale}
          fill="#0085FF"
          onClick={() => handleCircleClick(index)}
        />
      ))}
    </Group>
  </Layer>
</Stage>

     
      <div className="absolute bottom-0 left-0 right-0">
      {/* {console.log("imageUrl",imageUrl?.currentSrc)} */}
        <ActionBar
        boardId={boardId}
        boardImageId={boardImageId}
        imageUrl={imageUrl?.currentSrc}
        onSelectTappableArea={() => handleNewTappableSelect('area')}
        onImageSelect={(image) => {
          handleNewTappableSelect('image');
          handleImageSelect(image);
        }}
        onEmojiSelect={(emoji) => {
          handleNewTappableSelect('emoji');
          handleEmojiSelect(emoji);
        }}
        onLayersToggle={(isVisible) => setIsLayersPanelVisible(isVisible)}
        layers={layers}
        handleUndo={handleUndo}
        handleRedo={handleRedo}
      /></div>
      <LayersPanel
        ref={layersPanelRef}
        isVisible={isLayersPanelVisible}
        tappableContent={tappableContent}
        lastAddedTappableContent={lastAddedTappableContent}
        layers={layers}
        setLayers={setLayers}
        handleFixTappableContent={handleFixTappableContent}
        selectedLayerId={selectedLayerId}
        activeLayerId={activeLayerId}
        onLayerClick={handleLayerClick}
        onLayerDelete={handleLayerDelete}
        onLayerTappableClick={handleLayerTappableClick}
        setActiveTappableId={setActiveTappableId}
        onClose={() => setIsLayersPanelVisible(false)}
        imageUrl={imageUrl?.currentSrc}
        style={{ bottom: "0" }}
      />
      {showDeletePopup && (
        <DeletePopup
          onConfirm={confirmLayerDelete}
          onCancel={cancelLayerDelete}
        />
      )}
    </div>
  );
};

export default EditBoard;




// ----------------------------------**********************--------------------------------


/// might need later 
{/* {tappableAreas.map((area) => (
  <TappableArea
    key={area.id}
    id={area.id}
    activeTappableId={activeTappableId}
    setActiveTappableId={setActiveTappableId}
    onRemove={() => handleRemoveTappableArea(area.id)}
    onFixContent={handleFixTappableContent}
    isActive={area.id === activeTappableId}
    content={area.content}
    // Recalculate position based on current image size
    position={{
      x: area.position.x * imageUrl.width,
      y: area.position.y * imageUrl.height,
    }}
    size={area.size}
    setSize={(size) =>
      setTappableAreas((prev) =>
        prev.map((a) => (a.id === area.id ? { ...a, size } : a))
      )
    }
    imageBounds={imageBounds}
    isFixed={area.isFixed}
    setIsFixed={(isFixed) =>
      setTappableAreas((prev) =>
        prev.map((a) => (a.id === area.id ? { ...a, isFixed } : a))
      )
    }
    onLayerActivate={handleLayerActivate}
  />
))} */}



// const handleCheckClick = async () => {
  //   if (selectionBox) {
  //     const stage = stageRef.current;
  //     const scaleFactor = scale; // Scale factor based on the stage scaling
  
  //     // Get the bounding box details with adjustments for scaling
  //     const captureX = (selectionBox.x * scaleFactor) + position.x;
  //     const captureY = (selectionBox.y * scaleFactor) + position.y;
  //     const captureWidth = selectionBox.width * scaleFactor;
  //     const captureHeight = selectionBox.height * scaleFactor;
  
  //     // Create an offscreen canvas
  //     const captureCanvas = document.createElement('canvas');
  //     captureCanvas.width = captureWidth;
  //     captureCanvas.height = captureHeight;
  //     const captureContext = captureCanvas.getContext('2d');
  
  //     // Draw the stage content onto the offscreen canvas using the calculated area
  //     captureContext.drawImage(
  //       stage.toCanvas(),
  //       captureX,
  //       captureY,
  //       captureWidth,
  //       captureHeight,
  //       0,
  //       0,
  //       captureWidth,
  //       captureHeight
  //     );
  
  //     // Convert the canvas to a Data URL (image format)
  //     const capturedImage = captureCanvas.toDataURL('image/png');
  
  //     // Calculate relative positions based on the image size
  //     const relativeX = selectionBox.x / imageUrl.width;
  //     const relativeY = selectionBox.y / imageUrl.height;
  //     const relativeWidth = selectionBox.width / imageUrl.width;
  //     const relativeHeight = selectionBox.height / imageUrl.height;
  
  //     console.log('Saving relative positions:', { relativeX, relativeY, relativeWidth, relativeHeight });
  
  //     // Store the tappable area with relative positions
  //     const newTappableArea = {
  //       id: `${getRandomNumber(100000, 999999999)}`,
  //       content: newTappableType === 'image' ? selectedImage : 
  //                newTappableType === 'emoji' ? selectedEmoji : 
  //                capturedImage,
  //       position: { x: relativeX, y: relativeY },
  //       size: { width: relativeWidth, height: relativeHeight }
  //     };
  
  //     // Add a new point at the center of the selection box
  //     const centerX = selectionBox.x + selectionBox.width / 2;
  //     const centerY = selectionBox.y + selectionBox.height / 2;
  //     const newPoint = { x: centerX / imageUrl.width, y: centerY / imageUrl.height };
  
  //     // Update the state and save the new tappable area, points, and layers to local storage
  //     setTappableAreas([...tappableAreas, newTappableArea]);
  //     setPoints([...points, newPoint]);
  //     setLayers([...layers, {
  //       id: newTappableArea.id,
  //       name: `Layer ${layers.length + 1}`,
  //       tappableContent: capturedImage,
  //       selectedImage: null,
  //     }]);
  //     setSelectionBox(null);
  //     setNewTappableType(null);
  //     setSelectedImage(null);
  //     setSelectedEmoji(null);
      
  //     // Update points with the new point
  //   const updatedPoints = [...points, newPoint]; // Define updatedPoints correctly
  //   setPoints(updatedPoints);
  //      // Save tappable data including points to session storage

  //      // Calculate the exact pixel positions based on the loaded image dimensions
  //   const pointX = newPoint.x * imageUrl.width;
  //   const pointY = newPoint.y * imageUrl.height;

  //   // Log calculated points for verification
  //   console.log(`Calculated Point: X=${pointX}, Y=${pointY}`);

  //   // const tappableData = {
  //   //   tappableId: newTappableArea.id,
  //   //   left:pointX,
  //   //   top: pointY,
  //   //   imageId: boardImageId,
  //   //   points: updatedPoints, // Include points
  //   // };
  //   // sessionStorage.setItem("tappableData", JSON.stringify(tappableData));

  //   // Retrieve existing tappables from session storage
  //   const existingTappables = JSON.parse(sessionStorage.getItem('tappableData')) || [];

  //   // Add the new tappable
  //   existingTappables.push({
  //     tappableId: newTappableArea.id,
  //     left: pointX,
  //     top: pointY,
  //     imageId: boardImageId,
  //     points: updatedPoints,
  //   });

  //   // Store the updated tappables
  //   sessionStorage.setItem('tappableData', JSON.stringify(existingTappables));

  //   // sessionStorage.setItem(`tappableData-${newTappableArea.id}`, JSON.stringify(tappableData));

  
  //     // Save tappables and points to local storage for ViewBoard
  //     const dataToSave = {
  //       tappableAreas: [...tappableAreas, newTappableArea],
  //       points: [...points, newPoint],
  //       imageUrl: imageUrl?.currentSrc,
  //     };
  //     localStorage.setItem('editBoardData', JSON.stringify(dataToSave));

        
  

  //   }
  // };





    // try {
      //   // Continue with the rest of your async code
      //   const storedToken = localStorage.getItem("token");
      //   const payload = {
      //     addContentImagesLinks: [],
      //     imageId: boardImageId,
      //     top: position.y.toString(),
      //     left: position.x.toString(),
      //   };
  
      //   const tappableData = {
      //     tappableId: activeTappableId,
      //     left: position.x.toString(),
      //     top: position.y.toString(),
      //     imageId: boardImageId,
      //   };
  
      //   sessionStorage.setItem("tappableData", JSON.stringify(tappableData));
  
      //   const response = await fetch(`${baseURL}/board/createTappable`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${storedToken}`,
      //     },
      //     body: JSON.stringify(payload),
      //   });
  
      //   if (response.ok) {
      //     const result = await response.json();
      //     console.log("Tappable created successfully:", result);
      //   } else {
      //     console.error(
      //       "Failed to create tappable:",
      //       response.status,
      //       response.statusText
      //     );
      //   }
      // } catch (error) {
      //   console.error("Error creating tappable:", error);
      // }


  
  // const handleResizeStart = (e) => {
  //   e.cancelBubble = true;
  //   setResizing(true);
  // };

  // const handleResizeEnd = () => {
  //   setResizing(false);
  // };

  // const handleResize = (e) => {
  //   if (!resizing) return;

  //   const stage = e.target.getStage();
  //   const pointerPosition = stage.getPointerPosition();
  //   const newWidth = Math.max(50, (pointerPosition.x - position.x - selectionBox.x) / scale);
  //   const newHeight = Math.max(50, (pointerPosition.y - position.y - selectionBox.y) / scale);

  //   setSelectionBox({
  //     ...selectionBox,
  //     width: newWidth,
  //     height: newHeight,
  //   });
  // };




















// Reduced UseEffects


// import React, { useContext, useRef, useState, useEffect } from "react";
// import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
// import { fabric } from "fabric";
// import { useLocation, useNavigate } from "react-router-dom";
// import { ImageContext } from "./ImageContext/ImageContext";
// import Hammer from "hammerjs";
// import ActionBar from "./ActionBar/ActionBar";
// import TappableArea from "./ActionBar/NewTappeable/TappableArea";
// import LayersPanel from "./ActionBar/Layers/Layers";
// import DeletePopup from "./ActionBar/NewTappeable/DeletePopup";

// const EditBoard = ({ cameraImage }) => {
//   const { editor, onReady } = useFabricJSEditor();
//   const { layerImageUrl } = useContext(ImageContext);
//   const [activeLayerId, setActiveLayerId] = useState(null);
//   const [isPanZoomEnabled, setIsPanZoomEnabled] = useState(true);
//   const [layers, setLayers] = useState(
//     JSON.parse(localStorage.getItem("layers")) || []
//   );
//   const [tappableAreas, setTappableAreas] = useState(
//     JSON.parse(localStorage.getItem("tappableAreas")) || []
//   );
//   const [activeTappable, setActiveTappable] = useState(null);
//   const [jsonContent, setJsonContent] = useState("");
//   const canvasRef = useRef(null);
//   const layersPanelRef = useRef(null);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { createBlankCanvas, editedImage, changedBG } = location.state || {};

//   const [showTappableArea, setShowTappableArea] = useState(false);
//   const [tappablePosition, setTappablePosition] = useState({ x: 0, y: 0 });
//   const [showNewTappable, setShowNewTappable] = useState(false);
//   const [lastAddedTappableContent, setLastAddedTappableContent] = useState(null);
//   const [activeTappableId, setActiveTappableId] = useState(
//     localStorage.getItem("activeTappableId") || null
//   );
//   const [imageBounds, setImageBounds] = useState({
//     left: 0,
//     top: 0,
//     width: 0,
//     height: 0,
//   });
//   const boardId = sessionStorage.getItem("boardId");
//   const boardImageId = sessionStorage.getItem("boardImageId");
//   const [isLayersPanelVisible, setIsLayersPanelVisible] = useState(false);
//   const [tappableContent, setTappableContent] = useState(null);
//   const imageUrl =
//     changedBG ||
//     editedImage ||
//     JSON.parse(sessionStorage.getItem("state"))?.imageUrl;

//   const [selectedLayerId, setSelectedLayerId] = useState(null);
//   const [showDeletePopup, setShowDeletePopup] = useState(false);
//   const [layerToDelete, setLayerToDelete] = useState(null);
//   const [undoStack, setUndoStack] = useState([]);
//   const [redoStack, setRedoStack] = useState([]);

//   useEffect(() => {
//     const storedState = JSON.parse(sessionStorage.getItem("state")) || {};
//     const updatedState = { ...storedState, imageUrl };
//     sessionStorage.setItem("state", JSON.stringify(updatedState));

//     if (activeTappableId) {
//       localStorage.setItem("activeTappableId", activeTappableId);
//     } else {
//       localStorage.removeItem("activeTappableId");
//     }

//     if (location.pathname === "/boardBuilder") {
//       localStorage.removeItem("tappableAreas");
//       localStorage.removeItem("layers");
//       localStorage.removeItem("currentImage");
//     }
//   }, [imageUrl, activeTappableId, location.pathname]);

//   useEffect(() => {
//     const canvas = editor?.canvas;
//     if (!canvas) return;

//     canvas.on("mouse:wheel", function (opt) {
//       const delta = opt.e.deltaY;
//       let zoom = canvas.getZoom();
//       zoom *= 0.999 ** delta;
//       if (zoom > 20) zoom = 20;
//       if (zoom < 0.01) zoom = 0.01;
//       canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
//       opt.e.preventDefault();
//       opt.e.stopPropagation();
//       updateTappableAreasPosition();
//     });

//     canvas.on("mouse:down", function (opt) {
//       if (opt.e.altKey === true) {
//         isDragging = true;
//         canvas.selection = false;
//         lastPosX = opt.e.clientX;
//         lastPosY = opt.e.clientY;
//       }
//     });

//     canvas.on("mouse:move", function (opt) {
//       if (isDragging) {
//         const e = opt.e;
//         const vpt = canvas.viewportTransform;
//         vpt[4] += e.clientX - lastPosX;
//         vpt[5] += e.clientY - lastPosY;
//         canvas.requestRenderAll();
//         lastPosX = e.clientX;
//         lastPosY = e.clientY;
//         updateTappableAreasPosition();
//       }
//     });

//     canvas.on("mouse:up", function () {
//       isDragging = false;
//       canvas.selection = true;
//     });

//     let isDragging = false;
//     let lastPosX = 0;
//     let lastPosY = 0;

//     updateTappableAreasPosition();

//     const handleClickOutside = (event) => {
//       if (
//         canvasRef.current &&
//         !canvasRef.current.contains(event.target) &&
//         layersPanelRef.current &&
//         !layersPanelRef.current.contains(event.target)
//       ) {
//         setIsLayersPanelVisible(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [editor?.canvas]);

//   useEffect(() => {
//     addImagesToCanvas();

//     const canvas = editor?.canvas;
//     if (canvas && imageUrl) {
//       const { innerWidth: width, innerHeight: height } = window;
//       canvas.setWidth(width);
//       canvas.setHeight(height - height * 0.2);

//       fabric.Image.fromURL(
//         imageUrl,
//         function (img) {
//           const imgAspectRatio = img.width / img.height;
//           const canvasAspectRatio = canvas.width / canvas.height;

//           let bgWidth, bgHeight;

//           if (imgAspectRatio > canvasAspectRatio) {
//             bgWidth = canvas.width;
//             bgHeight = canvas.width / imgAspectRatio;
//           } else {
//             bgHeight = canvas.height;
//             bgWidth = canvas.height * imgAspectRatio;
//           }

//           img.scaleToWidth(bgWidth);
//           img.scaleToHeight(bgHeight);

//           img.set({
//             originX: "center",
//             originY: "center",
//             left: canvas.width / 2,
//             top: canvas.height / 2,
//           });

//           setImageBounds({
//             left: canvas.width / 2 - bgWidth / 2,
//             top: canvas.height / 2 - bgHeight / 2,
//             width: bgWidth,
//             height: bgHeight,
//           });

//           canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
//             selectable: false,
//             evented: false,
//           });

//           img.on("modified", () => {
//             setImageBounds({
//               left: img.left - (img.width * img.scaleX) / 2,
//               top: img.top - (img.height * img.scaleY) / 2,
//               width: img.width * img.scaleX,
//               height: img.height * img.scaleY,
//             });
//           });
//         },
//         { crossOrigin: "" }
//       );
//     }

//     if (canvas) {
//       canvasRef.current = canvas;
//     }
//   }, [editor?.canvas, imageUrl, layers, layerImageUrl]);

//   useEffect(() => {
//     const canvas = editor?.canvas;
//     if (canvas && cameraImage) {
//       const context = canvas.getContext("2d");
//       const image = new Image();
//       image.src = cameraImage;
//       image.onload = () => {
//         canvas.width = image.width;
//         canvas.height = image.height;
//         context.drawImage(image, 0, 0, canvas.width, canvas.height);
//       };
//     }

//     const resizeCanvas = () => {
//       if (editor?.canvas && createBlankCanvas) {
//         const canvas = editor.canvas;
//         const { innerWidth: width, innerHeight: height } = window;
//         canvas.setWidth(width);
//         canvas.setHeight(height - height * 0.2);
//         const rect = new fabric.Rect({
//           left: 0,
//           top: 0,
//           fill: "white",
//           width: canvas.width,
//           height: canvas.height,
//           selectable: false,
//         });
//         canvas.add(rect);
//         canvas.renderAll();
//       }
//     };

//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);
//     return () => {
//       window.removeEventListener("resize", resizeCanvas);
//     };
//   }, [editor?.canvas, createBlankCanvas, cameraImage]);

//   useEffect(() => {
//     if (!location.state || !location.state.imageUrl) {
//       setTappableAreas([]);
//       setLayers([]);
//       setActiveTappable(null);
//       setShowTappableArea(false);
//       setTappableContent(null);
//       setIsPanZoomEnabled(true);
//     }

//     const tappableAreasByImage =
//       JSON.parse(localStorage.getItem("tappableAreasByImage")) || {};
//     if (tappableAreasByImage[imageUrl]) {
//       setTappableAreas(tappableAreasByImage[imageUrl]);
//       setLayers(
//         tappableAreasByImage[imageUrl].map((area) => ({
//           id: area.id,
//           name: `Layer ${area.id}`,
//           tappableContent: area.content,
//           selectedImage: null,
//         }))
//       );
//     }

//     const storedTappableAreas =
//       JSON.parse(localStorage.getItem("tappableAreas")) || [];
//     const storedLayers = JSON.parse(localStorage.getItem("layers")) || [];
//     setTappableAreas(storedTappableAreas);
//     setLayers(storedLayers);
//   }, [imageUrl, location.state]);

//   useEffect(() => {
//     localStorage.setItem("tappableAreas", JSON.stringify(tappableAreas));
//     localStorage.setItem("layers", JSON.stringify(layers));
//   }, [tappableAreas, layers]);

//   const updateImageUrl = (newUrl) => {
//     setImageUrl(newUrl);
//   };

//   const updateTappableAreasPosition = () => {
//     const canvas = editor?.canvas;
//     if (!canvas) return;

//     const zoom = canvas.getZoom();
//     const vpt = canvas.viewportTransform;

//     setTappableAreas((prevAreas) =>
//       prevAreas.map((area) => ({
//         ...area,
//         position: {
//           x: area.originalPosition.x * zoom + vpt[4],
//           y: area.originalPosition.y * zoom + vpt[5],
//         },
//       }))
//     );
//   };

//   const handleLayerActivate = (layerId) => {
//     setSelectedLayerId(layerId);
//     setIsLayersPanelVisible(true);
//     handleLayerTappableClick(layerId);
//   };

//   const addImagesToCanvas = () => {
//     const canvas = editor?.canvas;
//     if (!canvas) return;

//     setUndoStack((prev) => [...prev, { tappableAreas, layers }]);
//     setRedoStack([]);

//     fabric.Image.fromURL(
//       layerImageUrl,
//       function (oImg) {
//         oImg.set({
//           selectable: true,
//           evented: true,
//           originX: "center",
//           originY: "center",
//           hasControls: true,
//           hasBorders: true,
//         });

//         canvas.add(oImg);
//         canvas.requestRenderAll();
//       },
//       { crossOrigin: "" }
//     );
//   };

//   const addTappableArea = (content = null) => {
//     if (activeTappableId) {
//       alert(
//         "Please finish placing the current tappable element before creating a new one."
//       );
//       return;
//     }

//     const newTappableArea = {
//       id: `${getRandomNumber(100000, 999999999)}`,
//       position: { x: tappablePosition.x, y: tappablePosition.y },
//       originalPosition: { x: tappablePosition.x, y: tappablePosition.y },
//       size: content ? { width: 100, height: 100 } : { width: 100, height: 100 },
//       content,
//       isVisible: true,
//       isFixed: false,
//     };

//     const newLayer = {
//       id: newTappableArea.id,
//       name: `Layer ${layers.length + 1}`,
//       tappableContent: content,
//       selectedImage: null,
//     };

//     setTappableAreas((prev) => {
//       const updatedAreas = [...prev, newTappableArea];
//       saveCanvasAsJson(updatedAreas, [...layers, newLayer]);
//       return updatedAreas;
//     });

//     setLayers((prev) => [...prev, newLayer]);
//     setShowTappableArea(true);
//     setTappableContent(null);
//     setIsPanZoomEnabled(false);
//     setActiveTappable(newTappableArea);
//     setActiveTappableId(newTappableArea.id);
//   };

//   const handleSelectTappableArea = () => {
//     const centerX = imageBounds.left + imageBounds.width / 2;
//     const centerY = imageBounds.top + imageBounds.height / 2;
//     setTappablePosition({ x: centerX, y: centerY });
//     setShowTappableArea(true);
//     setShowNewTappable(false);
//     addTappableArea();
//   };

//   const handleRemoveTappableArea = (id) => {
//     // Save current state to undo stack
//     setUndoStack((prev) => [...prev, { tappableAreas, layers }]);
//     // setRedoStack([]); // Clear the redo stack when a new action is performed

//     setTappableAreas((prev) => prev.filter((area) => area.id !== id));
//     setLayers((prev) => prev.filter((layer) => layer.id !== id));
//     setShowTappableArea(false);
//     setTappableContent(null);
//     setIsPanZoomEnabled(true);
//     setActiveTappable(null);
//     setActiveTappableId(null); // Reset active tappable ID
//     setTappableAreas((prev) =>
//       prev.map((area) => ({ ...area, isVisible: true }))
//     ); // Activate all tappable areas
//   };

//   const handleUndo = () => {
//     // console.log("Undo stack before undo:", undoStack);
//     // console.log("Redo stack before undo:", redoStack);/

//     if (undoStack.length === 0) return;

//     const lastState = undoStack.pop();
//     setRedoStack((prev) => [...prev, { tappableAreas, layers }]); // Save current state to redo stack

//     setTappableAreas(lastState.tappableAreas);
//     setLayers(lastState.layers);
//     setUndoStack([...undoStack]); // Update undo stack

//     // console.log("Undo stack after undo:", undoStack);
//     // console.log("Redo stack after undo:", redoStack);
//   };

//   const handleRedo = () => {
//     // console.log("Undo stack before redo:", undoStack);
//     // console.log("Redo stack before redo:", redoStack);

//     if (redoStack.length === 0) return;

//     const lastState = redoStack.pop();
//     setUndoStack((prev) => [...prev, { tappableAreas, layers }]); // Save current state to undo stack

//     setTappableAreas(lastState.tappableAreas);
//     setLayers(lastState.layers);
//     setRedoStack([...redoStack]); // Update redo stack

//     // console.log("Undo stack after redo:", undoStack);
//     // console.log("Redo stack after redo:", redoStack);
//   };

//   const handleLayerDelete = (layerId) => {
//     setLayerToDelete(layerId);
//     setShowDeletePopup(true);
//   };

//   const confirmLayerDelete = () => {
//     if (layerToDelete) {
//       setLayers((prev) => {
//         const updatedLayers = prev.filter(
//           (layer) => layer.id !== layerToDelete
//         );
//         saveCanvasAsJson(tappableAreas, updatedLayers);
//         return updatedLayers;
//       });
//       setTappableAreas((prev) =>
//         prev.filter((area) => area.id !== layerToDelete)
//       );
//       setActiveTappable(null);
//       setShowDeletePopup(false);
//       setLayerToDelete(null);
//       setActiveTappableId(null); // Reset active tappable ID
//       setTappableAreas((prev) =>
//         prev.map((area) => ({ ...area, isVisible: true }))
//       ); // Activate all tappable areas
//     }
//   };

//   const cancelLayerDelete = () => {
//     setShowDeletePopup(false);
//     setLayerToDelete(null);
//   };

//   const handleFixTappableContent = (id, content, position, size) => {
//     setTappableAreas((prev) =>
//       prev.map((area) =>
//         area.id === id ? { ...area, isFixed: true, position, size } : area
//       )
//     );
//     setActiveTappableId(null);
//     setIsPanZoomEnabled(true);
//   };

//   const toggleTappableVisibility = (id) => {
//     setTappableAreas((prev) =>
//       prev.map((area) =>
//         area.id === id ? { ...area, isVisible: !area.isVisible } : area
//       )
//     );
//   };

//   const handleImageSelect = (imageData) => {
//     setTappableContent(imageData);
//     setShowTappableArea(true);
//     setShowNewTappable(false);
//     addTappableArea(imageData);
//   };

//   const handleEmojiSelect = (emoji) => {
//     setTappableContent(emoji);
//     setShowTappableArea(true);
//     setShowNewTappable(false);
//     addTappableArea(emoji);
//   };

//   const handleNewTappableClose = () => {
//     setShowNewTappable(false);
//   };

//   const handleCheckSquareClick = (id, content, position, size) => {
//     if (content) {
//       toggleTappableVisibility(id);
//     } else {
//       const canvas = editor?.canvas;
//       const zoom = canvas.getZoom();
//       const vpt = canvas.viewportTransform;

//       const adjustedPosition = {
//         x: (position.x - vpt[4]) / zoom,
//         y: (position.y - vpt[5]) / zoom,
//       };

//       const adjustedSize = {
//         width: size.width / zoom,
//         height: size.height / zoom,
//       };

//       handleFixTappableContent(id, content, adjustedPosition, adjustedSize);
//     }

//     setActiveTappableId(null);
//     if (!content) {
//       const capturedContent = captureBackgroundArea(position, size);
//       const updatedLayers = layers.map((layer) => {
//         if (layer.id === id) {
//           return {
//             ...layer,
//             tappableContent: capturedContent,
//           };
//         }
//         return layer;
//       });
//       setLayers(updatedLayers);
//       setTappableContent(content);
//     }

//     setActiveTappable(null);
//     setActiveLayerId(id); // Set the active layer ID
//     setIsLayersPanelVisible(true); // Make sure the layers panel is visible
//     const updatedTappableAreas = tappableAreas.map((area) =>
//       area.id === id
//         ? { ...area, content, position, size, isFixed: true }
//         : area
//     );
//     const essentialData = updatedTappableAreas.map(
//       ({ id, content, position, size, isFixed }) => ({
//         id,
//         content,
//         position,
//         size,
//         isFixed,
//       })
//     );

//     try {
//       localStorage.setItem(
//         `${imageUrl}`,
//         JSON.stringify(essentialData)
//       );
//     } catch (e) {
//       console.error("Error saving to localStorage:", e);
//     }

//     const tappableData = {
//       canvas: editor?.canvas.toJSON(),
//       tappableAreas,
//     };
//     console.log("tappableData: ",tappableData)
//     localStorage.setItem(
//       "fullImageWithTappables",
//       JSON.stringify(tappableData)
//     );
//   };

//   const handleCircleClick = (id) => {
//     setSelectedLayerId(id);
//     setIsLayersPanelVisible(true);
//     setTappableAreas((prev) =>
//       prev.map((area) =>
//         area.id === id
//           ? { ...area, isVisible: true }
//           : { ...area, isVisible: false }
//       )
//     );
//   };

//   const handleLayerTappableClick = (layerId) => {
//     setActiveTappableId(layerId); // Set the active tappable area
//     setTappableAreas((prev) =>
//       prev.map((area) => ({
//         ...area,
//         isVisible: area.id === layerId, // Ensure only one tappable area is visible
//       }))
//     );
//   };

//   const handleLayerClick = (id) => {
//     setTappableAreas((prev) =>
//       prev.map((area) =>
//         area.id === id
//           ? { ...area, isVisible: true }
//           : { ...area, isVisible: false }
//       )
//     );
//     setSelectedLayerId(id);
//   };

//   const getZoomLevel = (canvas) => {
//     const viewportTransform = canvas.viewportTransform;
//     const scaleX = viewportTransform[0];
//     const scaleY = viewportTransform[3];
//     return Math.sqrt(scaleX * scaleY);
//   };

//   const calculateAdjustedCoordinates = (tappableAreas) => {
//     const canvas = editor?.canvas;
//     const zoom = getZoomLevel(canvas);

//     const adjustedCoordinates = [];

//     canvas.getObjects().forEach((obj) => {
//       const { left, top, width, height, id, text, fill, stroke, imageLink } =
//         obj;

//       const adjustedLeft = left * zoom;
//       const adjustedTop = top * zoom;
//       const adjustedWidth = width * zoom;
//       const adjustedHeight = height * zoom;

//       adjustedCoordinates.push({
//         id,
//         left: adjustedLeft,
//         top: adjustedTop,
//         width: adjustedWidth,
//         height: adjustedHeight,
//         zoom,
//         text,
//         fill,
//         stroke,
//         imageLink,
//       });
//     });

//     tappableAreas.forEach((area) => {
//       adjustedCoordinates.push({
//         id: area.id,
//         left: area.position.x,
//         top: area.position.y,
//         width: area.size.width,
//         height: area.size.height,
//         content: area.content,
//       });
//     });

//     return adjustedCoordinates;
//   };

//   const handleCanvasClick = (event) => {
//     if (activeTappable) return;
//     if (activeTappableId) return;

//     const rect = event.target.getBoundingClientRect();
//     const clientX = event.touches ? event.touches[0].clientX : event.clientX;
//     const clientY = event.touches ? event.touches[0].clientY : event.clientY;

//     const canvas = editor?.canvas;
//     const zoom = canvas.getZoom();
//     const vpt = canvas.viewportTransform;

//     const x = (clientX - rect.left - vpt[4]) / zoom;
//     const y = (clientY - rect.top - vpt[5]) / zoom;

//     const newTappableArea = {
//       id: `${getRandomNumber(100000, 999999999)}`,
//       position: { x, y },
//       originalPosition: { x, y },
//       size: { width: 100, height: 100 },
//       content: null,
//       isVisible: true,
//     };

//     const newLayer = {
//       id: newTappableArea.id,
//       name: `Layer ${layers.length + 1}`,
//       tappableContent: null,
//       selectedImage: null,
//     };

//     setTappableAreas((prev) => {
//       const updatedAreas = [...prev, newTappableArea];
//       saveCanvasAsJson(updatedAreas, [...layers, newLayer]);
//       return updatedAreas;
//     });

//     setLayers((prev) => [...prev, newLayer]);
//     setTappablePosition({ id: newTappableArea.id, x, y });
//     setShowTappableArea(true);
//     setTappableContent(null);
//     setIsPanZoomEnabled(false);
//     setActiveTappable(newTappableArea);
//     setActiveTappableId(newTappableArea.id);

//     const json = editor?.canvas.toJSON();
//     // console.log("Display JSON");
//     // console.log(json);

//     const adjustedCoords = calculateAdjustedCoordinates(tappableAreas);
//     // console.log("Display Coordinates");
//     // console.log(adjustedCoords);
//   };

//   const getRandomNumber = (min, max) => {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   };

//   const saveCanvasAsJson = (tappableAreas, layers) => {
//     const json = {
//       canvas: editor?.canvas.toJSON(),
//       tappableAreas: calculateAdjustedCoordinates(tappableAreas),
//     };
//     setJsonContent(JSON.stringify(json, null, 2));
//     const tappableAreasByImage =
//       JSON.parse(localStorage.getItem("tappableAreasByImage")) || {};
//     tappableAreasByImage[imageUrl] = tappableAreas;
//     localStorage.setItem(
//       "tappableAreasByImage",
//       JSON.stringify(tappableAreasByImage)
//     );
//     tappableAreas.forEach((area) => {
//       if (area.content && area.content.startsWith("data:image")) {
//         json.tappableAreas.find((a) => a.id === area.id).content = area.content;
//       }
//     });
//     setJsonContent(JSON.stringify(json, null, 2));
//     // localStorage.setItem(`layers_${imageUrl}`, JSON.stringify(layers));
//     localStorage.setItem(`${imageUrl}`, JSON.stringify(layers));
//     // console.log("Saved tappable areas for image:", imageUrl, tappableAreas);
//   };

//   const handleChangeBackground = (changedBG) => {
//     updateImageUrl(changedBG);
//     const canvas = editor?.canvas;
//     if (!canvas) return;

//     fabric.Image.fromURL(
//       changedBG,
//       function (img) {
//         const imgAspectRatio = img.width / img.height;
//         const canvasAspectRatio = canvas.width / canvas.height;

//         let bgWidth, bgHeight;

//         if (imgAspectRatio > canvasAspectRatio) {
//           bgWidth = canvas.width;
//           bgHeight = canvas.width / imgAspectRatio;
//         } else {
//           bgHeight = canvas.height;
//           bgWidth = canvas.height * imgAspectRatio;
//         }

//         img.scaleToWidth(bgWidth);
//         img.scaleToHeight(bgHeight);

//         img.set({
//           originX: "center",
//           originY: "center",
//           left: canvas.width / 2,
//           top: canvas.height / 2,
//         });

//         setImageBounds({
//           left: canvas.width / 2 - bgWidth / 2,
//           top: canvas.height / 2 - bgHeight / 2,
//           width: bgWidth,
//           height: bgHeight,
//         });

//         canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
//           selectable: false,
//           evented: false,
//         });

//         setLayers((prevLayers) =>
//           prevLayers.map((layer) =>
//             layer.id === "background-layer"
//               ? { ...layer, tappableContent: changedBG }
//               : layer
//           )
//         );

//         canvas.renderAll();
//       },
//       { crossOrigin: "" }
//     );
//   };

//   const captureBackgroundArea = (position, size) => {
//     const canvas = editor?.canvas;
//     if (!canvas) return null;

//     const zoom = canvas.getZoom();
//     const vpt = canvas.viewportTransform;

//     const left = position.x / zoom - vpt[4] / zoom;
//     const top = position.y / zoom - vpt[5] / zoom;
//     const width = size.width / zoom;
//     const height = size.height / zoom;

//     const dataUrl = canvas.toDataURL({
//       left,
//       top,
//       width,
//       height,
//     });

//     return dataUrl;
//   };

//   return (
//     <div className="App container">
//       <div
//         className="canvas-container"
//         ref={canvasRef}
//         onClick={handleCanvasClick}
//         onTouchStart={handleCanvasClick}
//       >
//         {isPanZoomEnabled ? "" : ""}
//         <FabricJSCanvas className="fabric-canvas" onReady={onReady} />
//       </div>
//       <ActionBar
//         boardId={boardId}
//         boardImageId={boardImageId}
//         imageUrl={imageUrl}
//         onSelectTappableArea={handleSelectTappableArea}
//         onImageSelect={handleImageSelect}
//         onEmojiSelect={handleEmojiSelect}
//         onLayersToggle={(isVisible) => setIsLayersPanelVisible(isVisible)}
//         layers={layers}
//         handleUndo={handleUndo}
//         handleRedo={handleRedo}
//       />
//       <LayersPanel
//         ref={layersPanelRef}
//         isVisible={isLayersPanelVisible}
//         tappableContent={tappableContent}
//         lastAddedTappableContent={lastAddedTappableContent}
//         layers={layers}
//         setLayers={setLayers}
//         handleFixTappableContent={handleFixTappableContent}
//         selectedLayerId={selectedLayerId}
//         activeLayerId={activeLayerId}
//         onLayerClick={handleLayerClick}
//         onLayerDelete={handleLayerDelete}
//         onLayerTappableClick={handleLayerTappableClick}
//         setActiveTappableId={setActiveTappableId}
//         onClose={() => setIsLayersPanelVisible(false)}
//         imageUrl={imageUrl}
//         onChangeBackground={handleChangeBackground}
//         style={{ bottom: "0" }}
//       />
//       {showDeletePopup && (
//         <DeletePopup
//           onConfirm={confirmLayerDelete}
//           onCancel={cancelLayerDelete}
//         />
//       )}

//       {tappableAreas.map((area) => (
//         <TappableArea
//           key={area.id}
//           id={area.id}
//           activeTappableId={activeTappableId}
//           setActiveTappableId={setActiveTappableId}
//           onRemove={() => handleRemoveTappableArea(area.id)}
//           onFixContent={handleFixTappableContent}
//           isActive={area.id === activeTappableId}
//           content={area.content}
//           position={area.position}
//           setPosition={(position) =>
//             setTappableAreas((prev) =>
//               prev.map((a) => (a.id === area.id ? { ...a, position } : a))
//             )
//           }
//           size={area.size}
//           setSize={(size) =>
//             setTappableAreas((prev) =>
//               prev.map((a) => (a.id === area.id ? { ...a, size } : a))
//             )
//           }
//           imageBounds={imageBounds}
//           onCheckSquareClick={handleCheckSquareClick}
//           isFixed={area.isFixed}
//           setIsFixed={(isFixed) =>
//             setTappableAreas((prev) =>
//               prev.map((a) => (a.id === area.id ? { ...a, isFixed } : a))
//             )
//           }
//           onLayerActivate={handleLayerActivate}
//           editor={editor}
//         />
//       ))}
//     </div>
//   );
// };

// export default EditBoard;



















/// with all useEffect
// import React, { useContext, useRef, useState, useEffect } from "react";
// import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
// import { fabric } from "fabric";
// import { useLocation, useNavigate } from "react-router-dom";
// import { ImageContext } from "./ImageContext/ImageContext";
// import Hammer from "hammerjs";
// import ActionBar from "./ActionBar/ActionBar";
// import TappableArea from "./ActionBar/NewTappeable/TappableArea";
// import LayersPanel from "./ActionBar/Layers/Layers";
// import DeletePopup from "./ActionBar/NewTappeable/DeletePopup";

// const EditBoard = ({ cameraImage }) => {
//   const { editor, onReady } = useFabricJSEditor();
//   const { layerImageUrl } = useContext(ImageContext);
//   const [activeLayerId, setActiveLayerId] = useState(null);
//   const [isPanZoomEnabled, setIsPanZoomEnabled] = useState(true);
//   const [layers, setLayers] = useState(
//     JSON.parse(localStorage.getItem("layers")) || []
//   );
//   const [tappableAreas, setTappableAreas] = useState(
//     JSON.parse(localStorage.getItem("tappableAreas")) || []
//   );
//   const [activeTappable, setActiveTappable] = useState(null);
//   const [jsonContent, setJsonContent] = useState("");
//   const canvasRef = useRef(null);
//   const layersPanelRef = useRef(null);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { createBlankCanvas, editedImage, changedBG } = location.state || {};
//   // console.log("changedBG" + changedBG);
//   // console.log("editedImage : " + editedImage);

//   const [showTappableArea, setShowTappableArea] = useState(false);
//   const [tappablePosition, setTappablePosition] = useState({ x: 0, y: 0 });
//   const [showNewTappable, setShowNewTappable] = useState(false);
//   const [lastAddedTappableContent, setLastAddedTappableContent] =
//     useState(null);
//   const [activeTappableId, setActiveTappableId] = useState(
//     localStorage.getItem("activeTappableId") || null
//   );
//   const [imageBounds, setImageBounds] = useState({
//     left: 0,
//     top: 0,
//     width: 0,
//     height: 0,
//   });
//   const boardId = sessionStorage.getItem("boardId");
//   const boardImageId = sessionStorage.getItem("boardImageId");
//   const [isLayersPanelVisible, setIsLayersPanelVisible] = useState(false);
//   const [tappableContent, setTappableContent] = useState(null);
//   const imageUrl =
//     changedBG ||
//     editedImage ||
//     JSON.parse(sessionStorage.getItem("state"))?.imageUrl;

//   // const [imageUrl, setImageUrl] = useState(() => {
//   //   const storedState = JSON.parse(sessionStorage.getItem("state")) || {};
//   //   return changedBG || editedImage || storedState.imageUrl;
//   // });
//   const [selectedLayerId, setSelectedLayerId] = useState(null);
//   const [showDeletePopup, setShowDeletePopup] = useState(false);
//   const [layerToDelete, setLayerToDelete] = useState(null);
//   const [undoStack, setUndoStack] = useState([]);
//   const [redoStack, setRedoStack] = useState([]);

//   useEffect(() => {
//     const storedState = JSON.parse(sessionStorage.getItem("state")) || {};
//     const updatedState = { ...storedState, imageUrl };
//     sessionStorage.setItem("state", JSON.stringify(updatedState));
//   }, [imageUrl]);

//   useEffect(() => {
//     if (activeTappableId) {
//       localStorage.setItem("activeTappableId", activeTappableId);
//     } else {
//       localStorage.removeItem("activeTappableId");
//     }
//   }, [activeTappableId]);

//   // Clear local storage when coming from /boardBuilder
//   useEffect(() => {
//     if (location.pathname === "/boardBuilder") {
//       localStorage.removeItem("tappableAreas");
//       localStorage.removeItem("layers");
//       localStorage.removeItem("currentImage");
//     }
//   }, [location]);

//   useEffect(() => {
//     const canvas = editor?.canvas;
//     if (!canvas) return;

//     // Enable zooming
//     canvas.on("mouse:wheel", function (opt) {
//       const delta = opt.e.deltaY;
//       let zoom = canvas.getZoom();
//       zoom *= 0.999 ** delta;
//       if (zoom > 20) zoom = 20;
//       if (zoom < 0.01) zoom = 0.01;
//       canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
//       opt.e.preventDefault();
//       opt.e.stopPropagation();
//       updateTappableAreasPosition();
//     });

//     // Enable panning
//     canvas.on("mouse:down", function (opt) {
//       if (opt.e.altKey === true) {
//         isDragging = true;
//         canvas.selection = false;
//         lastPosX = opt.e.clientX;
//         lastPosY = opt.e.clientY;
//       }
//     });

//     canvas.on("mouse:move", function (opt) {
//       if (isDragging) {
//         const e = opt.e;
//         const vpt = canvas.viewportTransform;
//         vpt[4] += e.clientX - lastPosX;
//         vpt[5] += e.clientY - lastPosY;
//         canvas.requestRenderAll();
//         lastPosX = e.clientX;
//         lastPosY = e.clientY;
//         updateTappableAreasPosition();
//       }
//     });

//     canvas.on("mouse:up", function () {
//       isDragging = false;
//       canvas.selection = true;
//     });

//     let isDragging = false;
//     let lastPosX = 0;
//     let lastPosY = 0;

//     updateTappableAreasPosition();
//   }, [editor?.canvas]);

//   const updateImageUrl = (newUrl) => {
//     setImageUrl(newUrl);
//   };
//   const updateTappableAreasPosition = () => {
//     const canvas = editor?.canvas;
//     if (!canvas) return;

//     const zoom = canvas.getZoom();
//     const vpt = canvas.viewportTransform;

//     setTappableAreas((prevAreas) =>
//       prevAreas.map((area) => ({
//         ...area,
//         position: {
//           x: area.originalPosition.x * zoom + vpt[4],
//           y: area.originalPosition.y * zoom + vpt[5],
//         },
//       }))
//     );
//   };

//   const handleLayerActivate = (layerId) => {
//     setSelectedLayerId(layerId);
//     setIsLayersPanelVisible(true);
//     handleLayerTappableClick(layerId);
//   };

//   useEffect(() => {
//     addImagesToCanvas();
//   }, [editor?.canvas, layers, layerImageUrl]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       // Check if the click is outside the canvas and the LayersPanel
//       if (
//         canvasRef.current &&
//         !canvasRef.current.contains(event.target) &&
//         layersPanelRef.current &&
//         !layersPanelRef.current.contains(event.target)
//       ) {
//         setIsLayersPanelVisible(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const addImagesToCanvas = () => {
//     const canvas = editor?.canvas;

//     if (!canvas) {
//       // console.log("Canvas not found!");
//       return;
//     }

//     // Save current state to undo stack before making changes
//     setUndoStack((prev) => [...prev, { tappableAreas, layers }]);
//     setRedoStack([]); // Clear the redo stack when a new action is performed

//     fabric.Image.fromURL(
//       layerImageUrl,
//       function (oImg) {
//         oImg.set({
//           selectable: true,
//           evented: true,
//           originX: "center",
//           originY: "center",
//           hasControls: true,
//           hasBorders: true,
//         });

//         canvas.add(oImg);
//         canvas.requestRenderAll();
//       },
//       { crossOrigin: "" }
//     );

//     // console.log("Images loaded and added to canvas");
//   };

//   useEffect(() => {
//     const canvas = editor?.canvas;
//     if (canvas && imageUrl) {
//       const { innerWidth: width, innerHeight: height } = window;
//       canvas.setWidth(width - width * 0.0);
//       canvas.setHeight(height - height * 0.2);

//       fabric.Image.fromURL(
//         imageUrl,
//         function (img) {
//           const imgAspectRatio = img.width / img.height;
//           const canvasAspectRatio = canvas.width / canvas.height;

//           let bgWidth, bgHeight;

//           if (imgAspectRatio > canvasAspectRatio) {
//             bgWidth = canvas.width;
//             bgHeight = canvas.width / imgAspectRatio;
//           } else {
//             bgHeight = canvas.height;
//             bgWidth = canvas.height * imgAspectRatio;
//           }

//           img.scaleToWidth(bgWidth);
//           img.scaleToHeight(bgHeight);

//           img.set({
//             originX: "center",
//             originY: "center",
//             left: canvas.width / 2,
//             top: canvas.height / 2,
//           });

//           setImageBounds({
//             left: canvas.width / 2 - bgWidth / 2,
//             top: canvas.height / 2 - bgHeight / 2,
//             width: bgWidth,
//             height: bgHeight,
//           });

//           canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
//             selectable: false,
//             evented: false,
//           });

//           img.on("modified", () => {
//             setImageBounds({
//               left: img.left - (img.width * img.scaleX) / 2,
//               top: img.top - (img.height * img.scaleY) / 2,
//               width: img.width * img.scaleX,
//               height: img.height * img.scaleY,
//             });
//           });
//         },
//         { crossOrigin: "" }
//       );

//       // console.log("Image URL:", imageUrl);
//     }
//   }, [editor?.canvas, imageUrl]);
//   useEffect(() => {
//     const canvas = editor?.canvas;
//     if (canvas) {
//       canvasRef.current = canvas;
//     }
//   }, [editor?.canvas]);

//   useEffect(() => {
//     if (canvasRef.current && cameraImage) {
//       const canvas = canvasRef.current;
//       if (canvas instanceof HTMLCanvasElement) {
//         const context = canvas.getContext("2d");
//         const image = new Image();
//         image.src = cameraImage;
//         image.onload = () => {
//           canvas.width = image.width;
//           canvas.height = image.height;
//           context.drawImage(image, 0, 0, canvas.width, canvas.height);
//         };
//       }
//     }
//   }, [cameraImage]);

//   useEffect(() => {
//     const resizeCanvas = () => {
//       if (editor?.canvas && createBlankCanvas) {
//         const canvas = editor.canvas;
//         const { innerWidth: width, innerHeight: height } = window;
//         canvas.setWidth(width - width * 0);
//         canvas.setHeight(height - height * 0.2);
//         const rect = new fabric.Rect({
//           left: 0,
//           top: 0,
//           fill: "white",
//           width: canvas.width,
//           height: canvas.height,
//           selectable: false,
//         });
//         canvas.add(rect);
//         canvas.renderAll();
//       }
//     };
//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);
//     return () => {
//       window.removeEventListener("resize", resizeCanvas);
//     };
//   }, [editor?.canvas, createBlankCanvas]);

//   const captureBackgroundArea = (position, size) => {
//     const canvas = editor?.canvas;
//     if (!canvas) return null;

//     const zoom = canvas.getZoom();
//     const vpt = canvas.viewportTransform;

//     const left = position.x / zoom - vpt[4] / zoom;
//     const top = position.y / zoom - vpt[5] / zoom;
//     const width = size.width / zoom;
//     const height = size.height / zoom;

//     const dataUrl = canvas.toDataURL({
//       left,
//       top,
//       width,
//       height,
//     });

//     return dataUrl;
//   };

//   useEffect(() => {
//     // Check if the user is not coming from the NewBoard component
//     if (!location.state || !location.state.imageUrl) {
//       // Reset tappable areas for the current editing session
//       setTappableAreas([]);
//       setLayers([]);
//       setActiveTappable(null);
//       setShowTappableArea(false);
//       setTappableContent(null);
//       setIsPanZoomEnabled(true);
//     }
  
//     // Load existing tappable areas for this image, if any
//     const tappableAreasByImage =
//       JSON.parse(localStorage.getItem("tappableAreasByImage")) || {};
//     if (tappableAreasByImage[imageUrl]) {
//       setTappableAreas(tappableAreasByImage[imageUrl]);
//       setLayers(
//         tappableAreasByImage[imageUrl].map((area) => ({
//           id: area.id,
//           name: `Layer ${area.id}`,
//           tappableContent: area.content,
//           selectedImage: null,
//         }))
//       );
//     }
//   }, [imageUrl, location.state]);

//   useEffect(() => {
//     const storedTappableAreas =
//       JSON.parse(localStorage.getItem("tappableAreas")) || [];
//     const storedLayers = JSON.parse(localStorage.getItem("layers")) || [];
//     setTappableAreas(storedTappableAreas);
//     setLayers(storedLayers);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("tappableAreas", JSON.stringify(tappableAreas));
//     localStorage.setItem("layers", JSON.stringify(layers));
//   }, [tappableAreas, layers]);

//   const addTappableArea = (content = null) => {
//     if (activeTappableId) {
//       alert(
//         "Please finish placing the current tappable element before creating a new one."
//       );
//       return;
//     }

//     const newTappableArea = {
//       id: `${getRandomNumber(100000, 999999999)}`,
//       position: { x: tappablePosition.x, y: tappablePosition.y },
//       originalPosition: { x: tappablePosition.x, y: tappablePosition.y },
//       size: content ? { width: 100, height: 100 } : { width: 100, height: 100 },
//       content,
//       isVisible: true,
//       isFixed: false,
//     };

//     const newLayer = {
//       id: newTappableArea.id,
//       name: `Layer ${layers.length + 1}`,
//       tappableContent: content,
//       selectedImage: null,
//     };

//     setTappableAreas((prev) => {
//       const updatedAreas = [...prev, newTappableArea];
//       saveCanvasAsJson(updatedAreas, [...layers, newLayer]);
//       return updatedAreas;
//     });

//     setLayers((prev) => [...prev, newLayer]);
//     setShowTappableArea(true);
//     setTappableContent(null);
//     setIsPanZoomEnabled(false);
//     setActiveTappable(newTappableArea);
//     setActiveTappableId(newTappableArea.id);
//   };

//   const handleSelectTappableArea = () => {
//     const centerX = imageBounds.left + imageBounds.width / 2;
//     const centerY = imageBounds.top + imageBounds.height / 2;
//     setTappablePosition({ x: centerX, y: centerY });
//     setShowTappableArea(true);
//     setShowNewTappable(false);
//     addTappableArea();
//   };

//   const handleRemoveTappableArea = (id) => {
//     // Save current state to undo stack
//     setUndoStack((prev) => [...prev, { tappableAreas, layers }]);
//     // setRedoStack([]); // Clear the redo stack when a new action is performed

//     setTappableAreas((prev) => prev.filter((area) => area.id !== id));
//     setLayers((prev) => prev.filter((layer) => layer.id !== id));
//     setShowTappableArea(false);
//     setTappableContent(null);
//     setIsPanZoomEnabled(true);
//     setActiveTappable(null);
//     setActiveTappableId(null); // Reset active tappable ID
//     setTappableAreas((prev) =>
//       prev.map((area) => ({ ...area, isVisible: true }))
//     ); // Activate all tappable areas
//   };

//   const handleUndo = () => {
//     // console.log("Undo stack before undo:", undoStack);
//     // console.log("Redo stack before undo:", redoStack);/

//     if (undoStack.length === 0) return;

//     const lastState = undoStack.pop();
//     setRedoStack((prev) => [...prev, { tappableAreas, layers }]); // Save current state to redo stack

//     setTappableAreas(lastState.tappableAreas);
//     setLayers(lastState.layers);
//     setUndoStack([...undoStack]); // Update undo stack

//     // console.log("Undo stack after undo:", undoStack);
//     // console.log("Redo stack after undo:", redoStack);
//   };

//   const handleRedo = () => {
//     // console.log("Undo stack before redo:", undoStack);
//     // console.log("Redo stack before redo:", redoStack);

//     if (redoStack.length === 0) return;

//     const lastState = redoStack.pop();
//     setUndoStack((prev) => [...prev, { tappableAreas, layers }]); // Save current state to undo stack

//     setTappableAreas(lastState.tappableAreas);
//     setLayers(lastState.layers);
//     setRedoStack([...redoStack]); // Update redo stack

//     // console.log("Undo stack after redo:", undoStack);
//     // console.log("Redo stack after redo:", redoStack);
//   };

//   const handleLayerDelete = (layerId) => {
//     setLayerToDelete(layerId);
//     setShowDeletePopup(true);
//   };

//   const confirmLayerDelete = () => {
//     if (layerToDelete) {
//       setLayers((prev) => {
//         const updatedLayers = prev.filter(
//           (layer) => layer.id !== layerToDelete
//         );
//         saveCanvasAsJson(tappableAreas, updatedLayers);
//         return updatedLayers;
//       });
//       setTappableAreas((prev) =>
//         prev.filter((area) => area.id !== layerToDelete)
//       );
//       setActiveTappable(null);
//       setShowDeletePopup(false);
//       setLayerToDelete(null);
//       setActiveTappableId(null); // Reset active tappable ID
//       setTappableAreas((prev) =>
//         prev.map((area) => ({ ...area, isVisible: true }))
//       ); // Activate all tappable areas
//     }
//   };

//   const cancelLayerDelete = () => {
//     setShowDeletePopup(false);
//     setLayerToDelete(null);
//   };

//   const handleFixTappableContent = (id, content, position, size) => {
//     setTappableAreas((prev) =>
//       prev.map((area) =>
//         area.id === id ? { ...area, isFixed: true, position, size } : area
//       )
//     );
//     setActiveTappableId(null);
//     setIsPanZoomEnabled(true);
//   };

//   const toggleTappableVisibility = (id) => {
//     setTappableAreas((prev) =>
//       prev.map((area) =>
//         area.id === id ? { ...area, isVisible: !area.isVisible } : area
//       )
//     );
//   };

//   const handleImageSelect = (imageData) => {
//     setTappableContent(imageData);
//     setShowTappableArea(true);
//     setShowNewTappable(false);
//     addTappableArea(imageData);
//   };

//   const handleEmojiSelect = (emoji) => {
//     setTappableContent(emoji);
//     setShowTappableArea(true);
//     setShowNewTappable(false);
//     addTappableArea(emoji);
//   };

//   const handleNewTappableClose = () => {
//     setShowNewTappable(false);
//   };

//   const handleCheckSquareClick = (id, content, position, size) => {
//     if (content) {
//       toggleTappableVisibility(id);
//     } else {
//       const canvas = editor?.canvas;
//       const zoom = canvas.getZoom();
//       const vpt = canvas.viewportTransform;

//       const adjustedPosition = {
//         x: (position.x - vpt[4]) / zoom,
//         y: (position.y - vpt[5]) / zoom,
//       };

//       const adjustedSize = {
//         width: size.width / zoom,
//         height: size.height / zoom,
//       };

//       handleFixTappableContent(id, content, adjustedPosition, adjustedSize);
//     }

//     setActiveTappableId(null);
//     if (!content) {
//       const capturedContent = captureBackgroundArea(position, size);
//       const updatedLayers = layers.map((layer) => {
//         if (layer.id === id) {
//           return {
//             ...layer,
//             tappableContent: capturedContent,
//           };
//         }
//         return layer;
//       });
//       setLayers(updatedLayers);
//       setTappableContent(content);
//     }

//     setActiveTappable(null);
//     setActiveLayerId(id); // Set the active layer ID
//     setIsLayersPanelVisible(true); // Make sure the layers panel is visible
//     const updatedTappableAreas = tappableAreas.map((area) =>
//       area.id === id
//         ? { ...area, content, position, size, isFixed: true }
//         : area
//     );
//     const essentialData = updatedTappableAreas.map(
//       ({ id, content, position, size, isFixed }) => ({
//         id,
//         content,
//         position,
//         size,
//         isFixed,
//       })
//     );

//     try {
//       localStorage.setItem(
//         `${imageUrl}`,
//         JSON.stringify(essentialData)
//       );
//     } catch (e) {
//       console.error("Error saving to localStorage:", e);
//     }

//     const tappableData = {
//       canvas: editor?.canvas.toJSON(),
//       tappableAreas,
//     };
//     console.log("tappableData: ",tappableData)
//     localStorage.setItem(
//       "fullImageWithTappables",
//       JSON.stringify(tappableData)
//     );
//   };

//   const handleCircleClick = (id) => {
//     setSelectedLayerId(id);
//     setIsLayersPanelVisible(true);
//     setTappableAreas((prev) =>
//       prev.map((area) =>
//         area.id === id
//           ? { ...area, isVisible: true }
//           : { ...area, isVisible: false }
//       )
//     );
//   };

//   const handleLayerTappableClick = (layerId) => {
//     setActiveTappableId(layerId); // Set the active tappable area
//     setTappableAreas((prev) =>
//       prev.map((area) => ({
//         ...area,
//         isVisible: area.id === layerId, // Ensure only one tappable area is visible
//       }))
//     );
//   };

//   const handleLayerClick = (id) => {
//     setTappableAreas((prev) =>
//       prev.map((area) =>
//         area.id === id
//           ? { ...area, isVisible: true }
//           : { ...area, isVisible: false }
//       )
//     );
//     setSelectedLayerId(id);
//   };

//   const getZoomLevel = (canvas) => {
//     const viewportTransform = canvas.viewportTransform;
//     const scaleX = viewportTransform[0];
//     const scaleY = viewportTransform[3];
//     return Math.sqrt(scaleX * scaleY);
//   };

//   const calculateAdjustedCoordinates = (tappableAreas) => {
//     const canvas = editor?.canvas;
//     const zoom = getZoomLevel(canvas);

//     const adjustedCoordinates = [];

//     canvas.getObjects().forEach((obj) => {
//       const { left, top, width, height, id, text, fill, stroke, imageLink } =
//         obj;

//       const adjustedLeft = left * zoom;
//       const adjustedTop = top * zoom;
//       const adjustedWidth = width * zoom;
//       const adjustedHeight = height * zoom;

//       adjustedCoordinates.push({
//         id,
//         left: adjustedLeft,
//         top: adjustedTop,
//         width: adjustedWidth,
//         height: adjustedHeight,
//         zoom,
//         text,
//         fill,
//         stroke,
//         imageLink,
//       });
//     });

//     tappableAreas.forEach((area) => {
//       adjustedCoordinates.push({
//         id: area.id,
//         left: area.position.x,
//         top: area.position.y,
//         width: area.size.width,
//         height: area.size.height,
//         content: area.content,
//       });
//     });

//     return adjustedCoordinates;
//   };

//   const handleCanvasClick = (event) => {
//     if (activeTappable) return;
//     if (activeTappableId) return;

//     const rect = event.target.getBoundingClientRect();
//     const clientX = event.touches ? event.touches[0].clientX : event.clientX;
//     const clientY = event.touches ? event.touches[0].clientY : event.clientY;

//     const canvas = editor?.canvas;
//     const zoom = canvas.getZoom();
//     const vpt = canvas.viewportTransform;

//     const x = (clientX - rect.left - vpt[4]) / zoom;
//     const y = (clientY - rect.top - vpt[5]) / zoom;

//     const newTappableArea = {
//       id: `${getRandomNumber(100000, 999999999)}`,
//       position: { x, y },
//       originalPosition: { x, y },
//       size: { width: 100, height: 100 },
//       content: null,
//       isVisible: true,
//     };

//     const newLayer = {
//       id: newTappableArea.id,
//       name: `Layer ${layers.length + 1}`,
//       tappableContent: null,
//       selectedImage: null,
//     };

//     setTappableAreas((prev) => {
//       const updatedAreas = [...prev, newTappableArea];
//       saveCanvasAsJson(updatedAreas, [...layers, newLayer]);
//       return updatedAreas;
//     });

//     setLayers((prev) => [...prev, newLayer]);
//     setTappablePosition({ id: newTappableArea.id, x, y });
//     setShowTappableArea(true);
//     setTappableContent(null);
//     setIsPanZoomEnabled(false);
//     setActiveTappable(newTappableArea);
//     setActiveTappableId(newTappableArea.id);

//     const json = editor?.canvas.toJSON();
//     // console.log("Display JSON");
//     // console.log(json);

//     const adjustedCoords = calculateAdjustedCoordinates(tappableAreas);
//     // console.log("Display Coordinates");
//     // console.log(adjustedCoords);
//   };

//   const getRandomNumber = (min, max) => {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   };

//   const saveCanvasAsJson = (tappableAreas, layers) => {
//     const json = {
//       canvas: editor?.canvas.toJSON(),
//       tappableAreas: calculateAdjustedCoordinates(tappableAreas),
//     };
//     setJsonContent(JSON.stringify(json, null, 2));
//     const tappableAreasByImage =
//       JSON.parse(localStorage.getItem("tappableAreasByImage")) || {};
//     tappableAreasByImage[imageUrl] = tappableAreas;
//     localStorage.setItem(
//       "tappableAreasByImage",
//       JSON.stringify(tappableAreasByImage)
//     );
//     tappableAreas.forEach((area) => {
//       if (area.content && area.content.startsWith("data:image")) {
//         json.tappableAreas.find((a) => a.id === area.id).content = area.content;
//       }
//     });
//     setJsonContent(JSON.stringify(json, null, 2));
//     // localStorage.setItem(`layers_${imageUrl}`, JSON.stringify(layers));
//     localStorage.setItem(`${imageUrl}`, JSON.stringify(layers));
//     // console.log("Saved tappable areas for image:", imageUrl, tappableAreas);
//   };

//   const handleChangeBackground = (changedBG) => {
//     updateImageUrl(changedBG);
//     const canvas = editor?.canvas;
//     if (!canvas) return;

//     fabric.Image.fromURL(
//       changedBG,
//       function (img) {
//         const imgAspectRatio = img.width / img.height;
//         const canvasAspectRatio = canvas.width / canvas.height;

//         let bgWidth, bgHeight;

//         if (imgAspectRatio > canvasAspectRatio) {
//           bgWidth = canvas.width;
//           bgHeight = canvas.width / imgAspectRatio;
//         } else {
//           bgHeight = canvas.height;
//           bgWidth = canvas.height * imgAspectRatio;
//         }

//         img.scaleToWidth(bgWidth);
//         img.scaleToHeight(bgHeight);

//         img.set({
//           originX: "center",
//           originY: "center",
//           left: canvas.width / 2,
//           top: canvas.height / 2,
//         });

//         setImageBounds({
//           left: canvas.width / 2 - bgWidth / 2,
//           top: canvas.height / 2 - bgHeight / 2,
//           width: bgWidth,
//           height: bgHeight,
//         });

//         canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
//           selectable: false,
//           evented: false,
//         });

//         setLayers((prevLayers) =>
//           prevLayers.map((layer) =>
//             layer.id === "background-layer"
//               ? { ...layer, tappableContent: changedBG }
//               : layer
//           )
//         );

//         canvas.renderAll();
//       },
//       { crossOrigin: "" }
//     );
//   };

//   return (
//     <div className="App container">
//       <div
//         className="canvas-container"
//         ref={canvasRef}
//         onClick={handleCanvasClick}
//         onTouchStart={handleCanvasClick}
//       >
//         {isPanZoomEnabled ? "" : ""}
//         <FabricJSCanvas className="fabric-canvas" onReady={onReady} />
//       </div>
//       <ActionBar
//         boardId={boardId}
//         boardImageId={boardImageId}
//         imageUrl={imageUrl}
//         onSelectTappableArea={handleSelectTappableArea}
//         onImageSelect={handleImageSelect}
//         onEmojiSelect={handleEmojiSelect}
//         onLayersToggle={(isVisible) => setIsLayersPanelVisible(isVisible)}
//         layers={layers}
//         handleUndo={handleUndo}
//         handleRedo={handleRedo}
//       />
//       <LayersPanel
//         ref={layersPanelRef}
//         isVisible={isLayersPanelVisible}
//         tappableContent={tappableContent}
//         lastAddedTappableContent={lastAddedTappableContent}
//         layers={layers}
//         setLayers={setLayers}
//         handleFixTappableContent={handleFixTappableContent}
//         selectedLayerId={selectedLayerId}
//         activeLayerId={activeLayerId}
//         onLayerClick={handleLayerClick}
//         onLayerDelete={handleLayerDelete}
//         onLayerTappableClick={handleLayerTappableClick}
//         setActiveTappableId={setActiveTappableId}
//         onClose={() => setIsLayersPanelVisible(false)}
//         imageUrl={imageUrl}
//         onChangeBackground={handleChangeBackground}
//         style={{ bottom: "0" }}
//       />
//       {showDeletePopup && (
//         <DeletePopup
//           onConfirm={confirmLayerDelete}
//           onCancel={cancelLayerDelete}
//         />
//       )}

      // {tappableAreas.map((area) => (
      //   <TappableArea
      //     key={area.id}
      //     id={area.id}
      //     activeTappableId={activeTappableId}
      //     setActiveTappableId={setActiveTappableId}
      //     onRemove={() => handleRemoveTappableArea(area.id)}
      //     onFixContent={handleFixTappableContent}
      //     isActive={area.id === activeTappableId}
      //     content={area.content}
      //     position={area.position}
      //     setPosition={(position) =>
      //       setTappableAreas((prev) =>
      //         prev.map((a) => (a.id === area.id ? { ...a, position } : a))
      //       )
      //     }
      //     size={area.size}
      //     setSize={(size) =>
      //       setTappableAreas((prev) =>
      //         prev.map((a) => (a.id === area.id ? { ...a, size } : a))
      //       )
      //     }
      //     imageBounds={imageBounds}
      //     onCheckSquareClick={handleCheckSquareClick}
      //     isFixed={area.isFixed}
      //     setIsFixed={(isFixed) =>
      //       setTappableAreas((prev) =>
      //         prev.map((a) => (a.id === area.id ? { ...a, isFixed } : a))
      //       )
      //     }
      //     onLayerActivate={handleLayerActivate}
      //     editor={editor}
      //   />
      // ))}
//     </div>
//   );
// };

// export default EditBoard;

