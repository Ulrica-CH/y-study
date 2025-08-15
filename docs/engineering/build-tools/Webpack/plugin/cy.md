## Webpack 插件常用生命周期与钩子速查

### 全局执行顺序概览（高频）

- beforeRun / run / watchRun
- thisCompilation / compilation
- make → 构建依赖图
- loader 执行（如 vue-loader 处理 .vue）
- parser 解析最终 JS（import/export 等）
- finishModules
- 优化阶段：optimizeModules/Chunks → afterOptimizeTree
- 产物阶段（Webpack 5 推荐）：processAssets（多阶段）
- afterEmit / done

### Compiler（一次构建级别）

- beforeRun/run/watchRun: 构建前准备、计时、清理
- thisCompilation/compilation: 拿到本次 `compilation`，注册编译内钩子
- done/failed/invalid: 构建结束/失败/监听失效

### NormalModuleFactory（创建“普通模块”的工厂，早于 loader 执行）

- beforeResolve/afterResolve: 改写/拦截请求
- parser.for('javascript/auto'|'esm'|'dynamic'): 拿到 parser 实例，监听语法事件
- 说明：当你在 parser 钩子里看到 `.vue?vue&type=script&lang=js`，说明已过 loader 阶段，`vue-loader` 已把脚本转为 JS

### Parser（语法级，针对“当前被解析的模块”，在 loader 之后）

- import/importSpecifier: 记录模块导入
- export/exportSpecifier: 记录模块导出
- program: 访问 AST 根，做自定义遍历
- require/importCall 等：分析动态导入

### Compilation（单次编译内）

- make: 从入口出发收集模块；可添加额外入口
- buildModule/succeedModule/finishModules: 观察/汇总模块信息（全量遍历点）
- optimizeModules/optimizeChunks/afterOptimizeTree: 优化阶段
- processAssets（W5）/ optimizeAssets + emit（W4）: 生成/修改产物
- assetEmitted（W5）: 单文件产出回调
- afterEmit: 产物写出后

### 产物阶段（Webpack 5 推荐）

- compilation.hooks.processAssets（分阶段）:
  - additional → preProcess → add → preMinify → optimizeSize → optimizeHash → devTooling

---

### 实战注意事项

- parser 钩子只对“实际被解析”的模块触发；未被依赖图引用的文件不会触发。可用开发态 `require.context('@/api', true, /\.js$/)` 触发解析，或插件自行 fs+AST 扫描目录。
- 处理 `source` 时先 `split('!').pop()` 去内联 loader 前缀，再判断 `@/` 或相对路径。
- 抽取 `url` 时兼容 `Literal/TemplateLiteral/Binary/CallExpression` 等，必要时遍历函数体内所有 `ReturnStatement` 寻找 `request({...})`。
- 汇总输出放在 `done` 或 W5 的 `processAssets`，避免中途阻塞构建。
