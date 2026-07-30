import { useState, useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Hackathons from "@/components/Hackathons";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GridBackground from "@/components/GridBackground";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll with universal cross-device settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(1000, 16);

    // Initial hash navigation scroll handling if landing with #hash
    if (window.location.hash) {
      const initialTarget = document.getElementById(window.location.hash.substring(1));
      if (initialTarget) {
        setTimeout(() => {
          lenis.scrollTo(initialTarget, { offset: -70, duration: 1.2 });
        }, 300);
      }
    }

    // Handle Anchor Links seamlessly across all devices
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.includes("#")) {
          const [path, hash] = href.split("#");
          if (path === "" || path === "/" || path === window.location.pathname) {
            const target = hash ? document.getElementById(hash) : document.body;
            if (target || hash === "") {
              e.preventDefault();
              lenis.scrollTo(hash === "" ? 0 : target!, { offset: -70, duration: 1.2 });
              window.history.pushState(null, "", hash ? `#${hash}` : window.location.pathname);
            }
          }
        }
      }
    };
    document.addEventListener("click", handleClick);

    // Optimized Global Vertical Snake Animation
    const ctx = gsap.context(() => {
      gsap.fromTo('.global-snake-line', 
        { y: "-100vh" },
        { 
          y: "100vh", 
          ease: "none", 
          scrollTrigger: { 
            trigger: "body", 
            start: "top top", 
            end: "bottom bottom", 
            scrub: 0.5, // Added slight delay to scrub for performance
            fastScrollEnd: true,
            preventOverlaps: true
          }
        }
      );
    });

    return () => {
      document.removeEventListener("click", handleClick);
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Parth Karetiya | Full Stack Developer | React & MERN Specialist</title>
        <meta name="description" content="Parth Karetiya is a highly skilled Full Stack Developer specializing in React, Node.js, and the MERN stack. View my portfolio for high-performance web applications." />
        <link rel="canonical" href="https://parthkaretiya-portfolio.vercel.app/" />
      </Helmet>
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      <CustomCursor />
      <ScrollProgress />
      <div
        className="min-h-screen bg-background relative"
      >
        <GridBackground />
        
        {/* Global Snake Line */}
        <div className="fixed top-0 left-2 md:left-8 w-[2px] h-full z-[90] pointer-events-none opacity-60 overflow-hidden mix-blend-screen hidden sm:block">
          <div className="global-snake-line w-full h-[40vh] bg-gradient-to-b from-transparent via-cyan-400 to-transparent blur-[1px]" />
        </div>

        <div className="relative z-10">
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Hackathons />
          <Certificates />
          <Contact />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Index;
