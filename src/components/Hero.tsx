import { useRef, useEffect, useState } from "react";
import { FileText, FolderOpen, Mail, ArrowDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import profilePicture from "@/assets/profile-picture.png";
import ParticleMesh from "./animations/ParticleMesh";

const roles = ["React Specialist", "Full Stack Developer", "Problem Solver", "Code Craftsman"];

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentRole, setCurrentRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const target = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && charIndex < target.length) {
      timeout = setTimeout(() => { setCurrentRole(target.substring(0, charIndex + 1)); setCharIndex(charIndex + 1); }, 70);
    } else if (!isDeleting && charIndex === target.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => { setCurrentRole(target.substring(0, charIndex - 1)); setCharIndex(charIndex - 1); }, 35);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  // Entrance animations and Scroll Parallax
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(['.hero-avatar', '.hero-ring', '.hero-char', '.hero-subtitle', '.hero-bio', '.hero-stat', '.hero-cta', '.scroll-indicator'], { opacity: 1 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Initial states for cinematic impact
    gsap.set('.hero-avatar', { scale: 1.5, opacity: 0, filter: 'blur(10px)' });
    gsap.set('.hero-ring', { scale: 2, opacity: 0, filter: 'blur(20px)', rotation: -90 });
    gsap.set('.hero-char', { opacity: 0, y: 100, rotationX: -120, scale: 1.2, filter: 'blur(10px)' });
    gsap.set(['.hero-subtitle', '.hero-bio'], { opacity: 0, y: 40, filter: 'blur(10px)' });
    gsap.set('.hero-stat', { opacity: 0, y: 20, scale: 0.9 });
    gsap.set('.hero-cta', { opacity: 0, y: 30, scale: 0.9 });
    gsap.set('.scroll-indicator', { opacity: 0, y: -20 });

    tl.to('.hero-avatar', { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.8, ease: 'expo.out' }, 0.2)
      .to('.hero-ring', { scale: 1, opacity: 0.5, filter: 'blur(0px)', rotation: 0, duration: 2, ease: 'expo.out' }, 0.3)
      .to('.hero-char', { opacity: 1, y: 0, rotationX: 0, scale: 1, filter: 'blur(0px)', duration: 1.5, stagger: 0.05, ease: 'expo.out' }, 0.4)
      .to('.hero-subtitle', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' }, 1.2)
      .to('.hero-bio', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }, 1.4)
      .to('.hero-stat', { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.1, ease: 'back.out(1.4)' }, 1.6)
      .to('.hero-cta', { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.1, ease: 'back.out(1.7)' }, 1.8)
      .to('.scroll-indicator', { opacity: 1, y: 0, duration: 1 }, 2.2);

    // Continuous ring rotation
    gsap.to('.hero-ring', { rotation: "+=360", duration: 20, repeat: -1, ease: 'linear' });

    // Ambient background glow animation
    gsap.to('.bg-glow', {
      scale: 1.2,
      opacity: 0.06,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 2
    });

    // Scroll parallax features
    gsap.to('.hero-content-wrapper', {
      yPercent: 25,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

  }, { scope: sectionRef });

  // Mouse Parallax & Scroll Skew
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    let lastScrollY = window.scrollY;
    let skew = 0;
    
    const handleEvents = (e?: MouseEvent) => {
      // Mouse Parallax
      if (e) {
        const mx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        const my = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
        const avatar = document.querySelector('.hero-avatar') as HTMLElement;
        if (avatar) {
          avatar.style.transform = `translate(${mx * 8}px, ${my * 8}px) scale(1)`;
        }
      }

      // Scroll Skew
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;
      skew = diff * 0.15;
      lastScrollY = currentScrollY;
      
      const content = sectionRef.current?.querySelector('.hero-content-wrapper') as HTMLElement;
      if (content) {
        content.style.transform = `skewY(${Math.max(-5, Math.min(5, skew))}deg)`;
        setTimeout(() => {
          if (content) content.style.transform = `skewY(0deg)`;
        }, 150);
      }
    };

    window.addEventListener('mousemove', handleEvents);
    window.addEventListener('scroll', handleEvents);
    return () => {
      window.removeEventListener('mousemove', handleEvents);
      window.removeEventListener('scroll', handleEvents);
    };
  }, []);

  const firstName = "PARTH".split("");
  const lastName = "KARETIYA".split("");

  const stats = [
    { value: "2+", label: "Years Active" },
    { value: "10+", label: "Projects" },
    { value: "6", label: "Certifications" },
    { value: "15+", label: "GitHub Repos" },
  ];

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <ParticleMesh />
      {/* Subtle background highlights */}
      <div className="bg-glow absolute top-1/4 left-[10%] w-[500px] h-[500px] rounded-full opacity-[0.03] pointer-events-none" style={{ background: "radial-gradient(circle, #fff, transparent 70%)" }} />
      <div className="bg-glow absolute bottom-1/4 right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.02] pointer-events-none" style={{ background: "radial-gradient(circle, #fff, transparent 70%)" }} />

      <div className="container mx-auto px-6 relative z-10 hero-content-wrapper">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-8">
          {/* Avatar with Ring */}
          <div className="relative" style={{ perspective: "1000px" }}>
            <div className="hero-ring absolute -inset-4 rounded-full opacity-0" style={{
              background: "conic-gradient(from 0deg, hsl(0 0% 100% / 0.3), transparent 25%, hsl(0 0% 100% / 0.1), transparent 50%, hsl(0 0% 100% / 0.3), transparent 75%)",
              filter: "blur(2px)",
            }} />
            <div className="hero-avatar relative w-36 h-36 lg:w-48 lg:h-48 rounded-full overflow-hidden opacity-0 border border-white/10 p-1 bg-black/50 backdrop-blur-sm">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img src={profilePicture} alt="Parth Karetiya" className="w-full h-full object-cover hover:scale-110 transition-all duration-700" />
              </div>
            </div>
          </div>

          {/* Name - Fixed Wrapping by grouping into word spans */}
          <h1 className="overflow-hidden leading-[1.1] py-2 flex flex-wrap justify-center gap-x-6" style={{ fontSize: "clamp(2.2rem, 9vw, 6rem)", fontFamily: "'Cinzel', serif" }}>
            <span className="inline-block whitespace-nowrap">
              {firstName.map((char, i) => (
                <span
                  key={`first-${i}`}
                  className="hero-char inline-block font-black opacity-0"
                  style={{
                    perspective: "600px",
                    background: "linear-gradient(135deg, #fff 30%, #3b82f6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
            <span className="inline-block whitespace-nowrap">
              {lastName.map((char, i) => (
                <span
                  key={`last-${i}`}
                  className="hero-char inline-block font-black opacity-0"
                  style={{
                    perspective: "600px",
                    background: "linear-gradient(135deg, #fff 0%, #1d4ed8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          </h1>

          {/* Role typewriter */}
          <div className="hero-subtitle opacity-0">
            <span className="text-lg md:text-xl font-mono text-white/60 tracking-wider">
              {currentRole}
              <span className="inline-block w-[2px] h-[1.1em] bg-blue-500 ml-1 align-middle animate-pulse shadow-[0_0_8px_#3b82f6]" />
            </span>
          </div>

          {/* Bio */}
          <p className="hero-bio opacity-0 text-white/50 max-w-3xl leading-relaxed text-base md:text-lg">
            Dedicated <span className="text-white">React Specialist</span> and Full-Stack Developer with a passion for 
            architectural excellence and cybersecurity. I bridge the gap between 
            robust backend scalability and premium, high-performance frontends, 
            creating digital experiences that are <span className="text-blue-400">fundamentally secure</span>.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-4">
            {stats.map((stat) => (
              <div key={stat.label} className="hero-stat opacity-0 text-center group cursor-default">
                <div className="text-3xl md:text-4xl font-bold text-white group-hover:text-white/80 transition-colors">{stat.value}</div>
                <div className="text-[10px] font-mono text-white/40 tracking-[0.2em] uppercase mt-2">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <a href="#" className="hero-cta opacity-0 group px-8 py-3.5 bg-white text-black font-bold rounded-full flex items-center gap-2 hover:bg-neutral-200 transition-all duration-300">
              <FileText size={18} /> View Resume
            </a>
            <a href="#projects" className="hero-cta opacity-0 px-8 py-3.5 border border-white/20 text-white font-medium rounded-full flex items-center gap-2 hover:bg-white/5 hover:border-white/40 transition-all duration-300">
              <FolderOpen size={18} /> View Projects
            </a>
            <a href="#contact" className="hero-cta opacity-0 px-8 py-3.5 bg-neutral-900 border border-white/10 text-white/80 font-medium rounded-full flex items-center gap-2 hover:text-white hover:border-white/30 transition-all duration-300">
              <Mail size={18} /> Contact Me
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 flex flex-col items-center gap-3 cursor-pointer group"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="text-[10px] text-white/30 tracking-[0.4em] uppercase font-mono group-hover:text-white/60 transition-colors">Digital Folio / 2024</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent flex items-start justify-center">
            <div className="w-1 h-3 bg-white rounded-full animate-bounce mt-1" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
