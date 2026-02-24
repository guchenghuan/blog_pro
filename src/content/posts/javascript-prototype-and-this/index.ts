import type { Post } from "../types";

const post: Post = {
  slug: "javascript-prototype-and-this",
  title: '看完这篇"原型"&"this"，就两字"通透了"',
  date: "2021年1月25日",
  excerpt: '深入浅出地讲解JavaScript中最"别扭"的两个概念：原型链和this指向。',
  content: `
# 主题

今天想跟大家分享一个比较 "别扭" 的概念： **“原型 & this”** 。

想把这玩意儿给说清楚，大多都会感到头大。用的时候也会遇到些尴尬的场景。就很难去整明白，这到底是个啥。

这一期，就试着将这 说个清楚，讲个明白。开始~

# 原型

什么是 **原型** ？带着这个问题往下看。

## 原型-构造器 （constructor）

首先说到原型，那就跟对象密不可分。如果我们需要创建一个对象，就需要区定义一个object。那我们在开发中如何去创建一个对象？肯定有人会说，就是var 一个对象呗。很好你说的很对~ 确实是var 一个对象，那我如果需要两个呢？ 这个时候又会说了，那就var两个呗。很好，你又说对了~

以下是创建对象的方法。

\`code 创建对象\`

\`\`\`css
var zhangsan = {
	name:'张三'，
   	age:20
}

var lisi = {
	name:'李四'，
   	age:22
}

\`\`\`

那如果我们需要创建100个对象呢？程序员这么懒，不会去实打实的真的给你去 var 100个对象。当然如果真去这样做了，里面的变量也是未知的。何况如果是一个动态创建的，也不能去给代码写死不是。

好了，那这个时候，聪明的同学就已经想到了，搞一个 function 函数呗。专门生成对象，不就完事拉！

\`code 创建对象\`

\`\`\`ini
function User(name, age) {
    var person = {} // 定义一个person 对象
    person.name = name; // 往对象中绑定传参
    person.age = age;
    return person // 返回生成的新对象
}

var zhangsan = User('张三', 20);
var lisi = User('李四', 22);

\`\`\`

以上的函数，就会生成你想要的任何对象，也称之为：*工厂函数* ！一个专门造对象的工厂函数。

好了，那么这样做就可以了吗？是不是发现了什么？

对拉，js中，本身就有一种生产对象的方式啊，并且更简单，不需要再函数中定义一个对象。只需要绑定 this 就可以了。

\`code 创建对象\`

\`\`\`ini
function User(name, age) {
  this.name = name; // 这里面的this，就代表了即将生成的那个对象 ，并且绑定传参
  this.age = age;
}

var zhangsan = new User('张三', 20);
var lisi = new User('李四', 22);

\`\`\`

这个时候，细心的同学已经发现了不同之处。两个都是生成对象的函数，但是叫法就有些不同了。如果是用第二种 js 本身的函数，我们就需要用 new 关键字来生成对象。

\`code 差异\`

\`\`\`ini
var zhangsan =  User('张三', 20); //  第一种
var zhangsan = new User('张三', 20); //  第二种

\`\`\`

而这种需要用 new 关键字来叫的函数，称之为：**“构造器 constructor or 构造函数”**。

而生成对象的这个过程，称之为：**实例化**。*“zhangsan”* 可以称之为一个**对象**，也可以称之为一个 **实例**。

## 原型-proto & prototype

好了，上一段说了构造器，那么构造器是干嘛的？就是造对象的一个函数呀。

那这一段，来说说原型中的重头戏。先看一段代码：

\`code 创建对象 在对象中添加一个功能属性，可以引用自己的属性 "greet" \`

\`\`\`javascript
function User(name, age) {
  this.name = name; // 这里面的this，就代表了即将生成的那个对象 ，并且绑定传参
  this.age = age;
  this.greet = function () {
    console.log('你好, 我是' + this.name + '，我' + this.age + '岁');
  }
}

var zhangsan = new User('张三', 20);
var lisi = new User('李四', 22);

zhangsan.greet() // 你好我是张三，我20岁
lisi.greet() // 你好我是李四，我22岁

\`\`\`

这个时候，用生成的对象来叫一下 **greet** 这个方法，一点毛病没有。但是有没有同学发现什么问题？细心的同学已经发现了，这两个都分别实例了greet ！

是不是有的同学有点没理解这句话的意思？没关系，接着看：

\`code 实例化后引用 greet 差异对比 \`

\`\`\`ini
zhangsan.greet === lisi.greet  // false

\`\`\`

同学们，看到了什么？what? 这两个竟然不一样？

这意味着什么呢？也就是说 张三 和 李四，实例化之后，都在自己的内部，创造了 greet 这样的属性。

这个时候，greet 的功能都是一模一样的呀。如果实例100个对象，岂不是要拷100份？完全没必要呀。有没有什么方法将这些通用的属性，放到一个地方呢？

有的。接下来就要说到本段的重头戏之一：**prototype** 了。在讲之前，先看下面一段代码：

\`code 创建对象 自带 prototype \`

\`\`\`javascript
function test1 () {}
console.log( test1.prototype ) // { constructor : f }

function test2 () {}
console.log( test2.prototype ) // { constructor : f }

\`\`\`

发现了什么？是不是每创建一个function，都会自带一个 **prototype**  这样的对象啊。这就是js 的原生机制。那为什么 js 的原生机制 要这么做呢？划重点：*prototype 就是给他即将生成的对象，继承下去的属性* 看到了什么？ **prototype**  他是一个属性，是一个可供实例对象继承下去的属性。这不简单了吗。走一个。

\`code 创建对象 在对象中添加一个功能属性，可以引用自己的属性 "greet" \`

\`\`\`javascript
function User(name, age) {
  this.name = name; // 这里面的this，就代表了即将生成的那个对象 ，并且绑定传参
  this.age = age;
}
User.prototype.greet = function () {
  console.log('你好, 我是' + this.name + '，我' + this.age + '岁');
}

var zhangsan = new User('张三', 20);
var lisi = new User('李四', 22);

zhangsan.greet() === lisi.greet()  // true

\`\`\`

既然知道了在构造函数中，使用 **prototype**  这样的继承对象，可以将  **通用** 的属性给 实例化的对象继承下去。

那么说到这，是不是会有几个问题？这个greet 并不是定义在实例化的对象里面的啊，来看一段代码：

\`code prototype  \`

\`\`\`javascript
function User(name, age) {
  this.name = name; // 这里面的this，就代表了即将生成的那个对象 ，并且绑定传参
  this.age = age;
}
User.prototype.greet = function () {
  console.log('你好, 我是' + this.name + '，我' + this.age + '岁');
}
var lisi = new User('李四', 22);
console.log(lisi);
  /*
  User {}
  name:'李四'
  age = 22
  __proto__
  greet:f()
  constructor : f User (name, age)
  __proto__:Object
  ...
  */          

\`\`\`

看到了什么？是不是通过 **prototype** 定义的*greet = function ()* 属性跑到了 **proto** 下面去了。并且，这个greet属性虽然没有在自己本身的对象下面，但是一样可以使用啊！我们上面说到过：**prototype** 是继承属性对象。那么看到这里的小伙伴，是不是会困惑，为什么继承属性会定义在 **proto** 下面？先别急。接着看！

这个时候已经看到了重头戏之二：**proto**。再来看一段代码：

\`code __proto__ \`

\`\`\`ini
function Test () {}
Test.prototype.name = 'test'
var test01 = new Test()
var test02 = new Test()
test01.__proto__ === test02.__proto__    // true
// ----------------------- 实例之后的对象调用__proto__指针指向的 等于被实例的构造函数的prototype！
// test01.__proto__ = Test.prototype  // true

\`\`\`

这时候，是不是已经恍然大悟了！原来通过**prototype** 定义的属性，再被多个实例化之后，引用的地址是同一个！并且 **proto** 就是我们上面使用的**prototype** 属性的马甲啊！就是说，我们在构造函数中使用**prototype** 定义的属性，都会被 **proto** 指针引用！

好了，这个时候，可以整一段比较晦涩的总结了： *每个对象都有一个 proto 的属性，指向该对象的原型。 实例后通过对  proto 属性的访问 去对  prototype对象进行访问； 原型链是由原型对象组成的，每个对象都有__proto__属性，指向创建该对象的构造函数的原型 ，然后通过__proto__属性将对象链接起来，组成一个原型链，用来实现继承和共享属性！*

理清楚以上关系后，可以想一下 通过**prototype** 定义的属性作用就仅仅如此么？接着看一段代码：

\`code prototype \`

\`\`\`javascript
function Test () {}
Test.prototype.name = 'test'
var test01 = new Test()
console.log( test01.name ) // "test"
Test.prototype.name = 'no test '
console.log( test01.name ) // "no test"

\`\`\`

看到了什么？原来 **prototype** 可以在实例之后，再进行更改呀！

就是说，通过构造函数去改变name 的值，实例化之后的对象，引用的属性值也会跟着变。太强大了！

再来看看 **constructor** ：

\`code constructor  \`

\`\`\`javascript
function User(name, age) {
  this.name = name; // 这里面的this，就代表了即将生成的那个对象 ，并且绑定传参
  this.age = age;
}
User.prototype.greet = function () {
  console.log('你好, 我是' + this.name + '，我' + this.age + '岁');
}
var lisi = new User('李四', 22);

// 再次构造
var zhangsan = new lisi.constructor('张三', 20) // 使用constructor来实例化！！！
new lisi.constructor() === new User()  // true
console.log(zhangsan)
/*
  User {}
  name:'张三'
  age = 20
  __proto__
  greet:f()
  constructor : f User (name, age)
  __proto__:Object
  ...
  */  

\`\`\`

发现了吗？就算我只能知道实例后的对象，但是我可以通过 **proto**  去找到这个实例对象的构造函数 **constructor** ，我再通过这个构造函数再去实例对象。（**var zhangsan = new lisi.constructor('张三', 20)**）与我直接**var zhangsan = new User('张三', 20)**。完全一样。真的很强大！

好了，讲到这，**proto** **& prototype** 也就说完了，接下来再说说 **原生对象的原型**。

## 原型-原生对象的原型

前面，知道了原型的概念，那就趁热打铁，接着看看原生对象的原型。

先看一段代码：

\`code 原生对象  \`

\`\`\`css
  var a ={}
  console.log(a)
  /*
    {}
    __proto__
    greet:f()
    constructor : f Object()
    ...
    */  

\`\`\`

可以看到，我们var 了一个新对象之后，没有定义任何属性，但是也能看到他的构造函数：Object()。也就是说：**var a ={} === var a = new Object()**，两者没有任何区别。举个例子：

\`code 原生对象  \`

\`\`\`css
  var a ={}
  var b = new Object()
  console.log(a.constructor === b.constructor ) // true

\`\`\`

可以看到，构造函数完全一样。

那么这个时候，可能会有同学想问，怎么去创造一个干净的对象呢？里面没有任何集成的属性等。

当然也是可以的。接着看：

\`code 原生对象  \`

\`\`\`javascript
  var a = new Object.create(null) // 创建函数必须传参，一个对象或者是 null ，否则会报错！
  console.log( a )
  /*
    no prototies 
    */  

\`\`\`

可以看到，通过 **Object.create()** 创建的对象，属性为空。这个时候，肯定会有同学有疑问，你这传的参数是 null，那当然什么都没有了，你传个对象试试。哈哈哈，确实，如果传对象的话，那就是定义自己所自带的原型了。举个例子：

\`code 原生对象  \`

\`\`\`css
  var a = new Object.create({name:juejin,des:"666"}) // 创建函数必须传参，一个对象或者是 null ，否则会报错！
  console.log( a )
  /*
    {}
    __proto__
    name:juejin
    des:"666"
      __proto__
      constructor : f Object()
      ...
    */   

\`\`\`

可以看到，再**Object.create()** 中传入对象的属性，是放在第一层的 **proto** 下面的，也就是中，这是你创建的这个原型对象的继承属性，意味着，可以根据自身的业务需求，来定义自己的原型对象！

## 多级继承链

好了，上面已经详细的讲解了原型链，构造函数，那么就试着来实现一个继承链。看下面代码：

\`code 继承链 从祖父 到爷爷 到爸爸 到自己 \`

\`\`\`javascript
// Animal --> Mammal --> Person --> me
// Animal 
function Animal(color, weight) {
  this.color = color;
  this.weight = weight;
}
Animal.prototype.eat = function () {
  console.log('吃饭');
}

Animal.prototype.sleep = function () {
  console.log('睡觉');
}
 //  Mammal
function Mammal(color, weight) {
  Animal.call(this, color, weight); //绑定 this 这个下面讲
}

Mammal.prototype = Object.create(Animal.prototype);
Mammal.prototype.constructor = Mammal;
Mammal.prototype.suckle = function () {
  console.log('喝牛奶');
}
//  Person
function Person(color, weight) {
  Mammal.call(this, color, weight);
}

Person.prototype = Object.create(Mammal.prototype);
Person.prototype.constructor = Person;
Person.prototype.lie = function () {
  console.log('你是个骗子');
}
// 实例
var zhangsan = new Person('brown', 100);
var lisi = new Person('brown', 80);
console.log('zhangsan:', zhangsan);
console.log('lisi:', lisi);  
    

\`\`\`

上面的代码中，实现了三级继承。其中，使用了我们上面讲到的 **prototype** 以及 **Object.create()** 。

\`code \`

\`\`\`ini
function Animal(color, weight) {
  this.color = color;
  this.weight = weight;
}
Animal.prototype.eat = function () {
  console.log('吃饭');
}

\`\`\`

往祖父类中写入继承属性，eat 供爷爷辈来继承这个吃的属性。

\`code \`

\`\`\`javascript
//  Mammal
  function Mammal(color, weight) {
    Animal.call(this, color, weight); //绑定 this 这个下面讲
  }
Mammal.prototype = Object.create(Animal.prototype);
Mammal.prototype.constructor = Mammal;
Mammal.prototype.suckle = function () {
  console.log('喝牛奶');
}

\`\`\`

同时，爷爷辈的属性，需要继承祖父辈的其他属性，因为上面有讲到： **prototype**  是继承属性，也可以称之为隐性属性。那么 **color, weight** 这些显性属性怎么给他继承过来呢？

这个时候就用上了上面的 **Mammal.prototype = Object.create(Animal.prototype);** 这就是利用 **Object.create()** 来将祖父的其他显性属性，全部继承到爷爷辈。并且再写进爷爷辈的 **prototype**  中，方便再往下给爸爸继承。

这样一级一级的绑定，构建，就实现了所谓的 **多级继承** 了。

当然细心的同学又发现了一个点：

\`code  \`

\`\`\`javascript
 //  Mammal
function Mammal(color, weight) {
  Animal.call(this, color, weight); //绑定 this 
}

\`\`\`

为什么这边的爷爷辈的构造器里面为什么要 **call  this 呢？** ，这边就先卖个关子，下面this那段会讲到！嘿嘿~

## 原型总结

好了，讲了这么多，终于说完了原型链。其实一图胜千言。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bfb2cc85f5de4e7188d173e7ce17c4f5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

引用上面的一句话：*每个对象都有一个 proto 的属性，指向该对象的原型。 实例后通过对  proto 属性的访问 去对  prototype对象进行访问； 原型链是由原型对象组成的，每个对象都有__proto__属性，指向创建该对象的构造函数的原型 ，然后通过__proto__属性将对象链接起来，组成一个原型链，用来实现继承和共享属性！*

说到这，原型链也就说完了，接下来再啃一块硬骨头：**this**。

# this

其实说到 **this**，大家都有这样的一个感觉，就是一看就会，一用就乱。那么这个**this** 到底是个啥？能不能给它整明白？别急，

先来看一段代码：

\`code  \`

\`\`\`javascript
var User = {
	fname:'三'，
    	lname:'张'，
    	fullname:function(){
    		return User.lname + User.fname
    	}
  }
	console.log(User.fullname) // "张三"

\`\`\`

这段代码是去获取 **User** 对象下的全名，可以看到是没什么问题。那么这个时候，需要给这个对象换成**person**对象，会发生什么呢？

\`code  \`

\`\`\`javascript
var Person = {
	fname:'三'，
    	lname:'张'，
    	fullname:function(){
    		return User.lname + User.fname
    	}
  }
	console.log(Person.fullname) // User is not defined

\`\`\`

看到了什么，找不到这个 **User**,这是为什么呢？很明显，是因为我们再**return** 中，返回的还是 **User** 这个对象，但是这个时候，我已经将原来的 **User** 改成 **Person** 了。所以，如果这段代码想生效，必须也要将 **return** 中的 **User** 对象 改成 **Person** 对象。

麻不麻烦？可重用性也太低了。那么这个时候，this 就派上用场了。接着看：

\`code  \`

\`\`\`javascript
var Person = {
	fname:'三'，
    	lname:'张'，
    	fullname:function(){
    		return this.lname + this.fname
    	}
  }
	console.log(Person.fullname) // "张三"

\`\`\`

这时候，就能看到，我对象名改成了**Person**，是一样可以拿到这个对象下的 **fullname**。

是不是有同学会问了，这是为什么？其实这个时候，这里面的**this**，就指向了这个**fullname** 的 **fnc** 外的Person对象了。是不是觉得说的有点干，那我们就来看看：

\`code  \`

\`\`\`kotlin
var Person = {
	fname:'三'，
    	lname:'张'，
    	fullname:function(){
        	console.log(this) // 在哪边引用this，就在哪边看！
    		return this.lname + this.fname
    	}
  }
/*
fname:'三'
lname:'张'
fullname:f()
__proto__
      constructor : f Object()
      ...
*/

\`\`\`

这样看，是不是十分清晰明了。其实也就是说，我在 **fullname** 这个方法中使用的 **this** 就是指向了，我当前这个 **function** 代码块的上一级。

看到这，是不是感觉明白了？再来：

\`code  \`

\`\`\`javascript
var Person = {
	fname:'三'，
    	lname:'张'，
    	fullname:function(){
    		return this.lname + this.fname
    	}
  }
var  getfullname = Person.fullname // 将Person对象中的fullname 方法，给到新定义的参数使用
console.log(getfullname()) // NAN

\`\`\`

这是什么？没拿到 **张三** ？这是为啥？

到这里是不是一下子又懵了？这个 **this** 到底有多少幺蛾子。打印出来看看，这个时候的 **this** 到底是什么：

\`code  \`

\`\`\`javascript
var Person = {
	fname:'三'，
    	lname:'张'，
    	fullname:function(){
        	console.log(this) 
    		return this.lname + this.fname
    	}
  }
var  getfullname = Person.fullname // 将Person对象中的fullname 方法，给到新定义的参数使用
console.log(getfullname()) // window:{},NAN

\`\`\`

看到什么了？这个 **this** 竟然指向了**window**，全局变量。这是咋回事？这就是  **this** 坑的地方，我上面说到： **this** 就是指向了，我当前这个 **function** 代码块的上一级。其实这句话，在这边就直接错了。因为this引用没变。只是我的调用方式变了。

所以这个时候，这句话要重新描述，谨记：*this 并不取决于它所在的位置，而是取决于它所在的function是怎么被调用的！！！*

而上面 **console.log(Person.fullname) // "张三"** 可以打印出结果，就是fullname的这个方法，直接被它的父级调用了，也就是说这个时候的 **this** 是指向的 **Person**。

而如果指定调用这个 **this** 的，并不是直接父级，那么再非严格模式下，指向的就是全局 **window**，而在严格模式下则是 **undefined**。

再来 如果 **this** 再构造函数中被调用，会是怎么样？看下面一段代码 ：

\`code  \`

\`\`\`sql
function User (){
	console.log(this)
}
User () // undefined 
new User () // User {}

\`\`\`

这个时候，可以看到，如果 **this** 是放在构造函数中，被直接调用 **User ()**，那么这个时候的  **this**  就是 **undefined** 。因为 **this** 所在的 **function** 并没有作为一个方法被调用。

而 如果是通过 **new** 的方式被调用的，那么这个时候， **this** 所在的 **function** 就被调用了，并且指向的就是被调用的 **User {}** 。还记得我们上面说的，js 本身的构造函数机制吗？再来复习一下：

\`code 创建对象 " \`

\`\`\`ini
function User(name, age) {
  this.name = name; // 这里面的this，就代表了即将生成的那个对象 ，并且绑定传参
  this.age = age;
}

\`\`\`

就是说：*构造函数中的 this ，就是指向即将实例化的那个对象。谨记！*

所以 总结一下 **this** 的三种场景：

\`\`\`kotlin
1. 如果this 是 在一个函数中，并且被用作方法来叫，那么这个时候的 this 就指向了父级对象;
2. 如果this 是在匿名函数，或者全局环境的函数中，那么这个时候的 this 就是；undefined;
3. 如果this 是在构造函数中，那么这个时候的 this 就指向了即将生成的那个对象

\`\`\`

好了，既然区分了 **this** 的使用场景之后，那么它的强大之处是什么呢？ 举个例子：

\`code 动态绑定 this  \`

\`\`\`ini
function introduction() {
  console.log('你好, 我是' + this.name);
}

var zhangsan = {
  name: '张三',
}

var lisi = {
  name: '李四',
}

zhangsan.introduction = introduction;
lisi.introduction = introduction;

zhangsan.introduction(); //  你好，我是张三
lisi.introduction();  //  你好，我是李四

\`\`\`

上面可以看到，定义了一个方法，这个方法中使用了 **this.name** ，但是这个时候，并不知道，这个方法中的 **this** 到底指向的是谁，而是等待着谁来调用它。回忆一下上面说的那句话： *this 并不取决于它所在的位置，而是取决于它所在的function是怎么被调用的！！！*

而这个时候，定义了 张三 和 李四 两个对象，这两个对象，分别将定义的 **introduction** 赋值到本身的对象下面，也就是说，这个时候， 张三 和 李四 两个对象，都拥有了 **introduction** 这个方法，并且调用了。所以，这个时候的 **function introduction()** 已经拥有了被调用的对象，所以其中的 **this.name** 也就分别指向了这两个对象的中name。

好，以上就是将 **this** 的默认指向讲完了。但是是不是有个问题，还没解决？

那就是我们之前在说 **多级继承** 的时候，有个 **call this** 。这个卖的关子 还没说呢？那接下来就讲讲。关于 **this** 改变它的默认指向，绑定一个我想要绑定的环境，行不行？

### bind & apply & call

好了，这一段，就接着上面的讲，这里会讲到关于 **this** 的三种绑定方法。先来看代码：

\`code 动态绑定 this  \`

\`\`\`javascript
function introduction() {
  console.log('你好, 我是' + this.name);
}
introduction() // 你好, 我是 undefined

\`\`\`

这个结果相信大家不会陌生，因为就是上面讲的第二种情况：**2. 如果this 是在匿名函数，或者全局环境的函数中，那么这个时候的 this 就是；undefined**。

*这里普及一个知识：introduction() === introduction.call() 只是前者是后者的简写！并且call()中的第一个传参可以指定这个函数中的 this 指向谁！*

好了，知道这个知识点，再看下面的代码：

\`code 动态绑定 this  \`

\`\`\`javascript
function introduction() {
  console.log('你好, 我是' + this.name);
}
var zhangsan = {
	name:'张三'
}
introduction.call(zhangsan) // 你好, 我是 张三

\`\`\`

看完是不是一目了然，这个call()里面传的参数，指向了 **zhangsan** 这个对象。那这不就是给这个 **introduction** 方法指定了调用的父级了吗？ **this** 也就指向给调用这个方法的 **zhangsan** 了呀！

说到这是不是就能清楚的知道，这个跟上面 在对象中，来绑定这个方法，来关联父级调用关系，是一样的。一个是对象引用方法，这个就是方法绑定对象呀！

好，再来：

\`code 动态绑定 this  \`

\`\`\`javascript
function introduction(name) {
  console.log('你好,'+ name +' 我是' + this.name);
}
var zhangsan = {
	name:'张三'
}
introduction.call(zhangsan,"李四") // 你好 李四, 我是 张三

\`\`\`

可以看到call() 除了可以指定this指向的对象，还可以传一些其他的参数。

好了，说到这，是不是已经能猜到：**bind & apply** 怎么用拉！

大同小异：

\`code 动态绑定 this  \`

\`\`\`javascript
function introduction(name) {
  console.log('你好,'+ name +' 我是' + this.name);
}
var zhangsan = {
	name:'张三'
}  
introduction.call(zhangsan,"李四")   // 你好 李四, 我是 张三   call
introduction.apply(zhangsan,["李四"])   // 你好 李四, 我是 张三   apply
intro = introduction.bind(zhangsan)
intro("李四")// 你好 李四, 我是 张三   bind

\`\`\`

可以看到，call() 和 apply() 区别就在于，后面的传参的格式是：数组的形式；

而 bind() 则是返回一个绑定新环境的 function，等着被调用。

# 结语

好啦，这期关于 **“原型” & “this”** 的内容就全部说完了，看到这，就两个字：**“透彻”**。

下期再见~
`,
};

export default post;
