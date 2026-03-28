import { useRef } from "react";
import { ExternalLink, Github, ArrowUpRight, Code2 } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AuroraMesh from "./animations/AuroraMesh";

import imgPortfolio from "@/assets/project-portfolio.jpg";
import imgFileShare from "@/assets/project-fileshare.jpg";
import imgTaskManager from "@/assets/project-taskmanager.jpg";
import imgResumeAI from "@/assets/project-resumeai.jpg";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "PulseGuard",
    subtitle: "Healthcare Emergency Response System",
    description: "A real-time healthcare emergency response platform for hospital coordination and emergency medical assistance.",
    tech: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
    image: "https://i.postimg.cc/1zqGFQWM/Screenshot-2026-03-09-093959.png",
    githubUrl: "https://github.com/ParthKaretiya/HackX",
    liveUrl: "#",
    featured: true,
  },
  {
    title: "Student Sync",
    subtitle: "Campus Digital Ecosystem",
    description: "A centralized digital ecosystem to bridge the gap between students, educators, and administrative data in real-time.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    image: "https://i.postimg.cc/HWvnF0q9/image.png",
    githubUrl: "https://github.com/ParthKaretiya/StudentSync",
    liveUrl: "https://studentsync-mu.vercel.app/",
    featured: true,
  },
  {
    title: "ThreatLens",
    subtitle: "Cybersecurity Threat Intelligence",
    description: "A cybersecurity monitoring tool that analyzes system activity and detects suspicious behavior patterns.",
    tech: ["React", "Python", "Node.js"],
    image: "https://i.postimg.cc/HxfK7hJ7/image.png",
    githubUrl: "https://github.com/ParthKaretiya",
    liveUrl: "https://threatlens-topaz.vercel.app/",
    featured: true,
  },
  {
    title: "CERS+",
    subtitle: "Emergency Response System",
    description: "Coordination platform for emergency responders and healthcare services with approval workflows.",
    tech: ["React", "Node.js", "MongoDB"],
    image: "https://i.postimg.cc/8zKZ609G/image.png",
    githubUrl: "https://github.com/ParthKaretiya",
    liveUrl: "https://cers-plus.web.app/",
  },
  {
    title: "AI Resume Analyzer",
    subtitle: "NLP-Powered Tool",
    description: "An AI-powered tool that analyzes resumes and provides actionable improvement suggestions.",
    tech: ["Python", "NLP", "Flask"],
    image: imgResumeAI,
    githubUrl: "https://github.com/ParthKaretiya",
    liveUrl: "#",
  },
];

const clones = [
  {
    title: "Big Basket Clone",
    description: "A pixel-perfect UI clone of the Big Basket grocery e-commerce platform.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop",
    liveUrl: "https://bigbasketclone111.netlify.app/"
  },
  {
    title: "Tesla Clone",
    description: "A premium frontend reconstruction of the Tesla website showcasing responsive design.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1000&auto=format&fit=crop",
    liveUrl: "https://teslaclone111.netlify.app/"
  },
  {
    title: "Alibaba Clone",
    description: "A responsive UI implementation of the Alibaba B2B marketplace layout.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c1590f?q=80&w=1000&auto=format&fit=crop",
    liveUrl: "https://alibabaclone1.netlify.app/"
  },
  {
    title: "Rare Planet Clone",
    description: "An elegant e-commerce frontend clone for the Rare Planet artisanal brand.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1000&auto=format&fit=crop",
    liveUrl: "https://rareplaneteclone1.netlify.app/"
  },
  {
    title: "Mercedes Clone",
    description: "A luxury automotive website UI clone featuring sleek styling and complex layouts.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1000&auto=format&fit=crop",
    liveUrl: "https://mercedecclone1.netlify.app/"
  },
  {
    title: "Arreto Clone",
    description: "A minimalist, high-end fashion e-commerce UI clone with precise typography.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000&auto=format&fit=crop",
    liveUrl: "https://arretoclone.netlify.app/"
  }
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(['.reveal', '.project-card', '.clone-card'], { opacity: 1 });
      return;
    }

    gsap.fromTo('.reveal', 
      { opacity: 0, y: 30 }, 
      { 
        opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    );

    let mm = gsap.matchMedia(sectionRef);

    // Desktop: Horizontal Pinning for main projects
    mm.add("(min-width: 768px)", () => {
      gsap.to('.project-card', { opacity: 1, duration: 0.5, stagger: 0.05 });

      const container = scrollContainerRef.current;
      if (container) {
        const getScrollAmount = () => container.scrollWidth - window.innerWidth;

        const tween = gsap.to(container, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: container, // Pin the slider track itself natively
            start: "center center", // Start when it hits the middle of the screen
            end: () => `+=${getScrollAmount()}`,
            pin: true,
            scrub: 1.5,
            invalidateOnRefresh: true,
          }
        });
        
        const cards = gsap.utils.toArray('.project-card') as HTMLElement[];
        cards.forEach((card) => {
          gsap.to(card.querySelector('.card-image-wrapper'), {
            x: 50,
            ease: "none",
            scrollTrigger: {
              containerAnimation: tween,
              trigger: card,
              start: "left right",
              end: "right left",
              scrub: 2,
            }
          });
        });
      }
    });

    // Mobile: Vertical Stacking with Reveal
    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray('.project-card').forEach((card: any) => {
        gsap.fromTo(card,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    });

    // Clones grid reveal trigger
    gsap.utils.toArray('.clone-card').forEach((card: any) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, { scope: sectionRef });

  return (
    <section id="projects" className="py-28 relative overflow-hidden" ref={sectionRef}>
      <AuroraMesh />
      {/* Featured Projects Header */}
      <div className="container mx-auto px-6 mb-12 relative z-10">
        <div className="max-w-2xl bg-black/40 p-6 rounded-3xl backdrop-blur-md border border-white/5 shadow-2xl">
          <h2 className="reveal opacity-0 text-4xl md:text-5xl font-bold text-white tracking-tight mb-4" style={{ fontFamily: "'Cinzel', serif" }}>Open Projects</h2>
          <p className="reveal opacity-0 text-white/70">A collection of complex full-stack applications, cybersecurity tools, and AI prototypes.</p>
        </div>
      </div>

      {/* Featured Projects Slider */}
      <div ref={scrollContainerRef} className="flex flex-col md:flex-row gap-8 px-6 pb-12 w-full md:w-max">
        {projects.map((project, i) => (
          <div key={project.title} className="project-card w-full md:w-[450px] lg:w-[500px] flex-shrink-0 opacity-0 bg-[#0f0f0f] rounded-2xl overflow-hidden group hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 border border-white/10 shadow-xl">
            {/* Image */}
            <div className="relative h-60 md:h-72 overflow-hidden card-image-wrapper bg-black/60">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 opacity-90 group-hover:opacity-100" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-sm">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.3)]" aria-label="Live demo">
                  <ExternalLink className="w-5 h-5 text-black" />
                </a>
                {project.githubUrl && project.githubUrl !== "#" && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center hover:scale-110 transition-transform hover:bg-white/20" aria-label="GitHub">
                    <Github className="w-5 h-5 text-white" />
                  </a>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                <ArrowUpRight className="w-6 h-6 text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
              <p className="text-primary/80 font-mono text-sm mb-4 tracking-wider">{project.subtitle}</p>
              <p className="text-white/60 text-base leading-relaxed mb-6 h-[72px] line-clamp-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 text-white/70 text-xs font-mono rounded-full">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* HTML CSS Clones Section */}
      <div className="container mx-auto px-6 mt-32 relative z-10">
        <div className="mb-12 border-t border-white/10 pt-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white/80" />
            </div>
            <div>
              <p className="reveal opacity-0 text-white/50 font-mono text-xs tracking-widest uppercase mb-1">Frontend Development</p>
              <h2 className="reveal opacity-0 text-3xl md:text-4xl font-bold text-white tracking-tight" style={{ fontFamily: "'Cinzel', serif" }}>UI Architecture & Clones</h2>
            </div>
          </div>
          <p className="reveal opacity-0 text-white/60 max-w-2xl text-lg">Pixel-perfect frontend reconstructions of major global brands built entirely with HTML5, CSS3, and layout frameworks.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clones.map((clone, idx) => (
            <a 
              key={clone.title} 
              href={clone.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="clone-card opacity-0 block group relative bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-1"
            >
              <div className="h-48 relative overflow-hidden bg-black object-cover">
                <img 
                  src={clone.image} 
                  alt={clone.title}
                  className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{clone.title}</h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{clone.description}</p>
                <div className="flex gap-2">
                  {clone.tech.map((t) => (
                    <span key={t} className="text-[10px] font-mono uppercase tracking-wider text-white/50 bg-white/5 px-2 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Projects;
