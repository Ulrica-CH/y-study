## type interface

- type 类型别名
  - 更适合联合类型
  - 更适合交叉类型

```typescript
// ✅ type 更适合联合类型
type Status = "loading" | "success" | "error";
type ID = string | number;

// ✅ type 更适合交叉类型
type AdminUser = User & { permissions: string[] };
type GuestUser = User & { guestId: string };

// ✅ interface 可以扩展联合类型
interface AdminUser extends User {
  permissions: string[];
}
```

- 计算属性和映射类型

```typescript
// ✅ type 支持计算属性
type Keys = "name" | "age" | "email";
type UserRecord = {
  [K in Keys]: string;
};

// ✅ type 支持条件类型
type NonNullable<T> = T extends null | undefined ? never : T;
type StringOrNumber<T> = T extends string ? string : number;

// ❌ interface 不支持这些高级特性
interface UserRecord {
  // 无法使用映射类型
}
```

- interface 接口
  - interface 支持声明合并

```typescript
interface User {
  name: string;
}

interface User {
  age: number;
}

// 结果：User 包含 name 和 age
const user: User = {
  name: "Alice",
  age: 25,
};
```

- 函数类型定义

```typescript
// ✅ interface 定义函数类型
interface SearchFunc {
  (source: string, subString: string): boolean;
}

// ✅ type 定义函数类型
type SearchFunc = (source: string, subString: string) => boolean;

// 使用
const mySearch: SearchFunc = (source, subString) => {
  return source.includes(subString);
};
```

- 使用 interface 当：
  - 定义对象结构
  - 需要声明合并
  - 定义类或函数签名
  - 需要扩展其他接口
- 使用 type 当：
  - 定义联合类型
  - 定义交叉类型
  - 定义工具类型
  - 定义字面量类型
  - 需要条件类型或映射类型

## 字面量类型

- 字面量类型是指具体的值作为类型，而不是值的范围。

```typescript
// 字面量类型
type Status = "success" | "error" | "loading";
type Number = 1 | 2 | 3 | 4 | 5;
type Boolean = true | false;
```

## is

- is 用于创建类型谓词函数，帮助 TypeScript 在运行时进行类型检查。
  - 写一个函数，检查某个值是否符合某个类型
  - 在函数返回值后面加上 is 类型名
  - TypeScript 就会相信：如果这个函数返回 true，那这个值就是那个类型
  - 就像 instanceof 一样，但是可以自定义检查逻辑！

```typescript
function isString(value: unknown): boolean {
  return typeof value === "string";
}

function process(value: unknown) {
  if (isString(value)) {
    // TypeScript 还是不知道 value 是 string
    console.log(value.length); // ❌ 错误：value 还是 unknown 类型
  }
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function process(value: unknown) {
  if (isString(value)) {
    // TypeScript 现在知道 value 是 string
    console.log(value.length); // ✅ 正确：value 是 string 类型
  }
}
```

## 类的修饰符

我来为您详细解释 TypeScript 中的访问修饰符（Access Modifiers）：

Read file: plan/notes.md
TypeScript 中的访问修饰符用于控制类成员的访问权限，主要有以下几种：

## 1. **public**（公共）

- **默认访问级别**，如果不指定修饰符，成员就是 public
- 可以在任何地方访问（类内部、外部、子类等）
- 最开放的访问权限

```typescript
class Person {
  public name: string; // 显式声明为 public
  age: number; // 默认也是 public

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const person = new Person("张三", 25);
console.log(person.name); // ✅ 可以访问
console.log(person.age); // ✅ 可以访问
```

## 2. **private**（私有）

- 只能在**声明它的类内部**访问
- 子类、外部都无法访问
- 提供最强的封装性

```typescript
class BankAccount {
  private balance: number = 0;

  deposit(amount: number) {
    this.balance += amount; // ✅ 类内部可以访问
  }

  getBalance() {
    return this.balance; // ✅ 类内部可以访问
  }
}

const account = new BankAccount();
account.deposit(100);
console.log(account.getBalance()); // ✅ 通过公共方法访问
// console.log(account.balance); // ❌ 编译错误，外部无法直接访问
```

## 3. **protected**（受保护）

- 可以在**声明它的类内部**和**子类**中访问
- 外部无法访问
- 介于 public 和 private 之间

```typescript
class Animal {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  protected makeSound() {
    console.log("Some sound");
  }
}

class Dog extends Animal {
  bark() {
    console.log(`${this.name} barks!`); // ✅ 子类可以访问 protected 成员
    this.makeSound(); // ✅ 子类可以访问 protected 方法
  }
}

const dog = new Dog("旺财");
dog.bark(); // ✅ 可以调用公共方法
// console.log(dog.name); // ❌ 编译错误，外部无法访问 protected 成员
// dog.makeSound(); // ❌ 编译错误，外部无法访问 protected 方法
```

## 4. **readonly**（只读）

- 虽然不是访问修饰符，但经常与访问修饰符一起使用
- 属性只能在声明时或构造函数中赋值，之后不能修改

```typescript
class User {
  readonly id: number;
  public readonly email: string;

  constructor(id: number, email: string) {
    this.id = id; // ✅ 构造函数中可以赋值
    this.email = email;
  }

  updateEmail(newEmail: string) {
    // this.email = newEmail; // ❌ 编译错误，readonly 属性不能修改
  }
}
```

## 5. **static**（静态）

- 属于类本身，而不是实例
- 可以通过类名直接访问，不需要创建实例

```typescript
class MathUtils {
  public static PI: number = 3.14159;
  private static instance: MathUtils;

  public static getInstance(): MathUtils {
    if (!MathUtils.instance) {
      MathUtils.instance = new MathUtils();
    }
    return MathUtils.instance;
  }

  public static add(a: number, b: number): number {
    return a + b;
  }
}

console.log(MathUtils.PI); // ✅ 通过类名访问静态属性
console.log(MathUtils.add(1, 2)); // ✅ 通过类名访问静态方法
```

## 6. **abstract**（抽象）

- 用于抽象类和抽象方法
- 抽象类不能被实例化，只能被继承
- 抽象方法必须在子类中实现

```typescript
abstract class Shape {
  protected color: string;

  constructor(color: string) {
    this.color = color;
  }

  abstract getArea(): number; // 抽象方法，子类必须实现
  abstract getPerimeter(): number;

  public getColor(): string {
    return this.color; // 具体方法
  }
}

class Circle extends Shape {
  private radius: number;

  constructor(color: string, radius: number) {
    super(color);
    this.radius = radius;
  }

  getArea(): number {
    // ✅ 必须实现抽象方法
    return Math.PI * this.radius * this.radius;
  }

  getPerimeter(): number {
    // ✅ 必须实现抽象方法
    return 2 * Math.PI * this.radius;
  }
}

// const shape = new Shape("red"); // ❌ 编译错误，抽象类不能实例化
const circle = new Circle("red", 5); // ✅ 可以实例化具体类
```

## 总结

| 修饰符      | 类内部 | 子类 | 外部 | 说明                      |
| ----------- | ------ | ---- | ---- | ------------------------- |
| `public`    | ✅     | ✅   | ✅   | 默认，任何地方都可访问    |
| `private`   | ✅     | ❌   | ❌   | 只能在类内部访问          |
| `protected` | ✅     | ✅   | ❌   | 类内部和子类可访问        |
| `readonly`  | -      | -    | -    | 只读属性，不能修改        |
| `static`    | -      | -    | -    | 属于类本身，不依赖实例    |
| `abstract`  | -      | -    | -    | 抽象类/方法，需要子类实现 |

## extends

- 一个类只能继承一个父类（单继承）
- 接口可以继承多个接口
- 类可以实现多个接口

- super() - 在子类构造函数中调用父类构造函数
- super.methodName() - 调用父类方法
- super.propertyName - 访问父类属性
