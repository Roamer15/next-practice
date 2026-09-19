// import fs from "node:fs"
// import path from "node:path"
// import matter from 'gray-matter'

// export function getAllPosts(){
//     const posts = []
//     const dirPath = '/home/com/Desktop/Personal/nextjs-tutorial/static-blog/posts'
//         const files = fs.readdirSync(dirPath)
//         for(const file in files){
//             const fullPath = path.join(dirPath, file)
//             const slug = fullPath.replace(/\.md$/, '')
//             const content = fs.readFileSync(fullPath, 'utf8')
//             const {data} = matter(content)
//             posts.push({slug: slug, data})
//         }
//         return posts
// }

// export function getPostBySlug(slug: string){
//     const dirPath = '/home/com/Desktop/Personal/nextjs-tutorial/static-blog/posts'
//         const fullPath = path.join(dirPath, `${slug}.md`)
//         const fileContent = fs.readFileSync(fullPath, 'utf8')
//         const { data, content } = matter(fileContent);
//         return { slug, data: data, content }
// }

import fs from "fs";
import path from "path";
import matter from "gray-matter";
const postsDirectory = path.join(process.cwd(), "posts");
export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}
export function getAllPosts(): PostMeta[] {
  const filenames = fs.readdirSync(postsDirectory);
  return filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fileContents = fs.readFileSync(
      path.join(postsDirectory, filename),
      "utf8",
    );
    const { data } = matter(fileContents);
    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
    };
  });
}
export function getPostBySlug(slug: string) {
  const fileContents = fs.readFileSync(
    path.join(postsDirectory, `${slug}.md`),
    "utf8",
  );
  const { data, content } = matter(fileContents);
  return { slug, ...data, content } as PostMeta & { content: string };
}
