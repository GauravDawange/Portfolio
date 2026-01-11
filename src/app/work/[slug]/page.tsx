import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Dummy data fetcher
const getProject = (slug: string) => {
    // In a real app, fetch from CMS or API
    return {
        title: "Project Title",
        category: "Category",
        description: "This is a detailed description of the project. It explains the problem, the solution, and the outcome. The design focuses on clarity and user experience.",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
        slug,
    };
};

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = getProject(slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background pt-32 pb-20 px-6 md:px-12">
            <Link href="/work" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="mr-2 w-4 h-4" /> Back to Work
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                <div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tighter">{project.title}</h1>
                    <p className="text-xl text-white/60 mb-8">{project.category}</p>
                    <p className="text-lg text-white/80 leading-relaxed max-w-xl">
                        {project.description}
                    </p>
                </div>
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-neutral-900">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="aspect-square bg-neutral-900 rounded-2xl relative overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop" alt="Detail 1" fill className="object-cover" />
                </div>
                <div className="aspect-square bg-neutral-900 rounded-2xl relative overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop" alt="Detail 2" fill className="object-cover" />
                </div>
            </div>
        </main>
    );
}
