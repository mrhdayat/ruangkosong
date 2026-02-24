"use client";

import styles from "./ArtworkNav.module.css";

interface ArtworkNavProps {
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

/**
 * ArtworkNav
 * Fixed next/prev buttons at bottom corners.
 * Thin arrow strokes, keyboard accessible.
 */
export default function ArtworkNav({
  currentIndex,
  total,
  onPrev,
  onNext,
}: ArtworkNavProps) {
  return (
    <div className={styles.nav} aria-label="Navigasi karya seni">
      <button
        className={styles.button}
        onClick={onPrev}
        disabled={currentIndex <= 0}
        aria-label="Karya sebelumnya"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 6L9 12L15 18"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </button>

      <span className={styles.counter}>
        {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>

      <button
        className={styles.button}
        onClick={onNext}
        disabled={currentIndex >= total - 1}
        aria-label="Karya berikutnya"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 6L15 12L9 18"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </button>
    </div>
  );
}
