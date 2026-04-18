import { useRef } from "react";
import { GraduationCap, Calendar, Award, TrendingUp, BookOpen } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    institution: "Jawahar Navodaya Vidyalaya, Amreli",
    grade: "82%", gradeLabel: "Percentage",
    status: "Completed", year: "2023",
    description: "Focused on Mathematics, Physics, and Computer Science. Developed strong analytical and problem-solving foundations at this prestigious national-level residential institution.",
    icon: BookOpen,
    accentColor: "text-violet-400", accentBg: "bg-violet-500/10", accentBorder: "border-violet-500/25",
    statusColor: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  },
  {
    degree: "10th Grade (SSC)",
    institution: "Jawahar Navodaya Vidyalaya, Amreli",
    grade: "86.5%", gradeLabel: "Percentage",
    status: "Completed", year: "2021",
    description: "Excelled in Science and Mathematics at a nationally-selected JNV institution. Built early interest in technology and programming, earning merit recognition among top performers.",
    icon: Award,
    accentColor: "text-amber-400", accentBg: "bg-amber-500/10", accentBorder: "border-amber-500/25",
    statusColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
];

const Education = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(['.edu-reveal', '.edu-card', '.edu-timeline-line'], { opacity: 1, scaleY: 1 });
      return;
    }
    gsap.fromTo('.edu-reveal', { opacity: 0, y: 25 }, {
      opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
    });
    gsap.fromTo('.edu-timeline-line', { scaleY: 0 }, {
      scaleY: 1, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.edu-timeline', start: 'top 80%' }
    });
    gsap.utils.toArray('.edu-card').forEach((card: any, i: number) => {
      gsap.fromTo(card, { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 0.7, delay: i * 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%' }
      });
    });
  }, { scope: sectionRef });

  return (
    <section id="education" className="py-20 md:py-24 relative overflow-hidden bg-[#050505]" ref={sectionRef}>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-violet-500/[0.03] blur-[120px] rounded-full translate-x-1/3 -translate-y-1/2" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-10">
          <p className="edu-reveal text-violet-400 font-mono text-sm tracking-widest uppercase mb-2">Academic Background</p>
          <h2 className="edu-reveal text-4xl md:text-5xl font-bold text-white tracking-tight mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
            Education <span className="text-white/40 font-light">Timeline</span>
          </h2>
          <p className="edu-reveal text-white/50 text-base leading-relaxed max-w-2xl">
            My academic journey — from excelling in national-level institutions to pursuing engineering excellence.
          </p>
        </div>

        {/* Stats row */}
        <div className="edu-reveal grid grid-cols-3 gap-3 md:gap-5 mb-12 max-w-xl">
          {education.map((item) => (
            <div key={item.degree} className={`bg-white/[0.02] border ${item.accentBorder} rounded-xl p-4 text-center hover:bg-white/[0.05] transition-all duration-500`}>
              <p className={`text-2xl md:text-3xl font-black ${item.accentColor} mb-0.5`}>{item.grade}</p>
              <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">{item.gradeLabel}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="edu-timeline relative max-w-3xl">
          <div className="absolute left-5 md:left-7 top-0 bottom-0 w-px origin-top">
            <div className="edu-timeline-line w-full h-full bg-gradient-to-b from-cyan-500/40 via-violet-500/30 to-amber-500/20" />
          </div>
          <div className="space-y-5">
            {education.map((item) => (
              <div key={item.degree} className="edu-card relative pl-14 md:pl-18 group">
                <div className="absolute left-2.5 md:left-4.5 top-7 z-10">
                  <div className={`w-5 h-5 rounded-full ${item.accentBg} border-2 ${item.accentBorder} flex items-center justify-center group-hover:scale-125 transition-transform duration-500`}>
                    <div className={`w-2 h-2 rounded-full ${item.accentColor === 'text-cyan-400' ? 'bg-cyan-400' : item.accentColor === 'text-violet-400' ? 'bg-violet-400' : 'bg-amber-400'}`} />
                  </div>
                </div>
                <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-6 hover:bg-white/[0.05] hover:border-white/15 transition-all duration-500">
                  <div className="flex items-start gap-4 mb-3">
                    <div className={`w-10 h-10 rounded-lg ${item.accentBg} border ${item.accentBorder} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                      <item.icon className={`w-5 h-5 ${item.accentColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-lg mb-0.5">{item.degree}</h3>
                      <p className="text-white/40 text-sm">{item.institution}</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <TrendingUp className={`w-4 h-4 ${item.accentColor} opacity-60`} />
                      <span className={`text-lg font-black ${item.accentColor}`}>{item.grade}</span>
                    </div>
                  </div>
                  <p className="text-white/45 text-sm leading-relaxed mb-3 pl-14">{item.description}</p>
                  <div className="flex flex-wrap items-center gap-3 pl-14">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${item.statusColor}`}>{item.status}</span>
                    <div className="flex items-center gap-1.5 text-white/30 text-xs">
                      <Calendar className="w-3 h-3" /><span className="font-mono">{item.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
