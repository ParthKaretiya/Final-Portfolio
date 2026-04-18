import { useRef } from "react";
import { ExternalLink, Github, Rocket, Shield, Eye, Smartphone, AlertCircle, FileText, BarChart3, Clock, CheckCircle2, Globe } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProjectData {
  id: string; title: string; subtitle: string; description: string;
  features: { icon: any; text: string }[]; tech: string[];
  image: string; githubUrl?: string; liveUrl?: string;
  color: string; accent: string;
}

const mainProjects: ProjectData[] = [
  {
    id: "pulseguard", title: "PulseGuard", subtitle: "AI Cybersecurity & Parental Suite",
    description: "A comprehensive digital safety ecosystem powered by AI to protect families and offices from modern cyber threats. Built at HackX Hackathon, handling real-time threat detection across 500+ concurrent WebSocket connections with sub-100ms latency.",
    features: [
      { icon: Shield, text: "AI Detection Engine: NLP & deep learning for fake news/malicious link identification." },
      { icon: Smartphone, text: "Parental Control Suite: Filtering, screen time limits, and social media monitoring." },
      { icon: Rocket, text: "Cyber Office Integration: Connected to national portals for automated complaints." },
      { icon: AlertCircle, text: "Geo-Based Alerts: Real-time localized threat detection and reporting." }
    ],
    tech: ["React", "Node.js", "MongoDB", "Socket.io", "Python (ML)"],
    image: "https://i.postimg.cc/1zqGFQWM/Screenshot-2026-03-09-093959.png",
    githubUrl: "https://github.com/ParthKaretiya/HackX", liveUrl: "https://hack-x-chi.vercel.app/",
    color: "from-sky-500/20 to-blue-500/5", accent: "text-sky-400"
  },
  {
    id: "threatlense", title: "ThreatLense", subtitle: "Ethical Static Code Analysis",
    description: "Advanced cybersecurity research platform for transparent risk scoring and automated vulnerability detection. Won 2nd place at Electrosphere 2026 by implementing deterministic AST parsing that reduced manual code review time by 60%.",
    features: [
      { icon: Eye, text: "AST Parsing: Deep static code analysis to identify potential security risks." },
      { icon: CheckCircle2, text: "Deterministic Modeling: Scientific threat assessment and risk scoring." },
      { icon: FileText, text: "Education First: Detailed vulnerability reports with mitigation strategies." },
      { icon: Globe, text: "Open Research: Platform for cybersecurity enthusiasts and researchers." }
    ],
    tech: ["React", "Python", "AST Parsing", "Node.js"],
    image: "https://i.postimg.cc/HxfK7hJ7/image.png",
    githubUrl: "https://github.com/ParthKaretiya", liveUrl: "https://threatlens-topaz.vercel.app/",
    color: "from-amber-500/20 to-orange-500/5", accent: "text-amber-400"
  },
  {
    id: "studysync", title: "StudySync", subtitle: "Campus Digital Ecosystem",
    description: "Centralized management platform for students and educators with predictive performance insights. Built a campus analytics dashboard with real-time attendance tracking using Chart.js and Node.js, reducing manual reporting time by 70% for faculty.",
    features: [
      { icon: BarChart3, text: "Performance Analytics: Visual trends and comprehensive student growth metrics." },
      { icon: Clock, text: "Smart Bunk Planner: Predictive insights for attendance optimization." },
      { icon: CheckCircle2, text: "Attendance Management: Real-time tracking and automated reporting." },
      { icon: AlertCircle, text: "Alert System: Instant notifications to parents and educators." }
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Chart.js"],
    image: "https://i.postimg.cc/HWvnF0q9/image.png",
    githubUrl: "https://github.com/ParthKaretiya/StudentSync", liveUrl: "https://student-sync-tau.vercel.app/",
    color: "from-violet-500/20 to-purple-500/5", accent: "text-violet-400"
  }
];

const UIClones: ProjectData[] = [
  {
    id: "tesla-clone", title: "Tesla Clone", subtitle: "High-Fidelity UI",
    description: "Pixel-perfect reconstruction of the Tesla website. Implemented smooth hero scroll animations, responsive image galleries, and the signature full-viewport section layout with CSS Grid. Optimized for consistent rendering across Chrome, Firefox, and Safari.",
    features: [], tech: ["HTML5", "CSS3", "JavaScript"],
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1000&auto=format&fit=crop",
    githubUrl: "https://github.com/ParthKaretiya", liveUrl: "https://teslaclone111.netlify.app/",
    color: "from-gray-500/20 to-slate-500/5", accent: "text-white"
  },
  {
    id: "big-basket-clone", title: "Big Basket Clone", subtitle: "E-commerce UI",
    description: "Full e-commerce UI clone with complex multi-level category navigation, responsive product grids with lazy-loaded images, and a functional cart sidebar. Built with vanilla CSS Grid handling 200+ product cards without layout shifts.",
    features: [], tech: ["HTML5", "CSS3", "JavaScript"],
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop",
    githubUrl: "https://github.com/ParthKaretiya", liveUrl: "https://bigbasketclone111.netlify.app/",
    color: "from-green-500/20 to-emerald-500/5", accent: "text-emerald-400"
  },
  {
    id: "alibaba-clone", title: "Alibaba Clone", subtitle: "B2B Marketplace UI",
    description: "Responsive implementation of the Alibaba B2B marketplace with advanced grid layouts, supplier card components, and RFQ flow mockups. Implemented a global header/footer system and category sidebar with 50+ sub-category links.",
    features: [], tech: ["HTML5", "CSS3", "JavaScript"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c1590f?q=80&w=1000&auto=format&fit=crop",
    githubUrl: "https://github.com/ParthKaretiya", liveUrl: "https://alibabaclone1.netlify.app/",
    color: "from-orange-500/20 to-amber-500/5", accent: "text-amber-400"
  },
  {
    id: "mercedes-clone", title: "Mercedes-Benz Clone", subtitle: "Luxury Automotive UI",
    description: "High-end recreation of the Mercedes-Benz portal with premium dark-themed aesthetics, cinematic hero sections, and multi-page navigation. Built 5+ pages including SUV, Electric, AMG, and Contact with unified global styling.",
    features: [], tech: ["HTML5", "CSS3", "JavaScript"],
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1000&auto=format&fit=crop",
    githubUrl: "https://github.com/ParthKaretiya", liveUrl: "#",
    color: "from-slate-400/20 to-zinc-500/5", accent: "text-slate-300"
  },
  {
    id: "expense-manager", title: "Expense Manager", subtitle: "Finance Tracker UI",
    description: "Interactive expense tracking application with visual chart analytics, budget management by category, and transaction history. Features local storage persistence and dynamic pie/bar chart breakdowns for spending insights.",
    features: [], tech: ["HTML5", "CSS3", "JavaScript"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop",
    githubUrl: "https://github.com/ParthKaretiya", liveUrl: "#",
    color: "from-teal-500/20 to-cyan-500/5", accent: "text-teal-400"
  },
  {
    id: "portfolio-v1", title: "Portfolio v1", subtitle: "Personal Brand UI",
    description: "First iteration of my personal portfolio featuring dark-mode design, smooth scroll animations, and a project showcase grid. Served as the foundation for the current portfolio with lessons learned in responsive layout and performance.",
    features: [], tech: ["HTML5", "CSS3", "JavaScript"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    githubUrl: "https://github.com/ParthKaretiya", liveUrl: "#",
    color: "from-indigo-500/20 to-blue-500/5", accent: "text-indigo-400"
  },
];

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Simple reveal animations — no pinning, no snap (removes scroll jank)
    gsap.utils.toArray('.project-section').forEach((section: any) => {
      gsap.fromTo(section.querySelector('.project-content'),
        { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none reverse" }
        }
      );
      gsap.fromTo(section.querySelector('.project-image'),
        { opacity: 0, scale: 0.95 }, {
          opacity: 1, scale: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none reverse" }
        }
      );
    });
    gsap.fromTo('.clones-title', { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, scrollTrigger: { trigger: '.clones-title', start: "top 85%" }
    });
    gsap.fromTo('.clone-card', 
      { opacity: 0, y: 80, rotateX: 15, scale: 0.9 }, 
      {
        opacity: 1, y: 0, rotateX: 0, scale: 1, 
        stagger: 0.15, duration: 1, ease: "back.out(1.4)",
        scrollTrigger: { trigger: '.clones-grid', start: "top 85%", toggleActions: "play none none reverse" }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} id="projects">
      {/* Big Title */}
      <div className="container mx-auto px-6 pt-24 pb-12 relative z-20 overflow-hidden project-section">
        <h2 className="text-[12vw] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/5 tracking-tighter uppercase project-content" style={{ fontFamily: "'Cinzel', serif" }}>
          Projects
        </h2>
      </div>

      {/* Main Projects — no pinning, natural scroll */}
      {mainProjects.map((project, index) => (
        <section key={project.id} className="project-section py-20 md:py-28 relative overflow-hidden bg-[#050505] border-b border-white/5">
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center z-10 relative">
            <div className={`project-content lg:col-span-5 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
              <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3">Featured Innovation</p>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter" style={{ fontFamily: "'Cinzel', serif" }}>{project.title}</h2>
              <p className={`text-lg font-bold ${project.accent} mb-5`}>{project.subtitle}</p>
              <p className="text-white/80 text-base leading-relaxed mb-8 font-medium">{project.description}</p>
              <div className="space-y-4 mb-8">
                {project.features.map((f, i) => (
                  <div key={i} className="flex gap-3 group">
                    <div className={`mt-0.5 p-1.5 rounded-lg bg-white/5 border border-white/10 ${project.accent}`}><f.icon className="w-4 h-4" /></div>
                    <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors">{f.text}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-6 border-t border-white/5">
                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all">GitHub</a>}
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 rounded-xl bg-cyan-400 text-black font-black text-xs uppercase tracking-widest hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)]">Launch Live</a>}
              </div>
            </div>
            <div className={`project-image lg:col-span-7 relative ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 group shadow-xl bg-[#080808]">
                <img src={project.image} alt={project.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-30" />
              </div>
              <div className="absolute -bottom-4 -right-4 flex flex-wrap gap-1.5 max-w-[280px] justify-end">
                {project.tech.map(t => (<span key={t} className="px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg text-[9px] text-white font-bold uppercase tracking-widest shadow-xl">{t}</span>))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* UI Clones */}
      <section className="py-20 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="clones-title mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tighter" style={{ fontFamily: "'Cinzel', serif" }}>UI <span className="text-white/30 font-light">Reconstructions</span></h2>
            <p className="text-white/40 text-base max-w-2xl mx-auto">High-fidelity clones and standalone projects focusing on pixel-perfect layouts and responsive design.</p>
          </div>
          <div className="clones-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {UIClones.map(clone => (
              <div key={clone.id} className="clone-card group flex flex-col bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.04] transition-all duration-500 hover:border-white/20 hover:-translate-y-1">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#080808]">
                  <img src={clone.image} alt={clone.title} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none opacity-40" />
                  {clone.liveUrl && clone.liveUrl !== "#" && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a href={clone.liveUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all transform translate-y-3 group-hover:translate-y-0 duration-500">View Live ↗</a>
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{clone.title}</h3>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${clone.accent} opacity-70 mb-3`}>{clone.subtitle}</p>
                  <p className="text-white/50 text-sm mb-5 flex-1 leading-relaxed">{clone.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex gap-1.5 flex-wrap">
                      {clone.tech.map(t => (<span key={t} className="text-[9px] text-white/30 font-bold uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">{t}</span>))}
                    </div>
                    {clone.liveUrl && clone.liveUrl !== "#" && (
                      <a href={clone.liveUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 text-xs font-black uppercase tracking-widest hover:text-cyan-300 transition-colors flex items-center gap-1">Live <ExternalLink className="w-3 h-3" /></a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
