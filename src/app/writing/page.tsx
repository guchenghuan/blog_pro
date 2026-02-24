import type { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "文章 | 博客",
  description: "关于 Web 开发、软件工程和技术趋势的文章。",
};

export default function WritingPage() {
  return (
    <main className="relative min-h-screen px-6 pt-28 pb-16 md:px-10 md:pt-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeader number="04" title="文章" />

        <div className="mt-2 max-w-lg">
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            我在这里分享软件工程职业生涯中的见解与经验。写作内容主要涵盖
            Web 开发、软件工程最佳实践和技术趋势。
          </p>
        </div>

        {/* Article List */}
        <section className="mt-12">
          <h2
            className="text-xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            最新文章
          </h2>

          <div className="mt-6 flex flex-col">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/writing/${post.slug}`}
                className="group block border-t py-6 transition-opacity hover:opacity-80"
                style={{ borderColor: "var(--border-color)" }}
              >
                <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
                  <h3
                    className="flex items-center gap-1 text-base font-semibold leading-snug md:max-w-md"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {post.title}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 10 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      className="shrink-0 opacity-50"
                    >
                      <path d="M2 8L8 2M8 2H3M8 2V7" />
                    </svg>
                  </h3>
                  <span
                    className="shrink-0 font-mono text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {post.date}
                  </span>
                </div>
                <p
                  className="mt-3 max-w-lg text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
