import { ExternalLink, Github } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
interface ProjectCardProps {
    index: string;
    title: string;
    description: string;
    techStack: string[];
    imageLeft: boolean;
    githubUrl: string;
    liveUrl: string;
    img_url: string;
    youtubeUrl: string;
  }

const ProjectCard = ({
        index,
        title,
        description,
        techStack,
        imageLeft,
        githubUrl,
        liveUrl,
        img_url,
        youtubeUrl
    }: ProjectCardProps) => {
        const [isVisible, setIsVisible] = useState(false);
        const cardRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        if (cardRef.current) observer.unobserve(cardRef.current);
                    }
                },
                {
                    threshold: 0.1,
                }
            );
    
            if (cardRef.current) {
                observer.observe(cardRef.current);
            }
    
            return () => {
                if (cardRef.current) observer.unobserve(cardRef.current);
            };
        }, []);

        return (
            <>
                    <div ref={cardRef} className={`relative py-12 md:py-24 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}>
                        <div className="absolute -top-8 md:top-0 left-0 right-0 flex justify-center pointer-events-none">
                            <span className="mono text-[6rem] md:text-[10rem] text-[#111111] select-none">
                            {index}
                            </span>
                        </div> 

                        <div className="relative p-6 border border-border-main rounded-3xl bg-bg-card ring-1 ring-accent/10 hover:bg-bg-card-hover hover:border-accent hover:ring-accent/20 transition-all duration-300">
                            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center`}>
                                <div className={`order-1 ${imageLeft ? 'md:order-1' : 'md:order-2'}`}>
                                    <div className="aspect-4/3 bg-bg-card border border-border-main rounded-sm overflow-hidden hover:border-border-badge transition-colors duration-300">
                                        <img src={img_url} className="w-full h-full object-cover" />
                                    </div>
                                </div>

                                <div className={`order-2 ${imageLeft ? 'md:order-2' : 'md:order-1'}`}>
                                    <h3 className="text-text-card-title mb-4">{title}</h3>
                                    <p className="text-text-faint mb-6 leading-relaxed">{description}</p>

                            <div className="flex flex-wrap gap-3 mb-8">
                                {techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="mono px-3 py-1.5 bg-bg-card border border-border-inner text-text-light text-sm hover:border-accent hover:text-text-card-title transition-all duration-300"
                                >
                                    {tech}
                                </span>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <a className="mono px-4 py-2 border border-border-inner text-text-light text-sm hover:border-accent hover:text-accent transition-all duration-300 flex items-center gap-2"  href={githubUrl} target='_blank'>
                                <Github className="w-4 h-4" />
                                [ GitHub ]
                                </a>
                                
                                {liveUrl !== "" && (
                                    <a 
                                        href={liveUrl}
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="mono px-4 py-2 border border-border-inner text-text-light text-sm hover:border-accent hover:text-accent transition-all duration-300 flex items-center gap-2"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        [ Live Demo ]
                                    </a>
                                )}
                                
                                {youtubeUrl !== "" && (
                                    <a 
                                        href={youtubeUrl}
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="mono px-4 py-2 border border-border-inner text-text-light text-sm hover:border-accent hover:text-accent transition-all duration-300 flex items-center gap-2"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        [ Video Demo ]
                                    </a>
                                )}
                            </div>
                            </div>
                            </div>
                        </div>
                        </div>
            </>
        )
}

export default ProjectCard