"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import type { Photo } from "@/content/photos";

interface PhotoGalleryProps {
  photos: Photo[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeYear, setActiveYear] = useState<string>("全部");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const years = useMemo(() => {
    const yearSet = new Set(photos.map((p) => p.date.split(".")[0]));
    return ["全部", ...Array.from(yearSet).sort((a, b) => b.localeCompare(a))];
  }, [photos]);

  const filteredPhotos = useMemo(() => {
    if (activeYear === "全部") return photos;
    return photos.filter((p) => p.date.startsWith(activeYear));
  }, [photos, activeYear]);

  const handleYearChange = (year: string) => {
    if (year === activeYear) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveYear(year);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 200);
  };

  const close = useCallback(() => setSelectedIndex(null), []);

  const currentFilteredIndex = useMemo(() => {
    if (selectedIndex === null) return null;
    return selectedIndex;
  }, [selectedIndex]);

  const prev = useCallback(() => {
    setSelectedIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  }, []);

  const next = useCallback(() => {
    setSelectedIndex((i) =>
      i !== null && i < filteredPhotos.length - 1 ? i + 1 : i
    );
  }, [filteredPhotos.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, close, prev, next]);

  const columns = useMemo(() => {
    const cols: Photo[][] = [[], [], []];
    filteredPhotos.forEach((photo, i) => {
      cols[i % 3].push(photo);
    });
    return cols;
  }, [filteredPhotos]);

  return (
    <>
      {/* Stats Bar */}
      <div
        className="mt-10 flex items-center justify-between border-t border-b py-4"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="flex items-center gap-6">
          <div>
            <span
              className="block font-mono text-[10px] uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              (照片)
            </span>
            <span
              className="text-2xl font-bold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {filteredPhotos.filter((p) => p.type !== "video").length}
            </span>
          </div>
          {filteredPhotos.some((p) => p.type === "video") && (
            <>
              <div
                className="h-8 w-px"
                style={{ backgroundColor: "var(--border-color)" }}
              />
              <div>
                <span
                  className="block font-mono text-[10px] uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  (视频)
                </span>
                <span
                  className="text-2xl font-bold tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {filteredPhotos.filter((p) => p.type === "video").length}
                </span>
              </div>
            </>
          )}
          <div
            className="h-8 w-px"
            style={{ backgroundColor: "var(--border-color)" }}
          />
          <div>
            <span
              className="block font-mono text-[10px] uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              (年份)
            </span>
            <span
              className="text-2xl font-bold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {years.length - 1}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <span
            className="mr-2 hidden font-mono text-[10px] uppercase tracking-widest sm:block"
            style={{ color: "var(--text-muted)" }}
          >
            筛选
          </span>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => handleYearChange(year)}
              className="rounded-full px-3 py-1 font-mono text-[11px] transition-all duration-200"
              style={{
                color:
                  activeYear === year
                    ? "var(--bg-primary)"
                    : "var(--text-secondary)",
                backgroundColor:
                  activeYear === year ? "var(--text-primary)" : "transparent",
                border: `1px solid ${activeYear === year ? "var(--text-primary)" : "var(--border-color)"}`,
              }}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div
        ref={galleryRef}
        className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        style={{
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? "translateY(8px)" : "translateY(0)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        {columns.map((column, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-3">
            {column.map((photo) => {
              const globalIndex = filteredPhotos.indexOf(photo);
              return (
                <button
                  key={photo.src}
                  className="photo-card group relative overflow-hidden rounded-md"
                  onClick={() => setSelectedIndex(globalIndex)}
                  style={{ animationDelay: `${globalIndex * 30}ms` }}
                >
                  {photo.type === "video" ? (
                    <div className="relative">
                      <video
                        src={photo.src}
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full object-cover transition-all duration-500 group-hover:scale-[1.03]"
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => {
                          e.currentTarget.pause();
                          e.currentTarget.currentTime = 0;
                        }}
                      />
                      <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 backdrop-blur-sm">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <span className="font-mono text-[9px] text-white/80">VIDEO</span>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={photo.src}
                      alt={photo.name}
                      width={600}
                      height={450}
                      className="w-full object-cover transition-all duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                  {/* Overlay */}
                  <div className="photo-overlay pointer-events-none absolute inset-0 flex flex-col justify-end p-4">
                    <div className="translate-y-2 transition-all duration-300 group-hover:translate-y-0">
                      <span
                        className="text-sm font-medium text-white drop-shadow-sm"
                      >
                        {photo.name}
                      </span>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="font-mono text-[10px] tracking-wider text-white/60">
                          {photo.date}
                        </span>
                        <span className="inline-block h-px w-4 bg-white/30" />
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          stroke="white"
                          strokeWidth="1"
                          className="opacity-60"
                        >
                          <path d="M2 8L8 2M8 2H3M8 2V7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPhotos.length === 0 && (
        <div className="mt-16 text-center">
          <p
            className="text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            暂无 {activeYear} 年的照片
          </p>
        </div>
      )}

      {/* Lightbox */}
      {currentFilteredIndex !== null && (
        <div
          className="lightbox-backdrop fixed inset-0 z-50 flex items-center justify-center"
          onClick={close}
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-white/40">
                {currentFilteredIndex + 1} / {filteredPhotos.length}
              </span>
              <span className="inline-block h-px w-6 bg-white/20" />
              <span className="text-sm font-medium text-white/90">
                {filteredPhotos[currentFilteredIndex].name}
              </span>
            </div>
            <button
              className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 font-mono text-[11px] text-white/60 transition-all hover:border-white/30 hover:text-white"
              onClick={close}
            >
              关闭
              <kbd className="ml-1 text-[10px] text-white/30">ESC</kbd>
            </button>
          </div>

          {/* Navigation */}
          {currentFilteredIndex > 0 && (
            <button
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 p-3 text-white/50 transition-all hover:border-white/30 hover:text-white md:left-8"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {currentFilteredIndex < filteredPhotos.length - 1 && (
            <button
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 p-3 text-white/50 transition-all hover:border-white/30 hover:text-white md:right-8"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}

          {/* Image / Video */}
          <div
            className="lightbox-content max-h-[85vh] max-w-[90vw] md:max-w-[80vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {filteredPhotos[currentFilteredIndex].type === "video" ? (
              <video
                src={filteredPhotos[currentFilteredIndex].src}
                controls
                autoPlay
                playsInline
                className="max-h-[80vh] w-auto rounded-lg object-contain"
              />
            ) : (
              <Image
                src={filteredPhotos[currentFilteredIndex].src}
                alt={filteredPhotos[currentFilteredIndex].name}
                width={1400}
                height={1050}
                className="max-h-[80vh] w-auto rounded-lg object-contain"
                sizes="90vw"
                priority
              />
            )}
          </div>

          {/* Bottom Bar */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center px-6 py-5">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] text-white/40">
                {filteredPhotos[currentFilteredIndex].date}
              </span>
              <span className="inline-block h-px w-8 bg-white/15" />
              <span className="font-mono text-[10px] tracking-wider text-white/30">
                ← → 切换 · ESC 关闭
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
