import type { Post } from "../types";

const post: Post = {
  slug: "web-fuzz-testing-system",
  title: "疫情在家，写了一套web fuzz系统",
  date: "2022年3月22日",
  excerpt: "疫情期间在家搭建了一套Web Fuzz测试系统，通过模糊测试发现前端页面的潜在问题和边界情况。",
  content: `
# 日常闲聊

hello， 大家好呀，今天的上海落起了小雨。我很喜欢下雨天，听着歌，做什么都很幸福。只有一点，会让我讨厌下雨天，那便是湿漉漉的感觉。

到目前为止已经居家办公三周了。怎么形容这种感受呢，刚开始还是很ok的，想着最多一周吧，应该是可以控制住的。然后现在就一言难尽。相信不用我过多描述，已经是显而易见了。

这么多天在家，几乎没怎么下过楼，整个人是很闷的。下楼也没地方去，也就只能绕着小区走两圈。其他地方也不敢去，因为现在上海，哪里都可能有带着无症状的人在溜达。

最近一周，上海物价也是涨的，家门口的蔬菜店，水果店，几乎都翻了一倍的价格。并且蔬菜水果，都不怎么新鲜了。

所以呢，还是希望它尽快过去吧，好好的期待一下五一。

# 直奔主题：webfuzz是什么

好了，今天给大家介绍一款最近疫情在家写的一个工具：webfuzz。

大家可能对这个有些不知道是什么？以及它是干嘛用的？

我们先简单的看两张图感受一下吧:

1. 请求直接拦截，篡改了返回：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c0d65bda29f46fe8cf4f3bd0fc9215e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

1. 页面上资源文件，被破坏：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe391510d2c3415d8cc1b1c53fa3c273~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

1. 服务遭到异常篡改，数据丢失：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99583f66ae0c44c19c867ae148b5be0e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

1. css样式遭到破坏：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e163fec642b48469b401d0572ecc819~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

ok，看完这些，相信大家心里多少知道了些，webfuzz做的事情了。

##### 那么什么是webfuzz呢？

说到webfuzz具体是干什么用的呢？这里需要插入一个背景概括：

> 背景简介：
前段时间，做了一个小的业务需求，就是关于播放器的。
关于播放器，大家要是了解的可能知道，播放器拉取的播放资源，都是流的形式，播放器内核会根据与视频云约定好的一套加解码契约，对视频流进行解码，实例，播放。
然后呢，存在一个问题，关于这种视频流是否可以正常解析，以及拉流会不会在下发的过程中遭到破坏，流本身会不会存在因为网络情况而发生抖动等等。
那么出现这种情况的话，播放器会怎么样？ 会不会实例化失败，会不会影响播放页面。
遇到这些问题呢，于是我就尝试做了一些工作。对视频流的异常处理。

所以webfuzz 也是从这样的场景中抽离出来，去干扰破坏页面中的文件资源，服务应用。达到一种web上的测试的手段，继而再去校验这些破坏给web UI 所带来的影响。

简单来说，就是对一个页面依赖的全部/部分资源，或者应用服务，进行不知名的破坏，使其出现告警，报错等情况下页面UI会是一个怎么样的状态。

# 关于webfuzz系统的分析

上面说完了，webfuzz怎么衍生出来的，以及做的事情，描述的还不够全面。上面是去破坏流，实现播放器拉流解析上的异常。那这个仅仅是针对播放器了。

这里需要补充的：如果是针对整个web的话，是不行的，并不是所有页面都含有播放器。所以需要做一个通用的的处理。并且要抛开播放器这一个具象的点。

对整个web而言，它包含了：*js，css，img，media，xhr*等。那么对于fuzz而言，需要做到的是对你页面的fuzz，那其实这些点都需要被设计进去。

并且所有类型的文件，都是请求，既然是请求，就会包含 请求头，请求体，返回体。只是需要对这些不同的类型进行区分。

就fuzz而言，它可以fuzz掉任何请求的头，参数，响应体。所以在实现逻辑上都是一致的，

但对于资源文件的处理方式稍有不同，因为只是对于资源文件，几乎都是直接读取的，因为类似这些资源都已经是配置好的了。所以你的fuzz，只会影响这些资源，能否正常读取而已。

而对于具体的xhr请求就会有些区别。因为这一层会是具体业务逻辑实现，不论是什么请求方式，都需要考虑请求参数，与响应体。需要根据自己的需求，去fuzz你的传参还是返回。

所以对于资源文件类型，只需要判断他们的req.resourceType()，然后根据自身的应用场景需要，是该类型全部fuzz，，还是部分fuzz。且仅fuzz block便可。

#### 对于xhr的fuzz

这里详细讲一下xhr的fuzz，关于这边的的fuzz 是系统设计的核心。先看一张图吧：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bbb06548c0de406db4f0686e8b9b0aa6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这个图中其实就是设计的对具体的请求的fuzz，它包含你的请求头，你的请求体，甚至你的返回。这里的fuzz的意义，是比其他更加重要的。

可以回到最开始介绍的那几张图中看第三张图，就是业务逻辑的应用服务，被fuzz掉，影响了，整个页面UI的展示。

# 关于系统的设计

好了，上面跟大家讲了那么多，这边跟大家讲一讲 webfuzz 系统的具体设计。

看一张图：

![时序图.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20ddc407597543f7bf81ef34035eb4d4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

系统中比较重要的一环，就是fuzz服务。因为我们做的就是 fuzz。所以我们这边详细讲一下fuzz服务。

fuzz服务的核心，就是一个工具：**puppeteer**。 关于这个或多或少，大家可能知道。这里为什么要说这个工具是核心呢？因为这个是设计中的重要一环。看一段官方代码：

\`\`\`php
page.on('request', request => {
// ======= 直接篡改返回体。不经过真实服务
request.respond({
status: 404,
contentType: 'text/plain',
body: 'Not Found!'
});
// ======= 拦截请求，处理请求头，重定向url，处理请求参数，更改请求方法
  //     req.continue({
  //       // url: newurl,
  //       // method: '',
  //       // postData: {},
  //       headers: "{}",
  //     });

});

\`\`\`

上面的官方代码可以看到，他是可以拦截请求的。也就是说，不论你是什么样的请求进来，只要带上你的fuzz配置信息，就可以使用这个，对你的请求进行定制拦截，并且篡改，从而通过这样的断点，去执行相关的操作。

那么拦截处理了，怎么去判断是否成功呢？这里还需要一个监听函数。就是在你的任意fuzz请求打进来，我进行了拦截处理，那我要告诉我，我有没有处理好。所以这里还需要另一个核心，依然看一段官方代码：

\`\`\`javascript
    page.on("response", async (res) => {
    if (res.url() === nowurl) {
      // console.log(res.url()); //显示响应的 URL，字符串
      // console.log(res.headers()); //显示响应的header对象
      // console.log(res.status()); //显示响应的状态码，数值型
      // console.log(res.ok()); //显示响应是否成功，布尔值
      // console.log(res.request()); //显示响应对应的 request 对象
      res.text().then((body) => {
        console.log("body: ", body);
      });
    }
  });
  

\`\`\`

就是说，你的任何拦截，不论打没打到真实服务上去，都会通过这个 response，来进行监听，并且告知你的这个fuzz服务，这次执行式否成功，fuzz完成与否。

还有一个点就是：需要根据这个response的返回，回调，去执行截图，进行对比匹配。

# 系统展示

除了自定义去fuzz自己需要的服务，系统还设计了一些智能的fuzz 场景，这些智能匹配是通用设计，去智能匹配你的需要fuzz页面的一些请求，并且做fuzz动作，可根据自己的实际需要勾选：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b29234b50f0f498089b3f6f63623b58f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2aeacf8fedf4fd4978a8cb52de94cbe~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8cc8a649fc534a01b20143951534d91b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

好了，关于webfuzz，暂时就先说到这里咯，本次分享，还不够全面和详细，只包含了大概的实现，以及部分核心设计，后期有机会，会开源，不过要等批准了。

# 美句分享

生活的海洋并不像碧波涟漪的西子湖，随着时间的流动，它时而平静如镜，时而浪花飞溅，时而巨浪冲天……人们在经受大风大浪的考验之后，往往会变得更加坚强。

好啦，今天的分享就到这啦，希望这次疫情能快些结束。拜拜～
`,
};

export default post;
