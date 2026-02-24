import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/content/posts";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "未找到" };
  return {
    title: `${post.title} | 博客`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="relative min-h-screen px-6 pt-28 pb-16 md:px-10 md:pt-32">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/writing"
          className="mb-8 inline-flex items-center gap-1 font-mono text-xs transition-opacity hover:opacity-70"
          style={{ color: "var(--text-muted)" }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M8 2L4 6L8 10" />
          </svg>
          返回文章列表
        </Link>

        <article>
          <header className="mb-10">
            <span
              className="font-mono text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              {post.date}
            </span>
            <h1
              className="mt-2 text-3xl font-bold leading-snug tracking-tight md:text-4xl"
              style={{ color: "var(--text-primary)" }}
            >
              {post.title}
            </h1>
          </header>

          <div className="markdown-body">
            <MarkdownRenderer content={post.content} />
          </div>
        </article>
      </div>
    </main>
  );
}
