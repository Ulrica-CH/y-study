### webpack

- 基础

  - 区分环境

    - 不同环境启用的配置不同

    - 线上优化压缩等

    - 生产方便调试

- process.env.NODE_ENV

  - 不设置默认在 webpack.config.js 里 undefined

  - 业务代码里的 process.env.NODE_ENV，其实是被 webpack 默认给的 production，mode 值默认就是。

    - 因为业务代码已经是编译构建完成了，替换了这个值

    - 如果设置了 mode:none,就会找不到

  - 对于 vue.config.js

    - vue-cli 内部会自动设置 process.env.NODE_ENV 并注入 DefinePlugin，所以 vue 项目里一般不会遇到 undefined。

    - vuecli 会设置好 NODE_ENV，然后去读取项目里的.env 合并变量来使用

- "dev": "vue-cli-service serve --mode development",那就是读取.env.development

- 手动赋值

  - NODE_ENV=production webpack --config webpack.config.js

  - cross-env NODE_ENV=production webpack --config webpack.config.js

- 可以跨平台

- 文件指纹

- hash

  - Hash 是整个项目的 hash 值，其根据每次编译内容计算得到，每次编译之后都会生成新的 hash,即修改任何文件都会导致所有文件的 hash 发生改变

- 一变都变

- chunkHash，每个 chunk 都有一个 hash

  - 改变变化的那部分

- contentHash，内容 hash

  - 一个 JS 文件中引入 CSS 文件，编译后它们的 hash 是相同的，而且只要 js 文件发生改变 ，关联的 css 文件 hash 也会改变,这个时候可以使用 mini-css-extract-plugin 里的 contenthash 值，保证即使 css 文件所处的模块里就算其他文件内容改变，只要 css 文件内容不变，那么不会重复构建

- postcss

- 1 、PostCSS 是一个通过 JavaScript 来转换样式的工具；

2 、这个工具可以帮助我们进行一些 CSS 的转换和适配，
3 、比如自动添加浏览器前缀、css 样式的重置
4 、postcss 本身功能较少，实现相关的功能需要借助相关的插件。

- postcss-cli：可以命令行使用 postcss

- 使用命令行处理示例（需先安装所需插件）：

```bash
npx postcss --use autoprefixer -o end.css ./src/css/style.css
```

- 开发时候 postcss-loader 处理

- webpack 中使用：

```js
use: [
  "style-loader",
  "css-loader",
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [require("autoprefixer")],
      },
    },
  },
];
```

- 但是这样需要配置很多 plugins，过于繁琐

- 可以使用 preset 预设：

```js
{
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
 plugins: [
   require('postcss-preset-env'),
 ],
    },
  },
}
```

- postcss-preset-env 也是一个 PostCSS 插件；

- 它可以帮助我们将一些现代的 CSS 特性，转成大多数浏览器认识的 CSS，并且会根据目标浏览器或者运行时环境添加所需的 polyfill；
- 也包括会自动帮助我们添加 autoprefixer（所以相当于已经内置了 autoprefixer
  相当于内置了一些常见功能

  - 可以在项目根目录下单独配置 postcss.config.js

    - babel-loader

- JavaScript 编译器

- 将采用 ECMAScript 2015+ 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中

- 主要功能

  - - 语法转换

- 源代码转换
- Polyfill 实现目标缓解缺少的功能等；

- 如果我们希望在命令行尝试使用 babel，需要安装如下库：

- @babel/core：babel 的核心代码，必须安装；
- @babel/cli：可以让我们在命令行使用 babel

- 如果要转剪头函数等 Es6+语法，需要各种的插件，自己配置麻烦，可以使用预设@babel/preset-env

  - 比如常见的预设有三个：

- env
- react
- TypeScript

- babel.config.js

```js
module.exports = {
  presets: ["@babel/preset-env"],
};
```

- polyfill

- Babel 默认只转换新的 Javascript 语法，而不转换新的 API，比如 Iterator, Generator, Set, Maps, Proxy, Reflect,Symbol,Promise 等全局对象

- babel v7 推荐使用@babel/preset-env 代替以往的诸多 polyfill 方案

- Babel 7.4 之前使用@babel/polyfill,会有全局变量污染的问题

  - useBuiltIns

    - @babel/preset-env 默认只支持语法转化，需要开启 useBuiltIns 配置才能转化 API 和实例方法

    - useBuiltIns: false 此时不对 polyfill 做操作。如果引入 @babel/polyfill，则无视配置的浏览器兼容，引入所有的 polyfill，大量文件

    - "useBuiltIns": "usage" usage 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，实现了按需添加

  - 如果我们依赖的某一个库本身使用了某些 polyfill 的特性，但是因为我们使用的是 usage，所以之后用户浏览器可能会报错
  - "useBuiltIns": "entry" 根据配置的浏览器兼容，引入浏览器不兼容的 polyfill。需要在入口文件手动添加 import '@babel/polyfill'，会自动根据 browserslist 替换成浏览器不兼容的所有 polyfill

2 、如果配置 corejs: 3, 则：

```js
// Babel < 7.4 旧方案（不推荐）
import "@babel/polyfill";

// 推荐方案（core-js@3）
import "core-js/stable";
import "regenerator-runtime/runtime";
```

corejs 默认是 2

- babel7.4.0 之后，可以通过单独引入 core-js 和 regenerator-runtime 来完成 polyfill 的使用

  - 为了解决全局空间污染的问题，提供了单独的包 babel-runtime 用以提供编译模块的工具函数,需要手动引入需要的 api runtime

- @babel/plugin-transform-runtime：使用新 API 时自动 import babel-runtime 里面的 polyfill

- helpers: true，避免内联的 helper 代码在多个文件重复出现

- regenerator: true,是否开启 generator 函数转换成使用 regenerator runtime 来避免污染全局域

- 最佳实践

  - 项目开发

- 类库开发

  - polyfill 由@babel/plugin-transform-runtime 来处理，推荐使用 core-js@3

- 本身也没有什么功能，一般也都是借助插件来实现

- 性能优化

- 查找路径

查找，resolve

- extensions

  - 按优先级列出扩展名，高频扩展名应靠前

- alias

  - 指定查找别名

- modules

  - 指定模块查找路径

- 通过绝对路径映射跳过 node_modules 的递归查找

- mainFields

  - 从包的 package.json 中的哪个字段查找入口文件

- [browser,module,main]

- mainFiels

  - 找不到 mainFields，会找索引文件

- [index]

resolveLoaders

- 可以配置 loader 的查找地址

externals

- 引用一个库，但是又不想让 webpack 打包，并且又不影响我们在程序中使用：

```html
<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.js"></script>
```

```js
externals: {
  jquery: "jQuery"; // 浏览器环境下映射为全局 jQuery
}
```

module

- noParse

  - 配置哪些模块文件的内容不需要进行解析：

```js
module: {
  noParse: /jquery|lodash/, // 正则表达式
  // 或者使用函数
  noParse(content) {
    return /jquery|lodash/.test(content)
  },
}
```

- 使用 noParse 进行忽略的模块文件中不能使用 import、require、define 等导入机制

- rules

  - thread-loader

- 多线程打包

  - 一般不使用，也会耗时耗内存

  - babel-loader 单独到线程池

  - include/exclude

- loader 处理文件范围

  - cache-loader

- babel-loader 自带

- 配置示例：

```js
{
  loader: 'babel-loader',
  options: { cacheDirectory: true }
}
```

- 放到.cache 目录下

- 其他 loader 借助 cache-loader

plugins

- IgnorePlugin

  - 用于忽略某些特定的模块，让 webpack 不把这些指定的模块打包进去，比如 moment 的语言包

- new webpack.IgnorePlugin(/^\.\/locale/,/moment$/)

  - 第一个是匹配引入模块路径的正则表达式

第二个是匹配模块的对应上下文，即所在目录名

- HardSourceWbpackPlugin

  - 为模块提供中间缓存

- Webpack5 已经内置此功能

- 代码分割

多入口

提取公共代码,SplitChunks

- optimization: {

```js
 splitChunks: {
   // async异步导入
   // initial同步导入
   // all 异步/同步导入
   chunks: 'all',
   }

}

	- optimization: {
 splitChunks: {
   // async异步导入
   // initial同步导入
   // all 异步/同步导入
   chunks: 'all',
   // 最小尺寸: 如果拆分出来一个, 那么拆分出来的这个包的大小最小为minSize
   minSize: 20000,
   // 将大于maxSize的包, 拆分成不小于minSize的包
   maxSize: 20000,
   // minChunks表示引入的包, 至少被导入了几次
   minChunks: 1,
   cacheGroups: {
vendor: {
  test: /[\\/]node_modules[\\/]/,
  filename: '[id]_vendors.js',
  // name: "vendor-chunks.js",
  priority: -10,
},
// bar: {
//   test: /bar_/,
//   filename: "[id]_bar.js"
// }
default: {
  minChunks: 2,
  filename: 'common_[id].js',
  priority: -20,
},
   },
 },

},
```

- minChunks：

- 至少被引入的次数，默认是 1；
- 如果我们写一个 2，但是引入了一次，那么不会被单独拆分；

  -

- cacheGroups：

- 用于对拆分的包就行分组，比如一个 lodash 在拆分之后，并不会立即打包，而是会等到有没有其他符合规则的包一起来打包；
  priority:优先级
  minChunks：使用几次会被抽离
  reuseExistingChunk：是否使用缓存

- CDN

打包的所有静态资源，放到 CDN 服务器，用户所有资源都是通过 CDN 服务器加载的；

- html 和数据接口放到自己服务器上，关闭缓存，一有变动就会拉取最新

- 静态资源放到 cdn 服务器上

一些第三方资源放到 CDN 服务器上；

缺点

- 同一时刻针对同一个域名的资源并行请求是有限制

  - 可以把这些静态资源分散到不同的 CDN 服务上去

  多个域名后会增加域名解析时间
  可以通过在 HTML HEAD 标签中加入：

```html
<link rel="dns-prefetch" href="http://img.zhufengpeixun.cn" />
```

来预解析域名，以降低域名解析带来的延迟

- Tree Shaking

- **usedExports**：通过标记某些函数是否被使用，之后通过 Terser 来进行优化的

- **sideEffects**：跳过整个模块/文件，直接查看该文件是否有副作用

- - 比如我们有一个 format.js、style.css 文件：

- 该文件在导入时没有使用任何的变量来接受

  - 如果在 package.json 设置为 false，那么会被优化，样式就不会生效了

  - 如果有一些我们希望保留，可以设置为数组

- 作用域提升 Scope Hoisting

让 Webpack 打包出来的代码文件更小、运行的更快， 它又译作 "作用域提升"，是在 Webpack3 中新推出的功能

- 原理是将所有的模块按照引用顺序放在一个函数作用域里，然后适当地重命名一些变量以防止命名冲突

- 开发环境要用 webpack.optimize.ModuleConcatenationPlugin 插件

- 默认会打包函数所有相互引入，scope Hoistin 是合并到一个作用域

- 懒加载

当前需要用什么功能就只加载这个功能对应的代码，也就是所谓的按需加载

- 1 、对网站功能进行划分，每一类一个 chunk

  2 、对于首次打开页面需要的功能直接加载，尽快展示给用户,某些依赖大量代码的功能点可以按需加载
  3 、被分割出去的代码需要一个按需加载的时机

```js
document.querySelector("#clickBtn").addEventListener("click", () => {
  import("./hello").then((result) => {
    console.log(result.default);
  });
});
```

    - 本质就是 import 函数

- 如果拦懒加载的文件过于大，会有卡顿，可以配货预获取来提高效率

预加载 preload

- preload 通常用于本页面要用到的关键资源，包括关键 js、字体、css 文件

preload 将会把资源得下载顺序权重提高，使得关键数据提前下载好,优化页面打开速度

    - 代码示例：

```js
import(
  /* webpackPrefetch: true */
  /* webpackChunkName: "utils" */
  "./utils.js"
).then((result) => {
  result.default.log("hello");
});
```

预获取

- 告诉浏览器未来可能会使用到的某个资源，浏览器就会在闲时去加载对应的资源，若能预测到用户的行为，比如懒加载，点击到其它页面等则相当于提前预加载了需要的资源

  - preload 是告诉浏览器页面必定需要的资源，浏览器一定会加载这些资源

而 prefetch 是告诉浏览器页面可能需要的资源，浏览器不一定会加载这些资源
所以建议：对于当前页面很有必要的资源使用 preload,对于可能在将来的页面中使用的资源使用 prefetch

- 压缩

HTML 压缩

- HtmlWebpackPlugin 插件来生成 HTML 的模板，事实上它还有一些其他的配置

- inject：设置打包的资源插入的位置 true、 false 、body、head
- cache：设置为 true，只有当文件改变时，才会生成新的文件（默认值也是 true）
- minify：默认会使用一个插件 html-minifier-terser

- Css 压缩

css-minimizer-webpack-plugin

- 压缩

mini-css-extract-plugin

- 分包

  - plugins: [

  new MiniCssExtractPlugin({
  filename: "[name].css",
  }),
  ],
  module: {
  rules: [
  {
  test: /\.css$/,
  use: [MiniCssExtractPlugin.loader, "css-loader"],
  },
  ],
  },

purgess-webpack-plugin

- 去除无用的 css

- 图片压缩

image-webpack-loader

- webpack5 新特性

- loader

- 1、导出为一个函数的 Node.js 模块。

2、这个函数在 Webpack 解析模块请求时被调用 3、Loader 的 this 上下文由 Webpack 填充了一些有用的方法和属性，允许 Loader 访问配置、发出文件、报告错误等。

同步

- return 一个值或调用 this.callback(null, result, sourceMap?, meta?)

异步

- 调用 this.async() 来获取一个回调函数，并在异步操作完成后通过该回调函数返回结果

参数：content 源代码，map？：source-map，meta？：表示上一个 Loader 传递的额外元数据。

获取使用时传递的参数：this.getOptions

参数校验：schema-utils

this.version: Loader API 版本。

this.context: 当前处理文件的目录。
this.resourcePath: 当前处理文件的完整路径。
this.resourceQuery: 文件的查询参数 (例如 file.js?query)。
this.getOptions(): 获取传递给 Loader 的选项 (推荐使用 loader-utils 的 getOptions)。
this.cacheable(flag = true): 标记 Loader 的输出是否可缓存。默认是可缓存的。
this.async(): 返回 this.callback，用于异步操作。
this.callback(err, content, sourceMap?, meta?): 用于返回多个结果（内容、Source Map、抽象语法树 AST 等）。
this.emitFile(name, content, sourceMap): 生成一个文件。
this.emitWarning(warning): 发出一个警告。
this.emitError(error): 发出一个错误。
this.addDependency(file): 添加文件依赖，当此文件变化时，会重新执行 Loader。
this.addContextDependency(directory): 添加目录依赖。
this.fs: Webpack 使用的输入文件系统。

- plugin

  - Tapable

    - Webpack 核心工具库，它提供了所有 Hook 的抽象类定义，Webpack 许多对象都是继承自 Tapable 类

- 同步 hooks

  - bail 熔断

  - loop 循环

- 异步 hooks

  - 串行

- const { AsyncSeriesHook } = require('tapable');

class BuildProcess {
constructor() {
this.hooks = {
beforeBuild: new AsyncSeriesHook(['options'])
};
}

async build(options) {
await this.hooks.beforeBuild.promise(options);
console.log('开始构建...');
}
}

const buildProcess = new BuildProcess();
// 异步插件 1：清理输出目录
buildProcess.hooks.beforeBuild.tapAsync('CleanPlugin', (options, callback) => {
console.log('清理输出目录...');
setTimeout(() => {
console.log('清理完成');
callback();
}, 1000);
});
// 异步插件 2：检查依赖
buildProcess.hooks.beforeBuild.tapPromise('DependencyCheckPlugin', async (options) => {
console.log('检查依赖...');
await new Promise(resolve => setTimeout(resolve, 500));
console.log('依赖检查完成');
});
// 同步插件也可以注册到异步钩子上
buildProcess.hooks.beforeBuild.tap('ConfigValidatePlugin', (options) => {
console.log('验证配置...');
console.log('配置验证完成');
});
buildProcess.build({});
// 输出:
// 清理输出目录...
// 清理完成
// 检查依赖...
// 依赖检查完成
// 验证配置...
// 配置验证完成
// 开始构建...

并行

- 注册钩子 tap tapAsync tapPromise

- 触发钩子 call callAsync callPromise

- const {

// 同步钩子
SyncHook, // 同步基础钩子
SyncBailHook, // 同步熔断钩子
SyncWaterfallHook, // 同步瀑布钩子
SyncLoopHook, // 同步循环钩子

// 异步串行钩子
AsyncSeriesHook, // 异步串行基础钩子
AsyncSeriesBailHook, // 异步串行熔断钩子
AsyncSeriesWaterfallHook, // 异步串行瀑布钩子

// 异步并行钩子
AsyncParallelHook, // 异步并行基础钩子
AsyncParallelBailHook // 异步并行熔断钩子
} = require('tapable');

提供了拦截器功能，可以在插件执行的各个阶段插入自定义逻辑

- const { SyncHook } = require('tapable');

const hook = new SyncHook(['arg']);

// 注册拦截器
hook.intercept({
// 注册插件时调用
register: (tapInfo) => {
console.log(`注册插件: ${tapInfo.name}`);
return tapInfo;
},

// 调用钩子时调用
call: (...args) => {
console.log('钩子被调用，参数:', args);
},

// 每个插件执行前调用
tap: (tapInfo) => {
console.log(`即将执行插件: ${tapInfo.name}`);
}
});

hook.tap('TestPlugin', (arg) => {
console.log('插件执行:', arg);
});

hook.call('hello');
// 输出:
// 注册插件: TestPlugin
// 钩子被调用，参数: ['hello']
// 即将执行插件: TestPlugin
// 插件执行: hello

    优点

- 普通的事件系统通常只能 "发布-订阅"，但 Tapable 可以：

1、控制插件的执行顺序
2、实现熔断机制（某个插件返回特定值时停止后续执行）
支持瀑布流模式（前一个插件的返回值作为下一 3、个插件的输入）
4、支持循环执行直到满足条件

- 动态生成最优化的执行代码

- const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
apply(compiler) {
// 代表开始读取 records 之前执行
compiler.hooks.run.tap(pluginName, compilation => {
console.log("webpack 构建过程开始！");
});
}
}

- 本质上是一个类，其中实现了 apply 方法

  1、apply 方法的入参注入了一个 compiler 实例，compiler 实例是 Webpack 的支柱引擎，代表了 CLI 和 Node API 传递的所有配置项。

2、Hook 回调方法注入了 compilation 实例，compilation 能够访问当前构建时的模块和相应的依赖

- Compiler 对象包含了 Webpack 环境所有的的配置信息，包含 options，loaders，plugins 这些信息，
- 这个对象在 Webpack 启动时候被实例化，它是全局唯一的，可以简单地把它理解为 Webpack 实例；

Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。当 Webpack 以开发模式运行时，每当检测到一个文件变化，一次新的 Compilation 将被创建。Compilation 对象也提供了很多事件回调供插件做扩展。通过 Compilation 也能读取到 Compiler 对象。

### gulp

### roolup

### vite

## 规范化

