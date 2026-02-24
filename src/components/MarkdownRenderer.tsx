"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  content: string;
}

export default function MarkdownRenderer({ content }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        img: ({ src, alt }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt || ""} className="my-4 max-w-full rounded" loading="lazy" referrerPolicy="no-referrer" />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
