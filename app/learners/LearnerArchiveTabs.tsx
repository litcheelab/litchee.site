"use client";

import { useCallback, useEffect, useState } from "react";

type ArchiveTab = {
  id: string;
  number: string;
  age: string;
  label: string;
  name: string;
  image: string;
  alt: string;
  description: string;
};

type LearnerArchiveTabsProps = {
  eyebrow: string;
  title: string;
  intro: string;
  tabs: ArchiveTab[];
};

const archiveIds = ["litchee-jr", "fcc-hs", "litchee-academy"];

function archiveIdFromHash(hash: string) {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  if (!id) return null;
  if (id === "litchee-jr" || id.startsWith("jr-")) return "litchee-jr";
  if (id === "fcc-hs" || id.startsWith("fcc-")) return "fcc-hs";
  if (id === "litchee-academy" || id.startsWith("academy-")) return "litchee-academy";
  return null;
}

function BilingualArchiveName({ name }: { name: string }) {
  const [chinese, english] = name.split(" / ");
  return <>{chinese}{english ? <><br /><span className="stage-name-en">{english}</span></> : null}</>;
}

export default function LearnerArchiveTabs({ eyebrow, title, intro, tabs }: LearnerArchiveTabsProps) {
  const [activeId, setActiveId] = useState("litchee-jr");

  const showArchive = useCallback((nextId: string) => {
    if (!archiveIds.includes(nextId)) return;
    setActiveId(nextId);
    document.querySelectorAll<HTMLElement>("[data-learner-archive-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.learnerArchivePanel !== nextId;
    });
  }, []);

  const syncFromLocation = useCallback((shouldScroll: boolean) => {
    const hash = window.location.hash;
    const nextId = archiveIdFromHash(hash);
    if (!nextId) return;
    showArchive(nextId);

    if (shouldScroll) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const targetId = decodeURIComponent(hash.replace(/^#/, ""));
          document.getElementById(targetId)?.scrollIntoView({ block: "start" });
        });
      });
    }
  }, [showArchive]);

  useEffect(() => {
    const initialSyncFrame = window.requestAnimationFrame(() => {
      syncFromLocation(Boolean(window.location.hash));
    });
    const handleHistoryChange = () => syncFromLocation(true);
    window.addEventListener("hashchange", handleHistoryChange);
    window.addEventListener("popstate", handleHistoryChange);
    return () => {
      window.cancelAnimationFrame(initialSyncFrame);
      window.removeEventListener("hashchange", handleHistoryChange);
      window.removeEventListener("popstate", handleHistoryChange);
    };
  }, [syncFromLocation]);

  const selectArchive = (id: string) => {
    showArchive(id);
    window.history.pushState({ learnerArchive: id }, "", `${window.location.pathname}${window.location.search}#${id}`);
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <section className="learners-hero" id="learners-top">
      <div className="hero-copy">
        <div className="hero-heading">
          <p>{eyebrow}</p>
          <h1>{title}</h1>
          <div className="hero-rule" />
        </div>
        <p className="hero-intro">{intro}</p>
      </div>
      <div className="learner-archive-label" aria-hidden="true">
        <span>LEARNER FILES</span>
        <small>选择一份成长档案</small>
      </div>
      <nav className="learner-personas learner-archive-tabs" aria-label="三类学习者成长档案" role="tablist">
        {tabs.map((tab, index) => {
          const isActive = activeId === tab.id;
          return (
            <button
              className={`learner-persona learner-persona-${index + 1} learner-archive-tab${isActive ? " is-active" : ""}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`learner-archive-${tab.id}`}
              onClick={() => selectArchive(tab.id)}
              key={tab.id}
            >
              <div className="learner-persona-visual">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tab.image} alt={tab.alt} />
              </div>
              <div className="learner-persona-copy">
                <div className="learner-persona-meta">
                  <span>{tab.number}</span>
                  <small>{tab.age}</small>
                </div>
                <p>{tab.label}</p>
                <strong><BilingualArchiveName name={tab.name} /></strong>
                <span className="learner-persona-description">{tab.description}</span>
                <em>{isActive ? "正在阅读" : "打开档案"} <b aria-hidden="true">{isActive ? "↓" : "↘"}</b></em>
              </div>
            </button>
          );
        })}
      </nav>
    </section>
  );
}
