# 函数相关手写实现

## 概述

函数相关的手写实现是深入理解JavaScript核心概念的重要方式。通过手写这些基础函数，可以更好地理解JavaScript的执行机制。

## call 方法实现

### 核心原理
`call` 方法的核心思想是将函数作为对象的属性调用，从而改变函数内部的 `this` 指向。

### 实现代码
```javascript
Function.prototype.myCall = function(context, ...args) {
  // 如果context为null或undefined，则指向全局对象
  context = context || window;
  
  // 将函数作为对象的属性
  context.fn = this;
  
  // 调用函数并获取返回值
  const result = context.fn(...args);
  
  // 删除临时属性，避免污染对象
  delete context.fn;
  
  return result;
};

// 测试
const obj = {
  name: 'test',
  age: 18
};

function sayHello(greeting) {
  console.log(`${greeting}, I'm ${this.name}, ${this.age} years old`);
}

sayHello.myCall(obj, 'Hello'); // Hello, I'm test, 18 years old
```

### 实现步骤
1. **参数处理**：如果 `context` 为 `null` 或 `undefined`，则指向全局对象
2. **属性绑定**：将函数作为 `context` 对象的属性
3. **函数调用**：使用扩展运算符传递参数并调用函数
4. **清理工作**：删除临时属性，避免污染对象
5. **返回结果**：返回函数执行的结果

## apply 方法实现

### 核心原理
`apply` 方法与 `call` 类似，但第二个参数是数组或类数组对象。

### 实现代码
```javascript
Function.prototype.myApply = function(context, args) {
  // 如果context为null或undefined，则指向全局对象
  context = context || window;
  
  // 将函数作为对象的属性
  context.fn = this;
  
  let result;
  
  // 处理参数
  if (args && Array.isArray(args)) {
    result = context.fn(...args);
  } else {
    result = context.fn();
  }
  
  // 删除临时属性
  delete context.fn;
  
  return result;
};

// 测试
const obj = {
  name: 'test',
  age: 18
};

function sayHello(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}, ${this.age} years old${punctuation}`);
}

sayHello.myApply(obj, ['Hello', '!']); // Hello, I'm test, 18 years old!
```

### 与 call 的区别
- `call` 接收多个参数：`func.call(context, arg1, arg2, ...)`
- `apply` 接收数组参数：`func.apply(context, [arg1, arg2, ...])`

## bind 方法实现

### 核心原理
`bind` 方法返回一个新函数，新函数的 `this` 指向被绑定的对象，并且可以预设参数。

### 实现代码
```javascript
Function.prototype.myBind = function(context, ...args1) {
  const fn = this;
  
  return function(...args2) {
    // 合并预设参数和调用时传入的参数
    const allArgs = [...args1, ...args2];
    
    // 使用apply调用原函数
    return fn.apply(context, allArgs);
  };
};

// 测试
const obj = {
  name: 'test',
  age: 18
};

function sayHello(greeting, punctuation, extra) {
  console.log(`${greeting}, I'm ${this.name}, ${this.age} years old${punctuation} ${extra}`);
}

const boundSayHello = sayHello.myBind(obj, 'Hello', '!');
boundSayHello('Nice to meet you'); // Hello, I'm test, 18 years old! Nice to meet you
```

### 高级实现（支持 new 操作符）
```javascript
Function.prototype.myBind = function(context, ...args1) {
  const fn = this;
  
  const boundFn = function(...args2) {
    const allArgs = [...args1, ...args2];
    
    // 如果使用new调用，则忽略绑定的this
    if (this instanceof boundFn) {
      return new fn(...allArgs);
    }
    
    return fn.apply(context, allArgs);
  };
  
  // 设置原型链
  boundFn.prototype = Object.create(fn.prototype);
  
  return boundFn;
};
```

## new 操作符实现

### 核心原理
`new` 操作符的执行过程：
1. 创建一个空对象
2. 设置原型链（将空对象的原型指向构造函数的原型）
3. 绑定 `this`（将构造函数的 `this` 指向空对象）
4. 返回对象（如果构造函数返回对象则返回该对象，否则返回创建的对象）

### 实现代码
```javascript
function myNew(Constructor, ...args) {
  // 1. 创建空对象
  const obj = {};
  
  // 2. 设置原型链
  Object.setPrototypeOf(obj, Constructor.prototype);
  
  // 3. 绑定this并执行构造函数
  const result = Constructor.apply(obj, args);
  
  // 4. 返回对象
  return result instanceof Object ? result : obj;
}

// 测试
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, I'm ${this.name}, ${this.age} years old`);
};

const person = myNew(Person, 'John', 25);
person.sayHello(); // Hello, I'm John, 25 years old
console.log(person instanceof Person); // true
```

### 使用 Object.create 的简化版本
```javascript
function myNew(Constructor, ...args) {
  // 使用Object.create创建对象并设置原型
  const obj = Object.create(Constructor.prototype);
  
  // 绑定this并执行构造函数
  const result = Constructor.apply(obj, args);
  
  // 返回对象
  return result instanceof Object ? result : obj;
}
```

## instanceof 操作符实现

### 核心原理
`instanceof` 操作符检查对象的原型链上是否存在构造函数的原型。

### 实现代码
```javascript
function myInstanceof(obj, Constructor) {
  // 基本类型直接返回false
  if (obj === null || typeof obj !== 'object') {
    return false;
  }
  
  // 获取对象的原型
  let proto = Object.getPrototypeOf(obj);
  
  // 沿着原型链向上查找
  while (proto) {
    // 如果找到构造函数的原型，返回true
    if (proto === Constructor.prototype) {
      return true;
    }
    // 继续向上查找
    proto = Object.getPrototypeOf(proto);
  }
  
  return false;
}

// 测试
function Person(name) {
  this.name = name;
}

const person = new Person('John');
console.log(myInstanceof(person, Person)); // true
console.log(myInstanceof(person, Object)); // true
console.log(myInstanceof(person, Array)); // false
console.log(myInstanceof('string', String)); // false
console.log(myInstanceof(null, Object)); // false
```

### 使用 __proto__ 的版本
```javascript
function myInstanceof(obj, Constructor) {
  if (obj === null || typeof obj !== 'object') {
    return false;
  }
  
  let proto = obj.__proto__;
  
  while (proto) {
    if (proto === Constructor.prototype) {
      return true;
    }
    proto = proto.__proto__;
  }
  
  return false;
}
```

## 实际应用场景

### 1. 函数柯里化
```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...moreArgs) {
      return curried.apply(this, args.concat(moreArgs));
    };
  };
}

// 使用示例
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1, 2, 3)); // 6
```

### 2. 函数组合
```javascript
function compose(...fns) {
  return function(x) {
    return fns.reduceRight((acc, fn) => fn(acc), x);
  };
}

// 使用示例
const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;
const square = x => x * x;

const composed = compose(square, multiplyByTwo, addOne);
console.log(composed(3)); // ((3 + 1) * 2)² = 64
```

### 3. 防抖和节流
```javascript
// 防抖
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 节流
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

## 性能优化

### 1. 缓存函数结果
```javascript
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// 使用示例
const expensiveFunction = memoize(function(n) {
  console.log('Computing...');
  return n * 2;
});

console.log(expensiveFunction(5)); // Computing... 10
console.log(expensiveFunction(5)); // 10 (from cache)
```

### 2. 函数重载
```javascript
function overload(fn, ...overloads) {
  return function(...args) {
    const signature = args.map(arg => typeof arg).join(',');
    
    for (let overload of overloads) {
      if (overload.signature === signature) {
        return overload.fn.apply(this, args);
      }
    }
    
    return fn.apply(this, args);
  };
}

// 使用示例
const processData = overload(
  function(data) {
    console.log('Default processing:', data);
  },
  {
    signature: 'string',
    fn: function(str) {
      console.log('String processing:', str.toUpperCase());
    }
  },
  {
    signature: 'number',
    fn: function(num) {
      console.log('Number processing:', num * 2);
    }
  }
);

processData('hello'); // String processing: HELLO
processData(5); // Number processing: 10
processData(true); // Default processing: true
```

## 学习建议

1. **理解原理** - 先理解每个函数的设计思想和执行机制
2. **手写实现** - 不看源码，自己实现这些函数
3. **测试验证** - 编写测试用例验证实现的正确性
4. **性能分析** - 分析实现的性能特点
5. **实际应用** - 在项目中应用这些工具函数

## 相关资源

- [MDN Function.prototype.call()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
- [MDN Function.prototype.apply()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
- [MDN Function.prototype.bind()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
- [JavaScript 深入之 call 和 apply 的模拟实现](https://github.com/mqyqingfeng/Blog/issues/11) 