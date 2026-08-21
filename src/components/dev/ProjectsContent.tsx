import Projects from "../Projects";

export default function ProjectsContent() {
  return (
    <div className="space-y-8">
      <div className="h-screen bg-m3-surface-container/60 backdrop-blur-2xl border border-m3-outline/10 p-4 md:p-6">
        <Projects />
      </div>
    </div>
  );
}