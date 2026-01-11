"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { ShoppingBag, Car, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const experiences = [
    {
        company: "Alhat Holdings",
        role: "Software Engineer",
        period: "July 2025 – Present",
        project: "Reclaim",
        description: "Developing an AI-powered shopping assistant that simplifies resale and recycling. Built a cross-platform mobile app ensuring high performance and scalability. Integrated AWS services for robust backend support.",
        tech: ["Flutter", "AWS", "Python", "Docker"],
        icon: ShoppingBag,
        links: [
            { label: "App Store", url: "#", icon: "apple" },
            { label: "Play Store", url: "#", icon: "google" }
        ],
        bgGradient: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 70%)"
    },
    {
        company: "Codeft Technologies",
        role: "Full Stack Java Developer",
        period: "Feb 2025 – June 2025",
        project: "Treepzy",
        description: "Built a comprehensive ride-booking application. Handled complex backend logic for ride matching and real-time tracking using Spring Boot, coupled with a responsive Ionic Angular frontend.",
        tech: ["Java", "Spring Boot", "Ionic Angular", "MySQL"],
        icon: Car,
        links: [],
        bgGradient: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.15), transparent 70%)"
    },
    {
        company: "HashedBit Innovations",
        role: "Software Developer Intern",
        period: "April 2024 – July 2024",
        project: "Dresshub",
        description: "Developed a dynamic e-commerce platform featuring product catalogs, user authentication, and secure payment gateway integration using the MERN stack ecosystem.",
        tech: ["React.js", "Node.js", "MySQL", "Redux"],
        icon: ShoppingCart,
        links: [],
        bgGradient: "radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.15), transparent 70%)"
    },
];

interface CardProps {
    exp: typeof experiences[0];
    i: number;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
    isLast: boolean;
}

const Card = ({ exp, i, progress, range, targetScale, isLast }: CardProps) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);

    // Animate scale and opacity based on global progress
    // Opacity fades out 1 -> 0 over the range where the NEXT card is coming in.
    // If it is the last card, stay 1.
    const opacity = useTransform(progress, range, [1, isLast ? 1 : 0]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0 overflow-hidden">
            <motion.div
                style={{ scale, opacity }}
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-background origin-top"
            >
                {/* Ambient Background - Solid Base */}
                <div className="absolute inset-0 bg-background" />

                <div
                    className="absolute inset-0 opacity-40 transition-opacity duration-500"
                    style={{ background: exp.bgGradient }}
                />

                <div className="relative z-10 max-w-7xl w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Content */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-400 font-mono text-sm mb-8">
                            <span>{exp.period}</span>
                        </div>
                        <h3 className="text-5xl md:text-7xl font-bold text-white mb-2 leading-tight">
                            {exp.project}
                        </h3>
                        <div className="text-xl md:text-2xl text-white/50 font-medium mb-8">
                            {exp.company}
                        </div>

                        <p className="text-lg text-white/70 leading-relaxed max-w-xl">
                            {exp.description}
                        </p>

                        {exp.links.length > 0 && (
                            <div className="flex gap-4 mt-8">
                                {exp.links.map((link, idx) => (
                                    <Button key={idx} variant="outline" className="h-12 px-6 rounded-full bg-white/5 border-white/10 hover:bg-white/20 text-white gap-2">
                                        {link.icon === "apple" ? (
                                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-1.23 3.91-1.12 1.5.09 2.47.71 3.42 1.84-2.5 1.51-2.09 5.83.63 6.99-.48 2.63-1.7 4.77-3.04 4.52zM12.03 7.25c-.23-1.64 1.05-3.32 2.62-3.58.19 1.66-1.55 3.49-2.62 3.58z" /></svg>
                                        ) : (
                                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M5.05 19.38L18.66 12 5.05 4.62c-.66.36-1.07 1-1.07 1.69v11.38c0 .69.41 1.33 1.07 1.69zM6.9 7.43L15.32 12 6.9 16.57V7.43z" /></svg>
                                        )}
                                        {link.label}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Icon & Tech - with extra motion */}
                    <div className="relative flex flex-col items-center justify-center p-12 rounded-[3rem] border border-white/5 bg-white/5 backdrop-blur-sm aspect-square max-h-[500px]">
                        <motion.div style={{ scale: imageScale }} className="p-8 rounded-3xl bg-white/5 border border-white/10 mb-8 shadow-2xl">
                            <exp.icon className="w-24 h-24 text-white/90" />
                        </motion.div>

                        <div className="flex flex-wrap gap-3 justify-center">
                            {exp.tech.map((t) => (
                                <span key={t} className="px-4 py-2 rounded-full bg-black/40 border border-white/10 text-sm text-white/80">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export function Experience() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <div ref={container} className="relative h-[400vh] bg-background">
            {/* Header - Non-sticky to avoid overlap issues */}
            <div className="relative z-10 py-8 text-center bg-background pt-24 pb-12">
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                    Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Experience</span>
                </h2>
            </div>

            {experiences.map((exp, i) => {
                const targetScale = 1 - ((experiences.length - i) * 0.05);
                const step = 1 / experiences.length;
                // Fade out window: from when this starts being 'active' (i * step) 
                // to when the NEXT one is fully active ((i + 1) * step).
                // If it's the last one, it never fades, just scrolls away naturally.
                const range: [number, number] = [i * step, (i + 1) * step];

                return (
                    <Card
                        key={i}
                        i={i}
                        exp={exp}
                        progress={scrollYProgress}
                        range={range}
                        targetScale={targetScale}
                        isLast={i === experiences.length - 1}
                    />
                );
            })}
        </div>
    );
}
