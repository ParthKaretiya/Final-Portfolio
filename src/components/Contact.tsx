import { useRef, useState } from "react";
import { Mail, MapPin, Send, Linkedin, Github, Youtube, CheckCircle, Loader2 } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SonarRipples from "./animations/SonarRipples";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/parth-karetiya-640a00371/", icon: Linkedin },
  { name: "GitHub", url: "https://github.com/ParthKaretiya", icon: Github },
  { name: "X", url: "https://x.com/ParthKaretiya01", icon: () => <svg viewBox="0 0 24 24" className="w-[1.25em] h-[1.25em] fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
  { name: "YouTube", url: "https://www.youtube.com/channel/UCT9Xciz6LPl93aXqZ3Jse-Q", icon: Youtube },
  { name: "LeetCode", url: "https://leetcode.com/u/fuvaLE5xdK/", icon: () => <svg viewBox="0 0 24 24" className="w-[1.25em] h-[1.25em] fill-current"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125 1.513 5.527 5.527 0 0 0 .062 1.488 5.337 5.337 0 0 0 .584 1.488 4.961 4.961 0 0 0 1.084 1.25v.001l2.895 3.162a1.37 1.37 0 0 0 1.884-.2l-2.69-2.936a1.366 1.366 0 0 1-.395-1.042c.038-.376.242-.712.55-1.002.32-.303.882-.57 1.706-.57h11.233a1.375 1.375 0 0 0 1.375-1.375v-1.188a1.375 1.375 0 0 0-1.375-1.375H13.62l7.042-7.615a1.373 1.373 0 0 0-.083-1.855L14.444.438A1.374 1.374 0 0 0 13.483 0zm4.254 20.306L14.444 23.44a1.375 1.375 0 0 1-1.856.06l-4.25-4.667a4.963 4.963 0 0 1-1.083-1.25H21.375c.76 0 1.375.615 1.375 1.375v1.187a1.375 1.375 0 0 1-1.375 1.375h-3.638z"/></svg> },
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState("loading");
    setTimeout(() => {
      setSubmitState("success");
      setTimeout(() => {
        gsap.fromTo('.success-icon', 
          { scale: 0, rotation: -180 }, 
          { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)' }
        );
      }, 10);
      setTimeout(() => { setSubmitState("idle"); setFormData({ name: "", email: "", message: "" }); }, 2500);
    }, 1200);
  };

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(['.reveal', '.reveal-left', '.reveal-right'], { opacity: 1 });
      return;
    }

    gsap.fromTo('.reveal', 
      { opacity: 0, y: 30 }, 
      { 
        opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    );

    gsap.fromTo('.reveal-left', 
      { opacity: 0, x: -40 }, 
      { 
        opacity: 1, x: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.3,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    );

    gsap.fromTo('.reveal-right', 
      { opacity: 0, x: 40 }, 
      { 
        opacity: 1, x: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.4,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      }
    );

    // Continuous floating for social links
    gsap.to('.social-icon-link', {
      y: -6,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.15,
      delay: 1.5
    });
  }, { scope: sectionRef });

  return (
    <section id="contact" className="py-28 relative overflow-hidden" ref={sectionRef}>
      <SonarRipples />
      {/* Cinematic Ambient Background Orb */}
      <div className="absolute bottom-0 left-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-[150px] -translate-x-1/2 translate-y-1/2 pointer-events-none animate-pulse" style={{ animationDuration: '5s' }} />

      <div className="container mx-auto px-6">
        <div className="mb-16">
          <p className="reveal opacity-0 text-primary font-mono text-sm tracking-widest uppercase mb-3">Contact</p>
          <h2 className="reveal opacity-0 text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">Let's Connect</h2>
          <p className="reveal opacity-0 text-muted-foreground max-w-xl">Have a project in mind or want to collaborate? Drop me a message.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl">
          {/* Info */}
          <div className="reveal-left opacity-0">
            <div className="space-y-5 mb-8">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
                  <Mail className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Email</p>
                  <a href="mailto:parthkaretiya@gmail.com" className="text-foreground hover:text-primary transition-colors text-sm">parthkaretiya@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-105 transition-all duration-300">
                  <MapPin className="w-5 h-5 text-accent group-hover:text-accent-foreground transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Location</p>
                  <p className="text-foreground text-sm">Gujarat, India</p>
                </div>
              </div>
            </div>

            <h4 className="text-sm font-semibold text-foreground mb-3 tracking-wider">Socials</h4>
            <div className="reveal-left opacity-0 flex gap-2">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="social-icon-link w-10 h-10 surface-card rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 transition-all duration-300" aria-label={social.name}>
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {["name", "email"].map((field) => (
              <div key={field} className="reveal-right opacity-0 relative">
                <label htmlFor={field} className={`absolute left-0 transition-all duration-300 text-sm ${focusedField === field || formData[field as keyof typeof formData] ? "top-0 text-xs text-primary font-mono tracking-wider uppercase" : "top-4 text-muted-foreground"}`}>
                  {field === "name" ? "Your Name" : "Email Address"}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  id={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                  onFocus={() => setFocusedField(field)}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pt-6 pb-2 bg-transparent text-foreground border-b border-border focus:border-primary focus:outline-none transition-colors duration-300"
                  required
                />
              </div>
            ))}

            <div className="reveal-right opacity-0 relative">
              <label htmlFor="message" className={`absolute left-0 transition-all duration-300 text-sm ${focusedField === "message" || formData.message ? "top-0 text-xs text-primary font-mono tracking-wider uppercase" : "top-4 text-muted-foreground"}`}>
                Your Message
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                className="w-full pt-6 pb-2 bg-transparent text-foreground border-b border-border focus:border-primary focus:outline-none transition-colors duration-300 resize-none"
                required
              />
            </div>

            <button type="submit" className="reveal-right opacity-0 w-full px-6 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 disabled:opacity-60" disabled={submitState !== "idle"}>
              {submitState === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
              {submitState === "success" && <CheckCircle className="success-icon w-4 h-4" />}
              {submitState === "idle" && <Send className="w-4 h-4" />}
              {submitState === "loading" ? "Sending..." : submitState === "success" ? "Message Sent!" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
