import { useRef } from "react";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParallaxGeometry from "./animations/ParallaxGeometry";

gsap.registerPlugin(ScrollTrigger);

const education = [
  { degree: "Bachelor of Engineering (B.E.)", institution: "Swaminarayan University", status: "Currently Pursuing", icon: GraduationCap },
  { degree: "12th Grade", institution: "Jawahar Navodaya Vidyalaya, Amreli", status: "Completed", icon: Calendar },
  { degree: "10th Grade", institution: "Jawahar Navodaya Vidyalaya, Amreli", status: "Completed", icon: Calendar },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(['.reveal', '.reveal-card'], { opacity: 1 });
      return;
    }

    gsap.fromTo('.reveal', 
      { opacity: 0, y: 35 }, 
      { 
        opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    );

    gsap.fromTo('.reveal-card', 
      { opacity: 0, x: 50 }, 
      { 
        opacity: 1, x: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out', delay: 0.4,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="about" className="py-28 relative overflow-hidden" ref={sectionRef}>
      <ParallaxGeometry />
      {/* Cinematic Ambient Background Orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[150px] -translate-y-1/3 translate-x-1/3 pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />

      <div className="container mx-auto px-6">
        <div className="mb-16">
          <p className="reveal opacity-0 text-primary font-mono text-sm tracking-widest uppercase mb-3">About</p>
          <h2 className="reveal opacity-0 text-4xl md:text-5xl font-bold text-foreground tracking-tight">The Story So Far</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio */}
          <div className="space-y-6 text-muted-foreground text-base leading-relaxed">
            <div className="reveal opacity-0 surface-card p-6 md:p-8 rounded-2xl border border-white/5 bg-black/40 backdrop-blur-xl hover:border-white/10 transition-colors shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="mb-5 relative z-10">
                I'm <span className="text-foreground font-semibold text-lg tracking-wide">Parth Karetiya</span>, a <span className="text-cyan-400 font-medium">Full-Stack Developer</span> from <span className="inline-flex items-center gap-1 text-foreground"><MapPin size={16} className="text-cyan-400" />Gujarat, India</span>, focused on building modern, scalable, and high-performance web applications. I enjoy designing and developing end-to-end solutions with a strong emphasis on <span className="text-blue-400 font-medium">clean architecture</span>, maintainable code, and intuitive user experiences.
              </p>
              <p className="mb-5 relative z-10">
                My journey into technology started with a curiosity about how the web works, which gradually evolved into a deep interest in full-stack development. Over time, I have gained hands-on experience in creating responsive and dynamic frontends, along with designing efficient and reliable backend systems using technologies like React, Node.js, and MongoDB.
              </p>
              <p className="mb-5 relative z-10">
                I am particularly interested in writing <span className="text-purple-400 font-medium">optimized, secure, and scalable code</span>, ensuring that applications not only look great but also perform seamlessly under real-world conditions. I continuously strive to improve my understanding of software architecture, backend optimization, and cloud technologies.
              </p>
              {/* <p className="relative z-10">
                Outside of development, I actively participate in hackathons, explore new tools and frameworks, and stay updated with industry trends. I am driven by a passion for learning, building, and delivering impactful digital products that solve real-world problems.
              </p> */}
            </div>
          </div>

          {/* Right: Education */}
          <div>
            <h3 className="reveal opacity-0 text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-primary" />
              </div>
              Education
            </h3>
            <div className="space-y-4">
              {education.map((item) => (
                <div key={item.degree} className="reveal-card opacity-0 surface-card p-5 rounded-xl group hover:border-primary/20 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
                      <item.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">{item.degree}</h4>
                      <p className="text-sm text-muted-foreground mt-0.5">{item.institution}</p>
                      <span className="inline-block mt-2 px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-mono rounded-full">
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
