import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/animations/anime";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (prefersReducedMotion() || (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches)) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    document.body.style.cursor = "none";
    const style = document.createElement("style");
    style.textContent = "a, button, input, textarea, select, [role='button'] { cursor: none !important; }";
    document.head.appendChild(style);

    const onMove = (e: MouseEvent) => { target.current = { x: e.clientX, y: e.clientY }; };
    const onEnter = () => { cursor.style.opacity = "1"; dot.style.opacity = "1"; };
    const onLeave = () => { cursor.style.opacity = "0"; dot.style.opacity = "0"; };

    let frameId: number;
    const raf = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      cursor.style.transform = `translate(${pos.current.x - 10}px, ${pos.current.y - 10}px)`;
      dot.style.transform = `translate(${target.current.x - 2.5}px, ${target.current.y - 2.5}px)`;
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    const addHover = () => cursor.classList.add("hovering");
    const removeHover = () => cursor.classList.remove("hovering");
    const selector = "a, button, [role='button'], input, textarea, select";

    const observer = new MutationObserver(() => {
      document.querySelectorAll(selector).forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", removeHover);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    document.querySelectorAll(selector).forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.body.style.cursor = "";
      style.remove();
      observer.disconnect();
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} />
      <div ref={cursorRef} className="custom-cursor" style={{ opacity: 0 }} />
    </>
  );
};

export default CustomCursor;
