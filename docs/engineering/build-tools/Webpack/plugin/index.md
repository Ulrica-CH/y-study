# Webpack 插件原理

## 目录

- [插件基本概念](#插件基本概念)
- [插件核心原理](#插件核心原理)
- [Tapable 机制](#tapable-机制)
- [插件开发](#插件开发)
- [常用插件原理](#常用插件原理)

## 插件基本概念

### 什么是 Webpack 插件

Webpack 插件是一个具有 `apply` 方法的 JavaScript 对象。`apply` 方法会被 Webpack compiler 调用，并且 compiler 对象可在整个编译生命周期访问。

```javascript
class MyPlugin {
  apply(compiler) {
    // 插件逻辑
  }
}
```

### 插件与 Loader 的区别

| 特性     | Loader       | Plugin             |
| -------- | ------------ | ------------------ |
| 作用     | 转换文件     | 执行范围更广的任务 |
| 运行时机 | 模块加载时   | 整个编译周期       |
| 输入     | 文件内容     | 通过钩子获取数据   |
| 输出     | 转换后的文件 | 可以修改输出资源   |

## 插件核心原理

### Webpack 编译流程

Webpack 的编译过程主要分为以下几个阶段：

1. **初始化阶段**：创建 Compiler 对象，初始化配置
2. **构建阶段**：从入口开始，递归解析依赖，创建模块对象
3. **生成阶段**：根据依赖关系，生成最终的资源文件
4. **输出阶段**：将资源写入到文件系统

### 插件执行时机

插件通过监听 Webpack 的钩子（hooks）来在特定时机执行：

```javascript
class MyPlugin {
  apply(compiler) {
    // 在编译开始前执行
    compiler.hooks.beforeCompile.tap("MyPlugin", (params) => {
      console.log("编译开始前");
    });

    // 在编译完成后执行
    compiler.hooks.afterCompile.tap("MyPlugin", (compilation) => {
      console.log("编译完成后");
    });

    // 在资源输出前执行
    compiler.hooks.emit.tapAsync("MyPlugin", (compilation, callback) => {
      console.log("资源输出前");
      callback();
    });
  }
}
```

## Tapable 机制

### Tapable 简介

Tapable 是 Webpack 的核心库，提供了插件机制的基础。它类似于 Node.js 的 EventEmitter，但功能更强大。

### 钩子类型

```javascript
const {
  SyncHook, // 同步钩子
  SyncBailHook, // 同步熔断钩子
  SyncWaterfallHook, // 同步瀑布钩子
  SyncLoopHook, // 同步循环钩子
  AsyncParallelHook, // 异步并行钩子
  AsyncParallelBailHook, // 异步并行熔断钩子
  AsyncSeriesHook, // 异步串行钩子
  AsyncSeriesBailHook, // 异步串行熔断钩子
  AsyncSeriesWaterfallHook, // 异步瀑布钩子
} = require("tapable");
```

### 钩子使用示例

```javascript
// 创建钩子
const hook = new SyncHook(["arg1", "arg2"]);

// 注册插件
hook.tap("Plugin1", (arg1, arg2) => {
  console.log("Plugin1", arg1, arg2);
});

hook.tap("Plugin2", (arg1, arg2) => {
  console.log("Plugin2", arg1, arg2);
});

// 调用钩子
hook.call("hello", "world");
```

## 插件开发

### 基本插件结构

```javascript
class MyWebpackPlugin {
  constructor(options) {
    this.options = options || {};
  }

  apply(compiler) {
    // 插件逻辑
  }
}

module.exports = MyWebpackPlugin;
```

### 常用钩子示例

<!--
#### 1. 编译阶段钩子

```javascript
class CompilePlugin {
  apply(compiler) {
    // 编译开始前
    compiler.hooks.beforeCompile.tap('CompilePlugin', (params) => {
      console.log('开始编译');
    });

    // 编译完成后
    compiler.hooks.afterCompile.tap('CompilePlugin', (compilation) => {
      console.log('编译完成');
    });

    // 模块构建前
    compiler.hooks.beforeModuleAssets.tap('CompilePlugin', () => {
      console.log('模块资源构建前');
    });
  }
}
```

#### 2. 输出阶段钩子

```javascript
class EmitPlugin {
  apply(compiler) {
    // 资源输出前
    compiler.hooks.emit.tapAsync('EmitPlugin', (compilation, callback) => {
      // 可以修改输出资源
      compilation.assets['new-file.js'] = {
        source: () => 'console.log("Hello from plugin")',
        size: () => 35
      };
      callback();
    });

    // 资源输出后
    compiler.hooks.afterEmit.tap('EmitPlugin', (compilation) => {
      console.log('资源输出完成');
    });
  }
}
```

#### 3. 模块处理钩子

```javascript
class ModulePlugin {
  apply(compiler) {
    // 模块构建前
    compiler.hooks.beforeModuleAssets.tap('ModulePlugin', () => {
      console.log('模块资源构建前');
    });

    // 模块构建后
    compiler.hooks.afterModuleAssets.tap('ModulePlugin', (modules) => {
      console.log('模块资源构建后');
    });
  }
}
``` -->

```javascript
const { Compilation } = require("webpack");

class MyPlugin {
  apply(compiler) {
    // ----- 🔧 Compiler Hooks (编译器钩子) -----

    // 环境设置完成后触发，此时webpack配置已经完成
    compiler.hooks.environment.tap("MyPlugin", () => {
      console.log("[MyPlugin] environment - 环境设置完成");
    });

    // 环境设置后触发，此时所有插件都已应用
    compiler.hooks.afterEnvironment.tap("MyPlugin", () => {
      console.log("[MyPlugin] afterEnvironment - 环境设置后");
    });

    // 入口配置处理时触发，可以修改入口配置
    compiler.hooks.entryOption.tap("MyPlugin", (context, entry) => {
      console.log("[MyPlugin] entryOption - 入口配置处理");
    });

    // 所有插件应用完成后触发
    compiler.hooks.afterPlugins.tap("MyPlugin", () => {
      console.log("[MyPlugin] afterPlugins - 插件应用完成");
    });

    // 解析器设置完成后触发
    compiler.hooks.afterResolvers.tap("MyPlugin", () => {
      console.log("[MyPlugin] afterResolvers - 解析器设置完成");
    });

    // 运行前触发，可以在这里进行一些准备工作
    compiler.hooks.beforeRun.tapAsync("MyPlugin", (compiler, callback) => {
      console.log("[MyPlugin] beforeRun - 运行前");
      callback();
    });

    // 开始运行时触发
    compiler.hooks.run.tap("MyPlugin", (compiler) => {
      console.log("[MyPlugin] run - 开始运行");
    });

    // 监听模式运行时触发
    compiler.hooks.watchRun.tapAsync("MyPlugin", (compiler, callback) => {
      console.log("[MyPlugin] watchRun - 监听模式运行");
      callback();
    });

    // 编译前触发，可以在这里修改编译参数
    compiler.hooks.beforeCompile.tapAsync("MyPlugin", (params, callback) => {
      console.log("[MyPlugin] beforeCompile - 编译前");
      callback();
    });

    // 开始编译时触发
    compiler.hooks.compile.tap("MyPlugin", (params) => {
      console.log("[MyPlugin] compile - 开始编译");
    });

    // 创建新的compilation时触发，这是设置compilation钩子的最佳位置
    compiler.hooks.thisCompilation.tap("MyPlugin", (compilation) => {
      console.log("[MyPlugin] thisCompilation - 创建新的compilation");

      // ----- 🧱 Compilation Hooks (编译钩子) -----

      // 构建模块前触发，可以在这里修改模块
      compilation.hooks.buildModule.tap("MyPlugin", (module) => {
        console.log("[MyPlugin] buildModule - 构建模块前:", module.resource);
      });

      //模块构建成功后触发
      compilation.hooks.succeedModule.tap("MyPlugin", (module) => {
        console.log(
          "[MyPlugin] succeedModule - 模块构建成功:",
          module.resource
        );
      });

      // 模块构建失败后触发
      compilation.hooks.failedModule.tap("MyPlugin", (module, error) => {
        console.log(
          "[MyPlugin] failedModule - 模块构建失败:",
          module.resource,
          error.message
        );
      });

      // // 模块优化前触发
      compilation.hooks.optimizeModules.tap("MyPlugin", (modules) => {
        console.log("[MyPlugin] optimizeModules - 模块优化前");
      });

      // 模块优化后触发
      compilation.hooks.afterOptimizeModules.tap("MyPlugin", (modules) => {
        console.log("[MyPlugin] afterOptimizeModules - 模块优化后");
      });

      // // 代码分割前触发
      compilation.hooks.optimizeChunks.tap("MyPlugin", (chunks) => {
        console.log("[MyPlugin] optimizeChunks - 代码分割前");
      });

      // 代码分割后触发
      compilation.hooks.afterOptimizeChunks.tap("MyPlugin", (chunks) => {
        console.log("[MyPlugin] afterOptimizeChunks - 代码分割后");
      });

      // // 密封阶段触发，此时不能再添加新的模块
      compilation.hooks.seal.tap("MyPlugin", () => {
        console.log("[MyPlugin] seal - 密封阶段");
      });

      // 处理资源时触发，可以在这里修改、添加或删除资源
      compilation.hooks.processAssets.tap(
        {
          name: "MyPlugin",
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS, // 在添加阶段处理
        },
        (assets) => {
          console.log("[MyPlugin] processAssets - 处理资源");
          // 可以在这里修改assets对象
          // 例如：添加新的资源文件
          // assets['new-file.js'] = new webpack.sources.RawSource('console.log("Hello World")');
        }
      );

      // // 资源处理完成后触发
      compilation.hooks.afterProcessAssets.tap("MyPlugin", (assets) => {
        console.log("[MyPlugin] afterProcessAssets - 资源处理完成");
      });

      // 添加额外资源时触发，可以在这里添加新的资源
      compilation.hooks.additionalAssets.tapAsync("MyPlugin", (callback) => {
        console.log("[MyPlugin] additionalAssets - 添加额外资源");
        callback();
      });

      // // 资源输出时触发，可以在这里获取输出文件的信息
      // compilation.hooks.assetEmitted.tap("MyPlugin", (file, info) => {
      //   console.log("[MyPlugin] assetEmitted - 资源输出:", file);
      // });

      // 哈希计算时触发，可以在这里修改哈希值
      compilation.hooks.fullHash.tap("MyPlugin", (hash) => {
        console.log("[MyPlugin] fullHash - 计算完整哈希");
      });

      // // 模块资源时触发
      compilation.hooks.moduleAsset.tap("MyPlugin", (module, filename) => {
        console.log("[MyPlugin] moduleAsset - 模块资源:", filename);
      });

      // 块资源时触发
      compilation.hooks.chunkAsset.tap("MyPlugin", (chunk, filename) => {
        console.log("[MyPlugin] chunkAsset - 块资源:", filename);
      });
    });

    // 创建compilation时触发（与thisCompilation类似，但会为每个compilation触发）
    compiler.hooks.compilation.tap("MyPlugin", (compilation) => {
      console.log("[MyPlugin] compilation - 创建compilation");
    });

    // 开始构建时触发，这是添加模块到compilation的主要阶段
    compiler.hooks.make.tapAsync("MyPlugin", (compilation, callback) => {
      console.log("[MyPlugin] make - 开始构建");
      callback();
    });

    // 输出资源前触发，可以在这里修改输出资源
    compiler.hooks.emit.tapAsync("MyPlugin", (compilation, callback) => {
      console.log("[MyPlugin] emit - 输出资源前");
      callback();
    });

    // 输出资源后触发
    compiler.hooks.afterEmit.tapAsync("MyPlugin", (compilation, callback) => {
      console.log("[MyPlugin] afterEmit - 输出资源后");
      callback();
    });

    // 编译完成时触发，可以在这里获取编译统计信息
    compiler.hooks.done.tap("MyPlugin", (stats) => {
      console.log("[MyPlugin] done - 编译完成");
    });

    // 编译失败时触发
    compiler.hooks.failed.tap("MyPlugin", (error) => {
      console.log("[MyPlugin] failed - 编译失败:", error.message);
    });

    // 监听模式停止时触发
    compiler.hooks.watchClose.tap("MyPlugin", () => {
      console.log("[MyPlugin] watchClose - 监听模式停止");
    });

    // 关闭时触发
    compiler.hooks.shutdown.tap("MyPlugin", () => {
      console.log("[MyPlugin] shutdown - 关闭");
    });
  }
}

module.exports = MyPlugin;
```

### 实际插件示例

#### 1. 文件大小分析插件

```javascript
class FileSizePlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync("FileSizePlugin", (compilation, callback) => {
      let output = "## 文件大小分析\n\n";
      output += "| 文件名 | 大小 |\n";
      output += "|--------|------|\n";

      for (let filename in compilation.assets) {
        const size = compilation.assets[filename].size();
        output += `| ${filename} | ${(size / 1024).toFixed(2)} KB |\n`;
      }

      compilation.assets["file-size-report.md"] = {
        source: () => output,
        size: () => output.length,
      };

      callback();
    });
  }
}
```

#### 2. 环境变量注入插件

```javascript
class EnvPlugin {
  constructor(env) {
    this.env = env;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap("EnvPlugin", (compilation) => {
      compilation.hooks.normalModuleFactory.tap(
        "EnvPlugin",
        (normalModuleFactory) => {
          normalModuleFactory.hooks.beforeResolve.tap(
            "EnvPlugin",
            (resolveData) => {
              if (resolveData.request === "process") {
                resolveData.request = require.resolve("./process-polyfill");
              }
            }
          );
        }
      );
    });
  }
}
```

## 常用插件原理

### HtmlWebpackPlugin 原理

HtmlWebpackPlugin 用于生成 HTML 文件，其核心原理：

```javascript
class HtmlWebpackPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      "HtmlWebpackPlugin",
      (compilation, callback) => {
        // 1. 获取所有入口文件
        const entryNames = Object.keys(compilation.entrypoints);

        // 2. 生成 HTML 内容
        const htmlContent = this.generateHtml(entryNames, compilation);

        // 3. 添加到输出资源
        compilation.assets["index.html"] = {
          source: () => htmlContent,
          size: () => htmlContent.length,
        };

        callback();
      }
    );
  }

  generateHtml(entryNames, compilation) {
    const scripts = entryNames
      .map((name) => {
        const files = compilation.entrypoints[name].getFiles();
        return files.map((file) => `<script src="${file}"></script>`).join("");
      })
      .join("");

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Webpack App</title>
        </head>
        <body>
          <div id="root"></div>
          ${scripts}
        </body>
      </html>
    `;
  }
}
```

### MiniCssExtractPlugin 原理

MiniCssExtractPlugin 用于提取 CSS 到单独文件：

```javascript
class MiniCssExtractPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      "MiniCssExtractPlugin",
      (compilation, callback) => {
        const cssAssets = {};

        // 1. 收集所有 CSS 模块
        for (let module of compilation.modules) {
          if (module.type === "css/mini-extract") {
            const css = module.content.toString();
            cssAssets[module.id] = css;
          }
        }

        // 2. 合并 CSS 并输出
        const combinedCss = Object.values(cssAssets).join("\n");
        compilation.assets["styles.css"] = {
          source: () => combinedCss,
          size: () => combinedCss.length,
        };

        callback();
      }
    );
  }
}
```

### DefinePlugin 原理

DefinePlugin 用于定义全局常量：

```javascript
class DefinePlugin {
  constructor(definitions) {
    this.definitions = definitions;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap("DefinePlugin", (compilation) => {
      compilation.hooks.normalModuleFactory.tap(
        "DefinePlugin",
        (normalModuleFactory) => {
          normalModuleFactory.hooks.beforeResolve.tap(
            "DefinePlugin",
            (resolveData) => {
              // 替换模块中的常量
              if (resolveData.request in this.definitions) {
                resolveData.request = this.definitions[resolveData.request];
              }
            }
          );
        }
      );
    });
  }
}
```

## 插件开发最佳实践

### 1. 错误处理

```javascript
class SafePlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync("SafePlugin", (compilation, callback) => {
      try {
        // 插件逻辑
        callback();
      } catch (error) {
        compilation.errors.push(error);
        callback();
      }
    });
  }
}
```

### 2. 配置验证

```javascript
class ConfigurablePlugin {
  constructor(options = {}) {
    this.validateOptions(options);
    this.options = options;
  }

  validateOptions(options) {
    if (options.required && typeof options.required !== "string") {
      throw new Error("required option must be a string");
    }
  }

  apply(compiler) {
    // 插件逻辑
  }
}
```

### 3. 性能优化

```javascript
class OptimizedPlugin {
  apply(compiler) {
    // 使用 tap 而不是 tapAsync 来避免不必要的异步操作
    compiler.hooks.emit.tap("OptimizedPlugin", (compilation) => {
      // 同步处理逻辑
    });

    // 只在必要时使用异步钩子
    compiler.hooks.emit.tapAsync("OptimizedPlugin", (compilation, callback) => {
      // 异步处理逻辑
      callback();
    });
  }
}
```

## 总结

Webpack 插件机制的核心是：

1. **Tapable 库**：提供钩子机制的基础
2. **生命周期钩子**：在编译的不同阶段执行插件
3. **Compiler 和 Compilation 对象**：提供访问 Webpack 内部数据的能力
4. **资源操作**：可以读取、修改、添加输出资源

通过理解这些原理，我们可以开发出功能强大的 Webpack 插件来扩展 Webpack 的功能。
