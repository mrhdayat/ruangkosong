"use client";

import { useRef, useState, useEffect } from "react";
import styles from "./AmbientAudio.module.css";

/**
 * AmbientAudio
 * Optional gallery ambient sound toggle.
 * Fixed at bottom-right corner. Minimal icon.
 */
export default function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const toggleAudio = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  const startAudio = () => {
    try {
      const ctx = new AudioContext();
      audioContextRef.current = ctx;

      // Generate very subtle white noise (gallery ambience)
      const bufferSize = ctx.sampleRate * 4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.015;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const gain = ctx.createGain();
      gain.gain.value = 0;
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 2);

      // Low-pass filter for muffled gallery sound
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 400;
      filter.Q.value = 0.5;

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();

      noiseNodeRef.current = noise;
      gainNodeRef.current = gain;
      setIsPlaying(true);
    } catch {
      // Audio API not available
    }
  };

  const stopAudio = () => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(
        0,
        audioContextRef.current.currentTime + 1
      );
      setTimeout(() => {
        noiseNodeRef.current?.stop();
        audioContextRef.current?.close();
        audioContextRef.current = null;
        noiseNodeRef.current = null;
        gainNodeRef.current = null;
      }, 1100);
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => {
      noiseNodeRef.current?.stop();
      audioContextRef.current?.close();
    };
  }, []);

  return (
    <button
      className={`${styles.toggle} ${isPlaying ? styles.active : ""}`}
      onClick={toggleAudio}
      aria-label={isPlaying ? "Matikan audio ambient" : "Nyalakan audio ambient"}
      title="Audio ambient"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className={styles.icon}
      >
        <path
          d="M2 5.5H4.5L8 2V14L4.5 10.5H2V5.5Z"
          stroke="currentColor"
          strokeWidth="1"
          fill={isPlaying ? "currentColor" : "none"}
        />
        {isPlaying && (
          <>
            <path
              d="M10.5 5.5C11.3 6.3 11.8 7.4 11.8 8.5C11.8 9.6 11.3 10.7 10.5 11.5"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M12.5 3.5C14 5 14.8 6.8 14.8 8.5C14.8 10.2 14 12 12.5 13.5"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
            />
          </>
        )}
      </svg>
    </button>
  );
}
