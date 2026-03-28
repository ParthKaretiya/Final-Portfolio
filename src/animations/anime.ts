import { animate, createTimeline, stagger } from 'animejs';
import { useEffect, type RefObject } from 'react';

export { animate, createTimeline, stagger };

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Triggers a callback once when the element scrolls into view.
 * Use for scroll-triggered anime.js animations.
 */
export const useScrollReveal = (
  ref: RefObject<HTMLElement | null>,
  animationFn: () => void,
  options: { threshold?: number; rootMargin?: string } = {}
) => {
  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animationFn();
          observer.disconnect();
        }
      },
      { threshold: options.threshold ?? 0.12, rootMargin: options.rootMargin ?? '0px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
};
