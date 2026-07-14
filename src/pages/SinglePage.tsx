import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react';
import { useScramble } from '../hooks/useScramble';
import StatsDashboard from '../components/ContributionHeatmap';
import ConwayBatmanBackground from '../components/ConwayBatmanBackground';
import MathBackground from '../components/MathBackground';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <FadeUp className="mb-12">
      <p className="mono text-accent text-sm tracking-[0.2em] mb-2">{`[ ${num} ]`}</p>
      <h2 className="text-text-base text-2xl font-semibold tracking-tight">{title}</h2>
    </FadeUp>
  );
}

function getOrdinalSuffix(num: number): string {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) {
    return num + 'st';
  }
  if (j === 2 && k !== 12) {
    return num + 'nd';
  }
  if (j === 3 && k !== 13) {
    return num + 'rd';
  }
  return num + 'th';
}
let hasHitCounter = false;

export default function SinglePage() {
  const { display: heroName } = useScramble('/divyaraval', 600);

  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    const url = hasHitCounter
      ? 'https://abacus.jasoncameron.dev/get/divyaraval-portfolio/visits'
      : 'https://abacus.jasoncameron.dev/hit/divyaraval-portfolio/visits';

    if (!hasHitCounter) {
      hasHitCounter = true;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.value === 'number') {
          setVisitorCount(data.value);
        }
      })
      .catch((err) => console.error('Error fetching visitor counter:', err));
  }, []);


  const experiences = [
    {
      period: 'May 2026 — Jun 2026',
      company: 'Marga Technology',
      companyUrl: 'margatechnology.com',
      role: 'Full Stack Intern',
      points: [
        { href: null, label: null, text: 'Built and maintained full-stack MERN applications, integrating RESTful APIs with JWT authentication and role-based access control.' },
        { href: null, label: null, text: 'Designed MongoDB schemas, optimized database queries, and implemented backend validations and secure cloud file uploads.' },
        { href: null, label: null, text: 'Collaborated via Git/GitHub, debugged frontend/backend issues, and followed clean code principles in an Agile workflow.' }
      ],
      stack: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT', 'Git'],
    },
    {
      period: 'Aug 2025 — Present',
      company: 'CSC Cybersecurity Club, ITNU',
      companyUrl: '',
      role: 'Executive Member',
      points: [
        { href: null, label: null, text: 'Contributing to cybersecurity events, student community initiatives, and workshops at ITNU.' }
      ],
      stack: ['Cybersecurity', 'Networking', 'Community Management'],
    },
    {
      period: 'Aug 2024 — Present',
      company: 'HFT 2027 Batch Community, Nirma University',
      companyUrl: '',
      role: 'Member',
      points: [
        { href: null, label: null, text: 'Focusing on algorithmic trading designs, high-frequency trading (HFT) models, market microstructure, and quantitative strategies.' },
        { href: null, label: null, text: 'Analyzing market-making algorithms and designing efficient execution simulations.' }
      ],
      stack: ['High Frequency Trading', 'Algorithms', 'Quantitative Finance', 'C++'],
    },
    {
      period: 'May 2024 — Jul 2024',
      company: 'Parevda Group',
      companyUrl: '',
      role: 'Volunteer (Community Service)',
      points: [
        { href: null, label: null, text: 'Participated in and supported community service initiatives, social impact campaigns, and local volunteering programs.' }
      ],
      stack: ['Community Service', 'Volunteering', 'Social Impact'],
    }
  ];

  const achievements = [
    {
      period: 'Jan 2025',
      title: 'MINeD HACKATHON (2025) - Top 10 Finalist',
      points: [
        'Built Episodic Intelligence Engine, a modular 7-phase AI pipeline that decomposes a story concept into a structured episodic series, analyzes emotional pacing and retention risk using HuggingFace and sentence-transformer models, and synthesizes the optimized script into a multi-voice podcast using OpenAI GPT-4o-mini and TTS.'
      ]
    },
    {
      period: 'Oct 2023',
      title: 'District-Level Chess Participant – Khel Mahakumbh, Gujarat',
      points: [
        'Competed in district-level chess championship, demonstrating strategic problem-solving, high concentration, and tactical decision-making under intense pressure.'
      ]
    },
    {
      period: 'Ongoing',
      title: 'Competitive Programming (LeetCode & Codeforces)',
      points: [
        'LeetCode: DivyaRaval (Top 10%, Max Rating: 1744)',
        'Codeforces: divyaraval (Pupil, Max Rating: 1303)'
      ]
    },
    {
      period: 'March 2023',
      title: '12th Science Board Percentile & ACPC Rank',
      points: [
        'Achieved a Board Percentile of 99.28% in 12th Science at Shri Maruti Vidhyamandir.',
        'Secured ACPC State Rank of 298 in engineering admission rankings.'
      ]
    }
  ];

  const certifications = [
    {
      issuer: 'Amazon Web Services (AWS)',
      title: 'AWS Academy Graduate - Cloud Foundations',
      details: 'Credential validation for foundational cloud computing concepts, AWS services, security, architecture, and pricing.'
    },
    {
      issuer: 'HackerRank',
      title: 'SQL (Advanced)',
      details: 'Advanced database queries, optimization, joins, subqueries, and database performance assessments.'
    },
    {
      issuer: 'HackerRank',
      title: 'Rest API (Intermediate)',
      details: 'Restful API integration, routing protocols, status codes, query parameters, and web service patterns.'
    }
  ];

  const projects = [
    {
      index: '01',
      title: 'HackForge-AI',
      description:
        'AI-powered Discord hackathon bot that automates hackathon workflows including registrations, team formation, submissions, and judging. Implemented a custom RAG pipeline using Supabase Vector Search and Ollama to deliver context-aware answers from indexed PDFs, FAQs, and documentation. Built role-based automation for organizers, judges, mentors, and participants, including server provisioning and permission management.',
      stack: ['Node.js', 'Express.js', 'Discord.js', 'MongoDB', 'Supabase', 'Ollama', 'RAG'],
      github: 'https://github.com/DivyaRaval1909/HackForge-AI',
      live: '',
      youtube: '',
    },
    {
      index: '02',
      title: 'RailYatra',
      description:
        'Developed a full-stack railway ticket booking platform with secure JWT-based authentication and role-based authorization. Integrated Razorpay Payment Gateway for online ticket payments and automated booking confirmation. Implemented Redis TTL-based seat locking to resolve concurrent seat booking conflicts and prevent double bookings. Designed RESTful APIs for train search, seat availability, bookings, cancellations, and payment verification.',
      stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Redis', 'JWT', 'Razorpay'],
      github: 'https://github.com/DivyaRaval1909/RailYatra',
      live: '',
      youtube: '',
    },
    {
      index: '03',
      title: 'LabelX',
      description:
        'Decentralized data labeling platform integrating Solana wallets, AWS S3, JWT authentication, and role-based access control to securely manage annotation workflows and blockchain-based reward distribution.',
      stack: ['React.js', 'Node.js', 'Solana', 'AWS S3', 'JWT', 'Solidity'],
      github: 'https://github.com/DivyaRaval1909/LabelX',
      live: '',
      youtube: '',
    },
    {
      index: '04',
      title: 'DivDocs',
      description:
        'Built a Google Docs-style collaborative editor with real-time multi-user editing using Socket.IO. Implemented document search, inline renaming, sharing, auto-save, and live presence indicators. Developed scalable REST APIs and MongoDB-backed storage with export support for PDF, Markdown, HTML, and TXT.',
      stack: ['React.js', 'Node.js', 'Express.js', 'Socket.IO', 'MongoDB'],
      github: 'https://github.com/DivyaRaval1909/DivDocs',
      live: '',
      youtube: '',
    },
    {
      index: '05',
      title: 'CricBid',
      description:
        'Production-grade decentralized IPL-style player auction platform built on Ethereum, enabling secure smart contract–based player bidding, team management, wallet integration, and transparent auction execution.',
      stack: ['Ethereum', 'Solidity', 'Web3.js', 'React', 'Smart Contracts'],
      github: 'https://github.com/DivyaRaval1909/CricBid-Decentralized-Player-Auction-Platform',
      live: '',
      youtube: '',
    },
    {
      index: '06',
      title: 'BlockVote',
      description:
        'Secure decentralized voting platform built on Ethereum allowing election creation, voter registration, tamper-proof vote recording, and transparent real-time result tracking through a responsive Web3 interface.',
      stack: ['Ethereum', 'Solidity', 'Web3.js', 'React', 'Smart Contracts'],
      github: 'https://github.com/DivyaRaval1909/BlockVote',
      live: '',
      youtube: '',
    },
    {
      index: '07',
      title: 'DocMind',
      description:
        'AI-powered document intelligence platform enabling semantic search, contextual question answering, and knowledge retrieval over uploaded documents using embeddings, vector search, and large language models.',
      stack: ['LLMs', 'Vector Search', 'Embeddings', 'React', 'Python', 'FastAPI'],
      github: 'https://github.com/DivyaRaval1909/DocMind',
      live: '',
      youtube: '',
    },
    {
      index: '08',
      title: 'Episodic_Intelligence_Engine',
      description:
        'AI storytelling engine implementing a multi-stage episodic memory pipeline that combines LLMs, semantic retrieval, sentiment analysis, and contextual reasoning to generate coherent long-form narratives.',
      stack: ['Python', 'LLMs', 'Semantic Retrieval', 'Sentiment Analysis', 'NLTK'],
      github: 'https://github.com/DivyaRaval1909/Episodic_Intelligence_Engine',
      live: '',
      youtube: '',
    },
    {
      index: '09',
      title: 'Chatify',
      description:
        'Full-stack real-time chat application built with React, Express, and MongoDB featuring secure authentication, instant messaging, modern responsive UI, and persistent conversation history.',
      stack: ['React', 'Express', 'MongoDB', 'Node.js', 'Socket.io', 'Tailwind'],
      github: 'https://github.com/DivyaRaval1909/chatify',
      live: '',
      youtube: '',
    },
  ];

  return (
    <div className="bg-bg-base text-text-base font-mono min-h-screen">
      <MathBackground />

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* grid bg */}
        {/* Conway's Game of Life background */}
        <div className="absolute inset-0 z-0">
          <ConwayBatmanBackground />
        </div>

        {/* bat signal ascii — decorative */}
        <motion.pre
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1 }}
          className="absolute top-24 right-8 md:right-16 text-text-faint text-xs leading-relaxed select-none pointer-events-none hidden md:block"
          aria-hidden
        >
          {`   /\\     /\\
  /  \\___/  \\
 /   _   _   \\
(   / \\_/ \\   )
 \\_/   v   \\_/`}
        </motion.pre>

        <div className="relative z-10 text-center px-6 max-w-[720px] mx-auto pt-20 pb-12">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.1 }}
            className="text-text-base font-bold tracking-tight leading-none mb-8"
            style={{
              fontSize: 'clamp(52px, 12vw, 112px)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {heroName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6, ease }}
            className="mono text-text-faint text-sm tracking-[0.18em] mb-8"
          >
            Software Engineer &nbsp;✦&nbsp; Blockchain &amp; Web3 Developer
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="flex flex-col items-center gap-2 mt-16"
          >
            <div className="w-px h-8 bg-gradient-to-b from-transparent to-border-inner" />
            <span className="mono text-text-light text-xs tracking-[0.25em]">keep scrolling</span>
          </motion.div>
        </div>
      </section>

      {/* ─── ABOUT ────────────────────────────────────────── */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-[940px] mx-auto">
          <SectionHeader num="00" title="about" />

          <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-8 md:gap-12 items-center">
            <FadeUp delay={0.1}>
              <p className="text-text-light text-lg leading-[2] max-w-[860px]">
                I'm a Computer Science undergraduate at <span className="text-text-muted font-medium">Nirma University</span> specializing in backend development, systems engineering, and full-stack architecture. I enjoy turning complex system challenges into elegant, reliable software.
                <br />
                <br />
                With experience engineering real-time collaborative workspaces, AI-driven automation workflows, and transaction-safe web platforms, I focus on building highly scalable and performant architectures. Beyond development, I actively practice competitive programming, participate in hackathons, and contribute to student communities.
              </p>
            </FadeUp>

            <FadeUp delay={0.15} className="flex justify-center">
              <div className="relative w-[220px] h-[220px] md:w-[260px] md:h-[260px] shrink-0 aspect-square">
                <div className="absolute inset-0 border border-border-main rounded-3xl overflow-hidden bg-bg-card hover:border-accent transition-colors duration-300">
                  <img
                    src="/assets/lighttheme.jpeg"
                    alt="Divya Raval (Light Theme)"
                    className="theme-img-light w-full h-full object-cover"
                  />
                  <img
                    src="/assets/darktheme.jpeg"
                    alt="Divya Raval (Dark Theme)"
                    className="theme-img-dark w-full h-full object-cover"
                  />
                </div>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.2} className="flex flex-wrap gap-2 mt-8">
            {[
              'C++', 'JavaScript', 'HTML5', 'CSS3', 'React.js', 'Node.js',
              'Express.js', 'MySQL (SQL)', 'MongoDB (NoSQL)', 'AWS S3',
              'Git', 'GitHub', 'Postman', 'DSA', 'OOP', 'DBMS', 'Operating Systems',
              'Cryptography', 'Blockchain'
            ].map((s) => (
              <span
                key={s}
                className="mono text-sm text-text-faint border border-border-inner px-[10px] py-[5px] hover:text-text-base hover:border-border-badge transition-all duration-200"
              >
                {s}
              </span>
            ))}
          </FadeUp>
        </div>
      </section>

      <div className="border-t border-border-main max-w-[680px] mx-auto" />

      {/* ─── EXPERIENCE ───────────────────────────────────── */}
      <section id="experience" className="py-24 px-6">
        <div className="max-w-[680px] mx-auto">
          <SectionHeader num="01" title="experience" />

          <div className="space-y-0">
            {experiences.map((exp, i) => (
              <FadeUp key={exp.company} delay={i * 0.08}>
                <div
                  className={`grid grid-cols-1 gap-4 py-8 sm:gap-6 md:grid-cols-[140px_1fr] md:gap-8 md:py-10 ${i < experiences.length - 1 ? 'border-b border-border-main' : ''
                    }`}
                >
                  <div className="pt-0.5">
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mono text-sm text-accent hover:opacity-70 transition-opacity break-words block mb-1"
                      >
                        {exp.company}
                      </a>
                    ) : (
                      <span className="mono text-sm text-accent block mb-1">{exp.company}</span>
                    )}
                    <span className="mono text-xs text-text-faint">({exp.period})</span>
                  </div>

                  <div>
                    <p className="text-text-muted text-base font-medium mb-4 leading-snug">{exp.role}</p>
                    <ul className="space-y-3 mb-5">
                      {exp.points.map((pt, j) => (
                        <li key={j} className="text-sm text-text-muted leading-relaxed flex gap-2 min-w-0">
                          <span className="text-text-faint mt-0.5 shrink-0">▸</span>
                          <span className="min-w-0 break-words">
                            {pt.href && pt.label ? (
                              <>
                                <a
                                  href={pt.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-text-light border-b border-border-inner hover:text-accent hover:border-accent transition-colors break-words"
                                >
                                  {pt.label}
                                </a>{' '}
                                — {pt.text}
                              </>
                            ) : (
                              pt.text
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.stack.map((t) => (
                        <span
                          key={t}
                          className="mono text-xs text-text-light border border-border-badge px-2 py-0.5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-border-main max-w-[680px] mx-auto" />

      {/* ─── PROJECTS ─────────────────────────────────────── */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-[900px] mx-auto">
          <SectionHeader num="02" title="projects" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {projects.map((proj, i) => {
              // Bento span map: 5-col grid, wide=3cols(60%), narrow=2cols(40%), full=5cols
              const spanMap = [3, 2, 2, 3, 3, 2, 2, 3, 5];
              const span = spanMap[i] ?? 2;
              const colClass = span === 5 ? 'md:col-span-5' : span === 3 ? 'md:col-span-3' : 'md:col-span-2';
              return (
                <FadeUp key={proj.index} delay={i * 0.06} className={colClass}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="p-7 border border-border-main rounded-3xl bg-bg-card ring-1 ring-accent/10 hover:bg-bg-card-hover hover:border-accent hover:ring-accent/20 transition-all duration-300 h-full"
                  >
                    <p className="mono text-xs text-text-light mb-3">{proj.index} ///</p>
                    <h3 className="text-text-card-title text-lg font-semibold mb-2 tracking-tight">
                      {proj.title}
                    </h3>
                    <p className="text-text-faint text-sm leading-relaxed mb-4">{proj.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proj.stack.map((t) => (
                        <span
                          key={t}
                          className="mono text-xs text-text-light border border-border-inner px-1.5 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mono text-xs text-text-link border-b border-border-inner hover:text-accent hover:border-accent transition-colors flex items-center gap-1"
                      >
                        <Github className="w-3 h-3" /> github ↗
                      </a>
                      {proj.live && (
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mono text-xs text-text-link border-b border-border-inner hover:text-accent hover:border-accent transition-colors flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" /> live ↗
                        </a>
                      )}
                      {proj.youtube && (
                        <a
                          href={proj.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mono text-xs text-text-link border-b border-border-inner hover:text-accent hover:border-accent transition-colors flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" /> demo ↗
                        </a>
                      )}
                    </div>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      <div className="border-t border-border-main max-w-[680px] mx-auto" />

      {/* ─── ACHIEVEMENTS ─────────────────────────────────── */}
      <section id="achievements" className="py-24 px-6">
        <div className="max-w-[680px] mx-auto">
          <SectionHeader num="03" title="achievements" />

          <div className="space-y-0">
            {achievements.map((ach, i) => (
              <FadeUp key={ach.title} delay={i * 0.08}>
                <div
                  className={`grid grid-cols-1 gap-4 py-8 sm:gap-6 md:grid-cols-[140px_1fr] md:gap-8 md:py-10 ${i < achievements.length - 1 ? 'border-b border-border-main' : ''
                    }`}
                >
                  <div className="pt-0.5">
                    <p className="mono text-xs text-text-link leading-relaxed mb-2 sm:text-sm sm:mb-3 whitespace-pre-line">
                      {ach.period}
                    </p>
                  </div>

                  <div>
                    <p className="text-text-muted text-base font-medium mb-4 leading-snug">{ach.title}</p>
                    <ul className="space-y-3">
                      {ach.points.map((pt, j) => (
                        <li key={j} className="text-sm text-text-muted leading-relaxed flex gap-2 min-w-0">
                          <span className="text-text-faint mt-0.5 shrink-0">▸</span>
                          <span className="min-w-0 break-words">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-border-main max-w-[680px] mx-auto" />

      {/* ─── CERTIFICATIONS ─────────────────────────────────── */}
      <section id="certifications" className="py-24 px-6">
        <div className="max-w-[680px] mx-auto">
          <SectionHeader num="04" title="certifications" />

          <div className="space-y-0">
            {certifications.map((cert, i) => (
              <FadeUp key={cert.title} delay={i * 0.08}>
                <div
                  className={`grid grid-cols-1 gap-4 py-8 sm:gap-6 md:grid-cols-[140px_1fr] md:gap-8 md:py-10 ${i < certifications.length - 1 ? 'border-b border-border-main' : ''
                    }`}
                >
                  <div className="pt-0.5">
                    <p className="mono text-xs text-text-link leading-relaxed mb-2 sm:text-sm sm:mb-3 whitespace-pre-line">
                      {cert.issuer}
                    </p>
                  </div>

                  <div>
                    <p className="text-text-muted text-base font-medium mb-2 leading-snug">{cert.title}</p>
                    <p className="text-sm text-text-muted leading-relaxed">{cert.details}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-border-main max-w-[680px] mx-auto" />

      {/* ─── STATS ────────────────────────────────────────── */}
      <section id="stats" className="py-24 px-6 text-center">
        <div className="mx-auto w-full max-w-[680px]">
          <SectionHeader num="05" title="stats" />
        </div>
        <div className="mt-12 w-full max-w-full">
          <StatsDashboard />
        </div>
      </section>

      <div className="border-t border-border-main max-w-[680px] mx-auto" />

      {/* ─── CONTACT ──────────────────────────────────────── */}
      <section id="contact" className="min-h-screen flex flex-col justify-center overflow-x-hidden py-24 px-6 text-center">
        <div className="mx-auto w-full max-w-[680px]">
          <SectionHeader num="06" title="contact" />

          <FadeUp delay={0.1}>
            <p className="mono text-text-faint text-sm mb-10">
              open to remote work &amp; interesting projects
            </p>
          </FadeUp>

          <FadeUp delay={0.15} className="mb-12 flex flex-wrap justify-center gap-x-6 gap-y-4 sm:mb-16">
            {[
              { icon: Mail, label: 'mail', href: 'mailto:divyaraval.cs@gmail.com' },
              { icon: Linkedin, label: 'linkedin', href: 'https://linkedin.com/in/divyaraval' },
              { icon: Github, label: 'github', href: 'https://github.com/DivyaRaval1909' },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="mono inline-flex items-center gap-1.5 text-sm text-text-link border-b border-border-badge pb-0.5 hover:text-accent hover:border-accent transition-colors"
              >
                <Icon className="w-3 h-3" />
                {label} ↗
              </a>
            ))}
          </FadeUp>

          <FadeUp delay={0.18}>
            <pre
              className="mono text-text-faint text-xs leading-relaxed select-none mb-8"
              aria-hidden
            >
              {`   /\\     /\\
  /  \\___/  \\
 /   _   _   \\
(   / \\_/ \\   )
 \\_/   v   \\_/`}
            </pre>
          </FadeUp>

          {visitorCount !== null && (
            <FadeUp delay={0.2} className="mb-4">
              <p className="mono text-text-faint text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-[0.15em]">
                [ you are the <span className="text-text-muted font-bold">{getOrdinalSuffix(visitorCount)}</span> visitor ]
              </p>
            </FadeUp>
          )}

          <FadeUp delay={0.22}>
            <p className="mono text-text-faint text-[10px] leading-relaxed tracking-[0.12em] sm:text-xs sm:tracking-[0.15em] break-words">
              © 2026 divyaraval
            </p>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
