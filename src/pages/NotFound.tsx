import { useLocation, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import GridBackground from "@/components/GridBackground";
import CustomCursor from "@/components/CustomCursor";
import { Home, Compass } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const NotFound = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(".notfound-code", 
      { opacity: 0, scale: 0.8, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1, delay: 0.2 }
    )
    .fromTo(".notfound-text",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.6"
    )
    .fromTo(".notfound-btn",
      { opacity: 0, scale: 0.9, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6 },
      "-=0.4"
    );

    // Glitch effect loop for 404 text
    const glitchInterval = setInterval(() => {
      const el = document.querySelector(".notfound-code");
      if (!el) return;
      gsap.to(el, {
        skewX: () => Math.random() * 20 - 10,
        x: () => Math.random() * 8 - 4,
        y: () => Math.random() * 4 - 2,
        duration: 0.05,
        yoyo: true,
        repeat: 3,
        onComplete: () => {
          gsap.set(el, { skewX: 0, x: 0, y: 0 });
        }
      });
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, { scope: containerRef });

  return (
    <>
      <CustomCursor />
      <div ref={containerRef} className="flex min-h-screen items-center justify-center bg-[#020202] relative overflow-hidden text-white select-none">
        <GridBackground />
        
        {/* Subtle grid mesh overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative z-10 text-center px-6 max-w-xl flex flex-col items-center">
          {/* Animated Glowing Orb in the Background */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-cyan-500/10 blur-[60px] pointer-events-none z-[-1] animate-pulse" />

          {/* 404 Title */}
          <div className="mb-4 relative">
            <h1 
              className="notfound-code text-[12rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              404
            </h1>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-px bg-cyan-400/40 blur-[1px]" />
          </div>

          {/* Error Message */}
          <div className="notfound-text space-y-4 mb-10">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-[0.2em] text-white flex items-center justify-center gap-3">
              <Compass className="w-6 h-6 text-cyan-400 animate-spin" style={{ animationDuration: "12s" }} /> Route Lost
            </h2>
            <p className="text-white/45 text-sm md:text-base leading-relaxed max-w-md font-mono">
              The requested address <code className="text-cyan-400 bg-white/5 px-2 py-1 rounded font-semibold break-all">{location.pathname}</code> does not exist on this server instance.
            </p>
          </div>

          {/* Action Button */}
          <div className="notfound-btn">
            <Link
              to="/"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-cyan-400 text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl overflow-hidden transition-all duration-300 hover:bg-cyan-300 hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(34,211,238,0.25)] hover:shadow-[0_0_35px_rgba(34,211,238,0.4)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Home className="w-4 h-4" /> Return to Base
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
