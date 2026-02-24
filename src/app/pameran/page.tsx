"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Navigation from "@/components/navigation/Navigation";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ArtworkModal from "@/components/ui/ArtworkModal";
import { artworks, type Artwork } from "@/data/artworks";
import styles from "./pameran.module.css";

export default function PameranPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    const animate = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const el = pageRef.current;
      if (!el) return;

      // Page title reveal
      const titleChars = el.querySelectorAll(`.${styles.titleChar}`);
      gsap.fromTo(
        titleChars,
        { y: "120%", rotateX: -80, opacity: 0 },
        {
          y: "0%",
          rotateX: 0,
          opacity: 1,
          duration: 1.4,
          stagger: 0.04,
          delay: 0.5,
          ease: "power4.out",
        }
      );

      // Subtitle blur-in
      const subtitle = el.querySelector(`.${styles.subtitle}`);
      gsap.fromTo(
        subtitle,
        { opacity: 0, y: 30, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5, delay: 1, ease: "power2.out" }
      );

      // Grid items — staggered entrance
      const gridItems = el.querySelectorAll(`.${styles.gridItem}`);
      gridItems.forEach((item, i) => {
        const img = item.querySelector(`.${styles.itemImage}`);
        const info = item.querySelector(`.${styles.itemInfo}`);

        gsap.fromTo(
          img,
          { clipPath: "inset(100% 0% 0% 0%)", scale: 1.2 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.6,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        gsap.fromTo(
          info,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    };

    animate();
  }, []);

  const titleChars = "PAMERAN".split("").map((char, i) => (
    <span key={i} className={styles.titleCharWrap}>
      <span className={styles.titleChar}>{char}</span>
    </span>
  ));

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navigation />
      <ScrollProgress />

      <div ref={pageRef} className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>{titleChars}</h1>
          <p className={styles.subtitle}>
            Koleksi karya seni kontemporer yang mengeksplorasi kekuatan
            ruang kosong dan keheningan visual.
          </p>
        </header>

        <div className={styles.grid}>
          {artworks.map((artwork, index) => (
            <button
              key={artwork.id}
              className={`${styles.gridItem} ${index % 3 === 1 ? styles.gridItemTall : ""
                }`}
              onClick={() => setSelectedArtwork(artwork)}
            >
              <div className={styles.itemImage}>
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.img}
                />
              </div>
              <div className={styles.itemInfo}>
                <span className={styles.itemIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.itemTitle}>{artwork.title}</h3>
                <p className={styles.itemArtist}>{artwork.artist}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <ArtworkModal
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
      />
    </SmoothScroll>
  );
}
