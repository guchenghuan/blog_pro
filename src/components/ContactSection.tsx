const socialLinks = [
  { label: "GitHub", href: "https://github.com/guchenghuan" },
  { label: "掘金", href: "https://juejin.cn/user/2647279731480477" },
  { label: "微博", href: "https://weibo.com/u/5874458139" },
];

export default function ContactSection() {
  return (
    <section className="mt-16 md:mt-24">
      <h2
        className="text-2xl font-bold tracking-tight"
        style={{ color: "var(--text-primary)" }}
      >
        保持联系
      </h2>
      <p
        className="mt-3 max-w-md text-sm leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        如果你想联系我，无论是讨论合作机会、分享想法，还是只是打个招呼，都可以通过以下方式找到我。
      </p>
      <div className="mt-4 flex gap-4">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-mono text-xs transition-opacity hover:opacity-70"
            style={{ color: "var(--text-secondary)" }}
          >
            {link.label}
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <path d="M2 8L8 2M8 2H3M8 2V7" />
            </svg>
          </a>
        ))}
      </div>
    </section>
  );
}
