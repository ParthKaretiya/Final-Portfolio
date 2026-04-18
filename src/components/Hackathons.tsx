import { useRef, useState, useEffect } from "react";
import { Trophy, Calendar, MapPin, Code2, ExternalLink, Lightbulb, Zap, Rocket, ChevronLeft, ChevronRight, GraduationCap, Github } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import local hackathon images
import electro001 from "@/Electrosphere001.jpeg";
import electro02 from "@/ElectroSphere-02.jpeg";
import electro03 from "@/ElectroSphere-03.jpeg";
import hackx01 from "@/HackX-01.jpg";
import hackx02 from "@/HackX-02.jpeg";
import hackx03 from "@/HackX-003.jpeg";
import su01 from "@/SU Hackathon-01.JPG";
import su02 from "@/SU Hackathon-02.jpg";
import su03 from "@/SU Hackathon-03.jpg";

gsap.registerPlugin(ScrollTrigger);

interface HackathonData {
  id: string;
  name: string;
  date: string;
  location: string;
  images: string[];
  projectBuilt: string;
  problem: string;
  challenges: string;
  solution: string;
  techStack: string[];
  achievement?: string;
  link?: string;
  githubUrl?: string;
  color: string;
  accent: string;
}

const hackathons: HackathonData[] = [
  {
    id: "electrosphere-2026",
    name: "ElectroSphere 2K26",
    date: "Jan 2026",
    location: "Swaminarayan University",
    images: [electro001, electro02, electro03],
    projectBuilt: "ThreatLens",
    problem: "Security tools often glorify exploitation instead of focusing on clear, defense-driven risk reasoning.",
    challenges: "Building a structured threat-modeling system without live payloads or weaponization.",
    solution: "Developed an ethical static cybersecurity analysis platform that identifies risks and attack surfaces with clear reasoning, built with Team InnovateX.",
    techStack: ["React", "Node.js", "AI Analysis", "REST APIs"],
    achievement: "2nd Place (Software Edition)",
    link: "https://threatlens-topaz.vercel.app/",
    githubUrl: "https://github.com/ParthKaretiya",
    color: "from-amber-500/20 to-orange-500/5",
    accent: "text-amber-400"
  },
  {
    id: "hack-the-spring",
    name: "Hack The Spring",
    date: "2026",
    location: "GEC Gandhinagar",
    images: [hackx01, hackx02, hackx03],
    projectBuilt: "Pulse Guard",
    problem: "Scam detection tools are too technical, leaving non-technical users (parents/children) vulnerable to fraud.",
    challenges: "Integrating AI to translate complex suspicious link patterns into simple, understandable warnings within 2 days.",
    solution: "Built an AI-powered cybersecurity tool focused on family safety that explains risks clearly instead of just marking them safe/unsafe.",
    techStack: ["React", "Python", "AI", "Tailwind CSS"],
    achievement: "4th Rank (Out of 100+ Teams)",
    link: "https://hack-x-chi.vercel.app/",
    githubUrl: "https://github.com/ParthKaretiya",
    color: "from-cyan-500/20 to-blue-500/5",
    accent: "text-cyan-400"
  },
  {
    id: "su-hackathon",
    name: "SU Hackathon Bhilwara",
    date: "2024",
    location: "Sangam University",
    images: [su01, su02, su03],
    projectBuilt: "CERS",
    problem: "Delays in communication and lack of synchronization between emergency services often lead to severe consequences.",
    challenges: "Creating a unified digital network with real-time location tracking and instant distress routing under pressure.",
    solution: "Developed a Centralized Emergency Response System alongside Team CodePulse to connect hospitals, police, and fire departments instantly.",
    techStack: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
    achievement: "Finalist",
    link: "https://cers-plus.web.app/",
    githubUrl: "https://github.com/ParthKaretiya",
    color: "from-violet-500/20 to-purple-500/5",
    accent: "text-violet-400"
  }
];

const ImageGallery = ({ images, name }: { images: string[]; name: string }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative aspect-video xl:aspect-auto xl:h-full min-h-[320px] overflow-hidden group/gallery bg-[#080808]">
      {/* Sliding Images Container */}
      <div 
        className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{ transform: `translateX(-${activeIdx * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={i} className="min-w-full h-full flex items-center justify-center p-4">
            <img
              src={img}
              alt={`${name} - image ${i + 1}`}
              className="max-w-full max-h-full object-contain shadow-2xl rounded-xl"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => setActiveIdx((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/gallery:opacity-100 transition-all duration-300 hover:bg-black/60 z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveIdx((prev) => (prev + 1) % images.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/gallery:opacity-100 transition-all duration-300 hover:bg-black/60 z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {images.map((_img, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`transition-all duration-500 rounded-full h-1.5 ${i === activeIdx ? "w-8 bg-cyan-400" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

const Hackathons = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.hack-card');
    cards.forEach((card: any) => {
      gsap.fromTo(card,
        { opacity: 0, y: 100, rotateX: 5, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    gsap.fromTo('.hack-reveal', 
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, stagger: 0.2, duration: 1, ease: "power3.out", scrollTrigger: { trigger: '.hackathon-header', start: "top 80%" }}
    );
  }, { scope: sectionRef });

  return (
    <section id="hackathons" className="py-28 relative overflow-hidden bg-[#050505]" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-16 hackathon-header">
          <p className="hack-reveal text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3">Competitive Building</p>
          <h2 className="hack-reveal text-4xl md:text-6xl font-bold text-white tracking-tight mb-6" style={{ fontFamily: "'Cinzel', serif" }}>
            Hackathon <span className="text-white/40 font-light">Journey</span>
          </h2>
          <p className="hack-reveal text-white/60 text-lg leading-relaxed max-w-2xl">
            Where pressure meets innovation. My journey through intense coding competitions, solving real-world problems under tight deadlines.
          </p>
        </div>

        <div className="relative">
          {hackathons.map((hack, index) => (
            <div
              key={hack.id}
              className="hack-card group relative sticky min-h-screen flex items-start pt-32 pb-32 bg-[#050505] shadow-[0_-30px_50px_rgba(0,0,0,0.8)] border-t border-white/10 rounded-t-[3rem] overflow-visible"
              style={{ zIndex: index + 10, top: `calc(${index * 40}px + 40px)` }}
            >
              {/* Content Card */}
              <div className="w-full bg-white/[0.02] border border-white/10 rounded-[2rem] backdrop-blur-sm group-hover:bg-white/[0.04] transition-all duration-500 group-hover:border-white/20">
                <div className="grid grid-cols-1 xl:grid-cols-2">

                  {/* Image Gallery Side */}
                  <ImageGallery images={hack.images} name={hack.name} />

                  {/* Storytelling Side */}
                  <div className="p-8 lg:p-12 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-white/5 border border-white/10 ${hack.accent}`}>
                            <Trophy className="w-5 h-5" />
                          </div>
                          <span className="text-white/40 font-mono text-xs tracking-widest uppercase">{hack.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {hack.achievement && (
                            <div className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 ${hack.accent}`}>
                              {hack.achievement}
                            </div>
                          )}
                        </div>
                      </div>

                      <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">{hack.name}</h3>
                      <div className="flex items-center gap-4 text-white/40 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{hack.location}</span>
                        </div>
                      </div>

                      {/* CGPA Badge Removed as requested */}

                      <div className="space-y-6 mb-10">
                        <div className="flex gap-4">
                          <div className="mt-1">
                            <Lightbulb className="w-5 h-5 text-amber-400/60" />
                          </div>
                          <div>
                            <h4 className="text-white/80 font-bold text-sm mb-1 uppercase tracking-wider">The Problem</h4>
                            <p className="text-white/50 text-sm leading-relaxed">{hack.problem}</p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <div className="mt-1">
                            <Zap className="w-5 h-5 text-cyan-400/60" />
                          </div>
                          <div>
                            <h4 className="text-white/80 font-bold text-sm mb-1 uppercase tracking-wider">The Challenge</h4>
                            <p className="text-white/50 text-sm leading-relaxed">{hack.challenges}</p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <div className="mt-1">
                            <Rocket className="w-5 h-5 text-emerald-400/60" />
                          </div>
                          <div>
                            <h4 className="text-white/80 font-bold text-sm mb-1 uppercase tracking-wider">The Solution</h4>
                            <p className="text-white/50 text-sm leading-relaxed">{hack.solution}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-end justify-between gap-6 pt-6 border-t border-white/5">
                      <div className="flex flex-wrap gap-2">
                        {hack.techStack.map(tech => {
                          const getTechColor = (t: string) => {
                            const tl = t.toLowerCase();
                            if (tl.includes("react")) return "text-cyan-400 border-cyan-400/20 bg-cyan-400/5";
                            if (tl.includes("node") || tl.includes("mongo")) return "text-green-400 border-green-400/20 bg-green-400/5";
                            if (tl.includes("python")) return "text-yellow-400 border-yellow-400/20 bg-yellow-400/5";
                            if (tl.includes("express") || tl.includes("socket")) return "text-gray-300 border-gray-400/20 bg-gray-400/5";
                            if (tl.includes("firebase")) return "text-amber-500 border-amber-500/20 bg-amber-500/5";
                            if (tl.includes("tailwind")) return "text-teal-400 border-teal-400/20 bg-teal-400/5";
                            if (tl.includes("ai")) return "text-purple-400 border-purple-400/20 bg-purple-400/5";
                            return "text-white/60 border-white/10 bg-white/5";
                          };
                          return (
                            <span key={tech} className={`px-3 py-1 rounded-full border text-[10px] font-medium transition-colors hover:brightness-125 ${getTechColor(tech)}`}>
                              {tech}
                            </span>
                          );
                        })}
                      </div>
                      <div className="flex flex-wrap gap-4 pt-6 border-t border-white/5 w-full">
                        {hack.githubUrl && (
                          <a
                            href={hack.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                          >
                            <Github className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                            GitHub
                          </a>
                        )}
                        {hack.link && hack.link !== "#" && (
                          <a
                            href={hack.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn flex items-center gap-2 px-8 py-3 rounded-2xl bg-cyan-400 text-black text-xs font-black uppercase tracking-widest hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                          >
                            Live Demo
                            <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hackathons;
