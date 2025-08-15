# JavaScript 基础

## 概述

JavaScript 是一种动态类型、解释型的编程语言，是Web开发的核心技术之一。

## 核心概念

### 变量和数据类型
```javascript
// 变量声明
let name = "张三";
const age = 25;
var oldWay = "不推荐";

// 数据类型
let string = "字符串";
let number = 42;
let boolean = true;
let array = [1, 2, 3];
let object = { name: "张三", age: 25 };
let nullValue = null;
let undefinedValue = undefined;
```

### 函数
```javascript
// 函数声明
function greet(name) {
    return `Hello, ${name}!`;
}

// 函数表达式
const greetArrow = (name) => `Hello, ${name}!`;

// 默认参数
function createUser(name = "匿名", age = 18) {
    return { name, age };
}
```

### DOM操作
```javascript
// 选择元素
const element = document.getElementById('myId');
const elements = document.querySelectorAll('.myClass');

// 修改内容
element.textContent = "新文本";
element.innerHTML = "<span>HTML内容</span>";

// 事件监听
element.addEventListener('click', function(event) {
    console.log('点击了元素');
});
```

### 异步编程
```javascript
// Promise
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('数据获取成功');
        }, 1000);
    });
};

// async/await
async function getData() {
    try {
        const result = await fetchData();
        console.log(result);
    } catch (error) {
        console.error('错误:', error);
    }
}
```

## ES6+ 特性

### 解构赋值
```javascript
const user = { name: "张三", age: 25 };
const { name, age } = user;

const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;
```

### 模板字符串
```javascript
const name = "张三";
const message = `Hello, ${name}! 
今天是${new Date().toLocaleDateString()}`;
```

### 箭头函数
```javascript
const add = (a, b) => a + b;
const multiply = (a, b) => {
    const result = a * b;
    return result;
};
```

## 最佳实践

1. **使用严格模式** - `'use strict';`
2. **避免全局变量** - 使用模块化
3. **错误处理** - try-catch和Promise错误处理
4. **代码规范** - ESLint + Prettier

## 学习资源

- [ECMAScript规范](https://tc39.es/ecma262/)
- [MDN JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info/) 