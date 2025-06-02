import React from "react";

function FullImageBackdrop({ imageUrl, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <img
        src={imageUrl}
        alt="Full"
        style={{
          maxWidth: "90%",
          maxHeight: "90%",
          borderRadius: "10px",
        }}
      />
    </div>
  );
}

export default FullImageBackdrop;
