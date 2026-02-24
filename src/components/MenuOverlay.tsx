"use client";

import Link from "next/link";
import { useEffect } from "react";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { number: "01", label: "首页", href: "/" },
  { number: "02", label: "关于", href: "/about" },
  { number: "03", label: "作品", href: "/work" },
  { number: "04", label: "文章", href: "/writing" },
  { number: "05", label: "相册", href: "/photo" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/guchenghuan" },
  { label: "掘金", href: "https://juejin.cn/user/2647279731480477" },
  { label: "微博", href: "https://weibo.com/u/5874458139" },
];

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-500 ${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="flex h-full flex-col">
        {/* Menu Header */}
        <div className="flex items-center justify-between px-6 py-5 md:px-10 md:py-6">
          <Link
            href="/"
            onClick={onClose}
            className="text-lg font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            博客.
          </Link>
          <button
            onClick={onClose}
            className="flex items-center gap-2 font-mono text-xs tracking-wide transition-opacity hover:opacity-70"
            style={{ color: "var(--text-secondary)" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="3" y1="3" x2="13" y2="13" />
              <line x1="13" y1="3" x2="3" y2="13" />
            </svg>
            <span>关闭</span>
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex flex-1 flex-col justify-center px-6 md:flex-row md:items-start md:justify-between md:px-10 lg:px-20">
          {/* Navigation Links */}
          <nav className="flex flex-col gap-2 md:gap-3">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="group flex flex-col transition-opacity hover:opacity-70"
                style={{
                  transform: isOpen
                    ? "translateY(0)"
                    : `translateY(${20 + index * 10}px)`,
                  opacity: isOpen ? 1 : 0,
                  transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.05}s`,
                }}
              >
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  ({item.number})
                </span>
                <span
                  className="text-3xl font-bold md:text-4xl"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Contact Section */}
          <div
            className="mt-12 max-w-sm md:mt-0"
            style={{
              transform: isOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isOpen ? 1 : 0,
              transition:
                "all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
            }}
          >
            <span
              className="font-mono text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              (联系方式)
            </span>
            <h2
              className="mt-1 text-2xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              保持联系
            </h2>
            <p
              className="mt-3 text-sm leading-relaxed"
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
          </div>
        </div>

        {/* Menu Footer */}
        <div className="flex items-center justify-between px-6 py-5 md:px-10 md:py-6">
          <div>
            <span
              className="font-mono text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              (最后更新)
            </span>
            <p
              className="text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              版权所有 / 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
