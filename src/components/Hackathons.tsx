import { useRef, useState } from "react";
import { Trophy, Calendar, MapPin, Code2, ExternalLink, Lightbulb, Zap, Rocket, ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";
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
  color: string;
  accent: string;
  cgpa?: string;
}

const hackathons: HackathonData[] = [
  {
    id: "electrosphere-2026",
    name: "Electrosphere 2026",
    date: "Jan 2026",
    location: "Swaminarayan University",
    images: [electro001, electro02, electro03],
    projectBuilt: "ThreatLens",
    problem: "Rising cybersecurity threats in local networks with lack of real-time monitoring tools for small-scale enterprises.",
    challenges: "Processing large volumes of system activity logs in real-time without significant performance overhead.",
    solution: "Developed a lightweight agent using Python and React that analyzes system activity and detects suspicious behavior patterns using machine learning.",
    techStack: ["React", "Python", "Node.js", "REST APIs", "Data Analytics"],
    achievement: "2nd Place Winner",
    link: "https://threatlens-topaz.vercel.app/",
    color: "from-amber-500/20 to-orange-500/5",
    accent: "text-amber-400",
    cgpa: "9.67",
  },
  {
    id: "hackx-2025",
    name: "HackX Hackathon",
    date: "2025",
    location: "GEC Gandhinagar",
    images: [hackx01, hackx02, hackx03],
    projectBuilt: "PulseGuard",
    problem: "Delayed emergency response times in hospitals due to inefficient coordination between departments.",
    challenges: "Ensuring zero-latency communication between medical staff during critical emergencies.",
    solution: "Built a real-time coordination platform using Socket.io and React that allows instant updates and department-wide alerts.",
    techStack: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
    achievement: "Finalist (4th Rank)",
    link: "https://hack-x-chi.vercel.app/",
    color: "from-cyan-500/20 to-blue-500/5",
    accent: "text-cyan-400",
    cgpa: "9.67",
  },
  {
    id: "sangam-hack",
    name: "Sangam University Hackathon",
    date: "2024",
    location: "Sangam University",
    images: [su01, su02, su03],
    projectBuilt: "CERS+",
    problem: "Inefficient facility logistics and resource allocation during large-scale events.",
    challenges: "Managing complex database relationships for real-time inventory and staff tracking.",
    solution: "Designed a dedicated platform for real-time facility logistics with dynamic user interactions and secure backend logic.",
    techStack: ["React", "Firebase", "Tailwind CSS", "Node.js"],
    achievement: "Finalist",
    link: "https://cers-plus.web.app/",
    color: "from-violet-500/20 to-purple-500/5",
    accent: "text-violet-400",
    cgpa: "9.67",
  }
];

const ImageGallery = ({ images, name }: { images: string[]; name: string }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="relative aspect-video xl:aspect-auto xl:h-full min-h-[240px] overflow-hidden group/gallery bg-black/40 flex items-center justify-center">
      {/* Main image — object-contain prevents cropping */}
      <img
        src={images[activeIdx]}
        alt={`${name} - image ${activeIdx + 1}`}
        className="w-full h-full object-contain max-h-[320px] xl:max-h-full transition-all duration-500"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => setActiveIdx((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300 hover:bg-black/70 z-10"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveIdx((prev) => (prev + 1) % images.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300 hover:bg-black/70 z-10"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_img, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`transition-all duration-300 rounded-full ${i === activeIdx ? "w-7 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/60"
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
    const revealElements = gsap.utils.toArray('.hack-reveal');
    revealElements.forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section id="hackathons" className="py-28 relative overflow-hidden bg-[#050505]" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-16">
          <p className="hack-reveal text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3">Competitive Building</p>
          <h2 className="hack-reveal text-4xl md:text-6xl font-bold text-white tracking-tight mb-6" style={{ fontFamily: "'Cinzel', serif" }}>
            Hackathon <span className="text-white/40 font-light">Journey</span>
          </h2>
          <p className="hack-reveal text-white/60 text-lg leading-relaxed max-w-2xl">
            Where pressure meets innovation. My journey through intense coding competitions, solving real-world problems under tight deadlines.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:gap-20">
          {hackathons.map((hack, index) => (
            <div
              key={hack.id}
              className="hack-reveal group relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Timeline dot & line (Desktop) */}
              <div className="hidden lg:flex col-span-1 flex-col items-center h-full pt-2">
                <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${hack.color} border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-125 transition-transform duration-500`} />
                <div className="w-[1px] flex-1 bg-gradient-to-b from-white/20 to-transparent mt-4" />
              </div>

              {/* Content Card */}
              <div className="lg:col-span-11 bg-white/[0.02] border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-sm group-hover:bg-white/[0.04] transition-all duration-500 group-hover:border-white/20">
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

                      {/* CGPA Badge */}
                      {hack.cgpa && (
                        <div className="flex items-center gap-3 mb-8 p-3 rounded-xl bg-white/[0.03] border border-white/8 w-fit">
                          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                            <GraduationCap className="w-4 h-4 text-emerald-400" />
                          </div>
                          <div>
                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Academic CGPA</p>
                            <p className="text-emerald-400 font-black text-lg leading-tight">{hack.cgpa}</p>
                          </div>
                        </div>
                      )}

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
                        {hack.techStack.map(tech => (
                          <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] text-white/40 font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                      {hack.link && hack.link !== "#" && (
                        <a
                          href={hack.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest hover:text-cyan-300 transition-colors"
                        >
                          View Project <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
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
