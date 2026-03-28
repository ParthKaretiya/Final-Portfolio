import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AuroraMesh = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Complex, slow-moving overlapping blooms
      gsap.to('.aurora-blob-1', {
        x: '20vw',
        y: '20vh',
        scale: 1.5,
        rotation: 45,
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.aurora-blob-2', {
        x: '-20vw',
        y: '30vh',
        scale: 1.8,
        rotation: -45,
        duration: 30,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.aurora-blob-3', {
        x: '30vw',
        y: '-20vh',
        scale: 1.2,
        duration: 22,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30 mix-blend-screen isolate">
      {/* 
        Heavy blur applied to container to melt the colors together.
        Will-change transform is added to prevent layout recalculations.
      */}
      <div className="absolute inset-0 blur-[120px] md:blur-[150px]">
        <div className="aurora-blob-1 absolute top-[10%] left-[20%] w-[30vw] h-[30vw] min-w-[300px] min-h-[300px] bg-blue-600/40 rounded-full mix-blend-screen" style={{ willChange: 'transform' }} />
        <div className="aurora-blob-2 absolute top-[40%] right-[10%] w-[40vw] h-[40vw] min-w-[400px] min-h-[400px] bg-indigo-600/30 rounded-full mix-blend-screen" style={{ willChange: 'transform' }} />
        <div className="aurora-blob-3 absolute bottom-[10%] left-[30%] w-[35vw] h-[35vw] min-w-[350px] min-h-[350px] bg-yellow-600/20 rounded-full mix-blend-screen" style={{ willChange: 'transform' }} />
      </div>
    </div>
  );
};

export default AuroraMesh;
