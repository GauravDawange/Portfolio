"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const navItems = [
    { name: "Home", path: "#home" },
    { name: "About", path: "#about" },
    { name: "Work", path: "#work" },
    { name: "Contact", path: "#contact" },
];

export function Navbar() {
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => item.path.substring(1)); // remove #

            // Find the section that is currently most visible
            let current = "";
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If the top of the section is near the top of the viewport
                    if (rect.top <= 200 && rect.bottom >= 200) {
                        current = section;
                    }
                }
            }
            if (current) setActiveSection("#" + current);
            // Edge case: if at top, set to home
            if (window.scrollY < 100) setActiveSection("#home");
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.getElementById(href.substring(1));
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 pointer-events-none"
        >
            <Link
                href="#home"
                onClick={(e) => scrollToSection(e, "#home")}
                className="text-xl font-bold tracking-tighter pointer-events-auto mix-blend-difference text-white"
            >
                PORTFOLIO
            </Link>

            <div className="flex gap-6 pointer-events-auto">
                {navItems.map((item) => {
                    const isActive = activeSection === item.path;
                    return (
                        <a
                            key={item.path}
                            href={item.path}
                            onClick={(e) => scrollToSection(e, item.path)}
                            className={cn(
                                "relative text-sm font-medium transition-colors hover:text-white/80 mix-blend-difference text-white cursor-pointer",
                                isActive ? "text-white" : "text-white/60"
                            )}
                        >
                            {item.name}
                            {isActive && (
                                <motion.div
                                    layoutId="nav-indicator"
                                    className="absolute -bottom-1 left-0 right-0 h-px bg-white"
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </a>
                    );
                })}
            </div>
        </motion.nav>
    );
}
