# 总体架构

## 源码目录结构

```bash
├── packages
│   ├── compiler-core
│   ├── compiler-dom
│   ├── compiler-sfc
│   ├── compiler-ssr
│   ├── reactivity
│   ├── runtime-core
│   ├── runtime-dom
│   ├── shared
│   ├── template-explorer
│   ├── vue
```

## 编译时

### compiler-core

编译核心模块，将模板转为渲染函数

- Parser：将模板解析为 AST 抽象语法树
- Transformer：对 AST 进行转换，生成新的 AST
- Generator：将 AST 转换为渲染函数

### compiler-dom

平台侧差异补充

- 比如处理 v-html 指令
  - v-on
  - v-html
  - v-text

### compiler-sfc

处理单文件组件

- template 编译 compilerTemplate
- script 编译 compilerScript
  - 处理宏定义
- style 编译 compilerStyle

### compiler-ssr

- 编译服务端渲染

## 响应式

- Dep
- Proxy
- track 依赖收集
- trigger 触发依赖更新
- effect 副作用函数
  - 包装了一个函数，内部对函数进行依赖收集和派发更新，（全局变量，存储当前的副作用函数）
- ref
  - 包装了一个对象，内部对 value 进行 getter，setter 监听，依赖收集和派发更新同 reactive
- reactive
  - new proxy 对对象进行代理，对对象的属性进行 getter，setter 监听，依赖收集和派发更新
- computed
- watch

## 运行时

### runtime-core

#### renderer

#### diff 算法

- 简单 diff 算法
  - 依次比较，暴力算法
- 双端 diff 算法
  - 4 个指针依次对比
    - 头头比
    - 尾尾比
    - 头尾比
    - 尾头比
    - 找到复用，移动指针，继续下一次对比
- 快速 diff 算法
  - 预处理，将节点分为 3 类
  - 最长递增子序列

#### 调度队列

### runtime-dom

#### 平台差异

- 处理平台差异
- 处理事件
- 处理样式
