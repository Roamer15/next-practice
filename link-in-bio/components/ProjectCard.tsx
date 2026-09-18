import Link from "next/link";
import { ProjectData } from "@/data/project-data";

export default function ProjectCard({ details }: { details: ProjectData }) {
  return (
    <div className="relative p-1 h-75 w-75 border-4 rounded-r-3xl border-amber-200 m-3">
      <Link
        href={`/projects/${details.title}`}
        className="absolute inset-0"
        aria-label={`View ${details.title} details`}
      />
      <h3>{details.title}</h3>
      <p>{details.description}</p>
      <div className="relative z-10 flex p-3 gap-2">
        <a href={details.liveUrl} target="_blank" rel="noopener noreferrer">
          Live deployment
        </a>
        <a href={details.githubUrl} target="_blank" rel="noopener noreferrer">
          Github
        </a>
      </div>
    </div>
  );
}