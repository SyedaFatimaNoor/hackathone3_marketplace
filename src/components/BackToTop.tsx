"use client"
import { useState, useEffect } from "react";

const BackToTop = () => {
  const [showButton, setShowButton] = useState(false);

  
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);   
    } else {
      setShowButton(false);  
    }
  };

   
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
     
    window.addEventListener("scroll", handleScroll);

     
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`w-[50px] h-[50px] fixed bottom-8 right-8 bg-[#2A254B] text-white p-3 rounded-full shadow-lg shadow-white transition-opacity ${
        showButton ? "opacity-100" : "opacity-0"
      }`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      ↑ 
    </button>
  );
};

export default BackToTop;
