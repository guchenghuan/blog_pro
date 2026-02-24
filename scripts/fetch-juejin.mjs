import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = resolve(__dirname, '../src/content/posts');

const ARTICLES = [
  { id: '7589828902158352434', slug: '2025-year-in-review', title: '2025年终总结：AI浪潮下的一年', date: '2025年12月31日', excerpt: '阔别三年，久违了。这一年在AI方向做了知识库、Multi-Agent架构和上下文工程三件核心的事，同时也成了家，有了可爱的女儿。' },
  { id: '7070090254643888164', slug: 'chrome-smoke-testing-plugin', title: '有点无聊，就写了个插件', date: '2022年3月1日', excerpt: '每次项目提测都要手动走一遍基本功能，太麻烦了。于是动手写了一个Chrome自动化冒烟测试插件，自动遍历页面DOM元素并执行点击事件。' },
  { id: '7081206936556797989', slug: 'web-fuzz-testing-system', title: '疫情在家，写了一套web fuzz系统', date: '2022年3月22日', excerpt: '疫情期间在家搭建了一套Web Fuzz测试系统，通过模糊测试发现前端页面的潜在问题和边界情况。' },
  { id: '7027042022317883422', slug: 'svg-in-vue3', title: 'SVG在VUE3上的配置与使用', date: '2021年10月30日', excerpt: '讲解如何在Vue3项目中优雅地配置和使用SVG图标，包括插件选择、组件封装和最佳实践。' },
  { id: '6974327517368811527', slug: 'vue-mixins-and-slots', title: 'Vue详解 mixins & slots', date: '2021年6月18日', excerpt: '讲一讲Vue中mixins混入和slots插槽的使用场景、核心概念和实践技巧。' },
  { id: '6921686794987634695', slug: 'javascript-prototype-and-this', title: '看完这篇"原型"&"this"，就两字"通透了"', date: '2021年1月25日', excerpt: '深入浅出地讲解JavaScript中最"别扭"的两个概念：原型链和this指向。' },
  { id: '6920169345746206733', slug: 'chrome-storage-cookies-plugin', title: '整了一个chrome插件，方便操作Storage & Cookies', date: '2021年1月21日', excerpt: '工作中需要频繁操作浏览器缓存数据和Cookie进行鉴权，于是写了一个Chrome插件来简化操作。' },
  { id: '6904954800241623048', slug: '2020-year-in-review', title: '2020，写给自己 | 掘金年度征文', date: '2020年12月28日', excerpt: '也许日记都是想到什么写什么，不论开心或是难受，落笔便成了回忆。回望2020这不平凡的一年。' },
  { id: '6881558993924259854', slug: 'frontend-performance-automation', title: '谈谈前端性能自动化', date: '2020年9月13日', excerpt: '基于Lighthouse搭建前端性能自动化测试工具，花了一个月时间完成工具建设和平台搭建。' },
];

const HTML_TO_MD_FN = `
function htmlToMd(el) {
  let md = '';
  for (const node of el.childNodes) {
    if (node.nodeType === 3) { md += node.textContent; continue; }
    if (node.nodeType !== 1) continue;
    const tag = node.tagName.toLowerCase();
    if (tag === 'style' || tag === 'script') continue;
    if (/^h[1-6]$/.test(tag)) {
      const level = tag[1];
      md += '\\n' + '#'.repeat(Number(level)) + ' ' + node.textContent.trim() + '\\n\\n';
    }
    else if (tag === 'p') {
      let p = '';
      for (const c of node.childNodes) {
        if (c.nodeType === 3) { p += c.textContent; continue; }
        if (!c.tagName) { p += c.textContent; continue; }
        const ct = c.tagName;
        if (ct === 'STRONG' || ct === 'B') p += '**' + c.textContent + '**';
        else if (ct === 'EM' || ct === 'I') p += '*' + c.textContent + '*';
        else if (ct === 'CODE') p += '\`' + c.textContent + '\`';
        else if (ct === 'A') p += '[' + c.textContent + '](' + c.href + ')';
        else if (ct === 'IMG') p += '![' + (c.alt||'') + '](' + c.src + ')';
        else if (ct === 'BR') p += '\\n';
        else p += c.textContent;
      }
      md += p.trim() + '\\n\\n';
    }
    else if (tag === 'ul' || tag === 'ol') {
      const items = node.querySelectorAll(':scope > li');
      items.forEach((li, i) => {
        const prefix = tag === 'ol' ? (i+1)+'. ' : '- ';
        md += prefix + li.textContent.trim() + '\\n';
      });
      md += '\\n';
    }
    else if (tag === 'pre') {
      const code = node.querySelector('code');
      const lang = code?.className?.match(/language-(\\w+)/)?.[1] || '';
      md += '\`\`\`' + lang + '\\n' + (code||node).textContent + '\\n\`\`\`\\n\\n';
    }
    else if (tag === 'blockquote') md += '> ' + node.textContent.trim() + '\\n\\n';
    else if (tag === 'img') md += '![' + (node.alt||'') + '](' + node.src + ')\\n\\n';
    else if (tag === 'table') {
      const rows = node.querySelectorAll('tr');
      rows.forEach((row, ri) => {
        const cells = row.querySelectorAll('th, td');
        md += '| ' + Array.from(cells).map(c => c.textContent.trim()).join(' | ') + ' |\\n';
        if (ri === 0) md += '| ' + Array.from(cells).map(() => '---').join(' | ') + ' |\\n';
      });
      md += '\\n';
    }
    else md += htmlToMd(node);
  }
  return md;
}
`;

function escapeForTS(str) {
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

async function main() {
  if (!existsSync(POSTS_DIR)) mkdirSync(POSTS_DIR, { recursive: true });

  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');

  const results = [];

  for (let i = 0; i < ARTICLES.length; i++) {
    const art = ARTICLES[i];
    console.log(`[${i+1}/${ARTICLES.length}] ${art.title}`);
    const url = `https://juejin.cn/post/${art.id}`;

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForSelector('article', { timeout: 10000 });

      // Try raw markdown first (works for newer articles)
      let content = await page.evaluate(() => {
        const scripts = document.querySelectorAll('script');
        for (const s of scripts) {
          const text = s.textContent || '';
          const idx = text.indexOf('mark_content:"');
          if (idx === -1) continue;
          const start = idx + 'mark_content:"'.length;
          let end = start;
          while (end < text.length) {
            if (text[end] === '\\' && end + 1 < text.length) { end += 2; continue; }
            if (text[end] === '"') break;
            end++;
          }
          const raw = text.substring(start, end);
          return raw.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\"/g, '"').replace(/\\\\/g, '\\').replace(/\\u002F/g, '/');
        }
        return null;
      });

      if (content) {
        content = content.replace(/^---\n.*?\n---\n\n?/s, '');
        console.log(`  Raw markdown: ${content.length} chars`);
      } else {
        // Fallback: convert rendered HTML to markdown
        content = await page.evaluate(`
          ${HTML_TO_MD_FN}
          const article = document.querySelector('article .markdown-body');
          article ? htmlToMd(article).replace(/\\n{3,}/g, '\\n\\n').trim() : null;
        `);
        console.log(`  HTML->Markdown: ${content?.length || 0} chars`);
      }

      if (!content) { console.log('  SKIPPED - no content'); continue; }

      const dir = resolve(POSTS_DIR, art.slug);
      if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

      const tTitle = art.title.includes('"') ? `'${art.title}'` : `"${art.title}"`;
      const tExcerpt = art.excerpt.includes('"') ? `'${art.excerpt}'` : `"${art.excerpt}"`;

      writeFileSync(resolve(dir, 'index.ts'), `import type { Post } from "../types";

const post: Post = {
  slug: "${art.slug}",
  title: ${tTitle},
  date: "${art.date}",
  excerpt: ${tExcerpt},
  content: \`
${escapeForTS(content.trim())}
\`,
};

export default post;
`, 'utf-8');

      results.push(art.slug);
      console.log('  OK');
    } catch (e) {
      console.log(`  ERROR: ${e.message}`);
    }
  }

  await browser.close();

  // types.ts
  writeFileSync(resolve(POSTS_DIR, 'types.ts'), `export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}
`, 'utf-8');

  // index.ts
  const imports = results.map((s, i) => `import post${i} from "./${s}";`).join('\n');
  const arr = results.map((_, i) => `post${i}`).join(', ');
  writeFileSync(resolve(POSTS_DIR, 'index.ts'), `${imports}
import type { Post } from "./types";

export type { Post };
export const posts: Post[] = [${arr}];
`, 'utf-8');

  console.log(`\\nDone! ${results.length} articles saved.`);
}

main().catch(e => { console.error(e); process.exit(1); });
