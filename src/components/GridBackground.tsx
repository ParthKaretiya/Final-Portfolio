import { motion } from "framer-motion";

const GridBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
    {/* Grid lines */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(to right, hsl(0 0% 50% / 0.5) 1px, transparent 1px),
          linear-gradient(to bottom, hsl(0 0% 50% / 0.5) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    />
    
    {/* Animated Glows */}
    <motion.div 
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.05, 0.08, 0.05],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute top-[-10%] right-[-10%] w-[1000px] h-[1000px] rounded-full blur-[120px]" 
      style={{ background: "radial-gradient(circle, #00C9FF, transparent 70%)" }} 
    />
    
    <motion.div 
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.03, 0.06, 0.03],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }}
      className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full blur-[120px]" 
      style={{ background: "radial-gradient(circle, #7000FF, transparent 70%)" }} 
    />

    <motion.div 
      animate={{
        opacity: [0.02, 0.04, 0.02],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 5
      }}
      className="absolute top-[40%] left-[30%] w-[600px] h-[600px] rounded-full blur-[100px]" 
      style={{ background: "radial-gradient(circle, #FF00C1, transparent 70%)" }} 
    />

    {/* Vignette effect */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505] opacity-80" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-40" />
  </div>
);

export default GridBackground;
