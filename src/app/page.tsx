import Clock from '@/components/Clock'
import Link from 'next/link'

const stats = [
  { label: '工作经验', value: '8+', unit: '年' },
  { label: '技术公司', value: '4', unit: '家' },
  { label: '技术栈', value: '全栈', unit: '' },
  { label: '方向', value: 'AI', unit: '驱动' },
]

const techStack = [
  {
    category: '语言',
    items: ['TypeScript', 'Python', 'Java', 'Node.js'],
  },
  {
    category: '前端',
    items: ['React', 'Vue', 'Next.js', 'Tailwind CSS'],
  },
  {
    category: '后端 & AI',
    items: ['FastAPI', 'LangChain', 'Spring Boot', 'Elasticsearch'],
  },
  {
    category: '基础设施',
    items: ['Docker', 'Redis', 'MySQL', 'Kafka'],
  },
]

const career = [
  { company: '携程', role: '测试开发', period: '2018 – 2020' },
  { company: 'bilibili', role: '测试开发 / 前端开发', period: '2020 – 2022' },
  { company: '小红书', role: '软件开发', period: '2022 – 2025' },
  { company: '京东', role: '全栈开发', period: '2025 – 至今', current: true },
]

const highlights = [
  '主导 RAG 知识库、Multi-Agent 智能化架构等核心系统设计与落地',
  '接口用例采纳率提升 201.3%，累计覆盖 305 个业务线',
  '连续取得高绩效，获优秀技术贡献奖、Hackathon 三等奖',
]

export default function Home() {
  return (
    <main className="relative min-h-screen px-6 pt-24 pb-6 md:px-10 md:pt-28 md:pb-8">
      {/* Hero */}
      <section className="flex min-h-[calc(100vh-8rem)] flex-col justify-between">
        <div className="max-w-2xl">
          <span
            className="mb-4 inline-block font-mono text-[10px] uppercase tracking-widest"
            style={{ color: 'var(--text-muted)' }}
          >
            (01) 首页
          </span>
          <h1
            className="text-3xl font-bold leading-snug tracking-tight md:text-[2.75rem] md:leading-[1.2]"
            style={{ color: 'var(--text-primary)' }}
          >
            全栈工程师。写代码，做{' '}
            <span
              className="font-serif italic"
              style={{ color: 'var(--text-primary)' }}
            >
              AI
            </span>
            ，记录思考，探索未来。
          </h1>
          <p
            className="mt-6 max-w-lg text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            8 年开发经验，具备全栈开发能力，擅长 AI / 大模型应用落地与测试工具平台建设。
            目前在京东效能研发部，主导智能化测试方向的工程建设。
          </p>
        </div>

        {/* Bottom Info */}
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-3">
            <div>
              <span
                className="block font-mono text-[10px] uppercase tracking-widest"
                style={{ color: 'var(--text-muted)' }}
              >
                (所在地)
              </span>
              <div className="mt-1 flex items-center gap-4">
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  中国
                </span>
                <span
                  className="inline-block h-px w-12"
                  style={{ backgroundColor: 'var(--text-muted)' }}
                />
                <span style={{ color: 'var(--text-secondary)' }}>
                  <Clock />
                </span>
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/about"
              className="group flex items-center gap-1.5 text-xs transition-opacity hover:opacity-70"
              style={{ color: 'var(--text-secondary)' }}
            >
              了解更多
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path d="M1 5h8M6 2l3 3-3 3" />
              </svg>
            </Link>
            <div>
              <span
                className="block font-mono text-[10px] uppercase tracking-widest"
                style={{ color: 'var(--text-muted)' }}
              >
                (键盘导航)
              </span>
              <div className="mt-1 flex items-center gap-1">
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  按下
                </span>
                <kbd
                  className="rounded border px-1.5 py-0.5 font-mono text-[10px]"
                  style={{
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  C
                </kbd>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  查看快捷键
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="mx-auto mt-8 max-w-3xl border-t pt-16"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <span
                className="block font-mono text-[10px] uppercase tracking-widest"
                style={{ color: 'var(--text-muted)' }}
              >
                ({stat.label})
              </span>
              <div className="mt-2 flex items-baseline gap-1">
                <span
                  className="text-3xl font-bold tracking-tight md:text-4xl"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {stat.unit}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mx-auto mt-16 max-w-3xl pb-16">
        <span
          className="font-mono text-[10px] uppercase tracking-widest"
          style={{ color: 'var(--text-muted)' }}
        >
          (技术栈)
        </span>
        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {techStack.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                {group.category}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border px-3 py-1 font-mono text-[11px]"
                    style={{
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-16 flex flex-col items-center gap-4 border-t pt-12 text-center sm:flex-row sm:justify-between sm:text-left"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <p
            className="max-w-sm text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            要做对且有意义的事 — DO Meaningful Things ~
          </p>
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-medium transition-opacity hover:opacity-70"
            style={{
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
          >
            关于我
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path d="M1 5h8M6 2l3 3-3 3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  )
}
