# 微内核及插件化

## 微内核架构思想

> 模块化的软件设计模式

- 将系统的基础功能和扩展功能进行分离
- 核心只包括系统最基本，最通用的功能
- 其他待定功能都可以通过插件（扩展模块）来实现

> 核心优势

- 灵活性

  - 可以动态的添加，移除，替换模块，无需修改核心代码

- 可扩展性

  - 系统能够根据业务需求的变化轻松扩展功能

- 可维护性

  - 各个插件相互独立，便于单独开发测试维护，不会影响其他模块和核心功能

- 复用性
  - 插件可以在不同项目中复用，比如用户登录认证插件，支持再多个前端项目里使用

> 应用领域

- Vue 框架

  - Vue 本体是核心，Vue-router, Vuex 等都是插件
  - 可以自定义插件扩展 Vue 的功能，而不影响 Vue 本体

- Webpack

  - 通关插件和自定义插件来扩展增强功能

- 操作系统
- IDE 如 Vscode

## 微内核架构组成

> 微内核(插件基座)

- 负责系统的基本功能和插件管理,如加载、卸载、通信等

```javascript
class PluginManager {
  constructor() {
    /** 插件列表 */
    this.plugins = new Map();
  }

  /** 注册插件 */
  registerPlugin(plugin) {
    this.plugins.set(plugin.name, plugin);
  }

  /** 使用插件 */
  usePlugin(plugName, compiler) {
    const plugin = this.plugins.get(plugName);
    if (plugin) {
      plugin.apply(compiler);
    }
  }
}
```

- 注册插件

```javascript
const pluginManager = new PluginManager();
pluginManager.registerPlugin(new DemoPlugin());
```

- 使用插件

```javascript
pluginManager.usePlugin("DemoPlugin", compiler);
```

> 插件协议

- 定义基础插件协议, 插件必须实现该协议

```javascript
class DemoPlugin {
  constructor() {
    this.name = "DemoPlugin";
  }

  apply(compiler) {
    console.log("apply", compiler);
  }
}
```

> 插件

- 实现具体的功能，通关与核心通信来提供服务

> 插件生命周期

- 类比 init, onMounted, onUnmounted

```javascript
/** 插件生命周期函数 */
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
```

```javascript
/** 类比Vue */
class PluginManager {
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
```

> 插件通信协议

- 事件总线 EventBus

```javascript
export default class EventBus {
  constructor() {
    this.events = new Map();
  }

  on(eventName, callback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).push(callback);
  }

  emit(eventName, ...args) {
    if (!this.events.has(eventName)) {
      return;
    }
    this.events.get(eventName).forEach((callback) => callback(...args));
  }
}

const eventBus = new EventBus();

eventBus.on("test", (...args) => {
  console.log("test", ...args);
});

eventBus.emit("test", 1, 2, 3);
```

## 类比

> 其实一个页面模块可以看成微内核插件化思想

- index.vue 是本体核心
- Policy.vue Org.vue Project.vue 等都是插件
- index 只需要引入使用即可，不需要关心插件的实现
- 插件的修改不会影响本体，也不会影响其他插件
  - 如果都耦合在 index 文件
  - 那么修改一个插件功能可能会影响到其他逻辑，也就回影响到 index 核心
- 未来页面要拓展功能，只需要创建新的模块（插件）即可
- 插件（页面模块）可以复用，比如多个项目使用同一个页面模块
