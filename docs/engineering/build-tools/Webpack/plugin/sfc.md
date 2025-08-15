### 一个 SFC 经过 vue-loader 后会变成什么

以 Vue 2 为例，`vue-loader` 会把单个 `Foo.vue` 切分成多个“虚拟模块”，大致是：

- `Foo.vue?vue&type=script&lang=js` 脚本模块（供 parser 解析为 JS AST）
- `Foo.vue?vue&type=template&id=xxxx&lang=html` 模板模块（被编译成 render 函数的 JS）
- `Foo.vue?vue&type=style&index=0&lang=scss` 样式模块（交给 style/scss loader）

入口的合成模块（也叫 assemble/entry module）会把这些拼起来导出组件。

#### 示例 SFC

```vue
<!-- src/views/Foo.vue -->
<template>
  <div class="foo">
    <el-button>OK</el-button>
  </div>
</template>

<script>
export default {
  name: "Foo",
  mounted() {
    console.log("hi");
  },
};
</script>

<style lang="scss" scoped>
.foo {
  color: red;
}
</style>
```

#### Webpack 中会产生的请求（简化）

- `src/views/Foo.vue?vue&type=script&lang=js`
- `src/views/Foo.vue?vue&type=template&id=abcd1234&lang=html`
- `src/views/Foo.vue?vue&type=style&index=0&lang=scss`
- 以及一个装配模块 `src/views/Foo.vue`，内部 import 上面三个并 `export default` 组件

### 这些模块长什么样（简化后）

- 脚本模块（供 parser 建 AST）

```js
// Foo.vue?vue&type=script&lang=js
export default {
  name: "Foo",
  mounted() {
    console.log("hi");
  },
};
```

- 模板模块（已经被编译成 JS 渲染函数，不再是原始 HTML）

```js
// Foo.vue?vue&type=template&id=abcd1234
export function render() {
  /* runtime render code */
}
export const staticRenderFns = [
  /* ... */
];
```

- 装配模块（把 script + render + style 组装在一起）

```js
// Foo.vue (no query)
import script from "./Foo.vue?vue&type=script&lang=js";
import {
  render,
  staticRenderFns,
} from "./Foo.vue?vue&type=template&id=abcd1234";
script.render = render;
script.staticRenderFns = staticRenderFns;
export default script;
```

### 配合 normalModuleFactory + parser + program 的触发过程

- 在 `normalModuleFactory` 阶段，你获取“解析器”实例：

  ```js
  compiler.hooks.normalModuleFactory.tap("Plugin", (factory) => {
    factory.hooks.parser.for("javascript/auto").tap("Plugin", (parser) => {
      // 在 parser 上挂 AST 钩子
    });
  });
  ```

- 当 Webpack 走到 “脚本模块” `Foo.vue?vue&type=script&lang=js` 时：

  - loader 链把它转成了 JS 源码字符串
  - parser 会把这段 JS 源码解析成 AST（ESTree）
  - 触发 `parser.hooks.program` 表示该模块的 AST 根 Program 就绪（“一模块一次”的稳定时机）
  - 此时可通过 `parser.state.current.resource` 拿到当前资源路径（含 query）

- 你的插件逻辑（为何 program 好用）：

  ```js
  parser.hooks.program.tap("Plugin", () => {
    const res = parser.state?.current?.resource;
    if (!res || res.indexOf(".vue") === -1) return;
    // res 类似: /abs/path/src/views/Foo.vue?vue&type=script&lang=js
    const vueFile = res.replace(/\?.*$/, "").split(".vue")[0] + ".vue"; // /abs/path/src/views/Foo.vue

    // 读取真实 .vue 内容，再用 vue-template-compiler 拆分块
    const code = fs.readFileSync(vueFile, "utf8");
    const sfc = require("vue-template-compiler").parseComponent(code, {
      pad: "space",
    });
    const template = sfc?.template?.content || "";

    // 用正则统计 <el-*> 开头标签（模板里才有 el-button 等）
    const counts = {};
    const re = /<\s*(el-[a-z0-9-]+)(?=[\s/>])/gi;
    let m;
    while ((m = re.exec(template)))
      counts[m[1].toLowerCase()] = (counts[m[1].toLowerCase()] || 0) + 1;

    // 累计保存，稍后在 done 钩子里一次性写文件
  });
  ```

要点梳理

- parser 看到的“脚本模块”是 JS，模板不在这个 AST 里（模板在“模板模块”里，已经是 render 函数 JS，不再是原始 HTML）。
- 所以我们在 program 时机，用 resource 反查真实 `.vue` 文件，然后自己“读取 + parseComponent”拿到 template 原文。
- program 的优势是“每个模块一次且与语句无关”，不用依赖 import/require/statement 等节点事件，覆盖最稳。

“AST 就绪”指的是：Webpack 的 parser 已经把当前模块的源代码（经过前置 loader 转换后的代码）解析成一棵 AST（ESTree）。此时进入的是根节点 Program，parser 的各类 AST 钩子（importSpecifier/statement/call…）都会开始被依次触发。
在 parser.hooks.program 里，代码在“解析完成 → 开始遍历”的起点，你拿到的上下文不再是“纯字符串”，而是“这份模块已被解析成 AST 并即将/正在按节点派发 hook”。Webpack 不会把整棵 AST 直接给你，但会通过节点级 hooks 暴露遍历过程。
注意 Vue SFC 情况：parser 处理的是 .vue?vue&type=script… 这份“script 块已被 vue-loader 转成的 JS”。模板 template 不在这个 AST 里，所以我们才需要用 parser.state.current.resource 定位真实 .vue 文件，再自己读文件+用 vue-template-compiler.parseComponent 把 template 抽出来做统计。
若你要原始字符串：
在 parser 阶段通常拿不到（拿到的是解析后的上下文与 AST 事件）。
用 compilation.hooks.succeedModule 能从 module.source?.source() 拿到构建后的源码字符串，或直接 fs.readFileSync(vue 文件) 拿原始 SFC 内容。\

### 核心流水线心智图

- 资源解析 → 创建模块 → 应用 loader → 解析成 AST → 构建依赖图 → 输出产物
- 对应常用钩子层级
  - compiler: 全流程（如 done）
  - compilation: 单次编译过程（如 succeedModule/finishModules）
  - normalModuleFactory: 解析/创建模块与解析器（parser）
  - parser: 针对某个 JS/TS 模块的 AST 事件（program/importSpecifier/...）

### 常用钩子做什么、何时用

- normalModuleFactory

  - 用途: 拿“解析器”实例，并在其上挂 parser 钩子
  - 何时用: 你需要基于 AST 的逐模块分析（如语法级采集、识别 .vue?… 的资源）
  - 典型：factory.hooks.parser.for('javascript/auto').tap(plugin, parser => { … })

- parser.hooks.program

  - 用途: “该模块的整棵 AST 构建完成”后触发，一模块触发一次（稳）
  - 何时用: 只需要“每个模块一次”的稳定时机，不关心具体语句类型（最通用）
  - 例子: 定位 parser.state.current.resource → 映射到真实 .vue → 读取源码 → parseComponent → 统计 template

- parser.hooks.importSpecifier / exportSpecifier

  - 用途: 命中 import/export 语句时触发，参数暴露了符号名/源路径等
  - 何时用: 只在有 import/export 时才统计；适合做“依赖/导出分析”
  - 注意: 没有 import/export 的模块不会触发，需去重/兜底

- parser.hooks.statement / call / require

  - 用途: 命中任意语句/函数调用/require 表达式时触发
  - 何时用: 你需要基于某些调用/语句进行采集（如 h('el-button') 计数）
  - 注意: 触发频繁，需用 Set 防重复；覆盖面受语法形态影响

- compilation.hooks.succeedModule

  - 用途: “单个模块构建完成”后触发，能拿到 module.resource
  - 何时用: 不需要 AST，只要拿到文件路径再自行读取/分析；方案简单稳健
  - 典型: 适合作为 parser 的替代（逐模块一次）；适合读取 .vue 源文件做统计

- compilation.hooks.finishModules

  - 用途: “所有模块构建完成”后触发
  - 何时用: 做“全局汇总/收尾分析”（不做逐模块统计逻辑）

- compiler.hooks.done
  - 用途: 整个编译流程结束
  - 何时用: 最终写盘/上报/打印汇总结果

### 选择建议（按诉求选钩子）

- 想对“每个模块一次”做分析，且不依赖具体语句

  - 首选 parser.program（AST 就绪、一次性、覆盖面好）
  - 或 compilation.succeedModule（无需 AST，路径拿到就行，简单稳）

- 想做“依赖/导出”级采集

  - 用 parser.importSpecifier / exportSpecifier（只在有对应语句时触发）

- 想侦测特定语法形态（如 require/call/h(...)）

  - 用 parser.call / require / statement

- 想在结束时写文件
  - 用 compiler.done（一次性落盘、最干净）

### 在你这个插件中的取舍

- 我用 normalModuleFactory + parser.program：
  - program 保证“每个模块一次且 AST 就绪”，拿 resource 稳定
  - 读取真实 .vue → parseComponent → 统计 <el-\*> → usageMap
  - 在 done 统一落盘
- 也可不用 program：
  - 选 importSpecifier/statement 等任一“至少触发一次”的钩子进行采集（首触发即处理，Set 去重）
  - 或改用 succeedModule，不碰 parser，逻辑更简单

这样，你就能按“是否需要 AST、是否依赖具体语句、是否逐模块/全局”等维度，快速判断该用哪个钩子。
