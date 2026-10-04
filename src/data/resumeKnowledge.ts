export interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  bio: string;
  education: Array<{
    institution: string;
    degree: string;
    period: string;
    grade: string;
    details?: string;
  }>;
  skills: {
    languages: string[];
    frameworks: string[];
    databasesAndTools: string[];
    coreConcepts: string[];
  };
  experience: Array<{
    company: string;
    companyUrl: string;
    role: string;
    period: string;
    points: string[];
    stack: string[];
  }>;
  projects: Array<{
    title: string;
    description: string;
    stack: string[];
    github: string;
    live?: string;
    youtube?: string;
    keyFeatures?: string[];
  }>;
  achievements: Array<{
    title: string;
    period: string;
    description: string;
  }>;
  certifications: Array<{
    title: string;
    issuer: string;
    details: string;
  }>;
  volunteering: Array<{
    organization: string;
    role: string;
    period: string;
    description: string;
  }>;
}

export const RESUME_KNOWLEDGE: ResumeData = {
  name: "Divya Sanjaykumar Raval",
  title: "Software Engineer",
  email: "divyaraval.cs@gmail.com",
  phone: "+91-7285049321",
  location: "Ahmedabad, Gujarat, India - 382481",
  linkedin: "https://www.linkedin.com/in/divyaraval/",
  github: "https://github.com/DivyaRaval1909",
  portfolio: "https://divyaraval.dev",
  bio: "Computer Science undergraduate at Nirma University (2023-2027) specializing in backend development, systems engineering, full-stack architecture, and AI/RAG workflows. Experienced in building scalable real-time collaborative workspaces, AI-driven automation pipelines, and transaction-safe web platforms with Redis TTL locking.",
  education: [
    {
      institution: "Institute of Technology, Nirma University",
      degree: "B.Tech. in Computer Science & Engineering",
      period: "2023 — 2027",
      grade: "CGPA: 8.47 / 10",
      details: "Focusing on systems programming, distributed systems, algorithms, and quantitative trading simulations."
    },
    {
      institution: "Shri Maruti Vidhyamandir, Bhavnagar",
      degree: "12th GSEB (Science Stream)",
      period: "2023",
      grade: "Percentile: 99.28 / 100",
      details: "ACPC State Engineering Admission Rank: 298"
    },
    {
      institution: "Mahatma Gandhi Vidhya Sankul, Bhavnagar",
      degree: "10th GSEB",
      period: "2021",
      grade: "Percentile: 99.83 / 100",
      details: "Top percentile across state board."
    }
  ],
  skills: {
    languages: ["C++", "JavaScript", "TypeScript", "Python", "SQL", "Solidity", "HTML5", "CSS3"],
    frameworks: ["React.js", "Node.js", "Express.js", "Socket.IO", "FastAPI", "Tailwind CSS", "Vite", "LangChain"],
    databasesAndTools: ["MongoDB", "Redis", "Supabase (Vector Search)", "AWS S3", "AWS Cloud", "Git", "GitHub", "Docker", "Postman", "Ollama", "NLTK", "Razorpay API"],
    coreConcepts: ["Data Structures & Algorithms", "Object-Oriented Programming (OOP)", "Database Management Systems (DBMS)", "Operating Systems", "Computer Networks", "Cryptography", "RAG Pipelines & Embeddings", "Smart Contracts (Ethereum & Solana)", "High Frequency Trading (HFT) Simulations"]
  },
  experience: [
    {
      company: "Marga Technologies",
      companyUrl: "https://margatech.com",
      role: "Full Stack Intern",
      period: "May 2026 — Jul 2026",
      points: [
        "Built and maintained full-stack MERN applications, integrating RESTful APIs with JWT authentication and role-based access control.",
        "Designed MongoDB schemas, optimized database queries, and implemented backend validations and secure cloud file uploads.",
        "Collaborated via Git/GitHub, debugged frontend/backend issues, and followed clean code principles in an Agile workflow."
      ],
      stack: ["MongoDB", "Express", "React", "Node.js", "JWT", "Git"]
    },
    {
      company: "CSC Cybersecurity Club, ITNU",
      companyUrl: "",
      role: "Executive Member",
      period: "Aug 2025 — Present",
      points: [
        "Contributing to cybersecurity events, student community initiatives, and hands-on workshops at ITNU.",
        "Organizing technical sessions on networking, ethical security practices, and infrastructure."
      ],
      stack: ["Cybersecurity", "Networking", "Community Management"]
    },
    {
      company: "HFT 2027 Batch Community, Nirma University",
      companyUrl: "",
      role: "Member",
      period: "Aug 2024 — Present",
      points: [
        "Focusing on algorithmic trading designs, high-frequency trading (HFT) models, market microstructure, and quantitative strategies.",
        "Analyzing market-making algorithms and designing efficient execution simulations in C++."
      ],
      stack: ["High Frequency Trading", "Algorithms", "Quantitative Finance", "C++"]
    },
    {
      company: "Parevda Group / Parewada NGO",
      companyUrl: "",
      role: "Volunteer (Community Service)",
      period: "May 2024 — Jul 2024",
      points: [
        "Volunteered in bird rescue and rehabilitation initiatives, contributing to wildlife conservation.",
        "Participated in tree plantation drives promoting environmental sustainability.",
        "Assisted in organizing blood donation camps for children with thalassemia."
      ],
      stack: ["Community Service", "Volunteering", "Social Impact"]
    }
  ],
  projects: [
    {
      title: "HackForge-AI",
      description: "AI-powered Discord hackathon bot that automates hackathon workflows including registrations, team formation, submissions, and judging. Implemented a custom RAG pipeline using Supabase Vector Search and Ollama to deliver context-aware answers from indexed PDFs, FAQs, and documentation. Built role-based automation for organizers, judges, mentors, and participants.",
      stack: ["Node.js", "Express.js", "Discord.js", "MongoDB", "Supabase", "Ollama", "RAG"],
      github: "https://github.com/DivyaRaval1909/HackForge-AI",
      keyFeatures: [
        "Automated registration and team formation via Discord bot commands",
        "RAG-grounded AI mentor answering queries from uploaded PDFs and FAQs",
        "Role provisioning and channel permission management",
        "Project submission tracking and automated judging scoring system"
      ]
    },
    {
      title: "RailYatra",
      description: "Full-stack railway ticket booking platform with secure JWT-based authentication and role-based authorization. Integrated Razorpay Payment Gateway for online ticket payments and automated booking confirmation. Implemented Redis TTL-based seat locking to resolve concurrent seat booking conflicts and prevent double bookings. Designed RESTful APIs for train search, seat availability, bookings, cancellations, and payment verification.",
      stack: ["React", "Node.js", "Express", "MongoDB", "Redis", "JWT", "Razorpay"],
      github: "https://github.com/DivyaRaval1909/RailYatra",
      keyFeatures: [
        "Redis TTL-based seat locking to prevent race conditions during high concurrency",
        "Seamless Razorpay checkout with webhook verification",
        "Interactive coach and seat layout selection",
        "Admin panel for train schedule and route management"
      ]
    },
    {
      title: "LabelX",
      description: "Decentralized data labeling platform integrating Solana wallets, AWS S3, JWT authentication, and role-based access control to securely manage annotation workflows and blockchain-based reward distribution.",
      stack: ["React.js", "Node.js", "Solana", "AWS S3", "JWT", "Solidity"],
      github: "https://github.com/DivyaRaval1909/LabelX",
      keyFeatures: [
        "Solana wallet integration for micropayments and labeling bounties",
        "Secure asset storage on AWS S3 with signed URLs",
        "Quality verification review pipeline for annotations"
      ]
    },
    {
      title: "DivDocs",
      description: "Google Docs-style collaborative editor with real-time multi-user editing using Socket.IO. Implemented document search, inline renaming, sharing, auto-save, and live presence indicators. Developed scalable REST APIs and MongoDB-backed storage with export support for PDF, Markdown, HTML, and TXT.",
      stack: ["React.js", "Node.js", "Express.js", "Socket.IO", "MongoDB"],
      github: "https://github.com/DivyaRaval1909/DivDocs",
      keyFeatures: [
        "Real-time synchronized cursor & content editing via WebSockets",
        "Auto-saving and multi-format document exporting (PDF, Markdown, HTML, TXT)",
        "Document access permissions and granular sharing links"
      ]
    },
    {
      title: "CricBid",
      description: "Production-grade decentralized IPL-style player auction platform built on Ethereum, enabling secure smart contract–based player bidding, team management, wallet integration, and transparent auction execution.",
      stack: ["Ethereum", "Solidity", "Web3.js", "React", "Smart Contracts"],
      github: "https://github.com/DivyaRaval1909/CricBid-Decentralized-Player-Auction-Platform",
      keyFeatures: [
        "Smart contract enforced purse limits and player ownership transfers",
        "Real-time bidding countdown and MetaMask transaction signing",
        "Team roster analytics and budget tracking"
      ]
    },
    {
      title: "BlockVote",
      description: "Secure decentralized voting platform built on Ethereum allowing election creation, voter registration, tamper-proof vote recording, and transparent real-time result tracking through a responsive Web3 interface.",
      stack: ["Ethereum", "Solidity", "Web3.js", "React", "Smart Contracts"],
      github: "https://github.com/DivyaRaval1909/BlockVote",
      keyFeatures: [
        "Zero vote-tampering through Ethereum blockchain immutability",
        "Voter eligibility verification and single-vote enforcement"
      ]
    },
    {
      title: "DocMind",
      description: "AI-powered document intelligence platform enabling semantic search, contextual question answering, and knowledge retrieval over uploaded documents using embeddings, vector search, and large language models.",
      stack: ["LLMs", "Vector Search", "Embeddings", "React", "Python", "FastAPI"],
      github: "https://github.com/DivyaRaval1909/DocMind",
      keyFeatures: [
        "Multi-format document ingestion (PDF, DOCX, TXT)",
        "Vector chunking and hybrid cosine similarity search",
        "Contextual citation of page numbers and source excerpts"
      ]
    },
    {
      title: "Episodic Intelligence Engine",
      description: "AI storytelling engine implementing a multi-stage episodic memory pipeline that combines LLMs, semantic retrieval, sentiment analysis, and contextual reasoning to generate coherent long-form narratives (MINeD Hackathon 2025 Finalist).",
      stack: ["Python", "LLMs", "Semantic Retrieval", "Sentiment Analysis", "NLTK"],
      github: "https://github.com/DivyaRaval1909/Episodic_Intelligence_Engine",
      keyFeatures: [
        "Emotional pacing and audience retention risk modeling using sentence-transformers",
        "Multi-voice podcast audio synthesis using GPT-4o-mini & TTS",
        "7-phase modular AI episodic narrative pipeline"
      ]
    },
    {
      title: "Chatify",
      description: "Full-stack real-time chat application built with React, Express, and MongoDB featuring secure authentication, instant messaging, modern responsive UI, and persistent conversation history.",
      stack: ["React", "Express", "MongoDB", "Node.js", "Socket.io", "Tailwind"],
      github: "https://github.com/DivyaRaval1909/chatify"
    }
  ],
  achievements: [
    {
      title: "MINeD HACKATHON (2025) — Top 10 Finalist",
      period: "Jan 2025",
      description: "Built Episodic Intelligence Engine, a modular 7-phase AI pipeline that decomposes story concepts into structured episodic series with emotional pacing analysis using sentence-transformers and multi-voice audio synthesis."
    },
    {
      title: "Competitive Programming (LeetCode & Codeforces)",
      period: "Ongoing",
      description: "LeetCode: Top 7.23% globally with Max Rating 1,852 (150+ problems solved in C++). Codeforces: Pupil ranking with Max Rating 1,303."
    },
    {
      title: "ACPC Engineering Admission Rank & 12th Board",
      period: "March 2023",
      description: "Secured ACPC State Rank 298 in Gujarat engineering admission. 99.28 percentile in 12th Science (GSEB) and 99.83 percentile in 10th GSEB."
    },
    {
      title: "District-Level Chess Participant — Khel Mahakumbh",
      period: "Oct 2023",
      description: "Competed in district-level chess championship representing school/college, demonstrating strategic calculation under time pressure."
    }
  ],
  certifications: [
    {
      title: "AWS Academy Graduate — Cloud Foundations",
      issuer: "Amazon Web Services (AWS)",
      details: "Validation of foundational cloud computing concepts, AWS compute/storage services, security, cloud architecture, and pricing."
    },
    {
      title: "SQL (Advanced)",
      issuer: "HackerRank",
      details: "Advanced database queries, performance optimization, indexing, multi-table joins, subqueries, and window functions."
    },
    {
      title: "Rest API (Intermediate)",
      issuer: "HackerRank",
      details: "RESTful routing protocols, HTTP methods & status codes, pagination, authentication headers, and web service patterns."
    }
  ],
  volunteering: [
    {
      organization: "Parewada NGO",
      role: "Volunteer",
      period: "2024",
      description: "Bird rescue & rehabilitation, environmental tree planting drives, and blood donation camps for thalassemia patients."
    }
  ]
};

export const GEMINI_SYSTEM_INSTRUCTION = `You are "Puppet", Divya Raval's personal interactive AI assistant on his portfolio website.
Your mission is to represent Divya Raval accurately, enthusiastically, and professionally to recruiters, developers, hiring managers, and visitors.

Always answer questions based on the following verified knowledge about Divya Raval:

${JSON.stringify(RESUME_KNOWLEDGE, null, 2)}

### Guidelines:
1. Speak concisely, clearly, and informatively. Use markdown formatting (bullet points, bold text, code snippets, links) where helpful.
2. If asked about Divya's skills, experience, projects, or background, give specific, impactful answers highlighting real metrics (e.g. 8.47 CGPA, Top 7% LeetCode rating 1852, ACPC rank 298, Redis TTL locking in RailYatra, Supabase RAG in HackForge-AI).
3. If asked about contacting Divya or hiring him, provide his email (divyaraval.cs@gmail.com), LinkedIn (https://www.linkedin.com/in/divyaraval/), and GitHub (https://github.com/DivyaRaval1909).
4. If a question is outside the scope of Divya's background or portfolio, answer politely and pivot back to how Divya's skills might be relevant.
5. Maintain a friendly, witty, intelligent, developer-savvy persona inspired by Claude Code's terminal companion.`;

/**
 * Intelligent client-side fallback engine for when Gemini API key is not configured or offline.
 */
export function getLocalFallbackResponse(query: string): string {
  const q = query.toLowerCase().trim();

  // Skills & Tech Stack
  if (q.includes("skill") || q.includes("tech stack") || q.includes("languages") || q.includes("frameworks") || q.includes("technologies") || q.includes("what does he know")) {
    return `### 🛠️ Divya's Core Technical Skills

- **Languages:** \`C++\`, \`JavaScript\`, \`TypeScript\`, \`Python\`, \`SQL\`, \`Solidity\`, \`HTML5/CSS3\`
- **Frameworks & Libraries:** \`React.js\`, \`Node.js\`, \`Express.js\`, \`Socket.IO\`, \`FastAPI\`, \`Tailwind CSS\`, \`LangChain\`
- **Databases & Cloud:** \`MongoDB\`, \`Redis\`, \`Supabase (Vector Search)\`, \`AWS S3\`, \`AWS Cloud\`, \`Docker\`
- **Core Specialties:**
  - Full-Stack Web Development (MERN)
  - Systems & Concurrency (Redis TTL locking, WebSockets)
  - AI & RAG Architectures (Supabase Vector Search, Ollama, Sentence Transformers)
  - Smart Contracts & Web3 (Ethereum Solidity, Solana)
  - Data Structures & Algorithms (Top 7.2% LeetCode, Rating 1,852)`;
  }

  // Projects
  if (q.includes("hackforge") || (q.includes("hack") && q.includes("forge"))) {
    const p = RESUME_KNOWLEDGE.projects[0];
    return `### 🤖 HackForge-AI
**Description:** ${p.description}
- **Stack:** ${p.stack.join(", ")}
- **Key Features:**
  - Automated Discord server registration & team matching
  - Custom RAG pipeline with Supabase Vector Search & Ollama
  - Automated project judging workflows
- **GitHub:** [HackForge-AI Repository](${p.github})`;
  }

  if (q.includes("railyatra") || q.includes("rail") || q.includes("yatra") || q.includes("booking")) {
    const p = RESUME_KNOWLEDGE.projects[1];
    return `### 🚆 RailYatra (Railway Ticket Booking Platform)
**Description:** ${p.description}
- **Stack:** ${p.stack.join(", ")}
- **Key Highlights:**
  - **Redis TTL-based seat locking** to eliminate concurrent double-booking conflicts during peak traffic.
  - Razorpay payment gateway integration with automated ticket generation.
  - Full JWT authentication and role-based permissions.
- **GitHub:** [RailYatra Repository](${p.github})`;
  }

  if (q.includes("divdocs") || q.includes("docs") || q.includes("collaborative") || q.includes("editor")) {
    const p = RESUME_KNOWLEDGE.projects[3];
    return `### 📝 DivDocs (Real-Time Collaborative Document Workspace)
**Description:** ${p.description}
- **Stack:** ${p.stack.join(", ")}
- **Key Features:** Real-time multi-cursor editing via Socket.IO, document search, auto-saving, and multi-format export (PDF, Markdown, HTML, TXT).
- **GitHub:** [DivDocs Repository](${p.github})`;
  }

  if (q.includes("labelx") || q.includes("solana")) {
    const p = RESUME_KNOWLEDGE.projects[2];
    return `### 🏷️ LabelX (Decentralized Data Labeling Platform)
**Description:** ${p.description}
- **Stack:** ${p.stack.join(", ")}
- **GitHub:** [LabelX Repository](${p.github})`;
  }

  if (q.includes("cricbid") || q.includes("blockvote") || q.includes("blockchain") || q.includes("web3") || q.includes("ethereum") || q.includes("smart contract")) {
    return `### ⛓️ Divya's Web3 & Smart Contract Projects

1. **CricBid:** Decentralized IPL-style player auction on Ethereum with Solidity smart contracts enforcing purse budgets and player bidding. ([GitHub](${RESUME_KNOWLEDGE.projects[4].github}))
2. **BlockVote:** Secure decentralized voting platform on Ethereum ensuring tamper-proof election results. ([GitHub](${RESUME_KNOWLEDGE.projects[5].github}))
3. **LabelX:** Solana wallet-integrated decentralized data annotation with token bounties. ([GitHub](${RESUME_KNOWLEDGE.projects[2].github}))`;
  }

  if (q.includes("project") || q.includes("portfolio") || q.includes("work") || q.includes("build")) {
    return `### 🚀 Divya's Featured Projects

1. **HackForge-AI:** AI-powered Discord hackathon OS with Supabase RAG and Ollama.
2. **RailYatra:** Railway ticket booking platform with Redis TTL seat locking and Razorpay.
3. **DivDocs:** Google Docs-style real-time collaborative editor with WebSockets & MongoDB.
4. **Episodic Intelligence Engine:** AI episodic storytelling pipeline (MINeD Hackathon 2025 Finalist).
5. **LabelX:** Decentralized data labeling on Solana & AWS S3.
6. **CricBid & BlockVote:** Ethereum decentralized applications.
7. **DocMind:** Document semantic search & RAG intelligence.
8. **Chatify:** Full-stack real-time messaging application.

Ask me about any specific project for in-depth technical details!`;
  }

  // Experience / Internships
  if (q.includes("experience") || q.includes("intern") || q.includes("marga") || q.includes("work history") || q.includes("job")) {
    const m = RESUME_KNOWLEDGE.experience[0];
    return `### 💼 Work Experience

- **${m.company}** — *${m.role}* (${m.period})
  - [Company Website](${m.companyUrl})
  - Developed and maintained full-stack MERN web applications.
  - Integrated RESTful APIs with secure JWT authentication and role-based access control.
  - Designed MongoDB schemas, optimized database queries, and implemented secure cloud uploads.
  - Collaborated in an Agile workflow with Git/GitHub code reviews.

- **CSC Cybersecurity Club, ITNU** — *Executive Member* (Aug 2025 — Present)
  - Organizing technical events, security workshops, and student community initiatives.

- **HFT 2027 Batch Community, Nirma University** — *Member* (Aug 2024 — Present)
  - Quantitative finance, algorithmic trading models, and C++ market simulation designs.`;
  }

  // Education & Academics
  if (q.includes("education") || q.includes("college") || q.includes("university") || q.includes("nirma") || q.includes("gpa") || q.includes("cgpa") || q.includes("degree") || q.includes("school")) {
    return `### 🎓 Education & Academic Background

- **Institute of Technology, Nirma University** (2023 — 2027)
  - **B.Tech in Computer Science & Engineering**
  - **CGPA:** \`8.47 / 10\`
  - Key focus: Backend systems, distributed applications, algorithms, and quantitative models.
- **Shri Maruti Vidhyamandir, Bhavnagar** (2023)
  - **12th GSEB (Science):** \`99.28 Percentile\`
  - **ACPC State Rank:** \`298\` across Gujarat state engineering entrance.
- **Mahatma Gandhi Vidhya Sankul, Bhavnagar** (2021)
  - **10th GSEB:** \`99.83 Percentile\``;
  }

  // Achievements & Competitions
  if (q.includes("achievement") || q.includes("hackathon") || q.includes("leetcode") || q.includes("codeforces") || q.includes("rating") || q.includes("competitive programming") || q.includes("chess")) {
    return `### 🏆 Key Achievements & Competitive Coding

- 🥇 **MINeD Hackathon 2025 (Top 10 Finalist):** Built *Episodic Intelligence Engine*, a modular 7-phase AI pipeline for episodic story generation and emotional pacing risk analysis.
- 💻 **LeetCode:** **Top 7.23% globally**, Max Rating **1,852** (Username: \`DivyaRaval\`).
- ⚔️ **Codeforces:** **Pupil** rank, Max Rating **1,303** (Handle: \`divyaraval\`).
- 🎯 **State Rank 298:** ACPC Gujarat engineering admission ranking.
- ♟️ **District-Level Chess:** Competed in *Khel Mahakumbh*, Gujarat.`;
  }

  // Certifications
  if (q.includes("certif") || q.includes("aws") || q.includes("hackerrank") || q.includes("credential")) {
    return `### 📜 Certifications & Badges

1. **AWS Academy Graduate — Cloud Foundations** (Amazon Web Services)
2. **SQL (Advanced)** — HackerRank
3. **REST API (Intermediate)** — HackerRank`;
  }

  // Contact / Hire
  if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("phone") || q.includes("linkedin") || q.includes("reach") || q.includes("location")) {
    return `### 📬 Contact Divya Raval

- **Email:** [divyaraval.cs@gmail.com](mailto:divyaraval.cs@gmail.com)
- **LinkedIn:** [linkedin.com/in/divyaraval](https://www.linkedin.com/in/divyaraval/)
- **GitHub:** [github.com/DivyaRaval1909](https://github.com/DivyaRaval1909)
- **Phone:** \`+91-7285049321\`
- **Location:** Ahmedabad, Gujarat, India (Open to Remote / Relocation)

Divya is currently open to software engineering internships, remote opportunities, and impactful tech projects!`;
  }

  // General Intro fallback
  return `### 🤖 Hi! I'm Puppet, Divya's AI Resume Agent.

Here is a quick snapshot of Divya Raval:
- **Role:** Software Engineer & CSE Undergrad @ **Nirma University** (CGPA 8.47)
- **Strengths:** Backend development, Distributed Systems (Redis TTL, WebSockets), RAG AI Pipelines, and C++ Problem Solving.
- **Top Projects:** **HackForge-AI** (Discord RAG Bot), **RailYatra** (Ticket Booking with Redis locking), and **DivDocs** (Real-time Editor).
- **Achievements:** Top 10 Finalist @ MINeD Hackathon 2025, Top 7.2% on LeetCode (Rating 1,852).

What would you like to know more about? You can ask me about his **projects**, **skills**, **work experience at Marga Technologies**, **education**, or **how to contact him**!`;
}
