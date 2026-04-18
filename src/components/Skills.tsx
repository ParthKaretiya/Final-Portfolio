import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Server, Database, Settings, ArrowRight, X, Globe, Cpu, Layers } from "lucide-react";
import { createPortal } from "react-dom";

gsap.registerPlugin(ScrollTrigger);

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";

/* ─────────────────────────────────────────────────────────────────
   Skill Popup Component (The "Cloud")
───────────────────────────────────────────────────────────────── */
const SkillPopup = ({ isOpen, onClose, category }: { isOpen: boolean, onClose: () => void, category: any }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(modalRef.current, 
        { opacity: 0, scale: 0.9, backdropFilter: "blur(0px)" },
        { opacity: 1, scale: 1, backdropFilter: "blur(12px)", duration: 0.5, ease: "expo.out" }
      );

      // Animate floating logos
      const logos = gsap.utils.toArray('.floating-logo');
      logos.forEach((logo: any, i) => {
        gsap.to(logo, {
          x: "random(-20, 20)",
          y: "random(-20, 20)",
          rotation: "random(-10, 10)",
          duration: "random(2, 4)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.1
        });
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      ref={modalRef}
      className="fixed inset-0 z-[10001] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
      
      <div 
        ref={containerRef}
        className={`relative w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl p-6 md:p-10 flex flex-col items-center text-center`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className={`w-16 h-16 rounded-xl ${category.bgAccent} border border-white/5 flex items-center justify-center mb-6`}>
          <category.icon className={`w-8 h-8 ${category.accent}`} />
        </div>

        <h3 className="text-2xl md:text-4xl font-black text-white mb-3 tracking-tighter uppercase">{category.title}</h3>
        <p className="text-white/50 text-base max-w-lg mb-8">{category.description}</p>

        {/* Skill Cloud */}
        <div className="relative w-full flex flex-wrap items-center justify-center gap-4 md:gap-6 py-8">
          {category.skills.map((skill: any, idx: number) => (
            <div 
              key={idx} 
              className="floating-logo group flex flex-col items-center gap-3 bg-white/[0.03] border border-white/10 rounded-2xl p-4 md:p-5 hover:bg-white/[0.08] transition-all duration-500 hover:border-white/20 hover:scale-105"
              style={{ willChange: "transform" }}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 relative flex items-center justify-center">
                <img 
                  src={`${DEVICON}${skill.logo}`} 
                  alt={skill.name} 
                  className="w-full h-full object-contain filter drop-shadow-xl"
                  loading="lazy" 
                />
              </div>
              <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">{skill.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold text-white/30 uppercase tracking-widest">
          <Layers className="w-3 h-3" />
          Advanced Stack Components
        </div>
      </div>
    </div>,
    document.body
  );
};

const skillsData = [
  { name: "React.js", logo: "react/react-original.svg", color: "rgba(97, 218, 251, 1)", glow: "shadow-[0_0_20px_rgba(97,218,251,0.5)]" },
  { name: "Next.js", logo: "nextjs/nextjs-original.svg", color: "rgba(255, 255, 255, 1)", glow: "shadow-[0_0_20px_rgba(255,255,255,0.4)]" },
  { name: "TypeScript", logo: "typescript/typescript-original.svg", color: "rgba(49, 120, 198, 1)", glow: "shadow-[0_0_20px_rgba(49,120,198,0.5)]" },
  { name: "JavaScript", logo: "javascript/javascript-original.svg", color: "rgba(247, 223, 30, 1)", glow: "shadow-[0_0_20px_rgba(247,223,30,0.5)]" },
  { name: "Tailwind CSS", logo: "tailwindcss/tailwindcss-original.svg", color: "rgba(6, 182, 212, 1)", glow: "shadow-[0_0_20px_rgba(6,182,212,0.5)]" },
  { name: "Node.js", logo: "nodejs/nodejs-original.svg", color: "rgba(51, 153, 51, 1)", glow: "shadow-[0_0_20px_rgba(51,153,51,0.5)]" },
  { name: "Express.js", logo: "express/express-original.svg", color: "rgba(255, 255, 255, 1)", glow: "shadow-[0_0_20px_rgba(255,255,255,0.4)]" },
  { name: "MongoDB", logo: "mongodb/mongodb-original.svg", color: "rgba(71, 162, 72, 1)", glow: "shadow-[0_0_20px_rgba(71,162,72,0.5)]" },
  { name: "PostgreSQL", logo: "postgresql/postgresql-original.svg", color: "rgba(51, 103, 145, 1)", glow: "shadow-[0_0_20px_rgba(51,103,145,0.5)]" },
  { name: "Python", logo: "python/python-original.svg", color: "rgba(55, 118, 171, 1)", glow: "shadow-[0_0_20px_rgba(55,118,171,0.5)]" },
  { name: "AWS", logo: "amazonwebservices/amazonwebservices-original-wordmark.svg", color: "rgba(255, 153, 0, 1)", glow: "shadow-[0_0_20px_rgba(255,153,0,0.5)]" },
  { name: "Docker", logo: "docker/docker-original.svg", color: "rgba(36, 150, 237, 1)", glow: "shadow-[0_0_20px_rgba(36,150,237,0.5)]" },
  { name: "Git", logo: "git/git-original.svg", color: "rgba(240, 80, 50, 1)", glow: "shadow-[0_0_20px_rgba(240,80,50,0.5)]" },
  { name: "Firebase", logo: "firebase/firebase-plain.svg", color: "rgba(255, 202, 40, 1)", glow: "shadow-[0_0_20px_rgba(255,202,40,0.5)]" },
  { name: "Redis", logo: "redis/redis-original.svg", color: "rgba(220, 56, 45, 1)", glow: "shadow-[0_0_20px_rgba(220,56,45,0.5)]" },
  { name: "GraphQL", logo: "graphql/graphql-plain.svg", color: "rgba(225, 0, 152, 1)", glow: "shadow-[0_0_20px_rgba(225,0,152,0.5)]" },
  { name: "Redux", logo: "redux/redux-original.svg", color: "rgba(118, 74, 188, 1)", glow: "shadow-[0_0_20px_rgba(118,74,188,0.5)]" },
  { name: "Supabase", logo: "supabase/supabase-original.svg", color: "rgba(63, 207, 142, 1)", glow: "shadow-[0_0_20px_rgba(63,207,142,0.5)]" },
];

const categoryCards = [
  {
    title: "Frontend Engineering",
    icon: Code2,
    description: "Architecting pixel-perfect, highly responsive user interfaces with modern web ecosystems.",
    accent: "text-cyan-400",
    bgAccent: "bg-cyan-500/10",
    borderAccent: "group-hover:border-cyan-500/50",
    shadowAccent: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]",
    skills: [
      { name: "React", logo: "react/react-original.svg" },
      { name: "Next.js", logo: "nextjs/nextjs-original.svg" },
      { name: "TypeScript", logo: "typescript/typescript-original.svg" },
      { name: "JavaScript", logo: "javascript/javascript-original.svg" },
      { name: "Tailwind", logo: "tailwindcss/tailwindcss-original.svg" },
      { name: "Redux", logo: "redux/redux-original.svg" },
    ]
  },
  {
    title: "Backend Architecture",
    icon: Server,
    description: "Designing scalable microservices, robust RESTful APIs, and real-time socket communication.",
    accent: "text-amber-400",
    bgAccent: "bg-amber-500/10",
    borderAccent: "group-hover:border-amber-500/50",
    shadowAccent: "group-hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]",
    skills: [
      { name: "Node.js", logo: "nodejs/nodejs-original.svg" },
      { name: "Express", logo: "express/express-original.svg" },
      { name: "Python", logo: "python/python-original.svg" },
      { name: "GraphQL", logo: "graphql/graphql-plain.svg" },
      { name: "C++", logo: "cplusplus/cplusplus-original.svg" },
      { name: "Socket.io", logo: "socketio/socketio-original.svg" },
    ]
  },
  {
    title: "Database & Cloud",
    icon: Database,
    description: "Managing data persistence with structured relational databases and flexible NoSQL solutions.",
    accent: "text-emerald-400",
    bgAccent: "bg-emerald-500/10",
    borderAccent: "group-hover:border-emerald-500/50",
    shadowAccent: "group-hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]",
    skills: [
      { name: "MongoDB", logo: "mongodb/mongodb-original.svg" },
      { name: "PostgreSQL", logo: "postgresql/postgresql-original.svg" },
      { name: "Firebase", logo: "firebase/firebase-plain.svg" },
      { name: "AWS", logo: "amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Supabase", logo: "supabase/supabase-original.svg" },
      { name: "Redis", logo: "redis/redis-original.svg" },
    ]
  },
  {
    title: "DevOps & Tooling",
    icon: Settings,
    description: "Streamlining deployment pipelines, containerizing applications, and maintaining system health.",
    accent: "text-violet-400",
    bgAccent: "bg-violet-500/10",
    borderAccent: "group-hover:border-violet-500/50",
    shadowAccent: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
    skills: [
      { name: "Git", logo: "git/git-original.svg" },
      { name: "Docker", logo: "docker/docker-original.svg" },
      { name: "Linux", logo: "linux/linux-original.svg" },
      { name: "Jest", logo: "jest/jest-plain.svg" },
      { name: "GitHub", logo: "github/github-original.svg" },
      { name: "Figma", logo: "figma/figma-original.svg" },
    ]
  }
];

const row1 = [...skillsData].sort(() => Math.random() - 0.5);
const row2 = [...skillsData].sort(() => Math.random() - 0.5);

/* ─────────────────────────────────────────────────────────────────
   Magnetic 3D Tilt Card Component
───────────────────────────────────────────────────────────────── */
const Magnetic3DCard = ({ cat, onOpen }: { cat: any, onOpen: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const xTo = useRef<gsap.QuickToFunc>();
  const yTo = useRef<gsap.QuickToFunc>();
  const xMoveTo = useRef<gsap.QuickToFunc>();
  const yMoveTo = useRef<gsap.QuickToFunc>();

  useGSAP(() => {
    if (!cardRef.current || !contentRef.current) return;
    
    xTo.current = gsap.quickTo(cardRef.current, "rotateY", { duration: 0.5, ease: "power3.out" });
    yTo.current = gsap.quickTo(cardRef.current, "rotateX", { duration: 0.5, ease: "power3.out" });
    
    xMoveTo.current = gsap.quickTo(contentRef.current, "x", { duration: 0.5, ease: "power3.out" });
    yMoveTo.current = gsap.quickTo(contentRef.current, "y", { duration: 0.5, ease: "power3.out" });

    gsap.set(cardRef.current, { transformPerspective: 1000, transformStyle: "preserve-3d" });
    gsap.set(contentRef.current, { transformStyle: "preserve-3d", transform: "translateZ(40px)" });
  }, { scope: cardRef });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    if (xTo.current) xTo.current(x * 24); 
    if (yTo.current) yTo.current(-y * 24);
    
    if (xMoveTo.current) xMoveTo.current(x * 20);
    if (yMoveTo.current) yMoveTo.current(y * 20);
  };

  const handleMouseLeave = () => {
    if (xTo.current) xTo.current(0);
    if (yTo.current) yTo.current(0);
    if (xMoveTo.current) xMoveTo.current(0);
    if (yMoveTo.current) yMoveTo.current(0);
    gsap.to(cardRef.current, { scale: 1, duration: 0.5, ease: "power3.out" });
  };

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, { scale: 1.02, duration: 0.5, ease: "power3.out" });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`skill-category-card relative group bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col transition-colors duration-500 ${cat.borderAccent} ${cat.shadowAccent} z-10 hover:z-20`}
    >
      <div ref={contentRef} className="flex flex-col h-full pointer-events-none">
        <div className="flex items-center gap-4 mb-5">
          <div className={`w-12 h-12 rounded-xl ${cat.bgAccent} border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
            <cat.icon className={`w-6 h-6 ${cat.accent}`} />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{cat.title}</h3>
        </div>
        
        <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
          {cat.description}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-auto mb-6">
          {cat.skills.map((skill: any, idx: number) => (
            <div key={idx} className="flex items-center gap-2 bg-white/[0.03] border border-white/5 rounded-lg px-2.5 py-2 group-hover:bg-white/[0.06] transition-colors duration-300">
              <img src={`${DEVICON}${skill.logo}`} alt={skill.name} className="w-3.5 h-3.5 object-contain filter drop-shadow-sm" loading="lazy" />
              <span className="text-[10px] md:text-[11px] font-bold text-white/70 uppercase tracking-widest truncate">{skill.name}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); onOpen(); }}
          className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-auto w-fit"
        >
          <span className={`text-sm font-bold uppercase tracking-widest ${cat.accent}`}>Advanced Systems</span>
          <ArrowRight className={`w-4 h-4 ${cat.accent} transform group-hover:translate-x-1 transition-transform duration-300`} />
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   Marquee Component
───────────────────────────────────────────────────────────────── */
const MarqueeRow = ({ items, reverse = false, speed = 80 }: { items: any[], reverse?: boolean, speed?: number }) => {
  return (
    <div className="flex overflow-hidden relative w-full mask-edges py-2 md:py-3" style={{ willChange: "transform" }}>
      <div 
        className={`flex gap-4 md:gap-5 whitespace-nowrap w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ 
          "--duration": `${speed}s`,
          transform: "translateZ(0)"
        } as React.CSSProperties}
      >
        {[...items, ...items].map((skill, i) => (
          <div 
            key={`${skill.name}-${i}`} 
            className={`flex items-center gap-3 px-5 py-3 md:px-6 md:py-3.5 rounded-xl bg-[#080808] border border-white/10 hover:border-white/30 transition-all duration-300 group shrink-0 hover:${skill.glow} hover:-translate-y-1`}
            style={{ willChange: "transform" }}
          >
            <div className="w-7 h-7 md:w-9 md:h-9 relative flex items-center justify-center">
               <img src={`${DEVICON}${skill.logo}`} alt={skill.name} className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-300" loading="lazy" style={{ transform: "translateZ(0)" }} />
               <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 z-[-1]" style={{ backgroundColor: skill.color }} />
            </div>
            <span className="text-white/80 font-bold text-sm md:text-base group-hover:text-white transition-colors duration-300 tracking-wide">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   Main Skills Section
───────────────────────────────────────────────────────────────── */
const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<any>(null);

  useGSAP(() => {
    const preferReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(preferReducedMotion) return;

    gsap.fromTo('.skill-category-card', 
      { opacity: 0, y: 80, rotateX: 15, scale: 0.9 },
      {
        opacity: 1, y: 0, rotateX: 0, scale: 1,
        stagger: 0.2,
        duration: 1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: '.skill-categories-grid',
          start: 'top 85%',
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="skills" className="py-20 md:py-28 bg-[#020202] relative overflow-hidden border-y border-white/5" ref={sectionRef}>
      <style dangerouslySetInnerHTML={{__html: `
        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
        .animate-marquee {
          animation: marquee var(--duration) linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse var(--duration) linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
      `}} />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[50vh] bg-indigo-900/10 blur-[150px] rounded-full pointer-events-none z-0" />
      
      <div className="container mx-auto px-6 mb-16 text-center z-10 relative">
         <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter" style={{ fontFamily: "'Cinzel', serif" }}>
           Skill <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Arsenal</span>
         </h2>
         <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto mt-4 font-light">
           My core technical stack and areas of architectural expertise.
         </p>
      </div>
      
      <div className="container mx-auto px-6 mb-24 relative z-10 perspective-1000">
        <div className="skill-categories-grid grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categoryCards.map((cat, i) => (
            <Magnetic3DCard key={i} cat={cat} onOpen={() => setActiveCategory(cat)} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 relative z-10 w-[100vw] max-w-[100vw] -ml-[50vw] left-[50%] mt-8">
        <div className="container mx-auto px-6 mb-2 text-center">
          <p className="text-white/40 font-mono text-xs md:text-sm tracking-[0.3em] uppercase">Core Technologies Ecosystem</p>
        </div>
        <MarqueeRow items={row1} speed={70} />
        <MarqueeRow items={row2} reverse={true} speed={80} />
      </div>

      {activeCategory && (
        <SkillPopup 
          isOpen={!!activeCategory} 
          onClose={() => setActiveCategory(null)} 
          category={activeCategory} 
        />
      )}
    </section>
  );
};

export default Skills;
