import { useRef, useState } from "react";
import { Mail, MapPin, Send, Linkedin, Github, Youtube, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SonarRipples from "./animations/SonarRipples";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/parth-karetiya-640a00371/", icon: Linkedin, hoverColor: "hover:text-[#0A66C2] hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10" },
  { name: "GitHub", url: "https://github.com/ParthKaretiya", icon: Github, hoverColor: "hover:text-white hover:border-white/50 hover:bg-white/10" },
  { name: "X", url: "https://x.com/ParthKaretiya01", icon: () => <svg viewBox="0 0 24 24" className="w-[1.25em] h-[1.25em] fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
  { name: "YouTube", url: "https://www.youtube.com/channel/UCT9Xciz6LPl93aXqZ3Jse-Q", icon: Youtube, hoverColor: "hover:text-[#FF0000] hover:border-[#FF0000]/50 hover:bg-[#FF0000]/10" },
  { name: "LeetCode", url: "https://leetcode.com/u/fuvaLE5xdK/", icon: () => <svg viewBox="0 0 24 24" className="w-[1.25em] h-[1.25em] fill-current"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125 1.513 5.527 5.527 0 0 0 .062 1.488 5.337 5.337 0 0 0 .584 1.488 4.961 4.961 0 0 0 1.084 1.25v.001l2.895 3.162a1.37 1.37 0 0 0 1.884-.2l-2.69-2.936a1.366 1.366 0 0 1-.395-1.042c.038-.376.242-.712.55-1.002.32-.303.882-.57 1.706-.57h11.233a1.375 1.375 0 0 0 1.375-1.375v-1.188a1.375 1.375 0 0 0-1.375-1.375H13.62l7.042-7.615a1.373 1.373 0 0 0-.083-1.855L14.444.438A1.374 1.374 0 0 0 13.483 0zm4.254 20.306L14.444 23.44a1.375 1.375 0 0 1-1.856.06l-4.25-4.667a4.963 4.963 0 0 1-1.083-1.25H21.375c.76 0 1.375.615 1.375 1.375v1.187a1.375 1.375 0 0 1-1.375 1.375h-3.638z"/></svg> },
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setSubmitState("loading");

    try {
      const result = await emailjs.sendForm(
        "service_yzi4ecp",
        "template_tfz37bb",
        formRef.current,
        "3Hah5t2_pT5FXOsy2"
      );

      if (result.text === "OK") {
        setSubmitState("success");
        toast.success("Message sent successfully!");
        
        setTimeout(() => {
          gsap.fromTo('.success-icon', 
            { scale: 0, rotation: -180 }, 
            { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)' }
          );
        }, 10);

        setTimeout(() => { 
          setSubmitState("idle"); 
          setFormData({ name: "", email: "", message: "" }); 
        }, 3000);
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitState("error");
      toast.error("Failed to send message. Please try again.");
      
      setTimeout(() => {
        setSubmitState("idle");
      }, 3000);
    }
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
    <section id="contact" className="py-28 relative overflow-hidden bg-[#050505]" ref={sectionRef}>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/15 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Info */}
          <div className="reveal-left">
            <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3">Get in Touch</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6" style={{ fontFamily: "'Cinzel', serif" }}>
              Let's <span className="text-white/40 font-light">Connect</span>
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-md mb-10">
              Have a project in mind or just want to say hello? I'm always open to new opportunities and collaborations.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-400 group-hover:border-cyan-400 transition-all duration-500">
                  <Mail className="w-6 h-6 text-cyan-400 group-hover:text-black transition-colors" />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">Email Me</p>
                  <a href="mailto:parthkaretiya0@gmail.com" className="text-base md:text-lg font-bold text-white hover:text-cyan-400 transition-colors">parthkaretiya0@gmail.com</a>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-purple-400 group-hover:border-purple-400 transition-all duration-500">
                  <MapPin className="w-6 h-6 text-purple-400 group-hover:text-black transition-colors" />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">Location</p>
                  <p className="text-base md:text-lg font-bold text-white">Gujarat, India</p>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/5">
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-6">Social Profiles</p>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 transition-all duration-300 group ${link.hoverColor}`}
                    title={link.name}
                  >
                    <link.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="reveal-right">
            <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-400/10 blur-3xl rounded-full" />
              
              <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] md:text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Your Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.08] transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] md:text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Your Email</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.08] transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] md:text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Message</label>
                  <textarea 
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.08] transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button 
                  type="submit"
                  disabled={submitState === "loading"}
                  className="w-full bg-cyan-400 hover:bg-cyan-300 disabled:bg-cyan-900/50 disabled:cursor-not-allowed text-black font-black uppercase tracking-[0.2em] py-5 rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] flex items-center justify-center gap-3 active:scale-95"
                >
                  {submitState === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                    </>
                  ) : submitState === "success" ? (
                    <>
                      <CheckCircle className="w-5 h-5" /> Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
