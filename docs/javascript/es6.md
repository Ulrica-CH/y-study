# ES6+特性

## 概述

ES6（ECMAScript 2015）是JavaScript的重要版本，引入了许多新特性。后续版本（ES7、ES8等）统称为ES6+，继续为JavaScript添加新功能。

## 变量声明

### let 和 const
```javascript
// let - 块级作用域变量
let x = 1;
if (true) {
  let x = 2; // 不同的变量
  console.log(x); // 2
}
console.log(x); // 1

// const - 常量声明
const PI = 3.14159;
// PI = 3.14; // TypeError: Assignment to constant variable

// const对象可以修改属性
const person = { name: 'John' };
person.name = 'Jane'; // 允许
// person = {}; // TypeError
```

### 暂时性死区 (Temporal Dead Zone)
```javascript
console.log(x); // ReferenceError
let x = 5;

// 与var的区别
console.log(y); // undefined
var y = 5;
```

## 箭头函数

### 基本语法
```javascript
// 传统函数
function add(a, b) {
  return a + b;
}

// 箭头函数
const add = (a, b) => a + b;

// 多行箭头函数
const multiply = (a, b) => {
  const result = a * b;
  return result;
};

// 单个参数可以省略括号
const square = x => x * x;

// 无参数需要括号
const getRandom = () => Math.random();
```

### this绑定
```javascript
// 传统函数中的this
const obj = {
  name: 'obj',
  traditional: function() {
    setTimeout(function() {
      console.log(this.name); // undefined
    }, 100);
  },
  arrow: function() {
    setTimeout(() => {
      console.log(this.name); // 'obj'
    }, 100);
  }
};

obj.traditional();
obj.arrow();
```

## 解构赋值

### 数组解构
```javascript
const numbers = [1, 2, 3, 4, 5];

// 基本解构
const [a, b, c] = numbers;
console.log(a, b, c); // 1, 2, 3

// 跳过元素
const [first, , third] = numbers;
console.log(first, third); // 1, 3

// 默认值
const [x, y, z = 0] = [1, 2];
console.log(x, y, z); // 1, 2, 0

// 剩余元素
const [head, ...tail] = numbers;
console.log(head, tail); // 1, [2, 3, 4, 5]
```

### 对象解构
```javascript
const person = {
  name: 'John',
  age: 30,
  city: 'New York'
};

// 基本解构
const { name, age } = person;
console.log(name, age); // 'John', 30

// 重命名
const { name: personName, age: personAge } = person;
console.log(personName, personAge); // 'John', 30

// 默认值
const { name, age, country = 'USA' } = person;
console.log(country); // 'USA'

// 嵌套解构
const user = {
  id: 1,
  profile: {
    name: 'John',
    email: 'john@example.com'
  }
};

const { profile: { name, email } } = user;
console.log(name, email); // 'John', 'john@example.com'
```

## 模板字符串

### 基本用法
```javascript
const name = 'John';
const age = 30;

// 传统字符串拼接
const message1 = 'Hello, ' + name + '. You are ' + age + ' years old.';

// 模板字符串
const message2 = `Hello, ${name}. You are ${age} years old.`;

// 多行字符串
const multiLine = `
  This is a
  multi-line
  string
`;
```

### 标签模板
```javascript
function highlight(strings, ...values) {
  let result = '';
  strings.forEach((string, i) => {
    result += string;
    if (i < values.length) {
      result += `<span class="highlight">${values[i]}</span>`;
    }
  });
  return result;
}

const name = 'John';
const age = 30;
const output = highlight`Hello, ${name}. You are ${age} years old.`;
// 输出: "Hello, <span class="highlight">John</span>. You are <span class="highlight">30</span> years old."
```

## 扩展运算符

### 数组扩展
```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// 合并数组
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// 复制数组
const copy = [...arr1];
console.log(copy); // [1, 2, 3]

// 在特定位置插入
const inserted = [...arr1, 10, ...arr2];
console.log(inserted); // [1, 2, 3, 10, 4, 5, 6]
```

### 对象扩展
```javascript
const obj1 = { name: 'John', age: 30 };
const obj2 = { city: 'New York', country: 'USA' };

// 合并对象
const combined = { ...obj1, ...obj2 };
console.log(combined); // { name: 'John', age: 30, city: 'New York', country: 'USA' }

// 复制对象
const copy = { ...obj1 };
console.log(copy); // { name: 'John', age: 30 }

// 覆盖属性
const updated = { ...obj1, age: 31 };
console.log(updated); // { name: 'John', age: 31 }
```

## 默认参数

### 函数默认参数
```javascript
function greet(name = 'Guest', greeting = 'Hello') {
  return `${greeting}, ${name}!`;
}

console.log(greet()); // "Hello, Guest!"
console.log(greet('John')); // "Hello, John!"
console.log(greet('John', 'Hi')); // "Hi, John!"

// 解构默认参数
function createUser({ name = 'Anonymous', age = 0, email = '' } = {}) {
  return { name, age, email };
}

console.log(createUser()); // { name: 'Anonymous', age: 0, email: '' }
console.log(createUser({ name: 'John', age: 30 })); // { name: 'John', age: 30, email: '' }
```

## 剩余参数

### 函数剩余参数
```javascript
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

// 与解构结合
function process(first, second, ...rest) {
  console.log('First:', first);
  console.log('Second:', second);
  console.log('Rest:', rest);
}

process(1, 2, 3, 4, 5);
// First: 1
// Second: 2
// Rest: [3, 4, 5]
```

## 类 (Class)

### 基本语法
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  sayHello() {
    console.log(`Hello, I'm ${this.name}`);
  }
  
  get info() {
    return `${this.name}, ${this.age} years old`;
  }
  
  set info(value) {
    [this.name, this.age] = value.split(', ');
  }
}

const person = new Person('John', 30);
person.sayHello(); // "Hello, I'm John"
console.log(person.info); // "John, 30 years old"
```

### 继承
```javascript
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }
  
  study() {
    console.log(`${this.name} is studying`);
  }
  
  sayHello() {
    super.sayHello();
    console.log(`I'm a student in grade ${this.grade}`);
  }
}

const student = new Student('Jane', 20, 12);
student.sayHello();
// "Hello, I'm Jane"
// "I'm a student in grade 12"
```

### 静态方法
```javascript
class MathUtils {
  static add(a, b) {
    return a + b;
  }
  
  static multiply(a, b) {
    return a * b;
  }
}

console.log(MathUtils.add(5, 3)); // 8
console.log(MathUtils.multiply(4, 6)); // 24
```

## 模块系统

### 导出 (Export)
```javascript
// 命名导出
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}

// 默认导出
export default class Calculator {
  add(a, b) {
    return a + b;
  }
}

// 批量导出
const utils = {
  formatDate: (date) => date.toISOString(),
  validateEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
};

export { utils };
```

### 导入 (Import)
```javascript
// 命名导入
import { PI, add } from './math.js';

// 默认导入
import Calculator from './calculator.js';

// 批量导入
import * as utils from './utils.js';

// 重命名导入
import { add as sum } from './math.js';

// 混合导入
import Calculator, { PI, add } from './math.js';
```

## Promise

### 基本用法
```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const random = Math.random();
    if (random > 0.5) {
      resolve('Success!');
    } else {
      reject('Error!');
    }
  }, 1000);
});

promise
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

### Promise链式调用
```javascript
function fetchUser(id) {
  return fetch(`/api/users/${id}`)
    .then(response => response.json());
}

function fetchUserPosts(userId) {
  return fetch(`/api/users/${userId}/posts`)
    .then(response => response.json());
}

fetchUser(1)
  .then(user => {
    console.log('User:', user);
    return fetchUserPosts(user.id);
  })
  .then(posts => {
    console.log('Posts:', posts);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### Promise.all 和 Promise.race
```javascript
// Promise.all - 等待所有Promise完成
const promises = [
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
];

Promise.all(promises)
  .then(responses => {
    console.log('All requests completed');
  })
  .catch(error => {
    console.error('One of the requests failed');
  });

// Promise.race - 返回最先完成的Promise
Promise.race([
  fetch('/api/slow'),
  fetch('/api/fast')
])
  .then(response => {
    console.log('Fastest request completed');
  });
```

## 生成器 (Generator)

### 基本语法
```javascript
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = numberGenerator();
console.log(generator.next()); // { value: 1, done: false }
console.log(generator.next()); // { value: 2, done: false }
console.log(generator.next()); // { value: 3, done: false }
console.log(generator.next()); // { value: undefined, done: true }
```

### 异步生成器
```javascript
async function* asyncGenerator() {
  yield await fetch('/api/data1');
  yield await fetch('/api/data2');
  yield await fetch('/api/data3');
}

for await (const response of asyncGenerator()) {
  const data = await response.json();
  console.log(data);
}
```

## 迭代器 (Iterator)

### 自定义迭代器
```javascript
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  
  *[Symbol.iterator]() {
    for (let i = this.start; i <= this.end; i++) {
      yield i;
    }
  }
}

const range = new Range(1, 5);
for (const num of range) {
  console.log(num); // 1, 2, 3, 4, 5
}
```

## Map 和 Set

### Map
```javascript
const map = new Map();

// 设置值
map.set('name', 'John');
map.set('age', 30);

// 获取值
console.log(map.get('name')); // 'John'

// 检查键是否存在
console.log(map.has('age')); // true

// 删除键
map.delete('age');

// 获取大小
console.log(map.size); // 1

// 遍历
map.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});
```

### Set
```javascript
const set = new Set();

// 添加值
set.add(1);
set.add(2);
set.add(2); // 重复值会被忽略

// 检查值是否存在
console.log(set.has(1)); // true

// 删除值
set.delete(1);

// 获取大小
console.log(set.size); // 1

// 遍历
set.forEach(value => {
  console.log(value);
});
```

## Proxy 和 Reflect

### Proxy
```javascript
const target = {
  name: 'John',
  age: 30
};

const handler = {
  get(target, property) {
    console.log(`Getting property: ${property}`);
    return target[property];
  },
  
  set(target, property, value) {
    console.log(`Setting property: ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);

console.log(proxy.name); // "Getting property: name" -> "John"
proxy.age = 31; // "Setting property: age to 31"
```

### Reflect
```javascript
const obj = { name: 'John' };

// 获取属性
console.log(Reflect.get(obj, 'name')); // 'John'

// 设置属性
Reflect.set(obj, 'age', 30);

// 检查属性是否存在
console.log(Reflect.has(obj, 'name')); // true

// 删除属性
Reflect.deleteProperty(obj, 'age');

// 获取所有属性名
console.log(Reflect.ownKeys(obj)); // ['name']
```

## 学习建议

1. **循序渐进** - 从基础特性开始学习
2. **实践应用** - 在项目中应用新特性
3. **兼容性考虑** - 注意浏览器兼容性
4. **性能优化** - 合理使用新特性提升性能
5. **持续关注** - 关注ES新版本的新特性

## 相关资源

- [ECMAScript规范](https://tc39.es/ecma262/)
- [MDN ES6指南](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide)
- [Babel文档](https://babeljs.io/docs/) 