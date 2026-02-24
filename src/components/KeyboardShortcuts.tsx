"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "./ThemeProvider";

const shortcuts = [
  { key: "1", label: "首页", action: "navigate", target: "/" },
  { key: "2", label: "关于", action: "navigate", target: "/about" },
  { key: "3", label: "作品", action: "navigate", target: "/work" },
  { key: "4", label: "文章", action: "navigate", target: "/writing" },
  { key: "5", label: "相册", action: "navigate", target: "/photo" },
  { key: "T", label: "切换主题", action: "theme", target: "" },
  { key: "Esc", label: "关闭面板", action: "close", target: "" },
];

interface KeyboardShortcutsProps {
  isOpen: boolean;
  onClose: () => void;
  onMenuOpen: () => void;
}

export default function KeyboardShortcuts({
  isOpen,
  onClose,
  onMenuOpen,
}: KeyboardShortcutsProps) {
  const router = useRouter();
  const { toggleTheme } = useTheme();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      if (e.key === "Escape" && isOpen) {
        onClose();
        return;
      }

      if (e.key === "c" || e.key === "C") {
        if (!e.metaKey && !e.ctrlKey) {
          e.preventDefault();
          isOpen ? onClose() : onMenuOpen();
        }
        return;
      }

      if (!isOpen) return;

      if (e.key === "t" || e.key === "T") {
        toggleTheme();
        onClose();
        return;
      }

      const nav: Record<string, string> = {
        "1": "/",
        "2": "/about",
        "3": "/work",
        "4": "/writing",
        "5": "/photo",
      };
      if (nav[e.key]) {
        router.push(nav[e.key]);
        onClose();
      }
    },
    [isOpen, onClose, onMenuOpen, router, toggleTheme]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

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

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center transition-all duration-300 ${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative w-[340px] rounded-xl border p-6 shadow-2xl backdrop-blur-xl"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-color)",
          transform: isOpen ? "scale(1)" : "scale(0.95)",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="mb-5 flex items-center justify-between">
          <span
            className="font-mono text-[10px] uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            (快捷键)
          </span>
          <kbd
            className="rounded border px-1.5 py-0.5 font-mono text-[10px]"
            style={{
              borderColor: "var(--border-color)",
              color: "var(--text-muted)",
            }}
          >
            C
          </kbd>
        </div>

        <div className="space-y-1">
          {shortcuts.map((s) => (
            <button
              key={s.key}
              onClick={() => {
                if (s.action === "navigate") {
                  router.push(s.target);
                  onClose();
                } else if (s.action === "theme") {
                  toggleTheme();
                  onClose();
                } else if (s.action === "close") {
                  onClose();
                }
              }}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <span className="text-sm">{s.label}</span>
              <kbd
                className="rounded border px-2 py-0.5 font-mono text-[11px]"
                style={{
                  borderColor: "var(--border-color)",
                  color: "var(--text-muted)",
                }}
              >
                {s.key}
              </kbd>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
