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
    gsap.set(chars, { 
      y: 150, 
      z: -200,
      opacity: 0, 
      scale: 0.3, 
      rotationX: -180,
      rotationY: 90,
      filter: 'blur(10px)'
    });
    gsap.set('.progress-bar', { scaleX: 0, transformOrigin: "0% 50%" });
    gsap.set('.role-text', { opacity: 0, y: 20 });
    
    // 1. Reveal "PARTH KARETIYA" character by character with 3D rotation and bounce
    tl.to(chars, {
      y: 0,
      z: 0,
      opacity: 1,
      scale: 1,
      rotationX: 0,
      rotationY: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      stagger: 0.04,
      ease: "back.out(1.5)",
    }, 0.1);

    // 1.5 Floating effect
    tl.to(chars, {
      y: "-=15",
      rotationZ: () => Math.random() * 4 - 2, // slight tilt
      duration: 1.0,
      yoyo: true,
      repeat: 1,
      ease: "sine.inOut",
      stagger: 0.06
    }, "+=0.2");

    // 2. Animate progress bar simulating load
    tl.to('.progress-bar', {
      scaleX: 1,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: function() {
        setProgress(Math.round(this.progress() * 100));
      }
    }, 0.3);

    // 3. Reveal role subtitle
    tl.to('.role-text', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out"
    }, 0.6);

    // 4. Cinematic Exit: Scale up the text massively before clipping out
    tl.to(chars, {
      scale: 4,
      opacity: 0,
      filter: 'blur(20px)',
      duration: 0.6,
      stagger: 0.04,
      ease: "power3.in"
    }, 2.4);

    tl.to(['.progress-bar-container', '.role-text', '.percent-text'], {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.in"
    }, 2.4);

    return () => { tl.kill(); };
  }, [onComplete]);

  const targetName = "PARTH KARETIYA";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>[]{}!?";
  
  const [charData, setCharData] = useState(
    targetName.split("").map(c => ({
      char: c === " " ? " " : letters[Math.floor(Math.random() * letters.length)],
      isGlitching: c !== " ",
      colorFlash: null as string | null,
      transformStr: 'none'
    }))
  );

  useEffect(() => {
    const chars = targetName.split("");
    const state = chars.map((char, index) => ({
      target: char,
      isSpace: char === " ",
      // Faster cycles: max ~40 cycles = 1.2 seconds max scrambling
      cycles: 5 + (index * 2) + Math.floor(Math.random() * 10),
      current: char === " " ? " " : letters[Math.floor(Math.random() * letters.length)]
    }));

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        let allLocked = true;
        
        setCharData(
          state.map((item) => {
            if (item.isSpace) return { char: " ", isGlitching: false, colorFlash: null, transformStr: 'none' };
            
            if (item.cycles > 0) {
              allLocked = false;
              item.cycles -= 1;
              
              if (Math.random() > 0.15) {
                item.current = letters[Math.floor(Math.random() * letters.length)];
              }
              
              const isColorFlash = Math.random() > 0.8;
              const doTransform = Math.random() > 0.5;
              
              return { 
                char: item.current, 
                isGlitching: true,
                colorFlash: isColorFlash ? (Math.random() > 0.5 ? '#22d3ee' : '#4ade80') : null,
                transformStr: doTransform ? `translateY(${Math.random() * 6 - 3}px) skewX(${Math.random() * 10 - 5}deg)` : 'none'
              };
            } else {
              return { char: item.target, isGlitching: false, colorFlash: null, transformStr: 'none' };
            }
          })
        );

        if (allLocked) clearInterval(interval);
      }, 30); // 30ms -> much faster glitching
      
      return () => clearInterval(interval);
    }, 100);

    return () => clearTimeout(startTimeout);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030303] overflow-hidden" style={{ perspective: "1000px" }}>
      
      {/* Background glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      {/* Main typography */}
      <div className="relative z-10 flex overflow-hidden mb-8 py-2 flex-wrap justify-center hover:scale-105 transition-transform duration-500 px-4 text-center">
        {charData.map((data, index) => (
          <span 
            key={index} 
            className="char inline-block"
            style={{ minWidth: data.char === " " ? "0.8rem" : "auto" }}
          >
            <span 
              className={`inline-block text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black ${
                data.isGlitching ? '' : 'text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50'
              }`}
              style={{ 
                fontFamily: data.isGlitching ? "'Space Mono', 'Courier New', monospace" : "'Cinzel', serif", 
                textShadow: data.isGlitching 
                  ? (data.colorFlash ? `0 0 15px ${data.colorFlash}` : "0 0 8px rgba(34, 211, 238, 0.4)") 
                  : "0 0 20px rgba(255,255,255,0.1)",
                color: data.isGlitching ? (data.colorFlash || '#fff') : undefined,
                transform: data.transformStr
              }}
            >
              {data.char === " " ? "\u00A0" : data.char}
            </span>
          </span>
        ))}
      </div>

      <div className="role-text text-white/40 font-mono text-xs tracking-[0.4em] uppercase mb-12 relative z-10">
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
