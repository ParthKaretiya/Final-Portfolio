import { useRef, useState, useEffect } from "react";
import { Award, Shield, Globe, Code2, BookOpen, ExternalLink, X, BadgeCheck, TerminalSquare } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Spotlight from "./animations/Spotlight";

gsap.registerPlugin(ScrollTrigger);

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
    title: "Hack.X at HackTheSpring ’26",
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

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(['.cert-reveal', '.cert-card-new'], { opacity: 1 });
      return;
    }

    gsap.fromTo('.cert-reveal',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    );

    gsap.utils.toArray('.cert-card-new').forEach((card: any) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            end: 'top 65%',
            scrub: 0.5
          }
        }
      );
    });
  }, { scope: sectionRef });

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedCert]);

  return (
    <section id="certificates" className="py-28 relative bg-[#050505]" ref={sectionRef}>
      <Spotlight />
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="mb-16">
          <p className="cert-reveal opacity-0 text-yellow-500 font-mono text-sm tracking-widest uppercase mb-3">Professional Milestones</p>
          <h2 className="cert-reveal opacity-0 text-4xl md:text-5xl font-bold text-white tracking-tight">Licenses & Certifications</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div key={cert.id} className="cert-card-new opacity-0 group relative bg-[#0f0f0f] rounded-2xl overflow-hidden border border-white/5 hover:border-yellow-500/30 transition-all duration-500 flex flex-col shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-2">

              {/* Image Container */}
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-black/50">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover sm:object-contain object-center transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm z-10">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-6 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl"
                  >
                    View <ExternalLink size={16} />
                  </button>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6 flex flex-col flex-grow relative z-20 bg-gradient-to-t from-[#0a0a0a] to-[#0f0f0f]">
                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0">
                    <cert.icon className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg leading-snug group-hover:text-yellow-400 transition-colors line-clamp-2">{cert.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{cert.issuer}</p>
                  </div>
                </div>

                <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
                  <span className="text-sm text-gray-500 font-mono">{cert.year}</span>
                  <span className="text-xs font-semibold text-yellow-500/80 uppercase tracking-wider bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                    {cert.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Lightbox */}
      {selectedCert && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          ></div>

          <div className="relative bg-[#0f0f0f] border border-yellow-500/20 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl shadow-yellow-500/5 slide-in-from-bottom-4 animate-in duration-500">

            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
              <div>
                <p className="text-yellow-500 font-mono text-xs font-bold tracking-widest uppercase mb-1">Deep Detail</p>
                <h3 className="text-2xl font-bold text-white">{selectedCert.title}</h3>
                <p className="text-gray-400 text-sm mt-1">Issued by {selectedCert.issuer}</p>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 overflow-y-auto flex-grow">

              {/* Verification Block */}
              <div className="bg-[#141414] border border-yellow-500/30 p-4 rounded-xl flex flex-wrap gap-4 items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">Verification ID</p>
                  <p className="text-yellow-500 font-bold tracking-wider">{selectedCert.id}</p>
                </div>
                <div className="flex items-center gap-2 bg-yellow-500/10 text-yellow-500 px-4 py-2 rounded-full text-sm font-bold border border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
                  <BadgeCheck size={18} />
                  <span>VERIFIED</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                {selectedCert.description}
              </p>

              {/* Certificate Image Full */}
              <div className="rounded-xl overflow-hidden border border-white/10 bg-black/50 aspect-auto md:aspect-video flex items-center justify-center">
                <img
                  src={selectedCert.image}
                  alt={`${selectedCert.title} - Parth Karetiya Portfolio`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-white/10 flex justify-end shrink-0 bg-[#0a0a0a]">
              <a
                href={selectedCert.image}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-yellow-500/20"
              >
                CREDENTIAL <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates;
