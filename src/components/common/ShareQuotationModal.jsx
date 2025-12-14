import React from "react";

const ShareQuotationModal = ({ isOpen, onClose, shareLink }) => {
  if (!isOpen) return null;

  // Modal outside click close
  const handleOutside = (e) => {
    if (e.target.id === "share-overlay") onClose();
  };

  // Social share URLs
  const shareUrls = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      "Here is your quotation: " + shareLink
    )}`,

    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareLink
    )}`,

    telegram: `https://t.me/share/url?url=${encodeURIComponent(
      shareLink
    )}&text=Quotation%20Link`,

    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareLink
    )}`,

    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareLink
    )}&text=Your%20Quotation`,
  };

  return (
    <div
      id="share-overlay"
      onClick={handleOutside}
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
    >
      <div className="bg-white w-[90%] max-w-[800px] rounded-2xl p-10 shadow-xl">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
            📩
          </div>
          <h2 className="text-xl font-semibold text-blue-600 border border-blue-500 px-4 py-1 rounded-full">
            Send Invoice
          </h2>
        </div>

        <h1 className="text-3xl font-semibold text-center text-gray-900">
          Share Your Quotation
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-10">
          Trading is more effective when you connect with clients!
        </p>

        {/* Share Link */}
        <div className="mb-10">
          <label className="font-medium text-gray-700 mb-2 block">
            Share your link
          </label>

          <div className="relative">
            <input
              type="text"
              value={shareLink}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:ring-2 focus:ring-black"
            />
            <span className="absolute right-3 top-3 text-gray-500 text-xl">
              ⌄
            </span>
          </div>
        </div>

        {/* Share To */}
        <p className="font-medium text-gray-700 mb-5">Share to</p>

        <div className="flex items-center justify-center gap-10 mb-4">

          {/* Facebook */}
          <a href={shareUrls.facebook} target="_blank" className="flex flex-col items-center cursor-pointer hover:opacity-80">
            <div className="bg-[#4267B2] text-white w-14 h-14 rounded-full flex items-center justify-center text-3xl">
              f
            </div>
            <p className="mt-2 text-gray-600 text-sm">Facebook</p>
          </a>

          {/* WhatsApp */}
          <a href={shareUrls.whatsapp} target="_blank" className="flex flex-col items-center cursor-pointer hover:opacity-80">
            <div className="bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center text-3xl">
              🟢
            </div>
            <p className="mt-2 text-gray-600 text-sm">Whatsapp</p>
          </a>

          {/* Telegram */}
          <a href={shareUrls.telegram} target="_blank" className="flex flex-col items-center cursor-pointer hover:opacity-80">
            <div className="bg-[#0088cc] text-white w-14 h-14 rounded-full flex items-center justify-center text-3xl">
              📩
            </div>
            <p className="mt-2 text-gray-600 text-sm">Telegram</p>
          </a>

          {/* LinkedIn */}
          <a href={shareUrls.linkedin} target="_blank" className="flex flex-col items-center cursor-pointer hover:opacity-80">
            <div className="bg-[#0A66C2] text-white w-14 h-14 rounded-full flex items-center justify-center text-3xl">
              in
            </div>
            <p className="mt-2 text-gray-600 text-sm">LinkedIn</p>
          </a>

          {/* Twitter */}
          <a href={shareUrls.twitter} target="_blank" className="flex flex-col items-center cursor-pointer hover:opacity-80">
            <div className="bg-[#1DA1F2] text-white w-14 h-14 rounded-full flex items-center justify-center text-3xl">
              🐦
            </div>
            <p className="mt-2 text-gray-600 text-sm">Twitter</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShareQuotationModal;
