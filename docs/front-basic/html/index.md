# HTML 基础

## 概述

HTML (HyperText Markup Language) 是Web页面的基础结构语言，定义了网页的内容和结构。

## 核心概念

### 文档结构
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面标题</title>
</head>
<body>
    <!-- 页面内容 -->
</body>
</html>
```

### 语义化标签

#### 页面结构
- `<header>` - 页头
- `<nav>` - 导航
- `<main>` - 主要内容
- `<aside>` - 侧边栏
- `<footer>` - 页脚

#### 内容标签
- `<article>` - 文章
- `<section>` - 章节
- `<h1>-<h6>` - 标题
- `<p>` - 段落
- `<ul>/<ol>` - 列表

### 表单元素
```html
<form action="/submit" method="POST">
    <label for="username">用户名：</label>
    <input type="text" id="username" name="username" required>
    
    <label for="email">邮箱：</label>
    <input type="email" id="email" name="email" required>
    
    <button type="submit">提交</button>
</form>
```

## 最佳实践

1. **语义化优先** - 使用有意义的标签
2. **无障碍访问** - 添加alt属性、label标签
3. **SEO优化** - 合理的标题层级和meta标签
4. **响应式设计** - 使用viewport meta标签

## 学习资源

- [HTML Living Standard](https://html.spec.whatwg.org/)
- [MDN HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 