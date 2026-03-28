const GridBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
    {/* Dot grid */}
    <div
      className="absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage: "radial-gradient(circle, hsl(0 0% 50%) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
    {/* Subtle accent glow */}
    <div className="absolute top-[30%] left-[20%] w-[600px] h-[600px] rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, hsl(25 95% 53%), transparent 70%)" }} />
    <div className="absolute top-[60%] right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.02]" style={{ background: "radial-gradient(circle, hsl(239 84% 67%), transparent 70%)" }} />
  </div>
);

export default GridBackground;
