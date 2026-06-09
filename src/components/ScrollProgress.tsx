import { useEffect, useRef } from "react";

const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      if (barRef.current) {
        barRef.current.style.width = `${progress}%`;
      }
      if (glowRef.current) {
        glowRef.current.style.width = `${progress}%`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none">
      {/* Main gradient bar */}
      <div
        ref={barRef}
        className="h-full transition-[width] duration-75"
        style={{
          width: "0%",
          background: "linear-gradient(90deg, #22d3ee, #6366f1, #a855f7, #ec4899)",
          backgroundSize: "300% 100%",
          animation: "scrollbar-shimmer 3s linear infinite",
        }}
      />
      {/* Glow underneath */}
      <div
        ref={glowRef}
        className="absolute top-0 h-[6px] blur-[4px] opacity-60 transition-[width] duration-75"
        style={{
          width: "0%",
          background: "linear-gradient(90deg, #22d3ee, #6366f1, #a855f7, #ec4899)",
          backgroundSize: "300% 100%",
          animation: "scrollbar-shimmer 3s linear infinite",
        }}
      />
    </div>
  );
};

export default ScrollProgress;
