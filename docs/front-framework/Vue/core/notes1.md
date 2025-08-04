## 声明式框架

- 关注结果 不关注过程
- 命令式框架 关注过程,自己来实现
  image.png

## 编译时 运行时

## 模块拆分 松耦合

## tree shaking

## reactivity

- 通过 new Proxy 代理对象
- 要判断是否已经代理过了
  - new WeakMap
  - map.has
- 要判断是否是个代理对象
  - target[ReactiveFlags.IS_REACTIVE]
  - if (key === ReactiveFlags.IS_REACTIVE) return true;

## effect

- “响应式副作用函数”，用来追踪依赖并在数据变化时自动重新执行，是响应式系统的核心机制
- 全局 activeEffect 用来记录当前 effect 副作用函数
- parent 用来解决嵌套 effect

## track

- 依赖追踪 
- 当访问响应式数据,触发 get,触发 track
- 通过 WeakMAp 和 Map 和 Set 记录当前对象的 key 的 activeEffect
