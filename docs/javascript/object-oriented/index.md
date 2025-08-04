# JavaScript/TypeScript 类修饰符与静态方法详解

## 目录
- [构造函数模式](#构造函数模式)
- [ES6 Class 语法](#es6-class-语法)
- [TypeScript 类系统](#typescript-类系统)
- [面试重点总结](#面试重点总结)

## 构造函数模式

### 1. 基本概念

构造函数是 JavaScript 中创建对象的传统方式，通过 `new` 关键字调用。

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.sayHello = function() {
    console.log(`Hello, I'm ${this.name}`);
};

const person = new Person('John', 30);
```

### 2. 静态成员

#### 静态属性
```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// 静态属性 - 直接挂载在构造函数上
Person.count = 0;
Person.MAX_AGE = 150;

// 静态方法
Person.create = function(name, age) {
    Person.count++;
    return new Person(name, age);
};

Person.getCount = function() {
    return Person.count;
};
```

#### 访问方式
```javascript
// 静态成员访问
console.log(Person.count);  // 0
console.log(Person.MAX_AGE);  // 150
const person = Person.create('John', 30);  // 调用静态方法
console.log(Person.getCount());  // 1

// 实例成员访问
person.sayHello();  // 调用实例方法
console.log(person.name);  // 访问实例属性
```

### 3. 私有成员实现

#### 约定私有（下划线前缀）
```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
    this._privateData = 'private';  // 约定私有
}

Person.prototype._privateMethod = function() {
    console.log('private method');
};

Person.prototype.publicMethod = function() {
    this._privateMethod();  // 内部可以访问
    return this._privateData;
};
```

#### Symbol 实现私有
```javascript
const _privateData = Symbol('privateData');
const _privateMethod = Symbol('privateMethod');

function Person(name, age) {
    this.name = name;
    this.age = age;
    this[_privateData] = 'private';
}

Person.prototype[_privateMethod] = function() {
    console.log('private method');
};

Person.prototype.publicMethod = function() {
    this[_privateMethod]();  // 内部可以访问
    return this[_privateData];
};
```

#### WeakMap 实现私有
```javascript
const privateData = new WeakMap();

function Person(name, age) {
    this.name = name;
    this.age = age;
    
    privateData.set(this, {
        privateField: 'private',
        privateMethod: () => console.log('private method')
    });
}

Person.prototype.publicMethod = function() {
    const data = privateData.get(this);
    data.privateMethod();  // 内部可以访问
    return data.privateField;
};
```

### 4. 继承实现

#### 原型链继承
```javascript
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    console.log(`${this.name} makes a sound`);
};

function Dog(name, breed) {
    Animal.call(this, name);  // 调用父构造函数
    this.breed = breed;
}

// 设置原型链
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
    console.log(`${this.name} barks`);
};
```

## ES6 Class 语法

### 1. 基本语法

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    sayHello() {
        console.log(`Hello, I'm ${this.name}`);
    }
}
```

### 2. 静态成员

#### 静态属性和方法
```javascript
class Person {
    // 静态属性
    static count = 0;
    static MAX_AGE = 150;
    
    constructor(name, age) {
        this.name = name;
        this.age = age;
        Person.count++;
    }
    
    // 静态方法
    static create(name, age) {
        return new Person(name, age);
    }
    
    static getCount() {
        return Person.count;
    }
    
    // 实例方法
    sayHello() {
        console.log(`Hello, I'm ${this.name}`);
    }
}
```

#### 静态成员的特点
```javascript
// 访问方式
console.log(Person.count);  // 0
console.log(Person.MAX_AGE);  // 150
const person = Person.create('John', 30);
console.log(Person.getCount());  // 1

// 静态成员属于类本身，不属于实例
console.log(person.count);  // undefined
console.log(person.create);  // undefined
```

### 3. 私有成员

#### ES2022 私有字段（推荐）
```javascript
class Person {
    #privateField = 'private';  // 私有字段
    #privateMethod() {  // 私有方法
        console.log('private method');
    }
    
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.#privateField = 'initialized';  // 内部可以访问
    }
    
    publicMethod() {
        this.#privateMethod();  // 内部可以访问
        return this.#privateField;
    }
}

const person = new Person('John', 30);
// person.#privateField;  // ❌ 语法错误，外部无法访问
// person.#privateMethod();  // ❌ 语法错误，外部无法访问
console.log(person.publicMethod());  // ✅ 通过公共方法访问
```

#### 私有字段的特点
```javascript
class Example {
    #field1 = 'private1';
    #field2 = 'private2';
    
    constructor() {
        this.#field1 = 'modified';  // ✅ 可以修改
        this.#field2 = this.#field1;  // ✅ 可以访问其他私有字段
    }
    
    method() {
        return this.#field1;  // ✅ 方法内可以访问
    }
}

// 继承中的私有字段
class Parent {
    #parentPrivate = 'parent';
}

class Child extends Parent {
    #childPrivate = 'child';
    
    constructor() {
        super();
        // console.log(this.#parentPrivate);  // ❌ 无法访问父类私有字段
        console.log(this.#childPrivate);  // ✅ 可以访问自己的私有字段
    }
}
```

### 4. 继承

#### extends 关键字
```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        console.log(`${this.name} makes a sound`);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);  // 调用父类构造函数
        this.breed = breed;
    }
    
    bark() {
        console.log(`${this.name} barks`);
    }
    
    speak() {
        super.speak();  // 调用父类方法
        this.bark();
    }
}
```

#### 静态成员继承
```javascript
class Animal {
    static count = 0;
    
    static create(name) {
        Animal.count++;
        return new Animal(name);
    }
}

class Dog extends Animal {
    static dogCount = 0;
    
    static create(name, breed) {
        Dog.dogCount++;
        const dog = new Dog(name, breed);
        return dog;
    }
}

console.log(Dog.count);  // 0 - 继承父类静态属性
console.log(Dog.dogCount);  // 0 - 自己的静态属性
```

### 5. getter 和 setter

```javascript
class Person {
    constructor(name, age) {
        this._name = name;
        this._age = age;
    }
    
    get name() {
        return this._name;
    }
    
    set name(value) {
        if (typeof value === 'string' && value.length > 0) {
            this._name = value;
        }
    }
    
    get age() {
        return this._age;
    }
    
    set age(value) {
        if (value >= 0 && value <= 150) {
            this._age = value;
        }
    }
}

const person = new Person('John', 30);
console.log(person.name);  // 'John'
person.name = 'Jane';  // 调用 setter
console.log(person.name);  // 'Jane'
```

## TypeScript 类系统

### 1. 基本语法

```typescript
class Person {
    name: string;
    age: number;
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    
    sayHello(): void {
        console.log(`Hello, I'm ${this.name}`);
    }
}
```

### 2. 访问修饰符

#### public（默认）
```typescript
class Person {
    public name: string;  // 显式声明 public
    age: number;  // 默认是 public
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    
    public sayHello(): void {
        console.log(`Hello, I'm ${this.name}`);
    }
}

const person = new Person('John', 30);
console.log(person.name);  // ✅ 可以访问
console.log(person.age);   // ✅ 可以访问
person.sayHello();         // ✅ 可以调用
```

#### private
```typescript
class Person {
    private _privateField: string = 'private';
    
    constructor(name: string) {
        this.name = name;
        this._privateField = 'modified';  // ✅ 内部可以访问
    }
    
    private _privateMethod(): void {
        console.log('private method');
    }
    
    publicMethod(): void {
        this._privateMethod();  // ✅ 内部可以访问
        console.log(this._privateField);
    }
}

const person = new Person('John');
person.publicMethod();  // ✅ 可以调用公共方法
// person._privateField;  // ❌ 编译错误，外部无法访问
// person._privateMethod();  // ❌ 编译错误，外部无法访问
```

#### protected
```typescript
class Animal {
    protected name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    protected makeSound(): void {
        console.log(`${this.name} makes a sound`);
    }
}

class Dog extends Animal {
    constructor(name: string) {
        super(name);
        console.log(this.name);  // ✅ 子类可以访问 protected 成员
    }
    
    bark(): void {
        this.makeSound();  // ✅ 子类可以调用 protected 方法
        console.log(`${this.name} barks`);
    }
}

const dog = new Dog('Buddy');
dog.bark();  // ✅ 可以调用公共方法
// dog.name;  // ❌ 编译错误，外部无法访问 protected 成员
// dog.makeSound();  // ❌ 编译错误，外部无法访问 protected 方法
```

#### readonly
```typescript
class Person {
    readonly id: number;
    readonly name: string;
    
    constructor(id: number, name: string) {
        this.id = id;  // ✅ 构造函数中可以赋值
        this.name = name;
    }
    
    changeName(newName: string): void {
        // this.name = newName;  // ❌ 编译错误，readonly 不能修改
    }
}

const person = new Person(1, 'John');
// person.id = 2;  // ❌ 编译错误，readonly 不能修改
console.log(person.id);  // ✅ 可以读取
```

### 3. 静态成员

```typescript
class Database {
    private static instance: Database | null = null;
    private static connectionCount: number = 0;
    
    private constructor() {}
    
    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    
    public static getConnectionCount(): number {
        return Database.connectionCount;
    }
    
    public connect(): void {
        Database.connectionCount++;
        console.log('Connected to database');
    }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2);  // true - 单例模式
console.log(Database.getConnectionCount());  // 0
```

### 4. 抽象类

```typescript
abstract class Animal {
    protected name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    abstract makeSound(): void;  // 抽象方法
    
    move(): void {
        console.log(`${this.name} is moving`);
    }
}

class Dog extends Animal {
    constructor(name: string) {
        super(name);
    }
    
    makeSound(): void {  // 必须实现抽象方法
        console.log(`${this.name} barks`);
    }
}

class Cat extends Animal {
    constructor(name: string) {
        super(name);
    }
    
    makeSound(): void {  // 必须实现抽象方法
        console.log(`${this.name} meows`);
    }
}

// const animal = new Animal('Animal');  // ❌ 编译错误，抽象类不能实例化
const dog = new Dog('Buddy');
const cat = new Cat('Whiskers');
```

### 5. 接口实现

```typescript
interface Vehicle {
    start(): void;
    stop(): void;
    getSpeed(): number;
}

class Car implements Vehicle {
    private speed: number = 0;
    
    start(): void {
        console.log('Car started');
        this.speed = 0;
    }
    
    stop(): void {
        console.log('Car stopped');
        this.speed = 0;
    }
    
    getSpeed(): number {
        return this.speed;
    }
    
    accelerate(): void {
        this.speed += 10;
    }
}

const car = new Car();
car.start();
car.accelerate();
console.log(car.getSpeed());  // 10
car.stop();
```

### 6. 泛型类

```typescript
class Container<T> {
    private value: T;
    
    constructor(value: T) {
        this.value = value;
    }
    
    getValue(): T {
        return this.value;
    }
    
    setValue(value: T): void {
        this.value = value;
    }
}

const numberContainer = new Container<number>(123);
const stringContainer = new Container<string>('hello');

console.log(numberContainer.getValue());  // 123
console.log(stringContainer.getValue());  // 'hello'
```

## 面试重点总结

### 1. 核心概念对比

| 特性 | 构造函数 | ES6 Class | TypeScript |
|------|----------|-----------|------------|
| 静态成员 | `Constructor.prop` | `static prop` | `static prop: type` |
| 私有成员 | Symbol/WeakMap | `#` 语法 | `private` 修饰符 |
| 继承 | 原型链 | `extends` | `extends` + 接口 |
| 类型检查 | ❌ | ❌ | ✅ |
| 访问控制 | ❌ | ❌ | ✅ |

### 2. 静态成员特点

- **属于类本身**，不属于实例
- **在内存中只有一份**，所有实例共享
- **可以通过类名直接访问**
- **常用于工具方法、单例模式、配置信息**

### 3. 私有成员实现方式

#### JavaScript
- **约定私有**：下划线前缀（无强制限制）
- **Symbol 私有**：通过 Symbol 键访问
- **WeakMap 私有**：通过 WeakMap 存储
- **ES2022 私有字段**：`#` 语法（真正的私有）

#### TypeScript
- **private 修饰符**：编译时检查
- **protected 修饰符**：子类可访问
- **readonly 修饰符**：只读属性

### 4. 继承机制

#### 原型链继承
```javascript
function Parent() {}
function Child() {}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
```

#### Class 继承
```javascript
class Child extends Parent {
    constructor() {
        super();  // 必须调用
    }
}
```

### 5. 设计模式应用

#### 单例模式
```typescript
class Singleton {
    private static instance: Singleton | null = null;
    
    private constructor() {}
    
    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}
```

#### 工厂模式
```typescript
abstract class Creator {
    abstract factoryMethod(): Product;
    
    someOperation(): string {
        const product = this.factoryMethod();
        return product.operation();
    }
}
```

### 6. 性能考虑

- **静态成员**：内存效率高，适合工具方法
- **私有成员**：封装性好，减少命名冲突
- **继承**：避免过度继承，使用组合优于继承
- **TypeScript**：编译时检查，运行时无额外开销

### 7. 最佳实践

- **优先使用 TypeScript**：类型安全和更好的开发体验
- **合理使用访问修饰符**：提高代码封装性
- **避免过度设计**：根据实际需求选择合适的方式
- **注意兼容性**：考虑目标环境的支持情况

这些知识点是前端面试中的重点内容，掌握好这些概念对于理解面向对象编程和现代 JavaScript/TypeScript 开发非常重要。