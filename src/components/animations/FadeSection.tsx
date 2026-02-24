"use client";

import { useEffect, useRef } from "react";
import styles from "./FadeSection.module.css";

interface FadeSectionProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

/**
 * FadeSection
 * Wrapper with 1.2s–1.5s fade-in + subtle translateY.
 * Triggered on scroll enter.
 */
export default function FadeSection({
  children,
  className = "",
  duration = 1.4,
}: FadeSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    let cleanup: (() => void) | undefined;

    const initAnimation = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const el = sectionRef.current;
      if (!el) return;

      gsap.set(el, { opacity: 0, y: 30 });

      const tween = gsap.to(el, {
        opacity: 1,
        y: 0,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
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
  }, [duration]);

  return (
    <div ref={sectionRef} className={`${styles.section} ${className}`}>
      {children}
    </div>
  );
}
