import type { Post } from "../types";

const post: Post = {
  slug: "vue-mixins-and-slots",
  title: "Vue详解 mixins & slots",
  date: "2021年6月18日",
  excerpt: "讲一讲Vue中mixins混入和slots插槽的使用场景、核心概念和实践技巧。",
  content: `
好久没写文章了，鸽了时间有点久~ 那么最近在忙啥呢？嘿嘿，我先不说。

今天给大家开一个新坑，讲一讲跟Vue相关的知识点。此坑不深，纯属入门~

## 什么是 mixins

讲之前呢，先看下官方解释：“混合”。晦涩难懂。什么是混合？混合啥？一头雾水。

既然这玩意说的深奥，那就练练呗，看看这个混合到底是个啥。

这里卖个关子，先不说，这个东西到底是什么。看完咋直接来一个轻描淡写的总结。

话不多说，走起~

**先来看个栗子：**（这个栗子的前提，是你在知道 vue 的组件实现的前提下。不过不了解，也没关系。影响也不是很大，后面再补吧）

\`\`\`js
\`\`\` vue 组件 

    Vue.component('tishi',{
        template \`
            <div>
            <div @mouseenter = 'func1' @mouseleave = 'fnc2'>提示</div>
            <div v-if='flag'>
            我是一个hover的小可爱~
            </div>
            </div>
        \`,
        data : function(){
                return {
                    flag:false
                }
        },
        methods : {
            func1(){
                this.flag = true
            },
            func2(){
                this.flag = false
            },
        }
    
    })
    
    Vue.component('toogle',{
        template \`
            <div>
            <button @click='func3'>显示/隐藏</button>
            <div @click='fnc4'>关闭</div>
            <div v-if='flag'>
            我是一个可显示可隐藏的小可爱~
            </div>
            </div>
        \`,
        data : function(){
            return {
                flag:false
            }
        },
        methods : {
            func3(){
                this.flag = !this.flag
            },
            fnc4(){
                this.flag = false
            }
        }
    })
    
    new Vue({
        el:'#app',
        data:{
        
        }
    })

\`\`\`

要是知道组件的同学，肯定能看出来，这边是分别实现了两个组件，一个对外组件是：**<tishi></tishi>**，另一个是 **<toogle></toogle>** 。

先来解释一下，这两个是分别干嘛的，第一个 tishi 就是说，你的鼠标事件进出的时候，会触发不同的时间，来控制hover小可爱的展示与否，那么第二个，就是点击来隐藏 可显可隐的小可爱。

那么这两个组件有没有什么共同点呢？聪明的同学可能已经看到了

这两个对外的组件，都分别有自己的属性：**flag**，以及一个 **hide** 方法，不是吗。这... 对于程序员来讲，是无法忍受的。同样一个方法，要写两遍，简直头都大了。

这个时候，就会潜意识的想到，怎么能够偷懒呢？

好了，当你想到这个问题的时候，重点就来了，这就是mixins了。来看下怎么用

**栗子改一改，加上 mixins：**

\`\`\`js
\`\`\` vue 组件 

    const common ={
        data : function(){
                return {
                    flag:false
                }
        },
        methods : {
            func1(){
                this.flag = true
            },
            func2(){
                this.flag = false
            },
            func3(){
                this.flag = !this.flag
            },
        }
    }

    Vue.component('tishi',{
        template \`
            <div>
            <div @mouseenter = 'func1' @mouseleave = 'fnc2'>提示</div>
            <div v-if='flag'>
            我是一个hover的小可爱~
            </div>
            </div>
        \`,
        mixins:[common]
    
    })
    
    Vue.component('toogle',{
        template \`
            <div>
            <button @click='func3'>显示/隐藏</button>
            <div @click='fnc2'>关闭</div>
            <div v-if='flag'>
            我是一个可显示可隐藏的小可爱~
            </div>
            </div>
        \`,
        mixins:[common]
    })
    
    new Vue({
        el:'#app',
        data:{
        
        }
    })

\`\`\`

改好了，大家看看有什么区别。

是不是一眼就能看出来了，我们就是吧这两个组件用到的共同的属性，方法，都提取出来，放到了一个对象下面。然后在各自的组件中引入就可以了，**mixins:[common]** 。接着就是只要把 fnc4 改成 fnc2 就行了啊，方法是一模一样啊。

简直快乐。这样，就算后面还有其他组件需要创建一些共同属性也好，方法也好。都只要在common 中去实现，组件中调用就可以了啊，方便，程序看起来也很舒服。

而这边的mixins 在组件中，会通当前所调用的组件进行合并。就是说，你那个组件中引入，那么data以及methods就直接被 引入的组件来实例使用。

当然，这里小伙伴可能会问，要是我在组件中，需要自定义其他的一些属性或者方法怎么办？

简单！就直接在你想加入自定义的组件中，去写自己的data，或者 mothods 就好了。这个时候，就算引入了 mixins 也会被当前自身的覆盖。优先级权重，组件本身是大于common的。

好了，说完了，这个时候，就可以回到开始卖的关子了：到底什么是混合？相信大家已经有自己的答案了。其实这个混合就是：多组件中，重复方法，或者重复属性的 一个 **容器** 罢了。容器这个词，大家要区别学术上所谓的容器哦~

好啦，mixins，讲完，我们接着看 slots

## 什么是 slots

老规矩，依然看一下，官方定义： 插槽。emmm。是不是又懵了，什么玩意啊，刚来个混合，现在又来个插槽？这明显是搞事情啊。

哈哈哈，别急，刚刚混合，都被搞明白是怎么回事了，还怕这一个插槽吗？

再走一个。咱就不信邪不是。

**依然是 举个栗子**（ 展示一下组件的另一种写法，详细的要去看组件那块咯，要是有需求，评论留言，我就开新坑 ）

\`\`\`js
\`\`\` vue 组件 
// page

   <div id='app'>
       <card></card>
   </div>
   
   ---------------------------------------------------------
   
// js

   <template id='zujian'>
       <div>
           <div>title</div>
           <div>content</div>
           <div>desc</div>
       </div>
   </template>
    
    Vue.component('card',{
        template : '#zujian'
    })
    
    new Vue({
        el:'#app',
        data:{
        
        }
    })

\`\`\`

好了，这个组件已经写完了，有部分同学，可能看不懂写的是什么，其实这边想表达的是一个卡片组件。

那么我这个写的是个啥玩意？emmm，就是卡片组件啊。那就讲讲，写这个的目的，就比方说，在之后的开发过程中，可能需要用到一套卡片组件，那么是不是就可以 同以上的方法一样，去写一个了。

那么如果在一个项目中，需要用到多个卡片，并且需要内容文本，不能够一直是：title，content，desc，那同学们想想，是去再写一个组件引入，还是怎么做？

那我们就给这个组件改改吗。

**栗子 改一改 1.0**

\`\`\`js
\`\`\` vue 组件 
// page

   <div id='app'>
       <card>666啊</card>
   </div>
   
   ---------------------------------------------------------
   
// js

   <template id='zujian'>
       <div>
           <div>title</div>
           <div><slot></slot></div>
           <div>desc</div>
       </div>
   </template>
    
    Vue.component('card',{
        template : '#zujian'
    })
    
    new Vue({
        el:'#app',
        data:{
        
        }
    })

\`\`\`

改完了，这个时候，会发生什么？同学们猜一猜。哈哈哈，是不是很明显了，这个就变成动态的了啊。

在没改之前，我们引入 card 组件，永远都只能是 **title，content，desc**，现在我们可以动弹了啊。我们可以在引用card的时候，就去制定内容，来替换content啊。

这多么完美的解决了动态引入卡片组件不能定制化的问题。

那这样就可以了吗？这也只能改一个啊。我要是想改多个怎么办？嘤嘤嘤。

不信邪，再来

**栗子 改一改 2.0**

\`\`\`js
\`\`\` vue 组件 
// page

   <div id='app'>
       <card>
           <div slot = 'title'>嗨呀，我是头啊<div>
           <div slot = 'content'>嗨呀，我是身体啊<div>
           <div slot = 'desc'>嗨呀，我是描述啊<div>
       </card>
   </div>
   
   ---------------------------------------------------------
   
// js

   <template id='zujian'>
       <div>
           <div><slot name='title'></slot></div>
           <div><slot name='content'></slot></div>
           <div><slot name='desc'></slot></div>
       </div>
   </template>
    
    Vue.component('card',{
        template : '#zujian'
    })
    
    new Vue({
        el:'#app',
        data:{
        
        }
    })

\`\`\`

这个时候，会发生什么。大胆一点，说出你们的答案。

是不是，我只要定义一个卡片组件，就可以引入多需求啊，不管业务方说要我引入多少，我都照做。这还不简单吗？

slot 说到这，相信大家肯定也已经知道这是干嘛用的了。这个定义是插槽，怪叫人难受的。但是通过这个例子，大家肯定知道这个是干嘛用的，总结的话，都在评论下面，大胆发挥。

## 最终总结

说完以上两点，其实只是通过简单的组件引用，来描述这两个功能可以怎么用，并且是干嘛的。但其实，这两个怎么在项目中，合适的使用，用的恰到好处，其实，还是看各位小伙伴 去结合本身业务需求了。

## 写在最后

本来这一节准备顺带聊聊 vuex 和 vue-router，但是感觉，这两个好像都各自需要一个篇幅去讲解。后面有时间再去开新坑，给大家聊一聊这两个。

还有，最近我在忙啥，哈哈哈哈，学习剪视频去了，准备转型做个阿婆主了~，一键三连~

好了，今天差不都就讲完了，要是觉得不错就点个赞吧。拜拜~
`,
};

export default post;
