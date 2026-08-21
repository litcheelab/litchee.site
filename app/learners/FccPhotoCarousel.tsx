"use client";

import { useEffect, useRef, useState } from "react";

const photos = [
  {
    src: "/assets/learners/fcc/community-fieldwork.jpg",
    alt: "FCC HS 学生与教育者走进社区家庭，与长者共同调研",
    label: "走进社区",
    caption: "从居民的真实生活出发，理解问题发生的场景。",
    position: "center",
  },
  {
    src: "/assets/learners/fcc/technology-making-2026-clean.png",
    alt: "FCC HS 学生使用可穿戴科技装置制作并演示项目原型",
    label: "科技创作",
    caption: "使用数字制造、电子与编程工具，把调研中的想法做成可以测试的原型。",
    position: "center 42%",
  },
  {
    src: "/assets/learners/fcc/prototype-testing-2026-clean.png",
    alt: "FCC HS 学生佩戴并测试自己制作的辅助装置原型",
    label: "原型测试",
    caption: "让想法变成可体验的作品，再用真实反馈推动下一轮迭代。",
    position: "center 38%",
  },
  {
    src: "/assets/learners/fcc/public-sharing.jpg",
    alt: "FCC HS 学生在公共空间向伙伴介绍项目成果",
    label: "公开展示",
    caption: "把研究与制作过程带到公众面前，在提问中重新审视方案。",
    position: "center 42%",
  },
  {
    src: "/assets/learners/fcc/global-dialogue-2026.jpg",
    alt: "来自不同城市与国家的 Fab City 学习者和教育者共同参加结业交流",
    label: "跨城连接",
    caption: "让每一个本地行动进入更大的对话，看到彼此面对的共同未来。",
    position: "center",
  },
];

export default function FccPhotoCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % photos.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [active, paused]);

  const move = (direction: number) => {
    setActive((current) => (current + direction + photos.length) % photos.length);
  };

  const handleTouchEnd = (x: number) => {
    if (touchStart.current === null) return;
    const distance = x - touchStart.current;
    if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
    touchStart.current = null;
  };

  const photo = photos[active];

  return (
    <div
      className="fcc-carousel"
      aria-roledescription="轮播"
      aria-label="Fab City Challenge High School 项目现场"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <figure
        className="fcc-carousel-stage"
        onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
        onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo.src} alt={photo.alt} style={{ objectPosition: photo.position }} />
        <figcaption aria-live="polite">
          <span>{String(active + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span>
          <div><strong>{photo.label}</strong><p>{photo.caption}</p></div>
        </figcaption>
        <button className="fcc-carousel-arrow prev" type="button" onClick={() => move(-1)} aria-label="上一张 FCC 照片">←</button>
        <button className="fcc-carousel-arrow next" type="button" onClick={() => move(1)} aria-label="下一张 FCC 照片">→</button>
      </figure>

      <div className="fcc-carousel-nav" aria-label="选择 FCC 照片">
        {photos.map((item, index) => (
          <button
            className={index === active ? "active" : undefined}
            type="button"
            key={item.src}
            onClick={() => setActive(index)}
            aria-label={`查看第 ${index + 1} 张：${item.label}`}
            aria-current={index === active ? "true" : undefined}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.src} alt="" style={{ objectPosition: item.position }} />
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item.label}</strong>
          </button>
        ))}
      </div>
      <p className="fcc-carousel-hint">点击缩略图或左右滑动，继续查看 FCC 现场。</p>
    </div>
  );
}
