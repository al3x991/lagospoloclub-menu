// pages/pdf.js
import React from "react";
import PDFViewer from "../../components/PDFViewer";
import Image from "next/image";

function PDFPage() {
  // Replace 'your-pdf-url.pdf' with the actual URL or path to your PDF.
  const pdfUrl = "/menu.pdf";

  return (
    <div>
      <div className="flex justify-center p-6">
        <Image
          src="/logo.jpg"
          placeholder="blur"
          blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
          width={120}
          height={120}
        />
      </div>
      <PDFViewer pdfUrl={pdfUrl} />
    </div>
  );
}

export default PDFPage;
