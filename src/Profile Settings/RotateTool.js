import React, { useState, useRef, useEffect } from "react";
import undo from "../assets/images/undo.svg";
import redo from "../assets/images/redo.svg";

const RotateTool = ({ image, onClose, onRotate }) => {
  const [rotation, setRotation] = useState(0);
  const [history, setHistory] = useState([0]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.style.transform = `rotate(${rotation}deg)`;
    }
  }, [rotation]);

  const handleRotate = (degree) => {
    setRotation((prevRotation) => {
      const newRotation = (prevRotation + degree) % 360;
      const finalRotation = newRotation < 0 ? newRotation + 360 : newRotation;
      updateHistory(finalRotation);
      return finalRotation;
    });
  };

  const updateHistory = (newRotation) => {
    const newHistory = [...history.slice(0, historyIndex + 1), newRotation];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setRotation(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setRotation(history[historyIndex + 1]);
    }
  };

  const handleApply = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = imageRef.current;

    const radians = (rotation * Math.PI) / 180;
    const sin = Math.abs(Math.sin(radians));
    const cos = Math.abs(Math.cos(radians));

    canvas.width = img.naturalWidth * cos + img.naturalHeight * sin;
    canvas.height = img.naturalWidth * sin + img.naturalHeight * cos;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(radians);
    ctx.drawImage(
      img,
      -img.naturalWidth / 2,
      -img.naturalHeight / 2,
      img.naturalWidth,
      img.naturalHeight
    );

    canvas.toBlob((blob) => {
      onRotate(URL.createObjectURL(blob), rotation);
      onClose();
    }, "image/jpeg");
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="relative">
        <img
          ref={imageRef}
          src={image}
          alt="To rotate"
          className="max-h-[80vh] max-w-[80vw]"
        />
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-4 flex-wrap">
        <button
          className="bg-gray-800 text-white px-4 sm:px-6 py-1 sm:py-1 rounded-full text-sm sm:text-lg"
          onClick={() => handleRotate(-90)}
        >
          Rotate Left
        </button>
        <button
          className="bg-gray-800 text-white px-4 sm:px-6 py-1 sm:py-1 rounded-full text-sm sm:text-lg"
          onClick={() => handleRotate(90)}
        >
          Rotate Right
        </button>
        <button
          className="bg-gray-800 text-white px-4 sm:px-6 py-1 sm:py-1 rounded-full text-sm sm:text-lg"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-blue-600 text-white px-4 sm:px-6 py-1 sm:py-1 rounded-full text-sm sm:text-lg"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-4 bg-black">
        <div
          className="px-2 flex flex-col items-center cursor-pointer"
          onClick={handleUndo}
        >
          <img src={undo} alt="undo" className="w-5 h-5" />
          <div className="text-zinc-400 text-[11px] font-bold font-['Nunito'] capitalize tracking-tight">
            Undo
          </div>
        </div>
        <div
          className="px-2 flex flex-col items-center cursor-pointer"
          onClick={handleRedo}
        >
          <img src={redo} alt="redo" className="w-5 h-5" />
          <div className="text-zinc-400 text-[11px] font-bold font-['Nunito'] capitalize tracking-tight">
            Redo
          </div>
        </div>
      </div>
    </div>
  );
};

export default RotateTool;
