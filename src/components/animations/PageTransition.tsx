"use client";

import { useEffect, useRef } from "react";
import styles from "./PageTransition.module.css";

/**
 * PageTransition
 * Entrance animation for sub-pages.
 * Fade + slide up with staggered children.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const animate = async () => {
      const { gsap } = await import("gsap");

      // Page container fade in
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 }
      );

      // Stagger all animated children
      const items = containerRef.current?.querySelectorAll("[data-animate]");
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 50, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            delay: 0.5,
          }
        );
      }
    };

    animate();
  }, []);

  return (
    <div ref={containerRef} className={styles.container} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
