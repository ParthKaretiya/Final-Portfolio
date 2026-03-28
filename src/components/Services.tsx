import { useRef } from "react";
import { Monitor, Server } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Frontend Development",
    tagline: "Modern & Responsive UI",
    description:
      "Crafting fast, pixel-perfect, and responsive user interfaces using React and modern tooling. Every component is built with performance, accessibility, and cinematic detail in mind.",
    icon: Monitor,
    gradient: "from-cyan-500/10 via-transparent to-blue-500/10",
    borderHover: "hover:border-cyan-400/30",
    iconColor: "text-cyan-400",
    bgIcon: "bg-cyan-500/10",
    accentColor: "text-cyan-400",
    glowColor: "shadow-cyan-500/10",
    skills: ["React.js", "Next.js", "GSAP", "Tailwind CSS", "TypeScript"],
  },
  {
    title: "Backend Development",
    tagline: "Scalable & Secure Systems",
    description:
      "Designing and building robust server-side architectures using Node.js, Express, and MongoDB. Focused on clean API design, authentication, scalability, and reliability.",
    icon: Server,
    gradient: "from-blue-600/10 via-transparent to-indigo-500/10",
    borderHover: "hover:border-blue-400/30",
    iconColor: "text-blue-400",
    bgIcon: "bg-blue-500/10",
    accentColor: "text-blue-400",
    glowColor: "shadow-blue-500/10",
    skills: ["Node.js", "Express.js", "MongoDB", "REST APIs", "JWT Auth"],
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set([".service-card", ".service-header-el"], { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      ".service-header-el",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      }
    );

    gsap.fromTo(
      ".service-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.18,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      id="services"
      className="py-24 relative overflow-hidden bg-background"
      ref={sectionRef}
    >
      {/* Ambient orbs */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="service-header-el opacity-0 text-cyan-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-3">
            What I Do
          </p>
          <h2 className="service-header-el opacity-0 text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            My Services
          </h2>
          <p className="service-header-el opacity-0 text-muted-foreground mt-4 max-w-xl mx-auto text-sm sm:text-base">
            As a Full-Stack Developer, I build complete web solutions—from beautiful frontends to
            powerful backends.
          </p>
        </div>

        {/* Cards — 1 col on mobile, 2 on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className={`service-card opacity-0 group relative rounded-2xl border border-white/7 bg-black/40 overflow-hidden transition-all duration-300 ${service.borderHover} hover:shadow-2xl hover:${service.glowColor}`}
            >
              {/* Gradient bg that shows on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col gap-5">
                {/* Icon + tagline row */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-xl ${service.bgIcon} border border-white/10 flex items-center justify-center`}>
                    <service.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${service.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">{service.title}</h3>
                    <p className={`text-xs sm:text-sm font-mono ${service.accentColor} tracking-wider`}>{service.tagline}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {service.description}
                </p>

                {/* Skill pills */}
                <div className="flex flex-wrap gap-2">
                  {service.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-mono ${service.bgIcon} ${service.accentColor} border border-white/10`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
