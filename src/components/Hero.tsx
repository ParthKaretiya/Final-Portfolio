import { useRef, useEffect, useState } from "react";
import { Download, ExternalLink, Github, Youtube } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

const profilePic = "https://i.ibb.co/ds09MVLc/Untitled-design-1.png";

gsap.registerPlugin(ScrollTrigger);

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
    <section ref={sectionRef} className="min-h-screen flex items-center pt-24 pb-12 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Status Badge */}
            <div className="hero-badge mb-8 flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase">
                Available for work <span className="text-white/30 mx-2">•</span> Gujarat, India
              </span>
            </div>

            {/* Main Heading */}
            <div className="mb-8">
              <h1 className="hero-title-line text-6xl md:text-7xl xl:text-8xl font-black leading-[0.85] tracking-tighter text-white mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                PARTH
              </h1>
              <h1 className="hero-title-line text-6xl md:text-7xl xl:text-8xl font-black leading-[0.85] tracking-tighter bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                KARETIYA
              </h1>
            </div>

            {/* Role / Typing Effect */}
            <div className="mb-8 h-8 flex items-center">
              <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                {typedText}
                <span className="inline-block w-[2px] h-6 bg-cyan-400 ml-1 animate-pulse" />
              </p>
            </div>

            {/* Description */}
            <div className="hero-description max-w-xl mb-12">
              <p className="text-white/60 text-lg md:text-xl leading-relaxed">
                I engineer <span className="text-white font-bold">scalable full-stack systems</span> that merge flawless performance with pixel-perfect design. From real-time healthcare platforms to AI-powered tools — <span className="text-cyan-400 font-bold italic">I build software that ships and scales.</span>
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-12 mb-12">
              {stats.map((stat, i) => (
                <div key={i} className="hero-stat flex flex-col">
                  <span className="text-3xl font-black text-white">{stat.value}</span>
                  <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-16">
              <a 
                href="https://drive.google.com/file/d/17YweYR--TMHxc9NHtMwxqRTVO_ZO0Xor/view" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hero-cta px-8 py-4 bg-cyan-400 text-black font-black text-sm rounded-full flex items-center gap-2.5 hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)]"
              >
                <Download size={18} /> DOWNLOAD RESUME
              </a>
              <a 
                href="#projects" 
                className="hero-cta px-8 py-4 border border-white/20 text-white font-black text-sm rounded-full hover:bg-white/10 transition-all flex items-center gap-2"
              >
                VIEW PROJECTS <ExternalLink size={16} className="opacity-60" />
              </a>
              <a 
                href="#contact" 
                className="hero-cta px-8 py-4 border border-white/20 text-white font-black text-sm rounded-full hover:bg-white/10 transition-all"
              >
                GET IN TOUCH
              </a>
            </div>

            {/* Social Links Bottom */}
            <div className="flex items-center gap-6 pt-8 border-t border-white/5 w-full">
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
          <div className="lg:col-span-5 relative flex items-center justify-center hero-visual lg:-translate-y-20">
            
            {/* Decorative Background */}
            <div className="absolute inset-0 z-0 flex items-center justify-center">
              <div className="absolute h-64 w-64 rounded-full border border-cyan-400/15 md:h-80 md:w-80 lg:h-[420px] lg:w-[420px]" />
              <div className="absolute h-80 w-80 rounded-full border border-cyan-400/10 md:h-96 md:w-96 lg:h-[520px] lg:w-[520px]" />
              <div className="absolute h-96 w-96 rounded-full border border-blue-500/10 md:h-[28rem] md:w-[28rem] lg:h-[620px] lg:w-[620px]" />
              <div className="absolute h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl md:h-64 md:w-64 lg:h-80 lg:w-80" />
            </div>

            {/* User Portrait with Floating elements */}
            <div className="relative z-10">
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
                    className="w-full h-full object-cover object-[center_25%] grayscale-[20%] hover:grayscale-0 transition-all duration-700 hover:scale-105" 
                   />
                </div>

                {/* Floating Tags */}
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute -top-4 -right-8 z-20"
                >
                  <div className="px-4 py-2.5 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl flex flex-col shadow-2xl">
                    <span className="text-[8px] font-bold text-white/40 tracking-widest uppercase mb-1">Status</span>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]" />
                      <span className="text-xs font-bold text-white">Open to Work</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="absolute -bottom-4 -left-8 z-20"
                >
                  <div className="px-4 py-2.5 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl flex flex-col shadow-2xl">
                    <span className="text-[8px] font-bold text-white/40 tracking-widest uppercase mb-1">Stack</span>
                    <span className="text-xs font-bold text-cyan-400">React • Node • MongoDB</span>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
