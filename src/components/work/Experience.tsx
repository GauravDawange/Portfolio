"use client";

import { motion, useScroll, useTransform, MotionValue, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ShoppingBag, Car, ShoppingCart, ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react";
import Image from "next/image";

const reclaimImages = [
    "/images/reclaim/Mobile-Onboarding-7-1.png",
    "/images/reclaim/Mobile-Onboarding-8-1.png",
    "/images/reclaim/Mobile-Onboarding-9-1.png",
    "/images/reclaim/AI-Prefilled-Item-Screen.png",
    "/images/reclaim/Photo-Upload-Screen-1.png",
    "/images/reclaim/My-Brands-List-2.png",
    "/images/reclaim/Top-Deals-1.png",
    "/images/reclaim/Events-List-1.png",
    "/images/reclaim/Success---Items-Moved-to-Wallet-5.png",
    "/images/reclaim/Invite-Friends-1.png",
];

interface Experience {
    company: string;
    role: string;
    period: string;
    project: string;
    logo: string;
    description: string;
    fullDescription: string;
    features: string[];
    tech: string[];
    icon: React.ComponentType<{ className?: string }>;
    images: string[];
    links: { label: string; url: string; icon: string }[];
    bgGradient: string;
    accentColor: string;
}

const experiences: Experience[] = [
    {
        company: "Alhat Holdings",
        role: "Software Engineer",
        period: "July 2025 – Present",
        project: "Reclaim",
        logo: "/images/reclaim/reclaim-logo.png",
        description: "Developing an AI-powered sustainable fashion platform that simplifies resale and recycling. Built a cross-platform mobile app with AI image analysis, digital closet management, donation logistics, and a rewards ecosystem.",
        fullDescription: "Reclaim is an AI-powered sustainable fashion platform that simplifies resale and recycling. The cross-platform mobile app features AI image analysis for automatic item categorization, a digital closet management system, donation logistics coordination, and a comprehensive rewards ecosystem. Integrated with AWS services for a robust and scalable backend, the platform supports 8 locales for international reach and uses Google ML Kit for on-device intelligence.",
        features: [
            "AI-powered image analysis for automatic clothing categorization",
            "Digital closet management with smart organization",
            "Donation logistics and pickup scheduling",
            "Rewards ecosystem with gamification elements",
            "Multi-language support (8 locales)",
            "Real-time push notifications & in-app events",
            "Social features – invite friends & referral system",
            "Multi-authentication (Google, Apple, Email, Phone)",
            "Brand recognition and top deals curation",
        ],
        tech: ["Flutter", "AWS", "Python", "Docker", "Google ML Kit"],
        icon: ShoppingBag,
        images: reclaimImages,
        links: [
            { label: "App Store", url: "https://apps.apple.com/in/app/reclaim/id6744350699", icon: "apple" },
            { label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.world.Reclaim&pcampaignid=web_share", icon: "google" }
        ],
        bgGradient: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 70%)",
        accentColor: "#3b82f6",
    },
    {
        company: "Codeft Technologies",
        role: "Full Stack Java Developer",
        period: "Feb 2025 – June 2025",
        project: "Treepzy",
        logo: "/images/projects/treepzy-logo.svg",
        description: "Built a comprehensive ride-booking application. Handled complex backend logic for ride matching and real-time tracking using Spring Boot, coupled with a responsive Ionic Angular frontend.",
        fullDescription: "Treepzy is a comprehensive ride-booking platform designed to streamline urban transportation. The application features intelligent ride matching algorithms, real-time GPS tracking, and a seamless booking experience. Built with a robust Spring Boot backend handling complex business logic and a responsive Ionic Angular frontend for cross-platform compatibility.",
        features: [
            "Intelligent ride matching algorithm",
            "Real-time GPS tracking for drivers and riders",
            "Dynamic pricing engine based on demand",
            "Driver and rider rating system",
            "In-app payment processing",
            "Route optimization with live traffic data",
        ],
        tech: ["Java", "Spring Boot", "Ionic Angular", "MySQL"],
        icon: Car,
        images: [],
        links: [],
        bgGradient: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.15), transparent 70%)",
        accentColor: "#10b981",
    },
    {
        company: "HashedBit Innovations",
        role: "Software Developer Intern",
        period: "April 2024 – July 2024",
        project: "Dresshub",
        logo: "/images/projects/dresshub-logo.svg",
        description: "Developed a dynamic e-commerce platform featuring product catalogs, user authentication, and secure payment gateway integration using the MERN stack ecosystem.",
        fullDescription: "DressHub is a dynamic e-commerce platform tailored for the fashion industry. It features comprehensive product catalog management, multi-tier user authentication, secure payment gateway integration, and an intuitive shopping experience. Built using the MERN stack with Redux for state management, the platform provides seamless browsing, cart management, and order tracking capabilities.",
        features: [
            "Product catalog with advanced search & filters",
            "User authentication with JWT tokens",
            "Secure Razorpay payment gateway integration",
            "Shopping cart with real-time updates",
            "Order tracking and history",
            "Admin panel for product & inventory management",
        ],
        tech: ["React.js", "Node.js", "MySQL", "Redux"],
        icon: ShoppingCart,
        images: [],
        links: [],
        bgGradient: "radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.15), transparent 70%)",
        accentColor: "#f97316",
    },
];

/* ─── Full-screen Detail Modal ─── */
const ExperienceDetailModal = ({
    exp,
    onClose,
}: {
    exp: Experience;
    onClose: () => void;
}) => {
    const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl overflow-y-auto"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-w-6xl mx-auto my-8 md:my-16 px-4 sm:px-6"
                onClick={(e) => e.stopPropagation()}
            >
            {/* Close button */}
            <button
                onClick={onClose}
                className="fixed top-4 right-4 md:top-8 md:right-8 z-[210] w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
            >
                <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-16 md:py-24">
                {/* Header with logo */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8"
                >
                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border border-white/10 bg-white/5 flex-shrink-0">
                        <Image src={exp.logo} alt={`${exp.project} logo`} fill className="object-cover" sizes="80px" />
                    </div>
                    <div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{exp.project}</h2>
                        <p className="text-base md:text-lg text-white/50">{exp.role} • {exp.company}</p>
                    </div>
                </motion.div>

                {/* Period badge */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-400 font-mono text-sm mb-8"
                >
                    {exp.period}
                </motion.div>

                {/* Full description */}
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-base md:text-lg text-white/70 leading-relaxed max-w-3xl mb-10"
                >
                    {exp.fullDescription}
                </motion.p>

                {/* Features */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="mb-10"
                >
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {exp.features.map((f, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                <span className="mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: exp.accentColor }} />
                                <span className="text-sm md:text-base text-white/70">{f}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Tech stack */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-10"
                >
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                        {exp.tech.map((t) => (
                            <span
                                key={t}
                                className="px-4 py-2 rounded-full border text-sm md:text-base text-white/90 font-medium"
                                style={{ borderColor: exp.accentColor + "40", backgroundColor: exp.accentColor + "15" }}
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Links */}
                {exp.links.length > 0 && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.35 }}
                        className="mb-10"
                    >
                        <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">Links</h3>
                        <div className="flex flex-wrap gap-3">
                            {exp.links.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center h-12 px-6 rounded-full border border-white/10 hover:bg-white/10 text-white gap-2 text-sm md:text-base font-medium transition-all hover:scale-105 active:scale-95"
                                    style={{ backgroundColor: exp.accentColor + "15" }}
                                >
                                    {link.icon === "apple" ? (
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-1.23 3.91-1.12 1.5.09 2.47.71 3.42 1.84-2.5 1.51-2.09 5.83.63 6.99-.48 2.63-1.7 4.77-3.04 4.52zM12.03 7.25c-.23-1.64 1.05-3.32 2.62-3.58.19 1.66-1.55 3.49-2.62 3.58z" /></svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M3 20.5v-17c0-.83.52-1.28 1-1.5l10 8.5-10 8.5c-.48-.22-1-.67-1-1.5zm2-14.33L12.12 12 5 17.83V6.17zM14.54 12L21 17.5c-.48.22-1 .67-1 1.5H5l9.54-7zM21 6.5L14.54 12 5 5h15c0 .83-.52 1.28-1 1.5z" /></svg>
                                    )}
                                    {link.label}
                                    <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-50" />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Screenshots – auto-scrolling marquee */}
                {exp.images.length > 0 && (
                    <ScreenshotMarquee images={exp.images} accentColor={exp.accentColor} isPaused={lightboxIdx !== null} onImageClick={(idx) => setLightboxIdx(idx)} />
                )}
            </div>

            </div>
            </motion.div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIdx !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[220] bg-black/95 flex items-center justify-center"
                        onClick={() => setLightboxIdx(null)}
                    >
                        <button
                            onClick={() => setLightboxIdx(null)}
                            className="absolute top-4 right-4 md:top-8 md:right-8 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Prev */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + exp.images.length) % exp.images.length); }}
                            className="absolute left-2 md:left-6 p-2 md:p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-10"
                        >
                            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                        </button>

                        <motion.div
                            key={lightboxIdx}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-[75vw] h-[85vh] sm:w-[50vw] sm:h-[85vh] md:w-[30vw] md:h-[85vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={exp.images[lightboxIdx]}
                                alt={`Screenshot ${lightboxIdx + 1}`}
                                fill
                                className="object-contain"
                                sizes="50vw"
                            />
                        </motion.div>

                        {/* Next */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % exp.images.length); }}
                            className="absolute right-2 md:right-6 p-2 md:p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-10"
                        >
                            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                        </button>

                        {/* Counter */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-mono">
                            {lightboxIdx + 1} / {exp.images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

/* ─── Auto-scrolling Screenshot Marquee ─── */
const ScreenshotMarquee = ({
    images,
    accentColor,
    isPaused,
    onImageClick,
}: {
    images: string[];
    accentColor: string;
    isPaused: boolean;
    onImageClick: (idx: number) => void;
}) => {
    // Duplicate for seamless loop
    const doubled = [...images, ...images];
    const doubledIdx = [...images.map((_, i) => i), ...images.map((_, i) => i)];

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
        >
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4">Screenshots</h3>

            <div className="overflow-hidden relative">
                {/* Edge fades */}
                <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-black/90 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-black/90 to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex gap-3 md:gap-4 w-max"
                    animate={{ x: isPaused ? undefined : ["-50%", "0%"] }}
                    transition={{
                        x: {
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear",
                        },
                    }}
                >
                    {doubled.map((img, idx) => (
                        <motion.button
                            key={`${idx}-${img}`}
                            whileHover={{ scale: 1.05, y: -4 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onImageClick(doubledIdx[idx])}
                            className="relative flex-shrink-0 w-[120px] h-[220px] sm:w-[140px] sm:h-[260px] md:w-[160px] md:h-[300px] rounded-xl md:rounded-2xl overflow-hidden border border-white/10 bg-black/40 cursor-pointer group shadow-lg"
                        >
                            <Image
                                src={img}
                                alt={`Screenshot`}
                                fill
                                className="object-cover transition-all duration-500 group-hover:brightness-110"
                                sizes="160px"
                            />
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ boxShadow: `inset 0 0 30px ${accentColor}30` }}
                            />
                        </motion.button>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

interface CardProps {
    exp: Experience;
    i: number;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
    isLast: boolean;
    onViewMore: () => void;
}

const Card = ({ exp, i, progress, range, targetScale, isLast, onViewMore }: CardProps) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);

    const opacity = useTransform(progress, range, [1, isLast ? 1 : 0]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="h-[100dvh] flex items-center justify-center sticky top-0 overflow-hidden">
            <motion.div
                style={{ scale, opacity }}
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-background origin-top"
            >
                <div className="absolute inset-0 bg-background" />

                <div
                    className="absolute inset-0 opacity-40 transition-opacity duration-500"
                    style={{ background: exp.bgGradient }}
                />

                <div className="relative z-10 max-w-7xl w-full px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
                    {/* Left: Content */}
                    <div className="pt-16 md:pt-0">
                        {/* Logo + Period */}
                        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                            <div className="relative w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl overflow-hidden border border-white/10 bg-white/5 flex-shrink-0">
                                <Image src={exp.logo} alt={`${exp.project} logo`} fill className="object-cover" sizes="56px" />
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 border border-white/10 text-purple-400 font-mono text-xs md:text-sm">
                                <span>{exp.period}</span>
                            </div>
                        </div>

                        <h3 className="text-3xl sm:text-4xl md:text-7xl font-bold text-white mb-1 md:mb-2 leading-tight">
                            {exp.project}
                        </h3>
                        <div className="text-base sm:text-lg md:text-2xl text-white/50 font-medium mb-4 md:mb-8">
                            {exp.role} • {exp.company}
                        </div>

                        <p className="text-sm md:text-lg text-white/70 leading-relaxed max-w-xl line-clamp-4 md:line-clamp-none">
                            {exp.description}
                        </p>

                        {/* Links + View More */}
                        <div className="flex flex-wrap gap-3 mt-4 md:mt-8">
                            {exp.links.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center h-10 md:h-12 px-4 md:px-6 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 text-white gap-2 text-sm md:text-base font-medium transition-all hover:scale-105 active:scale-95"
                                >
                                    {link.icon === "apple" ? (
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-1.23 3.91-1.12 1.5.09 2.47.71 3.42 1.84-2.5 1.51-2.09 5.83.63 6.99-.48 2.63-1.7 4.77-3.04 4.52zM12.03 7.25c-.23-1.64 1.05-3.32 2.62-3.58.19 1.66-1.55 3.49-2.62 3.58z" /></svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5"><path d="M3 20.5v-17c0-.83.52-1.28 1-1.5l10 8.5-10 8.5c-.48-.22-1-.67-1-1.5zm2-14.33L12.12 12 5 17.83V6.17zM14.54 12L21 17.5c-.48.22-1 .67-1 1.5H5l9.54-7zM21 6.5L14.54 12 5 5h15c0 .83-.52 1.28-1 1.5z" /></svg>
                                    )}
                                    {link.label}
                                </a>
                            ))}

                            <button
                                onClick={onViewMore}
                                className="inline-flex items-center h-10 md:h-12 px-5 md:px-6 rounded-full text-white gap-2 text-sm md:text-base font-medium transition-all hover:scale-105 active:scale-95 border"
                                style={{ borderColor: exp.accentColor + "50", backgroundColor: exp.accentColor + "20" }}
                            >
                                View More
                                <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                    {/* Right: Logo Card (Project-style) */}
                    <div className="group/card relative h-[40vh] md:h-[70vh] rounded-2xl md:rounded-[3rem] overflow-hidden border border-white/10 bg-neutral-900/50 backdrop-blur-xl">
                        {/* Background gradient */}
                        <div className="absolute inset-0 opacity-20" style={{ background: exp.bgGradient }} />

                        {/* Logo image */}
                        <div className="relative w-full h-full overflow-hidden">
                            <motion.div style={{ scale: imageScale }} className="relative w-full h-full">
                                <Image src={exp.logo} alt={`${exp.project} logo`} fill className="object-cover transition-transform duration-700 group-hover/card:scale-110" sizes="(max-width: 768px) 100vw, 50vw" />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                        </div>

                        {/* Overlaid content */}
                        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                            <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                                {exp.tech.map((t) => (
                                    <span key={t} className="px-2 py-0.5 md:px-3 md:py-1 bg-black/40 border border-white/5 rounded-lg text-[10px] md:text-sm text-white/40">
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 text-purple-400 text-xs md:text-sm font-medium">
                                <span>View More</span>
                                <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

        </div>
    );
};

export function Experience() {
    const container = useRef(null);
    const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <>
        <div ref={container} className="relative h-[300vh] md:h-[400vh] bg-background">
            {/* Header */}
            <div className="relative z-10 py-6 md:py-8 text-center bg-background pt-16 md:pt-24 pb-8 md:pb-12">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl sm:text-4xl md:text-6xl font-bold text-white tracking-tighter"
                >
                    Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Experience</span>
                </motion.h2>
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
                        onViewMore={() => setSelectedExp(exp)}
                    />
                );
            })}
        </div>

        {/* Experience Detail Modal – rendered at top level (outside sticky/overflow containers) */}
        <AnimatePresence>
            {selectedExp && (
                <ExperienceDetailModal exp={selectedExp} onClose={() => setSelectedExp(null)} />
            )}
        </AnimatePresence>
        </>
    );
}
