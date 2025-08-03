# 构建工具

## 概述

现代前端开发离不开构建工具，它们帮助我们处理模块化、代码转换、资源优化等任务。本模块将深入学习主流构建工具的使用和原理。

## 学习内容

### 主流构建工具
- **Webpack** - 模块打包工具，生态系统最完善
- **Vite** - 现代构建工具，开发体验优秀
- **Rollup** - ES模块打包器，适合库开发
- **EsBuild** - 极速构建工具，Go语言实现
- **Gulp** - 任务自动化工具
- **Babel** - JavaScript编译器

### 核心概念
- **模块化** - CommonJS、ES Modules、AMD
- **代码转换** - TypeScript、JSX、CSS预处理器
- **资源处理** - 图片、字体、静态资源
- **代码分割** - 按需加载、懒加载
- **性能优化** - 压缩、缓存、Tree Shaking

## 工具对比

| 工具 | 特点 | 适用场景 |
|------|------|----------|
| Webpack | 功能全面、生态丰富 | 大型应用、复杂项目 |
| Vite | 开发速度快、配置简单 | 现代应用、快速开发 |
| Rollup | 输出干净、Tree Shaking | 库开发、工具开发 |
| EsBuild | 速度极快、配置简单 | 简单项目、快速构建 |
| Gulp | 任务流、高度可定制 | 复杂构建流程 |
| Babel | 代码转换、兼容性 | 跨平台、新特性支持 |

## 学习路径

```mermaid
graph LR
    A[基础概念] --> B[Webpack]
    B --> C[Vite]
    C --> D[Rollup]
    D --> E[EsBuild]
    E --> F[高级应用]
```

## 实践项目

### Webpack配置示例
```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
```

### Vite配置示例
```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
        },
      },
    },
  },
});
```

## 学习目标

- 理解构建工具的核心概念
- 掌握主流构建工具的使用
- 能够根据项目需求选择合适的工具
- 理解构建工具的内部原理
- 能够优化构建配置和性能

## 相关资源

- [Webpack官方文档](https://webpack.js.org/)
- [Vite官方文档](https://vitejs.dev/)
- [Rollup官方文档](https://rollupjs.org/)
- [EsBuild官方文档](https://esbuild.github.io/)
- [Babel官方文档](https://babeljs.io/) 