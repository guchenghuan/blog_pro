import ContactSection from '@/components/ContactSection'
import SectionHeader from '@/components/SectionHeader'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: '关于 | 博客',
  description: '哈喽，我是顾成焕(也可以叫我IMT)，聊聊我自己。',
}

const timeline = [
  {
    year: '1995',
    events: [{ time: '6月', title: '出生 👶🏻', description: '' }],
  },
  {
    year: '...',
    events: [{ time: '', title: '好好学习 🙇‍♂️', description: '' }],
  },
  {
    year: '2018',
    events: [
      // {
      //   time: '6月',
      //   title: '本科毕业 🎓',
      //   description: '湖北理工 · 环境工程，最初学的 Java，工作慢慢学写 JavaScript~',
      //   logo: '/images/about/ligong.png',
      // },
      {
        time: '6月',
        title: '携程 · 测试开发',
        description: 'JavaScript, React Native, Jest, Selenium',
        logo: '/images/about/trip.jpg',
        tag: '初出茅庐',
      },
    ],
  },
  {
    year: '2020',
    events: [
      {
        time: '4月',
        title: 'bilibili · 测试开发 / 前端开发',
        description: 'TypeScript, React, VUE, Puppeteer, Node.js, MongoDB',
        logo: '/images/about/bilibili.png',
        tag: '崭露头角',
      },
    ],
  },
  {
    year: '2022',
    events: [
      {
        time: '9月',
        title: '小红书 · 软件开发',
        description: 'TypeScript, React, VUE, Puppeteer, Node.js, MongoDB, Java',
        logo: '/images/about/xhs.png',
        tag: '精雕细琢',
      },
    ],
  },
  {
    year: '2025',
    events: [
      {
        time: '7月',
        title: '京东 · 全栈',
        description: 'TypeScript, React, VUE, Puppeteer, Node.js, MongoDB, Java, Python',
        logo: '/images/about/jingdong.png',
        tag: '更上一层',
      },
    ],
  },
  {
    year: '未来',
    events: [{ time: '', title: '未来继续 ing ！', description: '' }],
  },
]

const interests = [
  {
    title: '看动漫',
    description: '入职 B 站前，不知道为什么要看番，入职 B 站后，真香～',
  },
  {
    title: '写代码',
    description: '我实在是太喜欢写代码了，从接触 JavaScript 的那一刻开始，便是一发不可收拾！',
  },
  {
    title: '思考',
    description:
      '在安静的时候喜欢思考（吾日三省吾身）。定期重审自己，反思有哪里做的不好，哪里可以做的更好。',
  },
  {
    title: '其他',
    description: '偶尔累了就 play ball 🏀，或者在峡谷之巅遨游 🎮。',
  },
]

export default function AboutPage() {
  return (
    <main className="relative min-h-screen px-6 pt-28 pb-16 md:px-10 md:pt-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeader number="02" title="关于" />

        <p
          className="mt-2 max-w-lg text-sm leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          哈喽，我是顾成焕（也可以叫我 IMT）👻 聊聊我自己。
        </p>

        {/* Profile Section */}
        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
          <div className="flex-1 space-y-4">
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              一个 <span className="font-semibold">软件开发</span>
              ，江苏盐城人。
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              先后在 <span className="font-semibold">携程</span> 做测试开发，
              <span className="font-semibold">bilibili</span> 做测试开发和前端开发，
              <span className="font-semibold">小红书</span> 做软件开发，现在在{' '}
              <span className="font-semibold">京东</span> 做全栈开发。
            </p>
            <p className="mt-4 text-sm italic" style={{ color: 'var(--text-secondary)' }}>
              要做对且有意义的事！🌟 人生路很长，要活出自己，还要精彩 —— DO Meaningful Things~
            </p>
          </div>
          <div className="h-48 w-48 shrink-0 overflow-hidden rounded-lg md:h-56 md:w-56">
            <Image
              src="/images/about/qirong.jpg"
              alt="顾成焕"
              width={224}
              height={224}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Timeline Section */}
        <section className="mt-16 md:mt-24">
          <h2
            className="text-2xl font-bold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            人生轨迹
          </h2>
          <p
            className="mt-3 max-w-lg text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            从校园到职场，一路走来的经历。
          </p>

          <div className="mt-8 space-y-0">
            {timeline.map((period) => (
              <div
                key={period.year}
                className="relative border-l-2 pb-8 pl-8 last:pb-0"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <div
                  className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2"
                  style={{
                    borderColor: 'var(--text-muted)',
                    backgroundColor: 'var(--bg-primary)',
                  }}
                />
                <span
                  className="mb-3 block font-mono text-xs font-bold tracking-wider"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {period.year}
                </span>
                <div className="space-y-4">
                  {period.events.map((event, i) => (
                    <div key={i} className="flex items-start gap-4">
                      {event.logo && (
                        <div
                          className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg"
                          style={{ backgroundColor: 'var(--bg-secondary)' }}
                        >
                          <Image
                            src={event.logo}
                            alt={event.title}
                            width={28}
                            height={28}
                            className="rounded"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3
                            className="text-sm font-semibold"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {event.title}
                          </h3>
                          {event.tag && (
                            <span
                              className="rounded-full border px-2 py-0.5 font-mono text-[10px]"
                              style={{
                                borderColor: 'var(--border-color)',
                                color: 'var(--text-muted)',
                              }}
                            >
                              {event.tag}
                            </span>
                          )}
                        </div>
                        {event.time && (
                          <span
                            className="mt-0.5 block font-mono text-[11px]"
                            style={{ color: 'var(--text-muted)' }}
                          >
                            {event.time}
                          </span>
                        )}
                        {event.description && (
                          <p
                            className="mt-1 text-sm leading-relaxed"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            {event.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interests Section */}
        <section className="mt-16 md:mt-24">
          <h2
            className="text-2xl font-bold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            业余爱好
          </h2>
          <p
            className="mt-3 max-w-lg text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            工作之余，这些兴趣一直陪伴着我。
          </p>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {interests.map((item) => (
              <div key={item.title}>
                <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <ContactSection />
      </div>
    </main>
  )
}
