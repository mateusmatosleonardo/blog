import { PostMeta, postsMeta } from "@/lib/posts-meta";

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
}

export function getAllPosts(): PostMeta[] {
  return postsMeta.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPost(slug: string): Promise<Post | null> {
  const meta = postsMeta.find((p) => p.slug === slug);
  if (!meta) return null;

  try {
    const postModule = await import(`@/lib/posts/${slug}`);
    return postModule.default as Post;
  } catch {
    return null;
  }
}
