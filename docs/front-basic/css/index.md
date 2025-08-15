# CSS 基础

## 概述

CSS (Cascading Style Sheets) 用于定义网页的样式和布局，控制页面的视觉效果。

## 核心概念

### 选择器
```css
/* 元素选择器 */
p { color: blue; }

/* 类选择器 */
.highlight { background-color: yellow; }

/* ID选择器 */
#header { height: 60px; }

/* 属性选择器 */
input[type="text"] { border: 1px solid #ccc; }

/* 伪类选择器 */
a:hover { color: red; }
```

### 盒模型
```css
.box {
    width: 200px;
    height: 100px;
    padding: 20px;
    border: 2px solid black;
    margin: 10px;
    box-sizing: border-box; /* 包含padding和border */
}
```

### 布局技术

#### Flexbox
```css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.item {
    flex: 1;
    order: 2;
}
```

#### Grid
```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    grid-template-areas: 
        "header header header"
        "sidebar main main"
        "footer footer footer";
}
```

### 响应式设计
```css
/* 媒体查询 */
@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }
    
    .grid-container {
        grid-template-columns: 1fr;
    }
}
```

## 最佳实践

1. **CSS重置** - 统一浏览器默认样式
2. **命名规范** - BEM、OOCSS等命名方法
3. **模块化** - 组件化的CSS架构
4. **性能优化** - 减少重排重绘

## 学习资源

- [CSS规范](https://www.w3.org/Style/CSS/)
- [MDN CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS)
- [CSS-Tricks](https://css-tricks.com/) 