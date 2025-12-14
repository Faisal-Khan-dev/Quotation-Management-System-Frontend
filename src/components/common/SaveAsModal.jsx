import React, { useState } from "react";

const SaveAsModal = ({ onClose, isOpen, onSave }) => {
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("pdf");

  if (!isOpen) return null;

  const handleSaveClick = () => {
    if (!fileName) {
      alert("Please enter a file name");
      return;
    }

    onSave({ fileName, fileType });
    onClose();
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-2xl w-[90%] max-w-[800px] p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
            💾
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">Save As</h2>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-6">
          {/* File Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">File Name:</label>
            <input
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              type="text"
              placeholder="Ex. Invoice, Quotation, etc."
              className="border border-gray-300 rounded-lg w-full p-3"
            />
          </div>

          {/* File Type */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Save as type:</label>
            <select
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              className="border border-gray-300 rounded-lg w-full p-3"
            >
              <option value="pdf">PDF</option>
              <option value="jpg">JPG</option>
              <option value="png">PNG</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex justify-end gap-4">
          <button
            className="px-8 py-2 rounded-lg border border-gray-500 text-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-10 py-2 rounded-lg bg-black text-white shadow-sm hover:bg-gray-900"
            onClick={handleSaveClick}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveAsModal;
