
## 模块化

- 全局 function
- 命名空间 namespace

```javascript
const module = {
  getName: function () {
    console.log("getName");
  },
};
```

- 立即执行函数 IIFE

```javascript
(function (global) {
  global.name = "hello";
})(window);
```

- 上述缺点:不统一,不规范每个人有自己的写法,容易造成不可预期的错误

## 模块化规范

- CommonJs
  - 同步加载
    - require 相当于执行一个同步函数
  - 动态加载
  - 不支持 treeshaking,因为无法静态分析
  - 不适用浏览器环境,会阻塞页面渲染
- AMD
  - 提供了异步加载的能力
  - 基于 require.js 配合 require 模块和 define 定义模块
  - 核心理念是提前执行,所有依赖先加载在执行
- CMD
  - 异步加载模块 基于 Sea.js
  - 核心理念是延迟执行,即使用时才会加载执行,按需执行
- ESM
  - 浏览器原声支持 ESM,而 AMD CMD 只是模块补丁方案,没有真正的统一标准
  - 设计思想是尽量的静态化,以便于编译的时候就能确定模块的依赖关系
  - CommonJs 模块输出的是一个值的拷贝,ES6 模块输出的是值的引用
  - 使用 Babel 编辑 ESNEXT 语法,使用 Broswerify 编译 js
- UMD
  - 通用的模块定义规范,可以在所有的 js 环境中发挥作用
  - 也就满足所有上述规范
  - 要定义一个 name,用于挂载全局对象上
- 总结
  - Commonjs 主要用于服务端同步动态加载模块,AMD CMD 实现了异步加载机制,但是代码可读性和书写反锁没有统一标准化,AMD 是提前依赖,CMD 是就近依赖,ESM 原生支持比较好,支持静态分析和 treeshaking,UMD 支持 CJS,AMD,CMD 标准

## 构建工具

- 工程化:贯穿项目的全流程编排,项目选型到规范化配置,到代码组件编写重构封装测试,到打包构建优化缓存,到 CI / CD 自动化部署更新维护全流程

- Grunt
- Gulp
  - 这俩都是自动化小工具,达不到统一构建开发的标准
- Webpack
  - 功能强大但是太过于繁重
  - 为了兼容各个场景考虑的情况较多,打包后的代码比较混乱复杂
- Rollup
  - 更加轻便,天生支持 ESM,但没有 HMR 等功能,不适合开发构建,适用于库打包工具(组件库打包)
  - 本体功能较小,需要配合多种插件
- ESbuild
  - go 编写,属于是底层的语言转换器
  - 编译型语言,不需要 js 的动态解释的过程,效率更快
  - 支持多线程,并行处理任务加快效率
  - 全量定制,合并每个工具插件,集成到一起更好的控制缓存策略,优化了每一个环节的性能
- Vite
  - 开发使用 esbuild 完成预解析
  - 生产使用 rollup 打包
- Swc
  - rust 编写,属于是底层的语言转换器
  - 设计初衷是替代 Babel,Webpack 和 Babel 性能瓶颈在于 JS 的单线程处理
  - 支持多线程
- Tsup
  - 基于 ESbuild 打包 ts 文件
- Unbuild
- Turpopack
  - 基于 swc
- bundleless 思想
  - 不再手动打包（bundle）整个项目成一个或多个大文件，而是直接基于原生模块加载（ESM），按需加载文件。只转换（transpile）代码，不打包（bundle），最大限度依赖浏览器原生的模块系统加载能力
  - 用 esbuild 将你写的 TS/JSX 转换为 ESM
  - 将 依赖库 转换为 ESM（预打包）
  - 浏览器原生通过 import 拉取模块文件，无需打包
  - 前提条件
    - HTTP2
      - HTTP1.x 不支持多路复用,需要多个 TCP 连接来并发多可请求,但是对单个域名有 6-8 个链接限制,所以需要资源合并一个大文件,也就是 webpack 的 bundle 功能
      - 没有并发请求限制,可以请求多个文件,也就不用资源合并了
