"use client";

import { useState, useCallback, useEffect } from "react";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Navigation from "@/components/navigation/Navigation";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ArtworkNav from "@/components/ui/ArtworkNav";
import ArtworkModal from "@/components/ui/ArtworkModal";
import AmbientAudio from "@/components/ui/AmbientAudio";
import Preloader from "@/components/ui/Preloader";
import HeroSection from "@/components/sections/HeroSection";
import ArtworkSection from "@/components/sections/ArtworkSection";
import AboutSection from "@/components/sections/AboutSection";
import { artworks, type Artwork } from "@/data/artworks";

/**
 * Museum Ruang Kosong — Main Page
 * Premium cinematic experience with loading screen,
 * floating nav, and fully animated sections.
 */
export default function Home() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleOpenDetail = useCallback((artwork: Artwork) => {
    setSelectedArtwork(artwork);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedArtwork(null);
  }, []);

  const scrollToSection = useCallback((index: number) => {
    const sectionIds = ["hero", ...artworks.map((a) => a.id), "tentang"];
    const targetId = sectionIds[index + 1];
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handlePrev = useCallback(() => {
    const newIndex = Math.max(0, currentIndex - 1);
    setCurrentIndex(newIndex);
    scrollToSection(newIndex);
  }, [currentIndex, scrollToSection]);

  const handleNext = useCallback(() => {
    const newIndex = Math.min(artworks.length - 1, currentIndex + 1);
    setCurrentIndex(newIndex);
    scrollToSection(newIndex);
  }, [currentIndex, scrollToSection]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedArtwork) return;
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        handlePrev();
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, selectedArtwork]);

  return (
    <SmoothScroll>
      {/* Cinematic Loading Screen */}
      {!loaded && <Preloader onComplete={handlePreloaderComplete} />}

      <CustomCursor />
      <Navigation />
      <ScrollProgress />
      <ArtworkNav
        currentIndex={currentIndex}
        total={artworks.length}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <AmbientAudio />

      <main>
        <HeroSection />

        <div id="pameran">
          {artworks.map((artwork, index) => (
            <ArtworkSection
              key={artwork.id}
              artwork={artwork}
              index={index}
              onOpenDetail={handleOpenDetail}
            />
          ))}
        </div>

        <AboutSection />
      </main>

      <ArtworkModal
        artwork={selectedArtwork}
        onClose={handleCloseDetail}
      />
    </SmoothScroll>
  );
}
