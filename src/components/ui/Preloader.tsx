"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Preloader.module.css";

/**
 * Preloader — Cinematic Loading Screen
 * Museum name reveals letter by letter with mask animation.
 * Horizontal line expands. Counter counts to 100.
 * Then the entire screen wipes away revealing content.
 */
export default function Preloader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const animate = async () => {
      const { gsap } = await import("gsap");

      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      // Counter animation 0 → 100
      const counter = { val: 0 };
      tl.to(counter, {
        val: 100,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = String(
              Math.floor(counter.val)
            ).padStart(3, "0");
          }
        },
      });

      // Museum text reveal - stagger from center
      const chars = containerRef.current?.querySelectorAll(
        `.${styles.titleChar}`
      );
      if (chars) {
        tl.fromTo(
          chars,
          {
            y: 120,
            rotateX: -90,
            opacity: 0,
          },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            duration: 1.2,
            stagger: {
              each: 0.04,
              from: "center",
            },
            ease: "power3.out",
          },
          0.3
        );
      }

      // Subtitle reveal
      const subtitle = containerRef.current?.querySelector(
        `.${styles.subtitle}`
      );
      if (subtitle) {
        tl.fromTo(
          subtitle,
          { opacity: 0, y: 30, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power2.out",
          },
          1.2
        );
      }

      // Line expand
      const line = containerRef.current?.querySelector(`.${styles.line}`);
      if (line) {
        tl.fromTo(
          line,
          { scaleX: 0 },
          { scaleX: 1, duration: 2, ease: "power3.inOut" },
          0.5
        );
      }

      // Exit — split screen wipe
      const topCurtain = containerRef.current?.querySelector(
        `.${styles.curtainTop}`
      );
      const bottomCurtain = containerRef.current?.querySelector(
        `.${styles.curtainBottom}`
      );

      if (topCurtain) {
        tl.to(
          topCurtain,
          {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut",
          },
          3.2
        );
      }
      if (bottomCurtain) {
        tl.to(
          bottomCurtain,
          {
            yPercent: 100,
            duration: 1.2,
            ease: "power4.inOut",
          },
          3.2
        );
      }

      // Fade out all preloader text
      const fadeTargets = [chars, subtitle, line, counterRef.current].filter(
        Boolean
      );
      if (fadeTargets.length > 0) {
        tl.to(
          fadeTargets,
          {
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
          },
          3.0
        );
      }
    };

    animate();
  }, [mounted, onComplete]);

  if (!mounted) return null;

  const titleChars = "RUANG KOSONG".split("").map((char, i) => (
    <span
      key={i}
      className={styles.titleChar}
      style={{ display: char === " " ? "inline-block" : "inline-block" }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <div ref={containerRef} className={styles.preloader}>
      {/* Split curtains for exit */}
      <div className={styles.curtainTop} />
      <div className={styles.curtainBottom} />

      {/* Content */}
      <div className={styles.content}>
        <span ref={counterRef} className={styles.counter}>
          000
        </span>

        <div className={styles.titleWrap}>
          <h1 className={styles.title}>{titleChars}</h1>
        </div>

        <p className={styles.subtitle}>Keheningan yang Berbicara</p>

        <div className={styles.line} />
      </div>
    </div>
  );
}
