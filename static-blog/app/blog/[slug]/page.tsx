import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts?.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const posts = getAllPosts();
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  return {
    title: post ? `${post.title}` : "Project Not Found",
    description: post?.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exists = getAllPosts().some((p) => p.slug === slug);
  if (!exists) notFound();
  const post = getPostBySlug(slug);
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <div>{post.content}</div>
    </article>
  );
}
