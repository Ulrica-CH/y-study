# Vite Basic

## 对比 Webpack

- vite 基于 ESModule,更关注于浏览器
- Webpack 更多的关注兼容性,对各种规范都做了支持
- 因为 Webpack 要支持多种模块化,所以最开始就要全量编译转换,也就是把所有依赖都整理一遍,效率自然就慢了
  - 当开始构建越来越大型的应用时，需要处理的 Javascript 代码量也呈指数级增长。包含数干个模块的大型项目相当普遍
  - 我们开始遇到性能瓶颈 — 使用 Javascript 开发的工具通常需要很长时间（甚至是几分钟！）才能启动开发服务器
  - 即使使用 HMR（热更新），文件修改后的效果也需要几秒钟才能在浏览器中反映出来。如此循环往复，迟钝的反馈会极大地影响开发者的开发效率和幸福感。
- [为什么选择 Vite](https://cn.vitejs.dev/guide/why.html)

## 预构建

> Vite 在开发模式下，首次启动时对 node_modules 中的依赖进行预处理和优化的过程

### 核心目标

- 依赖统一化：将 CommonJS/UMD 转换为 ESM
- 性能优化：减少 HTTP 请求数量
- 兼容性处理：解决不同模块格式的兼容问题

### 解决了三个问题

- 不同的第三方包导出格式可能不同(很多 npm 包仍然是 CommonJS 格式)
- 路径的查找处理 from 'loadsh' -> './node_modules/lodash'
- 多包传输问题 -> 合并到一个文件并输出为 ESM,缓存起来，写入 .vite/deps 文件夹
  - 某些包有大量细粒度的模块,能会触发几百个 HTTP 请求加载各种子模块

```js
// vite.config.ts
export default defineConfig({
  optimizeDeps: {
    // 手动指定需要预构建的依赖
    include: [
      "react",
      "react-dom",
      "lodash-es",
      "antd/es/button", // 具体到子模块
    ],

    // 排除不需要预构建的依赖
    exclude: ["your-local-package", "@your-org/internal-lib"],

    // 传递给 esbuild 的选项
    esbuildOptions: {
      define: {
        global: "globalThis", // 解决某些包的兼容性问题
      },
      plugins: [
        // 自定义 esbuild 插件
      ],
    },
  },
});
```

## 环境变量

> 环境变量:根据当前的代码环境产生值得变化的变量就是环境变量
>
> 比如 url 开发时后段 ip,生产是真实域名

### 区分环境

- 开发环境
- 测试环境
- 预发布环境
- 预生产环境
- 生产环境

### 环境变量处理

> 是通过 dotenv 读取的
>
> dotenv 自动读取.env 文件,解析文件中的环境变量注入到 process 对象里

### 为什么 vite.config.js 可以书写成 esmedulse 的形式

> webpack 还是 vite 在 config.js 文件里都可以使用 process 对象
>
> 因为 vite 他在读取这个 vite.config.js 的时候会率先 node 去解析文件语法，如果发现你是 esmodule 规范会直接将你的 esmodule 规范进行替换变成 commonjs 规范

### loadEnv

加载 envDir 中的 .env 文件。默认情况下只有前缀为 VITE\_ 会被加载(可以通过 envPrefix 配置)，除非更改了 prefixes 配置。

```ts
const env = loadEnv(mode, process.cwd(), "");
```

> 当我们调用 loadEnv 的时候，他会做如下几件事：

- 直接找到.env 文件不解释 并解析其中的环境变量 并放进一个对象里
- 会将传进来的 mode 这个变量的值进行拼接：.env.development
- 我们可以理解为

```js
const baseEnvConfig = 读取.env的配置
const modeEnvConfig = 读取.env.development相关配置
const lastEnvConfig = ｛...baseEnvConfig， ...modeEnvConfig ｝
```

- 在 vite.config.ts 中配置

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const revResolver = {
  //  区分配置
  build: () => Object.assign({}, viteBaseConfig,vitebuildConfig),
  server: () => Object.assign({}, viteBaseConfig, viteServerConfig);
};
// https://vite.dev/config/
export default defineConfig(({ command }) => {
  /* "build" | "serve" */
  console.log(command);

  return revResolver[command]();
});

```

### 关于 import.meta.env

- import.meta.env 是 Vite 在构建时注入到客户端代码中的,所以在 vite.config.js 中使用 import.meta.env 会报错

```js
{
    // 这是vite注入的
    BASE_URL: '/',
    DEV: true,
    MODE: 'development',
    PROD: false,
    SSR: false,
    // 这是我自己写的
    VITE_CS_DEMO: 'dep'
}
```

### NODE_ENV 与 env

> NODE_ENV

- 特定的环境变量名，是 Node.js 生态系统的约定标准
- 只有三个标准值：development、production、test
- 主要用途：告诉应用程序当前运行在什么环境下

> env

- 环境变量集合
- 包含 NODE_ENV

## run dev

- 本质是使用 koa 搭建了服务器,比如监听 5173 端口,当请求文件时候,会根据路径(app.use)去读取文件,并返回

  - 需要配置对应的 content-type
  - 当去请求 App.vue 实际是拿到已经被转换成 js 的 vue 文件,并配置了{content-type:text/javascript}
    - AST 解析,将 vue 文件转换成 js 文件,在 render 成真实 DOM

```js
import { createHotContext as __vite__createHotContext } from "/@vite/client";
import.meta.hot = __vite__createHotContext("/src/App.vue");
import { defineComponent as _defineComponent } from "/node_modules/.vite/deps/vue.js?v=b9cfe4dd";
import HelloWorld from "/src/components/HelloWorld.vue";
const _sfc_main = /* @__PURE__ */ _defineComponent({
  __name: "App",
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = { HelloWorld };
    Object.defineProperty(__returned__, "__isScriptSetup", {
      enumerable: false,
      value: true,
    });
    return __returned__;
  },
});
import {
  openBlock as _openBlock,
  createBlock as _createBlock,
} from "/node_modules/.vite/deps/vue.js?v=b9cfe4dd";
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createBlock($setup["HelloWorld"], { msg: "cs" });
}
import "/src/App.vue?t=1755135925897&vue&type=style&index=0&scoped=7a7a37b1&lang.css";
_sfc_main.__hmrId = "7a7a37b1";
typeof __VUE_HMR_RUNTIME__ !== "undefined" &&
  __VUE_HMR_RUNTIME__.createRecord(_sfc_main.__hmrId, _sfc_main);
import.meta.hot.on("file-changed", ({ file }) => {
  __VUE_HMR_RUNTIME__.CHANGED_FILE = file;
});
export const _rerender_only =
  __VUE_HMR_RUNTIME__.CHANGED_FILE ===
  "/Users/xy/XY/github_study/y-study/vite-stu/src/App.vue";
import.meta.hot.accept((mod) => {
  if (!mod) return;
  const { default: updated, _rerender_only: _rerender_only2 } = mod;
  if (_rerender_only2) {
    __VUE_HMR_RUNTIME__.rerender(updated.__hmrId, updated.render);
  } else {
    __VUE_HMR_RUNTIME__.reload(updated.__hmrId, updated);
  }
});
import _export_sfc from "/@id/__x00__plugin-vue:export-helper";
export default /* @__PURE__ */ _export_sfc(_sfc_main, [
  ["render", _sfc_render],
  ["__scopeId", "data-v-7a7a37b1"],
  ["__file", "/Users/xy/XY/github_study/y-study/vite-stu/src/App.vue"],
]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sZ0JBQWdCOzs7Ozs7Ozs7Ozs7dUJBSXJCLGFBQXVCLHdCQUFYLEtBQUksS0FBSSIsIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsiQXBwLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IEhlbGxvV29ybGQgZnJvbSBcIi4vY29tcG9uZW50cy9IZWxsb1dvcmxkLnZ1ZVwiO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPEhlbGxvV29ybGQgbXNnPVwiY3NcIiAvPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIHNjb3BlZD5cbi5sb2dvIHtcbiAgaGVpZ2h0OiA2ZW07XG4gIHBhZGRpbmc6IDEuNWVtO1xuICB3aWxsLWNoYW5nZTogZmlsdGVyO1xuICB0cmFuc2l0aW9uOiBmaWx0ZXIgMzAwbXM7XG59XG48L3N0eWxlPlxuIl0sImZpbGUiOiIvVXNlcnMveHkvWFkvZ2l0aHViX3N0dWR5L3ktc3R1ZHkvdml0ZS1zdHUvc3JjL0FwcC52dWUifQ==
```

```json
  HTTP/1.1 200 OK
  Access-Control-Allow-Origin: http://localhost:5174
  Vary: Origin
  Content-Type: text/javascript
  Cache-Control: no-cache
  Etag: W/"733-BfjHd0f+RtbiJa7kBOXntiuAv3M"
  Date: Thu, 14 Aug 2025 01:45:30 GMT
  Connection: keep-alive
  Keep-Alive: timeout=5
  Content-Length: 2562
```

## 热更新

- 本质是使用 ws 搭建了服务器,当文件变化时候,会发送消息给浏览器,浏览器会根据消息去更新文件
  - 需要配置对应的 ws

## Css

> vite 天生就支持对 css 文件的直接处理

- vite 在读取到 main.js 中引用到了 index.css
  - 直接去使用 fs 模块去读取 index.css 中文件内容
  - 直接创建一个 style 标签，将 index.css 中文件内容直接 copy 进 style 标签里
  - 将 style 标签插入到 index.html 的 head 中
  - 将该 css 文件中的内容直接替换为 js 脚本（方便热更新或者 csS 模块化），同时设置 Content-Type 为 js 从而让浏览器以 JS 脚本的形式来执行该 css

```js
// style.css编译后
import { createHotContext as __vite__createHotContext } from "/@vite/client";
import.meta.hot = __vite__createHotContext("/src/style.css");
import {
  updateStyle as __vite__updateStyle,
  removeStyle as __vite__removeStyle,
} from "/@vite/client";
const __vite__id = "/Users/xy/XY/github_study/y-study/vite-stu/src/style.css";
const __vite__css =
  ":root {\n  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;\n  line-height: 1.5;\n  font-weight: 400;\n\n  color-scheme: light dark;\n  color: rgba(255, 255, 255, 0.87);\n  background-color: #242424;\n\n  font-synthesis: none;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\na {\n  font-weight: 500;\n  color: #646cff;\n  text-decoration: inherit;\n}\na:hover {\n  color: #535bf2;\n}\n\nbody {\n  margin: 0;\n  display: flex;\n  place-items: center;\n  min-width: 320px;\n  min-height: 100vh;\n}\n\nh1 {\n  font-size: 3.2em;\n  line-height: 1.1;\n}\n\nbutton {\n  border-radius: 8px;\n  border: 1px solid transparent;\n  padding: 0.6em 1.2em;\n  font-size: 1em;\n  font-weight: 500;\n  font-family: inherit;\n  background-color: #1a1a1a;\n  cursor: pointer;\n  transition: border-color 0.25s;\n}\nbutton:hover {\n  border-color: #646cff;\n}\nbutton:focus,\nbutton:focus-visible {\n  outline: 4px auto -webkit-focus-ring-color;\n}\n\n.card {\n  padding: 2em;\n}\n\n#app {\n  max-width: 1280px;\n  margin: 0 auto;\n  padding: 2rem;\n  text-align: center;\n}\n\n@media (prefers-color-scheme: light) {\n  :root {\n    color: #213547;\n    background-color: #ffffff;\n  }\n  a:hover {\n    color: #747bff;\n  }\n  button {\n    background-color: #f9f9f9;\n  }\n}\n";
__vite__updateStyle(__vite__id, __vite__css);
import.meta.hot.accept();
import.meta.hot.prune(() => __vite__removeStyle(__vite__id));
```

### 模块化

style.module.css

- module.css（module 是一种约定，表示需要开启 CSS 模块化）
- 他会将你的所有类名进行一定规则的替换（将 footer 替換成 \_footer_i22st_1）
- 同时创建一个映射对象｛footer："\_footer_i22st_1" ｝
- 将替换过后的内容塞进 style 标签里然后放入到 head 标签中（能够读到 index.html 的文件内容）
- 将 style.module.css 内容进行全部抹除，替换成 JS 脚本
- 将创建的映射对象在期本中进行默认导出

```html
<style
  type="text/css"
  data-vite-dev-id="/Users/xy/XY/github_study/y-study/vite-stu/src/style.module.css"
>
  ._card_1elwy_1 {
    padding: 2em;
  }

  #_app_1elwy_1 {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }

  @media (prefers-color-scheme: light) {
    :root {
      color: #213547;
      background-color: #ffffff;
    }
    a:hover {
      color: #747bff;
    }
    button {
      background-color: #f9f9f9;
    }
  }
</style>
```

```js
import { createHotContext as __vite__createHotContext } from "/@vite/client";
import.meta.hot = __vite__createHotContext("/src/style.module.css");
import {
  updateStyle as __vite__updateStyle,
  removeStyle as __vite__removeStyle,
} from "/@vite/client";
const __vite__id =
  "/Users/xy/XY/github_study/y-study/vite-stu/src/style.module.css";
const __vite__css =
  "._card_1elwy_1 {\n  padding: 2em;\n}\n\n#_app_1elwy_1 {\n  max-width: 1280px;\n  margin: 0 auto;\n  padding: 2rem;\n  text-align: center;\n}\n\n@media (prefers-color-scheme: light) {\n  :root {\n    color: #213547;\n    background-color: #ffffff;\n  }\n  a:hover {\n    color: #747bff;\n  }\n  button {\n    background-color: #f9f9f9;\n  }\n}\n";
__vite__updateStyle(__vite__id, __vite__css);
export const card = "_card_1elwy_1";
export const app = "_app_1elwy_1";
export default {
  card: card,
  app: app,
};

import.meta.hot.prune(() => __vite__removeStyle(__vite__id));
```

### module 配置

```ts
export default defineConfig({
  plugins: [vue()],
  css: {
    // modules配置最终会给postcss modules
    modules: {
      // localsConvention: "camelCase" | "camelCaseOnly" | "dashes" | "dashesOnly" 修改key的展示形式
      // scopeBehaviour?: 'global' | 'local'; 是否启用CSS模块化
      // globalModulePaths?: RegExp[]; 不想参与的css模块化的路径
      // exportGlobals?: boolean; 是否导出全局模块
      // generateScopedName?: string | ((name: string, filename: string, css: string) => string); 生成类名
      // hashPrefix?: string; 哈希前缀，混入到generateScopedName（更复杂）
    },
  },
});
```

### 预处理器全局配置

以 less 为例,安装了 less,就会有 lessc 编译器来处理 less 语法,在 vite.config.ts 中配置的 less 选项会给到编译器执行环境来统一处理

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      // scss?: SassPreprocessorOptions;
      // sass?: SassPreprocessorOptions;
      // less?: LessPreprocessorOptions;
      // styl?: StylusPreprocessorOptions;
      // stylus?: StylusPreprocessorOptions;

      // 整个对象会作为参数传递给lessc编译器执行环境
      less: {
        myBgColor: "red",
      },
    },
    // 开发环境是否生成sourcemap
    devSourcemap: true,
  },
});
```

### postcss

- 可以对 css 进行编译转换，新语法兼容兼容降级处理，浏览器统一前缀处理
- 类比于全屋净水系统，需要配合多种插件和预设进行工作
- postcss/cli 命令行脚手架
- postcss 转换核心,但是功能少需要插件和预设配合工作
- 插件 : 单个功能,比如处理新语法插件
- 预设 : 多个插件的集合,一个预设可以完成多种功能 如 postcss-preset-env

> 现在的 postcss 更趋向于后处理器,前置工作交给 less,scss 等预处理器,less,scss 转换完语法以后在交给 postcss 进行降级和前缀处理

> 跟 babel 很类似,也是借助插件和预设进行工作,来对 js 语法进行兼容降级转换处理

```ts
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import postcssPresetEnv from "postcss-preset-env";
// const revResolver = {
//   build: () => Object.assign({}, viteBaseConfig,vitebuildConfig),

//   server: () => Object.assign({}, viteBaseConfig, viteServerConfig);
// };
// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const args = process.argv.slice(2); // 获取命令行参数
  console.log("自定义参数:", args);
  // console.log('env----',env);
  // console.log(process.env);
  /* "build" | "serve" */
  console.log(command);
  /**
   * pnpm dev --mode 传入的参数会给到这里
   * pnpm dev --mode cs -> 这里就是cs
   *  */
  console.log(mode); // 'development' | 'production'
  // boolean
  // console.log(import.meta.env.PROD); // boolean
  // return revResolver[command]();

  return {
    plugins: [vue()],
    css: {
      postcss: {
        plugins: [
          postcssPresetEnv({
            stage: 3,
          }),
        ],
      },
    },
  };
});
```

- Stage 0 - 实验性特性（最激进）
- Stage 1 - 早期草案
- Stage 2 - 工作草案
- Stage 3 - 候选提案
- Stage 4 - 已标准化

> 默认是 stage 3, 可以手动指定 stage 0-4

- importFrom

  - postcss 处理文件以后无记忆,按需加载再去处理别的文件,那么之前定义的变量就不会生效了

  - `  importFrom: './src/styles/variables.css', // 导入变量文件`

  - 这样就不需要在每个样式文件里重复定义了

- 参考 [postcss-preset-env](https://www.npmjs.com/package/postcss-preset-env)

## 静态资源

```js
// 1. 默认导入 - 返回资源 URL
import imgUrl from "./assets/images/1.png";
console.log(imgUrl); // "/assets/1-abc123.png" (构建后的路径)

// 2. ?raw 导入 - 返回文件内容字符串
import imgRaw from "./assets/images/1.png?raw";
console.log(imgRaw); // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..." (原始内容)

// 3. ?url 导入 - 显式获取 URL
import imgUrl2 from "./assets/images/1.png?url";
console.log(imgUrl2); // "/assets/1-abc123.png"

// 4. ?inline 导入 - 内联为 base64
import imgInline from "./assets/images/1.png?inline";
console.log(imgInline); // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
```

### SVG 图标的内联使用

```js
// 导入 SVG 原始内容
import svgContent from "./icons/arrow.svg?raw";

// 动态插入 SVG
function createIcon(name) {
  const iconMap = {
    arrow: svgContent,
    // 其他图标...
  };

  return iconMap[name] || "";
}

// 在 Vue 组件中使用
const template = `
  <div class="icon">
    ${createIcon("arrow")}
  </div>
`;
```

### json 导入

- 可以直接全部导入

```js
import jsonData from "./data.json";

// 默认就是对象
console.log(jsonData);
```

- 也可以按需导入

```js
// 利于tree-shaking
import { name, age } from "./data.json";
```

### 对生产环境的一些配置项

```ts
build: {
      rollupOptions: {
        output: {
          assetFileNames: "[hash].[name].[ext]",
        },

      },
      // 小于1024*1024的资源会内联
      assetsInlineLimit: 1024 * 1024,
    },

```

[build 配置项]('https://cn.vitejs.dev/config/build-options.html#build-rollupoptions')

## resolve.alias 原理

- 本质就是在处理 vite.config.js 文件时,拿到路径别名和文件路径进行字符串替换

## 插件

- vite会在不同的生命周期流程调用不同的插件来达到不同的目的

| 钩子 | 执行时机 | 主要用途 | 返回值 |
|------|----------|----------|--------|
| `config` | 配置解析前 | 修改配置 | 配置对象 |
| `configResolved` | 配置解析后 | 保存配置 | void |
| `configureServer` | 开发服务器启动 | 中间件、监听 | 清理函数 |
| `transformIndexHtml` | HTML 处理 | 注入标签 | HTML 或标签数组 |
| `resolveId` | 模块解析 | 自定义解析 | 模块 ID |
| `load` | 模块加载 | 虚拟模块 | 模块内容 |
| `transform` | 代码转换 | 代码处理 | 转换后的代码 |
| `handleHotUpdate` | 热更新 | 自定义 HMR | 模块数组 |
| `buildStart` | 构建开始 | 初始化 | void |
| `buildEnd` | 构建结束 | 清理、统计 | void |
| `closeBundle` | 打包完成 | 后处理 | void |

> vite-aliases

- 自动生成别名 [vite-aliases](https://www.npmjs.com/package/vite-aliases)

## 性能优化
