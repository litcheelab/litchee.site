"use client";

import { useState } from "react";

type Video = {
  title: string;
  embedUrl: string;
};

export default function FccVideoPlaylist({ year, videos }: { year: string; videos: Video[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeVideo = videos[activeIndex] ?? videos[0];

  if (!activeVideo) return null;

  return (
    <div className={`fcc-video-playlist${videos.length > 1 ? " has-playlist" : ""}`}>
      <figure className="fcc-video-player">
        <div className="fcc-video-frame">
          <iframe
            key={activeVideo.embedUrl}
            src={activeVideo.embedUrl}
            title={activeVideo.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <figcaption><span>NOW PLAYING</span><strong>{activeVideo.title}</strong></figcaption>
      </figure>

      {videos.length > 1 && (
        <div className="fcc-video-episodes" aria-label={`${year} 年回顾视频节目单`}>
          <p>PLAYLIST · {String(videos.length).padStart(2, "0")}</p>
          <div>
            {videos.map((video, index) => (
              <button
                type="button"
                key={video.embedUrl}
                className={index === activeIndex ? "active" : undefined}
                aria-pressed={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{video.title}</strong>
                <b aria-hidden="true">{index === activeIndex ? "▶" : "→"}</b>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
