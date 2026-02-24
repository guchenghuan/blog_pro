interface SectionHeaderProps {
  number: string;
  title: string;
}

export default function SectionHeader({ number, title }: SectionHeaderProps) {
  return (
    <div className="mb-6">
      <span
        className="font-mono text-xs"
        style={{ color: "var(--text-muted)" }}
      >
        ({number})
      </span>
      <h1
        className="text-4xl font-bold tracking-tight md:text-5xl"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h1>
    </div>
  );
}
