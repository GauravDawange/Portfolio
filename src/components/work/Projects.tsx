"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
    {
        id: 1,
        title: "Project Alpha",
        category: "Generative AI",
        description: "An experimental platform leveraging LLMs to create dynamic narratives. Built with Next.js 14, standardizing a new way to interact with AI models.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        tech: ["Next.js", "OpenAI API", "Tailwind"],
        links: [
            { label: "Live Demo", url: "#" },
            { label: "GitHub", url: "#" }
        ],
        gradient: "from-pink-500/20 to-rose-500/20"
    },
    {
        id: 2,
        title: "Project Beta",
        category: "Fintech Dashboard",
        description: "Real-time financial data visualization tool. Processes thousands of transactions per second with WebSocket integration and D3.js charts.",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
        tech: ["Vue.js", "D3.js", "Firebase"],
        links: [
            { label: "Live Demo", url: "#" },
            { label: "GitHub", url: "#" }
        ],
        gradient: "from-blue-500/20 to-cyan-500/20"
    }
];

function ProjectCard({ project }: { project: typeof projects[0] }) {
    return (
        <div className="group relative h-[70vh] w-[90vw] md:w-[70vw] shrink-0 rounded-[3rem] overflow-hidden border border-white/10 bg-neutral-900/50 backdrop-blur-xl snap-center">
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br opacity-20 transition-opacity duration-500 group-hover:opacity-40 ${project.gradient}`} />

            <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
                {/* Image Side */}
                <div className="relative h-1/2 md:h-full overflow-hidden">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-neutral-900 to-transparent opacity-80" />
                </div>

                {/* Content Side */}
                <div className="relative p-6 md:p-16 flex flex-col justify-center h-1/2 md:h-full z-10">
                    <div className="mb-auto">
                        <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-white/60 mb-4 md:mb-6">
                            {project.category}
                        </span>
                        <h3 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
                            {project.title}
                        </h3>
                        <p className="text-base md:text-xl text-white/60 leading-relaxed max-w-md line-clamp-3 md:line-clamp-none">
                            {project.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                        {project.tech.map(t => (
                            <span key={t} className="px-3 py-1 bg-black/40 border border-white/5 rounded-lg text-xs md:text-sm text-white/40">
                                {t}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        {project.links.map((link, i) => (
                            <Button key={i} className="rounded-full bg-white text-black hover:bg-white/90 gap-2 h-10 md:h-12 px-4 md:px-6 text-sm md:text-base">
                                {link.label}
                                <ArrowUpRight className="w-4 h-4" />
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function Projects() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

    return (
        // Mobile: Default height, Desktop: Tall for scroll animation
        <section ref={targetRef} className="relative h-auto md:h-[300vh] bg-background">

            {/* Desktop: Sticky container. Mobile: Regular block */}
            <div className="relative md:sticky top-0 h-auto md:h-screen flex flex-col justify-center overflow-hidden py-12 md:py-0">

                <div className="mb-8 md:mb-12 px-6 md:px-12 text-center">
                    <h2 className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 tracking-tighter">
                        Projects
                    </h2>
                </div>

                <div className="relative w-full">
                    {/* Desktop: Motion Div controlled by scroll. Mobile: Horizontal Scroll Box */}
                    <div className="hidden md:block pl-12">
                        <motion.div style={{ x }} className="flex gap-16 w-max">
                            {projects.map((project, i) => (
                                <ProjectCard key={i} project={project} />
                            ))}
                        </motion.div>
                    </div>

                    {/* Mobile View: Native Horizontal Scroll */}
                    <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 pb-12 w-full no-scrollbar">
                        {projects.map((project, i) => (
                            <ProjectCard key={i} project={project} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
