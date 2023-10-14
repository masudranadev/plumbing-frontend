import React from "react";

const LocationPin = ({ text }: { text: string }) => {
  const pinStyle = {
    backgroundColor: "red",
    color: "white",
    padding: "5px 10px",
    display: "inline-flex",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50% 50% 50% 0",
    transform: "rotate(-45deg)",
    border: "1px solid #333",
  };
  return (
    <div>
      <div style={pinStyle}>{text}</div>
    </div>
  );
};

export default LocationPin;
