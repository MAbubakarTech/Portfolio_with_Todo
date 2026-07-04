export default function Work() {
  interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
  }

  const portfolioProjects: Project[] = [
    {
      id: "advocate-ai",
      title: "Advocate AI",
      description:
        "An interactive, cross-platform NPC avatar platform engineered for legal training and courtroom simulation. Built with a highly responsive frontend and an intelligent AI behavioral orchestrator.",
      tags: ["Flutter", "FastAPI", "LLMs", "RAG", "Python"],
    },
    {
      id: "smart-grocery-ux",
      title: "Smart Grocery Platform",
      description:
        "A high-performance retail application featuring custom state management, micro-interactions, fluid navigation pipelines, and an optimized caching system for offline browsing.",
      tags: ["Flutter", "Dart", "Clean Architecture", "UI/UX"],
    },
    {
      id: "saas-analytics-dashboard",
      title: "Next.js SaaS Analytics Engine",
      description:
        "A modern web dashboard built with strict server/client component optimization, structural routing, dynamic data-fetching layers, and automated performance tracking.",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    },
  ];

  return (
    <section
      id="work"
      className="min-h-screen bg-slate-950 py-20 px-10 text-slate-300 flex flex-col justify-center items-center"
    >
      <div className="max-w-6xl w-full">
        <h2 className="text-4xl font-bold mb-12 text-center bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Featured Projects
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {portfolioProjects.map((project) => (
            <article
              key={project.id}
              className="p-6 rounded-2xl bg-white/5 border border-white/30 backdrop-blur-sm hover:border-blue-500/50 hover:scale-105 transition-all group duration-300"
            >
              <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-400 text-sm mb-5 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))} 
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
