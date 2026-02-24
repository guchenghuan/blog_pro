import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import PhotoGallery from "@/components/PhotoGallery";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "相册 | 博客",
  description: "用镜头记录生活中的美好瞬间。",
};

export default function PhotoPage() {
  return (
    <main className="relative min-h-screen px-6 pt-28 pb-16 md:px-10 md:pt-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeader number="05" title="相册" />

        <p
          className="mt-2 max-w-lg text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          用镜头记录生活中的美好瞬间，那些去过的地方、遇见的风景。
        </p>

        <PhotoGallery photos={photos} />
      </div>
    </main>
  );
}
