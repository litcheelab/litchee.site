import { load } from "js-yaml";
import aboutSource from "./sections/about.md?raw";
import educatorsSource from "./sections/educators.md?raw";
import learnersSource from "./sections/learners.md?raw";
import publicSource from "./sections/public.md?raw";
import researchSource from "./sections/research.md?raw";
import type { Section, SectionKey, Slide } from "./types";

export type { Section, SectionKey, Slide } from "./types";

const validKeys: SectionKey[] = ["learners", "educators", "public", "research", "about"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireString(record: Record<string, unknown>, field: string, file: string) {
  const value = record[field];
  if (typeof value !== "string" || !value.trim()) throw new Error(`${file}: “${field}” 必须是非空文字`);
  return value;
}

function parseSection(source: string, file: string): Section {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) throw new Error(`${file}: 缺少 YAML front matter`);
  const value: unknown = load(match[1]);
  if (!isRecord(value)) throw new Error(`${file}: front matter 格式无效`);

  const key = requireString(value, "key", file) as SectionKey;
  if (!validKeys.includes(key)) throw new Error(`${file}: “key” 不是有效区域`);
  if (typeof value.x !== "number" || typeof value.y !== "number") throw new Error(`${file}: “x” 和 “y” 必须是数字`);
  if (!Array.isArray(value.slides) || value.slides.length === 0) throw new Error(`${file}: 至少需要一张 slide`);

  const slides = value.slides.map((slide, index): Slide => {
    if (!isRecord(slide)) throw new Error(`${file}: slide ${index + 1} 格式无效`);
    return {
      eyebrow: requireString(slide, "eyebrow", file),
      title: requireString(slide, "title", file),
      body: requireString(slide, "body", file),
      ...(Array.isArray(slide.points) ? { points: slide.points.map(String) } : {}),
      ...(Array.isArray(slide.metric)
        ? { metric: slide.metric.map((item) => {
            if (!isRecord(item)) throw new Error(`${file}: metric 格式无效`);
            return { value: String(item.value), label: requireString(item, "label", file) };
          }) }
        : {}),
      ...(typeof slide.action === "string" ? { action: slide.action } : {}),
    };
  });

  return {
    key,
    index: requireString(value, "index", file),
    title: requireString(value, "title", file),
    label: requireString(value, "label", file),
    intro: requireString(value, "intro", file),
    x: value.x,
    y: value.y,
    href: requireString(value, "href", file),
    slides,
  };
}

export const sections: Section[] = [
  parseSection(learnersSource, "content/sections/learners.md"),
  parseSection(educatorsSource, "content/sections/educators.md"),
  parseSection(publicSource, "content/sections/public.md"),
  parseSection(researchSource, "content/sections/research.md"),
  parseSection(aboutSource, "content/sections/about.md"),
];
