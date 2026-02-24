# 个人博客

基于 [Next.js](https://nextjs.org) 构建的个人博客与作品集网站。

## 功能特性

- 首页：个人介绍、技术栈、职业经历展示
- 写作：博客文章列表与 Markdown 渲染
- 摄影：瀑布流照片画廊
- 作品：项目与工作成果展示
- 关于：个人详细介绍与联系方式
- 主题切换：支持日间 / 夜间模式
- 键盘快捷键导航

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS 4
- **字体**: Inter / JetBrains Mono / Instrument Serif

## 快速开始

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

## 项目结构

```
src/
├── app/            # 页面路由（首页、写作、摄影、作品、关于）
├── components/     # 公共组件（Header、主题、菜单等）
└── content/        # 内容数据（文章、照片）
```

## 部署

推荐使用 [Vercel](https://vercel.com) 部署，详见 [Next.js 部署文档](https://nextjs.org/docs/app/building-your-application/deploying)。
