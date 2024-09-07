import React, { useRef, useState, useEffect, useContext, useCallback } from 'react';
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
    
  const [selectedTappableArea, setSelectedTappableArea] = useState(null);


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
    // Load tappable areas and layers from local storage
    const savedTappableAreas = JSON.parse(localStorage.getItem('tappableAreas')) || [];
    const savedLayers = JSON.parse(localStorage.getItem('layers')) || [];
    
    setTappableAreas(savedTappableAreas);
    setLayers(savedLayers);
    
    // Recreate points from tappable areas
    const savedPoints = savedTappableAreas.map(area => ({
      x: area.position.x + area.size.width / 2,
      y: area.position.y + area.size.height / 2
    }));
    setPoints(savedPoints);
  }, []);

   useEffect(() => {
    // Save tappable areas and layers to local storage whenever they change
    localStorage.setItem('tappableAreas', JSON.stringify(tappableAreas));
    localStorage.setItem('layers', JSON.stringify(layers));
  }, [tappableAreas, layers]);

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

  const saveToUndoStack = useCallback((newState) => {
    setUndoStack(prevStack => [...prevStack, newState]);
    setRedoStack([]); // Clear redo stack when a new action is performed
  }, []);

  const updateStateAndSave = useCallback((updateFunction) => {
    const currentState = {
      tappableAreas,
      layers,
      points,
      selectionBox,
      activeTappableId
    };
    
    updateFunction();
    
    saveToUndoStack(currentState);
  }, [tappableAreas, layers, points, selectionBox, activeTappableId, saveToUndoStack]);


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
            content: newTappableType === 'image'
              ? selectedImage
              : newTappableType === 'emoji'
              ? selectedEmoji
              : null, // Set to null for blank tappable areas
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
              selectedImage: newTappableArea.content instanceof HTMLImageElement ? newTappableArea.content.src : null,
          },
          ]);
  
          // Save updated data to localStorage
          const dataToSave = {
            tappableAreas: [...tappableAreas, newTappableArea],
            points: [...points, newPoint],
            imageUrl: imageUrl?.currentSrc,
            layers: [...layers, {
              id: newTappableArea.id,
              name: `Layer ${layers.length + 1}`,
              tappableContent: capturedImage,
              selectedImage: newTappableArea.content,
            }],
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
    if (activeTappableId) {
      setLayerToDelete(activeTappableId);
      setShowDeletePopup(true);
    }
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

  // const viewBoardPage = () => {
  //   navigate("/infoOverlay");
  // };

  const handleTappableBoxDragMove = (e) => {
    if (!imageUrl) return;
    
    
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    
    const clickX = (pointerPosition?.x - position?.x) / scale;
    const clickY = (pointerPosition?.y - position?.y) / scale;
    
    if (clickX >= 0 && clickX <= imageUrl?.width && clickY >= 0 && clickY <= imageUrl?.height) {
    const newX = Math.max(0, Math.min(e.target.x(), imageUrl?.width - selectionBox?.width));
    const newY = Math.max(0, Math.min(e.target.y(), imageUrl?.height - selectionBox?.height));
    updateStateAndSave(() => {
    setSelectionBox({
      ...selectionBox,
      x: newX,
      y: newY,
    });
    if (activeTappableId) {
      setTappableAreas((prev) =>
        prev.map((area) =>
          area.id === activeTappableId
            ? {
                ...area,
                position: {
                  x: newX / imageUrl.width,
                  y: newY / imageUrl.height,
                },
              }
            : area
        )
      );

      // Update the position of the corresponding point
      setPoints((prev) =>
        prev.map((point, index) =>
          tappableAreas[index]?.id === activeTappableId
            ? {
                x: (newX + selectionBox.width / 2) / imageUrl.width,
                y: (newY + selectionBox.height / 2) / imageUrl.height,
              }
            : point
          )
        );
      }
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

  const handleUndo = useCallback(() => {
    if (undoStack.length === 0) return;

    const prevState = undoStack[undoStack.length - 1];
    const currentState = {
      tappableAreas,
      layers,
      points,
      selectionBox,
      activeTappableId
    };

    setRedoStack(prevStack => [...prevStack, currentState]);
    setUndoStack(prevStack => prevStack.slice(0, -1));

    setTappableAreas(prevState.tappableAreas);
    setLayers(prevState.layers);
    setPoints(prevState.points);
    setSelectionBox(prevState.selectionBox);
    setActiveTappableId(prevState.activeTappableId);
  }, [undoStack, tappableAreas, layers, points, selectionBox, activeTappableId]);

  const handleRedo = useCallback(() => {
    if (redoStack.length === 0) return;

    const nextState = redoStack[redoStack.length - 1];
    const currentState = {
      tappableAreas,
      layers,
      points,
      selectionBox,
      activeTappableId
    };

    setUndoStack(prevStack => [...prevStack, currentState]);
    setRedoStack(prevStack => prevStack.slice(0, -1));

    setTappableAreas(nextState.tappableAreas);
    setLayers(nextState.layers);
    setPoints(nextState.points);
    setSelectionBox(nextState.selectionBox);
    setActiveTappableId(nextState.activeTappableId);
  }, [redoStack, tappableAreas, layers, points, selectionBox, activeTappableId]);


  const handleLayerDelete = (layerId) => {
    setLayerToDelete(layerId);
    setShowDeletePopup(true);
    setSelectionBox(null)
  };

  const confirmLayerDelete = () => {
    if (layerToDelete) {
      // Remove the layer
      updateStateAndSave(() => {
      setLayers((prev) => prev.filter((layer) => layer.id !== layerToDelete));
      
      // Remove the corresponding tappable area
      setTappableAreas((prev) => prev.filter((area) => area.id !== layerToDelete));
      
      // Remove the corresponding point
      setPoints((prev) => prev.filter((_, index) => tappableAreas[index]?.id !== layerToDelete));
      
      setActiveTappable(null);
      setShowDeletePopup(false);
      setLayerToDelete(null);
      setActiveTappableId(null);
      setTappableAreas((prev) => prev.map((area) => ({ ...area, isVisible: true })));
    });
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
    const img = new window.Image();
    img.src = imageDataUrl;
    img.crossOrigin = "anonymous"; // Handle CORS if needed
    img.onload = () => {
      // Convert the loaded image into a tappable area with correct positioning
      const base64Image = img.src; // Using the source directly as a Data URL
  
      // Set image position relative to the background
      const newTappableArea = {
        id: `${getRandomNumber(100000, 999999999)}`,
        content: base64Image,
        position: { x: 0.5, y: 0.5 }, // Centered position as an example
        size: { width: 0.1, height: 0.1 }, // Relative sizing based on image dimensions
        isFixed: true,
        isVisible: true,
      };
  
      setTappableAreas((prev) => [...prev, newTappableArea]);
    };
  
    img.onerror = () => {
      console.error("Failed to load image.");
    };
  };
  
  
  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const handleNewTappableClose = () => {
    setShowNewTappable(false);
  };


  const handleCircleClick = (index) => {
    updateStateAndSave(() => {
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
      setSelectedTappableArea(tappableArea);
      setPoints((prev) => prev.map((point, i) => i === index ? { ...point, isHidden: true } : point));
    }  else {
      console.error(`No tappable area found for index ${index}`);
    }
  });
};


  const handleTappableAreaClick = (area) => {
    setSelectedLayerId(area.id);
    setIsLayersPanelVisible(true);

    setSelectionBox({
      x: area.position.x * imageUrl.width,
      y: area.position.y * imageUrl.height,
      width: area.size.width * imageUrl.width,
      height: area.size.height * imageUrl.height,
    });

    setActiveTappableId(area.id);
    setSelectedTappableArea(area);
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

  

  if (loading || imageStatus !== 'loaded') {
    return (
      <div className="flex items-center justify-center h-screen">
        <PropagateLoader color="#0085FF" />
      </div>
    );
  }

  const renderTappableArea = (area) => {
    if (!imageUrl || !imageUrl.width || !imageUrl.height) return null;
  
    const isBlank = !area.content;
    return (
      <Group
        key={area.id}
        x={area.position.x * imageUrl.width}
        y={area.position.y * imageUrl.height}
        draggable={!area.isFixed} // Enable dragging if not fixed
        onDragMove={(e) => {
          const { x, y } = e.target.position();
          updateStateAndSave(() => {
            setTappableAreas((prev) =>
              prev.map((a) =>
                a.id === area.id
                  ? { ...a, position: { x: x / imageUrl.width, y: y / imageUrl.height } }
                  : a
              )
            );
          });
        }}
        onClick={() => handleTappableAreaClick(area)}
      >
        {!isBlank && area.content && typeof area.content === 'string' && area.content.includes('data:image') ? (
          <Image
            image={(() => {
              const img = new window.Image();
              img.src = area.content;
              img.crossOrigin = 'anonymous'; // Handle CORS if needed
              return img;
            })()}
            width={area.size.width * imageUrl.width}
            height={area.size.height * imageUrl.height}
            draggable={!area.isFixed}
          />
        ) : (
          <Text
            text={area.content || ''}
            fontSize={(area.size.width * imageUrl.width) / 2}
            width={area.size.width * imageUrl.width}
            height={area.size.height * imageUrl.height}
            align="center"
            verticalAlign="middle"
          />
        )}
      </Group>
    );
  };
  

  // const renderTappableArea = (area) => {
  //   if (!imageUrl || !imageUrl.width || !imageUrl.height) return null;
  
  //   const isBlank = !area.content;
  //   return (
  //     <Group
  //       key={area.id}
  //       x={area.position.x * imageUrl.width}
  //       y={area.position.y * imageUrl.height}
  //       onClick={() => handleTappableAreaClick(area)}
  //     >
  //       {!isBlank && area.content && typeof area.content === 'string' && area.content.includes('data:image') ? (
  //         // Create an image object for rendering the content
  //         <Image
  //           image={(() => {
  //             const img = new window.Image();
  //             img.src = area.content;
  //             img.crossOrigin = 'anonymous'; // Handle CORS if needed
  //             return img;
  //           })()}
  //           width={area.size.width * imageUrl.width}
  //           height={area.size.height * imageUrl.height}
  //         />
  //       ) : (
  //         // If the content is not an image, display text or another default
  //         <Text
  //           text={area.content || ''}
  //           fontSize={(area.size.width * imageUrl.width) / 2}
  //           width={area.size.width * imageUrl.width}
  //           height={area.size.height * imageUrl.height}
  //           align="center"
  //           verticalAlign="middle"
  //         />
  //       )}
  //     </Group>
  //   );
  // };
  
  

  const renderDot = (point, index) => (
    <Circle
      key={index}
      x={point.x * imageUrl.width}
      y={point.y * imageUrl.height}
      radius={DOT_SIZE / 2 / scale}
      fill="#0085FF"
      onClick={() => handleCircleClick(index)}
      onTap={() => handleCircleClick(index)}
    />
  );


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
        className="absolute w-auto top-2 left-2 z-10 bg-gray-500 text-white px-4 py-2 rounded"
      >
        Back
      </button>

      {/* <button 
        onClick={viewBoardPage}
        className="absolute w-auto top-12 left-2 z-10 bg-blue-500 text-white px-4 py-2 rounded"
      >
        viewBoard
      </button> */}
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
{tappableAreas.map(renderTappableArea)}

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
       {points.map(renderDot)}
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

// import React, { useRef, useState, useEffect, useContext, useCallback } from 'react';
// import { Stage, Layer, Image, Rect, Group, Circle, Text } from 'react-konva';
// import useImage from 'use-image';
// import CheckSquare from "../../assets/CheckSquare.svg"
// import Subtract from "../../assets/Subtract.svg"
// import tappable_plus from "../../assets/tappable_plus.svg"
// import ArrowCircleDownRight from "../../assets/ArrowCircleDownRight.svg"
// import ActionBar from "./ActionBar/ActionBar";
// import LayersPanel from "./ActionBar/Layers/Layers";
// import { useLocation, useNavigate } from "react-router-dom";
// import { ImageContext } from "./ImageContext/ImageContext";
// import DeletePopup from "./ActionBar/NewTappeable/DeletePopup";
// import { baseURL } from '../../Constants/urls';
// import { PropagateLoader } from 'react-spinners';

// const EditBoard = () => {
//   const fileInputRef = useRef(null);
//   const stageRef = useRef(null);
//   const navigate = useNavigate();
//   const [checkSquareIcon] = useImage(CheckSquare, 'anonymous');
//   const [subtractIcon] = useImage(Subtract, 'anonymous');
//   const [plusIcon] = useImage(tappable_plus, 'anonymous');
//   const [arrowDownCircleIcon] = useImage(ArrowCircleDownRight, 'anonymous');
//   const [points, setPoints] = useState([]);
//   const [stageSize, setStageSize] = useState({ width: window.innerWidth, height: window.innerHeight });
//   const [scale, setScale] = useState(1);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [stateDrag, setStateDrag] = useState({
//     isDragging: false,
//     x: 0,
//     y: 0,
//   });
//   const [resizing, setResizing] = useState(false);
//   const [cursorStyle, setCursorStyle] = useState('default');
//   const [image, setImageUrl] = useState(null)
//   const { layerImageUrl } = useContext(ImageContext);
//   const [activeLayerId, setActiveLayerId] = useState(null);
//   const [layers, setLayers] = useState(
//     JSON.parse(localStorage.getItem("layers")) || []
//   );
//   const [tappableAreas, setTappableAreas] = useState(
//     JSON.parse(localStorage.getItem("tappableAreas")) || []
//   );
//   const [activeTappable, setActiveTappable] = useState(null);
//   const [jsonContent, setJsonContent] = useState("");
//   const layersPanelRef = useRef(null);
//   const location = useLocation();
//   const { createBlankCanvas, editedImage, changedBG } = location.state || {};
//   const [currentImageUrl, setCurrentImageUrl] = useState(null);
//   const [imageUrl, imageStatus] = useImage(currentImageUrl, 'anonymous'); 
//   const [imageBounds, setImageBounds] = useState({
//         left: 0,
//         top: 0,
//         width: 0,
//         height: 0,
//       });

// //   const [imageUrl] = useImage(
// //     changedBG ||
// //     editedImage ||
// //     JSON.parse(sessionStorage.getItem("state"))?.imageUrl
// // );
//   const [showTappableArea, setShowTappableArea] = useState(false);
//   const [showNewTappable, setShowNewTappable] = useState(false);
//   const [lastAddedTappableContent, setLastAddedTappableContent] = useState(null);
//   const [activeTappableId, setActiveTappableId] = useState(
//     localStorage.getItem("activeTappableId") || null
//   );
//   const boardId = sessionStorage.getItem("boardId");
//   const boardImageId = sessionStorage.getItem("boardImageId");
//   const [isLayersPanelVisible, setIsLayersPanelVisible] = useState(false);
//   const [tappableContent, setTappableContent] = useState(null);
//   const [selectedLayerId, setSelectedLayerId] = useState(null);
//   const [showDeletePopup, setShowDeletePopup] = useState(false);
//   const [layerToDelete, setLayerToDelete] = useState(null);
//   const [undoStack, setUndoStack] = useState([]);
//   const [redoStack, setRedoStack] = useState([]);
//   const [selectionBox, setSelectionBox] = useState(null);
//   const [tappableType, setTappableType] = useState(null);
//   const [loading, setLoading] = useState(false);
//     const [tappablePosition, setTappablePosition] = useState({ x: 0, y: 0 });
//     const [newTappableType, setNewTappableType] = useState(null);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [selectedEmoji, setSelectedEmoji] = useState(null);
    
//   const [selectedTappableArea, setSelectedTappableArea] = useState(null);


//   const ACTION_BAR_HEIGHT = 80;
//   const DOT_SIZE = 20;
//   const ICON_SIZE = 24;
//   const TAPPABLE_BOX_SIZE = 100;

//   // console.log("boaddd");
//   // console.log(boardImageId);
  
//   // console.log("editedImage :",editedImage);
//   // console.log("changedBG: ",changedBG);

//   useEffect(() => {
//     setLoading(true);
//     const fetchLatestImage = () => {
//       const latestImage = changedBG || editedImage || JSON.parse(sessionStorage.getItem("state"))?.imageUrl;
      
//       setCurrentImageUrl(latestImage);
      
//       const currentState = JSON.parse(sessionStorage.getItem("state")) || {};
//       sessionStorage.setItem("state", JSON.stringify({ ...currentState, imageUrl: latestImage }));
//       // setLoading(false);
//     };

//     fetchLatestImage();
    
//   }, [changedBG, editedImage]);

//   useEffect(() => {
//     const loadTappableData = () => {
//       const storedTappableData = sessionStorage.getItem('tappableData');
//       if (storedTappableData) {
//         const tappableArray = JSON.parse(storedTappableData);
        
//         // Update tappableAreas state
//         setTappableAreas(tappableArray.map(tappable => ({
//           id: tappable.tappableId,
//           position: { x: tappable.left / imageUrl.width, y: tappable.top / imageUrl.height },
//           size: { width: TAPPABLE_BOX_SIZE / imageUrl.width, height: TAPPABLE_BOX_SIZE / imageUrl.height },
//           content: tappable.selectedImage ? new window.Image() : tappable.selectedEmoji || null,
//         type: tappable.selectedImage ? 'image' : 'emoji',
//         })));
  
//         // Load images for tappable areas
//         tappableArray.forEach(tappable => {
//           if (tappable.selectedImage) {
//             const img = new window.Image();
//             img.src = tappable.selectedImage;
//             img.onload = () => {
//               setTappableAreas(prev => prev.map(area => 
//                 area.id === tappable.tappableId ? { ...area, content: img } : area
//               ));
//             };
//           }
//         });
  
//         // Update points state
//         setPoints(tappableArray.flatMap(tappable => tappable.points));
//       }
//     };

   
  
//     if (imageUrl) {
//       loadTappableData();
//     }
//   }, [imageUrl]);

//   useEffect(() => {
//     // Load tappable areas and layers from local storage
//     const savedTappableAreas = JSON.parse(localStorage.getItem('tappableAreas')) || [];
//     const savedLayers = JSON.parse(localStorage.getItem('layers')) || [];
    
//     setTappableAreas(savedTappableAreas);
//     setLayers(savedLayers);
    
//     // Recreate points from tappable areas
//     const savedPoints = savedTappableAreas.map(area => ({
//       x: area.position.x + area.size.width / 2,
//       y: area.position.y + area.size.height / 2
//     }));
//     setPoints(savedPoints);
//   }, []);

//    useEffect(() => {
//     // Save tappable areas and layers to local storage whenever they change
//     localStorage.setItem('tappableAreas', JSON.stringify(tappableAreas));
//     localStorage.setItem('layers', JSON.stringify(layers));
//   }, [tappableAreas, layers]);

//   useEffect(() => {
//     if (imageStatus === "loaded") {
//       setLoading(false); // Hide loader when the image is loaded
//     }
//   }, [imageStatus]);

//   useEffect(() => {
//     const handleResize = () => {
//       setStageSize({ 
//         width: window.innerWidth, 
//         height: window.innerHeight - ACTION_BAR_HEIGHT 
//       });
//     };
//     window.addEventListener('resize', handleResize);
//     handleResize();
//     // Load data from localStorage
//     const savedData = localStorage.getItem('editBoardData');
//     if (savedData) {
//       const { image: savedImageUrl, points: savedPoints, scale: savedScale, position: savedPosition, layers: layers } = JSON.parse(savedData);
//       setImageUrl(savedImageUrl);
//       setPoints(savedPoints);
//       setScale(savedScale);
//       setPosition(savedPosition);
//       setLayers(layers)
//     }

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     if (imageUrl && stageSize.width && stageSize.height) {
//       const imageAspectRatio = imageUrl.width / imageUrl.height;
//       const stageAspectRatio = stageSize.width / stageSize.height;
  
//       let newWidth, newHeight, newX, newY;
  
//       if (imageAspectRatio > stageAspectRatio) {
//         newWidth = stageSize.width;
//         newHeight = stageSize.width / imageAspectRatio;
//       } else {
//         newHeight = stageSize.height;
//         newWidth = stageSize.height * imageAspectRatio;
//       }
  
//       newX = (stageSize.width - newWidth) / 2;
//       newY = (stageSize.height - newHeight) / 2;
  
//       setScale(newWidth / imageUrl.width);
//       setPosition({ x: newX, y: newY });
//     }
//   }, [imageUrl, stageSize]);

//   useEffect(() => {
//     if (imageUrl) {
//       // Save data to localStorage
//       const dataToSave = { imageUrl:imageUrl?.currentSrc, points, scale, position, layers  };
//       localStorage.setItem('editBoardData', JSON.stringify(dataToSave));
//       // console.log("currentSrc");
//       // console.log(imageUrl.currentSrc);
//     }
    
//   }, [imageUrl, points, scale, position, layers]);

//   const calculateCenteredPosition = (imageWidth, imageHeight, stageWidth, stageHeight) => {
//     return {
//       x: (stageWidth - imageWidth * scale) / 2,
//       y: (stageHeight - imageHeight * scale) / 2
//     };
//   };

//   const handleStageClick = (e) => {
//     if (!imageUrl || selectionBox) return;
//     const stage = e.target.getStage();
//     // console.log("stage",stage);
//   const stagePosition = stage.position();
//   const stageScale = stage.scaleX();
    
//     const pointerPosition = stage.getPointerPosition();
    
//     const clickX = (pointerPosition?.x - position?.x) / scale;
//     const clickY = (pointerPosition?.y - position?.y) / scale;

//     const x = (pointerPosition.x - stagePosition.x) / stageScale - position.x;
//   const y = (pointerPosition.y - stagePosition.y) / stageScale - position.y;

//   // Check if the click is within the image bounds
//   if (x < 0 || y < 0 || x > imageUrl.width || y > imageUrl.height) {
//     return; // Click is outside the image bounds
//   }
    
//   const clickedArea = tappableAreas.find((area) => {
//     const { x, y, width, height } = area.position;
//     return (
//       clickX >= x &&
//       clickX <= x + width &&
//       clickY >= y &&
//       clickY <= y + height
//     );
//   });

//   if (clickedArea) {
//     setSelectionBox({
//       x: clickedArea.position.x,
//       y: clickedArea.position.y,
//       width: clickedArea.size.width,
//       height: clickedArea.size.height,
//     });
//     setActiveTappableId(clickedArea.id);
//     setSelectedLayerId(clickedArea.id);
//     setIsLayersPanelVisible(true);
//   } else {
//       const boxSize = 100 / scale;
//       setSelectionBox({
//         x: clickX - boxSize / 2,
//         y: clickY - boxSize / 2,
//         width: boxSize,
//         height: boxSize,
//       });
//     }
    
//     const dataToSave = { image, points, scale, position, layers };
//     localStorage.setItem('editBoardData', JSON.stringify(dataToSave));
//     const newTappableArea = {
//       id: `${getRandomNumber(100000, 999999999)}`,
//     };
  
//     const newLayer = {
//       id: newTappableArea.id,
//       name: `Layer ${layers.length + 1}`,
//       tappableContent: null,
//       selectedImage: null,
//     };
  
//   };

//   const getRandomNumber = (min, max) => {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   };

//   const saveToUndoStack = useCallback((newState) => {
//     setUndoStack(prevStack => [...prevStack, newState]);
//     setRedoStack([]); // Clear redo stack when a new action is performed
//   }, []);

//   const updateStateAndSave = useCallback((updateFunction) => {
//     const currentState = {
//       tappableAreas,
//       layers,
//       points,
//       selectionBox,
//       activeTappableId
//     };
    
//     updateFunction();
    
//     saveToUndoStack(currentState);
//   }, [tappableAreas, layers, points, selectionBox, activeTappableId, saveToUndoStack]);


//   const handleCheckClick = async () => {
//     if (selectionBox && stageRef.current) {
//       try {
//         const stage = stageRef.current;
//         const scaleFactor = scale; // Scale factor based on the stage scaling
  
//         // Get the bounding box details with adjustments for scaling
//         const captureX = selectionBox.x * scaleFactor + position.x;
//         const captureY = selectionBox.y * scaleFactor + position.y;
//         const captureWidth = selectionBox.width * scaleFactor;
//         const captureHeight = selectionBox.height * scaleFactor;
  
//         // Create an offscreen canvas
//         const captureCanvas = document.createElement('canvas');
//         captureCanvas.width = captureWidth;
//         captureCanvas.height = captureHeight;
//         const captureContext = captureCanvas.getContext('2d');
  
//         // Ensure that stage.toCanvas() is correctly returning a canvas element
//         const stageCanvas = stage.toCanvas();
//         if (stageCanvas instanceof HTMLCanvasElement) {
//           captureContext.drawImage(
//             stageCanvas,
//             captureX,
//             captureY,
//             captureWidth,
//             captureHeight,
//             0,
//             0,
//             captureWidth,
//             captureHeight
//           );
  
//           // Convert the canvas to a Data URL (image format)
//           const capturedImage = captureCanvas.toDataURL('image/png');
  
//           // Calculate relative positions based on the image size
//           const relativeX = selectionBox.x / imageUrl.width;
//           const relativeY = selectionBox.y / imageUrl.height;
//           const relativeWidth = selectionBox.width / imageUrl.width;
//           const relativeHeight = selectionBox.height / imageUrl.height;
  
//           // Create the new tappable area
//           const newTappableArea = {
//             id: `${getRandomNumber(100000, 999999999)}`,
//             content: newTappableType === 'image'
//               ? selectedImage
//               : newTappableType === 'emoji'
//               ? selectedEmoji
//               : null, // Set to null for blank tappable areas
//             position: { x: relativeX, y: relativeY },
//             size: { width: relativeWidth, height: relativeHeight },
//             isFixed: true,
//             isVisible: true,
//           };
  
//           // Calculate the exact pixel positions based on the loaded image dimensions
//           const centerX = selectionBox.x + selectionBox.width / 2;
//           const centerY = selectionBox.y + selectionBox.height / 2;
//           const newPoint = { x: centerX / imageUrl.width, y: centerY / imageUrl.height };
  
//           // Update state and add the new tappable area
//           setTappableAreas((prev) => [...prev, newTappableArea]);
//           setPoints((prev) => [...prev, newPoint]);
//           setLayers((prev) => [
//             ...prev,
//             {
//               id: newTappableArea.id,
//               name: `Layer ${prev.length + 1}`,
//               tappableContent: capturedImage,
//               selectedImage: newTappableArea.content instanceof HTMLImageElement ? newTappableArea.content.src : null,
//           },
//           ]);
  
//           // Save updated data to localStorage
//           const dataToSave = {
//             tappableAreas: [...tappableAreas, newTappableArea],
//             points: [...points, newPoint],
//             imageUrl: imageUrl?.currentSrc,
//             layers, };
//           localStorage.setItem('editBoardData', JSON.stringify(dataToSave));
  
//           // Retrieve existing tappables from sessionStorage
//           const existingTappables = JSON.parse(sessionStorage.getItem('tappableData')) || [];
  
//           // Add the new tappable
//           existingTappables.push({
//             tappableId: newTappableArea.id,
//             left: newPoint.x * imageUrl.width,
//             top: newPoint.y * imageUrl.height,
//             imageId: boardImageId,
//             points: [...points, newPoint], 
//             selectedImage: newTappableArea.content instanceof HTMLImageElement ? newTappableArea.content.src : null,
//           });
  
//           // Store the updated tappables in sessionStorage
//           sessionStorage.setItem('tappableData', JSON.stringify(existingTappables));
  
//           // Reset states after addition
//           setSelectionBox(null);
//           setNewTappableType(null);
//           setSelectedImage(null);
//           setSelectedEmoji(null);
  
//           console.log('Captured image saved successfully.');
//         } else {
//           console.error('Failed to convert the stage to a valid canvas.');
//         }
//       } catch (error) {
//         console.error('Error handling check click:', error);
//       }
//     }
//   };  
  
//   const handleDeleteClick = () => {
//     if (activeTappableId) {
//       setLayerToDelete(activeTappableId);
//       setShowDeletePopup(true);
//     }
//     setSelectionBox(null);
//   };

//   const handleWheel = (e) => {
//     e.evt.preventDefault();
//     const scaleBy = 1.01;
//     const stage = e.target.getStage();
//     const oldScale = scale;
//     const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
  
//     const mousePointTo = {
//       x: stage.getPointerPosition().x / oldScale - position.x / oldScale,
//       y: stage.getPointerPosition().y / oldScale - position.y / oldScale,
//     };
  
//     const newPos = {
//       x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
//       y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
//     };
  
//     setScale(newScale);
//     setPosition(newPos);
//   };

//   const handleBack = () => {
//     navigate("/home");
//   };

//   // const viewBoardPage = () => {
//   //   navigate("/infoOverlay");
//   // };

//   const handleTappableBoxDragMove = (e) => {
//     if (!imageUrl) return;
    
    
//     const stage = e.target.getStage();
//     const pointerPosition = stage.getPointerPosition();
    
//     const clickX = (pointerPosition?.x - position?.x) / scale;
//     const clickY = (pointerPosition?.y - position?.y) / scale;
    
//     if (clickX >= 0 && clickX <= imageUrl?.width && clickY >= 0 && clickY <= imageUrl?.height) {
//     const newX = Math.max(0, Math.min(e.target.x(), imageUrl?.width - selectionBox?.width));
//     const newY = Math.max(0, Math.min(e.target.y(), imageUrl?.height - selectionBox?.height));
//     updateStateAndSave(() => {
//     setSelectionBox({
//       ...selectionBox,
//       x: newX,
//       y: newY,
//     });
//     if (activeTappableId) {
//       setTappableAreas((prev) =>
//         prev.map((area) =>
//           area.id === activeTappableId
//             ? {
//                 ...area,
//                 position: {
//                   x: newX / imageUrl.width,
//                   y: newY / imageUrl.height,
//                 },
//               }
//             : area
//         )
//       );

//       // Update the position of the corresponding point
//       setPoints((prev) =>
//         prev.map((point, index) =>
//           tappableAreas[index]?.id === activeTappableId
//             ? {
//                 x: (newX + selectionBox.width / 2) / imageUrl.width,
//                 y: (newY + selectionBox.height / 2) / imageUrl.height,
//               }
//             : point
//           )
//         );
//       }
//     });
//   }
// };




//   const handleSelectTappableArea = () => {
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
//     setActiveTappable(null);
//     setActiveTappableId(null); // Reset active tappable ID
//     setTappableAreas((prev) =>
//       prev.map((area) => ({ ...area, isVisible: true }))
//     ); // Activate all tappable areas
//   };

//   const handleUndo = useCallback(() => {
//     if (undoStack.length === 0) return;

//     const prevState = undoStack[undoStack.length - 1];
//     const currentState = {
//       tappableAreas,
//       layers,
//       points,
//       selectionBox,
//       activeTappableId
//     };

//     setRedoStack(prevStack => [...prevStack, currentState]);
//     setUndoStack(prevStack => prevStack.slice(0, -1));

//     setTappableAreas(prevState.tappableAreas);
//     setLayers(prevState.layers);
//     setPoints(prevState.points);
//     setSelectionBox(prevState.selectionBox);
//     setActiveTappableId(prevState.activeTappableId);
//   }, [undoStack, tappableAreas, layers, points, selectionBox, activeTappableId]);

//   const handleRedo = useCallback(() => {
//     if (redoStack.length === 0) return;

//     const nextState = redoStack[redoStack.length - 1];
//     const currentState = {
//       tappableAreas,
//       layers,
//       points,
//       selectionBox,
//       activeTappableId
//     };

//     setUndoStack(prevStack => [...prevStack, currentState]);
//     setRedoStack(prevStack => prevStack.slice(0, -1));

//     setTappableAreas(nextState.tappableAreas);
//     setLayers(nextState.layers);
//     setPoints(nextState.points);
//     setSelectionBox(nextState.selectionBox);
//     setActiveTappableId(nextState.activeTappableId);
//   }, [redoStack, tappableAreas, layers, points, selectionBox, activeTappableId]);


//   const handleLayerDelete = (layerId) => {
//     setLayerToDelete(layerId);
//     setShowDeletePopup(true);
//     setSelectionBox(null);
//   };

//   const confirmLayerDelete = () => {
//     if (layerToDelete) {
//       // Remove the layer
//       updateStateAndSave(() => {
//       setLayers((prev) => prev.filter((layer) => layer.id !== layerToDelete));
      
//       // Remove the corresponding tappable area
//       setTappableAreas((prev) => prev.filter((area) => area.id !== layerToDelete));
      
//       // Remove the corresponding point
//       setPoints((prev) => prev.filter((_, index) => tappableAreas[index]?.id !== layerToDelete));
      
//       setActiveTappable(null);
//       setShowDeletePopup(false);
//       setLayerToDelete(null);
//       setActiveTappableId(null);
//       setTappableAreas((prev) => prev.map((area) => ({ ...area, isVisible: true })));
//     });
//   }
// };
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
//   };

//   const toggleTappableVisibility = (id) => {
//     setTappableAreas((prev) =>
//       prev.map((area) =>
//         area.id === id ? { ...area, isVisible: !area.isVisible } : area
//       )
//     );
//   };

//   const handleNewTappableSelect = (type) => {
//     setNewTappableType(type);
//     const centerX = imageUrl.width / 2 - TAPPABLE_BOX_SIZE / 2;
//     const centerY = imageUrl.height / 2 - TAPPABLE_BOX_SIZE / 2;
//     setSelectionBox({
//       x: centerX,
//       y: centerY,
//       width: TAPPABLE_BOX_SIZE,
//       height: TAPPABLE_BOX_SIZE,
//     });
//   };

//   const handleImageSelect = (imageDataUrl) => {
//     const img = new window.Image(); // an HTMLImageElement
//     img.src = imageDataUrl;
//     img.crossOrigin = "anonymous"; // if dealing with CORS issues
//     img.onload = () => {
//       setSelectedImage(img); 
    
//     const tappableData = JSON.parse(sessionStorage.getItem('tappableData')) || [];
//     const updatedTappableData = tappableData.map(tappable => {
//       if (tappable.tappableId === activeTappableId) {
//         return { ...tappable, selectedImage: imageDataUrl };
//       }
//       return tappable;
//     });
//     sessionStorage.setItem('tappableData', JSON.stringify(updatedTappableData));
//   };
//     img.onerror = () => {
//       console.error("Failed to load image");
//     };
//   };  

//   const handleEmojiSelect = (emoji) => {
//     setSelectedEmoji(emoji);
    
//     const tappableData = JSON.parse(sessionStorage.getItem('tappableData')) || [];
//     const updatedTappableData = tappableData.map(tappable => {
//       if (tappable.tappableId === activeTappableId) {
//         return { 
//           ...tappable, 
//           selectedEmoji: emoji,
//           width: selectionBox.width * imageUrl.width,
//           height: selectionBox.height * imageUrl.height,
//           type: 'emoji'
//         };
//       }
//       return tappable;
//     });
//     sessionStorage.setItem('tappableData', JSON.stringify(updatedTappableData));
//   };

//   const handleNewTappableClose = () => {
//     setShowNewTappable(false);
//   };


//   const handleCircleClick = (index) => {
//     updateStateAndSave(() => {
//     const tappableArea = tappableAreas[index];

//     if (tappableArea) {
//       setSelectedLayerId(tappableArea.id);
//       setIsLayersPanelVisible(true);

//       // Set the clicked tappable as the active selection
//       setSelectionBox({
//         x: tappableArea.position.x * imageUrl.width,
//         y: tappableArea.position.y * imageUrl.height,
//         width: tappableArea.size.width * imageUrl.width,
//         height: tappableArea.size.height * imageUrl.height,
//       });

//       setActiveTappableId(tappableArea.id);
//       setSelectedTappableArea(tappableArea);
//       setPoints((prev) => prev.map((point, i) => i === index ? { ...point, isHidden: true } : point));
//     }  else {
//       console.error(`No tappable area found for index ${index}`);
//     }
//   });
// };


//   const handleTappableAreaClick = (area) => {
//     setSelectedLayerId(area.id);
//     setIsLayersPanelVisible(true);

//     setSelectionBox({
//       x: area.position.x * imageUrl.width,
//       y: area.position.y * imageUrl.height,
//       width: area.size.width * imageUrl.width,
//       height: area.size.height * imageUrl.height,
//     });

//     setActiveTappableId(area.id);
//     setSelectedTappableArea(area);
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
//     setActiveLayerId(id);
//     sessionStorage.setItem('activeLayerId', id);
//     console.log('Saved activeLayerId:', id);
//   setTappableAreas((prev) =>
//     prev.map((area) =>
//       area.id === id ? { ...area, isVisible: true } : { ...area, isVisible: false }
//     )
//   );
//     setSelectedLayerId(id);
//   };
  

//   const handleResizeStart = (e) => {
//     e.cancelBubble = true;
//     setResizing(true);
//   };
  
//   const handleResizeEnd = () => {
//     setResizing(false);
//   };
  
//   const handleResize = (e) => {
//     if (!resizing) return;
  
//     const stage = stageRef.current.getStage();
//     const pointerPosition = stage.getPointerPosition();
    
//     // Calculate the new dimensions relative to the scale and cursor position
//     const newWidth = Math.max(50, (pointerPosition.x - (position.x + selectionBox.x * scale)) / scale);
//     const newHeight = Math.max(50, (pointerPosition.y - (position.y + selectionBox.y * scale)) / scale);
  
//     // Update the selection box size with the new calculated width and height
//     setSelectionBox((prev) => ({
//       ...prev,
//       width: newWidth,
//       height: newHeight,
//     }));
//   };

//   const handleMouseEnter = () => {
//     setCursorStyle('se-resize');
//   };

//   const handleMouseLeave = () => {
//     setCursorStyle('default');
//   };




//   useEffect(() => {
//     const storedTappableData = sessionStorage.getItem('tappableData');
   
    
//     if (storedTappableData) {
//       const tappableArray = JSON.parse(storedTappableData);
  
//       // Ensure the active tappable matches the currently clicked layer
//       const activeTappable = tappableArray.find((tappable) => tappable.tappableId === activeLayerId);
      
//       if (activeTappable) {
//         console.log('Retrieved tappable data:', activeTappable);
//         console.log('Tappable ID:', activeTappable.tappableId);
//         console.log('Left position:', activeTappable.left);
//         console.log('Top position:', activeTappable.top);
//         console.log('Image ID:', activeTappable.imageId);
//         console.log('Points:', activeTappable.points);
//       } else {
//         console.log('No active tappable found for the selected layer.');
//       }
      
//     }
//   }, [activeLayerId]); // Ensure this effect runs whenever the active layer ID changes
  

  

//   const updateImageUrl = (newUrl) => {
//     setImageUrl(newUrl);
//   };

//   const handleLayerActivate = (layerId) => {
//     setSelectedLayerId(layerId);
//     setIsLayersPanelVisible(true);
//     handleLayerTappableClick(layerId);
//   };

  

//   if (loading || imageStatus !== 'loaded') {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <PropagateLoader color="#0085FF" />
//       </div>
//     );
//   }

//   const renderTappableArea = (area) => {
//     // Ensure imageUrl and its properties are defined before rendering
//     if (!imageUrl || !imageUrl.width || !imageUrl.height) return null;
  
//     const isBlank = !area.content;
//     return (
//       <Group
//         key={area.id}
//         x={area.position.x * imageUrl.width}
//         y={area.position.y * imageUrl.height}
//         onClick={() => handleTappableAreaClick(area)}
//       >
//         {!isBlank && (
//           area.content instanceof HTMLImageElement ? (
//             <Image
//           image={area.content}
//           width={area.size.width * imageUrl.width}
//           height={area.size.height * imageUrl.height}
//         />
//           ) : (
//             <Text
//               text={area.content}
//               fontSize={(area.size.width * imageUrl.width) / 2}
//               width={area.size.width * imageUrl.width}
//               height={area.size.height * imageUrl.height}
//               align="center"
//               verticalAlign="middle"
//             />
//           )
//         )}
//       </Group>
//     );
//   };
  

//   const renderDot = (point, index) => (
//     <Circle
//       key={index}
//       x={point.x * imageUrl.width}
//       y={point.y * imageUrl.height}
//       radius={DOT_SIZE / 2 / scale}
//       fill="#0085FF"
//       onClick={() => handleCircleClick(index)}
//       onTap={() => handleCircleClick(index)}
//     />
//   );


// // console.log("url",imageUrl?.currentSrc);

//    return (
//     <div className="relative h-screen">
//       <input
//         type="file"
//         ref={fileInputRef}
//         accept="image/*"
//         className="hidden"
//       />

// <div>
//       <button 
//         onClick={handleBack}
//         className="absolute w-auto top-2 left-2 z-10 bg-gray-500 text-white px-4 py-2 rounded"
//       >
//         Back
//       </button>

//       {/* <button 
//         onClick={viewBoardPage}
//         className="absolute w-auto top-12 left-2 z-10 bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         viewBoard
//       </button> */}
//       </div>
      
      
//       <Stage ref={stageRef}
//   width={stageSize?.width} 
//   height={stageSize?.height} 
//   onWheel={handleWheel}
//   onClick={handleStageClick}
//   onTouchStart={handleStageClick}
//   onMouseMove={handleResize}
//   onTouchMove={handleResize}
//   onMouseUp={handleResizeEnd}
//   onTouchEnd={handleResizeEnd}
//   style={{ cursor: cursorStyle }}
//   x={stateDrag.x}
//   y={stateDrag.y}
//   draggable
//   onDragStart={() => {
//     if (!selectionBox) {
//       setStateDrag({ isDragging: true });
//     }
//   }}
//   onDragEnd={(e) => {
//     if (!selectionBox) {
//       setStateDrag({
//         isDragging: false,
//         x: e.target.x(),
//         y: e.target.y(),
//       });
//     }
//   }}
// >
//   <Layer>
//     <Group
//       x={position?.x}
//       y={position?.y}
//       scaleX={scale}
//       scaleY={scale}
//     >
//       {imageUrl && (
//         <Image
//           image={imageUrl}
//           width={imageUrl?.width}
//           height={imageUrl?.height}
//         />
//       )}
     

// {/* Render Tappable Areas */}
// {tappableAreas.map(renderTappableArea)}

//       {selectionBox && (
//         <Group
//           x={selectionBox?.x}
//           y={selectionBox?.y}
//           draggable
//           onDragMove={handleTappableBoxDragMove}
//         >
//           {/* Grouping the Rect and the icons together */}
//           <Group>
//             <Rect
//               width={selectionBox?.width}
//               height={selectionBox?.height}
//               stroke="#0085FF"
//               strokeWidth={4 / scale}
//               cornerRadius={10 / scale}
//             />
//             {newTappableType === 'image' && selectedImage && (
//                   <Image
//                     image={selectedImage}
//                     width={selectionBox?.width}
//                     height={selectionBox?.height}
//                   />
//                 )}
//                 {newTappableType === 'emoji' && selectedEmoji && (
//                   <Text
//                     text={selectedEmoji}
//                     fontSize={selectionBox?.width / 2}
//                     width={selectionBox?.width}
//                     height={selectionBox?.height}
//                     align="center"
//                     verticalAlign="middle"
//                   />
//                 )}
//             <Image
//               image={arrowDownCircleIcon}
//               x={selectionBox?.width - 20 / scale}
//               y={selectionBox?.height - 20 / scale}
//               width={20 / scale}
//               height={20 / scale}
//               onMouseDown={handleResizeStart}
//               onTouchStart={handleResizeStart}
//               onMouseEnter={handleMouseEnter}
//               onMouseLeave={handleMouseLeave}
//             />
            
//           </Group>

//           <Group
//             y={selectionBox?.height + 4 / scale}
//             x={selectionBox?.width / 2 - TAPPABLE_BOX_SIZE / 2 / scale}
//           >
//             <Rect
//               width={TAPPABLE_BOX_SIZE / scale}
//               height={40 / scale}
//               fill="#0085FF"
//               cornerRadius={10 / scale}
//             />
//             <Image
//               image={checkSquareIcon}
//               x={5 / scale}
//               y={10 / scale}
//               width={ICON_SIZE / scale}
//               height={ICON_SIZE / scale}
//               onClick={handleCheckClick}
//               onTouchStart={handleCheckClick}
//             />
//             <Image
//               image={plusIcon}
//               x={35 / scale}
//               y={10 / scale}
//               width={ICON_SIZE / scale}
//               height={ICON_SIZE / scale}
//             />
//             <Image
//               image={subtractIcon}
//               x={68 / scale}
//               y={10 / scale}
//               width={ICON_SIZE / scale}
//               height={ICON_SIZE / scale}
//               onClick={handleDeleteClick}
//               onTap={handleDeleteClick}
//             />
//           </Group>
//         </Group>
//       )}
//        {points.map(renderDot)}
//     </Group>
//   </Layer>
// </Stage>

     
//       <div className="absolute bottom-0 left-0 right-0">
//       {/* {console.log("imageUrl",imageUrl?.currentSrc)} */}
//         <ActionBar
//         boardId={boardId}
//         boardImageId={boardImageId}
//         imageUrl={imageUrl?.currentSrc}
//         onSelectTappableArea={() => handleNewTappableSelect('area')}
//         onImageSelect={(image) => {
//           handleNewTappableSelect('image');
//           handleImageSelect(image);
//         }}
//         onEmojiSelect={(emoji) => {
//           handleNewTappableSelect('emoji');
//           handleEmojiSelect(emoji);
//         }}
//         onLayersToggle={(isVisible) => setIsLayersPanelVisible(isVisible)}
//         layers={layers}
//         handleUndo={handleUndo}
//         handleRedo={handleRedo}
//       /></div>
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
//         imageUrl={imageUrl?.currentSrc}
//         style={{ bottom: "0" }}
//       />
//       {showDeletePopup && (
//         <DeletePopup
//           onConfirm={confirmLayerDelete}
//           onCancel={cancelLayerDelete}
//         />
//       )}
//     </div>
//   );
// };

// export default EditBoard;