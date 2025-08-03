# 手写实现

## 概述

手写实现是深入理解JavaScript核心概念的重要方式。通过手写常用函数和工具，可以更好地理解其内部原理和实现机制。

## 学习内容

### 函数相关
- **call** - 改变函数this指向
- **apply** - 改变函数this指向（数组参数）
- **bind** - 返回绑定this的新函数
- **new** - 构造函数实例化过程
- **instanceof** - 类型检查实现

### 工具函数
- **debounce** - 防抖函数
- **throttle** - 节流函数
- **EventEmitter** - 事件发射器
- **watch** - 数据监听器

### 数组相关
- **unique** - 数组去重
- **toFlat** - 数组扁平化
- **flattenObject** - 对象扁平化

### 算法实现
- **大数相加** - 处理超出Number范围的加法
- **深拷贝** - 对象的深度复制
- **Promise** - Promise的简化实现
- **async/await** - 异步函数的实现

## 实现原理

### call/apply/bind原理
```javascript
// 核心思想：将函数作为对象的属性调用
Function.prototype.myCall = function(context, ...args) {
  context = context || window;
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};
```

### new操作符原理
```javascript
// 1. 创建空对象
// 2. 设置原型链
// 3. 绑定this
// 4. 返回对象
function myNew(Constructor, ...args) {
  const obj = Object.create(Constructor.prototype);
  const result = Constructor.apply(obj, args);
  return result instanceof Object ? result : obj;
}
```

### 防抖节流原理
```javascript
// 防抖：延迟执行，重复调用重置定时器
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 节流：固定时间间隔执行
function throttle(fn, delay) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= delay) {
      fn.apply(this, args);
      last = now;
    }
  };
}
```

## 学习目标

- 理解JavaScript核心概念
- 掌握函数式编程思想
- 提升代码实现能力
- 为源码阅读打下基础

## 实践建议

1. **先理解原理** - 理解每个函数的设计思想
2. **手写实现** - 不看源码，自己实现
3. **对比优化** - 与标准实现对比，优化代码
4. **实际应用** - 在项目中应用这些工具函数

## 相关资源

- [JavaScript MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
- [ECMAScript规范](https://tc39.es/ecma262/)
- [Lodash源码](https://github.com/lodash/lodash) - 优秀的工具库实现 