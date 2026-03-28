import { useState, useEffect } from "react";
import { Heart, Linkedin, Github, Youtube, ArrowUp } from "lucide-react";

const socialLinks = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/parth-karetiya-640a00371/", icon: Linkedin },
  { name: "GitHub", url: "https://github.com/ParthKaretiya", icon: Github },
  { name: "X", url: "https://x.com/ParthKaretiya01", icon: () => <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
  { name: "YouTube", url: "https://www.youtube.com/channel/UCT9Xciz6LPl93aXqZ3Jse-Q", icon: Youtube },
];

const Footer = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold text-foreground tracking-tight">PK</span>
            <span className="text-lg font-bold text-primary">.</span>
          </div>

          <div className="flex gap-2">
            {socialLinks.map((social) => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-colors" aria-label={social.name}>
                <social.icon />
              </a>
            ))}
          </div>

          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-primary fill-primary" /> by <span className="text-foreground font-medium">Parth Karetiya</span>
          </p>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center shadow-lg z-50 transition-all duration-300 ${showTop ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"}`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </footer>
  );
};

export default Footer;
