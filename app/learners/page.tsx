import type { Metadata } from "next";
import Link from "next/link";

import { learnersPage } from "../../content/learners-page";
import FccPhotoCarousel from "./FccPhotoCarousel";
import FccNetworkMap from "./FccNetworkMap";
import FccPosterFlipbook from "./FccPosterFlipbook";
import FccVideoPlaylist from "./FccVideoPlaylist";
import JrStageCarousel from "./JrStageCarousel";
import LearnerArchiveTabs from "./LearnerArchiveTabs";
import "leaflet/dist/leaflet.css";
import "./learners.css";

export const metadata: Metadata = {
  title: "Learners | Litchee Lab",
  description: "从 Litchee Jr.、Fab City Challenge High School 到 Litchee Academy，探索 6 岁至高中阶段的连续科创成长路径。",
};

const stageIds = ["litchee-jr", "fcc-hs", "litchee-academy"];

const learnerPersonas = [
  {
    label: "好奇探索者",
    image: "/assets/learners/personas/litchee-jr.png",
    alt: "观察鸟类并记录环境样本的小学生",
    description: "对环境与科学现象保持好奇，在观察、实验与制作中建立从 0 到 1 的综合科创意识。",
  },
  {
    label: "社区行动者",
    image: "/assets/learners/personas/fcc-hs.png",
    alt: "走进社区调研并记录真实问题的中学生",
    description: "走进社区，在倾听、调研与协作中理解真实问题，也逐渐找到自己的位置。",
  },
  {
    label: "学术研究者",
    image: "/assets/learners/personas/litchee-academy.png",
    alt: "测试具身智能机器人原型的准成人学习者",
    description: "带着明确方向，把感知、控制与机械系统推进为有研究证据、能证明自己的规模化项目。",
  },
];

const fccHistoryVideos: Record<string, { title: string; embedUrl: string }[]> = {
  "2024": [
    {
      title: "FCC HS 2024 年度回顾",
      embedUrl: "https://www.youtube-nocookie.com/embed/WQga6_xjijE?start=3&rel=0",
    },
  ],
  "2025": [
    {
      title: "FCC HS 25 SZ 回顾",
      embedUrl: "https://www.youtube-nocookie.com/embed/-Gca_8AP5_g?rel=0",
    },
    {
      title: "FCC HS 25 CD 回顾",
      embedUrl: "https://www.youtube-nocookie.com/embed/2ex7MxmPVnk?start=6&rel=0",
    },
  ],
  "2026": [
    {
      title: "FCC HS 26 回顾",
      embedUrl: "https://www.youtube-nocookie.com/embed/9lW2JwwileU?rel=0",
    },
  ],
};

const fccHistoryPosters: Record<string, { title: string; label: string; shortTitle: string; src: string; aspectRatio: string } | undefined> = {
  "2024": {
    title: "FCC HS 2024 无障碍辅助技术城市创新挑战海报",
    label: "2024 POSTER",
    shortTitle: "无障碍辅助技术",
    src: "/assets/learners/fcc/fcc-hs-2024-poster.png",
    aspectRatio: "1920 / 3413",
  },
  "2026": {
    title: "FCC HS 2026 Reimagine the Future 城市智造挑战海报",
    label: "2026 POSTER",
    shortTitle: "REIMAGINE THE FUTURE",
    src: "/assets/learners/fcc/fcc-hs-2026-poster.png",
    aspectRatio: "1587 / 2245",
  },
};

const fccHistoryFlipbooks: Record<string, { city: string; title: string; src: string }[]> = {
  "2025": [
    {
      city: "深圳 · SHENZHEN",
      title: "FCC HS 2025 深圳城市智造挑战：数字建筑档案",
      src: "/assets/learners/fcc/fcc-hs-2025-shenzhen-poster.png",
    },
    {
      city: "成都 · CHENGDU",
      title: "FCC HS 2025 成都城市智造挑战：适老化设计",
      src: "/assets/learners/fcc/fcc-hs-2025-chengdu-poster.png",
    },
  ],
};

const fccHistoryReadings: Record<string, string> = {
  "2024": "https://mp.weixin.qq.com/s/aWcZJE8mJqzna5Y9m6qF5w",
  "2025": "https://mp.weixin.qq.com/s/SZeVwj9pGPBOO0w_KU63iA",
  "2026": "https://mp.weixin.qq.com/s/YOzTNk4-Q63CiFfApuZalA",
};

const fccStudentStories = [
  {
    name: "David Lu",
    label: "STUDENT STORY 01",
    image: "/assets/learners/fcc/students/david-lu.png",
    href: "https://mp.weixin.qq.com/s/JlLa7yPXsosQD5ThlsKRBA",
    text: "从真实城市议题出发，把观察、研究与技术实践连接成自己的成长路径。",
  },
  {
    name: "Max Liang",
    label: "STUDENT STORY 02",
    image: "/assets/learners/fcc/students/max-liang.png",
    href: "https://mp.weixin.qq.com/s/lErXbTdlxdQUdYENy6NFaA",
    text: "在跨城协作与持续迭代中，让一个问题逐步成为可以行动的项目。",
  },
  {
    name: "Lillian Wen",
    label: "STUDENT STORY 03",
    image: "/assets/learners/fcc/students/lillian-wen.png",
    href: "https://mp.weixin.qq.com/s/b_TiXqRH2wntJgKkX7by2g",
    text: "通过社区调研、共创和公开表达，让个人兴趣进入更大的公共对话。",
  },
];

export default function LearnersPage() {
  const {
    eyebrow, title, intro, stages, principles,
    fcc_evolution: fccEvolution,
    jr_stages: jrStages,
    academy_overview: academyOverview, academy_roadmap: academyRoadmap,
    academy_capabilities: academyCapabilities, academy_outputs: academyOutputs,
    mentor_model: mentorModel,
  } = learnersPage;

  const archiveTabs = stages.map((stage, index) => ({
    id: stageIds[index],
    number: stage.number,
    age: stage.age,
    name: stage.name,
    ...learnerPersonas[index],
  }));

  return (
    <main className="learners-page">
      <header className="learners-nav">
        <Link className="learners-brand" href="/" aria-label="返回 Litchee Lab 首页">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/litchee-lab-bilingual-logo-v3-transparent.png" alt="南荔科创教育 Litchee Lab" />
        </Link>
        <Link className="back-home" href="/">返回数字实验室 <span>↗</span></Link>
      </header>

      <LearnerArchiveTabs eyebrow={eyebrow} title={title} intro={intro} tabs={archiveTabs} />

      <div className="learner-archive-panel" id="learner-archive-litchee-jr" data-learner-archive-panel="litchee-jr">
      <section className="program program-jr" id="litchee-jr">
        <div className="program-visual jr-visual">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/learners/jr/litchee-jr-cover.png" alt="小荔枝科创俱乐部产品海报：准备迎接人工智能时代" />
          <span className="jr-cover-tag">PRODUCT 01 · LITCHEE JR.</span>
        </div>
        <ProgramCopy stage={stages[0]} />
      </section>

      <section className="evidence-section jr-evidence">
        <div className="evidence-heading">
          <p>THREE STAGES · SIX YEARS</p>
          <h2>能力不是一次活动获得的，<br />而是在越来越真实的项目中长出来。</h2>
          <span>Litchee Jr. 以跨学科项目式学习为主线。工具不是孤立教授：孩子需要先看见问题，再选择技术完成作品，最后把作品交给真实观众测试。</span>
        </div>
        <div className="jr-goals-logic-grid">
          <div className="jr-goals-block">
            <div className="jr-goals-copy"><p>LEARNING GOALS</p><h3>培养面向真实世界的 4C 能力</h3><span>在跨学科项目中，孩子持续练习判断问题、与他人协作、清晰表达，并把新想法转化为可测试的作品。</span></div>
            <div className="jr-goals-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/learners/jr/capabilities-4c.png" alt="批判性思维和问题解决、合作思维、沟通交流、创造力与创新四项培养目标" />
            </div>
          </div>
          <div className="jr-logic-block">
            <div className="jr-logic-copy"><p>COURSE LOGIC</p><h3>五维素养形成性评价系统</h3><span>课程围绕 STEAM 核心，由创造力、工程思维、数据意识、阅读素养、科学素养与实践创新共同支撑。评价关注孩子在真实项目中的持续变化，而不只看最终作品。</span></div>
            <div className="jr-logic-radar">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/learners/jr/course-logic-radar-v2.png" alt="小荔枝五维素养形成性评价系统雷达图" />
            </div>
          </div>
        </div>
        <nav className="jr-stage-steps" aria-label="跳转至三个学习阶段">
          <a href="#jr-basic"><span>01</span><strong>基础技能</strong><small>综合科创通识</small><i className="jr-stage-puck" aria-hidden="true" /></a>
          <a href="#jr-collaboration"><span>02</span><strong>团队协作</strong><small>共同解决问题</small><i className="jr-stage-puck" aria-hidden="true" /></a>
          <a href="#jr-exploration"><span>03</span><strong>自主探究</strong><small>发展个人项目</small><i className="jr-stage-puck" aria-hidden="true" /></a>
        </nav>
        <div className="jr-case-heading"><p>THREE LEARNING STAGES</p><h3>从基础技能、团队协作到自主探究，学习逐步进入更完整、更真实的项目。</h3></div>
        <JrStageCarousel stages={jrStages} />
      </section>

      <section className="jr-further-reading" aria-labelledby="jr-reading-title">
        <div className="jr-reading-heading">
          <p>FURTHER READING</p>
          <h2 id="jr-reading-title">拓展阅读</h2>
          <span>了解过往案例与成果。</span>
        </div>
        <div className="jr-reading-list">
          <a href="https://mp.weixin.qq.com/s/yJ9wyGJTttULHL_aZ9cbuA" target="_blank" rel="noreferrer">
            <span>READING 01</span>
            <strong>喜报｜小荔枝在第二十三届广东省少年儿童发明奖中斩获9项荣誉！</strong>
            <small>微信公众号原文</small>
            <b aria-hidden="true">↗</b>
          </a>
          <a href="https://mp.weixin.qq.com/s/dtfa8t6qcnQztVwKosw_eA" target="_blank" rel="noreferrer">
            <span>READING 02</span>
            <strong>2024年终回顾，刚刚好。</strong>
            <small>微信公众号原文</small>
            <b aria-hidden="true">↗</b>
          </a>
        </div>
      </section>

      <div className="return-to-learners-top return-to-learners-top-jr">
        <a href="#learners-top">返回起点 <span aria-hidden="true">↗</span></a>
      </div>
      </div>

      <div className="learner-archive-panel" id="learner-archive-fcc-hs" data-learner-archive-panel="fcc-hs" hidden>
      <section className="program program-fcc" id="fcc-hs">
        <header className="fcc-program-hero">
          <div className="fcc-program-meta">
            <span>02 · LEARNERS</span>
            <small>{stages[1].age}</small>
          </div>
          <div className="fcc-program-brandbar">
            <p className="fcc-program-slogan">LOCAL QUESTIONS · SHARED FUTURES</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/learners/fcc/fcc-hs-logo.png" alt="Fab City Challenge High School" />
          </div>
          <div className="fcc-program-title">
            <p>{stages[1].subtitle}</p>
            <h2>
              <span>Fab City Challenge</span>
              <span>High School</span>
              <strong>城市智造挑战</strong>
            </h2>
          </div>
          <div className="fcc-program-intro">
            <p>{stages[1].summary}</p>
            <ul>{stages[1].highlights.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </header>
        <section className="fcc-concept-section" aria-labelledby="fcc-concept-title">
          <header className="fcc-concept-heading">
            <p>WHY FCC HS</p>
            <h2 id="fcc-concept-title">为什么FCC HS？</h2>
          </header>
          <div className="fcc-concept-pair">
            <figure className="fcc-why-video">
              <div>
                <iframe
                  src="https://www.youtube-nocookie.com/embed/_WMOb2BJq0s?start=1&rel=0"
                  title="为什么我们要做 Fab City Challenge High School"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <figcaption><span>INTRO VIDEO</span><strong>为什么我们要做 Fab City Challenge High School</strong></figcaption>
            </figure>
            <section className="fcc-action-cycle" aria-label="FCC HS 英雄之旅行动模型">
              <figure className="fcc-cycle-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/learners/fcc/fcc-hero-journey.png" alt="Fab City Challenge 英雄之旅行动循环：召唤、启程、试炼与回归，从已知世界进入未知世界并发展社会情感学习" />
              </figure>
              <p className="fcc-cycle-description">每一次 FCC HS 行动都由多种角色共同完成：Fab Lab 与社区发出真实议题的召唤，导师把城市挑战方法与项目式学习转化为可进入的路径，学生在社区调研、跨城协作、技术创作和原型测试中经历试炼。最后，导师、学生与社区通过展览、公开记录与长期孵化把成果带回真实世界，让一次挑战沉淀为可以被使用、被延续的改变。</p>
            </section>
          </div>
        </section>
        <FccPhotoCarousel />
      </section>

      <section className="evidence-section fcc-evidence">
        <div className="fcc-evolution">
          <div className="fcc-section-heading"><p>THREE YEARS IN MOTION</p><h2>从一次城市挑战，<br />长成一张分布式学习网络。</h2></div>
          <div className="fcc-evolution-list">
            {[...fccEvolution].reverse().map((item) => {
              const videos = fccHistoryVideos[item.year] ?? [];
              const poster = fccHistoryPosters[item.year];
              const flipbookPosters = fccHistoryFlipbooks[item.year] ?? [];
              const readingUrl = fccHistoryReadings[item.year];

              return (
                <article key={item.year}>
                  <div className="fcc-year-mark">
                    <strong>{item.year}</strong>
                    {poster && (
                      <figure className="fcc-poster-card">
                        <a href={poster.src} target="_blank" rel="noreferrer" aria-label={`查看大图：${poster.title}`}>
                          <div className="fcc-poster-frame" style={{ aspectRatio: poster.aspectRatio }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={poster.src} alt={poster.title} />
                          </div>
                        </a>
                        <figcaption><span>{poster.label}</span><strong>{poster.shortTitle}</strong></figcaption>
                      </figure>
                    )}
                    {flipbookPosters.length > 0 && <FccPosterFlipbook posters={flipbookPosters} />}
                    {readingUrl && (
                      <a className="fcc-history-reading" href={readingUrl} target="_blank" rel="noreferrer">
                        <span>FURTHER READING</span>
                        <strong>{item.year} 项目回顾</strong>
                        <b aria-hidden="true">↗</b>
                      </a>
                    )}
                  </div>
                  <div className="fcc-year-content">
                    <div className="fcc-evolution-copy"><h3>{item.title}</h3><p>{item.text}</p></div>
                    <FccVideoPlaylist year={item.year} videos={videos} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <div className="city-evidence">
          <h3>不同城市，不同入口；<br />共同面对包容、文化、生态与城市生活的未来。</h3>
          <FccNetworkMap />
        </div>
        <div className="fcc-impact">
          <div className="fcc-section-heading"><p>PUBLIC IMPACT · STUDENT STORIES</p><h2>真实的改变，<br />也发生在每一个学生身上。</h2></div>
          <div className="fcc-student-stories">
            {fccStudentStories.map((story) => (
              <a href={story.href} target="_blank" rel="noreferrer" key={story.name}>
                <div className="fcc-story-cover">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={story.image} alt={`${story.name} 学生故事封面`} />
                </div>
                <div className="fcc-story-body">
                  <span>{story.label}</span>
                  <strong>{story.name}</strong>
                  <p>{story.text}</p>
                </div>
                <b aria-hidden="true">↗</b>
              </a>
            ))}
          </div>
        </div>
        <div className="fcc-closing-statement">
          <p>THE END IS THE BEGINNING</p>
          <h2>挑战的结束，<br />是创造真实改变的开始。</h2>
        </div>
      </section>

      <div className="return-to-learners-top return-to-learners-top-fcc">
        <a href="#learners-top">返回起点 <span aria-hidden="true">↗</span></a>
      </div>
      </div>

      <div className="learner-archive-panel" id="learner-archive-litchee-academy" data-learner-archive-panel="litchee-academy" hidden>
      <section className="program program-academy" id="litchee-academy">
        <div className="program-visual photo-visual academy-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/learners/litchee-academy-making.png" alt="Fab Academy 数字制造项目实践" />
          <span>HOW TO MAKE (ALMOST) ANYTHING</span>
        </div>
        <ProgramCopy stage={stages[2]}>
          <div className="academy-network-lockup">
            <div className="academy-network-logos" aria-label="Litchee Academy 合作与课程网络">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/learners/academy/partners/academy-network-lockup.png"
                alt="Litchee Lab、Academany、Fab Foundation 与 MIT Center for Bits and Atoms"
              />
            </div>
          </div>
        </ProgramCopy>
      </section>

      <section className="evidence-section academy-evidence">
        <div className="academy-thesis">
          <div className="academy-section-heading">
            <p>PROGRAMME AT A GLANCE</p>
            <h2>项目一览</h2>
            <span>Litchee Academy STEM+ 个性化项目培养计划，是一项基于全球 Fab Lab 数字实验室网络、面向高中生的年度制跨学科个人项目。学生从自身兴趣与现实问题出发，在导师支持下完成研究、设计、制作、测试、迭代与公开表达，形成能够说明个人学术兴趣、综合科创能力与成长过程的完整档案。</span>
          </div>
          <div className="academy-overview-grid">
            {academyOverview.map((item, index) => (
              <article key={item.label}>
                <span>0{index + 1}</span>
                <strong>{item.value}</strong>
                <p>{item.label}</p>
              </article>
            ))}
          </div>
        </div>

        <section className="academy-capabilities" aria-label="Litchee Academy 培养能力">
          <div className="academy-capabilities-heading">
            <p>EIGHT OBSERVABLE CAPABILITIES</p>
            <h2>项目需要什么，<br />就真实学习什么。</h2>
            <span>能力不是课程清单，而是在项目推进中留下的可观察证据。</span>
          </div>
          <div className="academy-capability-grid">
            {academyCapabilities.map((item, index) => (
              <article key={item.title}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={`${item.title}课程与项目实践`} />
                <div><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.text}</p></div>
              </article>
            ))}
          </div>
        </section>

        <div className="academy-roadmap">
          <div className="academy-roadmap-heading">
            <p>RESEARCH × PROTOTYPING</p>
            <h2>双线并进，<br />让研究与制作互相验证。</h2>
          </div>
          <figure className="academy-classroom-proof">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/learners/academy/distributed-classroom.jpg" alt="Fab Academy 分布式课堂：学生在本地实验室与全球导师同步上课" />
            <figcaption><span>DISTRIBUTED CLASSROOM</span><strong>本地制作，全球课堂同步进入。</strong><p>学生一边在实验室推进自己的原型，一边连接全球 Fab Lab 导师、课程与同伴，把每次技术学习直接用回项目。</p></figcaption>
          </figure>
          <div className="academy-roadmap-table" role="table" aria-label="Litchee Academy 年度培养路径">
            <div className="academy-roadmap-row academy-roadmap-head" role="row">
              <span>阶段</span><span>项目节点</span><span>学术研究</span><span>工程与数字制造</span>
            </div>
            {academyRoadmap.map((item) => (
              <div className="academy-roadmap-row" role="row" key={item.number}>
                <span><b>{item.number}</b>{item.time}</span>
                <strong>{item.title}</strong>
                <p>{item.research}</p>
                <p>{item.making}</p>
              </div>
            ))}
          </div>
        </div>

          <div className="academy-support-outcomes">
          <section className="academy-support">
            <div className="academy-block-heading"><p>WHO SUPPORTS THE PROJECT</p><h2>兼顾广度与深度的导师机制</h2></div>
            <figure className="academy-support-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/learners/academy/academany-community.png" alt="Academany 全球导师与数字制造教育网络" />
              <figcaption>GLOBAL FAB LAB & ACADEMANY NETWORK</figcaption>
            </figure>
            <div className="academy-support-list">
              {mentorModel.map((item, index) => <article key={item.role}><span>0{index + 1}</span><div><strong>{item.role}</strong><p>{item.text}</p></div></article>)}
            </div>
          </section>
          <section className="academy-outcomes">
            <div className="academy-block-heading"><p>WHAT REMAINS</p><h2>最后留下的，<br />不只是一个作品。</h2></div>
            <div className="academy-project-gallery" aria-label="Academany 项目案例">
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/learners/academy/project-example-01.jpg" alt="Marimbatron 数字乐器项目" />
                <figcaption>
                  <strong>Marimbatron</strong>
                  <span>Leo Kuipers · Waag / Amsterdam · Fab Academy 2024</span>
                  <p>基于 MIDI 与 Wicki-Hayden 同构键位的数字马林巴琴，让演奏者用同一套指法跨调演奏。</p>
                </figcaption>
              </figure>
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/learners/academy/project-example-02.jpg" alt="Circuit Lab 互动电子学习工具" />
                <figcaption>
                  <strong>Circuit Lab</strong>
                  <span>Camila Luna · Fab Lab Cuenca · Fab Academy 2025</span>
                  <p>把电路练习做进实体书，并用 AR 连接数字界面，让电子学习更便携、更易参与。</p>
                </figcaption>
              </figure>
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/learners/academy/project-example-03.jpg" alt="Miss Baker 可穿戴互动项目" />
                <figcaption>
                  <strong>Miss Baker</strong>
                  <span>Den Rey · Fab Lab Barcelona · Fab Academy 2021</span>
                  <p>鞋面可穿戴互动装置，通过传感器记录步数并连接游戏，把日常运动转化为可玩的体验。</p>
                </figcaption>
              </figure>
            </div>
            <div className="academy-output-list">
              {academyOutputs.map((item, index) => (
                <article key={item.title}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>
              ))}
            </div>
          </section>
        </div>

        <section className="academy-public-showcase">
          <div className="academy-block-heading"><p>FROM PROJECT TO PUBLIC EVIDENCE</p><h2>作品进入展览、网络与公共讨论。</h2></div>
          <div>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/learners/academy/outcome-showcase-01.jpg" alt="Fab City Challenge High School 年度展览" />
              <figcaption>
                <strong>Fab City Challenge High School 年度展览</strong>
                <span>参与形式</span>
                <p>展览、公众服务、年度报告</p>
              </figcaption>
            </figure>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/learners/academy/outcome-showcase-02.png" alt="Fab Lab Asian Network 区域会议" />
              <figcaption>
                <strong>Fab Lab Asian Network 区域会议</strong>
                <span>参与形式</span>
                <p>市集、主题汇报、展览</p>
              </figcaption>
            </figure>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/learners/academy/outcome-showcase-03.png" alt="FABX 全球大会" />
              <figcaption>
                <strong>FABX 全球大会</strong>
                <span>参与形式</span>
                <p>主题演讲、工作坊</p>
              </figcaption>
            </figure>
          </div>
        </section>

      </section>

      <div className="return-to-learners-top return-to-learners-top-academy">
        <a href="#learners-top">返回起点 <span aria-hidden="true">↗</span></a>
      </div>
      </div>

      <section className="learning-principles">
        <div className="principles-head">
          <p>OUR LEARNING LANGUAGE</p>
          <h2>看见，创造，连接。</h2>
        </div>
        <div className="principles-grid">
          {principles.map((item, index) => (
            <article key={item.label}>
              <span>0{index + 1}</span>
              <h3>{item.label}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="learners-footer">
        <span>© Litchee Lab</span>
        <Link href="/">litchee.site</Link>
      </footer>
    </main>
  );
}

function ProgramCopy({ stage, children }: { stage: (typeof learnersPage.stages)[number]; children?: React.ReactNode }) {
  return (
    <div className="program-copy">
      {stage.number === "02" && <p className="program-kicker">LOCAL QUESTIONS · SHARED FUTURES</p>}
      <div className="program-meta"><span>{stage.number}</span><small>{stage.age}</small></div>
      <p className="program-subtitle">{stage.subtitle}</p>
      <h2><BilingualStageName name={stage.name} /></h2>
      <p className="program-summary">{stage.summary}</p>
      <ul>{stage.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
      {children}
      {stage.number === "01"
        ? <div className="program-outcome"><span>这一阶段带走什么</span><p>对标大部分创新型白名单赛事的个人成长档案</p></div>
        : null}
    </div>
  );
}

function BilingualStageName({ name }: { name: string }) {
  const [chinese, english] = name.split(" / ");
  return <>{chinese}{english ? <><br /><span className="stage-name-en">{english}</span></> : null}</>;
}
