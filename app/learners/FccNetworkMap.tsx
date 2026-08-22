"use client";

import { useEffect, useRef, useState } from "react";
import type { LayerGroup, Map as LeafletMap, Marker } from "leaflet";

type MapPoint = {
  name: string;
  city: string;
  coordinates: [number, number];
  href?: string;
};

const yearPoints: Record<string, MapPoint[]> = {
  "2024": [
    {
      name: "无障碍辅助技术",
      city: "深圳 · SHENZHEN",
      coordinates: [22.777, 113.831],
      href: "https://mp.weixin.qq.com/s/aWcZJE8mJqzna5Y9m6qF5w",
    },
  ],
  "2025": [
    {
      name: "重建附近PBL月度行动",
      city: "深圳 · SHENZHEN",
      coordinates: [22.777353, 113.830834],
      href: "https://mp.weixin.qq.com/s/zGij1xPMS65e4_EPsqmYWQ",
    },
    {
      name: "数字建筑档案",
      city: "深圳 · SHENZHEN",
      coordinates: [22.5406, 113.9244],
      href: "https://mp.weixin.qq.com/s/SZeVwj9pGPBOO0w_KU63iA",
    },
    {
      name: "社区适老化设计",
      city: "成都 · CHENGDU",
      coordinates: [30.5814, 103.9624],
      href: "https://mp.weixin.qq.com/s/SZeVwj9pGPBOO0w_KU63iA",
    },
    {
      name: "FAB 25 Bridge The Gap",
      city: "捷克 · CZECHIA",
      coordinates: [49.1951, 16.6068],
      href: "https://fab25.fabevent.org/",
    },
  ],
  "2026": [
    {
      name: "Augmenting Biodiversity",
      city: "深圳 · SHENZHEN",
      coordinates: [22.5406, 113.9244],
      href: "https://litcheelab.super.site/fab-city-challenge-high-school/fab-city-challenge-high-school-2026/augmenting-biodiversity",
    },
    {
      name: "Roly-Poly 不倒翁(bù dǎo wēng)",
      city: "香港 · HONG KONG",
      coordinates: [22.3167, 114.1887],
      href: "https://litcheelab.super.site/fab-city-challenge-high-school/fab-city-challenge-high-school-2026/roly-poly-%e4%b8%8d%e5%80%92%e7%bf%81b-do-wng",
    },
    {
      name: "Recode Shiqiao",
      city: "广州 · GUANGZHOU",
      coordinates: [22.9378, 113.3657],
      href: "https://litcheelab.super.site/fab-city-challenge-high-school/fab-city-challenge-high-school-2026/recode-shiqiao",
    },
    {
      name: "Age-Friendly Community",
      city: "上海 · SHANGHAI",
      coordinates: [31.229, 121.448],
      href: "https://litcheelab.super.site/fab-city-challenge-high-school/fab-city-challenge-high-school-2026/challenge-gallery/age-friendly-community",
    },
    {
      name: "MIT",
      city: "波士顿 · BOSTON",
      coordinates: [42.3601, -71.0942],
      href: "https://fab26.fabevent.org/",
    },
  ],
};

const years = ["2026", "2025", "2024"];

export default function FccNetworkMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const layerRef = useRef<LayerGroup | null>(null);
  const markerRefs = useRef<Marker[]>([]);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [activeYear, setActiveYear] = useState("2026");
  const [activePoint, setActivePoint] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const mountMap = async () => {
      if (!containerRef.current || mapRef.current) return;
      const L = await import("leaflet");
      if (cancelled || !containerRef.current) return;

      leafletRef.current = L;
      const map = L.map(containerRef.current, {
        center: [31, 105],
        zoom: 3,
        minZoom: 2,
        maxZoom: 17,
        scrollWheelZoom: false,
        zoomControl: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);
      L.control.zoom({ position: "bottomright" }).addTo(map);

      mapRef.current = map;
      layerRef.current = L.layerGroup().addTo(map);
      window.setTimeout(() => map.invalidateSize(), 0);
      setMapReady(true);
    };

    mountMap();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      layerRef.current = null;
      markerRefs.current = [];
    };
  }, []);

  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!L || !map || !layer) return;

    const points = yearPoints[activeYear];
    layer.clearLayers();
    markerRefs.current = [];

    points.forEach((point, index) => {
      const marker = L.marker(point.coordinates, {
        title: point.name,
        icon: L.divIcon({
          className: "fcc-network-pin",
          html: `<span><b>${String(index + 1).padStart(2, "0")}</b></span>`,
          iconAnchor: [18, 42],
          popupAnchor: [0, -38],
        }),
      });

      const popupLink = point.href
        ? `<a href="${point.href}" target="_blank" rel="noopener noreferrer">了解项目 ↗</a>`
        : "";
      marker.bindPopup(
        `<div class="fcc-map-popup"><span>${activeYear} · ${point.city}</span><strong>${point.name}</strong>${popupLink}</div>`,
        { closeButton: false, offset: [0, -2] },
      );
      marker.on("click", () => setActivePoint(index));
      marker.addTo(layer);
      markerRefs.current.push(marker);
    });

    if (points.length === 1) {
      map.setView(points[0].coordinates, 12, { animate: true });
      markerRefs.current[0]?.openPopup();
    } else {
      map.fitBounds(L.latLngBounds(points.map((point) => point.coordinates)), {
        padding: [54, 54],
        maxZoom: 10,
        animate: true,
      });
    }
    setActivePoint(0);
  }, [activeYear, mapReady]);

  const focusPoint = (index: number) => {
    const point = yearPoints[activeYear][index];
    if (!point || !mapRef.current) return;
    setActivePoint(index);
    mapRef.current.flyTo(point.coordinates, Math.max(mapRef.current.getZoom(), 11), { duration: 0.75 });
    markerRefs.current[index]?.openPopup();
  };

  return (
    <div className="fcc-network-map">
      <div className="fcc-map-years" aria-label="选择 FCC HS 年份">
        <span>SELECT YEAR</span>
        <div>
          {years.map((year) => (
            <button
              type="button"
              key={year}
              className={year === activeYear ? "active" : undefined}
              aria-pressed={year === activeYear}
              onClick={() => setActiveYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      <div className="fcc-map-layout">
        <div className="fcc-map-canvas" ref={containerRef} aria-label={`${activeYear} 年 FCC HS 行动地点地图`} />
        <div className="fcc-map-locations" aria-live="polite">
          <div className="fcc-map-list-heading">
            <span>{activeYear}</span>
            <strong>{yearPoints[activeYear].length} 个行动节点</strong>
          </div>
          <div className="fcc-map-list">
            {yearPoints[activeYear].map((point, index) => {
              const content = (
                <>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><strong>{point.name}</strong><small>{point.city}</small></div>
                  <b aria-hidden="true">↗</b>
                </>
              );

              return point.href ? (
                <a
                  key={`${activeYear}-${point.name}`}
                  className={`fcc-map-list-item${index === activePoint ? " active" : ""}`}
                  href={point.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${point.name}，打开项目文章`}
                >
                  {content}
                </a>
              ) : (
                <button
                  type="button"
                  key={`${activeYear}-${point.name}`}
                  className={`fcc-map-list-item${index === activePoint ? " active" : ""}`}
                  onClick={() => focusPoint(index)}
                >
                  {content}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
