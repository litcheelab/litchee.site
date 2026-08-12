"use client";

import { useRef, useState } from "react";

import { sections } from "../content/sections";
export default function Home() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [portraitPan, setPortraitPan] = useState(1);
  const touchStartX = useRef<number | null>(null);
  const focus = sections.find((item) => item.key === hoveredKey) ?? null;
  const panPositions = [0, 0.5, 1];
  const pan = panPositions[portraitPan];

  const movePortraitPan = (direction: 1 | -1) => {
    setPortraitPan((current) => Math.max(0, Math.min(panPositions.length - 1, current + direction)));
  };

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Litchee Lab home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/litchee-lab-bilingual-logo-v3-transparent.png" alt="南荔科创教育 Litchee Lab" />
        </a>
      </header>

      <section
        className="map-stage"
        aria-label="Explore Litchee Lab"
        onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }}
        onTouchEnd={(event) => {
          if (touchStartX.current === null) return;
          const delta = event.changedTouches[0]?.clientX - touchStartX.current;
          touchStartX.current = null;
          if (Math.abs(delta) < 45) return;
          movePortraitPan(delta < 0 ? 1 : -1);
        }}
      >
        <div
          className={`map-canvas ${focus ? "has-focus" : ""}`}
          style={{
            "--focus-x": `${focus?.x ?? 50}%`,
            "--focus-y": `${focus?.y ?? 50}%`,
            "--portrait-position": `${pan * 100}%`,
          } as React.CSSProperties}
        >
          {/* One flat-colour artboard; the active section controls its regional camera crop. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="map-image flat-image"
            src="/assets/litchee-map-flat.png"
            alt="An open Fab Lab with learners, educators, community visitors, researchers and the Litchee Lab team"
          />
        </div>

        <div className="intro-copy">
          <p>欢迎来到我们的数字实验室</p>
          <h1 className="hero-title"><span>看见</span><span>创造</span><span>连接</span></h1>
          <div className="slogan-en">SEE · MAKE · CONNECT</div>
          <span>将鼠标移到人物上，开始探索。</span>
        </div>

        <nav className="hotspots" aria-label="Litchee Lab perspectives">
          {sections.map((item) => (
            <div
              key={item.key}
              className={`hotspot hotspot-${item.key}`}
              style={{
                "--hotspot-x": `${item.x}%`,
                "--hotspot-y": `${item.y}%`,
                "--hotspot-portrait-left": `calc(${pan * 100}vw + ${(item.x - pan * 100) * 1.77778}svh)`,
              } as React.CSSProperties}
              onMouseEnter={() => setHoveredKey(item.key)}
              onMouseLeave={() => setHoveredKey(null)}
            >
              <a
                className="hotspot-trigger"
                href={item.href}
                onFocus={() => setHoveredKey(item.key)}
                onBlur={() => setHoveredKey(null)}
                aria-label={`进入${item.title}页面`}
              >
                <span className="pulse" />
              </a>
              <span className="hotspot-card">
                <small>{item.index} · {item.label}</small>
                <strong>{item.title}</strong>
                <em>{item.intro}</em>
                <a href={item.href}>Explore ↗</a>
              </span>
            </div>
          ))}
        </nav>

        <div className="pan-controls" aria-label="左右移动场景">
          <button onClick={() => movePortraitPan(-1)} disabled={portraitPan === 0} aria-label="向左探索">‹</button>
          <span>{portraitPan + 1} / 3</span>
          <button onClick={() => movePortraitPan(1)} disabled={portraitPan === 2} aria-label="向右探索">›</button>
        </div>

        <div className="chapter-rail" aria-label="Direct navigation">
          {sections.map((item) => (
            <a key={item.key} href={item.href}>
              <span>{item.index}</span>{item.title}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
