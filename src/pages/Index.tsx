import { useState, useEffect } from "react";
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

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Native smooth scroll for anchor links (no Lenis overhead)
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.includes("#")) {
          const [path, hash] = href.split("#");
          if (path === "" || path === "/" || path === window.location.pathname) {
            const target = document.getElementById(hash);
            if (target) {
              e.preventDefault();
              target.scrollIntoView({ behavior: "smooth", block: "start" });
              window.history.pushState(null, "", `#${hash}`);
            }
          }
        }
      }
    };
    document.addEventListener("click", handleClick);

    // Handle initial hash on load
    if (window.location.hash) {
      setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 500);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      <CustomCursor />
      <ScrollProgress />
      <div
        className={`min-h-screen bg-background relative transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <GridBackground />
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
