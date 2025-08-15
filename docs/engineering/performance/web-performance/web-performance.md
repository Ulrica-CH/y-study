

#### **网络性能的重要性**✅

- **用户对性能的期望**：理解用户行为和快速加载的需求。
- **性能的好处、SEO 和广告**：性能提升对排名和收入的优势。
- **瀑布图**：分析资源加载过程。
- **DOMContentLoaded 和加载事件的测量**：浏览器关键事件的测量方法。
- **传统指标的问题**：解释传统性能指标的不足之处。

#### **核心网络指标和其他性能指标**✅

- **最大内容绘制 (LCP)**：衡量页面主要内容的加载速度。
- **累计布局偏移 (CLS)**：评估页面视觉稳定性。
- **火焰图**：调试性能问题的工具。
- **下一次绘制的交互时间 (INP)**：测量交互响应速度。
- **首次输入延迟 (FID)**：衡量交互性。
- **首字节时间 (TTFB)**：评估服务器响应速度。
- **首次内容绘制 (FCP)**：首个可见内容的加载时间。

#### **捕获性能指标**✅

- **Performance API**：使用浏览器工具捕获性能数据。
- **Performance Observer**：通过编程方式监控性能指标。
- **性能指标的浏览器支持**：兼容性介绍。

#### **测试与工具**✅

- **性能测试**：评估性能的策略。
- **统计数据**：解析性能数据。
- **Google Lighthouse**：自动化审计工具。
- **性能面板中的结果分析**：使用 Chrome 开发者工具获取洞察。
- **Web Vitals 扩展**：跟踪核心网络指标。
- **Chrome 用户体验报告**：基于真实用户的数据分析。
- **使用 WebPageTest.org**：详细性能分析工具。
- **真实用户监控**：收集实际用户数据。
- **请求指标监控工具**：分析服务器性能的工具。

#### **设定性能目标**

- **网站需要多快？**：确定网站加载速度目标。
- **确定性能目标**：优化基准的设定方法。
- **理解用户需求**：根据用户需求制定目标。

#### **优化首字节时间 (TTFB)**

- **首字节时间基线**：测量当前 TTFB。
- **启用 Gzip 和 Brotli 压缩**：减少传输数据大小。
- **高效协议**：使用 HTTP/2 和 HTTP/3。
- **主机容量和接近度**：服务器策略优化。

#### **优化首次内容绘制 (FCP)**

- **首次内容绘制基线**：确定当前 FCP 性能。
- **消除依赖链**：优化资源依赖关系。
- **预加载资源**：加速关键资源加载。
- **延迟加载资源**：高效利用非关键资源。

#### **优化最大内容绘制 (LCP)**

- **最大内容绘制基线**：测量当前 LCP 表现。
- **延迟加载图片**：减少图片加载时间。
- **提前加载关键资源**：确保重要资源优先加载。
- **图片格式与优化**：使用现代格式并优化图片。
- **缓存与缓存头**：利用浏览器缓存提高性能。

#### **优化 CLS 和 INP**

- **布局大小提示**：减少页面的意外偏移。
- **优化下一次绘制的交互时间**：提升页面交互性能。
- **释放主线程**：高效处理任务。









Web Performance

the speed and efficiency with which a website **loads, renders, and respond**s to interactions from the visitors

## Importance

- User experience

  - a user feels a response is instant at .01 second
  - a user experiences uninterrupted flow at 1 second
  - users break flow and feel frustration at 10 seconds
  - 40% of users abandon a site at 3 seconds
  - 75% of users that experience a slow site will not return

- SEO

  - help search engines understand and rank your content
  - search ranking introduce a new signal that combine core web vitals with existing signals ( you need to be fast to rank well)

- online advertising

  - fewer visitors, fewer buyers
  - (from walmart report) 100ms improvement = up to 1 % incremental revenue

  

## Measuring

### Waterfall charts

- measures time

![image-20250116175727939](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250116175727939.png)

![image-20250116180208112](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250116180208112.png)

不同颜色代表不同的文件

![image-20250116180232567](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250116180232567.png)

### legacy metrics

- DOMContentLoaded: HTML downloaded and deferred scripts have executed

  ![image-20250116180535667](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250116180535667.png) 

```javascript
window.addEventListener("DOMContentLoaded", (evt) => {
	console.log(`DOMContentLoaded at ${evt.timeStamp} ms`)
})
```

​	**DCL（DOMContentLoaded）** 的触发条件是：

​	- **HTML 文档解析完成：** HTML 被解析为 DOM 树。

​	- CSS 解析完成：** 样式表加载完成并解析。

​	- 同步脚本执行完成：** 所有通过 `<script>` 加载的 **同步脚本** 均已执行完毕。

- Load: The HTML and all known resources have been downloaded and rendered, except those that are lazy-loaded

  ![image-20250116181152884](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250116181152884.png)

```javascript
window.addEventListener("load", (evt) => {
	console.log(`Load at ${evt.timeStamp} ms`)
})
```

​	在浏览器中，**Load 事件**会在以下条件满足后触发：

​		- HTML 文档和 DOM 完全加载并解析完成。

​		- 所有外部资源（如图片、CSS、脚本文件等）都已加载完成。

#### Problem of Legacy metrics

![image-20250116181751603](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250116181751603.png)

![image-20250116181810312](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250116181810312.png)

<div id='app'> </div>



### Core Web Vitals

- how fast your site visibly loads 
- how smooth things load
- how quickly users can interact



=> 



- largest contentful paint (LCP)
- cumulative layout shift (CLS)
- interaction to next paint (INP)



#### LCP

**largest** contentful paint

> how fast your site visibly loads the **most important** element

**what is the "largest"**

- <img>

  - Opacity > 0

  - size < 100%

  - low **entropy** images > 0.05 熵

    - what is entropy in this context?

      - the number of bits per visible pixel shown

        假设有个图片3.9MB, 以2800*1200尺寸（3360000像素）显示 每像素大概9.39 byte

        这会被认为是一个LCP image

      - 浏览器中将低熵定义为 **每像素信息量 < 0.05 位**。低熵图片（如模糊占位符或纯色背景图）对用户体验的意义较小，因此它们不会被计入 LCP 的评估中。

    ![image-20250116184758888](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250116184758888.png)

    可以看到这里L的位置特别后，因为有图片。

- video

- css:background-image

- text element 

##### consideration

- stops after first user interaction

  - what if a user click the empty page before content loaded? That would stop LCP

- what is a good score 

  ![image-20250116185205151](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250116185205151.png)



#### CLS

**Cumulative** Layout Shift

> how smooth and **predictably** elements load into the page



how to measure

- ( I ) impact fraction 分数 ( how much the page was impacted by the move)

  - The fraction of the viewport that is impacted by the unstable elements during a layout shift.

- ( D ) distance fraction (how much across the viewport did it move)

  - The distance the unstable elements move, divided by the viewport’s largest dimension (width or height).

    

Layout shift value = I * D

![image-20250117121029393](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250117121029393.png)

impact fraction = 708 / 768 = 0.922 (92%被影响)

![image-20250117121158314](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250117121158314.png)

Layout shift value = 0.922 * 0.234 = 0.215

WORSE in Mobile 

![image-20250117121622551](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250117121622551.png)

cumulative?

- the sum of all layout shifts



consideration

- not including shifts from user action < 500ms

what is a good score?

![image-20250117121952057](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250117121952057.png)



*** Flame Charts *** 

![image-20250118173900843](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250118173900843.png)

```javascript
function task1() {
  task2()
}

function task2() {
  task3()
}

function task3() {
  // do something
}
```

不同颜色代表不同类型的任务

![image-20250118174018003](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250118174018003.png)

![image-20250118174126455](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250118174126455.png

```html
<html>
  <body>
    <script>
    window.addEventListener('load', ()=> {
      var el = document.createElement('div')
      el.innerHTML = "<h1>Hey</h1>"
      document.body.appendChild(el)
    })
    </script>
  </body>
</html>
```

![image-20250118174312609](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250118174312609.png) 

火焰图中，各个任务（如 HTML 解析、脚本执行、事件处理和布局计算）是按顺序依次完成的，因为JS是单线程的。如果其中一个任务占用了很长时间，可能会影响其他任务，比如渲染。



#### INP (interaction to next paint

= how long does it take between an interaction and the next time the browser can paint

= how quickly users can interact

= the overall responsiveness to user interactions



> what is an interaction?
>
> Click, drag, touch, keypress
>
> **But not Scroll** 

 

![image-20250118180339378](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250118180339378.png)

1. Input delay（输入延迟）

   用户触发交互后，浏览器不能立即处理事件，因为主线程可能正被其他任务（如执行 JavaScript 或处理布局）占用。

2. Processing Time（处理时间）

   当主线程空闲后，浏览器开始处理交互事件，包括执行事件监听器中的代码、操作 DOM 等。

3. Presentation Delay（呈现延迟）

   事件处理完成后，浏览器需要重新计算布局（Layout）和绘制（Paint）页面。

INP is measuring every time the user interaction happens and picking out the worst one

> 4ms 42ms 89ms 7ms **243ms** 9ms 12ms 2ms



considerations

- there might not be an interaction
- we don't know the worst until it's over
- heavily influenced by device capability

![image-20250118195339480](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250118195339480.png)



#### FID (first input delay)

2020-2024 (retired and replaced by INP)

> FID only measured the [input delay](https://web.dev/articles/optimize-input-delay#what_is_input_delay) of the *first* interaction on a page. 

 FID 仅衡量网页上*首次*互动的[输入延迟](https://web.dev/articles/optimize-input-delay?hl=zh-cn#what_is_input_delay)。INP 通过观察网页上的*所有*互动（从输入延迟开始，到运行事件处理脚本所需的时间，最后到浏览器绘制下一个帧为止）来改进 FID。



### More Metrics

#### TTFB (time to first byte)

> how quicky your host responds
>
> measures the time between the request for a resource and when the first byte of a response begins to arrive

![image-20250118201928381](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250118201928381.png)

![image-20250118202103016](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250118202103016.png)

![image-20250118202335194](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250118202335194.png)

LCP

#### FCP（First Contentful Paint)

> measures the time from when the user first navigated to the page to when any part of the page's content is rendered on the screen.



![image-20250118202645205](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250118202645205.png)

![image-20250118202727128](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250118202727128.png)

Relationship to LCP

![image-20250118202800217](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250118202800217.png)



LCP CLS TTFB FCP INP

### Capturing Performance Metrics

#### Performance API

`Performance API` 是由 **W3C（World Wide Web Consortium）** 提出的标准，旨在提供一组接口，允许开发者获取网页性能数据。它是现代浏览器的一部分，主要用于测量页面的加载性能、资源加载时间、DOM 操作等关键性能指标。

1. Performance

![image-20250120122354024](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250120122354024.png)

- timeOrigin: 
  - `performance.now()` 返回的是从 `timeOrigin` 开始的时间（单位是毫秒，但具有更高的精度）。
  - `performance.timing` 中的时间戳（如 `navigationStart`、`domContentLoadedEventStart` 等）也是相对于 `timeOrigin` 来计算的。

2. performance.now

```javascript
const firstNow = performance.now()
// This loop is just to simulate slow calculations
for (let i = 0; i < 100000; i++){
  var ii = Math.sqrt(i)
}
const secondNow = performance.now()

const howLongDidOurLoopTake = secondNow - firstNow
```

```javascript
performance.mark('beginSquareRootLoop');
// This loop is just to simulate slow calculations
for (let i = 0; i < 1000000; i++){
  var ii = Math.sqrt(i);
}
performance.mark('endSquareRootLoop');
// Then anywhere in your code you can use

// We create a new entry called measureSquareRootLoop which combines our two marks
performance.measure('measureSquareRootLoop','beginSquareRootLoop', 'endSquareRootLoop');

console.log(performance.getEntriesByName('beginSquareRootLoop'));

console.log(performance.getEntriesByName('measureSquareRootLoop'));
```



3. performance.getEntries()



4. performance.getEntriesByType()

- flame: 提供浏览器在一个事件循环中完成的工作量数据
- resource: 提供页面加载过程中所有资源（如 CSS、JavaScript、图片等）的性能数据。
- mark: 开发者可以设置**自定义标记**，用于标记代码执行的特定时间点。
- Measure:计算两个标记（mark）之间的时间差，帮助开发者测量代码的执行速度。
- Paint: 与页面绘制有关
- longtask： 检测运行时间超过 50ms 的任务



##### Problem with performance API

- performance API需要开发者手动定期调用方法，检查是否有新的性能数据，增加性能开销，且如果调用不及时，可能会错过新增的性能数据
- 浏览器的性能条目（performance entries）有固定的缓冲区大小。当缓冲区满时，旧的数据会被清除
- `performance` 是一个全局对象，所有的性能数据都会存储在这里。如果应用程序的多个模块或第三方库都在使用它，管理和过滤数据会变得复杂，可能会引发冲突



#### Performance Observer

- `PerformanceObserver` 基于事件触发，当有新的性能数据生成时，会自动通知
- 通过监听性能数据的生成，可以确保不会错过任何条目，即使性能缓冲区已经被清空
- 可以监听特定类型的数据（如 `resource`、`mark`、`measure`、`paint` 等开发者无需手动从全局数据中筛选，提高了代码可读性和效率
- 不同组件或模块可以单独创建自己的 `PerformanceObserver`，避免多个模块共享全局数据时的冲突

```javascript
const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach(entry => { 
       console.log(entry) 
    });
});
observer.observe({ type: 'layout-shift', buffered: true });
```

> 演示

#### Browser Support 

![image-20250120131619164](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250120131619164.png)

##### compatibility table

![image-20250120131713434](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250120131713434.png)



### Testing & Tools

#### Testing Methods

（1）

![image-20250121142239343](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250121142239343.png)

测试设备是“中间设备”，仅观察或记录服务器和用户间的交互。

（2）

![image-20250121142251043](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250121142251043.png)

测试设备直接模拟用户，发起和接收请求。



（3）from the real users

![image-20250121142302409](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250121142302409.png)

- 数据流直接从真实用户设备回传给服务器，并通过“报告服务”（Reporting Service）进行数据分析。
- 这种方式收集的是真实用户在实际使用环境中产生的数据（field数据）。前两种是lab data。

![image-20250121142758847](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250121142758847.png) 

Lab Data is **easier**, but field data is more **accurate**

Lab Data is **diagnostic**, Field data is **experience**

*** Making Lab Data Better***

simulation

- mobile vs desktop
- Network conditions
- processing power



#### Statistics

（1）average problems

比如performance的平均分80，有可能是99, 90, 70, 60 

也有可能是基本上所有人都是90或者85，但是有百分之10的人是30

average score hides what the overall picture looks like



(2) Percentiles 百分位

50百分位（p50） = 中位数 

we care about p75, p95 and p99，大量的用户分数是怎么样的，他们的体验如何？

![image-20250121143635449](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250121143635449.png)

![image-20250121143645850](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250121143645850.png)



#### Web Performance Tools

- lighthouse
  - ⚙️ => devtools throttling
- device toolbar
- Network panel
  - Network throttling
- performance panel
  - Waterfall chart
  - flame chart
  - CPU throttling

**core web vital extensions ** 

https://chromewebstore.google.com/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma



**Chrome User Experience Report **(CrUX)

- field data
- logged in chrome users
- top 1M public websites
- anonymous and public
- 28 day rolling average
- stored google Big Query

https://requestmetrics.com/resources/tools/crux/

https://pagespeed.web.dev/analysis/https-youtube-com/tzgwoia1fd?form_factor=mobile

webpagetest.org



#### Real User Monitoring (RUM)

![image-20250122124102030](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250122124102030.png)

Tools

![image-20250122124210815](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250122124210815.png)



Example: Request Metrics

- Real Time Data
- Filtering Views
- User Information
- Waterfall
- Core Web Vital Attribution
- CrUX Integration
- Resource Reports





### Setting Performance Goals

#### How fast should your site be?

- fast is subjective experience
- psychology of waiting
  - people want to start
  - bored waits feel slower
    - 剪映导出期间的广告
  - Anxious waits feel slower
  - Unexplained waits feel slower
    - Why
  - uncertain waits feel slower
    - how long
  - People will wait for value
    - job application (well I have to wait...)
    - Random website ( bye )



#### Determining performance Goals

1. User experience

   - follow your business metrics 

     - session time 
       - 指用户在一次会话（Session）中停留在网站上的总时长。
         一个会话是用户从进入网站开始到离开网站的整个过程。
     - Bounce Time
       - 跳出时间是用户在仅浏览一个页面后就离开网站的时间，也称为“跳出会话的时长”。  

     relate them with the metrics

     ![image-20250122173239365](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250122173239365.png)

     however, correlation !== Causation

     we can learn from it but it's not a golden rule

2. Competitors

   - 有的东西根本没有竞品 用户只能忍受

   - you need to be 20% faster to make users know the difference between you and your competitors. Otherwise nobody car(e)s

   ![image-20250122173524726](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250122173524726.png)

3. SEO PageRank

Google的**PageRank**（网页排名算法）是Google搜索引擎最早使用的核心算法之一，它用来衡量网页的重要性，并据此对搜索结果进行排序。	

虽然现代的Google搜索算法已经融合了更多复杂的因素（例如用户体验、关键词匹配等），PageRank仍然是基础概念之一。

 ![image-20250122173720279](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250122173720279.png)



#### Who are the users?

- device type
- screen size
- operation system
- Browser
- geo



### Improving Performance

#### First things first

focus on the **easiest** fixes for your most **worst** metric from **real user data**

You shouldn't try to do everything. Sometimes it's fast enough



#### Improving TTFB

> how quickly your host responds

![TTFB as part of an HTTP request](https://www.debugbear.com/assets/images/document-request-breakdown-92623f612169e09c6a1b34ef2aac0485.png)

**Capture TTFB**

在 Chrome DevTools 中：

1. 打开 **Network** 标签。
2. 点击第一个文件（通常是 HTML 文档）。
3. 查看 **Timing** 选项卡中 “Waiting (TTFB)” 的具体时间。

或

瀑布图第一个文件的Request Sent and Waiting Time

这些是HTTP Request TTFB



##### Tactics ####

1. ***compress http responses***

> reduce the size of plain text HTML, CSS, JS

Gzip and Brotli

![image-20250124140020131](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250124140020131.png)



**Content Encoding ** 

![image-20250124140709297](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250124140709297.png)

> br: brotli

Accept-Encoding: 客户端告知服务器它支持的压缩编码格式

Content-Encoding: 服务器告知客户端返回的内容使用了 Brotli (`br`) 压缩格式。客户端需要支持 Brotli 格式才能正确解压和呈现资源



举例

> 试用 gzip & brotli

Gzip: 历史悠久（1992年发布）；基于 DEFLATE 算法

Brotli: 由 Google 于 2015 年开发，专为 HTTP 压缩设计。使用一种基于 LZ77 算法改进的技术和更先进的熵编码

![image-20250124151127796](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250124151127796.png)

**对于小文件来说，Brotli 的效率可能不如 gzip**

Brotli 的算法更复杂，它在压缩时需要进行更高计算密度的处理，这对小文件来说显得“得不偿失 ”。例如，压缩一个 1KB 的文件，Brotli 的压缩率提升可能非常有限，但压缩时间却增加了。



http1.0 1.1 2.0 3.0

2. ***Efficient Protocols***

   ![img](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F641bd7c1-f965-4144-99c3-06d733c3be14_3486x2853.png)

   ### **HTTP/1.0**

   - **优点**：
     - HTTP/1.0是第一个正式的HTTP版本。它比较简单，每次请求都需要建立新的连接，适用于比较简单的网页浏览。
     - 它支持基本的请求和响应模式，理解起来不复杂。
   - **局限**：
     - 每次请求都需要重新建立TCP连接，如果你要访问多个网页，浏览器就得为每个请求都建立新的连接，浪费时间和资源。
     - 这种方式会导致“延迟”——即加载多个网页或资源时，加载速度慢。

   ### **HTTP/1.1**

   - **优点**：

     - **持久连接（Keep-Alive）**：你可以通过同一个连接发出多个请求和响应，不必每次都建立新的连接。这就大大减少了建立连接的时间，效率更高。
     - **管道化（Pipelining）**：可以在一个连接上发送多个请求。

     ![Improve throughput and concurrency with HTTP/2 | Vespa Blog](https://blog.vespa.ai/assets/2021-07-01-http2/http2-multiplexing.png)

   - **局限**：

     - 尽管管道化允许多个请求同时发送，但**响应必须按顺序到达**，如果响应顺序出现问题，还是会有阻塞，叫做“队头阻塞”（Head-of-line blocking）。如果第一个请求的响应非常慢，后续的所有请求即使已经发出，仍然需要等到第一个响应完成才能继续处理。这就意味着，管道化并没有彻底解决**队头阻塞**，它仍然受限于顺序的限制。

     - 管道化并没有被广泛使用，许多浏览器并没有完全支持这一特性。

   ### **HTTP/2**

   - **优点**：

     - **多路复用**：HTTP/2使用**多路复用**技术，可以在同一连接上同时**<u>并行</u>**处理多个请求和响应。这些请求和响应分成独立的数据流，彼此之间互不干扰。
       - 多个请求和响应可以同时发送和接收，不会被第一个请求的慢响应影响。每个请求都可以独立完成响应，而不需要按顺序处理。
     - **二进制协议**：HTTP/2将数据分成更小的部分以二进制格式进行传输，比1.1的文本格式更高效。
     - **头部压缩**：HTTP/2对请求和响应的头部进行了压缩，减少了传输的数据量，从而提高了性能。

   - **局限**：

     - **仍然依赖TCP**：虽然解决了很多效率问题，但HTTP/2仍然依赖于TCP协议，而TCP本身的连接建立时间和丢包重传仍然可能会导致延迟问题。

       - TCP是一种可靠的、按序传递的传输协议，它会确保数据按顺序到达。如果某个数据包丢失，TCP会停止传递后续的数据，直到丢失的数据包被成功重传。

       ![Transmission Control Protocol](https://media.geeksforgeeks.org/wp-content/uploads/20230406111816/TCP-1.png)

     - **复杂性**：由于采用二进制协议，虽然它更加高效，但对开发者来说，相比于文本协议（如HTTP/1.1）更难调试。

     - 也有一些旧的代理服务器和防火墙可能不支持HTTP/2，导致它在某些环境下不能正常工作。

   ### **HTTP/3**

   - **优点**：

     - **基于QUIC协议，使用UDP而非TCP**：HTTP/3通过使用UDP协议解决了TCP的延迟问题。QUIC协议支持更快速的连接建立，减少了网络延迟，尤其在丢包时表现更好。

       - **<u>QUIC在UDP之上实现了多路复用，每个流有自己的独立数据包传输，不再共享单一的传输队列。</u>**

         ![User Datagram Protocol](https://media.geeksforgeeks.org/wp-content/uploads/20230406112517/TCP-2.png)

     - **0-RTT连接建立**：这意味着你在访问一个网站时，不需要等待连接建立的过程，速度更快。

     - **更好的拥塞控制和安全性**：QUIC协议比TCP在网络拥塞管理和安全性方面有显著改进。

   - **局限**：

     - **兼容性问题**：由于QUIC使用UDP，而很多旧的网络设备（如防火墙、路由器等）可能不支持UDP流量，因此可能导致连接问题。
     - **普及度较低**：尽管HTTP/3在技术上有很大的优势，但它还在推广阶段，并不是所有的网站和服务都已支持HTTP/3。



3. ***host capacity & proximity***

（1）host capacity

Right-size（精简规模） your host for your workload

增强服务器在高流量下快速处理请求的能力，避免因服务器性能不足导致响应延迟。

- **升级服务器硬件**
- 水平扩展（增加服务器数量）
- 优化后端应用性能
- 优化服务器配置
- ...

(2) proximity 

- **部署离用户更近的服务器**

  - 在用户所在地附近部署边缘节点或数据中心

- **使用内容分发网络（CDN）**：

  - CDN会在全球范围内分布多个节点，将内容缓存到离用户最近的服务器上，这样可以减少数据从源服务器传输的时间。

- **优化DNS解析**：

  使用DNS加速服务（如Cloudflare、阿里云DNS），确保用户的DNS请求能够快速定位到最近的服务器。

  减少跳数（Hops）**：优化网络路由，减少用户到服务器之间的中间网络节点。**

  部署边缘计算**：使用边缘计算服务，将部分计算任务（如动态内容生成）下沉到离用户更近的边缘节点处理。



优化TTFB的总体思路可以概括为：

1. **缩短请求路径**：利用CDN、边缘计算和高性能DNS服务，减少用户到服务器的距离。
2. **提高服务器响应能力**：通过硬件升级、代码优化、缓存机制等方式，加快服务器处理时间。
3. **减少网络延迟**：优化传输协议，减少数据包体积和传输时间。



### Improving FCP

first contenful paint: how fast your site visibly loads SOMETHING

![Google.com 上的 FCP 时间轴](https://web.dev/static/articles/fcp/image/fcp-timeline-googlecom.png?hl=zh-cn)

![image-20250207194513768](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250207194513768.png)

![image-20250207194444209](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250207194444209.png)



#### Tactics

##### 1 Remove Sequence Chains

CSS and Fonts are **Render Blocking**

**核心思想**：
在加载页面时，有些任务必须依次执行，而这种串行执行（顺序链）可能会拖慢关键渲染过程。移除顺序链的目标就是打破这些依赖关系，让尽可能多的任务可以并行执行或延后执行，从而加快页面的初次渲染。

![image-20250208144710802](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250208144710802.png)



##### 2 Preloading Resources

预加载资源就是在浏览器需要渲染之前，提前加载关键资源（例如 CSS、字体、重要图片等）。这确保了当浏览器需要这些资源时，它们已经在缓存中，从而避免了等待加载的延时。





##### 3 Lazy load Resources

懒加载资源的思想是在页面初次加载时，不立即加载所有资源，而是等到用户需要的时候再加载那些非关键、非立即显示的资源。比如页面下方的图片、视频或其他延后展示的内容。

JS is parser blocking

![image-20250208153327803](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250208153327803.png)

![image-20250208153318594](/Users/godfrey.peng/Library/Application Support/typora-user-images/image-20250208153318594.png)

type="module" always deferred



#### Improving the LCP 

