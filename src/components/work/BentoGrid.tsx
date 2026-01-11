"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Project {
    id: string;
    title: string;
    category: string;
    image: string;
    size: "small" | "medium" | "large";
}

const projects: Project[] = [
    {
        id: "1",
        title: "Neon Dreams",
        category: "Branding",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
        size: "large",
    },
    {
        id: "2",
        title: "Urban Flow",
        category: "Photography",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
        size: "medium",
    },
    {
        id: "3",
        title: "Tech Noir",
        category: "Web Design",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
        size: "small",
    },
    {
        id: "4",
        title: "Abstract Mind",
        category: "Art Direction",
        image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop",
        size: "medium",
    },
    {
        id: "5",
        title: "Future City",
        category: "3D Motion",
        image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=2070&auto=format&fit=crop",
        size: "small",
    },
];

export function BentoGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={cn(
                        "relative group overflow-hidden rounded-3xl bg-neutral-900 aspect-square",
                        project.size === "large" && "md:col-span-2 md:row-span-2",
                        project.size === "medium" && "md:col-span-1",
                        project.size === "small" && "md:col-span-1"
                    )}
                >
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                        <p className="text-white/70">{project.category}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
