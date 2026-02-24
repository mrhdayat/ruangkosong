"use client";

import { useEffect, useRef } from "react";
import styles from "./ImageReveal.module.css";

interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * ImageReveal
 * Clip-path mask animation from bottom to top.
 * Duration: 2 seconds. Triggered by ScrollTrigger.
 */
export default function ImageReveal({ children, className = "" }: ImageRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    let cleanup: (() => void) | undefined;

    const initAnimation = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const el = wrapperRef.current;
      if (!el) return;

      gsap.set(el, {
        clipPath: "inset(100% 0% 0% 0%)",
      });

      const tween = gsap.to(el, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });

      cleanup = () => {
        tween.kill();
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill();
        });
      };
    };

    initAnimation();

    return () => {
      cleanup?.();
    };
  }, []);

  return (
    <div ref={wrapperRef} className={`${styles.wrapper} ${className}`}>
      {children}
    </div>
  );
}
