// components/PDFViewer.js
import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Set the worker source explicitly
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

function PDFViewer({ pdfUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load the PDF and get the number of pages
    fetch(pdfUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`,
          );
        }
        return response.blob();
      })
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = function () {
          pdfjs
            .getDocument(new Uint8Array(reader.result))
            .promise.then((pdf) => {
              setNumPages(pdf.numPages);
            });
        };
        reader.readAsArrayBuffer(blob);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [pdfUrl]);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-2">
      <div
        className="w-full mx-auto max-w-xl  p-4 border rounded-lg shadow-lg"
        style={{ height: "800px" }}
      >
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <>
            <div className="mb-4 text-center">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="mr-2 px-3 py-2 bg-indigo-900 text-white rounded"
              >
                Previous Page
              </button>
              <span>
                Page {currentPage} of {numPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === numPages}
                className="ml-2 px-3 py-2 bg-indigo-900 text-white rounded"
              >
                Next Page
              </button>
            </div>
            <div
              className="p-2 px-2 flex justify-center w-full  mx-auto"
              style={{ height: "610px", overflow: "hidden" }}
            >
              <Document file={pdfUrl}>
                <Page scale={0.75} pageNumber={currentPage} />
              </Document>
            </div>
            <div className="my-4 text-center">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="mr-2 px-3 py-2 bg-indigo-900 text-white rounded"
              >
                Previous Page
              </button>
              <span>
                Page {currentPage} of {numPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === numPages}
                className="ml-2 px-3 py-2 bg-indigo-900 text-white rounded"
              >
                Next Page
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PDFViewer;
