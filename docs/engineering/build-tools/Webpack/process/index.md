# Webpack

## 初始化配置,创建 compiler

- 从配置文件和 Shell 语句中读取和合并相关参数,拿到最终的参数 options
- 用上一步得到的参数初始化 Compiler 对象,这个对象掌控全过程生命周期,进行各种调度任务

  - new Compile(options)创建所有 hooks,注册所有插件
  - 创建所有 hooks: Compiler 构造器里定义（如 beforeRun/run/compile/make/finishMake/afterCompile/emit/afterEmit/done 等）

```javascript
class Compiler {
  /**
   * @param {string} context the compilation path
   * @param {WebpackOptions} options options
   */
  constructor(context, options = /** @type {WebpackOptions} */ ({})) {
    this.hooks = Object.freeze({
      /** @type {SyncHook<[]>} */
      initialize: new SyncHook([]),

      /** @type {SyncBailHook<[Compilation], boolean | void>} */
      shouldEmit: new SyncBailHook(["compilation"]),
      /** @type {AsyncSeriesHook<[Stats]>} */
      done: new AsyncSeriesHook(["stats"]),
      /** @type {SyncHook<[Stats]>} */
      afterDone: new SyncHook(["stats"]),
      /** @type {AsyncSeriesHook<[]>} */
      additionalPass: new AsyncSeriesHook([]),
      /** @type {AsyncSeriesHook<[Compiler]>} */
      beforeRun: new AsyncSeriesHook(["compiler"]),
      /** @type {AsyncSeriesHook<[Compiler]>} */
      run: new AsyncSeriesHook(["compiler"]),
      /** @type {AsyncSeriesHook<[Compilation]>} */
      emit: new AsyncSeriesHook(["compilation"]),
      /** @type {AsyncSeriesHook<[string, AssetEmittedInfo]>} */
      assetEmitted: new AsyncSeriesHook(["file", "info"]),
      /** @type {AsyncSeriesHook<[Compilation]>} */
      afterEmit: new AsyncSeriesHook(["compilation"]),
    });
  }
}
```

- 注册所有插件: new WebpackOptionsApply().process(options, compiler) 将内置与配置里的插件统一 apply(compiler)

```javascript
if (Array.isArray(options.plugins)) {
  for (const plugin of options.plugins) {
    if (typeof plugin === "function") {
      /** @type {WebpackPluginFunction} */
      (plugin).call(compiler, compiler);
    } else if (plugin) {
      plugin.apply(compiler);
    }
  }
}
```

- config 传入的很多选项其实也会被通过插件来处理
  `new WebpackOptionsApply().process(options, compiler);`
- 返回 compiler

## 调用 compiler 的 run 启动 webpack 的编译构建流程

- 启动构建（run/watch）,根据 Compiler 对象初始化 Compilation 对象

  - newCompilationParams, newCompilation(params),实例化 Compilation
  - 这个 Compilation 对象是一次编译阶段的主要执行者,会依次进行模块创建、依赖收集、分块、打包等操作

- 进入 make Hook：通常由 EntryPlugin 在这里 addEntry（添加入口）

```javascript
compiler.hooks.make.tapAsync(PLUGIN_NAME, (compilation, callback) => {
  // Compilation.addEntry → 将入口模块入队
  compilation.addEntry(context, dep, options, (err) => {
    callback(err);
  });
});
```

## 队列/调度（AsyncQueue）：

- factorizeQueue：factorizeModule 用 NormalModuleFactory 产出 NormalModule
- buildQueue：buildModule → 进入模块实际构建
  - runLoaders：以 resource 源代码为输入，按顺序执行匹配到的 loader，输出字符串形式 JS 源码
- Webpack 解析 AST → 收集依赖 → 扩展模块图
- addModuleDependencies：将依赖的模块继续入队，重复 factorize/build 直至图闭包
- finishMake Hook：图构建完成

## seal 整合优化输出资源

- 生成 chunks，对 chunks 进行一系列的优化，并生成要输出的代码
  - chunk 可以理解为 entry 中的模块，或者是动态导入的模块，或者是自定义 spiltChunks 里的包
  - 根据入口和模块之间的关系，组装成一个个 chunk，再把 chunk 转换成一个个单独的文件加入到输出列表

## emit 输出完成

- Compiler 开始生成文件前，钩子 emit 会被触发，这里可以修改最终文件

## done 完成
