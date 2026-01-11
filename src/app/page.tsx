import { Hero } from "@/components/home/Hero";
import { Experience } from "@/components/work/Experience";
import { Projects } from "@/components/work/Projects";
import { AboutSection } from "@/components/about/AboutSection";
import { Contact } from "@/components/contact/Contact";
import { BentoGrid } from "@/components/work/BentoGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <section id="home">
        <Hero />
      </section>

      <section id="about" className="relative z-10">
        <AboutSection />
      </section>

      <section id="work">
        <Experience />
        <Projects />
      </section>

      <section id="contact" className="relative z-10 bg-black">
        <Contact />
      </section>

      <footer className="py-12 text-center text-white/40 text-sm relative z-10 bg-black">
        <p>© 2025 Portfolio. All rights reserved.</p>
      </footer>
    </main>
  );
}
