"use client";

import { useEffect, useRef, useState } from "react";

type Stage = {
  level: string;
  name: string;
  focus: string;
  text: string;
  evidence: string;
};

const stagePages = [
  [
    { src: "/assets/learners/jr/basic-p08.jpg", label: "课程与工具" },
    { src: "/assets/learners/jr/basic-p09.jpg", label: "地球之肺 · 项目案例" },
  ],
  [
    { src: "/assets/learners/jr/collaboration-p10.jpg", label: "社区与赛事" },
    { src: "/assets/learners/jr/collaboration-p11.jpg", label: "火星基地 · 项目案例" },
  ],
  [
    { src: "/assets/learners/jr/exploration-p12.jpg", label: "个性化项目" },
    { src: "/assets/learners/jr/exploration-p13.jpg", label: "智慧种植系统 · 项目案例" },
  ],
];

export default function JrStageCarousel({ stages }: { stages: Stage[] }) {
  return (
    <div className="jr-stage-modules">
      {stages.map((stage, index) => <StageModule stage={stage} pages={stagePages[index]} index={index} key={stage.name} />)}
    </div>
  );
}

function StageModule({ stage, pages, index }: { stage: Stage; pages: { src: string; label: string }[]; index: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [lightbox]);

  const goTo = (nextIndex: number) => {
    const next = Math.max(0, Math.min(1, nextIndex));
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: track.clientWidth * next, behavior: "smooth" });
    setActive(next);
  };

  const syncActive = () => {
    const track = trackRef.current;
    if (!track) return;
    setActive(Math.round(track.scrollLeft / track.clientWidth));
  };

  return (
    <article className={`jr-stage-module stage-${index + 1}`} id={["jr-basic", "jr-collaboration", "jr-exploration"][index]}>
      <div className="jr-stage-module-head">
        <div><small>{stage.level}</small><h3>{stage.name}</h3><strong>{stage.focus}</strong></div>
        <p>{stage.text}</p>
        <div className="jr-stage-module-evidence"><b>可见成果</b><span>{stage.evidence}</span></div>
      </div>

      <div className="jr-stage-module-frame">
        <div className="jr-stage-module-track" ref={trackRef} onScroll={syncActive}>
          {pages.map((page) => (
            <figure key={page.src}>
              <button type="button" className="jr-stage-image-button" onClick={() => setLightbox(page)} aria-label={`放大查看${stage.name}：${page.label}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={page.src} alt={`${stage.name}：${page.label}`} />
                <span aria-hidden="true">点击查看大图 ＋</span>
              </button>
              <figcaption>{stage.name} · {page.label}</figcaption>
            </figure>
          ))}
        </div>
        <button type="button" className="jr-stage-arrow prev" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label={`查看${stage.name}上一项内容`}>←</button>
        <button type="button" className="jr-stage-arrow next" onClick={() => goTo(active + 1)} disabled={active === 1} aria-label={`查看${stage.name}下一项内容`}>→</button>
      </div>

      <div className="jr-stage-module-nav">
        {pages.map((page, pageIndex) => (
          <button type="button" className={pageIndex === active ? "active" : ""} onClick={() => goTo(pageIndex)} key={page.src} aria-current={pageIndex === active ? "page" : undefined}>
            <span>0{pageIndex + 1}</span>{page.label}
          </button>
        ))}
      </div>

      {lightbox && (
        <div className="jr-image-lightbox" role="dialog" aria-modal="true" aria-label={`${stage.name}：${lightbox.label}大图`} onClick={() => setLightbox(null)}>
          <button type="button" className="jr-lightbox-close" onClick={() => setLightbox(null)} aria-label="关闭大图">×</button>
          <div className="jr-lightbox-content" onClick={(event) => event.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lightbox.src} alt={`${stage.name}：${lightbox.label}`} />
            <p>{stage.name} · {lightbox.label}</p>
          </div>
        </div>
      )}
    </article>
  );
}
