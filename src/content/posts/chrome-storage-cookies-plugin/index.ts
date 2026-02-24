import type { Post } from "../types";

const post: Post = {
  slug: "chrome-storage-cookies-plugin",
  title: "整了一个chrome插件，方便操作Storage & Cookies",
  date: "2021年1月21日",
  excerpt: "工作中需要频繁操作浏览器缓存数据和Cookie进行鉴权，于是写了一个Chrome插件来简化操作。",
  content: `
# 背景

最近在工作中 一直需要操作浏览器缓存的相关数据，并且在做项目的过程中，需要一直使用cookie等。用来鉴权。每次需要用到这些的时候，就需要打开浏览器，去找相关的数据，一个个复制，很是不方便，于是就有了写这样一个插件的想法。

# 设计背景

一开始是自己摸索写，去[chrome插件开发官方](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.chrome.com%2Fdocs%2F)，看了一堆资料，设计。中途遇到了一些问题，于是开始百度。偶然发现市面上就有相关的插件。哦吼，可以不用自己写了。

但是用的过程中，很是不舒服。一个是插件本身就是独立的，操作起来比较繁琐；另外就是好像功能上不是很能满足我的需求。于是就结合了已有的插件做了一次封装。

# 正文

好了，开始正文。这个插件具体怎么用呢？（首先需要down到本地，资源地址，放在文章最后啦）

首先，看下这个插件大概长什么样：👇 （Local Storage & Session Storage & Cookies）

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58c9b33e0f8047d09dcade99a2765412~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a020927abd94744a2878bdca5e9edce~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7a6a28a02ac44c190b487799d632179~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

基本的样式就是以上这样拉！

这个插件支持的功能包括，数据的增删改查。全部信息。如下：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24f0329289354f43b1bb148cbb14683b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/70b2f958b2af4be586246686a896b7a6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

# 这个好处是什么呢？

就比方说我现在做的工作，前端开发一些小工具的时候，需要去调用公司的服务，那么就需要在代码中植入相关域下的Cookie，每次都是手动去打开浏览器，很是麻烦。这个一键copy岂不是很爽？

再比方，在页面开发中，有些状态值，需要记录local。如果想要重置某些状态信息，就需要手动去找，去改。并且可能需要新增一些状态管理信息的时候，简直难受。有了这个，直接输入框改一下，新增一下。岂不是很美滋滋~

# 结尾

好了，就说这么多拉，需要体验的小伙伴，可以从这里clone 至本地哦~  [Local-Session-Cookies](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FIMT-happy%2FLocal-Session-Cookies)

插件源：[Cookies](https://link.juejin.cn/?target=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Feditthiscookie%2Ffngmhnnpilhplaeedifhccceomclgfbg%3Fhl%3Dzh-CN)，[Storage](https://link.juejin.cn/?target=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Flocalstorage-manager%2Ffkhoimdhngkiicbjobkinobjkoefhkap%3Fhl%3Dzh-CN) 需要的朋友可以点开传送门哦~

有什么问题需要交流的，可以评论区留言~

觉得不错就点个赞吧~ 比个心~
`,
};

export default post;
