import { useRef, useState, useEffect } from "react";
import { Award, Shield, Globe, Code2, BookOpen, ExternalLink, X, BadgeCheck, TerminalSquare, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categoryColors: Record<string, { text: string; bg: string; border: string; glow: string; gradFrom: string }> = {
  HACKATHON: { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/25", glow: "shadow-amber-500/15", gradFrom: "from-amber-500/20" },
  "AI / LOW-CODE": { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/25", glow: "shadow-cyan-500/15", gradFrom: "from-cyan-500/20" },
  INTERNSHIP: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/25", glow: "shadow-emerald-500/15", gradFrom: "from-emerald-500/20" },
  BOOTCAMP: { text: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/25", glow: "shadow-violet-500/15", gradFrom: "from-violet-500/20" },
  TRAINING: { text: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/25", glow: "shadow-rose-500/15", gradFrom: "from-rose-500/20" },
  "AI CHALLENGE": { text: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/25", glow: "shadow-sky-500/15", gradFrom: "from-sky-500/20" },
};

const certificates = [
  {
    id: "ELECTRO-SPHERE-2026",
    title: "ElectroSphereᴰᴹ 2K26 - 2nd Place Winner",
    issuer: "Swaminarayan University",
    description: "Certificate of Achievement for securing 2nd Place in the Software Edition. Representing team 'InnovateX', recognized for outstanding performance.",
    image: "https://i.postimg.cc/5tVMDD7b/Electro-Sphereᴰᴹ-2K26-Certificate-jpg.jpg",
    category: "HACKATHON",
    year: "2026",
    icon: Award,
    link: "#"
  },
  {
    id: "HACK-X-2026",
    title: "Hack.X at HackTheSpring '26",
    issuer: "Government Engineering College, Gandhinagar",
    description: "Recognizes participation in Hack.X, highlighting engagement with the regional developer community.",
    image: "https://i.postimg.cc/x8crKQCR/Hack-X.png",
    category: "HACKATHON",
    year: "2026",
    icon: Code2,
    link: "#"
  },
  {
    id: "SU-HACKATHON-2026",
    title: "SU_HACKATHON - Finalist",
    issuer: "Sangam University & DST",
    description: "Participating under team 'codepulse', focused on Innovation in Textile City Bhilwara.",
    image: "https://i.postimg.cc/7hpR0Tjq/SU-Hackathon.jpg",
    category: "HACKATHON",
    year: "2026",
    icon: Code2,
    link: "#"
  },
  {
    id: "DEV-HEAT-2026",
    title: "Dev Heat Hackathon (Spring Fiesta)",
    issuer: "Indian Institute of Information Technology (IIIT), Surat",
    description: "Participated in the Dev Heat Hackathon, showcasing consistency in attending high-level engineering competitions.",
    image: "https://i.postimg.cc/grFMnb6w/Screenshot-2026-03-27-212428.png",
    category: "HACKATHON",
    year: "2026",
    icon: Globe,
    link: "#"
  },
  {
    id: "APPIAN-AI-2026",
    title: "Appian AI Application Challenge",
    issuer: "IIT Madras (Shaastra 2026)",
    description: "Issued via Unstop, confirms participation in one of India's most prestigious technical festivals.",
    image: "https://i.postimg.cc/WbvCN0mw/IIT-madras.png",
    category: "AI / LOW-CODE",
    year: "2026",
    icon: TerminalSquare,
    link: "#"
  },
  {
    id: "NIELIT-PYTHON-2024",
    title: "Python Programming Internship",
    issuer: "NIELIT, Daman (PM Shri Scheme)",
    description: "Successful completion of a one-week internship course in Python Programming representing an official government-recognized start.",
    image: "https://i.postimg.cc/SKkxcXpt/Screenshot-2026-03-28-010855.png",
    category: "INTERNSHIP",
    year: "2024",
    icon: Code2,
    link: "#"
  },
  {
    id: "STEM-BOOTCAMP-2025",
    title: "Bootcamp for STEM Students - Winner",
    issuer: "GUJCOST & NFSU",
    description: "National Level Winner. Reflects early interest in forensic science and technology-driven research.",
    image: "https://i.postimg.cc/htbS4S7X/STEM-Quiz.jpg",
    category: "BOOTCAMP",
    year: "2025",
    icon: Shield,
    link: "#"
  },
  {
    id: "NASSCOM-SKILL-2024",
    title: "Domestic Data Entry Operator",
    issuer: "IT-ITeS Sector Skill Council (NASSCOM)",
    description: "Earned a B Grade after 450 hours of training proving foundational proficiency in data management.",
    image: "https://i.postimg.cc/MH8PG8Bk/skill-india.jpg",
    category: "TRAINING",
    year: "2024",
    icon: BookOpen,
    link: "#"
  },
  {
    id: "NERDS-AI-2026",
    title: "Nerds AI Quest (Valentine Edition)",
    issuer: "Nerds Room",
    description: "Acknowledges participation in this specialized AI-themed challenge testing ML and AI skills.",
    image: "https://i.postimg.cc/R06XQ0QK/Screenshot-2026-03-27-212454.png",
    category: "AI CHALLENGE",
    year: "2026",
    icon: TerminalSquare,
    link: "#"
  }
];

const Certificates = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const categories = ["ALL", ...Array.from(new Set(certificates.map(c => c.category)))];

  const filteredCerts = activeFilter === "ALL"
    ? certificates
    : certificates.filter(c => c.category === activeFilter);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(['.cert-reveal', '.cert-card-new'], { opacity: 1 });
      return;
    }

    // Header reveal
    gsap.fromTo('.cert-reveal',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    );

    // Filter buttons stagger
    gsap.fromTo('.cert-filter-btn',
      { opacity: 0, y: 15, scale: 0.9 },
      {
        opacity: 1, y: 0, scale: 1, stagger: 0.06, duration: 0.5, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.cert-filters', start: 'top 88%' }
      }
    );

  }, { scope: sectionRef });

  // Re-animate cards when filter changes
  useEffect(() => {
    const cards = document.querySelectorAll('.cert-card-new');
    gsap.fromTo(cards,
      { opacity: 0, y: 40, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.07,
        duration: 0.6,
        ease: 'power3.out',
      }
    );
  }, [activeFilter]);

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedCert]);

  const getColors = (category: string) => categoryColors[category] || categoryColors.HACKATHON;

  return (
    <section id="certificates" className="py-28 md:py-36 relative bg-[#050505]" ref={sectionRef}>
      {/* Ambient background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-amber-500/[0.03] blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-violet-500/[0.03] blur-[130px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="cert-reveal w-5 h-5 text-amber-400 opacity-0" />
            <p className="cert-reveal opacity-0 text-amber-400 font-mono text-sm tracking-widest uppercase">Professional Milestones</p>
          </div>
          <h2 className="cert-reveal opacity-0 text-4xl md:text-6xl font-bold text-white tracking-tight mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
            Licenses & <span className="text-white/40 font-light">Certifications</span>
          </h2>
          <p className="cert-reveal opacity-0 text-white/50 text-lg max-w-2xl">
            A curated collection of achievements, hackathon wins, and professional credentials earned throughout my journey.
          </p>
        </div>

        {/* Category Filters */}
        <div className="cert-filters flex flex-wrap gap-2 mb-12">
          {categories.map(cat => {
            const isActive = activeFilter === cat;
            const colors = cat === "ALL" ? { text: "text-white", bg: "bg-white/10", border: "border-white/20" } : getColors(cat);
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`cert-filter-btn px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                  isActive
                    ? `${colors.bg} ${colors.border} ${colors.text} shadow-lg`
                    : "bg-white/[0.02] border-white/8 text-white/40 hover:bg-white/[0.05] hover:text-white/70 hover:border-white/15"
                }`}
              >
                {cat}
                {isActive && <span className="ml-2 text-[9px] opacity-60">({cat === "ALL" ? certificates.length : certificates.filter(c => c.category === cat).length})</span>}
              </button>
            );
          })}
        </div>

        {/* Certificate Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => {
            const colors = getColors(cert.category);
            return (
              <div
                key={cert.id}
                className={`cert-card-new group relative rounded-[1.5rem] overflow-hidden transition-all duration-500 flex flex-col hover:-translate-y-3 cursor-pointer bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-white/20 ${colors.glow} hover:shadow-xl`}
                onClick={() => setSelectedCert(cert)}
              >
                {/* Top accent line */}
                <div className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent ${colors.gradFrom} to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Image Container */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-black/50">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover sm:object-contain object-center transition-all duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-20`} />

                  {/* Category pill floating */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${colors.bg} ${colors.text} border ${colors.border} backdrop-blur-sm`}>
                    {cert.category}
                  </div>

                  {/* Hover view overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] z-10">
                    <div className={`px-6 py-2.5 rounded-full ${colors.bg} border ${colors.border} ${colors.text} font-bold text-xs uppercase tracking-widest flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500`}>
                      <ExternalLink size={14} /> View Detail
                    </div>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col flex-grow relative z-20">
                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-11 h-11 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                      <cert.icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <div className="min-w-0">
                      <h3 className={`font-bold text-white text-base leading-snug group-hover:${colors.text} transition-colors line-clamp-2 mb-1`}>{cert.title}</h3>
                      <p className="text-sm text-white/35 font-medium">{cert.issuer}</p>
                    </div>
                  </div>

                  <div className="mt-auto pt-5 flex items-center justify-between border-t border-white/5">
                    <span className="text-sm text-white/30 font-mono tracking-wider">{cert.year}</span>
                    <div className="flex items-center gap-1.5">
                      <BadgeCheck className={`w-3.5 h-3.5 ${colors.text} opacity-60`} />
                      <span className={`text-[10px] font-bold ${colors.text} opacity-60 uppercase tracking-wider`}>Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal / Lightbox */}
      {selectedCert && (() => {
        const colors = getColors(selectedCert.category);
        return (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 animate-in fade-in duration-300">
            <div
              className="absolute inset-0 bg-black/85 backdrop-blur-xl"
              onClick={() => setSelectedCert(null)}
            ></div>

            <div className={`relative bg-gradient-to-b from-white/[0.05] to-[#0a0a0a] border border-white/15 rounded-[2rem] w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl ${colors.glow}`}>
              {/* Top accent */}
              <div className={`absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent ${colors.gradFrom} to-transparent`} />

              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/10 shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className={`w-4 h-4 ${colors.text}`} />
                    <p className={`${colors.text} font-mono text-xs font-bold tracking-widest uppercase`}>Credential Detail</p>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{selectedCert.title}</h3>
                  <p className="text-white/40 text-sm mt-1">Issued by {selectedCert.issuer}</p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center text-white transition-all duration-300 shrink-0 hover:rotate-90"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Scrollable Content */}
              <div className="p-6 md:p-8 overflow-y-auto flex-grow">

                {/* Verification Block */}
                <div className={`bg-white/[0.03] border ${colors.border} p-5 rounded-2xl flex flex-wrap gap-4 items-center justify-between mb-8`}>
                  <div>
                    <p className="text-xs text-white/30 font-mono uppercase tracking-wider mb-1">Verification ID</p>
                    <p className={`${colors.text} font-bold tracking-wider text-lg`}>{selectedCert.id}</p>
                  </div>
                  <div className={`flex items-center gap-2 ${colors.bg} ${colors.text} px-5 py-2.5 rounded-full text-sm font-bold border ${colors.border}`}>
                    <BadgeCheck size={18} />
                    <span>VERIFIED</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/60 mb-8 leading-relaxed text-lg">
                  {selectedCert.description}
                </p>

                {/* Certificate Image Full */}
                <div className={`rounded-2xl overflow-hidden border border-white/10 bg-black/50 aspect-auto md:aspect-video flex items-center justify-center ${colors.glow} shadow-lg`}>
                  <img
                    src={selectedCert.image}
                    alt={`${selectedCert.title} - Parth Karetiya Portfolio`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-6 md:p-8 border-t border-white/10 flex items-center justify-between shrink-0 bg-[#080808]">
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${colors.bg} ${colors.text} border ${colors.border}`}>
                    {selectedCert.category}
                  </span>
                  <span className="text-white/30 font-mono text-sm">{selectedCert.year}</span>
                </div>
                <a
                  href={selectedCert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${colors.text === 'text-amber-400' ? 'bg-amber-500 hover:bg-amber-400' : colors.text === 'text-cyan-400' ? 'bg-cyan-500 hover:bg-cyan-400' : colors.text === 'text-violet-400' ? 'bg-violet-500 hover:bg-violet-400' : colors.text === 'text-emerald-400' ? 'bg-emerald-500 hover:bg-emerald-400' : colors.text === 'text-rose-400' ? 'bg-rose-500 hover:bg-rose-400' : 'bg-sky-500 hover:bg-sky-400'} text-black font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-lg text-sm`}
                >
                  VIEW FULL <ExternalLink size={16} />
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
