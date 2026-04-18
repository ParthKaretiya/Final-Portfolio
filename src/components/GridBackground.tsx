import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GridBackground = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);
  const glow3Ref = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Optimized parallax
    gsap.to(bgRef.current, {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smoother scrub
      }
    });

    // High-performance GSAP animations for glows
    const animateGlow = (el: HTMLDivElement | null, scale: number, delay: number, duration: number) => {
      if (!el) return;
      gsap.to(el, {
        scale,
        opacity: "+=0.03",
        duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay,
        force3D: true
      });
    };

    animateGlow(glow1Ref.current, 1.15, 0, 8);
    animateGlow(glow2Ref.current, 1.25, 2, 12);
    animateGlow(glow3Ref.current, 1.1, 4, 10);

  }, { scope: bgRef });

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020202]" aria-hidden="true">
      <div ref={bgRef} className="absolute inset-[-10%] w-[120%] h-[120%]">
        {/* Optimized Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            willChange: "transform"
          }}
        />
        
        {/* Optimized Blow-Blur Glows */}
        <div 
          ref={glow1Ref}
          className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full blur-[100px] opacity-[0.05] will-change-transform" 
          style={{ background: "radial-gradient(circle, #00C9FF, transparent 70%)" }} 
        />
        
        <div 
          ref={glow2Ref}
          className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full blur-[100px] opacity-[0.03] will-change-transform" 
          style={{ background: "radial-gradient(circle, #7000FF, transparent 70%)" }} 
        />

        <div 
          ref={glow3Ref}
          className="absolute top-[40%] left-[30%] w-[500px] h-[500px] rounded-full blur-[80px] opacity-[0.02] will-change-transform" 
          style={{ background: "radial-gradient(circle, #FF00C1, transparent 70%)" }} 
        />

        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505] opacity-80" />
      </div>
    </div>
  );
};

export default GridBackground;
