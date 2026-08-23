"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const personas = [
  {
    src: "/assets/learners/personas/litchee-jr.png",
    alt: "正在观察鸟类与自然环境的小荔枝学习者",
  },
  {
    src: "/assets/learners/personas/fcc-hs.png",
    alt: "正在社区中行动的城市智造挑战学习者",
  },
  {
    src: "/assets/learners/personas/litchee-academy.png",
    alt: "正在研究具身智能的荔行科创计划学习者",
  },
];

export default function Development404() {
  const [personaIndex, setPersonaIndex] = useState(0);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setPersonaIndex(Math.floor(Math.random() * personas.length));
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const persona = personas[personaIndex];

  return (
    <main className="development-page">
      <Link className="development-brand" href="/" aria-label="返回 Litchee Lab 首页">
        <Image
          src="/assets/litchee-lab-bilingual-logo-v3-transparent.png"
          alt="Litchee Lab"
          width={935}
          height={167}
          priority
        />
      </Link>

      <section className="development-content">
        <div className="development-copy">
          <p className="development-code">404 · STILL MAKING</p>
          <h1>努力开发中</h1>
          <p className="development-note">
            这个空间还在生长。先回到首页，或者去看看已经开放的学习者项目。
          </p>
          <nav className="development-actions" aria-label="页面导航">
            <Link className="development-primary" href="/">
              返回首页 <span aria-hidden="true">↗</span>
            </Link>
            <Link className="development-secondary" href="/learners">
              看看学习者页面 <span aria-hidden="true">→</span>
            </Link>
          </nav>
        </div>

        <div className="development-persona" aria-live="polite">
          <Image
            key={persona.src}
            src={persona.src}
            alt={persona.alt}
            width={1092}
            height={953}
            priority
          />
        </div>
      </section>

      <p className="development-footer">SEE · MAKE · CONNECT</p>
    </main>
  );
}
