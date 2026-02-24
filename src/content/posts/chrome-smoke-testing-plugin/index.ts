import type { Post } from "../types";

const post: Post = {
  slug: "chrome-smoke-testing-plugin",
  title: "有点无聊，就写了个插件",
  date: "2022年3月1日",
  excerpt: "每次项目提测都要手动走一遍基本功能，太麻烦了。于是动手写了一个Chrome自动化冒烟测试插件，自动遍历页面DOM元素并执行点击事件。",
  content: `
# 闲聊

hi，大家好呀，今天的上海风和日丽。这两天的温度都挺高嗷，室内环境中，短袖大军已经日益猖獗，一发不可收拾，而穿着秋裤的我，在这股力量中，略微显得有那么点格格不入...

有很久没更新文章咯。年前定了一系列专项事情，目前正在有条不紊的进行中。然后，最近有一个小感悟，就是，凡事不能想的太简单，还是要有计划的去规划项目的时间。而我这次就是一次悲惨的教训：就是原以为某个功能实现起来很简单，于是一拖再拖，没当回事，直到快交付的时间节点，才发现好像不简单，于是狂加了几天班。。。 瑞了。

# 背景

今天写点什么呢？先简单说个背景：就是每次项目开发完成提测了，都要走一遍基本功能是否实现，看看提测质量怎么样，有没有一些基本功能还没做呀，接口有没有还没调通的，方法实现了吗？等。

那么，就关于上面说的这些问题，如果常规来做的话，要么就是开发开发完了，自己点点看，要么就是到了测试这一块之后，测试一个个点点看。

所以说到底，都要自己点点看。emmmm。那么有没有什么简单方便的方法，能够代替一个个手动去点击测试呢？我辗转反侧想了好几个不眠的夜晚，于是想着，要么就写一个工具吧，以自动化的方式，去把这些事情做了。嘻嘻，于是说做就做起来了。

那今天就给大家分享一个最近做的小工具吧：自动化冒烟测试插件。

# 构思

那么既然要做一个自动化点击的事情，首先需要怎么做呢？那肯定是要去拿到页面上的一个个dom元素，去判断它绑定了哪些事件啦。

说到这个，大家可能或多或少都知道，chrome自带的开发者工具就可以看到。EventListener下写的清清楚楚的。如图：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2a838be1d45496db7e184a241b13606~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

你是想看点击事件，还是鼠标事件，都应有尽有，嘻嘻。

那么这个只能是开发者工具里面带的，但是，如果要写一个程序，该怎么去判断呢？emmm，好像也是。想到这个的时候，又发现，哎嘿，不是有个  *getEventListeners()* 这个方法吗？是不是可以通过这个去看相应的元素是否存在事件呢？

于是，就做了一个demo小实验。首先想到的是全局检测：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/497ba79e0b6d40d9828e284accea5640~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

可以看到确实可以拿到相应的事件，但是很奇怪哎，这什么玩意，一个页面，**click** 事件怎么才两个？ excuse me？ 心里默念打扰了。告辞。

但是有点不信邪，怎么可能就只有两个点击事件呢，于是又重新试了一下新的方法：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a31e56df3e3d4ecdbf6eced17fa1d552~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

很显然的可以发现，哎嘿，这就对了吗。全局的不全，那就单个来做就好了。那么既然这样可以找出来哪些元素是带有事件的。那下一步是不是，就只要遍历出页面的dom元素就可以了？试试呗。

于是说干就干。整个函数来：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7d8ab07adce444f988ad9451e1fd647~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这样就可以拿到了。简单呀。code放在这里，大家可以console，试试看。

\`\`\`ini
      function getAllNodes(d) {
      //判断下参数
      d === "*" && (d = document.getElementsByTagName("body"));
      //用arguments[1] 初始化一个空数组
      !arguments[1] && (arguments[1] = []);
      for (var i = 0, l = d.length; i < l; i++) {
        //nodeType === 1 时 push
        if (d[i].nodeType === 1) {
          if (d[i].className.length > 0) {
            var classname = d[i].className.replaceAll(" ", ".");
            arguments[1].push(classname);
          }
          //   d[i].nameaa = d[i].className;
        }
        //有子节点 arguments[1]作为参数继续调用 arguments.callee 可以调用自身 匿           名函数常用
        if (d[i].hasChildNodes()) {
          arguments.callee(d[i].childNodes, arguments[1]);
        }
      }
      //把arguments[1] return出来
      return arguments[1];
    };
    getAllNodes("*")

\`\`\`

好了，既然现在拿到了页面中的整个元素了，那是不是我只要用  *getEventListeners()* 给这些元素列表遍历一下，看是否存在事件，标记个 *flag* ，给遍历的元素加个tag，就可以清晰的看到那些元素是存在事件的了。

于是console写了一个demo，嗯，完全ok，遍历没问题。嘻嘻，此刻心里，无比兴奋。接着就简单啦，就将遍历出来的元素，在一个个丢进执行方法里面就好啦。

当一切，觉得都准备好了之后，开始实际的编码，发现一个严重的问题。差点吐血... 就是，执行程序的时候，报了一个错： **getEventListeners() is not a function, is not defined**。那一瞬间，我人傻了。

这搞什么？怎么可能呢，console中能执行，我写到程序里，就不行了？逗我呢？ 为此我郁闷了许久，于是开始去查资料，可惜的是，没有什么博客能说清楚这个。于是带着 心存疑惑不解会死，一定要知道为什么的心态，去看了官方文档。答案是： *getEventListeners()* 只能在console中，供开发调试使用！！！所以朋友们，要记住，这是一个大坑！！！

# 改变思路

兜了一大圈，前功尽弃，白忙。这个感觉很不爽。但是不甘心。就想，那既然本来就是要做一个冒烟测试，为什么一定要判断dom元素是有绑定事件的才去执行呢？

dom的任何元素本身不就是可以点击的吗。没有事件，就没反应呗。这样去想，好像也是啊，为什么一定要去纠结  *getEventListeners()* 这个玩意呢？想到这，好像事情变得更简单了。

即然变简单了，好像只要吧刚刚遍历出来的元素，循环执行一下 *$(".xxxx").click();* 就可以了呢。那就走起来吧。循环事件。

此刻，又发现一个问题，循环便利，太快了，事件点击太多，直接报错了... 这咋玩，嘻嘻，也简单了，那就在循环中嵌入 *setTimeout* 呗，一秒执行一个事件，页面中事件就那么多。

\`\`\`javascript
    tmp.forEach((ele, index) => {
            (function (ele, index) {
              // 注意这里是形参
              setTimeout(function () {
                let currentname = $("." + ele)[0].innerText
                  ? $("." + ele)[0].innerText
                  : "normal";

        let eachlen = $("." + ele).length;
        if (eachlen > 1) {
          // $("." + ele)[1].click();
          let obj = {
            ele: ele,
            len: eachlen,
          };
          repeatclickevents.push(obj);
          let existeobj = {
            event:
              currentname && currentname.length < 10 ? currentname : ele,
            fatherevent: true,
            childlen: eachlen,
          };
          loginfo.push(existeobj);
        } else {
          $("." + ele).click();
          let obj = {
            event:
              currentname && currentname.length < 10 ? currentname : ele,
            fatherevent: false,
            childlen: 1,
          };
          loginfo.push(obj);
        }

        // print log message
        console.log(
          \`执行 \${
            currentname && currentname.length < 10 ? currentname : ele
          } 点击事件\`
        );
      }, 1000 * (index + 1)); // 还是每秒执行一次，不是累加的
    })(ele, index); // 注意这里是实参，这里把要用的参数传进去
  });
  

\`\`\`

嗯，很好的实现了，这样的功能。但是还有小问题，就是，你遍历下来的元素，很多都是子元素，就是很多 *li* 标签，都是一个元素属性，那么你在执行方法的时候，它不知道执行哪一个，会给你一个数组集合。

那么既然这样，就要在做细分处理了。执行前先判断下，这个元素是不是子元素集合，如果是的话，先踢出去，待会在执行，不是的话，那就直接丢到方法池里执行。思路满分。嘻嘻。

顺便说一下，插件还带上了页面中比较大的图片资源的分析。这里不过多描述啦。

\`\`\`ini
function getImageSize() {
  const getEntries = window.performance.getEntries();
  const imgR = getEntries.filter((ele) => ele.initiatorType === "img");
  let newarr = [];
  imgR.forEach((ele) => {
    $("<img />")
      .attr("src", ele.name)
      .on("load", function () {
        //这里使用的jquery新建一个img对象进行添加attr属性,把src添加上去,然后进行载入事件
        var imgw = this.width; //这里的width和height就是图片实际的宽高了
        var imgh = this.height;
        let splitnames = ele.name.split(".");
        let type = splitnames[splitnames.length - 1];
        const newobj = {
          name: ele.name,
          type: type,
          transferSize: ele.transferSize,
          encodedBodySize: ele.encodedBodySize,
          decodedBodySize: ele.decodedBodySize,
          width: imgw,
          height: imgh,
        };
        newarr.push(newobj);
      });
  });
  return newarr;
}

\`\`\`

好啦，这些说完了，接下来就是记录 执行事件完成后的监控了。

# 监控

既然是在chrome中执行的这些冒烟测试，那么不论接口，还是本身的func，有任何报错，console 控制台，一定不会放过这些个事情的吧？嘻嘻，想到这，就简单了。

在程序中使用 *window.addEventListener* 呗，执行过程中，记录下这些error日志就行啦。

\`\`\`javascript
window.addEventListener(
    "error",
    function (e) {
      console.log("==============", e.message);
    },
    true
  );
  

\`\`\`

但是这些都是展示在控制台上，如果要生成最后的报告类的文件，肯定是不可以的。那既然要生成报告，就给它落库不就好啦。嘻嘻，此处也有一个注意点，就是 *window.addEventListener* 第二个参数是个回调函数，所以要执行的上报程序需要在回调函数中实现。

# 操作历史记录

做完了监控，那就再做一下操作历史的日志呗，这个其实更简单了，即使把执行的每一步，都log下来，依然落库。这边不赘述了，后面会提供全代码。

# 最后搭建

上面讲述了大概的实现方法，大家应该也能看懂了。但是实际的开发，解决的问题，以及遇到的问题，远不止上面说的这些。可谓一波三折。

这些程序上的事情，都捋清楚了之后，就是要去想，怎么去搭建这样的一个工具了。对我而言自然而然的想到的是用 *jquery* 来写。emmm，对于擅长前端开发的开发者来说，看到这种需要跟dom交互的，条件反射的都会选择 *jquery* 吧。

好的实现方法选择好了，那么最后要以一个什么样的形式来呈现呢？这个我思考了片刻，觉得插件好像挺不错，嘻嘻，简单直接。

# 效果呈现

最终效果，就都以图片的形式来展现啦～

1. 安装插件
2. 执行之后的loading等待

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39564aecd14543b38571376630a18513~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

1. 数据日志打印，以及上报

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7453d55211a3439aafd47edadc67144e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

1. 平台查看报告

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/364574bec5e442cd99f5aa73939bee6c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

# 核心code

这里仅展示一下插件核心的代码code实现，大家可以看看参考一下。欢迎交流的。

\`\`\`javascript
// 注意，必须设置了run_at=document_start 此段代码才会生效
document.addEventListener("DOMContentLoaded", function () {});

// 接收来自后台的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("xixi,我进来啦～", request);
  sendResponse("resultResponse：" + JSON.stringify({ response: "response" }));
});
// get error message
// let errordatas = [];
function listeneerror(url) {
  // add listener
  window.addEventListener(
    "error",
    function (e) {
      console.log("==============", e.message);
      var obj = {
        type: "error",
        msg: e.message,
        url: url,
      };
      // errordatas.push(obj);
      // outputobj.errdata = errordatas;
      var data = JSON.stringify(obj);
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          // alert("数据已发送");
          console.log(this.responseText);
        }
      });
      xhr.open(
        "POST",
        "https://xxxxx:8080/smoketest"
      ); 
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(data);
    },
    true
  );
}
let loginfo = [];
// 主动发送消息给后台
// 要演示此功能，请打开控制台主动执行sendMessageToBackground()
function sendMessageToBackground(msg) {
  chrome.runtime.sendMessage({ info: msg }, function (response) {
    alert(response);
  });
}
let outputobj = {};

// outputobj.errarr = [];
// 监听长连接
chrome.runtime.onConnect.addListener(function (port) {
  console.log(port);
  if (port.name == "dosearch") {
    window.scrollTo({ left: 0, top: 3000, behavior: "smooth" });
    $("a").attr("target", "_blank");
    const currentinfo = getcurrentinfo();
    outputobj["currentinfo"] = currentinfo;
    var result = getAllNodes("*"); // get all class element
    var player = getAllplayerNodes("*");
    var outputresult;
    var imgresult = getImageSize(); // get imgs asserts
    outputobj["outputimgresult"] = imgresult;
    if (result.length > 0) {
      //
      var startindex, stopindex;
      if (result.indexOf("mini-upload.van-popover__reference")) {
        console.log("mini-upload.van-popover__reference");
        startindex = result.indexOf("mini-upload.van-popover__reference");
      } else {
        startindex = 0;
      }
      if (result.indexOf("international-footer")) {
        console.log("international-footer");
        stopindex = result.indexOf("international-footer");
      } else {
        stopindex = result.length;
      }
      result = result.slice(startindex, stopindex);
      // judge is exsit common
      if (result.indexOf("common")) {
        console.log("exsit common");
        var commonindex = result.indexOf("common");
        result = result.slice(0, commonindex);
      }

  if (player.length > 0) {
    console.log("存在player");
    outputresult = result.concat(player);
  } else {
    outputresult = result;
  }
  var tmp = new Array();
  // tmp = result; // test all click
  for (var i in outputresult) {
    //该元素在tmp内部不存在才允许追加
    if (tmp.indexOf(outputresult[i]) == -1) {
      tmp.push(outputresult[i]);
    }
  }

  let repeatclickevents = [];
  tmp.forEach((ele, index) => {
    (function (ele, index) {
      // 注意这里是形参
      setTimeout(function () {
        let currentname = $("." + ele)[0].innerText
          ? $("." + ele)[0].innerText
          : "normal";

        let eachlen = $("." + ele).length;
        if (eachlen > 1) {
          // $("." + ele)[1].click();
          let obj = {
            ele: ele,
            len: eachlen,
          };
          repeatclickevents.push(obj);
          let existeobj = {
            event:
              currentname && currentname.length < 10 ? currentname : ele,
            fatherevent: true,
            childlen: eachlen,
          };
          loginfo.push(existeobj);
        } else {
          $("." + ele).click();
          let obj = {
            event:
              currentname && currentname.length < 10 ? currentname : ele,
            fatherevent: false,
            childlen: 1,
          };
          loginfo.push(obj);
        }

        // print log message
        console.log(
          \`执行 \${
            currentname && currentname.length < 10 ? currentname : ele
          } 点击事件\`
        );
      }, 1000 * (index + 1)); // 还是每秒执行一次，不是累加的
    })(ele, index); // 注意这里是实参，这里把要用的参数传进去
  });
  // do more actions

  var startlen = tmp.length;
  var totalmeassagelen;
  (function (len) {
    setTimeout(function () {
      console.log("repeatclickevents: ", repeatclickevents);
      var lastlen = 0;
      repeatclickevents.forEach((elelenadd) => {
        lastlen += elelenadd.len;
      });
      totalmeassagelen = lastlen + len;
      // console.log("lastlen: ", lastlen);
      // console.log("len: ", len);
      // console.log("totalmeassagelen: ", totalmeassagelen);
      outputobj.totallength = totalmeassagelen;
      repeatclickevents.forEach((eles, indexs) => {
        // console.log(\`\${indexs}is indexs: \`, indexs);
        (function (eles, indexs) {
          setTimeout(function () {
            indexs = indexs + 1;
            var totallen = 0;
            for (var j = 0; j < indexs; j++) {
              totallen += repeatclickevents[j].len;
            }
            // console.log("totallen: ", totallen);
            // let eachloginfo = [];
            for (let i = 0; i < eles.len; i++) {
              (function (i) {
                // 注意这里是形参
                setTimeout(function () {
                  // let currentnames = $("." + eles.ele)[i].innerText;
                  $("." + eles.ele)[i].click();
                  // print log message

                  console.log(\`执行\${eles.ele}第\${i}个元素,点击事件\`);
                }, 1000 * (i + totallen + 1)); // 还是每秒执行一次，不是累加的
              })(i); // 注意这里是实参，这里把要用的参数传进去
            }
          }, 1000 * (indexs + 1));
        })(eles, indexs); // 注意这里是实参，这里把要用的参数传进去
      });
      (function (len) {
        setTimeout(function () {
          // console.log("loginfo: ", loginfo);
          outputobj.loginfo = loginfo;
          // sendMessageToBackground(outputobj);
          // listeneerror();
          // sent data to api ==========
          var data = JSON.stringify(outputobj);
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
              alert(
                "数据已发送，查看日志报告： http://xxxxx.co/#/Smoke"
              );
              console.log(this.responseText);
            }
          });
          xhr.open(
            "POST",
            "https://xxxxx:88080/smoketest"
          ); //
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(data);
        }, 1000 * (len + 5)); // len s 后执行
      })(totalmeassagelen); // 注意这里是实参，这里把要用的参数传进去
    }, 1000 * (len + 5)); // len s 后执行
  })(startlen); // 注意这里是实参，这里把要用的参数传进去
} else {
  sendMessageToBackground("抱歉，没有article 关键字～，请联系 IMT ");
}
// console.log("收集错误");
listeneerror(currentinfo.url);
//
  }
  // alert(JSON.stringify(result));
});

function getAllNodes(d) {
  //判断下参数
  d === "*" && (d = document.getElementsByTagName("body"));
  //用arguments[1] 初始化一个空数组
  !arguments[1] && (arguments[1] = []);
  for (var i = 0, l = d.length; i < l; i++) {
    //nodeType === 1 时 push
    if (d[i].nodeType === 1) {
      if (d[i].className.length > 0) {
        var classname = d[i].className.replaceAll(" ", ".");
        arguments[1].push(classname);
      }
      //   d[i].nameaa = d[i].className;
    }
    //有子节点 arguments[1]作为参数继续调用 arguments.callee 可以调用自身 匿名函数常用
    if (d[i].hasChildNodes()) {
      arguments.callee(d[i].childNodes, arguments[1]);
    }
  }
  //把arguments[1] return出来
  return arguments[1];
}

function getAllplayerNodes(d) {
  //判断下参数
  d === "*" &&
    (d = document.getElementsByClassName("bilibili-player-video-wrap"));
  //用arguments[1] 初始化一个空数组
  !arguments[1] && (arguments[1] = []);
  for (var i = 0, l = d.length; i < l; i++) {
    //nodeType === 1 时 push
    if (d[i].nodeType === 1) {
      if (d[i].className.length > 0) {
        var classname = d[i].className.replaceAll(" ", ".");
        arguments[1].push(classname);
      }
      //   d[i].nameaa = d[i].className;
    }
    //有子节点 arguments[1]作为参数继续调用 arguments.callee 可以调用自身 匿名函数常用
    if (d[i].hasChildNodes()) {
      arguments.callee(d[i].childNodes, arguments[1]);
    }
  }
  //把arguments[1] return出来
  return arguments[1];
}
// get img size
// transferSize 表示资源传输总大小，包含header
// encodedBodySize 表示压缩之后的body大小
// decodedBodySize 表示解压之后的body大小
function getImageSize() {
  const getEntries = window.performance.getEntries();
  const imgR = getEntries.filter((ele) => ele.initiatorType === "img");
  let newarr = [];
  imgR.forEach((ele) => {
    $("<img />")
      .attr("src", ele.name)
      .on("load", function () {
        //这里使用的jquery新建一个img对象进行添加attr属性,把src添加上去,然后进行载入事件
        var imgw = this.width; //这里的width和height就是图片实际的宽高了
        var imgh = this.height;
        let splitnames = ele.name.split(".");
        let type = splitnames[splitnames.length - 1];
        const newobj = {
          name: ele.name,
          type: type,
          transferSize: ele.transferSize,
          encodedBodySize: ele.encodedBodySize,
          decodedBodySize: ele.decodedBodySize,
          width: imgw,
          height: imgh,
        };
        newarr.push(newobj);
      });
  });
  return newarr;
}

// server do

function getcurrentinfo() {
  var name = document.title;
  var url = document.location.hostname + document.location.pathname;
  const obj = {
    url: url,
    name: name,
  };
  return obj;
}

\`\`\`

# 总结&思考

其实做任何工具都是为了偷懒。emmm，一劳永逸。但是现在做什么，都需要考虑有没有收益，有没有价值。当然这个也毋庸置疑的，毕竟要有实际的成果。

在这之上，也要自我驱动啊，如果什么都是为了业务需要而去code，那么code会越来越没有激情以及兴趣。所以，要是有什么想法，就去做吧，自己喜欢就很好。

嘻嘻，希望这个工具的思路可以给大家带来一些想法和帮助。如果有需要，欢迎私我拿一整套源码。要是有code上的交流，评论区也可留言。

# 美句分享

我提起笔来，字字句句斟酌又斟酌，可下笔又不知所言从何而起，书信是真的想写。想你也是真真切切，窗前的虹月变成落月，我一字未落，却在心头。念你许久。

今天分享就到这啦。拜拜咯～
`,
};

export default post;
