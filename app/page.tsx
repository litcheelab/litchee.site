"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { sections, type SectionKey } from "../content/sections";
export default function Home() {
  const [activeKey, setActiveKey] = useState<SectionKey | null>(null);
  const [hoveredKey, setHoveredKey] = useState<SectionKey | null>(null);
  const [slide, setSlide] = useState(0);
  const [presentation, setPresentation] = useState(false);
  const [portraitPan, setPortraitPan] = useState(1);
  const touchStartX = useRef<number | null>(null);
  const active = useMemo(() => sections.find((item) => item.key === activeKey) ?? null, [activeKey]);
  const focus = sections.find((item) => item.key === (activeKey ?? hoveredKey)) ?? null;
  const panPositions = [0, 0.5, 1];
  const pan = panPositions[portraitPan];

  const movePortraitPan = (direction: 1 | -1) => {
    setPortraitPan((current) => Math.max(0, Math.min(panPositions.length - 1, current + direction)));
  };

  const openSection = (key: SectionKey, asPresentation = false) => {
    setActiveKey(key);
    setHoveredKey(null);
    setSlide(0);
    if (asPresentation) setPresentation(true);
  };

  const closeSection = () => {
    setActiveKey(null);
    setSlide(0);
    setPresentation(false);
  };

  const moveSlide = (direction: 1 | -1) => {
    if (!active) return;
    const next = slide + direction;
    if (next >= 0 && next < active.slides.length) {
      setSlide(next);
      return;
    }
    if (presentation && direction === 1) {
      const sectionIndex = sections.findIndex((item) => item.key === active.key);
      const nextSection = sections[sectionIndex + 1];
      if (nextSection) openSection(nextSection.key, true);
      else closeSection();
    }
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSection();
      if (event.key === "ArrowRight" || event.key === " ") moveSlide(1);
      if (event.key === "ArrowLeft") moveSlide(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <main className={`site-shell ${active ? "is-open" : ""} ${presentation ? "is-presenting" : ""}`}>
      <header className="topbar">
        <a className="brand" href="#" aria-label="Litchee Lab home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/litchee-lab-bilingual-logo-v3-transparent.png" alt="南荔科创教育 Litchee Lab" />
        </a>
        <div className="top-actions">
          <button className="presentation-button" onClick={() => openSection("learners", true)}>
            <span className="play">▶</span> 开始导览
          </button>
          <button className="menu-button" aria-label="Open navigation"><span /><span /></button>
        </div>
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
              className={`hotspot hotspot-${item.key} ${activeKey === item.key ? "is-active" : ""}`}
              style={{
                "--hotspot-x": `${item.x}%`,
                "--hotspot-y": `${item.y}%`,
                "--hotspot-portrait-left": `calc(${pan * 100}vw + ${(item.x - pan * 100) * 1.77778}svh)`,
              } as React.CSSProperties}
              onMouseEnter={() => !active && setHoveredKey(item.key)}
              onMouseLeave={() => setHoveredKey(null)}
            >
              {item.key === "learners" ? (
                <a
                  className="hotspot-trigger"
                  href={item.href}
                  onFocus={() => !active && setHoveredKey(item.key)}
                  onBlur={() => setHoveredKey(null)}
                  aria-label="进入学习者项目页面"
                >
                  <span className="pulse" />
                </a>
              ) : (
                <button
                  type="button"
                  className="hotspot-trigger"
                  onFocus={() => !active && setHoveredKey(item.key)}
                  onBlur={() => setHoveredKey(null)}
                  onClick={() => openSection(item.key)}
                  aria-label={`Explore ${item.title}`}
                >
                  <span className="pulse" />
                </button>
              )}
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
            <button key={item.key} className={activeKey === item.key ? "active" : ""} onClick={() => openSection(item.key)}>
              <span>{item.index}</span>{item.title}
            </button>
          ))}
        </div>
      </section>

      <aside className="story-panel" aria-hidden={!active} aria-live="polite">
        {active && (
          <>
            <div className="panel-head">
              <div><span>{active.index}</span><strong>{active.title}</strong></div>
              <div className="panel-head-actions">
                <span>{String(slide + 1).padStart(2, "0")} / {String(active.slides.length).padStart(2, "0")}</span>
                <button onClick={closeSection} aria-label="Close story panel">×</button>
              </div>
            </div>

            <div className="slides-window">
              <div className="slides-track" style={{ transform: `translateX(-${slide * 100}%)` }}>
                {active.slides.map((item, index) => (
                  <article className="story-slide" key={`${active.key}-${index}`}>
                    <div className={`slide-visual visual-${active.key}`}>
                      <div className="visual-number">{active.index}</div>
                      <div className="visual-orbit orbit-one" />
                      <div className="visual-orbit orbit-two" />
                      <span>{item.eyebrow}</span>
                    </div>
                    <div className="slide-copy">
                      <p>{item.eyebrow}</p>
                      <h2>{item.title}</h2>
                      <div className="red-rule" />
                      <p className="body-copy">{item.body}</p>
                      {item.points && <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>}
                      {item.metric && (
                        <div className="metrics">
                          {item.metric.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}
                        </div>
                      )}
                      {item.action && <a className="primary-link" href={active.href}>{item.action}<span>↗</span></a>}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="panel-footer">
              <div className="dots">
                {active.slides.map((_, index) => <button key={index} className={slide === index ? "active" : ""} onClick={() => setSlide(index)} aria-label={`Go to slide ${index + 1}`} />)}
              </div>
              <div className="slide-controls">
                <button onClick={() => moveSlide(-1)} disabled={slide === 0} aria-label="Previous slide">←</button>
                <button onClick={() => moveSlide(1)} aria-label="Next slide">→</button>
              </div>
            </div>
          </>
        )}
      </aside>

      <div className="mobile-backdrop" onClick={closeSection} />
    </main>
  );
}
