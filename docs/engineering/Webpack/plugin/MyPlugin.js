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
