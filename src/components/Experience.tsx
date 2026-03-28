import { useRef, useState } from "react";
import { Trophy, Building2, ExternalLink, Code2, Zap } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import pulseGuardImg from '../assets/project-pulseguard.jpg';
import expenseManagerImg from '../assets/expense-manager.png';
import MatrixRain from "./animations/MatrixRain";

gsap.registerPlugin(ScrollTrigger);

interface HackathonItem {
  name: string;
  organization: string;
  achievement: string;
  techStack: string[];
  description: React.ReactNode;
  frontImage: string;
  link: string;
}

const hackathons: HackathonItem[] = [
  {
    name: "Electrosphere 2026",
    organization: "Swaminarayan University",
    achievement: "2nd Place Winner",
    techStack: ["React", "Node.js", "REST APIs", "Data Analytics"],
    description: (
      <ul className="list-disc pl-5 space-y-1.5 text-sm lg:text-base">
        <li>Designed <strong>Threat Lens</strong> to gracefully detect and analyze security threats and data patterns.</li>
        <li>Used modern web technologies and frameworks to process and visualize data intelligently.</li>
        <li>Implemented real-time tracking, active analytics, alerts, and robust API integration.</li>
        <li>Improved decision-making capabilities through clear data insights.</li>
      </ul>
    ),
    frontImage: "https://i.postimg.cc/hv3BKyGV/Whats-App-Image-2026-01-11-at-1-41-11-PM.jpg",
    link: "https://threatlens-topaz.vercel.app/"
  },
  {
    name: "HackX Hackathon",
    organization: "GEC Gandhinagar",
    achievement: "Finalist, secured 4th Rank",
    techStack: ["React", "Node.js", "MongoDB", "Express"],
    description: (
      <ul className="list-disc pl-5 space-y-1.5 text-sm lg:text-base">
        <li>Developed <strong>Pulse Guard</strong>, a real-time health and security monitoring system.</li>
        <li>Built using React, Node.js, and MongoDB.</li>
        <li>Implemented features like secure authentication, emergency alerts, customizable dashboard and RESTful APIs.</li>
        <li>Focused on performance, responsiveness, and a user-friendly UI.</li>
      </ul>
    ),
    frontImage: "https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/mobile_banner/6978a502e06af_hackx.png?d=700x400",
    link: "https://github.com/ParthKaretiya/HackX"
  },
  {
    name: "Sangam University Hackathon",
    organization: "Sangam University",
    achievement: "Finalist",
    techStack: ["React", "Firebase", "Tailwind CSS", "Node.js"],
    description: (
      <ul className="list-disc pl-5 space-y-1.5 text-sm lg:text-base">
        <li>Developed <strong>Cerse</strong>, a dedicated platform/tool for real-time facility logistics.</li>
        <li>Built with a robust full-stack environment.</li>
        <li>Added features like dynamic user interactions, secure backend logic, and robust database integration.</li>
        <li>Ensured a highly scalable and seamlessly responsive design.</li>
      </ul>
    ),
    frontImage: "https://i.postimg.cc/kMSzGgpK/2W3A2038.jpg",
    link: "https://cers-plus.web.app/"
  },
  {
    name: "Odoo x IIT Gandhinagar Hackathon",
    organization: "IIT Gandhinagar",
    achievement: "Participant",
    techStack: ["Python", "Odoo", "PostgreSQL", "XML"],
    description: (
      <ul className="list-disc pl-5 space-y-1.5 text-sm lg:text-base">
        <li>Built an advanced <strong>Expense Manager</strong> web application for comprehensive personal and team financial tracking.</li>
        <li>Developed a feature-rich dashboard with OCR-powered receipt scanning, real-time expense categorization, and dynamic reporting.</li>
        <li>Integrated configurable approval workflows and rule-based automation for enterprise-grade expense management.</li>
        <li>Focused on delivering a premium, intuitive UI with seamless data visualization and a mobile-first responsive design.</li>
      </ul>
    ),
    frontImage: expenseManagerImg,
    link: "#"
  },
  {
    name: "DevHeat Hackathon",
    organization: "IIIT Surat",
    achievement: "Participant",
    techStack: ["React", "Express", "Socket.IO", "MongoDB"],
    description: (
      <ul className="list-disc pl-5 space-y-1.5 text-sm lg:text-base">
        <li>Collaborated to build an innovative web application within an intense 36-hour timeframe.</li>
        <li>Integrated live data streams and robust responsive design patterns.</li>
        <li>Overcame complex algorithmic challenges alongside top peers.</li>
        <li>Successfully handled pressure and rapid development cycles.</li>
      </ul>
    ),
    frontImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    name: "IIT Madras Appian AI Challenge",
    organization: "IIT Madras",
    achievement: "Participant",
    techStack: ["AI/ML", "Python", "Appian", "REST APIs"],
    description: (
      <ul className="list-disc pl-5 space-y-1.5 text-sm lg:text-base">
        <li>Participated in a prestigious AI-focused hackathon hosted by <strong>IIT Madras</strong> in collaboration with Appian.</li>
        <li>Developed intelligent automation workflows leveraging AI/ML models for real-world business process optimization.</li>
        <li>Designed and integrated predictive analytics modules with low-code Appian platform capabilities.</li>
        <li>Gained hands-on experience with enterprise-grade AI tooling, API orchestration, and rapid prototyping under competition pressure.</li>
      </ul>
    ),
    frontImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    link: "#"
  }
];

/* ─────────────────────────── component ─────────────────────────── */
const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mm = gsap.matchMedia();

    /* ═══ DESKTOP (lg+): pinned scroll-driven experience ═══ */
    mm.add("(min-width: 1024px)", () => {
      // Title reveal
      gsap.fromTo('.exp-reveal-title',
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );

      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${100 * hackathons.length}%`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              Math.floor(self.progress * hackathons.length),
              hackathons.length - 1
            );
            setActiveIndex(idx);
          }
        }
      });

      // Initial states
      hackathons.forEach((_, i) => {
        if (i > 0) {
          gsap.set(`.hack-text-${i}`, { autoAlpha: 0, y: 50, pointerEvents: 'none' });
          gsap.set(`.hack-img-${i}`, { autoAlpha: 0, scale: 1.05, pointerEvents: 'none' });
        } else {
          gsap.set(`.hack-text-${i}`, { autoAlpha: 1, y: 0, pointerEvents: 'auto' });
          gsap.set(`.hack-img-${i}`, { autoAlpha: 1, scale: 1, pointerEvents: 'auto' });
        }
      });

      // Transition sequence
      hackathons.forEach((_, i) => {
        if (i > 0) {
          tl.to(`.hack-text-${i - 1}`, { autoAlpha: 0, y: -40, pointerEvents: 'none', duration: 0.5, ease: 'power2.in' }, `step${i}`)
            .to(`.hack-img-${i - 1}`, { autoAlpha: 0, scale: 0.95, pointerEvents: 'none', duration: 0.5, ease: 'power2.in' }, `step${i}`)
            .to(`.hack-text-${i}`, { autoAlpha: 1, y: 0, pointerEvents: 'auto', duration: 0.5, ease: 'power2.out', immediateRender: false }, `step${i}+=0.3`)
            .to(`.hack-img-${i}`, { autoAlpha: 1, scale: 1, pointerEvents: 'auto', duration: 0.5, ease: 'power2.out', immediateRender: false }, `step${i}+=0.3`)
            .to({}, { duration: 0.3 });
        }
      });
    });

    /* ═══ MOBILE (<lg): stacked cards, no pin ═══ */
    mm.add("(max-width: 1023px)", () => {
      // Section header reveal
      gsap.fromTo('.m-reveal-title',
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' }
        }
      );

      if (prefersReducedMotion) return;

      // Each card fades in as it enters viewport
      const cards = sectionRef.current?.querySelectorAll('.hack-mobile-card');
      if (cards && cards.length > 0) {
        cards.forEach((card) => {
          gsap.fromTo(card,
            { autoAlpha: 0, y: 50 },
            {
              autoAlpha: 1, y: 0, duration: 0.75, ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
              }
            }
          );
        });
      }
    });

  }, { scope: sectionRef });

  /* ──────────────── JSX ──────────────── */
  return (
    <section
      id="experience"
      className="bg-[#050505] relative w-full overflow-hidden"
      ref={sectionRef}
    >
      <MatrixRain />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      {/* ═══ DESKTOP LAYOUT (lg+) — pinned scroll ═══ */}
      <div className="hidden lg:flex h-screen flex-col justify-center container mx-auto px-6 relative z-10 py-24">

        {/* Header */}
        <div className="relative mb-10 z-20 flex flex-row items-end justify-between gap-4">
          <div>
            <p className="exp-reveal-title text-primary font-mono text-sm tracking-widest uppercase mb-3 invisible">Experience</p>
            <h2 className="exp-reveal-title text-5xl font-bold text-foreground tracking-tight mb-4 leading-tight invisible">Hackathon Journey</h2>
            <p className="exp-reveal-title text-muted-foreground text-base leading-relaxed max-w-xl invisible">
              Battle-tested under pressure in competitive hackathons. Scroll to explore my projects and achievements.
            </p>
          </div>
          <div className="exp-reveal-title flex items-center gap-3 invisible shrink-0">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono text-white/80">
                <span className="text-primary font-bold">{activeIndex + 1}</span>
                <span className="text-white/40 mx-1">/</span>
                <span>{hackathons.length}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="exp-reveal-title relative mb-8 z-20 invisible">
          <div className="flex gap-2">
            {hackathons.map((_, i) => (
              <div
                key={`bar-${i}`}
                className={`h-1 rounded-full flex-1 transition-all duration-500 ease-out ${i <= activeIndex ? 'bg-primary shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'bg-white/10'}`}
              />
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-row h-full w-full items-center flex-1 max-h-[60vh]">

          {/* Left: Text Items */}
          <div className="w-1/2 relative h-full flex items-center pr-12 z-30">
            {hackathons.map((hack, i) => (
              <div key={`text-${i}`} className={`hack-text-${i} absolute inset-0 flex flex-col justify-center space-y-5 w-[95%] invisible`}>
                <div>
                  <h3 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-3">{hack.name}</h3>
                  <div className="h-1 w-16 bg-primary/60 rounded-full mb-5 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                  <span className="flex items-center gap-2 text-xs lg:text-sm font-mono px-4 py-2 rounded-xl bg-white/5 text-white/80 border border-white/10 backdrop-blur-sm">
                    <Building2 className="w-4 h-4 text-primary" />{hack.organization}
                  </span>
                  <span className="flex items-center gap-2 text-xs lg:text-sm font-mono px-4 py-2 rounded-xl bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
                    <Trophy className="w-4 h-4" />{hack.achievement}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {hack.techStack.map((tech, ti) => (
                    <span key={ti} className="flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded-md bg-primary/5 text-primary/70 border border-primary/10">
                      <Code2 className="w-3 h-3" />{tech}
                    </span>
                  ))}
                </div>
                <div className="text-white/60 text-sm lg:text-base pt-2">{hack.description}</div>
                {hack.link !== "#" && (
                  <div className="pt-2">
                    <a href={hack.link} target="_blank" rel="noopener noreferrer"
                      className="inline-flex px-6 py-3 bg-primary/10 text-primary border border-primary/30 rounded-full text-sm font-medium items-center gap-2 hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] pointer-events-auto">
                      Explore Project <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: Image Cards */}
          <div className="w-1/2 relative h-[85%] z-20 flex items-center justify-center pointer-events-none" style={{ perspective: '1000px' }}>
            {hackathons.map((hack, i) => (
              <div key={`img-${i}`} className={`hack-img-${i} absolute inset-0 w-full h-full group invisible`} style={{ perspective: '1000px' }}>
                <div
                  className="relative w-full h-full shadow-2xl rounded-2xl cursor-default"
                  style={{ willChange: 'transform' }}
                >
                  <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent mix-blend-overlay z-10 pointer-events-none" />
                    <img src={hack.frontImage} alt={`${hack.name} Front`} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl z-20 pointer-events-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ MOBILE LAYOUT (<lg) — stacked scrollable cards ═══ */}
      <div className="lg:hidden relative z-10 px-4 sm:px-6 pt-16 pb-20">

        {/* Mobile Header */}
        <div className="mb-10">
          <p className="m-reveal-title text-primary font-mono text-xs sm:text-sm tracking-widest uppercase mb-2 invisible">Experience</p>
          <h2 className="m-reveal-title text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-3 leading-tight invisible">Hackathon Journey</h2>
          <p className="m-reveal-title text-muted-foreground text-sm sm:text-base leading-relaxed invisible">
            Battle-tested under pressure in competitive hackathons.
          </p>
          {/* Compact progress dots */}
          <div className="m-reveal-title flex gap-1.5 mt-5 invisible">
            {hackathons.map((_, i) => (
              <div key={i} className="w-6 h-1 rounded-full bg-primary/40" />
            ))}
          </div>
        </div>

        {/* Stacked Cards */}
        <div className="space-y-6 sm:space-y-8">
          {hackathons.map((hack, i) => (
            <div
              key={`mobile-${i}`}
              className="hack-mobile-card invisible bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm"
            >
              {/* Card Image - Flip structure removed */}
              <div className="relative w-full h-44 sm:h-52">
                <div className="relative w-full h-full">
                  {/* Front Side Only */}
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={hack.frontImage}
                      alt={hack.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent mix-blend-overlay pointer-events-none" />
                    
                    {/* Achievement badge */}
                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono px-2.5 py-1 rounded-lg bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm">
                        <Trophy className="w-3 h-3" />{hack.achievement}
                      </span>
                    </div>
                    {/* Hackathon number */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="text-[10px] sm:text-xs font-mono px-2 py-1 rounded-md bg-black/50 text-white/40 backdrop-blur-sm">
                        {String(i + 1).padStart(2, '0')} / {String(hackathons.length).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-5 space-y-3">
                {/* Title + org */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">{hack.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1 text-xs font-mono text-white/40">
                    <Building2 className="w-3 h-3 text-primary" />{hack.organization}
                  </div>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {hack.techStack.map((tech, ti) => (
                    <span key={ti} className="flex items-center gap-1 text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded-md bg-primary/5 text-primary/70 border border-primary/10">
                      <Code2 className="w-2.5 h-2.5" />{tech}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <div className="text-white/55 text-xs sm:text-sm leading-relaxed">
                  {hack.description}
                </div>

                {/* Link */}
                {hack.link !== "#" && (
                  <a
                    href={hack.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex mt-1 px-4 py-2 sm:px-5 sm:py-2.5 bg-primary/10 text-primary border border-primary/30 rounded-full text-xs sm:text-sm font-medium items-center gap-2 hover:bg-primary hover:text-black transition-all duration-300"
                  >
                    Explore Project <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Experience;
