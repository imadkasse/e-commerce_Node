"use client";
import { useState, useEffect } from "react";
import ArrowUpwardOutlined from "@mui/icons-material/ArrowUpwardOutlined"; // أيقونة السهم للأعلى

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 z-50 right-4 p-3 bg-red-400 text-white rounded-full shadow-lg hover:bg-red-500/60 focus:outline-none"
        >
          <ArrowUpwardOutlined />
        </button>
      )}
    </>
  );
}
