import { load } from "js-yaml";
// The versioned query keeps vinext's development RSC cache in sync when the
// front matter schema grows (plain `?raw` can otherwise retain the old shape).
import source from "./pages/learners.md?raw&schema=5";

export type LearnerStage = {
  number: string;
  age: string;
  name: string;
  subtitle: string;
  summary: string;
  highlights: string[];
  outcome: string;
};

export type LearnerPrinciple = { label: string; text: string };
export type ProofStat = { value: string; label: string };
export type FccPhase = { phase: string; time: string; text: string; evidence: string };
export type FccCity = { city: string; challenge: string };
export type FccProblem = { title: string; text: string };
export type FccEvolution = { year: string; title: string; text: string; metric: string };
export type FccImpact = { value: string; label: string; text: string };
export type AcademyOutput = { title: string; text: string };
export type MentorRole = { role: string; text: string };
export type ProgramComparison = { program: string; duration: string; question: string; learning: string; evidence: string };
export type JrMethod = { title: string; text: string };
export type JrStage = { level: string; name: string; focus: string; text: string; evidence: string };
export type JrCase = { title: string; question: string; text: string };

export type LearnersPageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  stages: LearnerStage[];
  academy_frameworks: string[];
  principles: LearnerPrinciple[];
  proof_stats: ProofStat[];
  jr_method: JrMethod[];
  jr_stages: JrStage[];
  jr_cases: JrCase[];
  jr_capabilities: string[];
  fcc_timeline: FccPhase[];
  fcc_cities: FccCity[];
  fcc_problems: FccProblem[];
  fcc_evolution: FccEvolution[];
  fcc_impacts: FccImpact[];
  academy_capabilities: string[];
  academy_outputs: AcademyOutput[];
  mentor_model: MentorRole[];
  comparison: ProgramComparison[];
};

const frontmatter = source.match(/^---\s*\n([\s\S]*?)\n---/);
if (!frontmatter) throw new Error("content/pages/learners.md: 缺少 YAML front matter");

export const learnersPage = load(frontmatter[1]) as LearnersPageContent;
