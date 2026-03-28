import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        // Final exit transition
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut",
          onComplete: () => {
            if (containerRef.current) containerRef.current.style.display = 'none';
            onComplete();
          }
        });
      }
    });

    const chars = gsap.utils.toArray('.char');
    
    // Initial State
    gsap.set(chars, { y: 100, opacity: 0, scale: 0.9, rotationX: -90 });
    gsap.set('.progress-bar', { scaleX: 0, transformOrigin: "0% 50%" });
    gsap.set('.role-text', { opacity: 0, y: 20 });
    
    // 1. Reveal "PARTH" character by character with 3D rotation
    tl.to(chars, {
      y: 0,
      opacity: 1,
      scale: 1,
      rotationX: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "expo.out",
    }, 0.2);

    // 2. Animate progress bar simulating load
    tl.to('.progress-bar', {
      scaleX: 1,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: function() {
        setProgress(Math.round(this.progress() * 100));
      }
    }, 0.5);

    // 3. Reveal role subtitle
    tl.to('.role-text', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }, 1.2);

    // 4. Cinematic Exit: Scale up the text massively before clipping out
    tl.to(chars, {
      scale: 3,
      opacity: 0,
      filter: 'blur(20px)',
      duration: 1,
      stagger: 0.05,
      ease: "power3.in"
    }, 3.5);

    tl.to(['.progress-bar-container', '.role-text', '.percent-text'], {
      opacity: 0,
      y: -20,
      duration: 0.6,
      ease: "power2.in"
    }, 3.5);

    return () => { tl.kill(); };
  }, [onComplete]);

  const name = "PARTH";

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030303] overflow-hidden" style={{ perspective: "1000px" }}>
      
      {/* Background glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      {/* Main typography */}
      <div className="relative z-10 flex overflow-hidden mb-6 py-4">
        {name.split("").map((char, index) => (
          <span 
            key={index} 
            className="char text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {char}
          </span>
        ))}
      </div>

      <div className="role-text text-cyan-400/80 font-mono text-sm tracking-[0.4em] uppercase mb-12 relative z-10">
        Digital Experience
      </div>

      <div className="w-48 md:w-64 flex flex-col items-center relative z-10">
        <div className="progress-bar-container w-full h-px bg-white/10 relative overflow-hidden">
          <div className="progress-bar absolute top-0 left-0 w-full h-full bg-cyan-400" />
        </div>
        <div className="percent-text text-white/40 font-mono text-xs mt-4 tracking-widest">
          {progress < 10 ? `0${progress}` : progress}%
        </div>
      </div>
    
    </div>
  );
};

export default Preloader;
