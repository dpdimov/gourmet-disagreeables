"use client";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[99]">
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="scroll to top"
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-card bg-primary text-white shadow-btn transition duration-300 ease-in-out hover:bg-primary/90"
        >
          <span className="mt-[6px]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 3.33331L3.33333 7.99998L4.27333 8.93998L7.33333 5.88665V12.6666H8.66666V5.88665L11.7267 8.93998L12.6667 7.99998L8 3.33331Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
