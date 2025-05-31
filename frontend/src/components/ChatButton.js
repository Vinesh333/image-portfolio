import React from "react";

const ChatButton = () => {
  const openChat = () => {
    if (window.Tawk_API) {
      window.Tawk_API.maximize();
    }
  };

  return (
    <button
      onClick={openChat}
      className="fixed bottom-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700 transition"
    >
      💬 Chat with Us
    </button>
  );
};

export default ChatButton;
