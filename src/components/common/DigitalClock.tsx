"use client";
import React, { useState, useEffect } from "react";

const DigitalClock = () => {
  const [time, setTime] = useState<string>("");
  const [ampm, setAMPM] = useState<string>("");

  const updateClock = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const ampmValue = hours >= 12 ? "PM" : "AM";
    const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const seconds = currentTime.getSeconds().toString().padStart(2, "0");
    setTime(`${formattedHours}:${minutes}:${seconds}`);
    setAMPM(ampmValue);
  };

  useEffect(() => {
    const interval = setInterval(updateClock, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-4xl font-bold text-center">
      {time} {ampm}
    </div>
  );
};

export default DigitalClock;
