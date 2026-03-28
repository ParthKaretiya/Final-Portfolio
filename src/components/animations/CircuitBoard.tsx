import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CircuitBoard = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Initially hide the paths using strokeDasharray
      const paths = gsap.utils.toArray('.circuit-path') as SVGPathElement[];
      
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        // Draw the path as you scroll through the entire page (or section specifically)
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          }
        });
      });

      // Make the glowing nodes pulse continuously
      gsap.to('.circuit-node', {
        opacity: 0.2,
        scale: 0.8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.2,
          from: "random"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-40">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Abstract circuit lines crossing the background */}
        <path className="circuit-path" d="M -100,200 L 300,200 L 400,300 L 800,300 L 900,100 L 1500,100" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" filter="url(#glow)"/>
        <path className="circuit-path" d="M -100,600 L 200,600 L 300,500 L 700,500 L 800,800 L 1500,800" fill="none" stroke="rgba(234, 179, 8, 0.2)" strokeWidth="2" filter="url(#glow)"/>
        <path className="circuit-path" d="M 500,-100 L 500,400 L 600,500 L 600,1000" fill="none" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="1"/>
        <path className="circuit-path" d="M 1000,-100 L 1000,200 L 1100,300 L 1100,1000" fill="none" stroke="rgba(234, 179, 8, 0.15)" strokeWidth="1"/>

        {/* Glowing Nodes at intersections and arbitrary points */}
        <circle className="circuit-node" cx="300" cy="200" r="4" fill="#3b82f6" filter="url(#glow)"/>
        <circle className="circuit-node" cx="400" cy="300" r="5" fill="#3b82f6" filter="url(#glow)"/>
        <circle className="circuit-node" cx="800" cy="300" r="4" fill="#3b82f6" filter="url(#glow)"/>
        <circle className="circuit-node" cx="900" cy="100" r="6" fill="#3b82f6" filter="url(#glow)"/>
        
        <circle className="circuit-node" cx="200" cy="600" r="4" fill="#eab308" filter="url(#glow)"/>
        <circle className="circuit-node" cx="300" cy="500" r="5" fill="#eab308" filter="url(#glow)"/>
        <circle className="circuit-node" cx="700" cy="500" r="4" fill="#eab308" filter="url(#glow)"/>
        <circle className="circuit-node" cx="800" cy="800" r="6" fill="#eab308" filter="url(#glow)"/>

        <circle className="circuit-node" cx="500" cy="400" r="3" fill="#3b82f6" />
        <circle className="circuit-node" cx="600" cy="500" r="3" fill="#3b82f6" />
        <circle className="circuit-node" cx="1000" cy="200" r="3" fill="#eab308" />
        <circle className="circuit-node" cx="1100" cy="300" r="3" fill="#eab308" />
      </svg>
    </div>
  );
};

export default CircuitBoard;
