import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Skip on touch devices or reduced motion
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reducedMotion) return;

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
      // Higher lerp = snappier cursor, less lag
      pos.current.x += (target.current.x - pos.current.x) * 0.2;
      pos.current.y += (target.current.y - pos.current.y) * 0.2;
      cursor.style.transform = `translate3d(${pos.current.x - 10}px, ${pos.current.y - 10}px, 0)`;
      dot.style.transform = `translate3d(${target.current.x - 2.5}px, ${target.current.y - 2.5}px, 0)`;
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    // Use event delegation instead of MutationObserver (much lighter)
    const onPointerOver = (e: PointerEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a, button, [role='button'], input, textarea, select")) {
        cursor.classList.add("hovering");
      }
    };
    const onPointerOut = (e: PointerEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a, button, [role='button'], input, textarea, select")) {
        cursor.classList.remove("hovering");
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.body.style.cursor = "";
      style.remove();
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
