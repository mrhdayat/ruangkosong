"use client";

import { useEffect, useRef, useCallback } from "react";
import styles from "./CustomCursor.module.css";

/**
 * Custom Cursor
 * Transparent circle with mix-blend-mode: difference
 * Follows mouse with lerp interpolation
 * Hidden on touch devices
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const isHoveringRef = useRef(false);

  const lerp = (start: number, end: number, factor: number) =>
    start + (end - start) * factor;

  const animate = useCallback(() => {
    posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.12);
    posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.12);

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%) scale(${isHoveringRef.current ? 1.8 : 1})`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const handleMouseEnterLink = () => {
      isHoveringRef.current = true;
    };

    const handleMouseLeaveLink = () => {
      isHoveringRef.current = false;
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Add hover detection for interactive elements
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, .interactive'
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnterLink);
        el.addEventListener("mouseleave", handleMouseLeaveLink);
      });
    };

    addHoverListeners();

    // Re-add listeners when DOM changes
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [animate]);

  return <div ref={cursorRef} className={styles.cursor} aria-hidden="true" />;
}
