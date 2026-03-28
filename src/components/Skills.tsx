import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Server, Database, Settings } from "lucide-react";
import CircuitBoard from "./animations/CircuitBoard";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    icon: Code2,
    description: "Building responsive, accessible, and high-performance user interfaces with modern web standards.",
    color: "from-cyan-500/20 to-blue-500/5",
    accent: "text-cyan-400",
    skills: [
      { name: "React.js", level: 95, logo: "react/react-original.svg" },
      { name: "Next.js", level: 85, logo: "nextjs/nextjs-original.svg" },
      { name: "TypeScript", level: 90, logo: "typescript/typescript-original.svg" },
      { name: "JavaScript", level: 95, logo: "javascript/javascript-original.svg" },
      { name: "Tailwind CSS", level: 95, logo: "tailwindcss/tailwindcss-original.svg" },
      { name: "Redux", level: 80, logo: "redux/redux-original.svg" },
      { name: "GSAP", level: 75, logo: "javascript/javascript-original.svg" }, // devicon doesn't have gsap yet
      { name: "HTML5/CSS3", level: 98, logo: "html5/html5-original.svg" }
    ]
  },
  {
    id: "backend",
    title: "Backend Architecture",
    icon: Server,
    description: "Designing scalable microservices, robust REST APIs, and real-time socket connections.",
    color: "from-emerald-500/20 to-green-500/5",
    accent: "text-emerald-400",
    skills: [
      { name: "Node.js", level: 88, logo: "nodejs/nodejs-original.svg" },
      { name: "Express.js", level: 85, logo: "express/express-original.svg" },
      { name: "Python", level: 80, logo: "python/python-original.svg" },
      { name: "Django", level: 70, logo: "django/django-plain.svg" },
      { name: "GraphQL", level: 75, logo: "graphql/graphql-plain.svg" },
      { name: "REST APIs", level: 95, logo: "nodejs/nodejs-original.svg" },
      { name: "Socket.io", level: 82, logo: "socketio/socketio-original.svg" },
      { name: "C++", level: 65, logo: "cplusplus/cplusplus-original.svg" }
    ]
  },
  {
    id: "database",
    title: "Database & Cloud",
    icon: Database,
    description: "Managing data persistence with structured relational databases and flexible NoSQL solutions.",
    color: "from-purple-500/20 to-fuchsia-500/5",
    accent: "text-purple-400",
    skills: [
      { name: "MongoDB", level: 90, logo: "mongodb/mongodb-original.svg" },
      { name: "PostgreSQL", level: 80, logo: "postgresql/postgresql-original.svg" },
      { name: "MySQL", level: 85, logo: "mysql/mysql-original.svg" },
      { name: "Redis", level: 70, logo: "redis/redis-original.svg" },
      { name: "Firebase", level: 88, logo: "firebase/firebase-plain.svg" },
      { name: "Supabase", level: 75, logo: "supabase/supabase-original.svg" },
      { name: "AWS S3/EC2", level: 65, logo: "amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Vercel", level: 90, logo: "vercel/vercel-original.svg" }
    ]
  },
  {
    id: "devops",
    title: "DevOps & Tools",
    icon: Settings,
    description: "Streamlining deployment pipelines, containerizing applications, and maintaining system health.",
    color: "from-orange-500/20 to-red-500/5",
    accent: "text-orange-400",
    skills: [
      { name: "Git", level: 92, logo: "git/git-original.svg" },
      { name: "GitHub/Actions", level: 88, logo: "github/github-original.svg" },
      { name: "Docker", level: 75, logo: "docker/docker-original.svg" },
      { name: "Linux", level: 85, logo: "linux/linux-original.svg" },
      { name: "Nginx", level: 70, logo: "nginx/nginx-original.svg" },
      { name: "Postman", level: 90, logo: "postman/postman-original.svg" },
      { name: "Jest", level: 65, logo: "jest/jest-plain.svg" },
      { name: "VS Code", level: 95, logo: "vscode/vscode-original.svg" }
    ]
  }
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(['.reveal', '.skill-panel'], { opacity: 1 });
      return;
    }

    // Header reveal
    gsap.fromTo('.reveal', 
      { opacity: 0, y: 30 }, 
      { 
        opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    );

    let mm = gsap.matchMedia(sectionRef);

    // Desktop: Horizontal Pinning
    mm.add("(min-width: 768px)", () => {
      const container = scrollContainerRef.current;
      if (container) {
        const getScrollAmount = () => container.scrollWidth - window.innerWidth;

        const tween = gsap.to(container, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "center center",
            end: () => `+=${getScrollAmount()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });
        
        // Animate progress bars as panels come into view
        const panels = gsap.utils.toArray('.skill-panel') as HTMLElement[];
        panels.forEach((panel) => {
          const bars = panel.querySelectorAll('.progress-fill');
          gsap.from(bars, {
            width: 0,
            duration: 1.5,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              containerAnimation: tween,
              trigger: panel,
              start: "left center+=200", 
              toggleActions: "play none none reverse",
            }
          });
        });
      }
    });

    // Mobile: Vertical Stacking
    mm.add("(max-width: 767px)", () => {
      const panels = gsap.utils.toArray('.skill-panel') as HTMLElement[];
      panels.forEach((panel) => {
        gsap.fromTo(panel,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
        const bars = panel.querySelectorAll('.progress-fill');
        gsap.from(bars, {
          width: 0,
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: panel,
            start: "top 80%", 
            toggleActions: "play none none reverse",
          }
        });
      });
    });

  }, { scope: sectionRef });

  return (
    <section id="skills" className="py-28 relative overflow-hidden bg-[#050505]" ref={sectionRef}>
      <CircuitBoard />
      <div className="container mx-auto px-6 mb-12 relative z-10">
        <div className="max-w-3xl">
          <p className="reveal opacity-0 text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3 text-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Technical Arsenal</p>
          <h2 className="reveal opacity-0 text-4xl md:text-6xl font-bold text-white tracking-tight mb-6" style={{ fontFamily: "'Cinzel', serif" }}>
            Full Stack <span className="text-white/40 font-light">Ecosystem</span>
          </h2>
          <p className="reveal opacity-0 text-white/60 text-lg leading-relaxed max-w-2xl">
            A comprehensive overview of my technical capabilities. From pixel-perfect frontends to robust database architectures and deployment pipelines.
          </p>
        </div>
      </div>

      <div ref={scrollContainerRef} className="flex flex-col md:flex-row gap-8 px-6 pb-20 w-full md:w-max items-start pt-10">
        {skillCategories.map((category) => (
          <div 
            key={category.id} 
            className="skill-panel w-full md:w-[600px] lg:w-[800px] flex-shrink-0 opacity-100 bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden group hover:border-white/10 transition-colors duration-500 relative"
          >
            {/* Background Gradient Detail */}
            <div className={`absolute top-0 right-0 w-full h-[500px] bg-gradient-to-br ${category.color} rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

            <div className="grid lg:grid-cols-5 h-full relative z-10 p-8 md:p-12 gap-12">
              
              {/* Category Info (Left Column) */}
              <div className="lg:col-span-2 flex flex-col justify-between">
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-xl`}>
                    <category.icon className={`w-6 h-6 ${category.accent}`} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{category.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-8">
                    {category.description}
                  </p>
                </div>
                
                <div className="hidden lg:block">
                  <div className="h-[1px] w-12 bg-white/20 mb-4" />
                  <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest">{category.skills.length} Technologies</p>
                </div>
              </div>

              {/* Skills Grid (Right Column) */}
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center p-1.5 border border-white/5 group-hover:border-white/20 transition-colors">
                        <img 
                          src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.logo}`} 
                          alt={skill.name} 
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" 
                          onError={(e) => { e.currentTarget.src = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" }}
                        />
                      </div>
                      <div className="flex-1 flex justify-between items-center">
                        <span className="text-white/80 font-medium text-sm">{skill.name}</span>
                        <span className={`font-mono text-xs ${category.accent} opacity-80`}>{skill.level}%</span>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-white/20 progress-fill rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]`} 
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
