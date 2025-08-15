# 懒加载

- 前端体验优化的核心：**精简页面内容**

  - 再多优化，都比不上从根源上精简页面的内容，减少加载的资源。
  - 从根本上为前端工程精简加载资源体积和资源数量的解决方案：**懒加载各类资源**

- **资源懒加载**一般应用于需要加载外部资源的元素，例如`<img>, <video>, <iframe>, <picture>`等

  - 当懒加载目标元素在视口（ViewPort）**外**时，**不加载**对应资源。
  - 目标元素**接近或进入**视口时，**才**触发加载资源。

  - 从而减少页面加载资源的数量，精简加载资源体积，优化用户体验。

## 三种方法

### 监听滚动事件

```javascript
const imgList = document.querySelectorAll("[data-lazyload]");

window.addEventListener("scroll", () => {
  imgList.forEach((img) => {
    if (img.getAttribute("data-loaded")) return;

    const rect = img.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      img.src = img.getAttribute("data-src");
      img.setAttribute("data-loaded", "true");
    }
  });
});

// <img data-lazyload data-src="/example-image.jpg" />
```

- 存在问题
  - 需要添加图片未加载占位符和加载中动画，改善用户等待加载时的视觉和体验
  - 对`scroll`事件添加节流优化，降低触发回调函数的频率，避免影响页面渲染的 FPS
    - 过低的`scroll`事件回调触发频率，会导致懒加载触发不灵敏。
    - 而过高的`scroll`事件回调触发频率，又会因为大量计算，导致 JS 执行耗时太长，阻塞 UI 绘制，产生页面卡顿
    - 判断目标元素是否出现在视口时，还要考虑水平方向上的页面滚动位置

### 浏览器 IntersectionObserver API

用于**监听**元素距离视口（Viewport）位置，当元素进入视口时，触发指定回调函数，从而实现懒加载、无限滚动等功能

```js
// 创建 IntersectionObserver 实例
const observer = new IntersectionObserver((entries) => {
  // 遍历所有观察的元素
  entries.forEach((entry) => {
    // 如果该元素进入了视口，就加载该元素的图片
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

const lazyImages = document.querySelectorAll("img.lazy");

// 开始监听所有需要懒加载的图片元素
lazyImages.forEach((img) => {
  observer.observe(img);
});
```

`IntersectionObserver`，不仅可以监视**元素**和**视口**的重叠关系，还可以在初始化实例时，传入第二个参数`options`：

> - 指定`root`，值为监视目标元素**父元素**的引用，从而监视任意父子元素的重叠关系。但前提是父元素必须是可以滚动的，例如设置了 CSS 样式：`overflow: scroll;`
>
> - 指定`threshold`，传入[0, 1.0]区间内的数据，指定重叠判定的比例。
>
>   - 值为 0 表示子元素有 1 个像素，出现在父元素视口内，就触发回调。
>   - 值为 1 表示子元素全部出现在父元素视口内，才触发回调。
>
> 通过这些细节选项，可以进一步实现无限滚动、判断元素是否可见等复杂逻辑。

### 浏览器原生懒加载方案

使用浏览器原生`loading="lazy"`属性，这个属性目前可以用于`<img>`和`<iframe>`2 类元素

```html
<img loading="lazy" src="/example-image.jpg" /> - 存在问题
```

> 存在问题

- 浏览器兼容性一般
- `loading="lazy"`属性浏览器兼容性如下：

  - Chrome 77 +（2019 年发布）
  - Edge 79 +（2020 年发布）
  - Safari 15.4 +（2022 年发布）
  - Chrome for Android 119+ （2023 年发布）
  - 兼容性详细数据：https://caniuse.com/loading-lazy-attr

  - 可以看出，这一属性目前只能在近 3 年推出的浏览器上使用，在移动端更是到了 2023 年才得以被支持。在生产环境全面使用`loading="lazy"`属性，目前还只能覆盖部分用户。
    s

- 支持的元素太少
