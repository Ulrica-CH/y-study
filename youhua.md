# 优化

## 资源优化

### 缓存

#### 强缓存

Expries

cache contral

#### 协商缓存

#### 策略缓存

service Worker

```javascript
navigator.serviceWorker.register("./sw.js");
```

## 构建优化

### Webpack

webpack 配置更偏向于 CommonJs 规范

#### 开发环境

- source-map (source-map cheap-module-source-map)
- 查找优化

  - resolve
    - alias 路径别名
    - modules 扫描模块
    - extensions 省略文件后缀名,webpack 配置更偏向于 CommonJs 规范

- 缓存优化
  - cache (空间换时间)
  - 以前是 cache-loader
  - 多线程打包 - thread-loader
    DLL
- DLL Plugin
- DLL Reference Plugin

#### 生产环境

### Vite

#### 开发环境

#### 生产环境

## 应用 Vue 优化
