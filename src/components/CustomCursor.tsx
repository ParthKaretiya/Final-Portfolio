import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Hide default cursor globally
    document.body.style.cursor = "none";
    const style = document.createElement("style");
    style.textContent = `
      * { cursor: none !important; }
      .cursor-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 999999;
      }
      .cursor-main {
        position: absolute;
        width: 8px;
        height: 8px;
        background: #fff;
        border-radius: 50%;
        will-change: transform;
        z-index: 1000;
      }
      .cursor-follower {
        position: absolute;
        width: 32px;
        height: 32px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        background: rgba(255, 255, 255, 0.05);
        border-radius: 50%;
        will-change: transform;
        transition: width 0.3s, height 0.3s, background 0.3s, border-color 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .cursor-follower.hovering {
        width: 56px;
        height: 56px;
        background: rgba(34, 211, 238, 0.15);
        border-color: rgba(34, 211, 238, 0.5);
        box-shadow: 0 0 20px rgba(34, 211, 238, 0.3);
      }
    `;
    document.head.appendChild(style);

    // Optimized quickTo for high performance
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.08, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.08, ease: "power3" });
    const fxTo = gsap.quickTo(follower, "x", { duration: 0.35, ease: "power3" });
    const fyTo = gsap.quickTo(follower, "y", { duration: 0.35, ease: "power3" });

    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      const offset = isHovering ? 28 : 16;
      xTo(e.clientX - 4);
      yTo(e.clientY - 4);
      fxTo(e.clientX - offset);
      fyTo(e.clientY - offset);
    };

    const handlePointerOver = (e: PointerEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a, button, [role='button'], input, textarea, select, .group, .clickable, .project-card, .hack-card, .skill-cartridge")) {
        isHovering = true;
        follower.classList.add("hovering");
      }
    };

    const handlePointerOut = (e: PointerEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a, button, [role='button'], input, textarea, select, .group, .clickable, .project-card, .hack-card, .skill-cartridge")) {
        isHovering = false;
        follower.classList.remove("hovering");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("pointerover", handlePointerOver, { passive: true });
    window.addEventListener("pointerout", handlePointerOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerout", handlePointerOut);
      document.body.style.cursor = "auto";
      style.remove();
    };
  }, []);

  return (
    <div className="cursor-container">
      <div ref={cursorRef} className="cursor-main" />
      <div ref={followerRef} className="cursor-follower" />
    </div>
  );
};

export default CustomCursor;
