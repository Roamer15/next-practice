import ProjectCard from "@/components/ProjectCard";
import { data } from "@/data/project-data";

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="mb-2 font-bold">Projects</h1>
      <div className="grid">
        {data.map((detail) => (
          <ProjectCard details={detail} key={detail.title} />
        ))}
      </div>
    </div>
  );
}
