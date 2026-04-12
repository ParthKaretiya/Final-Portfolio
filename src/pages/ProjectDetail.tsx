import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GridBackground from "@/components/GridBackground";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "pulseguard",
    title: "PulseGuard",
    subtitle: "Healthcare Emergency Response System",
    description: "A real-time healthcare emergency response platform for hospital coordination and emergency medical assistance, developed by Parth Karetiya. This system ensures that emergency responders can coordinate effectively with hospitals during critical situations, optimizing the response time and saving lives.",
    tech: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
    image: "https://i.postimg.cc/1zqGFQWM/Screenshot-2026-03-09-093959.png",
    githubUrl: "https://github.com/ParthKaretiya/HackX",
    liveUrl: "#",
  },
  {
    id: "student-sync",
    title: "Student Sync",
    subtitle: "Campus Digital Ecosystem",
    description: "A centralized digital ecosystem for students and educators, part of the Parth Karetiya Portfolio. It bridges the gap between various campus stakeholders, providing a unified platform for communication, resource sharing, and administrative tasks.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    image: "https://i.postimg.cc/HWvnF0q9/image.png",
    githubUrl: "https://github.com/ParthKaretiya/StudentSync",
    liveUrl: "https://studentsync-mu.vercel.app/",
  },
  {
    id: "threatlens",
    title: "ThreatLens",
    subtitle: "Cybersecurity Threat Intelligence",
    description: "Cybersecurity monitoring tool by Parth Karetiya, analyzing system activity and detecting suspicious behavior. It provides real-time alerts and insights into potential threats, helping organizations protect their digital assets effectively.",
    tech: ["React", "Python", "Node.js"],
    image: "https://i.postimg.cc/HxfK7hJ7/image.png",
    githubUrl: "https://github.com/ParthKaretiya",
    liveUrl: "https://threatlens-topaz.vercel.app/",
  },
  {
    id: "cers-plus",
    title: "CERS+",
    subtitle: "Emergency Response System",
    description: "Coordination platform for emergency responders and healthcare services with approval workflows. Developed by Parth Karetiya, it streamlines the communication between different emergency services, ensuring a cohesive and efficient response.",
    tech: ["React", "Node.js", "MongoDB"],
    image: "https://i.postimg.cc/8zKZ609G/image.png",
    githubUrl: "https://github.com/ParthKaretiya",
    liveUrl: "https://cers-plus.web.app/",
  },
  {
    id: "ai-resume-analyzer",
    title: "AI Resume Analyzer",
    subtitle: "NLP-Powered Tool",
    description: "An AI-powered tool that analyzes resumes and provides actionable improvement suggestions. Developed by Parth Karetiya, it leverages natural language processing to help job seekers optimize their resumes for better visibility and impact.",
    tech: ["Python", "NLP", "Flask"],
    image: "https://i.postimg.cc/6p2pYv5L/resume-ai.jpg",
    githubUrl: "https://github.com/ParthKaretiya",
    liveUrl: "#",
  },
];

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Parth Karetiya Portfolio`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", `${project.description.substring(0, 160)}... Project by Parth Karetiya.`);
      }
    }

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
  }, [project]);

  if (!project) return <div>Project not found</div>;

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <div className="min-h-screen bg-background relative">
        <GridBackground />
        <div className="relative z-10">
          <Navbar />
          <main className="pt-32 pb-20 container mx-auto px-6">
            <Link to="/#projects" className="inline-flex items-center gap-2 text-white/60 hover:text-cyan-400 transition-colors mb-12">
              <ArrowLeft size={18} /> Back to Projects
            </Link>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Cinzel', serif" }}>{project.title}</h1>
                  <p className="text-cyan-400 font-mono text-lg tracking-wider">{project.subtitle}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.tech.map((t) => (
                    <span key={t} className="px-4 py-1.5 bg-white/5 border border-white/10 text-white/80 text-sm font-mono rounded-full">{t}</span>
                  ))}
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-white/70 text-lg leading-relaxed">{project.description}</p>
                </div>

                <div className="flex gap-4">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-cyan-400 text-black font-bold rounded-full hover:bg-cyan-300 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                    <ExternalLink size={20} /> Live Preview
                  </a>
                  {project.githubUrl !== "#" && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-white/10 border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all flex items-center gap-2">
                      <Github size={20} /> Source Code
                    </a>
                  )}
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img src={project.image} alt={`${project.title} - Parth Karetiya Portfolio`} className="w-full h-auto" />
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
