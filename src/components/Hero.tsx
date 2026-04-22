import { useRef, useEffect, useState } from "react";
import { Download, ExternalLink, Github, Youtube, Rocket } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const profilePic = "https://i.ibb.co/ds09MVLc/Untitled-design-1.png";

gsap.registerPlugin(ScrollTrigger);

const MagneticHeroVisual = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<gsap.QuickToFunc>();
  const yTo = useRef<gsap.QuickToFunc>();

  useGSAP(() => {
    if (!containerRef.current) return;
    xTo.current = gsap.quickTo(containerRef.current, "rotateY", { duration: 0.8, ease: "power3.out" });
    yTo.current = gsap.quickTo(containerRef.current, "rotateX", { duration: 0.8, ease: "power3.out" });
    gsap.set(containerRef.current, { transformPerspective: 1000, transformStyle: "preserve-3d" });
  }, { scope: containerRef });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !xTo.current || !yTo.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    xTo.current(x * 30);
    yTo.current(-y * 30);
  };

  const handleMouseLeave = () => {
    if (xTo.current) xTo.current(0);
    if (yTo.current) yTo.current(0);
  };

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave} 
      className="relative w-full h-full flex items-center justify-center z-10"
    >
      {children}
    </div>
  );
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [typedText, setTypedText] = useState("");
  const fullText = "Full Stack Developer";
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        setIsTypingComplete(true);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // GSAP Entrance animations
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo('.hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 })
      .fromTo('.hero-title-line', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1, stagger: 0.2 }, "-=0.4")
      .fromTo('.hero-description', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
      .fromTo('.hero-stat', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 }, "-=0.4")
      .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, "-=0.6")
      .fromTo('.hero-visual', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.2 }, "-=1");

  }, { scope: sectionRef });

  const stats = [
    { value: "10+", label: "PROJECTS BUILT" },
    { value: "6+", label: "HACKATHONS" },
    { value: "2+", label: "YEARS CODING" },
  ];

  return (
    <section id="home" ref={sectionRef} className="min-h-screen flex items-center pt-20 pb-8 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Content (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Status Badge */}
            <div className="hero-badge mb-5 flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase">
                Available for work <span className="text-white/30 mx-2">•</span> Gujarat, India
              </span>
            </div>

            {/* Main Heading */}
            <div className="mb-4">
              <h1 className="hero-title-line text-6xl md:text-7xl xl:text-8xl font-black leading-[0.85] tracking-tighter text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                PARTH<br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">KARETIYA</span>
              </h1>
            </div>

            {/* Role / Typing Effect */}
            <div className="mb-5 h-8 flex items-center">
              <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                {typedText}
                <span className="inline-block w-[2px] h-6 bg-cyan-400 ml-1 animate-pulse" />
              </p>
            </div>

            {/* Description — expanded with 2 more lines */}
            <div className="hero-description max-w-xl mb-8">
              <p className="text-white/60 text-base md:text-lg leading-relaxed mb-3">
                I engineer <span className="text-white font-bold">scalable full-stack systems</span> that merge flawless performance with pixel-perfect design. From real-time healthcare platforms to AI-powered tools — <span className="text-cyan-400 font-bold italic">I build software that ships and scales.</span>
              </p>
              <p className="text-white/50 text-sm md:text-base leading-relaxed mb-2">
                I turn complex requirements into clean, maintainable code. Currently exploring AI agents and real-time systems.
              </p>
              <p className="text-white/50 text-sm md:text-base leading-relaxed">
                Open to collaborating on impactful open-source projects and hackathons.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-10 mb-8">
              {stats.map((stat, i) => (
                <div key={i} className="hero-stat flex flex-col">
                  <span className="text-3xl font-black text-white">{stat.value}</span>
                  <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hero-cta flex flex-wrap gap-4 mb-8">
              <a
                href="#projects"
                className="group relative px-7 py-3.5 bg-cyan-400 text-black font-black uppercase tracking-widest text-xs rounded-2xl overflow-hidden transition-all duration-300 hover:bg-cyan-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects <Rocket className="w-4 h-4" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>
              <a
                href="https://drive.google.com/file/d/17YweYR--TMHxc9NHtMwxqRTVO_ZO0Xor/view"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-7 py-3.5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs rounded-2xl flex items-center gap-2 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Download Resume <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>
              <a
                href="#contact"
                className="group relative px-7 py-3.5 bg-purple-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl overflow-hidden transition-all duration-300 hover:bg-purple-400 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Contact Me <ExternalLink className="w-4 h-4" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>
            </div>

            {/* Social Links Bottom */}
            <div className="flex items-center gap-6 pt-6 border-t border-white/5 w-full">
              <a href="https://github.com/ParthKaretiya" className="text-white/40 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.youtube.com/@ParthKaretiya0" className="text-white/40 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
              <div className="h-px flex-1 bg-white/5 mx-4" />
              <span className="text-[10px] font-bold text-white/20 tracking-[0.3em] uppercase whitespace-nowrap">Full Stack Dev</span>
            </div>

          </div>

          {/* Right Content (5 Columns) - Visuals */}
          <div className="lg:col-span-5 relative flex items-center justify-center hero-visual lg:-translate-y-10">
            <MagneticHeroVisual>
              {/* Decorative Background */}
              <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none" style={{ transform: "translateZ(-50px)" }}>
                <div className="absolute h-64 w-64 rounded-full border border-cyan-400/15 md:h-80 md:w-80 lg:h-[420px] lg:w-[420px]" />
                <div className="absolute h-80 w-80 rounded-full border border-cyan-400/10 md:h-96 md:w-96 lg:h-[520px] lg:w-[520px]" />
                <div className="absolute h-96 w-96 rounded-full border border-blue-500/10 md:h-[28rem] md:w-[28rem] lg:h-[620px] lg:w-[620px]" />
                <div className="absolute h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl md:h-64 md:w-64 lg:h-80 lg:w-80" />
              </div>

              {/* User Portrait with Floating elements */}
              <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px]">
                  {/* Glow ring */}
                  <div className="absolute inset-[-15px] rounded-full border border-cyan-400/20 animate-pulse" />
                  <div className="absolute inset-[-30px] rounded-full border border-cyan-400/10 animate-pulse delay-75" />
                  
                  {/* Main Portrait Circle */}
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/10 bg-[#0A0A0A] shadow-2xl relative">
                     <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 to-transparent mix-blend-overlay" />
                     <img 
                      src={profilePic} 
                      alt="Parth Karetiya" 
                      className="w-full h-full object-cover object-[center_25%] grayscale-[20%] hover:grayscale-0 transition-all duration-700 hover:scale-105 pointer-events-none"
                      loading="eager"
                      width={400}
                      height={400}
                     />
                  </div>

                  {/* Floating Tags */}
                  <div className="absolute -top-4 -right-8 z-20 hero-badge pointer-events-none" style={{ transform: "translateZ(30px)" }}>
                    <div className="px-4 py-2.5 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl flex flex-col shadow-2xl">
                      <span className="text-[8px] font-bold text-white/40 tracking-widest uppercase mb-1">Status</span>
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]" />
                        <span className="text-xs font-bold text-white">Open to Work</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -left-8 z-20 hero-badge pointer-events-none" style={{ transform: "translateZ(60px)" }}>
                    <div className="px-4 py-2.5 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl flex flex-col shadow-2xl">
                      <span className="text-[8px] font-bold text-white/40 tracking-widest uppercase mb-1">Stack</span>
                      <span className="text-xs font-bold text-cyan-400">React • Node • MongoDB</span>
                    </div>
                  </div>
                </div>
              </div>
            </MagneticHeroVisual>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
