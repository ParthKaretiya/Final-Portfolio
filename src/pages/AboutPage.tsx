import { useState, useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";
import GridBackground from "@/components/GridBackground";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";

gsap.registerPlugin(ScrollTrigger);

import { Helmet } from "react-helmet-async";

const AboutPage = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>About Parth Karetiya | Full Stack Developer | Experience & Skills</title>
        <meta name="description" content="Learn more about Parth Karetiya, a Full Stack Developer from Gujarat, India. Discover his technical skills, computer engineering education, and his journey in building high-performance web applications." />
        <link rel="canonical" href="https://parthkaretiya-portfolio.vercel.app/about-parth-karetiya" />
      </Helmet>
      <CustomCursor />
      <ScrollProgress />
      <div className="min-h-screen bg-background relative">
        <GridBackground />
        <div className="relative z-10">
          <Navbar />
          <div className="pt-24">
            <About />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AboutPage;
