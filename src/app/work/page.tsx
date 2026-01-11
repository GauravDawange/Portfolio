import { BentoGrid } from "@/components/work/BentoGrid";

export default function WorkPage() {
    return (
        <main className="min-h-screen pt-24 pb-12 bg-background">
            <div className="px-6 md:px-12 mb-12">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-4">
                    SELECTED
                    <br />
                    <span className="text-white/40">WORKS</span>
                </h1>
            </div>
            <BentoGrid />
        </main>
    );
}
