import type { Post } from "../types";

const post: Post = {
  slug: "frontend-performance-automation",
  title: "谈谈前端性能自动化",
  date: "2020年9月13日",
  excerpt: "基于Lighthouse搭建前端性能自动化测试工具，花了一个月时间完成工具建设和平台搭建。",
  content: `
前述：前段时间出了性能分析的需求，需要对前端页面性能做一套自动化测试工具。领导都发话了，那咱说干就干。花了一周时间去找资料以及匹配优秀并且合适的开源插件。花了一个月的时间(断断续续，需求也要做的~)完成了这个工具的建设和开发。目前也搭建了一套平台来支撑这样的工具使用。前端用的VUE，后端用的node(由于本人较熟悉前端)，数据库用的是mangoDB。好了，话不多说，上才艺~

# 设计背景 & 前端原理

## 设计背景：

1. 硬性需求：web端以及H5上的页面，需要进行性能分析与优化
2. 痛点：

2.1 数据收集需要手动干预：通过chrome dev-tool的Perfomance进行分析，需要手动刷新，并手动记录，需要大量的重复工作，尤其是要控制变量测试的情况；
示例：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0c8eb4358184006801be089f37176ec~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

2.2 图形化持续集成复杂：通过代码打log，即通过performance.timing中记录的TimeEvent时刻计算页面性能指标，指标的完整性和图形化展示仍需要工作量
3. 目的：将性能数据收集结合selenium，进行自动化收集，分析，处理。植入动态脚本，进行UI自动化操作时，实时收集分析数据。

## 浏览器渲染原理：

1. 浏览器渲染
2. 浏览器渲染引擎

2.1 浏览器是Html解析和页面最终展示的工具。

2.2 主要功能：将用户选择的web资源呈现出来，需要从服务器请求资源，并将其显示在浏览器窗口中，资源的格式通常是HTML，也包括PDF、image及其它格式。在浏览器组成部分中，渲染引擎是用户直接相关，呈现用户所需页面的部分。

2.3浏览器内核[渲染引擎]：作用是将页面转变成可视化的图像结果。渲染引擎工作流：
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42eab5a91fb4475db421250dc1f7b85c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

第一步，解析HTML构建DOM树：从html标签的解析开始，将各种标签解析为dom树中的各个节点，标签和dom树种的节点是一一对应关系。

第二步，构建渲染树：将CSS和style标签中的样式信息解析为渲染树，渲染树由一些包含有颜色和大小等属性的矩形组成，将按照正确的顺序显示到屏幕上。

第三步，渲染树布局：确定每个节点在屏幕上的确切显示位置。

第四步，渲染树绘制：遍历渲染树并用UI后端层将每一个节点绘制出来。
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b1e6dc122ab4905a1b97da584552fbe~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

1. H5页面执行过程：

[页面加载耗时:firstPaint、DomContentLoaded(首屏页面可见)、OnLoad（首屏加载完成）]

解析HTML结构

加载外部脚本和样式表文件。

解析并执行脚本代码。//部分脚本会阻塞页面的加载。

DOM树构建完成。//DOMContentLoaded事件。

加载图片等外部文件。

页面加载完毕。//load事件
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9251447b398c4ca8a2fc508bb38ea8aa~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

# 性能指标+优化方法

## 性能关注指标：

### HTTP相关

1.http请求个数。解决方案：CSS精灵、图片地图、js css合并。

2.组件是否压缩。解决方案：压缩方法、压缩对象、图片格式和大小是否合适、CSS放在顶部、JS放在底部、js & CSS压缩、是否添加缓存、避免非200返回值、使用CDN。

### 时间相关[耗时]

1.白屏时间：用户首次看到网页有内容的时间，即第一次渲染流程完成时间。

2.首屏时间：用户看到第一屏，即整个网页顶部大小为当前窗口的区域，显示完整的时间。尽量让它满足一秒钟法则。

3.首资源下载时间：从开始下载到第一个资源均下载完成的时间，不包括页面绘制时间。

4.总资源下载时间：从开始下载到所有资源均下载完成的时间，不包括页面绘制时间。

5.用户可操作时间：从页面开始加载到用户操作可响应的时间。

### WebView相关[内存/流量、CPU]

在android和IOS上测试H5性能，还应该关注因加载H5而引起的app常规性能指标。

1.内存：加载页面前后内存变化，可间接反映H5中资源数量和大小，如dom数量，图片大小。

2.CPU：当页面中资源样式复杂，强调视觉效果时，可观察CPU占用率来反映H5绘制质量。如果CPU长期处于高占用率，可考虑降低高计算量的视觉效果等手段。

3.FPS(流畅度)：帧率尤其在有视频和动画效果的H5中，应该重点关注，防止严重的卡顿流出。

## 优化方法：

### 减少HTTP请求数：

1)合并图片：图片多的时候，针对相对稳定的图片，可以通过减少图片数量，合并为一张大图，从而减少HTTP请求数。其次，可以通过增加缓存来提示技能。合并大图可以使用CSS Sprites技术来做处理。

2)合并压缩CSS样式表和JS脚本:工具可以通过Minify、YUI Compressor等。

3)去掉不必要的请求：残留的无效连接，这些无效连接对页面并没有实际作用。可以通过firebug工具去查看。

4)充分利用缓存：主要关注客户端的缓存信息。

如果当前时间小于(<)expires，浏览器会从缓存中直接获取相关的数据信息或HTML文件；如果当前时间>expires，浏览器会向服务器发送请求来获取相关数据信息。

### 图片优化

1. 尽可能地使用PNG格式的图片，相对来说大小较小。
2. 对于不同的图片格式，上线前做一次优化。比如PNG可以通过工具Pngcrush来优化，JPG格式的图片可以使用Jpgtran来优化，GIF格式的图片可以使用Gifsicle来优化。
3. 图片的延迟加载，也称赖加载。

### 其他

1.使用CDN：Content Delivery Network，内容分发网络。基本思路：尽可能避开互联网上有可能影响数据传输速度和稳定性的瓶颈和环节，使内容传输得更快、更稳定。通过在网络各处防止节点服务器所构成的在现有的互联网基础之上的一层智能虚拟网络，CDN系统能够实时地根据网络流 量和各节点的连接、负载状况以及到用户的距离和响应时间等综合信息，将用户的请求重新导向离用户最近的服务节点。

2.开启GZIP：可理解为压缩，比较普遍的数据压缩格式，用于压缩使用Internet传输的所有文本类资源，如HTML、CSS、JS等。

3.样式表和JS文件的优化：位置存放。CSS样式表文件放到页面的头部；JS文件放到页面的尾部。

4.使用无cookie域名：当发送一个请求的时候，同时还要请求一张静态的图片和发送cookie时，服务器对于这些cookie不会做任何使用，也就是说这些cookie没有什么用，没必要随请求一同发送。

5.前端代码结构优化：计算的逻辑放到后端进行，前端只负责展示，同时对后端提供数据的接口进行拆分，不要都挤到一个接口里。

6.其他优化方法：
1)避免CSS@imort；
2)优化DNS查找。设置Apache的httpd.conf配置文件中的HostnameLookups为off，从而减少DNS查询次数；
3)移除重复脚本；
4)合理使用Etag；
5)Favicon.icon；
6)避免非200的返回；

# 技术选型及项目设计

## 前端框架：VUE（cn.vuejs.org/）

### 什么是VUE：

Vue 是一套用于构建用户界面的渐进式框架

### 为什么选VUE：

轻巧、高性能、拥有可组件化的MVVM库以及容易上手的API。
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/abbf570b74934f0ea21aa8d5698e4f0b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 后端服务：nodeJs （nodejs.cn/）

## 数据库：MongoDB （www.mongodb.org.cn/）

## 插件： Browsertime + Coach + pagexray

### Browsertime （源码:www.github.com/sitespeedio…

Browsertime 使用 selenium NodeJS来驱动浏览器。（nodemoudles中有相对的driver包，选择相对应的浏览器，则驱动对应的driver）加载一个 URL，执行可配置的javascript来收集指标
Browsertime的四个核心功能：
它使用浏览器( Firefox/Chrome ) 处理所有内容。
它执行一批默认和可以配置的js脚本，当URL在浏览器中完成加载。
它记录了用于计算视觉指标的浏览器屏幕的video。

它允许浏览器访问 URL ( 登录用户等) 之前和之后运行 selenium 脚本（及动态脚本，例如：播放视频）。应用于两种不同的情况：
作为独立工具运行来收集网站的性能计时指标。
作为 JavaScript runner 集成在工具中，收集任何JavaScript度量/信息。
运行示例：

配置 Browsertime。
Browsertime 通过 selenium 启动 Firefox/Chrome ( Webdriver： Chromedriver/Geckodriver）
Browsertime 启动 FFMPEG 来记录整个自动化过程的视频
打开浏览器 访问指定的 URL。
当页面开始加载时，Browsertime执行JavaScript计时脚本，开始度量并收集数据：

1. Navigation Timing metrics
2. User Timing metrics
3. First paint
4. RUM Speed Index

加载完成后，将收集数据生成har文件，该文件记录整个加载过程中的所有请求/响应。
FFMpeg停止，生成的视频文件会被拿来分析。 并且Browsertime会收集视觉指标。
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db0a56ee85d2454186b1579cd0625cd4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### Coach （源码：github.com/sitespeedio…

用来分析页面在浏览器中执行js脚本检查渲染路径，检查图像是否在浏览器中缩放等等，对页面性能（Performance）、Web最佳实践（Web Best Practice）和可用性（Accessibility）三个核心指标进行打分，
将获得0-100之间的分数。如果获得100，那么页面性能很棒；
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3cd3f1f2bbd4f618d11153386549e82~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

为什么使用此插件：

1. 会给出一些让页面加载更快建议；
2. 使用真正的浏览器来查看您的页面，模拟出用户的真实访问行为
3. 每个建议都有一个或多个单元测试
4. 不仅仅是性能:也会给出当前页面的可访问性以及web最佳实践
5. 可以将DOM中的知识与HAR结合起来，为您提供强大的建议
6. 可以与其他Web性能测试工具巧妙的结合使用（可与browser time结合使用）

运行示例：
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0f0ea0f2c8b45f288db1138fc274846~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### PageXray

PageXray将HAR文件转换为更易于阅读和使用的JSON格式
PageXray收集了：

每种内容类型的请求大小和数量。
每个域的大小和请求。
每个响应代码的请求数。
基本域和用于基本资产（主HTML文档）的httpVersion。
具有以下数据的所有资产（响应）：类型，URL，大小，过期（规范化的过期将最大寿命/过期转换为仅以秒为单位的过期），状态（响应代码），timeSinceLastModified（使用响应中的最后修改字段）标头并将其标准化为秒），httpVersion以及所有请求和响应标头。
如果从WebPageTest使用HAR，我们还将获得SpeedIndex和其他VisualMetrics。
还将获得一些额外的指标，例如SpeedIndex。
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a684ec66c7f94e5bbcc6fead9cf4a967~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d30197ae1f244f36857f1f000ae8c8cd~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a2ef97f62754d599f2cfe02eb1c1867~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 图形工具：Echarts(echarts.apache.org/zh/index.ht…

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/611eef2a1cce4a06922a5f4115cfd354~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 自动化：selenium (www.selenium.dev/) & WebDriver(www.selenium.dev/documentati…)

## CI集成：graphite (graphiteapp.org/)，Grafana (grafana.com/grafana/)

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64a98cfc331c4afba4442242ff2b9efd~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef125ad19ae643319268cdf2924bd675~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52dba659c8e4439992dc603ef17af9dc~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 项目设计流程图：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ebbf1f1f6209453995b9da166f9d119f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 项目落地 （GitHub：github.com/chenghuangu…

## 补充：竞品数据比对功能：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e183ecfbd6d41198b4da74824b053c2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

最后：小白上路，第一次尝试设计以及发文。有不对的，说错的，改进的，还请指点~
`,
};

export default post;
