"use client";

import { useEffect, useRef, useState } from "react";

type Poster = {
  city: string;
  title: string;
  src: string;
};

type Direction = "next" | "prev";

export default function FccPosterFlipbook({ posters }: { posters: Poster[] }) {
  const [index, setIndex] = useState(0);
  const [turning, setTurning] = useState<Direction | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartRef = useRef<number | null>(null);

  const move = (direction: Direction) => {
    if (turning || posters.length < 2) return;

    const nextIndex = direction === "next"
      ? (index + 1) % posters.length
      : (index - 1 + posters.length) % posters.length;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIndex(nextIndex);
      return;
    }

    setTurning(direction);
    timerRef.current = setTimeout(() => {
      setIndex(nextIndex);
      setTurning(null);
    }, 560);
  };

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const revealIndex = turning === "prev"
    ? (index - 1 + posters.length) % posters.length
    : (index + 1) % posters.length;
  const current = posters[index];
  const revealed = posters[revealIndex];

  return (
    <div className="fcc-flipbook" aria-label="FCC HS 2025 深圳与成都海报翻页册">
      <button
        className="fcc-flipbook-stage"
        type="button"
        aria-label={`翻到下一张海报；当前为${current.city}`}
        onClick={() => move("next")}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") move("next");
          if (event.key === "ArrowLeft") move("prev");
        }}
        onTouchStart={(event) => { touchStartRef.current = event.touches[0]?.clientX ?? null; }}
        onTouchEnd={(event) => {
          const start = touchStartRef.current;
          const end = event.changedTouches[0]?.clientX;
          touchStartRef.current = null;
          if (start == null || end == null || Math.abs(start - end) < 38) return;
          move(start > end ? "next" : "prev");
        }}
      >
        <span className="fcc-flip-page fcc-flip-page-back" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={revealed.src} alt="" />
        </span>
        <span className={`fcc-flip-page fcc-flip-page-front${turning ? ` is-turning-${turning}` : ""}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={current.src} alt={current.title} />
        </span>
        <span className="fcc-flipbook-corner" aria-hidden="true">↗</span>
      </button>

      <div className="fcc-flipbook-meta" aria-live="polite">
        <div><span>2025 POSTER</span><strong>{current.city}</strong></div>
        <div className="fcc-flipbook-controls">
          <button type="button" onClick={() => move("prev")} aria-label="上一张海报">←</button>
          <span>{index + 1} / {posters.length}</span>
          <button type="button" onClick={() => move("next")} aria-label="下一张海报">→</button>
        </div>
      </div>
      <a className="fcc-flipbook-open" href={current.src} target="_blank" rel="noreferrer">查看完整海报 ↗</a>
    </div>
  );
}
