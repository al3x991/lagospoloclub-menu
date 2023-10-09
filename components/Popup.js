import React from "react";
import { FaCheck, FaExclamationCircle, FaTimes } from "react-icons/fa"; // Import icons from react-icons/fa

function Popup({ text, type, onClose }) {
  let icon;

  if (type === "success") {
    icon = <FaCheck className="w-6 h-6 text-green-500" />;
  } else if (type === "error") {
    icon = <FaExclamationCircle className="w-6 h-6 text-red-500" />;
  }

  return (
    <div
      className={`fixed bottom-4 right-4 w-60 bg-blue-600 text-white py-2 px-4 rounded shadow-md flex justify-between items-center`}
    >
      {icon}
      <p className="flex-grow">{text}</p>
      <button className="text-white hover:text-red-500" onClick={onClose}>
        <FaTimes className="w-6 h-6" />
      </button>
    </div>
  );
}

export default Popup;
