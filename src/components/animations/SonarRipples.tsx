const SonarRipples = () => {
  // We use inline CSS mapping to orchestrate three concentric rings that ping indefinitely
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-40 mix-blend-screen isolate">
      <div 
        className="absolute w-[600px] h-[600px] border border-blue-500/10 rounded-full animate-ping" 
        style={{ animationDuration: '6s', animationDelay: '0s' }} 
      />
      <div 
        className="absolute w-[600px] h-[600px] border border-blue-400/20 rounded-full animate-ping" 
        style={{ animationDuration: '6s', animationDelay: '2s' }} 
      />
      <div 
        className="absolute w-[600px] h-[600px] border border-yellow-500/10 rounded-full animate-ping" 
        style={{ animationDuration: '6s', animationDelay: '4s' }} 
      />
    </div>
  );
};

export default SonarRipples;
