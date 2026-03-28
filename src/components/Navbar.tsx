import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef<HTMLElement>(null);
  const menuTl = useRef<gsap.core.Timeline>();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.substring(1));
      const current = sections.find((s) => {
        const el = document.getElementById(s);
        if (el) {
          const r = el.getBoundingClientRect();
          return r.top <= 120 && r.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(['.nav-wrapper', '.nav-link'], { opacity: 1, y: 0 });
      return;
    }

    // Initial load animation for desktop nav
    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo('.nav-wrapper', 
      { y: -60, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    ).fromTo('.nav-link',
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out' },
      "-=0.4"
    );

    // Setup Mobile Menu Timeline
    gsap.set('.mobile-menu-overlay', { clipPath: 'circle(0% at 100% 0%)', display: 'none' });
    gsap.set('.mobile-link', { y: 20, opacity: 0 });

    menuTl.current = gsap.timeline({ paused: true })
      .to('.mobile-menu-overlay', { 
        display: 'block',
        clipPath: 'circle(150% at 100% 0%)', 
        duration: 0.8, 
        ease: 'power4.inOut'
      })
      .to('.mobile-link', { 
        y: 0, 
        opacity: 1, 
        duration: 0.4, 
        stagger: 0.05, 
        ease: 'power3.out' 
      }, '-=0.3');

  }, { scope: navRef });

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
      menuTl.current?.play();
    } else {
      document.body.style.overflow = '';
      menuTl.current?.reverse();
    }
  }, [isMobileOpen]);

  const toggleMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMenu = () => {
    if (isMobileOpen) setIsMobileOpen(false);
  };

  return (
    <header ref={navRef} className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"}`}>
      <nav className="nav-wrapper container mx-auto px-6 py-4 flex items-center justify-between opacity-0">
        
        {/* Logo */}
        <button onClick={() => window.scrollTo(0,0)} className="nav-link relative group flex items-center gap-0.5 z-50 opacity-0">
          <span className="text-xl md:text-2xl font-black tracking-tight text-white" style={{ fontFamily: "'Cinzel', serif" }}>PK</span>
          <span className="text-xl md:text-2xl font-bold text-cyan-400">.</span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`nav-link opacity-0 text-sm font-medium transition-colors duration-300 ${
                activeSection === link.href.substring(1)
                  ? "text-cyan-400"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="nav-link opacity-0 px-6 py-2 bg-cyan-400 text-black text-sm font-bold rounded-full hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]"
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="nav-link opacity-0 md:hidden text-white w-10 h-10 flex items-center justify-end z-50 relative focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <span className={`absolute bg-white h-[2px] w-full transform transition-all duration-300 ease-in-out ${isMobileOpen ? 'rotate-45' : '-translate-y-2'}`} />
            <span className={`absolute bg-white h-[2px] w-full transform transition-all duration-300 ease-in-out ${isMobileOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute bg-white h-[2px] w-full transform transition-all duration-300 ease-in-out ${isMobileOpen ? '-rotate-45' : 'translate-y-2'}`} />
          </div>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className="mobile-menu-overlay hidden md:hidden fixed inset-0 bg-[#050505]/95 backdrop-blur-2xl z-40" style={{ clipPath: 'circle(0% at 100% 0%)' }}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="mobile-link text-3xl font-bold text-white hover:text-cyan-400 transition-colors opacity-0 tracking-tight"
              onClick={closeMenu}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="mobile-link mt-8 px-10 py-4 bg-cyan-400 text-black font-bold rounded-full opacity-0 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            onClick={closeMenu}
          >
            Let's Talk
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
