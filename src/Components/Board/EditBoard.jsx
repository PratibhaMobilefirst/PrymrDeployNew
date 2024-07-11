import React, { useContext, useEffect, useRef, useState } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { fabric } from "fabric";
import { useLocation } from "react-router-dom";
import { ImageContext } from "./ImageContext/ImageContext";
import Hammer from "hammerjs";
import ActionBar from "./ActionBar/ActionBar";
import TappableArea from "./ActionBar/NewTappeable/TappableArea";
import LayersPanel from "./ActionBar/Layers/Layers";

const EditBoard = ({ cameraImage }) => {
  const { editor, onReady } = useFabricJSEditor();
  const { layerImageUrl } = useContext(ImageContext);
  const [isPanZoomEnabled, setIsPanZoomEnabled] = useState(true);
  const [layers, setLayers] = useState([]);
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const location = useLocation();
  const { croppedImage } = location.state || {};
  const { createBlankCanvas } = location.state || {};
  const [showTappableArea, setShowTappableArea] = useState(false);
  const [tappablePosition, setTappablePosition] = useState({ x: 0, y: 0 });
  const [showNewTappable, setShowNewTappable] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [imageBounds, setImageBounds] = useState({ width: 0, height: 0 });
  const imageRef = useRef(null);
  const [isLayersPanelVisible, setIsLayersPanelVisible] = useState(false);
  const [tappableContent, setTappableContent] = useState(null);
  // const imageUrl = decodeURIComponent(
  //   new URLSearchParams(location.search).get("image")
  // );

  const { imageUrl } = location.state || {};

  useEffect(() => {
    addImagesToCanvas();
  }, [editor?.canvas, layers, layerImageUrl]);

  const addImagesToCanvas = () => {
    const canvas = editor?.canvas;

    if (!canvas) {
      console.log("Canvas not found!");
      return;
    }

    fabric.Image.fromURL(
      layerImageUrl,
      function (oImg) {
        oImg.set({
          selectable: true,
          evented: true,
          originX: "center",
          originY: "center",
          hasControls: true,
          hasBorders: true,
        });

        canvas.add(oImg);
        canvas.requestRenderAll();
      },
      { crossOrigin: "" }
    );

    console.log("Images loaded and added to canvas");
  };

  useEffect(() => {
    const canvas = editor?.canvas;
    if (canvas && imageUrl) {
      const { innerWidth: width, innerHeight: height } = window;
      canvas.setWidth(width - width * 0.1);
      canvas.setHeight(height - height * 0.25);

      // Set the background image (non-selectable) with aspect ratio
      fabric.Image.fromURL(
        imageUrl,
        function (img) {
          const imgAspectRatio = img.width / img.height;
          const canvasAspectRatio = canvas.width / canvas.height;

          let bgWidth, bgHeight;

          if (imgAspectRatio > canvasAspectRatio) {
            // Image is wider
            bgWidth = canvas.width;
            bgHeight = canvas.width / imgAspectRatio;
          } else {
            // Image is taller
            bgHeight = canvas.height;
            bgWidth = canvas.height * imgAspectRatio;
          }

          img.scaleToWidth(bgWidth);
          img.scaleToHeight(bgHeight);

          // Center the background image
          img.set({
            originX: "center",
            originY: "center",
            left: canvas.width / 2,
            top: canvas.height / 2,
          });

          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            selectable: false,
            evented: false,
          });
        },
        { crossOrigin: "" }
      );
      console.log("Image URL:", imageUrl);
    }
  }, [editor?.canvas, imageUrl]);

  useEffect(() => {
    const canvas = editor?.canvas;
    if (!canvas) return;

    let isDragging = false;
    let lastPosX, lastPosY;

    const handleMouseDown = (opt) => {
      if ((opt.e.altKey || opt.e.touches) && isPanZoomEnabled) {
        isDragging = true;
        canvas.selection = false;
        lastPosX = opt.e.clientX || opt.e.touches[0].clientX;
        lastPosY = opt.e.clientY || opt.e.touches[0].clientY;
      }
    };

    const handleMouseMove = (opt) => {
      if (isDragging && isPanZoomEnabled) {
        const e = opt.e;
        const vpt = canvas.viewportTransform;
        vpt[4] += (e.clientX || e.touches[0].clientX) - lastPosX;
        vpt[5] += (e.clientY || e.touches[0].clientY) - lastPosY;
        canvas.requestRenderAll();
        lastPosX = e.clientX || e.touches[0].clientX;
        lastPosY = e.clientY || e.touches[0].clientY;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      canvas.selection = true;
    };

    const handleWheel = (opt) => {
      if (!isPanZoomEnabled) return;

      const delta = opt.e.deltaY;
      let zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    };

    if (isPanZoomEnabled) {
      canvas.on("mouse:down", handleMouseDown);
      canvas.on("mouse:move", handleMouseMove);
      canvas.on("mouse:up", handleMouseUp);
      canvas.on("mouse:wheel", handleWheel);
    }

    return () => {
      canvas.off("mouse:down", handleMouseDown);
      canvas.off("mouse:move", handleMouseMove);
      canvas.off("mouse:up", handleMouseUp);
      canvas.off("mouse:wheel", handleWheel);
    };
  }, [editor?.canvas, isPanZoomEnabled]);

  // Initialize Hammer.js and add pinch event listener
  useEffect(() => {
    const canvasContainer = document.querySelector(".canvas-container");
    const hammer = new Hammer(canvasContainer);
    hammer.get("pinch").set({ enable: true });

    let lastScale = 1;

    hammer.on("pinchstart pinchmove", (ev) => {
      if (!isPanZoomEnabled) return;

      const canvas = editor?.canvas;
      if (!canvas) return;

      const scale = ev.scale / lastScale;
      lastScale = ev.scale;

      const zoom = canvas.getZoom() * scale;
      if (zoom > 20) return;
      if (zoom < 0.01) return;

      canvas.zoomToPoint(new fabric.Point(ev.center.x, ev.center.y), zoom);
    });

    hammer.on("pinchend", () => {
      lastScale = 1;
    });

    return () => {
      hammer.off("pinchstart pinchmove");
      hammer.off("pinchend");
    };
  }, [editor?.canvas, isPanZoomEnabled]);

  useEffect(() => {
    const canvas = editor?.canvas;
    if (canvas) {
      canvasRef.current = canvas;
    }
  }, [editor?.canvas]);

  useEffect(() => {
    if (canvasRef.current && cameraImage) {
      const canvas = canvasRef.current;
      if (canvas instanceof HTMLCanvasElement) {
        const context = canvas.getContext("2d");
        const image = new Image();
        image.src = cameraImage;
        image.onload = () => {
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
      }
    }
  }, [cameraImage]);

  useEffect(() => {
    const resizeCanvas = () => {
      if (editor?.canvas && createBlankCanvas) {
        const canvas = editor.canvas;
        const { innerWidth: width, innerHeight: height } = window;
        canvas.setWidth(width - width * 0.1);
        canvas.setHeight(height - height * 0.3);
        const rect = new fabric.Rect({
          left: 0,
          top: 0,
          fill: "white",
          width: canvas.width,
          height: canvas.height,
          selectable: false,
        });
        canvas.add(rect);
        canvas.renderAll();
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [editor?.canvas, createBlankCanvas]);

  const handleSelectTappableArea = () => {
    const centerX = imageBounds.width / 2;
    const centerY = imageBounds.height / 2;
    setTappablePosition({ x: centerX, y: centerY });
    setShowTappableArea(true);
    setShowNewTappable(false);
  };

  const handleRemoveTappableArea = () => {
    setShowTappableArea(false);
    setTappableContent(null);
  };

  const handleImageSelect = (imageData) => {
    setTappableContent(imageData);
    setShowTappableArea(true);
    setShowNewTappable(false);
  };

  const handleEmojiSelect = (emoji) => {
    setTappableContent(emoji);
    setShowTappableArea(true);
    setShowNewTappable(false);
  };

  const handleNewTappableClose = () => {
    setShowNewTappable(false);
  };

  const handleCheckSquareClick = (content) => {
    setTappableContent(content);
  };

  // const getAdjustedCoordinates = () => {
  //   const adjustedCoords = calculateAdjustedCoordinates();
  //   // setCoordinates(adjustedCoords);
  //   // toggleDialog();
  // console.log("Display Coordinates")
  // console.log(adjustedCoords);
  // };

  const getZoomLevel = (canvas) => {
    const viewportTransform = canvas.viewportTransform;
    const scaleX = viewportTransform[0];
    const scaleY = viewportTransform[3];
    return Math.sqrt(scaleX * scaleY);
  };

  const calculateAdjustedCoordinates = () => {
    const canvas = editor?.canvas;
    const zoom = getZoomLevel(canvas);

    const adjustedCoordinates = [];

    canvas.getObjects().forEach((obj) => {
      const { left, top, width, height, id, text, fill, stroke, imageLink } =
        obj;

      const adjustedLeft = left * zoom;
      const adjustedTop = top * zoom;
      const adjustedWidth = width * zoom;
      const adjustedHeight = height * zoom;

      adjustedCoordinates.push({
        id,
        left: adjustedLeft,
        top: adjustedTop,
        width: adjustedWidth,
        height: adjustedHeight,
        zoom,
        text,
        fill,
        stroke,
        imageLink,
      });
    });

    // commentBoxes.forEach((box) => {
    //   const { id, left, top, comment, zoom } = box;

    //   adjustedCoordinates.push({
    //     id,
    //     left: left,
    //     top: top,
    //     zoom,
    //     comment,
    //   });
    // });

    return adjustedCoordinates;
  };

  const handleCanvasClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setTappablePosition({ x, y });
    setShowTappableArea(true);
    setTappableContent(null);

    const json = editor?.canvas.toJSON();
    console.log("DIsplay JSON");
    console.log(json);

    const adjustedCoords = calculateAdjustedCoordinates();
    // setCoordinates(adjustedCoords);
    // toggleDialog();
    console.log("Display Coordinates");
    console.log(adjustedCoords);
  };

  return (
    <div className="App container">
      <div
        className="canvas-container"
        ref={canvasRef}
        onClick={handleCanvasClick}
      >
        {isPanZoomEnabled ? "" : ""}
        <FabricJSCanvas className="fabric-canvas" onReady={onReady} />
        <ActionBar
          imageUrl={imageUrl}
          onSelectTappableArea={handleSelectTappableArea}
          onImageSelect={handleImageSelect}
          onEmojiSelect={handleEmojiSelect}
          onNewTappableClick={() => setShowNewTappable(true)}
          onLayersToggle={(isVisible) => setIsLayersPanelVisible(isVisible)}
        />
      </div>

      <LayersPanel
        isVisible={isLayersPanelVisible}
        tappableContent={tappableContent}
      />

      {showTappableArea && (
        <TappableArea
          onRemove={handleRemoveTappableArea}
          position={tappablePosition}
          setPosition={setTappablePosition}
          content={tappableContent}
          imageBounds={imageBounds}
          onCheckSquareClick={handleCheckSquareClick}
          initialSize={{ width: 100, height: 100 }}
        />
      )}
    </div>
  );
};

export default EditBoard;
