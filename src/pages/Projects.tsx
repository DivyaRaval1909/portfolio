import ProjectCard from "../components/ProjectCard";
import RegularGridBackground from "../components/RegularGridBackground";
export default function Projects() {
  const projects = [
    {
      index: "01",
      title: "HackForge-AI",
      description:
        "AI-powered Discord hackathon operating system that automates registrations, team formation, judging, mentor support, and event management using RAG over PDFs, Discord channels, and documentation with role-based workflows and AI-assisted server provisioning.",
      techStack: [
        "Discord API",
        "Python",
        "LangChain",
        "RAG",
        "Vector DB",
        "Docker"
      ],
      githubUrl: "https://github.com/DivyaRaval1909/HackForge-AI",
      liveUrl: "",
      img_url: "/assets/hackforge.png",
      youtubeUrl: ""
    },
    {
      index: "02",
      title: "RailYatra",
      description:
        "Full-stack MERN railway booking platform featuring JWT authentication, interactive seat selection, Redis-based seat locking with TTL to prevent double booking, Razorpay payment integration, automated ticket generation, and an admin dashboard for train and booking management.",
      techStack: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Redis",
        "Razorpay",
        "JWT"
      ],
      githubUrl: "https://github.com/DivyaRaval1909/RailYatra",
      liveUrl: "",
      img_url: "/assets/railyatra.png",
      youtubeUrl: ""
    },
    {
      index: "03",
      title: "LabelX",
      description:
        "Decentralized data labeling platform integrating Solana wallets, AWS S3, JWT authentication, and role-based access control to securely manage annotation workflows and blockchain-based reward distribution.",
      techStack: [
        "React.js",
        "Node.js",
        "Solana",
        "AWS S3",
        "JWT",
        "Solidity"
      ],
      githubUrl: "https://github.com/DivyaRaval1909/LabelX",
      liveUrl: "",
      img_url: "/assets/labelx.png",
      youtubeUrl: ""
    },
    {
      index: "04",
      title: "DivDocs",
      description:
        "Google Docs–style collaborative editor supporting real-time document editing, rich text formatting, document sharing, and persistent cloud storage using Socket.IO and MongoDB.",
      techStack: [
        "React.js",
        "Socket.io",
        "MongoDB",
        "Node.js",
        "Express.js"
      ],
      githubUrl: "https://github.com/DivyaRaval1909/DivDocs",
      liveUrl: "",
      img_url: "/assets/divdocs.png",
      youtubeUrl: ""
    },
  ];

  return (
    <>
      <section className="relative py-20 md:py-32 min-h-screen pt-32">
        <div className='absolute inset-0 -z-10'>
          <RegularGridBackground/>
        </div>
        <div className="relative mx-auto w-full md:w-[70%]">
          {/* borders */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-[#222222] hidden md:block" />
          <div className="absolute right-0 top-0 bottom-0 w-px bg-[#222222] hidden md:block" />

          <div className="mb-2 px-6 md:px-16">
          <h2 className="text-[#E0E0E0] mb-4">Projects</h2>

          </div>

          <div className="px-6 md:px-16 space-y-16">
            {
              projects.map((project, index) => (
                <ProjectCard 
                  key = {project.index}
                  index = {project.index}
                  title = {project.title}
                  description = {project.description}
                  techStack = {project.techStack}
                  imageLeft = {index%2 === 0 }
                  githubUrl = {project.githubUrl}
                  liveUrl = {project.liveUrl}
                  img_url = {project.img_url}
                  youtubeUrl = {project.youtubeUrl}
                />
              ))
            }
          </div>
        </div>
      </section>
    </>
  )
}