"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Artwork } from "@/data/artworks";
import styles from "./ArtworkSection.module.css";

interface ArtworkSectionProps {
  artwork: Artwork;
  index: number;
  onOpenDetail: (artwork: Artwork) => void;
}

/**
 * ArtworkSection — Premium Full-Viewport Display
 * Parallax image movement, split-text title reveal,
 * staggered meta fade-in, magnetic hover on image.
 */
export default function ArtworkSection({
  artwork,
  index,
  onOpenDetail,
}: ArtworkSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    let cleanup: (() => void) | undefined;

    const initAnimation = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const el = sectionRef.current;
      const img = imageRef.current;
      const imgInner = imageInnerRef.current;
      const meta = metaRef.current;
      if (!el || !img || !imgInner || !meta) return;

      // Image reveal — clip-path + scale
      gsap.set(img, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(imgInner, { scale: 1.3 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });

      tl.to(img, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.8,
        ease: "power4.inOut",
      });
      tl.to(
        imgInner,
        {
          scale: 1,
          duration: 2,
          ease: "power3.out",
        },
        0.2
      );

      // Index number — fade in
      const indexEl = meta.querySelector(`.${styles.index}`);
      tl.fromTo(
        indexEl,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
        0.8
      );

      // Title — word mask reveal
      const titleWords = meta.querySelectorAll(`.${styles.titleWord}`);
      titleWords.forEach((word, i) => {
        tl.fromTo(
          word,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
          },
          1 + i * 0.15
        );
      });

      // Artist — blur in
      const artist = meta.querySelector(`.${styles.artist}`);
      tl.fromTo(
        artist,
        { opacity: 0, filter: "blur(8px)", y: 15 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        1.3
      );

      // Details — stagger fade
      const details = meta.querySelectorAll(`.${styles.detailItem}`);
      tl.fromTo(
        details,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
        },
        1.5
      );

      // Parallax on image
      gsap.to(imgInner, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
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

  // Magnetic hover effect on image
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    if (imageInnerRef.current) {
      imageInnerRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  const handleMouseLeave = () => {
    if (imageInnerRef.current) {
      imageInnerRef.current.style.transition =
        "transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1)";
      imageInnerRef.current.style.transform = "translate(0, 0)";
      setTimeout(() => {
        if (imageInnerRef.current) {
          imageInnerRef.current.style.transition = "";
        }
      }, 800);
    }
  };

  const titleWords = artwork.title.split(" ");

  return (
    <section ref={sectionRef} className={styles.section} id={artwork.id}>
      <div className={styles.layout}>
        {/* Artwork Image with magnetic hover */}
        <div ref={imageRef} className={styles.imageContainer}>
          <button
            className={styles.imageButton}
            onClick={() => onOpenDetail(artwork)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            aria-label={`Lihat detail ${artwork.title}`}
          >
            <div ref={imageInnerRef} className={styles.imageInner}>
              <Image
                src={artwork.image}
                alt={artwork.title}
                fill
                sizes="60vw"
                className={styles.image}
                priority={index === 0}
              />
            </div>
          </button>
        </div>

        {/* Artwork Meta — fully animated */}
        <div ref={metaRef} className={styles.meta}>
          <span className={styles.index}>
            {String(index + 1).padStart(2, "0")}
          </span>

          <h2 className={styles.title}>
            {titleWords.map((word, i) => (
              <span key={i} className={styles.titleWordWrap}>
                <span className={styles.titleWord}>{word}</span>
              </span>
            ))}
          </h2>

          <p className={styles.artist}>{artwork.artist}</p>

          <div className={styles.details}>
            <p className={styles.detailItem}>{artwork.year}</p>
            <p className={styles.detailItem}>{artwork.medium}</p>
            <p className={styles.detailItem}>{artwork.dimensions}</p>
          </div>

          <button
            className={styles.viewMore}
            onClick={() => onOpenDetail(artwork)}
          >
            <span className={styles.viewMoreText}>Lihat Detail</span>
            <span className={styles.viewMoreLine} />
          </button>
        </div>
      </div>
    </section>
  );
}
