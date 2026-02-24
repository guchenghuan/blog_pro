import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "作品 | 博客",
  description: "精选项目与作品展示。",
};

const projects = [
  {
    title: "博客平台",
    description:
      "使用 Next.js、Tailwind CSS 和 MDX 构建的现代个人博客。支持暗色模式、响应式设计和性能优化。",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://github.com/guchenghuan/blog_pro",
  },
  {
    title: "Local-Session-Cookies",
    description:
      "Chrome 浏览器扩展插件，用于查看和管理页面的 LocalStorage、SessionStorage 和 Cookies 数据，方便开发调试。",
    tags: ["JavaScript", "Chrome Extension", "DevTools"],
    link: "https://github.com/guchenghuan/Local-Session-Cookies",
  },
];

export default function WorkPage() {
  return (
    <main className="relative min-h-screen px-6 pt-28 pb-16 md:px-10 md:pt-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeader number="03" title="作品" />

        <p
          className="mt-2 max-w-lg text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          精选的项目与作品，每一个都代表了不同的挑战和技术实践。
        </p>

        {/* Projects */}
        <section className="mt-12">
          <div className="flex flex-col">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.link}
                className="group block border-t py-8 transition-opacity hover:opacity-80"
                style={{ borderColor: "var(--border-color)" }}
              >
                <div className="flex flex-col gap-3">
                  <h3
                    className="flex items-center gap-2 text-lg font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {project.title}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 10 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      className="opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      <path d="M2 8L8 2M8 2H3M8 2V7" />
                    </svg>
                  </h3>
                  <p
                    className="max-w-lg text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border px-3 py-0.5 font-mono text-[10px]"
                        style={{
                          borderColor: "var(--border-color)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <ContactSection />
      </div>
    </main>
  );
}
