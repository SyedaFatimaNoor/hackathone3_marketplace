"use client"
import React, { useState, useEffect } from "react";


function FlareCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [cursorColor, setCursorColor] = useState("#2A254B");  

  const handleMouseMove = (e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });

    const target = e.target as HTMLElement;

    setIsPointer(window.getComputedStyle(target).getPropertyValue("cursor") === "pointer");
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    const bgColor = window.getComputedStyle(target).backgroundColor;
    if (bgColor && bgColor !== "rgba(0, 0, 0, 0)") {
      setCursorColor(bgColor);
    } else {
      setCursorColor("#2A254B"); 
    }
  };

  
  const handleMouseLeave = () => {
    setCursorColor("#2A254B"); 
  };


  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const flareSize = isPointer ? 0 : 30;  

 
  return (
    <div
      className={`fixed transform -translate-x-1/2 -translate-y-1/2 z-[9999] pointer-events-none rounded-full transition-all duration-150`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${flareSize}px`,
        height: `${flareSize}px`,
        backgroundColor: cursorColor,  
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    ></div>
  );
}

export default FlareCursor;
