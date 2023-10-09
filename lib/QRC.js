import React from "react";
import QRCode from "qrcode.react";

function GeneratedQRCode({ data, customization }) {
  const { color, frame, logo } = customization;

  return (
    <div>
      <QRCode
        value={data}
        size={128}
        fgColor={color}
        bgColor="#ffffff"
        level="H"
        renderAs="svg"
      />
    </div>
  );
}

export default GeneratedQRCode;
