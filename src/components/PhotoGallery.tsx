"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import type { Photo } from "@/content/photos";

interface PhotoGalleryProps {
  photos: Photo[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const close = useCallback(() => setSelectedIndex(null), []);

  const prev = useCallback(() => {
    setSelectedIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  }, []);

  const next = useCallback(() => {
    setSelectedIndex((i) =>
      i !== null && i < photos.length - 1 ? i + 1 : i
    );
  }, [photos.length]);

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

  const columns = [[], [], []] as Photo[][];
  photos.forEach((photo, i) => {
    columns[i % 3].push(photo);
  });

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {columns.map((column, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-4">
            {column.map((photo) => {
              const globalIndex = photos.indexOf(photo);
              return (
                <button
                  key={photo.src}
                  className="group relative overflow-hidden rounded-lg"
                  onClick={() => setSelectedIndex(globalIndex)}
                >
                  <Image
                    src={photo.src}
                    alt={photo.name}
                    width={400}
                    height={300}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
                    }}
                  >
                    <span className="text-sm font-medium text-white">
                      {photo.name}
                    </span>
                    <span className="font-mono text-[11px] text-white/70">
                      {photo.date}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
          onClick={close}
        >
          <button
            className="absolute top-6 right-6 flex items-center gap-2 font-mono text-xs text-white/70 transition-opacity hover:text-white"
            onClick={close}
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
            关闭
          </button>

          {selectedIndex > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/60 transition-colors hover:text-white md:left-8"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {selectedIndex < photos.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/60 transition-colors hover:text-white md:right-8"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}

          <div
            className="max-h-[85vh] max-w-[90vw] md:max-w-[80vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[selectedIndex].src}
              alt={photos[selectedIndex].name}
              width={1200}
              height={900}
              className="max-h-[80vh] w-auto rounded-lg object-contain"
              sizes="90vw"
              priority
            />
            <div className="mt-3 text-center">
              <p className="text-sm font-medium text-white">
                {photos[selectedIndex].name}
              </p>
              <p className="mt-0.5 font-mono text-[11px] text-white/50">
                {photos[selectedIndex].date}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
