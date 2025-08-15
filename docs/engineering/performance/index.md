# 性能优化

## 浏览器性能优化

> Lighthouse 火焰图 瀑布图 分析网页性能瓶颈

> 查看关键指标 LCP INP TTFB FCP 分析速度和阻塞原因

> 预解析

> CDN

> 模块懒加载

> 资源懒加载

- 针对图片进行监听
  - IntersectionObserver 监听图片是否在视口内
  - 降级策略，window.addEventListener('scroll', () => {}),注意节流
  - vue 项目中配合自定义指令将首页渲染时间，请求资源数减少了 60%

> 图片处理

- 图片压缩

> 字体处理

- 字体压缩，该用 woff2 格式
- 配合寻找汉语字符册配合 fontMin 和 font-spider 进行字体子集化处理

> 资源的压缩与存储

- gzip
- brotli
- 强缓存 expires 和 cache-control
- 协商缓存 last-Modify/if-Modify-Since(基于修改时间，不精确有一定的问题) ,Etag/if-None-Match（基于文件 hash）
- 启发式缓存 （浏览器自动缓存，时间为（last-Modify - Date） * 0.1）

## Webpack 性能优化

> 多线程并行编译

> 拆分模块为动态链接

> 增加编译打包结果缓存

> 开发时候使用 esbuild-loader 快速提高构建效率

> 压缩

> 颗粒度精细分包

> 修改全局导入

> 按需导入 ，懒加载，从 mainjs 抽离到单个组件配合组件懒加载

## Vite 性能优化
