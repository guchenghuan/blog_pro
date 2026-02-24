"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";

interface HeaderProps {
  onMenuOpen: () => void;
}

export default function Header({ onMenuOpen }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-5 md:px-10 md:py-6"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <Link
        href="/"
        className="text-lg font-bold tracking-tight"
        style={{ color: "var(--text-primary)" }}
      >
        博客.
      </Link>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 font-mono text-xs tracking-wide transition-opacity hover:opacity-70"
          style={{ color: "var(--text-secondary)" }}
        >
          <span className="text-sm">
            {theme === "light" ? "☀" : "☾"}
          </span>
          <span>{theme === "light" ? "日间" : "夜间"}</span>
        </button>

        <button
          onClick={onMenuOpen}
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
            <line x1="2" y1="4" x2="14" y2="4" />
            <line x1="2" y1="8" x2="14" y2="8" />
            <line x1="2" y1="12" x2="14" y2="12" />
          </svg>
          <span>菜单</span>
        </button>
      </div>
    </header>
  );
}
