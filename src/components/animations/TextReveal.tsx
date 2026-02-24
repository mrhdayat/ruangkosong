"use client";

import { useEffect, useRef } from "react";
import styles from "./TextReveal.module.css";

interface TextRevealProps {
  text: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
}

/**
 * TextReveal
 * Character-by-character reveal animation triggered by ScrollTrigger.
 * Each character appears with a very small delay for an elegant typing effect.
 */
export default function TextReveal({
  text,
  tag: Tag = "h2",
  className = "",
  delay = 0,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let cleanup: (() => void) | undefined;

    const initAnimation = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const chars = containerRef.current?.querySelectorAll(`.${styles.char}`);
      if (!chars || chars.length === 0) return;

      gsap.set(chars, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
        delay,
      });

      tl.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: "power2.out",
      });

      cleanup = () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === containerRef.current) st.kill();
        });
      };
    };

    initAnimation();

    return () => {
      cleanup?.();
    };
  }, [text, delay]);

  // Split text into characters, preserving spaces
  const chars = text.split("").map((char, i) => (
    <span
      key={i}
      className={styles.char}
      style={{ display: char === " " ? "inline" : "inline-block" }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <div ref={containerRef} className={className}>
      <Tag className={styles.text}>{chars}</Tag>
    </div>
  );
}
