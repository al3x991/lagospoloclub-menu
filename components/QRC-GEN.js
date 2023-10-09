import React, { useState } from "react";
import QRCodeCustomizationForm from "./QRCodeCustomizationForm";
import GeneratedQRCode from "./GenRatedQRC";

function QRCodeGenerator() {
  const [customization, setCustomization] = useState({});
  const pdfUrl = "/menu";

  const handleCustomization = (customization) => {
    setCustomization(customization);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-semibold text-center">QR Code Generator</h1>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <QRCodeCustomizationForm onCustomize={handleCustomization} />
        </div>
        <div>
          <GeneratedQRCode data={pdfUrl} customization={customization} />
        </div>
      </div>
    </div>
  );
}

export default QRCodeGenerator;
