import React from "react";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";

function GeneratedQRCode({ data, customization }) {
  const { color, frame, logo } = customization;

  const handleDownload = () => {
    const qrCodeContainer = document.getElementById("qrCodeContainer");

    html2canvas(qrCodeContainer).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = "qr-code.png";
      link.click();
    });
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <h2 className="p-4">Your Menu QRCode is Ready!</h2>
      <div id="qrCodeContainer" className="text-center w-72 p-2 ">
        <QRCode
          value={data}
          size={256}
          fgColor={color}
          bgColor="#ffffff"
          level="H"
          renderAs="svg"
        />
      </div>
      <div className="mt-4">
        <button
          className="bg-indigo-900 p-4 rounded-lg text-white"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default GeneratedQRCode;
