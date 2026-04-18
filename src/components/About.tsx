import { useRef } from "react";
import { MapPin, Code2, GraduationCap, Zap, BookOpen, Award, TrendingUp, Calendar } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImg from "@/assets/profile-picture.png";

gsap.registerPlugin(ScrollTrigger);

const badges = [
  { label: "Gujarat, India", icon: MapPin, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  { label: "Full-Stack Developer", icon: Code2, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
  { label: "B.E. Computer Engineering", icon: GraduationCap, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
];

const education = [
  {
    degree: "Bachelor of Engineering (B.E.)",
    institution: "Swaminarayan University",
    grade: "9.67", gradeLabel: "CGPA",
    status: "Currently Pursuing", year: "2023 – Present",
    description: "Specializing in Computer Engineering with focus on full-stack development, data structures, and AI/ML. Actively participating in hackathons and building production-grade projects.",
    icon: GraduationCap,
    accentColor: "text-cyan-400", accentBg: "bg-cyan-500/10", accentBorder: "border-cyan-500/25",
    statusColor: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  },
  {
    degree: "12th Grade (HSC)",
    institution: "JNV, Amreli",
    grade: "82%", gradeLabel: "Percentage",
    status: "Completed", year: "2023",
    description: "Focused on Mathematics, Physics, and Computer Science. Developed strong analytical and problem-solving foundations at this prestigious national-level residential institution.",
    icon: BookOpen,
    accentColor: "text-violet-400", accentBg: "bg-violet-500/10", accentBorder: "border-violet-500/25",
    statusColor: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  },
  {
    degree: "10th Grade (SSC)",
    institution: "JNV, Amreli",
    grade: "86.5%", gradeLabel: "Percentage",
    status: "Completed", year: "2021",
    description: "Excelled in Science and Mathematics at a nationally-selected JNV institution. Built early interest in technology and programming, earning merit recognition among top performers.",
    icon: Award,
    accentColor: "text-amber-400", accentBg: "bg-amber-500/10", accentBorder: "border-amber-500/25",
    statusColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(['.about-reveal', '.about-badge', '.about-img-wrap', '.edu-card', '.edu-timeline-line'], { opacity: 1, scaleY: 1 });
      return;
    }

    gsap.fromTo('.about-reveal',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    );

    gsap.fromTo('.about-badge',
      { opacity: 0, scale: 0.8, y: 15 },
      {
        opacity: 1, scale: 1, y: 0, stagger: 0.06, duration: 0.5, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.about-badges-wrap', start: 'top 88%' }
      }
    );

    gsap.fromTo('.about-img-wrap',
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-img-wrap', start: 'top 88%' }
      }
    );

    // Education Timeline Animations
    gsap.fromTo('.edu-timeline-line', { scaleY: 0 }, {
      scaleY: 1, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.edu-timeline', start: 'top 80%' }
    });
    
    gsap.utils.toArray('.edu-card').forEach((card: any, i: number) => {
      gsap.fromTo(card, { opacity: 0, x: 30 }, {
        opacity: 1, x: 0, duration: 0.7, delay: i * 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%' }
      });
    });

  }, { scope: sectionRef });

  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden bg-[#020202]" ref={sectionRef}>
      {/* Background ambient glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-cyan-500/[0.04] blur-[150px] rounded-full -translate-x-1/3" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-violet-500/[0.03] blur-[150px] rounded-full translate-x-1/4" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: About Me */}
          <div className="lg:col-span-6 space-y-8">
            <div className="mb-6">
              <p className="about-reveal text-cyan-400 font-mono text-sm tracking-widest uppercase mb-2">Who I Am</p>
              <h2 className="about-reveal text-4xl md:text-5xl font-bold text-white tracking-tight" style={{ fontFamily: "'Cinzel', serif" }}>
                About <span className="text-white/40 font-light">Me</span>
              </h2>
            </div>

            <div className="about-reveal relative bg-white/[0.02] border border-white/10 p-6 md:p-8 rounded-[1.5rem] hover:border-white/20 transition-all duration-500 shadow-2xl">
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 tracking-tight flex items-center gap-1">
                I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-300 text-3xl md:text-5xl px-2 pt-2 pb-1 leading-none" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", filter: "drop-shadow(0 0 8px rgba(245,158,11,0.4))" }}>Parth Karetiya</span>
              </h3>
              <div className="space-y-5">
                <p className="text-white/80 text-base leading-relaxed font-medium">
                  A passionate <span className="text-cyan-400 font-bold">Full-Stack Engineer</span> and Computer Science student from Gujarat, India. I specialize in <span className="text-white font-bold">React, Node.js, MongoDB, and TypeScript</span> — building high-performance, scalable web applications that seamlessly bridge the gap between complex backend architectures and intuitive, pixel-perfect user interfaces.
                </p>
                <p className="text-white/60 text-sm md:text-base leading-relaxed">
                  My engineering journey is driven by an intense curiosity to solve real-world problems. I've architected real-time healthcare coordination platforms like <span className="text-amber-400 font-medium">PulseGuard</span>, managing hundreds of concurrent connections with sub-100ms latency, and developed AI-powered cybersecurity tools such as <span className="text-emerald-400 font-medium">ThreatLens</span>, which won accolades at national-level hackathons.
                </p>
                <p className="text-white/60 text-sm md:text-base leading-relaxed">
                  Beyond just writing clean code, I am deeply invested in system design, robust CI/CD pipelines, and crafting digital experiences that feel both native and cinematic. I thrive in high-pressure hackathon environments, collaborating with brilliant minds to engineer solutions that ship, scale, and make a tangible impact.
                </p>
              </div>
            </div>

            <div className="about-badges-wrap flex flex-wrap gap-3 pt-2">
              {badges.map((badge) => (
                <div
                  key={badge.label}
                  className={`about-badge flex items-center gap-2 px-4 py-2 rounded-full ${badge.bg} border ${badge.border} hover:scale-105 transition-transform duration-300 cursor-default`}
                >
                  <badge.icon className={`w-4 h-4 ${badge.color}`} />
                  <span className="text-xs font-bold text-white/70 uppercase tracking-widest">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Education Timeline */}
          <div className="lg:col-span-6 space-y-8">
            <div className="mb-6">
              <p className="about-reveal text-violet-400 font-mono text-sm tracking-widest uppercase mb-2">Academic Background</p>
              <h2 className="about-reveal text-4xl md:text-5xl font-bold text-white tracking-tight" style={{ fontFamily: "'Cinzel', serif" }}>
                Education <span className="text-white/40 font-light">Timeline</span>
              </h2>
            </div>

            <div className="edu-timeline relative">
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px origin-top">
                <div className="edu-timeline-line w-full h-full bg-gradient-to-b from-cyan-500/40 via-violet-500/30 to-amber-500/20" />
              </div>
              
              <div className="space-y-6">
                {education.map((item) => (
                  <div key={item.degree} className="edu-card relative pl-16 md:pl-20 group">
                    <div className="absolute left-3.5 md:left-5.5 top-6 z-10">
                      <div className={`w-5 h-5 rounded-full ${item.accentBg} border-2 ${item.accentBorder} flex items-center justify-center group-hover:scale-125 transition-transform duration-500 bg-[#020202]`}>
                        <div className={`w-2 h-2 rounded-full ${item.accentColor === 'text-cyan-400' ? 'bg-cyan-400' : item.accentColor === 'text-violet-400' ? 'bg-violet-400' : 'bg-amber-400'}`} />
                      </div>
                    </div>
                    
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.05] hover:border-white/15 transition-all duration-500">
                      <div className="flex items-start gap-4 mb-3">
                        <div className={`w-10 h-10 rounded-lg ${item.accentBg} border ${item.accentBorder} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                          <item.icon className={`w-5 h-5 ${item.accentColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-white text-base md:text-lg mb-0.5">{item.degree}</h3>
                          <p className="text-white/40 text-sm">{item.institution}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <div className="flex items-center gap-1.5">
                            <TrendingUp className={`w-3.5 h-3.5 ${item.accentColor} opacity-80`} />
                            <span className={`text-base md:text-lg font-black ${item.accentColor}`}>{item.grade}</span>
                          </div>
                          <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">{item.gradeLabel}</p>
                        </div>
                      </div>
                      
                      <p className="text-white/45 text-sm leading-relaxed mb-4">{item.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${item.statusColor}`}>
                          {item.status}
                        </span>
                        <div className="flex items-center gap-1.5 text-white/40 text-xs">
                          <Calendar className="w-3.5 h-3.5" />
                          <span className="font-mono font-medium">{item.year}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
