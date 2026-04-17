const GridBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
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
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
    
    {/* Subtle cyan glow for the hero area */}
    <div className="absolute top-[20%] right-[10%] w-[800px] h-[800px] rounded-full opacity-[0.05] blur-[120px]" 
      style={{ background: "radial-gradient(circle, #00C9FF, transparent 70%)" }} 
    />
  </div>
);

export default GridBackground;
