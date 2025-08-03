class PluginManager {
  constructor() {
    /** 插件列表 */
    this.plugins = new Map();
  }

  /** 注册插件 */
  registerPlugin(plugin) {
    this.plugins.set(plugin.name, plugin);

    if (plugin.init) {
      plugin.init();
    }

    if (plugin.onMounted) {
      plugin.onMounted();
    }
  }

  /** 使用插件 */
  usePlugin(plugName, compiler) {
    const plugin = this.plugins.get(plugName);
    if (plugin) {
      plugin.apply(compiler);
    }
  }

  dispose() {
    const plugins = Array.from(this.plugins.values());
    plugins.forEach((plugin) => {
      if (plugin.onUnmounted) {
        plugin.onUnmounted();
      }
    });

    this.plugins.clear();
  }
}


class DemoPlugin {
  constructor() {
    this.name = "DemoPlugin";
  }

  apply(compiler) {
    console.log("apply", compiler);
  }

  init() {
    console.log("init");
  }

  onMounted() {
    console.log("onMounted");
  }

  onUnmounted() {
    console.log("onUnmounted");
  }
}

const pluginManager = new PluginManager();
pluginManager.registerPlugin(new DemoPlugin());
pluginManager.usePlugin("DemoPlugin", (compiler) => {});