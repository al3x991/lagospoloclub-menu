import React, { useState } from "react";
import { ChromePicker } from "react-color";
import Popup from "./Popup";

function QRCodeCustomizationForm() {
  const [color, setColor] = useState("#000000");
  const [menuFile, setMenuFile] = useState(null);
  const [popup, setPopup] = useState({ text: "", visible: false });

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMenuFile(file);
  };

  const handleUpdateMenu = async () => {
    if (!menuFile) {
      setPopup({ text: "Please upload a PDF file.", visible: true });
      return;
    }

    const formData = new FormData();
    formData.append("menuFile", menuFile);
    formData.append("color", color); // Include other customization data as needed.

    try {
      const response = await fetch("/api/upload-menu", {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        setPopup({ text: "Menu updated successfully", visible: true });
      } else {
        setPopup({ text: "Upload failed. Please try again.", visible: true });
      }
    } catch (error) {
      console.error("Error uploading the PDF:", error);
      setPopup({ text: "An error occurred. Please try again.", visible: true });
    }
  };

  return (
    <div>
      <h2>Edit Menu</h2>
      <div>
        <label>
          <span className="font-bold py-4">QR Code Color:</span>
          <ChromePicker color={color} onChangeComplete={handleColorChange} />
        </label>
      </div>
      <div className="py-4">
        <label>
          <span className="font-bold py-4">Upload New Menu (PDF):</span>
          <input type="file" accept=".pdf" onChange={handleFileChange} />
        </label>
      </div>
      <div className="py-12">
        <button
          className="px-3 py-2 bg-indigo-900 text-white rounded"
          onClick={handleUpdateMenu}
        >
          Update Menu QRCode
        </button>
      </div>
      {popup.visible && (
        <Popup
          text={popup.text}
          onClose={() => setPopup({ text: "", visible: false })}
        />
      )}
    </div>
  );
}

export default QRCodeCustomizationForm;
