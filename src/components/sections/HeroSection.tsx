"use client";

import { useEffect, useRef } from "react";
import styles from "./HeroSection.module.css";

/**
 * HeroSection — Premium Cinematic Landing
 * Staggered mask reveals, parallax elements, floating particles.
 * Split-line text animations with 3D transforms.
 */
export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    let cleanup: (() => void) | undefined;

    const initAnimation = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const el = heroRef.current;
      if (!el) return;

      // Pre-title fade in
      const preTitle = el.querySelector(`.${styles.preTitle}`);
      gsap.fromTo(
        preTitle,
        { opacity: 0, y: 30, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.5,
          delay: 4.2,
          ease: "power2.out",
        }
      );

      // Main title — each word with mask reveal
      const words = el.querySelectorAll(`.${styles.word}`);
      words.forEach((word, i) => {
        const chars = word.querySelectorAll(`.${styles.char}`);
        gsap.fromTo(
          chars,
          {
            y: "110%",
            rotateX: -80,
            opacity: 0,
          },
          {
            y: "0%",
            rotateX: 0,
            opacity: 1,
            duration: 1.4,
            stagger: 0.035,
            delay: 4.5 + i * 0.3,
            ease: "power4.out",
          }
        );
      });

      // Subtitle with elegant blur-in
      const subtitle = el.querySelector(`.${styles.subtitle}`);
      gsap.fromTo(
        subtitle,
        { opacity: 0, y: 40, filter: "blur(12px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 2,
          delay: 5.5,
          ease: "power2.out",
        }
      );

      // Decorative elements
      const decoLine = el.querySelector(`.${styles.decoLine}`);
      gsap.fromTo(
        decoLine,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 2.5,
          delay: 5,
          ease: "power3.inOut",
        }
      );

      // Scroll indicator
      const scrollInd = el.querySelector(`.${styles.scrollIndicator}`);
      gsap.fromTo(
        scrollInd,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 6,
          ease: "power2.out",
        }
      );

      // Parallax on scroll
      gsap.to(el.querySelector(`.${styles.titleWrap}`), {
        y: -120,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(el.querySelector(`.${styles.subtitle}`), {
        y: -60,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "30% top",
          end: "80% top",
          scrub: 1,
        },
      });

      // Year text parallax
      const yearText = el.querySelector(`.${styles.yearText}`);
      gsap.fromTo(
        yearText,
        { opacity: 0, x: -30 },
        { opacity: 0.15, x: 0, duration: 2, delay: 5.8, ease: "power2.out" }
      );
      gsap.to(yearText, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });

      cleanup = () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill();
        });
      };
    };

    initAnimation();
    return () => cleanup?.();
  }, []);

  const renderWord = (word: string, key: number) => (
    <span key={key} className={styles.word}>
      {word.split("").map((char, i) => (
        <span key={i} className={styles.char}>
          {char}
        </span>
      ))}
    </span>
  );

  return (
    <section ref={heroRef} className={styles.hero} id="hero">
      {/* Background decorative year */}
      <span className={styles.yearText} aria-hidden="true">
        2024
      </span>

      <div className={styles.content}>
        <p className={styles.preTitle}>Museum Seni Kontemporer</p>

        <div className={styles.titleWrap}>
          <h1 className={styles.title}>
            {renderWord("RUANG", 0)}
            <span className={styles.titleSpace}>{"\u00A0"}</span>
            {renderWord("KOSONG", 1)}
          </h1>
        </div>

        <div className={styles.decoLine} />

        <p className={styles.subtitle}>
          Keheningan yang Berbicara — Sebuah pengalaman kontemplatif
          <br />
          di mana ruang kosong menjadi kanvas terkuat.
        </p>
      </div>

      <div className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollText}>Gulir untuk menjelajahi</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
