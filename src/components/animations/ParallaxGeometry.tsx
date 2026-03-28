import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParallaxGeometry = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Rotate shapes continuously
      gsap.to('.geom-shape', {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: 'linear',
        stagger: 2,
      });

      // Parallax effect mapped to scroll
      gsap.to('.geom-1', {
        yPercent: -150,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      gsap.to('.geom-2', {
        yPercent: -80,
        xPercent: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });

      gsap.to('.geom-3', {
        yPercent: -200,
        xPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-30">
      {/* Abstract geometric shapes using CSS */}
      <div className="geom-shape geom-1 absolute top-[20%] left-[10%] w-[400px] h-[400px] border-[1px] border-blue-500/20 rounded-full" />
      <div className="geom-shape geom-1 absolute top-[20%] left-[10%] w-[300px] h-[300px] border-[1px] border-blue-400/20 rounded-full" />
      
      <div className="geom-shape geom-2 absolute top-[60%] right-[10%] w-[250px] h-[250px] border-[2px] border-yellow-500/10 rotate-45" />
      <div className="geom-shape geom-2 absolute top-[60%] right-[10%] w-[150px] h-[150px] border-[1px] border-yellow-400/20 rotate-[60deg]" />

      {/* Hexagon approximation */}
      <div className="geom-shape geom-3 absolute top-[80%] left-[30%] w-[150px] h-[150px]">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-blue-500/10 fill-none" strokeWidth="1">
          <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" />
        </svg>
      </div>
      
      <div className="geom-shape geom-3 absolute top-[85%] left-[28%] w-[250px] h-[250px]">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-yellow-500/10 fill-none" strokeWidth="0.5">
          <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" />
        </svg>
      </div>
    </div>
  );
};

export default ParallaxGeometry;
