import { useRef, useState, useEffect } from "react";
import { Award, Shield, Globe, Code2, BookOpen, ExternalLink, X, BadgeCheck, TerminalSquare, Sparkles, ChevronRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);

CustomEase.create("premium", "0.16, 1, 0.3, 1");
CustomEase.create("snap", "0.87, 0, 0.13, 1");

// ─── Palette ────────────────────────────────────────────────────────────────
const categoryColors: Record<string, {
  text: string; bg: string; border: string; glow: string;
  gradFrom: string; solid: string; particle: string;
}> = {
  HACKATHON:    { text: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/30",   glow: "shadow-amber-500/20",   gradFrom: "from-amber-500/30",   solid: "#f59e0b", particle: "rgba(245,158,11," },
  "AI / LOW-CODE":{ text: "text-cyan-400",  bg: "bg-cyan-500/10",    border: "border-cyan-500/30",    glow: "shadow-cyan-500/20",    gradFrom: "from-cyan-500/30",    solid: "#22d3ee", particle: "rgba(34,211,238," },
  INTERNSHIP:   { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", glow: "shadow-emerald-500/20", gradFrom: "from-emerald-500/30", solid: "#34d399", particle: "rgba(52,211,153," },
  BOOTCAMP:     { text: "text-violet-400",  bg: "bg-violet-500/10",  border: "border-violet-500/30",  glow: "shadow-violet-500/20",  gradFrom: "from-violet-500/30",  solid: "#a78bfa", particle: "rgba(167,139,250," },
  TRAINING:     { text: "text-rose-400",    bg: "bg-rose-500/10",    border: "border-rose-500/30",    glow: "shadow-rose-500/20",    gradFrom: "from-rose-500/30",    solid: "#fb7185", particle: "rgba(251,113,133," },
  "AI CHALLENGE":{ text: "text-sky-400",   bg: "bg-sky-500/10",     border: "border-sky-500/30",     glow: "shadow-sky-500/20",     gradFrom: "from-sky-500/30",     solid: "#38bdf8", particle: "rgba(56,189,248," },
};

// ─── Data ────────────────────────────────────────────────────────────────────
const certificates = [
  {
    id: "ELECTRO-SPHERE-2026",
    title: "ElectroSphereᴰᴹ 2K26 — 2nd Place",
    issuer: "Swaminarayan University",
    description: "Certificate of Achievement for securing 2nd Place in the Software Edition. Representing team 'InnovateX', recognized for outstanding performance.",
    image: "https://i.postimg.cc/5tVMDD7b/Electro-Sphereᴰᴹ-2K26-Certificate-jpg.jpg",
    category: "HACKATHON", year: "2026", icon: Award,
  },
  {
    id: "HACK-X-2026",
    title: "Hack.X at HackTheSpring '26",
    issuer: "Government Engineering College, Gandhinagar",
    description: "Recognizes participation in Hack.X, highlighting engagement with the regional developer community.",
    image: "https://i.postimg.cc/x8crKQCR/Hack-X.png",
    category: "HACKATHON", year: "2026", icon: Code2,
  },
  {
    id: "SU-HACKATHON-2026",
    title: "SU_HACKATHON — Finalist",
    issuer: "Sangam University & DST",
    description: "Participating under team 'codepulse', focused on Innovation in Textile City Bhilwara.",
    image: "https://i.postimg.cc/7hpR0Tjq/SU-Hackathon.jpg",
    category: "HACKATHON", year: "2026", icon: Code2,
  },
  {
    id: "DEV-HEAT-2026",
    title: "Dev Heat Hackathon (Spring Fiesta)",
    issuer: "Indian Institute of Information Technology (IIIT), Surat",
    description: "Participated in the Dev Heat Hackathon, showcasing consistency in attending high-level engineering competitions.",
    image: "https://i.postimg.cc/grFMnb6w/Screenshot-2026-03-27-212428.png",
    category: "HACKATHON", year: "2026", icon: Globe,
  },
  {
    id: "APPIAN-AI-2026",
    title: "Appian AI Application Challenge",
    issuer: "IIT Madras (Shaastra 2026)",
    description: "Issued via Unstop, confirms participation in one of India's most prestigious technical festivals.",
    image: "https://i.postimg.cc/WbvCN0mw/IIT-madras.png",
    category: "AI / LOW-CODE", year: "2026", icon: TerminalSquare,
  },
  {
    id: "NIELIT-PYTHON-2024",
    title: "Python Programming Internship",
    issuer: "NIELIT, Daman (PM Shri Scheme)",
    description: "Successful completion of a one-week internship course in Python Programming representing an official government-recognized start.",
    image: "https://i.postimg.cc/SKkxcXpt/Screenshot-2026-03-28-010855.png",
    category: "INTERNSHIP", year: "2024", icon: Code2,
  },
  {
    id: "STEM-BOOTCAMP-2025",
    title: "Bootcamp for STEM Students — Winner",
    issuer: "GUJCOST & NFSU",
    description: "National Level Winner. Reflects early interest in forensic science and technology-driven research.",
    image: "https://i.postimg.cc/htbS4S7X/STEM-Quiz.jpg",
    category: "BOOTCAMP", year: "2025", icon: Shield,
  },
  {
    id: "NASSCOM-SKILL-2024",
    title: "Domestic Data Entry Operator",
    issuer: "IT-ITeS Sector Skill Council (NASSCOM)",
    description: "Earned a B Grade after 450 hours of training proving foundational proficiency in data management.",
    image: "https://i.postimg.cc/MH8PG8Bk/skill-india.jpg",
    category: "TRAINING", year: "2024", icon: BookOpen,
  },
  {
    id: "NERDS-AI-2026",
    title: "Nerds AI Quest (Valentine Edition)",
    issuer: "Nerds Room",
    description: "Acknowledges participation in this specialized AI-themed challenge testing ML and AI skills.",
    image: "https://i.postimg.cc/R06XQ0QK/Screenshot-2026-03-27-212454.png",
    category: "AI CHALLENGE", year: "2026", icon: TerminalSquare,
  },
];

// ─── Particle Canvas ─────────────────────────────────────────────────────────
const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let W = 0, H = 0;

    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number; color: string }[] = [];
    const COLORS = ["rgba(245,158,11,", "rgba(167,139,250,", "rgba(34,211,238,", "rgba(52,211,153,"];

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    const spawn = () => {
      for (let i = 0; i < 55; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.5 + 0.4,
          a: Math.random(),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        p.a += 0.003;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        const alpha = (Math.sin(p.a) * 0.5 + 0.5) * 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!animId) tick();
      } else {
        cancelAnimationFrame(animId!);
        animId = undefined;
      }
    }, { threshold: 0.1 });

    resize();
    spawn();
    observer.observe(canvas);
    
    window.addEventListener("resize", resize);
    return () => { 
      observer.disconnect();
      cancelAnimationFrame(animId!); 
      window.removeEventListener("resize", resize); 
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />;
};

// ─── Magnetic Card Wrapper ────────────────────────────────────────────────────
const MagneticCard = ({ children, className, onClick }: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      rotateY: x * 0.04,
      rotateX: -y * 0.04,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(ref.current, {
      rotateY: 0, rotateX: 0, duration: 0.7, ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <div
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
};

// ─── Shimmer Border ───────────────────────────────────────────────────────────
const ShimmerBorder = ({ color }: { color: string }) => (
  <div
    className="absolute inset-0 rounded-[1.5rem] pointer-events-none"
    style={{
      padding: "1px",
      background: `conic-gradient(from var(--angle, 0deg), transparent 20%, ${color}88 50%, transparent 80%)`,
      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
      animation: "spin-slow 4s linear infinite",
    }}
  />
);

// ─── Main Component ───────────────────────────────────────────────────────────
const Certificates = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [modalStage, setModalStage] = useState<"closed" | "opening" | "open" | "closing">("closed");

  const categories = ["ALL", ...Array.from(new Set(certificates.map(c => c.category)))];
  const filteredCerts = activeFilter === "ALL" ? certificates : certificates.filter(c => c.category === activeFilter);

  const getColors = (cat: string) => categoryColors[cat] || categoryColors.HACKATHON;

  // ── Open / close modal with animation
  const openModal = (cert: typeof certificates[0]) => {
    setSelectedCert(cert);
    setModalStage("opening");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setModalStage("open"));
    });
  };

  const closeModal = () => {
    setModalStage("closing");
    setTimeout(() => {
      setSelectedCert(null);
      setModalStage("closed");
    }, 350);
  };

  // ── Body overflow
  useEffect(() => {
    document.body.style.overflow = selectedCert ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedCert]);

  // ── Animated counter
  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;
    const target = filteredCerts.length;
    let frame: number;
    let start: number | null = null;
    const duration = 500;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      el.textContent = String(Math.round(progress * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [filteredCerts.length]);

  // ── GSAP scroll entrance
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set([".cert-badge", ".cert-label", ".cert-title-word", ".cert-subtitle", ".cert-filter-btn", ".cert-counter"], { opacity: 1, y: 0, scale: 1, clipPath: "none" });
      return;
    }

    // Kinetic title split
    if (headingRef.current) {
      const split = new SplitText(headingRef.current, { type: "words,chars" });
      gsap.fromTo(split.chars,
        { opacity: 0, y: "120%", rotateX: -90, transformOrigin: "50% 100%" },
        {
          opacity: 1, y: "0%", rotateX: 0,
          stagger: { amount: 0.6, from: "start" },
          duration: 1, ease: "premium",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }

    gsap.fromTo(".cert-badge",
      { opacity: 0, x: -30, scale: 0.8 },
      { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: "back.out(2)", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
    );
    gsap.fromTo(".cert-subtitle",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "premium", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
    );
    gsap.fromTo(".cert-counter",
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
    );
    gsap.fromTo(".cert-filter-btn",
      { opacity: 0, y: 20, scale: 0.85 },
      {
        opacity: 1, y: 0, scale: 1, stagger: 0.06, duration: 0.55, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".cert-filters", start: "top 90%" },
      }
    );
  }, { scope: sectionRef });

  // ── Re-animate cards on filter
  useEffect(() => {
    const cards = document.querySelectorAll(".cert-card");
    gsap.fromTo(cards,
      { opacity: 0, y: 50, scale: 0.9, rotateX: 12 },
      { opacity: 1, y: 0, scale: 1, rotateX: 0, stagger: 0.07, duration: 0.65, ease: "premium", transformPerspective: 800 }
    );
  }, [activeFilter]);

  return (
    <section
      id="certificates"
      className="relative py-28 md:py-40 bg-[#040404] overflow-hidden"
      ref={sectionRef}
    >
      {/* ── Global shimmer keyframe */}
      <style>{`
        @keyframes spin-slow {
          to { --angle: 360deg; }
        }
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes float-y {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes grain {
          0%, 100% { transform: translate(0,0); }
          10% { transform: translate(-2%, -3%); }
          30% { transform: translate(3%, 2%); }
          50% { transform: translate(-1%, 4%); }
          70% { transform: translate(4%, -1%); }
          90% { transform: translate(-3%, 1%); }
        }
        @keyframes scanline {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
        @keyframes beam-move {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        .cert-card:hover .card-shine {
          animation: beam-move 0.9s ease forwards;
        }
        .cert-card {
          transform-style: preserve-3d;
        }
        .modal-overlay {
          transition: opacity 0.35s cubic-bezier(0.16,1,0.3,1), backdrop-filter 0.35s;
        }
        .modal-overlay.opening, .modal-overlay.open {
          opacity: 1;
          backdrop-filter: blur(24px);
        }
        .modal-overlay.closing, .modal-overlay.closed {
          opacity: 0;
          backdrop-filter: blur(0px);
        }
        .modal-panel {
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.35s;
        }
        .modal-panel.opening, .modal-panel.open {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        .modal-panel.closing, .modal-panel.closed {
          transform: translateY(40px) scale(0.97);
          opacity: 0;
        }
        .progress-bar {
          transition: width 1.2s cubic-bezier(0.16,1,0.3,1);
        }
      `}</style>

      {/* ── Particle layer */}
      <ParticleField />

      {/* ── Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          animation: "grain 8s steps(10) infinite",
        }}
      />

      {/* ── Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[10%] w-[700px] h-[700px] rounded-full bg-amber-500/[0.04] blur-[180px]" style={{ animation: "float-y 10s ease-in-out infinite" }} />
        <div className="absolute bottom-[-5%] right-[5%] w-[500px] h-[500px] rounded-full bg-violet-500/[0.05] blur-[150px]" style={{ animation: "float-y 14s ease-in-out infinite reverse" }} />
        <div className="absolute top-[40%] left-[60%] w-[350px] h-[350px] rounded-full bg-cyan-500/[0.03] blur-[120px]" style={{ animation: "float-y 8s ease-in-out infinite 2s" }} />
      </div>

      {/* ── Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* ── Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="cert-badge opacity-0 relative flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/25">
              {/* Pulse ring */}
              <span className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-amber-400 opacity-60" style={{ animation: "pulse-ring 2s ease-out infinite" }} />
                <span className="relative block w-2 h-2 rounded-full bg-amber-400" />
              </span>
              <Sparkles className="w-4 h-4 text-amber-400 ml-4" />
              <span className="text-amber-400 font-mono text-[11px] tracking-[0.2em] uppercase font-bold">Professional Milestones</span>
            </div>
          </div>

          <div className="overflow-hidden mb-2">
            <h2
              ref={headingRef}
              className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Licenses <span className="text-white/20 font-light italic">&amp;</span>{" "}
              <span className="relative inline-block">
                Certifications
                {/* Underline shimmer */}
                <span className="absolute bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-amber-500/0 via-amber-500/60 to-amber-500/0" />
              </span>
            </h2>
          </div>

          <div className="flex items-end gap-8 mt-6">
            <p className="cert-subtitle opacity-0 text-white/40 text-lg max-w-xl leading-relaxed" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
              A curated collection of achievements, hackathon wins, and professional credentials earned throughout my journey.
            </p>
            {/* Animated counter badge */}
            <div className="cert-counter opacity-0 shrink-0 flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/10">
              <span ref={counterRef} className="text-3xl font-black text-white tabular-nums">0</span>
              <span className="text-[9px] text-white/30 uppercase tracking-widest font-bold mt-0.5">Certs</span>
            </div>
          </div>
        </div>

        {/* ── Category Filters */}
        <div className="cert-filters flex flex-wrap gap-2.5 mb-14">
          {categories.map(cat => {
            const isActive = activeFilter === cat;
            const colors = cat === "ALL"
              ? { text: "text-white", bg: "bg-white/10", border: "border-white/20", solid: "#ffffff" }
              : getColors(cat);
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`cert-filter-btn relative overflow-hidden px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 border ${
                  isActive
                    ? `${colors.bg} ${colors.border} ${colors.text} shadow-lg`
                    : "bg-white/[0.02] border-white/8 text-white/35 hover:text-white/70 hover:bg-white/[0.05] hover:border-white/15"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at 50% 50%, ${"solid" in colors ? colors.solid : "#fff"}18, transparent 70%)`,
                    }}
                  />
                )}
                <span className="relative z-10">
                  {cat}
                  {isActive && (
                    <span className="ml-2 text-[8px] opacity-50">
                      ({cat === "ALL" ? certificates.length : certificates.filter(c => c.category === cat).length})
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Certificate Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert, i) => {
            const colors = getColors(cert.category);
            const isHovered = hoveredId === cert.id;
            return (
              <MagneticCard
                key={cert.id}
                className="cert-card opacity-0 relative rounded-[1.5rem] cursor-pointer group"
                onClick={() => openModal(cert)}
              >
                {/* Shimmer border on hover */}
                {isHovered && <ShimmerBorder color={colors.solid} />}

                {/* Static border */}
                <div className={`absolute inset-0 rounded-[1.5rem] border pointer-events-none transition-all duration-500 ${isHovered ? "border-white/0" : "border-white/8"}`} />

                <div
                  className="relative h-full rounded-[1.5rem] overflow-hidden flex flex-col bg-gradient-to-b from-white/[0.04] to-[#060606]"
                  onMouseEnter={() => setHoveredId(cert.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Card index number */}
                  <span
                    className="absolute top-4 left-5 text-[11px] font-black text-white/10 font-mono tabular-nums z-20 select-none"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* ── Image */}
                  <div className="relative h-52 overflow-hidden bg-black/60 shrink-0">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover sm:object-contain object-center transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />

                    {/* Scan-line overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
                      }}
                    />

                    {/* Gradient bottom fade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#06060680] to-transparent opacity-80" />

                    {/* Beam sweep */}
                    <div
                      className="card-shine absolute top-0 bottom-0 w-1/4 pointer-events-none -translate-x-full"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
                      }}
                    />

                    {/* Category pill */}
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${colors.bg} ${colors.text} border ${colors.border} backdrop-blur-sm z-10`}>
                      {cert.category}
                    </div>

                    {/* Hover CTA */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 z-10">
                      <div
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest border backdrop-blur-md translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ${colors.bg} ${colors.border} ${colors.text}`}
                      >
                        <ExternalLink size={13} /> View Credential
                      </div>
                    </div>
                  </div>

                  {/* ── Content */}
                  <div className="p-6 flex flex-col flex-grow" style={{ transform: "translateZ(20px)" }}>
                    <div className="flex items-start gap-4 mb-5">
                      <div className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                        style={{ boxShadow: isHovered ? `0 0 20px ${colors.solid}30` : "none" }}
                      >
                        <cert.icon className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      <div className="min-w-0">
                        <h3 className={`font-bold text-white text-[15px] leading-snug mb-1 transition-colors duration-300 line-clamp-2 group-hover:${colors.text}`}>
                          {cert.title}
                        </h3>
                        <p className="text-[12px] text-white/30 font-medium leading-relaxed">{cert.issuer}</p>
                      </div>
                    </div>

                    {/* Progress bar (decorative, represents "verified") */}
                    <div className="mb-5">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[9px] text-white/20 uppercase tracking-widest font-bold">Verification Score</span>
                        <span className={`text-[9px] font-black ${colors.text}`}></span>
                      </div>
                      <div className="h-[3px] rounded-full bg-white/5 overflow-hidden">
                        <div
                          className={`progress-bar h-full rounded-full bg-gradient-to-r ${colors.gradFrom.replace("from-", "from-")} to-transparent`}
                          style={{
                            width: isHovered ? "100%" : "65%",
                            background: `linear-gradient(90deg, ${colors.solid}60, ${colors.solid}cc)`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                      <span className="text-sm text-white/25 font-mono tracking-wider">{cert.year}</span>
                      <div className="flex items-center gap-1.5">
                        <BadgeCheck className={`w-3.5 h-3.5 ${colors.text} opacity-70`} />
                        <span className={`text-[9px] font-black ${colors.text} opacity-70 uppercase tracking-widest`}>Verified</span>
                        <ChevronRight className={`w-3 h-3 ${colors.text} opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300`} />
                      </div>
                    </div>
                  </div>
                </div>
              </MagneticCard>
            );
          })}
        </div>
      </div>

      {/* ─────────────── Modal ─────────────── */}
      {selectedCert && (() => {
        const colors = getColors(selectedCert.category);
        return (
          <div className={`fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 modal-overlay ${modalStage}`}
            style={{ background: "rgba(0,0,0,0.88)" }}
            onClick={closeModal}
          >
            <div
              className={`modal-panel relative bg-[#080808] border border-white/10 rounded-[2rem] w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl ${modalStage}`}
              style={{ boxShadow: `0 40px 120px ${colors.solid}25, 0 0 0 1px ${colors.solid}15` }}
              onClick={e => e.stopPropagation()}
            >
              {/* Top shimmer accent */}
              <div className={`absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[${colors.solid}] to-transparent`}
                style={{ background: `linear-gradient(90deg, transparent, ${colors.solid}90, transparent)` }}
              />
              {/* Grain */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.02] rounded-[2rem] overflow-hidden"
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
              />

              {/* ── Modal Header */}
              <div className="flex items-start justify-between p-7 md:p-9 border-b border-white/8 shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inset-0 rounded-full animate-ping" style={{ background: colors.solid, opacity: 0.5 }} />
                      <span className="relative block h-2 w-2 rounded-full" style={{ background: colors.solid }} />
                    </span>
                    <p className={`${colors.text} font-mono text-[10px] font-black tracking-[0.2em] uppercase`}>Credential Detail</p>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-1"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {selectedCert.title}
                  </h3>
                  <p className="text-white/35 text-sm">Issued by {selectedCert.issuer}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 hover:rotate-90 shrink-0 mt-1"
                >
                  <X size={17} />
                </button>
              </div>

              {/* ── Modal Body */}
              <div className="p-7 md:p-9 overflow-y-auto flex-grow space-y-7">

                {/* Verification card */}
                <div className={`relative overflow-hidden rounded-2xl border ${colors.border} p-6 flex flex-wrap gap-4 items-center justify-between`}
                  style={{ background: `${colors.solid}08` }}>
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 0% 50%, ${colors.solid}10, transparent 60%)` }}
                  />
                  <div className="relative">
                    <p className="text-[10px] text-white/25 font-mono uppercase tracking-widest mb-1.5">Verification ID</p>
                    <p className={`${colors.text} font-black tracking-wider text-xl font-mono`}>{selectedCert.id}</p>
                  </div>
                  <div className={`relative flex items-center gap-2 ${colors.bg} ${colors.text} px-5 py-2.5 rounded-full text-sm font-black border ${colors.border}`}>
                    <BadgeCheck size={17} />
                    <span>VERIFIED</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/55 leading-relaxed text-[16px]" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                  {selectedCert.description}
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Year", value: selectedCert.year },
                    { label: "Category", value: selectedCert.category },
                    { label: "Status", value: "Active" },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-xl bg-white/[0.03] border border-white/8 p-4 text-center">
                      <p className="text-[9px] text-white/25 uppercase tracking-widest font-bold mb-1.5">{label}</p>
                      <p className={`font-black text-sm ${colors.text}`}>{value}</p>
                    </div>
                  ))}
                </div>

                {/* Certificate Image */}
                <div className={`rounded-2xl overflow-hidden border border-white/10 bg-black/60`}
                  style={{ boxShadow: `0 20px 60px ${colors.solid}15` }}>
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="w-full h-auto max-h-[50vh] object-contain"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* ── Modal Footer */}
              <div className="p-7 md:p-9 border-t border-white/8 flex items-center justify-between shrink-0 bg-[#060606]">
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${colors.bg} ${colors.text} border ${colors.border}`}>
                    {selectedCert.category}
                  </span>
                  <span className="text-white/25 font-mono text-sm">{selectedCert.year}</span>
                </div>
                <a
                  href={selectedCert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden flex items-center gap-2 text-black font-black py-3 px-8 rounded-full text-[12px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${colors.solid}, ${colors.solid}cc)` }}
                >
                  <span className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)", transform: "skewX(-20deg) translateX(-100%)", transition: "transform 0.5s" }}
                  />
                  VIEW FULL <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
};

export default Certificates;
