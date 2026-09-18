import { data } from "@/data/project-data";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return data.map((project) => ({ slug: project.title }));
}

async function getDetails(slug: string) {
  const details = data.find((project) => project.title === slug);

  if (!details) {
    notFound();
  }

  return details;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = data.find((p) => p.title === slug);

  return {
    title: project ? `${project.title} — Ian's Projects` : "Project Not Found",
    description: project?.description,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const details = await getDetails(slug);

  return (
    <div>
      <h3>{details.title}</h3>
      <p>{details.description}</p>
      <div className="flex p-3 gap-2">
        <a href={details.liveUrl} target="_blank">
          Live deployment
        </a>
        <a href={details.githubUrl} target="_blank">
          Github
        </a>
      </div>
    </div>
  );
}
