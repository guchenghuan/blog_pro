import type { Post } from "../types";

const post: Post = {
  slug: "svg-in-vue3",
  title: "SVG在VUE3上的配置与使用",
  date: "2021年10月30日",
  excerpt: "讲解如何在Vue3项目中优雅地配置和使用SVG图标，包括插件选择、组件封装和最佳实践。",
  content: `
# 前述

hello，大家好。好就没更新啦，是不是很想我～ 😜。拖更这么久，也没什么原因，哈哈哈，纯粹是懒... 看了一眼距离上次写文章已经过去四个月之久，咦惹～

好了，现在就直接进入正题吧，今天要说的是关于svg的配置以及使用。

为什么要说这个呢，主要是最近一直在看vue3相关的知识，顺便用vite搭了一个项目，以及使用了ts。

在自己的搭建的项目中，本来是想简单点使用的一些公共组件库，但是很鸡肋。没法满足一些特定的业务需求，于是乎，就打算自己写一套。继而呢，就决定用svg，就在这时，发现怎么感觉哪哪都在报错？？？黑人问号脸，于是就花时间去看了一下。嚯，果然小有差异。于是就有了这篇文章，记录一下。

那就开始咯～

# 正文

## 准备工作

\`\`\`csharp
安装依赖
npm install svg-sprite-loader -D

yarn add svg-sprite-loader -D

\`\`\`

## 组件编写

在安装好相关依赖之后，就开始写一个公共组件暴露出去吧。这个组件的目的，不言而喻，不做解释啦。

\`\`\`xml
// src/components/svgIcon.vue
<!--只需要给一个dom存放svg即可-->
<template>
  <svg :class="svgClass" v-bind="$attrs" :style="{ color: color }">
  <!--这边是做一个联动，根据传入的name来展示相关的svg-->
    <use :xlink:href="iconName" /> 
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "SvgIcon",
  props: { // 因为是被调用，所以要传入props
    name: { // 自定义svg的name属性
      type: String,
      required: true,
    },
    color: { // 自定义svg的color属性
      type: String,
      default: "",
    },
  },
  setup(props) { // 数据处理
      // 这边就是根据props的name来进行处理啦
    const iconName = computed(() => \`#icon-\${props.name}\`); 
    const svgClass = computed(() => {
      //   console.log(props.name, "props.name");
      if (props.name) {
        return \`svg-icon icon-\${props.name}\`;
      }
      return "svg-icon"; // svg 标签
    });
    return {
      iconName,
      svgClass,
    };
  },
});
</script>

// 自己定一些喜欢的样式
<style lang="scss">
.svg-icon {
  width: 1.6em;
  height: 1.6em;
  margin-left: 3px;
}
</style>

\`\`\`

具体的解释看注解哦～ 接下来看继续下一步。

## svg编写

\`\`\`ruby
// src/icons/svg/
这个地方就是存放各种你想写入的svg；
eg：

\`\`\`

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a5903b046514119b24075a49545f9bb~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这些文件夹放的位置啊，取名啊，全凭个人爱好，想怎么操作，就怎么操作。（怎么开心怎么来，当然最好正式一点。

## 全局注入

在main.ts 里面全局注入svg-icon组件，此举是注入灵魂之举。哈哈哈哈

\`\`\`php
   //main.ts
    import svgIcon from './components/SvgIcon.vue'
    
    app.use(router).use(store, key).use(ElementPlus, { i18n: i18n.global.t, size: globalComponentSize }).use(i18n).use(VueGridLayout).component('svg-icon', svgIcon).mount('#app');

\`\`\`

此举的目的是在全局都可挂载此组件。

## 关于vite中的plugin（这是重点）

如果你是用的ts，那么这就是重点了，因为不做这一步，就不回生效，各种报错，具体可以参考下

[点我看详情](https://link.juejin.cn/?target=)

这也是其中一个机制。

好了，说好前文，就开始整活吧

\`\`\`javascript
    // src/plugins/Builder.js
    import { readFileSync, readdirSync } from 'fs'

    let idPerfix = ''
    const svgTitle = /<svg([^>+].*?)>/
    const clearHeightWidth = /(width|height)="([^>+].*?)"/g

    const hasViewBox = /(viewBox="[^>+].*?")/g

    const clearReturn = /(\\r)|(\\n)/g

    function findSvgFile(dir) {
      const svgRes = []
      const dirents = readdirSync(dir, {
        withFileTypes: true
      })
      for (const dirent of dirents) {
        if (dirent.isDirectory()) {
          svgRes.push(...findSvgFile(dir + dirent.name + '/'))
        } else {
          const svg = readFileSync(dir + dirent.name)
            .toString()
            .replace(clearReturn, '')
            .replace(svgTitle, ($1, $2) => {
              // console.log(++i)
              // console.log(dirent.name)
              let width = 0
              let height = 0
              let content = $2.replace(
                clearHeightWidth,
                (s1, s2, s3) => {
                  if (s2 === 'width') {
                    width = s3
                  } else if (s2 === 'height') {
                    height = s3
                  }
                  return ''
                }
              )
              if (!hasViewBox.test($2)) {
                content += \`viewBox="0 0 \${width} \${height}"\`
              }
              return \`<symbol id="\${idPerfix}-\${dirent.name.replace(
                '.svg',
                ''
              )}" \${content}>\`
            })
            .replace('</svg>', '</symbol>')
          svgRes.push(svg)
        }
      }
      return svgRes
    }

    export const svgBuilder = (path, perfix = 'icon') => {
      if (path === '') return
      idPerfix = perfix
      const res = findSvgFile(path)
      // console.log(res.length)
      // const res = []
      return {
        name: 'svg-transform',
        transformIndexHtml(html) {
          return html.replace(
            '<body>',
            \`
              <body>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">
                  \${res.join('')}
                </svg>
            \`
          )
        }
      }
    }
    

\`\`\`

## 一发入魂

最后的最后，就是去vite.config.ts 中配置了，目的是将src/icons/svg/下的svg全部导入，不用你写一个导入一个，联动起来，是不是很虚浮？

\`\`\`css
    import { svgBuilder } from './src/plugins/svgBuilder'; 
    plugins: [
        svgBuilder('./src/icons/svg/')
    ],
 

\`\`\`

## 使用

好了，全部事情都做完之后，就可以进行使用啦。

具体使用：

\`\`\`javascript
    // 在你具体的vue项目中 导入 & 引用 
    import SvgIcon from "@/components/SvgIcon.vue";
    // 
    components: { SvgIcon },
    // 
    <SvgIcon :name="fail"></SvgIcon>
   

\`\`\`

如果你想把这个icon 在你的其他组件中进行封装，也很简单奥～

# 结语

好了，关于vite打包构建的vue3项目下，如何使用svg就讲完了。

接下来也不知道下次更新会在设么时候，不确定。

最近也不知道该做什么，该怎么走。换言之，内心强烈的知道自己要干什么，怎么做。遇到了一个漫长的瓶颈期。

好啦，看完这篇就早点下班吧～ 祝各位双休愉快。嗨起来～ 拜拜～
`,
};

export default post;
