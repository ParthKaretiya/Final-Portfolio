import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Server, Database, Settings, Cpu, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";

interface Skill {
  name: string;
  logo: string;
  color: string;
  glow: string;
  level: number;
  specs: string[];
  logs: string[];
}

const skillsData: Skill[] = [
  // Frontend
  {
    name: "React.js",
    logo: "react/react-original.svg",
    color: "#61dafb",
    glow: "shadow-[0_0_20px_rgba(97,218,251,0.5)]",
    level: 95,
    specs: ["Hooks & Custom State Hooks", "Virtual DOM Optimization", "Concurrent Features & Hydration", "Context API & Portals"],
    logs: [
      "> Initializing React Fiber Tree root...",
      "> Resolving component diff schema...",
      "> DOM hydration completed in 1.4ms.",
      ">> RENDER ENGINE STATUS: OPTIMAL"
    ]
  },
  {
    name: "Next.js",
    logo: "nextjs/nextjs-original.svg",
    color: "#ffffff",
    glow: "shadow-[0_0_20px_rgba(255,255,255,0.4)]",
    level: 90,
    specs: ["App Router Routing Engine", "Server Actions Execution", "SSR & SSG Rendering Models", "ISR Cache Revalidation"],
    logs: [
      "> Resolving App Route node trees...",
      "> Initiating Server-Side rendering...",
      "> Incremental cache checks completed.",
      ">> FRAMEWORK STATUS: ENGINE ONLINE"
    ]
  },
  {
    name: "TypeScript",
    logo: "typescript/typescript-original.svg",
    color: "#3178c6",
    glow: "shadow-[0_0_20px_rgba(49,120,198,0.5)]",
    level: 92,
    specs: ["Strict Type Compilation", "Generic constraints & utilities", "Mapped & Conditional Types", "Configuring advanced build paths"],
    logs: [
      "> Parsing project syntax AST...",
      "> Scanning structural code layouts...",
      "> TS compilation status: 0 errors.",
      ">> STATIC ANALYZER: VALIDATED"
    ]
  },
  {
    name: "JavaScript",
    logo: "javascript/javascript-original.svg",
    color: "#f7df1e",
    glow: "shadow-[0_0_20px_rgba(247,223,30,0.5)]",
    level: 95,
    specs: ["ES6+ Modern Syntax Engines", "Asynchronous Event Loops", "Scope Closures & Lexicals", "Native DOM Manipulation API"],
    logs: [
      "> Initializing V8 compiler runtime...",
      "> Setting up global call stacks...",
      "> Event loop polling listeners active.",
      ">> JS ENGINE RUNTIME: OPERATIONAL"
    ]
  },
  {
    name: "Tailwind CSS",
    logo: "tailwindcss/tailwindcss-original.svg",
    color: "#06b6d4",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.5)]",
    level: 95,
    specs: ["JIT Compiler Style Gen", "Responsive Layout Utilities", "CSS Variables Architecture", "Custom Theme Optimization"],
    logs: [
      "> Reading styling utility sheets...",
      "> Dynamic stylesheet compilation active...",
      "> Rebuilding tailwind CSS targets...",
      ">> STYLE UTILS BUILD: COMPLETE"
    ]
  },
  {
    name: "Redux",
    logo: "redux/redux-original.svg",
    color: "#764abc",
    glow: "shadow-[0_0_20px_rgba(118,74,188,0.5)]",
    level: 85,
    specs: ["Redux Toolkit (RTK)", "Global Slices configuration", "Async Thunk Action Creators", "Middleware state interceptors"],
    logs: [
      "> Initializing global slice registries...",
      "> Mounting RTK state slices...",
      "> Handlers bound. Redux active.",
      ">> GLOBAL STORE STATE: ONLINE"
    ]
  },
  // Backend
  {
    name: "Node.js",
    logo: "nodejs/nodejs-original.svg",
    color: "#339933",
    glow: "shadow-[0_0_20px_rgba(51,153,51,0.5)]",
    level: 90,
    specs: ["Event-Driven Asynchrony", "Core File System I/O", "Multi-thread Cluster setups", "Native Streams & Buffers"],
    logs: [
      "> Executing Node backend entrypoint...",
      "> Memory allocation verified: stable.",
      "> Event loops registered for tasks...",
      ">> RUNTIME SYSTEM: ONLINE"
    ]
  },
  {
    name: "Express.js",
    logo: "express/express-original.svg",
    color: "#ffffff",
    glow: "shadow-[0_0_20px_rgba(255,255,255,0.4)]",
    level: 92,
    specs: ["Middleware Pipeline patterns", "Router structures & mounting", "Custom centralized errors", "HTTP Request sanitization"],
    logs: [
      "> Creating server namespaces...",
      "> Setting core CORS policies...",
      "> Mounting HTTP handler chains...",
      ">> ROUTER SERVER: ENGAGED"
    ]
  },
  {
    name: "Python",
    logo: "python/python-original.svg",
    color: "#3776ab",
    glow: "shadow-[0_0_20px_rgba(55,118,171,0.5)]",
    level: 80,
    specs: ["Script automation engines", "OOP & functional programming", "FastAPI / Flask micro-APIs", "Data structuring and scrapers"],
    logs: [
      "> Starting Python virtual env...",
      "> Reading standard library headers...",
      "> Main modules loaded successfully.",
      ">> PYTHON ENGINE: STANDBY"
    ]
  },
  {
    name: "GraphQL",
    logo: "graphql/graphql-plain.svg",
    color: "#e10098",
    glow: "shadow-[0_0_20px_rgba(225,0,152,0.5)]",
    level: 80,
    specs: ["Defining complex query schemas", "Resolver structure design", "Apollo Server configurations", "Query performance tuning"],
    logs: [
      "> Compiling GraphQL schemas...",
      "> Binding query resolver paths...",
      "> Type schemas verified statically.",
      ">> GRAPHQL SCHEMAS: RESOLVED"
    ]
  },
  {
    name: "Socket.io",
    logo: "socketio/socketio-original.svg",
    color: "#ffffff",
    glow: "shadow-[0_0_20px_rgba(255,255,255,0.4)]",
    level: 88,
    specs: ["WebSocket full communication", "Heartbeat handshake checks", "Rooms & Namespace broadcasts", "Connection fallback scripts"],
    logs: [
      "> Initializing Socket IO Server...",
      "> Mapping real-time listeners...",
      "> Syncing active socket ports...",
      ">> SOCKET SERVICES: STABLE"
    ]
  },
  {
    name: "C++",
    logo: "cplusplus/cplusplus-original.svg",
    color: "#00599c",
    glow: "shadow-[0_0_20px_rgba(0,89,156,0.5)]",
    level: 75,
    specs: ["OOP architectural concepts", "STL algorithms / components", "Dynamic memory operations", "Data structures engineering"],
    logs: [
      "> Compiling C++ workspace files...",
      "> Linking compiler system targets...",
      "> Execution memory layout set...",
      ">> COMPILER RUNTIME: COMPILED"
    ]
  },
  // Database & Cloud
  {
    name: "MongoDB",
    logo: "mongodb/mongodb-original.svg",
    color: "#47a248",
    glow: "shadow-[0_0_20px_rgba(71,162,72,0.5)]",
    level: 88,
    specs: ["NoSQL collection schemas", "Aggregation pipeline design", "Mongoose ODM configurations", "Index query optimization"],
    logs: [
      "> Opening Mongo database thread...",
      "> Connecting to remote DB cluster...",
      "> DB Sync validated successfully.",
      ">> CLIENT ACCESS: GRANTED"
    ]
  },
  {
    name: "PostgreSQL",
    logo: "postgresql/postgresql-original.svg",
    color: "#336791",
    glow: "shadow-[0_0_20px_rgba(51,103,145,0.5)]",
    level: 85,
    specs: ["Relational data schemas", "SQL joins and complex queries", "Postgres key indices tuning", "Database trigger scripts"],
    logs: [
      "> Creating PostgreSQL client pool...",
      "> Synchronizing query schemas...",
      "> Checking index configurations...",
      ">> RELATIONAL STORAGE: READY"
    ]
  },
  {
    name: "Firebase",
    logo: "firebase/firebase-plain.svg",
    color: "#ffca28",
    glow: "shadow-[0_0_20px_rgba(255,202,40,0.5)]",
    level: 88,
    specs: ["Firestore document databases", "Firebase authentication rules", "Cloud Storage rulesets", "Hosting setups & deploy"],
    logs: [
      "> Initializing Firebase project...",
      "> Accessing Firestore security rules...",
      "> Syncing current user sessions...",
      ">> DB INTEGRITY: SECURED"
    ]
  },
  {
    name: "AWS",
    logo: "amazonwebservices/amazonwebservices-original-wordmark.svg",
    color: "#ff9900",
    glow: "shadow-[0_0_20px_rgba(255,153,0,0.5)]",
    level: 78,
    specs: ["EC2 Cloud server hosting", "S3 Storage bucket setups", "IAM role definitions", "Serverless Lambda scripts"],
    logs: [
      "> Fetching AWS IAM policies...",
      "> Connecting cloud storage hooks...",
      "> Cloud instances status: ACTIVE.",
      ">> CLOUD CONNECTIVITY: PASS"
    ]
  },
  {
    name: "Supabase",
    logo: "supabase/supabase-original.svg",
    color: "#3ecf8e",
    glow: "shadow-[0_0_20px_rgba(63,207,226,0.5)]",
    level: 88,
    specs: ["Postgres storage backend", "RLS Database protection", "Websocket real-time updates", "Auth and Storage setups"],
    logs: [
      "> Opening Supabase WS listener...",
      "> Querying row policies (RLS)...",
      "> Connection sync status check...",
      ">> REMOTE BACKEND: CONFIGURED"
    ]
  },
  {
    name: "Redis",
    logo: "redis/redis-original.svg",
    color: "#dc382d",
    glow: "shadow-[0_0_20px_rgba(220,56,45,0.5)]",
    level: 78,
    specs: ["Cache structures strategy", "Pub/Sub socket messaging", "Setting data timeout keys", "Memory storage components"],
    logs: [
      "> Verifying Redis host details...",
      "> Running database PING checks...",
      "> DB Response: PONG (1.1ms).",
      ">> REDIS CACHING: RUNNING"
    ]
  },
  // Tools
  {
    name: "Git",
    logo: "git/git-original.svg",
    color: "#f05032",
    glow: "shadow-[0_0_20px_rgba(240,80,50,0.5)]",
    level: 92,
    specs: ["Branching & merge policies", "Interactive rebase workflow", "Conflict manual repairs", "Remote repository links"],
    logs: [
      "> Running git module checks...",
      "> Checking local branch indexes...",
      "> Working tree state: clean.",
      ">> VERSION CONTROLLER: SYSTEM READY"
    ]
  },
  {
    name: "Docker",
    logo: "docker/docker-original.svg",
    color: "#2496ed",
    glow: "shadow-[0_0_20px_rgba(36,150,237,0.5)]",
    level: 82,
    specs: ["Container building rules", "Multi-stage Dockerfiles", "Docker Compose stacks", "Image size optimizations"],
    logs: [
      "> Checking local Docker runtime...",
      "> Verifying base image sources...",
      "> Layer configurations caching...",
      ">> CONTAINER DEPLOYER: ACTIVE"
    ]
  },
  {
    name: "Linux",
    logo: "linux/linux-original.svg",
    color: "#ffffff",
    glow: "shadow-[0_0_20px_rgba(255,255,255,0.4)]",
    level: 80,
    specs: ["Bash CLI administration", "File permission schemas", "System services scheduling", "SSH setups & protocols"],
    logs: [
      "> Booting POSIX kernel core...",
      "> Verifying global system pathing...",
      "> Starting terminal tty listeners...",
      ">> LINUX SUBSYSTEM: TERMINAL ONLINE"
    ]
  },
  {
    name: "Jest",
    logo: "jest/jest-plain.svg",
    color: "#c21325",
    glow: "shadow-[0_0_20px_rgba(194,19,37,0.5)]",
    level: 80,
    specs: ["Unit & component tests", "Central code mocks / spies", "Static coverage matrices", "VDOM snapshot comparison"],
    logs: [
      "> Scanning test files index...",
      "> Initializing Jest runners...",
      "> Test coverage calculation complete.",
      ">> JEST RUNNER: ALL PASSED"
    ]
  },
  {
    name: "GitHub",
    logo: "github/github-original.svg",
    color: "#ffffff",
    glow: "shadow-[0_0_20px_rgba(255,255,255,0.4)]",
    level: 90,
    specs: ["Actions CI/CD pipelines", "Code review pull flows", "Access key setups", "GitHub Pages deployment"],
    logs: [
      "> Syncing Github workflows...",
      "> Authenticating REST access API...",
      "> Workspace remote links verified.",
      ">> CI/CD ACTIONS: LISTENING"
    ]
  },
  {
    name: "Figma",
    logo: "figma/figma-original.svg",
    color: "#f24e1e",
    glow: "shadow-[0_0_20px_rgba(242,78,30,0.5)]",
    level: 82,
    specs: ["Component design building", "Auto-layout positioning", "High-fidelity prototypes", "Interactive design tokens"],
    logs: [
      "> Querying Figma design files...",
      "> Reading layout coordinate variables...",
      "> Exporting asset raster targets...",
      ">> ASSETS COMPILED: OK"
    ]
  }
];

const categoryMapping: Record<string, string[]> = {
  frontend: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Redux"],
  backend: ["Node.js", "Express.js", "Python", "GraphQL", "Socket.io", "C++"],
  database: ["MongoDB", "PostgreSQL", "Firebase", "AWS", "Supabase", "Redis"],
  tools: ["Git", "Docker", "Linux", "Jest", "GitHub", "Figma"]
};

/* ─────────────────────────────────────────────────────────────────
   Marquee Component (Dual-direction rows)
   ───────────────────────────────────────────────────────────────── */
const MarqueeRow = ({ items, reverse = false, speed = 80 }: { items: Skill[], reverse?: boolean, speed?: number }) => {
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
   Main Skills Section Redesign
   ───────────────────────────────────────────────────────────────── */
const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  
  const [activeCat, setActiveCat] = useState("frontend");
  
  // Set default active skill to React.js
  const [activeSkill, setActiveSkill] = useState<Skill>(skillsData[0]);

  // Terminal logging typewriter hooks
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Filter skills based on chosen category
  const filteredSkills = skillsData.filter(skill => 
    categoryMapping[activeCat].includes(skill.name)
  );

  // Auto-select first skill in new category
  const handleCategoryChange = (catId: string) => {
    setActiveCat(catId);
    const newCategorySkills = skillsData.filter(s => categoryMapping[catId].includes(s.name));
    if (newCategorySkills.length > 0) {
      setActiveSkill(newCategorySkills[0]);
    }
  };

  // Typewriter effect logic
  useEffect(() => {
    if (!activeSkill) return;

    setTerminalLines([]);
    setCurrentText("");
    setIsTyping(true);

    const logs = activeSkill.logs;
    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = "";
    let localCompletedLines: string[] = [];

    const typeInterval = setInterval(() => {
      if (lineIndex >= logs.length) {
        clearInterval(typeInterval);
        setIsTyping(false);
        return;
      }

      const fullLine = logs[lineIndex];
      if (charIndex < fullLine.length) {
        currentLine += fullLine[charIndex];
        setCurrentText(currentLine);
        charIndex++;
      } else {
        // Line complete, push to completed lines
        localCompletedLines.push(fullLine);
        setTerminalLines([...localCompletedLines]);
        currentLine = "";
        setCurrentText("");
        lineIndex++;
        charIndex = 0;
      }
    }, 12); // Snappy terminal speed

    return () => clearInterval(typeInterval);
  }, [activeSkill]);

  // GSAP animations for stagger loading cartridges
  useGSAP(() => {
    // Reveal header
    gsap.fromTo('.skills-header-content', 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" }
      }
    );

    // Stagger render cartridge cards
    gsap.fromTo('.skill-cartridge', 
      { opacity: 0, scale: 0.95, y: 15 },
      {
        opacity: 1, scale: 1, y: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: '.skill-cartridges-grid', start: "top 85%" }
      }
    );
  }, { scope: sectionRef });

  // Core pulse transition on skill change
  useEffect(() => {
    if (!coreRef.current) return;
    gsap.fromTo(coreRef.current, 
      { scale: 0.85, filter: "brightness(1.8)" },
      { scale: 1, filter: "brightness(1)", duration: 0.5, ease: "elastic.out(1, 0.6)" }
    );
  }, [activeSkill]);

  const categories = [
    { id: "frontend", name: "Frontend Core", icon: Code2, activeColor: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30" },
    { id: "backend", name: "Backend Architecture", icon: Server, activeColor: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
    { id: "database", name: "Database & Cloud", icon: Database, activeColor: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
    { id: "tools", name: "DevOps & Systems", icon: Settings, activeColor: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30" },
  ];

  const row1 = [...skillsData].slice(0, 12);
  const row2 = [...skillsData].slice(12);

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
        @keyframes blink-cursor {
          50% { opacity: 0; }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.01);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
        @keyframes line-flow {
          to {
            stroke-dashoffset: -20;
          }
        }
        .animate-line-flow {
          animation: line-flow 0.8s linear infinite;
        }
        @keyframes float-orbiter-0 {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px) translateX(0px); }
          50% { transform: translate(-50%, -50%) translateY(-6px) translateX(3px); }
        }
        @keyframes float-orbiter-1 {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px) translateX(0px); }
          50% { transform: translate(-50%, -50%) translateY(5px) translateX(-4px); }
        }
        @keyframes float-orbiter-2 {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px) translateX(0px); }
          50% { transform: translate(-50%, -50%) translateY(-4px) translateX(-5px); }
        }
        @keyframes float-orbiter-3 {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px) translateX(0px); }
          50% { transform: translate(-50%, -50%) translateY(6px) translateX(4px); }
        }
        .float-orbiter-0 { animation: float-orbiter-0 5s ease-in-out infinite; }
        .float-orbiter-1 { animation: float-orbiter-1 6s ease-in-out infinite; }
        .float-orbiter-2 { animation: float-orbiter-2 5.5s ease-in-out infinite; }
        .float-orbiter-3 { animation: float-orbiter-3 6.5s ease-in-out infinite; }
      `}} />
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[50vh] bg-indigo-900/5 blur-[180px] rounded-full pointer-events-none z-0" />
      
      {/* Section Header */}
      <div className="container mx-auto px-4 sm:px-6 mb-16 text-center z-10 relative skills-header-content">
         <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter" style={{ fontFamily: "'Cinzel', serif" }}>
           Skill <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Core</span>
         </h2>
         <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto mt-4 font-light">
           Interactive telemetry showing components integration, functional architectures, and system metrics.
         </p>
         
         {/* System Telemetry Specs */}
         <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-mono text-white/35 mt-6 border-t border-white/5 pt-4 max-w-xl mx-auto">
           <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> SYSTEM: ONLINE</div>
           <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" /> INTERACTIVE NODES: 24</div>
           <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" /> TELEMETRY LOAD: STABLE</div>
         </div>
      </div>
      
      {/* Dashboard Core Console */}
      <div className="container mx-auto px-4 sm:px-6 mb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel: Category tabs & skill cartridges */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Category selection modules */}
            <div className="grid grid-cols-2 gap-2 bg-[#050505] border border-white/10 rounded-2xl p-2 shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300 gap-1.5 ${
                    activeCat === cat.id
                      ? `${cat.activeColor} ${cat.bg} ${cat.border} shadow-[0_0_15px_rgba(255,255,255,0.01)]`
                      : 'text-white/40 border-transparent hover:text-white/60 hover:bg-white/[0.02]'
                  }`}
                >
                  <cat.icon className="w-5 h-5" />
                  <span className="text-[9px] font-bold uppercase tracking-wider">{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Cartridges Grid list */}
            <div className="skill-cartridges-grid grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar flex-1">
              {filteredSkills.map((skill) => {
                const isActive = activeSkill.name === skill.name;
                return (
                  <button
                    key={skill.name}
                    onClick={() => setActiveSkill(skill)}
                    className={`skill-cartridge flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 text-left relative overflow-hidden group ${
                      isActive
                        ? 'bg-white/[0.04] border-white/20 shadow-lg'
                        : 'bg-[#080808]/80 border-white/5 hover:border-white/12 hover:bg-white/[0.02]'
                    }`}
                    style={{
                      borderLeftColor: isActive ? activeSkill.color : undefined,
                      borderLeftWidth: isActive ? '3px' : undefined,
                    }}
                  >
                    {/* Ambient Hover light */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 blur-lg rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                    
                    {/* Tech icon */}
                    <div className="w-7 h-7 relative flex items-center justify-center shrink-0">
                      <img src={`${DEVICON}${skill.logo}`} alt={skill.name} className="w-full h-full object-contain filter drop-shadow-md" />
                    </div>
                    
                    {/* Cartridge Text info */}
                    <div className="truncate">
                      <div className="text-xs font-bold text-white uppercase tracking-wider truncate">{skill.name}</div>
                      <div className="text-[8px] font-mono text-white/35 tracking-widest uppercase mt-0.5">{skill.level}% Integrity</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Core Reactor & Diagnostics Console HUD */}
          <div className="lg:col-span-7 bg-[#050505]/90 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden shadow-2xl">
            
            {/* Tech grid mesh line overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:16px_28px] pointer-events-none" />

            {/* Core Reactor Visualisation with Constellation Orbiters */}
            <div className="w-full md:w-1/2 flex items-center justify-center relative shrink-0 min-h-[300px]">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                
                {/* Radial color backglow */}
                <div 
                  className="absolute inset-12 rounded-full transition-all duration-700 blur-3xl opacity-20 animate-pulse" 
                  style={{ backgroundColor: activeSkill.color }} 
                />

                {/* Concentric rings systems & line connections */}
                <svg className="absolute w-full h-full overflow-visible" viewBox="0 0 200 200">
                  {/* Scope target elements */}
                  <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="0.5" className="text-white/5" fill="none" />
                  <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="0.5" className="text-white/5" strokeDasharray="3 3" fill="none" />
                  <line x1="100" y1="5" x2="100" y2="195" stroke="currentColor" strokeWidth="0.5" className="text-white/5" />
                  <line x1="5" y1="100" x2="195" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-white/5" />

                  {/* SVG connection lines to orbiting nodes */}
                  {filteredSkills.map((skill, idx) => {
                    const isActive = activeSkill.name === skill.name;
                    const angleRad = (idx * 2 * Math.PI) / filteredSkills.length - Math.PI / 2;
                    const cx = 100 + 72 * Math.cos(angleRad);
                    const cy = 100 + 72 * Math.sin(angleRad);

                    return isActive ? (
                      <line
                        key={skill.name}
                        x1="100"
                        y1="100"
                        x2={cx}
                        y2={cy}
                        stroke={skill.color}
                        strokeWidth="1.5"
                        strokeDasharray="4 6"
                        className="animate-line-flow"
                        style={{ filter: `drop-shadow(0 0 4px ${skill.color})` }}
                      />
                    ) : (
                      <line
                        key={skill.name}
                        x1="100"
                        y1="100"
                        x2={cx}
                        y2={cy}
                        stroke="currentColor"
                        strokeWidth="0.5"
                        className="text-white/10"
                        strokeDasharray="2 4"
                      />
                    );
                  })}

                  {/* Outer mechanical dial ring */}
                  <circle 
                    cx="100" 
                    cy="100" 
                    r="85" 
                    stroke={activeSkill.color} 
                    strokeWidth="1.5" 
                    strokeDasharray="40 80 15 35" 
                    className="origin-center animate-[spin_15s_linear_infinite] transition-colors duration-700" 
                    fill="none" 
                    opacity="0.25"
                  />

                  {/* Inner energizer circuit ring */}
                  <circle 
                    cx="100" 
                    cy="100" 
                    r="48" 
                    stroke={activeSkill.color} 
                    strokeWidth="2.2" 
                    strokeDasharray="10 15" 
                    className="origin-center animate-[spin_7s_linear_infinite] transition-colors duration-700" 
                    fill="none" 
                    opacity="0.8"
                  />

                  {/* Radar Sweeper Line */}
                  <line 
                    x1="100" 
                    y1="100" 
                    x2="100" 
                    y2="15" 
                    stroke={activeSkill.color} 
                    strokeWidth="0.8" 
                    className="origin-center animate-[spin_10s_linear_infinite] opacity-20 transition-colors duration-700" 
                  />
                </svg>

                {/* Selected cartridge active chip in the absolute core center */}
                <div 
                  ref={coreRef}
                  className="z-10 w-20 h-20 rounded-full bg-[#030303] border flex flex-col items-center justify-center p-3 shadow-2xl transition-all duration-700" 
                  style={{ borderColor: activeSkill.color, boxShadow: `0 0 20px ${activeSkill.color}33` }}
                >
                  <img 
                    src={`${DEVICON}${activeSkill.logo}`} 
                    alt={activeSkill.name} 
                    className="w-8 h-8 object-contain filter drop-shadow-lg"
                  />
                  <span className="text-[7px] font-black text-white/50 tracking-widest mt-1 uppercase truncate max-w-full">
                    {activeSkill.name}
                  </span>
                </div>

                {/* Orbiting Satellite Node Buttons (Constellation displaying ALL active category logos) */}
                {filteredSkills.map((skill, idx) => {
                  const isActive = activeSkill.name === skill.name;
                  const angleRad = (idx * 2 * Math.PI) / filteredSkills.length - Math.PI / 2;
                  const leftPercent = 50 + 36 * Math.cos(angleRad); // 36% radius of container
                  const topPercent = 50 + 36 * Math.sin(angleRad);
                  const floatClass = `float-orbiter-${idx % 4}`;

                  return (
                    <button
                      key={skill.name}
                      onClick={() => setActiveSkill(skill)}
                      className={`absolute w-12 h-12 rounded-full bg-[#050505] border flex items-center justify-center p-2.5 transition-all duration-300 hover:scale-115 z-20 group/orbiter ${floatClass}`}
                      style={{
                        left: `${leftPercent}%`,
                        top: `${topPercent}%`,
                        borderColor: isActive ? skill.color : 'rgba(255, 255, 255, 0.08)',
                        boxShadow: isActive ? `0 0 15px ${skill.color}44` : 'none',
                      }}
                    >
                      <img 
                        src={`${DEVICON}${skill.logo}`} 
                        alt={skill.name} 
                        className={`w-full h-full object-contain filter transition-all duration-300 ${
                          isActive ? 'scale-100' : 'scale-90 opacity-60 group-hover/orbiter:opacity-100 group-hover/orbiter:scale-100'
                        }`} 
                      />
                      
                      {/* Tooltip on Hover */}
                      <span className="absolute bottom-full mb-2 scale-0 group-hover/orbiter:scale-100 transition-all duration-200 bg-black/95 border border-white/10 rounded px-2.5 py-1 text-[8px] font-mono font-bold uppercase tracking-widest text-white whitespace-nowrap z-30 pointer-events-none shadow-2xl">
                        {skill.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Diagnostics Console Panel */}
            <div className="w-full md:w-1/2 space-y-6 text-left relative z-10 flex flex-col justify-between">
              
              {/* Header specs */}
              <div className="border-b border-white/10 pb-4 shrink-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">System Telemetry HUD</span>
                  <Cpu className="w-3.5 h-3.5 text-white/20 animate-pulse" />
                </div>
                
                <h3 className="text-2xl font-black text-white tracking-tighter uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                  {activeSkill.name}
                </h3>
                
                <p className="text-[8px] font-mono tracking-widest text-white/30 uppercase mt-0.5">
                  CORE CAPACITY SCORE
                </p>

                {/* Segmented Power Grid */}
                <div className="flex items-center gap-1.5 mt-2.5">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const isLit = i < Math.round((activeSkill.level / 100) * 12);
                    return (
                      <div 
                        key={i} 
                        className="w-3 h-4 rounded-[2px] transform -skew-x-12 transition-all duration-500 border shrink-0"
                        style={{
                          backgroundColor: isLit ? `${activeSkill.color}22` : 'rgba(255, 255, 255, 0.02)',
                          borderColor: isLit ? activeSkill.color : 'rgba(255, 255, 255, 0.04)',
                          boxShadow: isLit ? `0 0 6px ${activeSkill.color}22` : 'none'
                        }}
                      />
                    );
                  })}
                  <span className="text-[10px] font-mono font-bold ml-2 text-white/45">{activeSkill.level}%</span>
                </div>
              </div>

              {/* Specs array parameters */}
              <div className="space-y-2 flex-1">
                <div className="text-[8px] font-mono text-white/30 tracking-widest uppercase">Sub-System Operations</div>
                <div className="grid grid-cols-1 gap-1.5">
                  {activeSkill.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-white/70 bg-white/[0.02] border border-white/5 rounded-lg p-2.5 hover:bg-white/[0.04] transition-colors duration-300">
                      <Sparkles className="w-3 h-3 shrink-0" style={{ color: activeSkill.color }} />
                      <span className="truncate">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Retro System code-log box */}
              <div className="bg-black/80 border border-white/10 rounded-xl p-4 font-mono relative overflow-hidden h-[120px] flex flex-col shrink-0">
                {/* Visual scanline */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.005] via-transparent to-black/10 pointer-events-none" />
                <div className="text-[7px] text-white/35 tracking-widest uppercase border-b border-white/5 pb-1.5 mb-2 flex items-center justify-between">
                  <span>TERMINAL FEEDBACK</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${isTyping ? 'bg-amber-400' : 'bg-green-400'} animate-pulse`} />
                </div>
                
                {/* Print code text */}
                <div className="flex-1 flex flex-col justify-start text-[10px] font-mono text-green-400/80 space-y-1">
                  {terminalLines.map((line, idx) => (
                    <div key={idx} className="leading-normal">{line}</div>
                  ))}
                  {isTyping && (
                    <div className="flex items-center leading-normal">
                      <span>{currentText}</span>
                      <span className="w-1.5 h-3 bg-green-400 ml-1 animate-[blink-cursor_1s_infinite]" />
                    </div>
                  )}
                  {!isTyping && (
                    <div className="text-green-500 font-bold mt-0.5 animate-pulse text-[9px]">
                      &gt;&gt; SYNERGY ALIGNED: ACTIVE
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Full Ecosystem Marquees */}
      <div className="flex flex-col gap-4 relative z-10 w-[100vw] max-w-[100vw] -ml-[50vw] left-[50%] mt-8">
        <div className="container mx-auto px-6 mb-1 text-center">
          <p className="text-white/35 font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase">Core Technologies Ecosystem</p>
        </div>
        <MarqueeRow items={row1} speed={70} />
        <MarqueeRow items={row2} reverse={true} speed={85} />
      </div>
    </section>
  );
};

export default Skills;
