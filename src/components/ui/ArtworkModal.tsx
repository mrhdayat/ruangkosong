"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { Artwork } from "@/data/artworks";
import styles from "./ArtworkModal.module.css";

interface ArtworkModalProps {
  artwork: Artwork | null;
  onClose: () => void;
}

/**
 * ArtworkModal
 * Full-screen modal with backdrop blur and scale-up entrance.
 * Close with Escape key or clicking outside.
 */
export default function ArtworkModal({ artwork, onClose }: ArtworkModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!artwork) return;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    // Animate in
    const animateIn = async () => {
      const { gsap } = await import("gsap");
      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: "power2.out" }
        );
      }
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.1 }
        );
      }
    };
    animateIn();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [artwork, handleKeyDown]);

  if (!artwork) return null;

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={artwork.title}
    >
      <div ref={contentRef} className={styles.content}>
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Tutup"
        >
          ✕
        </button>

        <div className={styles.layout}>
          <div className={styles.imageWrap}>
            <Image
              src={artwork.image}
              alt={artwork.title}
              fill
              sizes="50vw"
              className={styles.image}
            />
          </div>

          <div className={styles.info}>
            <h2 className={styles.title}>{artwork.title}</h2>
            <p className={styles.artist}>{artwork.artist}</p>

            <div className={styles.details}>
              <div className={styles.detailRow}>
                <span className={styles.label}>Tahun</span>
                <span className={styles.value}>{artwork.year}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Medium</span>
                <span className={styles.value}>{artwork.medium}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.label}>Dimensi</span>
                <span className={styles.value}>{artwork.dimensions}</span>
              </div>
            </div>

            <p className={styles.description}>{artwork.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
