import { useState, useEffect } from "react";
import { Heart, Linkedin, Github, Youtube, ArrowUp } from "lucide-react";

const socialLinks = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/parth-karetiya-640a00371/", icon: Linkedin },
  { name: "GitHub", url: "https://github.com/ParthKaretiya", icon: Github },
  { name: "X", url: "https://x.com/ParthKaretiya01", icon: () => <svg viewBox="0 0 24 24" className="w-[1.25em] h-[1.25em] fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
  { name: "YouTube", url: "https://www.youtube.com/channel/UCT9Xciz6LPl93aXqZ3Jse-Q", icon: Youtube },
  { name: "LeetCode", url: "https://leetcode.com/u/fuvaLE5xdK/", icon: () => <svg viewBox="0 0 24 24" className="w-[1.25em] h-[1.25em] fill-current"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125 1.513 5.527 5.527 0 0 0 .062 1.488 5.337 5.337 0 0 0 .584 1.488 4.961 4.961 0 0 0 1.084 1.25v.001l2.895 3.162a1.37 1.37 0 0 0 1.884-.2l-2.69-2.936a1.366 1.366 0 0 1-.395-1.042c.038-.376.242-.712.55-1.002.32-.303.882-.57 1.706-.57h11.233a1.375 1.375 0 0 0 1.375-1.375v-1.188a1.375 1.375 0 0 0-1.375-1.375H13.62l7.042-7.615a1.373 1.373 0 0 0-.083-1.855L14.444.438A1.374 1.374 0 0 0 13.483 0zm4.254 20.306L14.444 23.44a1.375 1.375 0 0 1-1.856.06l-4.25-4.667a4.963 4.963 0 0 1-1.083-1.25H21.375c.76 0 1.375.615 1.375 1.375v1.187a1.375 1.375 0 0 1-1.375 1.375h-3.638z"/></svg> },
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
