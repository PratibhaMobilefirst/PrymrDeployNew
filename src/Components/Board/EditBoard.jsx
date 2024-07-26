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
  const [tappableAreas, setTappableAreas] = useState([]);
  const [activeTappable, setActiveTappable] = useState(null);
  const [jsonContent, setJsonContent] = useState("");
  const canvasRef = useRef(null);
  const location = useLocation();
  const { createBlankCanvas } = location.state || {};
  const [showTappableArea, setShowTappableArea] = useState(false);
  const [tappablePosition, setTappablePosition] = useState({ x: 0, y: 0 });
  const [showNewTappable, setShowNewTappable] = useState(false);
  const [lastAddedTappableContent, setLastAddedTappableContent] =
    useState(null);
  const [imageBounds, setImageBounds] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const [isLayersPanelVisible, setIsLayersPanelVisible] = useState(false);
  const [tappableContent, setTappableContent] = useState(null);
  const imageUrl = JSON.parse(sessionStorage.getItem("state"))?.imageUrl;
  const [selectedLayerId, setSelectedLayerId] = useState(null);

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
      canvas.setWidth(width - width * 0.0);
      canvas.setHeight(height - height * 0.2);

      fabric.Image.fromURL(
        imageUrl,
        function (img) {
          const imgAspectRatio = img.width / img.height;
          const canvasAspectRatio = canvas.width / canvas.height;

          let bgWidth, bgHeight;

          if (imgAspectRatio > canvasAspectRatio) {
            bgWidth = canvas.width;
            bgHeight = canvas.width / imgAspectRatio;
          } else {
            bgHeight = canvas.height;
            bgWidth = canvas.height * imgAspectRatio;
          }

          img.scaleToWidth(bgWidth);
          img.scaleToHeight(bgHeight);

          img.set({
            originX: "center",
            originY: "center",
            left: canvas.width / 2,
            top: canvas.height / 2,
          });

          setImageBounds({
            left: canvas.width / 2 - bgWidth / 2,
            top: canvas.height / 2 - bgHeight / 2,
            width: bgWidth,
            height: bgHeight,
          });

          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            selectable: false,
            evented: false,
          });

          img.on("modified", () => {
            setImageBounds({
              left: img.left - (img.width * img.scaleX) / 2,
              top: img.top - (img.height * img.scaleY) / 2,
              width: img.width * img.scaleX,
              height: img.height * img.scaleY,
            });
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
        canvas.setWidth(width - width * 0);
        canvas.setHeight(height - height * 0.2);
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

  const captureBackgroundArea = (position, size) => {
    const canvas = editor?.canvas;
    if (!canvas) return null;

    const dataUrl = canvas.toDataURL({
      left: position.x,
      top: position.y,
      width: size.width,
      height: size.height,
    });

    return dataUrl;
  };

  const addTappableArea = (content = null) => {
    if (activeTappable) {
      alert(
        "Please finish placing the current tappable element before creating a new one."
      );
      return;
    }

    const newTappableArea = {
      id: `tappable-${getRandomNumber(100000, 999999999)}`,
      position: { x: tappablePosition.x, y: tappablePosition.y },
      size: { width: 100, height: 100 },
      content,
      isVisible: true,
    };

    const newLayer = {
      id: newTappableArea.id,
      name: `Layer ${layers.length + 1}`,
      tappableContent: content,
      selectedImage: null,
    };

    setTappableAreas((prev) => {
      const updatedAreas = [...prev, newTappableArea];
      saveCanvasAsJson(updatedAreas);
      return updatedAreas;
    });

    setLayers((prev) => [...prev, newLayer]);
    setShowTappableArea(true);
    setTappableContent(null);
    setIsPanZoomEnabled(false);
    setActiveTappable(newTappableArea);
  };

  const handleSelectTappableArea = () => {
    const centerX = imageBounds.left + imageBounds.width / 2;
    const centerY = imageBounds.top + imageBounds.height / 2;
    setTappablePosition({ x: centerX, y: centerY });
    setShowTappableArea(true);
    setShowNewTappable(false);
    addTappableArea();
  };

  const handleRemoveTappableArea = (id) => {
    setTappableAreas((prev) => {
      const updatedAreas = prev.filter((area) => area.id !== id);
      saveCanvasAsJson(updatedAreas);
      return updatedAreas;
    });
    setLayers((prev) => prev.filter((layer) => layer.id !== id));
    setShowTappableArea(false);
    setTappableContent(null);
    setIsPanZoomEnabled(true);
    setActiveTappable(null);
  };

  const handleLayerDelete = (layerId) => {
    setLayers((prev) => prev.filter((layer) => layer.id !== layerId));
    setTappableAreas((prev) => prev.filter((area) => area.id !== layerId));
    setActiveTappable(null);
  };

  const handleFixTappableContent = (id, position, size) => {
    const tappable = tappableAreas.find((area) => area.id === id);
    if (!tappable) return;

    let capturedContent = tappable.content;
    if (!capturedContent) {
      capturedContent = captureBackgroundArea(position, size);
    }

    const updatedLayers = layers.map((layer) => {
      if (layer.id === id) {
        return {
          ...layer,
          tappableContent: capturedContent,
        };
      }
      return layer;
    });

    setLayers(updatedLayers);

    setTappableAreas((prev) =>
      prev.map((area) =>
        area.id === id
          ? { ...area, content: capturedContent, isVisible: false }
          : area
      )
    );

    setTappableContent(capturedContent);
    setActiveTappable(null); // Reset the activeTappable state
    setIsPanZoomEnabled(true);
  };

  const toggleTappableVisibility = (id) => {
    setTappableAreas((prev) =>
      prev.map((area) =>
        area.id === id ? { ...area, isVisible: !area.isVisible } : area
      )
    );
  };

  const handleImageSelect = (imageData) => {
    setTappableContent(imageData);
    setShowTappableArea(true);
    setShowNewTappable(false);
    addTappableArea(imageData);
  };

  const handleEmojiSelect = (emoji) => {
    setTappableContent(emoji);
    setShowTappableArea(true);
    setShowNewTappable(false);
    addTappableArea(emoji);
  };

  const handleNewTappableClose = () => {
    setShowNewTappable(false);
  };

  const handleCheckSquareClick = (id, content, position, size) => {
    if (content) {
      toggleTappableVisibility(id);
    } else {
      handleFixTappableContent(id, position, size);
    }
    if (!content) {
      const capturedContent = captureBackgroundArea(position, size);
      const updatedLayers = layers.map((layer) => {
        if (layer.id === activeTappable.id) {
          return {
            ...layer,
            tappableContent: capturedContent,
          };
        }
        return layer;
      });
      setLayers(updatedLayers);
      setTappableContent(content);
      setActiveTappable(null);
    } else {
      setActiveTappable(null);
    }
  };

  const handleCircleClick = (id) => {
    setSelectedLayerId(id);
    setIsLayersPanelVisible(true);
    setTappableAreas((prev) =>
      prev.map((area) =>
        area.id === id
          ? { ...area, isVisible: true }
          : { ...area, isVisible: false }
      )
    );
  };

  const handleLayerClick = (id) => {
    setTappableAreas((prev) =>
      prev.map((area) =>
        area.id === id
          ? { ...area, isVisible: true }
          : { ...area, isVisible: false }
      )
    );
  };

  const getZoomLevel = (canvas) => {
    const viewportTransform = canvas.viewportTransform;
    const scaleX = viewportTransform[0];
    const scaleY = viewportTransform[3];
    return Math.sqrt(scaleX * scaleY);
  };

  const calculateAdjustedCoordinates = (tappableAreas) => {
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

    tappableAreas.forEach((area) => {
      adjustedCoordinates.push({
        id: area.id,
        left: area.position.x,
        top: area.position.y,
        width: area.size.width,
        height: area.size.height,
        content: area.content,
      });
    });

    return adjustedCoordinates;
  };

  const handleCanvasClick = (event) => {
    if (activeTappable) return;

    const rect = event.target.getBoundingClientRect();
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;

    let x = clientX - rect.left;
    let y = clientY - rect.top;

    x = Math.max(
      imageBounds.left,
      Math.min(x, imageBounds.left + imageBounds.width - 100)
    );
    y = Math.max(
      imageBounds.top,
      Math.min(y, imageBounds.top + imageBounds.height - 100)
    );

    const newTappableArea = {
      id: `tappable-${getRandomNumber(100000, 999999999)}`,
      position: { x, y },
      size: { width: 100, height: 100 },
      content: null,
      isVisible: true,
    };

    const newLayer = {
      id: newTappableArea.id,
      name: `Layer ${layers.length + 1}`,
      tappableContent: null,
      selectedImage: null,
    };

    setTappableAreas((prev) => {
      const updatedAreas = [...prev, newTappableArea];
      saveCanvasAsJson(updatedAreas);
      return updatedAreas;
    });

    setLayers((prev) => [...prev, newLayer]);
    setTappablePosition({ id: newTappableArea.id, x, y });
    setShowTappableArea(true);
    setTappableContent(null);
    setIsPanZoomEnabled(false);
    setActiveTappable(newTappableArea);

    const json = editor?.canvas.toJSON();
    console.log("Display JSON");
    console.log(json);

    const adjustedCoords = calculateAdjustedCoordinates(tappableAreas);
    console.log("Display Coordinates");
    console.log(adjustedCoords);
  };

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const saveCanvasAsJson = (tappableAreas) => {
    const json = {
      canvas: editor?.canvas.toJSON(),
      tappableAreas: calculateAdjustedCoordinates(tappableAreas),
    };
    setJsonContent(JSON.stringify(json, null, 2));
    console.log("Saved JSON:", json);
  };

  return (
    <div className="App container">
      <div
        className="canvas-container"
        ref={canvasRef}
        onClick={handleCanvasClick}
        onTouchStart={handleCanvasClick} // Handle touch events
      >
        {isPanZoomEnabled ? "" : ""}
        <FabricJSCanvas className="fabric-canvas" onReady={onReady} />
      </div>
      <ActionBar
        imageUrl={imageUrl}
        onSelectTappableArea={handleSelectTappableArea}
        onImageSelect={handleImageSelect}
        onEmojiSelect={handleEmojiSelect}
        onLayersToggle={(isVisible) => setIsLayersPanelVisible(isVisible)}
        layers={layers} // Pass layers as prop
      />

      <LayersPanel
        isVisible={isLayersPanelVisible}
        tappableContent={tappableContent}
        lastAddedTappableContent={lastAddedTappableContent}
        layers={layers}
        setLayers={setLayers}
        handleFixTappableContent={handleFixTappableContent}
        selectedLayerId={selectedLayerId}
        onLayerClick={handleLayerClick}
        onLayerDelete={handleLayerDelete}
      />

      {tappableAreas.map((area) =>
        area.isVisible ? (
          <TappableArea
            key={area.id}
            id={area.id}
            onRemove={() => handleRemoveTappableArea(area.id)}
            onFixContent={handleFixTappableContent}
            position={area.position}
            setPosition={(position) =>
              setTappableAreas((prev) =>
                prev.map((a) => (a.id === area.id ? { ...a, position } : a))
              )
            }
            size={area.size}
            setSize={(size) =>
              setTappableAreas((prev) =>
                prev.map((a) => (a.id === area.id ? { ...a, size } : a))
              )
            }
            content={area.content}
            imageBounds={imageBounds}
            onCheckSquareClick={handleCheckSquareClick}
            initialSize={area.size}
          />
        ) : (
          <div
            key={area.id}
            style={{
              position: "absolute",
              left: `${area.position.x}px`,
              top: `${area.position.y}px`,
              width: "20px",
              height: "20px",
              backgroundColor: "blue",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            onClick={() => handleCircleClick(area.id)}
          ></div>
        )
      )}
    </div>
  );
};

export default EditBoard;
