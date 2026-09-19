import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <div>
      {posts?.map((post, key) => (
        <Link href={`/blog/${post.slug}`} key={key}></Link>
      ))}
    </div>
  );
}
