# 设计模式

## 📋 目录导航

- [基础概念](#基础概念)
- [设计模式分类](#设计模式分类)
- [前端常用设计模式](#前端常用设计模式)
- [创建型模式](#创建型模式)
  - [单例模式](#单例模式)
  - [工厂模式](#工厂模式)
  - [抽象工厂模式](#抽象工厂模式)
  - [建造者模式](#建造者模式)
  - [原型模式](#原型模式)
- [结构型模式](#结构型模式)
  - [适配器模式](#适配器模式)
  - [装饰器模式](#装饰器模式)
  - [代理模式](#代理模式)
  - [外观模式](#外观模式)
  - [桥接模式](#桥接模式)
  - [组合模式](#组合模式)
  - [享元模式](#享元模式)
- [行为型模式](#行为型模式)
  - [观察者模式](#观察者模式)
  - [模板方法模式](#模板方法模式)
  - [策略模式](#策略模式)
  - [职责链模式](#职责链模式)
  - [命令模式](#命令模式)
  - [访问者模式](#访问者模式)
  - [状态模式](#状态模式)
  - [备忘录模式](#备忘录模式)
  - [迭代器模式](#迭代器模式)
  - [解释器模式](#解释器模式)

---

## 基础概念

设计模式是开发中解决问题的经典方案,不是代码,而是一种通用的思路,帮助提示代码的可维护性,可扩展性

## 设计模式分类

- **创建型 create**: 管理实例的创建,增加代码灵活性
- **结构型 structure**: 简化对象之间的复杂关系
- **行为型 behavior**: 简化对象之间的交互和职责分配

## 前端常用设计模式

### 🎯 最常用的设计模式

| 模式             | 使用频率   | 前端应用场景                       |
| ---------------- | ---------- | ---------------------------------- |
| **单例模式**     | ⭐⭐⭐⭐⭐ | 全局状态管理、路由管理、弹窗管理   |
| **观察者模式**   | ⭐⭐⭐⭐⭐ | 事件系统、数据绑定、组件通信       |
| **工厂模式**     | ⭐⭐⭐⭐   | 组件创建、插件系统、UI 组件库      |
| **策略模式**     | ⭐⭐⭐⭐   | 表单验证、支付方式、排序算法       |
| **代理模式**     | ⭐⭐⭐⭐   | 图片懒加载、缓存代理、权限控制     |
| **装饰器模式**   | ⭐⭐⭐     | 高阶组件、中间件、功能增强         |
| **适配器模式**   | ⭐⭐⭐     | API 适配、第三方库集成、兼容性处理 |
| **状态模式**     | ⭐⭐⭐     | 游戏状态、表单状态、工作流         |
| **命令模式**     | ⭐⭐       | 撤销重做、宏命令、快捷键           |
| **模板方法模式** | ⭐⭐       | 算法框架、生命周期钩子             |

### 🚀 前端框架中的设计模式

#### React 中的设计模式

- **组合模式**: JSX 组件树结构
- **观察者模式**: useState、useEffect 响应式更新
- **工厂模式**: React.createElement
- **代理模式**: React.memo、useMemo
- **装饰器模式**: HOC (高阶组件)
- **策略模式**: 条件渲染、路由匹配

#### Vue 中的设计模式

- **观察者模式**: 响应式系统、事件总线
- **代理模式**: Vue 3 Proxy 响应式
- **工厂模式**: Vue.component 注册
- **策略模式**: 指令系统、过滤器
- **装饰器模式**: 混入 (mixin)、插件系统

#### Angular 中的设计模式

- **依赖注入**: 服务管理
- **观察者模式**: RxJS Observable
- **策略模式**: 管道 (Pipe)
- **装饰器模式**: 装饰器语法
- **工厂模式**: 服务工厂

### 💡 实际开发建议

1. **优先使用简单模式**: 单例、观察者、工厂
2. **根据场景选择**: 不要为了用模式而用模式
3. **保持代码简洁**: 过度设计比不设计更糟糕
4. **团队统一**: 在团队中保持设计模式的一致性

## 创建型模式

### 创建型模式（5 种）

1. **单例模式** - 确保一个类只有一个实例
2. **工厂模式** - 封装对象创建过程
3. **抽象工厂模式** - 创建相关对象族
4. **建造者模式** - 分步骤构建复杂对象
5. **原型模式** - 通过克隆创建对象

### 结构型模式（7 种）

1. **适配器模式** - 让不兼容接口可以一起工作
2. **装饰器模式** - 动态添加功能
3. **代理模式** - 控制对象访问
4. **外观模式** - 简化复杂系统接口
5. **桥接模式** - 分离抽象和实现
6. **组合模式** - 处理树形结构
7. **享元模式** - 共享细粒度对象

### 行为型模式（11 种）

1. **观察者模式** - 一对多的依赖关系
2. **模板方法模式** - 定义算法骨架
3. **策略模式** - 封装可替换的算法
4. **职责链模式** - 链式处理请求
5. **命令模式** - 封装请求为对象
6. **访问者模式** - 在不改变类的前提下添加操作
7. **状态模式** - 对象状态改变行为
8. **备忘录模式** - 保存和恢复对象状态
9. **迭代器模式** - 顺序访问集合元素
10. **解释器模式** - 解释特定语法

### 创建型

#### 单例模式 {#单例模式}

保证一个类只有一个实例,并提供一个访问它的全局访问点

- 优点:
  - 全局只有一个实例,节省内存
  - 避免频繁创建和销毁实例,提高性能
  - 避免数据不一致,保证数据一致性
- 使用场景
  - 全剧状态管理
  - 数据库连接等
  - 全局 Loading 状态

```javascript
class Single {
  constructor() {}
}
Single.instance = null;
Single.getInstance = function () {
  if (!Single.instance) {
    Single.instance = new Single();
  }
  return Single.instance;
};

const single = Single.getInstance();
const single2 = Single.getInstance();
console.log(single === single2);
```

#### 工厂模式 {#工厂模式}

- 优点:
  - 将对象的创建和使用分离,降低耦合度
  - 提高代码的灵活性
  - 提高代码的复用性
- 使用场景
  - 对象的创建复杂,需要根据不同的条件创建不同的对象
  - 需要创建的对象类型较多,不方便管理

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

class PersonFactory {
  createPerson(name) {
    return new Person(name, 18);
  }
}

const personFactory = new PersonFactory();
const person = personFactory.createPerson("John");
const person2 = personFactory.createPerson("Jane");
/**
 * Person { name: 'John', age: 18 }
 * Person { name: 'Jane', age: 18 }
 */
console.log(person, person2);
```

#### 抽象工厂模式 {#抽象工厂模式}

创建一组相关或者相互依赖的对象时,抽象工厂模式能帮助我们统一创建流程,而不需要关心具体的实现

- 优点:
  - 针对多个产品族,提供一个统一的创建接口
  - 将客户端与具体的产品实现解耦
  - 确保了创建一整套相关联对象的流程简单统一
- 使用场景
  - 需要创建一组相关或者相互依赖的对象时
  - 需要统一创建流程,而不需要关心具体的实现

```javascript
class ProductA {
  constructor() {
    this.name = "ProductA";
  }
}

class ProductB {
  constructor() {
    this.name = "ProductB";
  }
}

class FactoryA {
  createProduct() {
    return new ProductA();
  }
}

class FactoryB {
  createProduct() {
    return new ProductB();
  }
}

function createProduct(factory) {
  return factory.createProduct();
}

const productA = createProduct(new FactoryA());
const productB = createProduct(new FactoryB());
/** ProductA { name: 'ProductA' } ProductB { name: 'ProductB' } */
console.log(productA, productB);
```

#### 建造者模式 {#建造者模式}

如果一个对象的创建需要依赖多个步骤和多个部分的时候,建造者模式可以通过逐步构建的方式来确保创建流程的清晰和可控,适用于复杂对象的创建,如动态表单等

- 优点:
  - 简化复杂对象的创建逻辑
  - 提供清晰的 API
  - 隐藏具体的复杂构建细节
  - 支持条件构建,利于拓展维护
- 使用场景
  - 复杂 UI 组件
  - 复杂表单

```javascript
// 如果直接构建 Form，会很复杂，要关系具体传递的复杂参数 不好扩展和条件判断
const form = new Form();
form.addField({ type: "text", label: "Name" });
form.addField({ type: "checkbox", label: "Subscribe" });
form.addField({ type: "select", label: "City", options: ["北京", "上海"] });

class Form {
  constructor() {
    this.fields = [];
  }

  addField(field) {
    this.fields.push(field);
  }

  getForm() {
    return this.fields;
  }
}

class FormBuilder {
  constructor() {
    this.form = new Form();
  }

  addTextField(label) {
    this.form.addField({ type: "text", label });
    return this;
  }

  addCheckboxField(label) {
    this.form.addField({ type: "checkbox", label });
    return this;
  }

  build() {
    return this.form;
  }
}

const formBuilder = new FormBuilder();
const form = formBuilder
  .addTextField("Name")
  .addCheckboxField("Subscribe")
  .build(); // 必须这样设计，设计如此

console.log(form.getForm()); // [{type: 'text', label: 'Name'}, {type: 'checkbox', label: 'Subscribe'}]
```

- 这个类似插件化思想

#### 原型模式 {#原型模式}

通过拷贝已有对象来避免重复的初始化操作

- 优点:

  - 避免重复的初始化操作
  - 提高性能

- 使用场景
  - 渲染大量类似的 UI 组件或者节点

```javascript
class Prototype {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  clone() {
    return new Prototype(this.name, this.age);
  }
}

const prototype = new Prototype("John", 18);
const prototype2 = prototype.clone();
console.log(prototype, prototype2);
```

## 结构型模式

#### 1. 适配器模式 {#适配器模式}

**解释**：将一个类的接口转换成客户希望的另外一个接口，使不兼容的接口可以一起工作。

**优点**：

- 让不兼容的接口可以一起工作
- 提高代码的复用性
- 降低系统耦合度

**使用场景**：

- 集成第三方库
- 新旧系统兼容
- 接口不匹配的情况

```javascript
// 旧接口
class OldInterface {
  specificRequest() {
    return "特殊请求";
  }
}

// 新接口
class NewInterface {
  request() {
    return "标准请求";
  }
}

// 适配器
class Adapter extends NewInterface {
  constructor(oldInterface) {
    super();
    this.oldInterface = oldInterface;
  }

  request() {
    const result = this.oldInterface.specificRequest();
    return `适配器: (转换) ${result}`;
  }
}

// 使用示例
const oldInterface = new OldInterface();
const adapter = new Adapter(oldInterface);
console.log(adapter.request()); // "适配器: (转换) 特殊请求"
```

#### 2. 装饰器模式 {#装饰器模式}

**解释**：动态地给对象添加新的功能，而不改变其结构。

**优点**：

- 动态扩展对象功能
- 比继承更灵活
- 符合开闭原则

**使用场景**：

- 需要动态添加功能
- 不想使用继承
- 功能组合复杂

```javascript
// 基础组件
class Coffee {
  cost() {
    return 10;
  }

  description() {
    return "简单咖啡";
  }
}

// 装饰器基类
class CoffeeDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost();
  }

  description() {
    return this.coffee.description();
  }
}

// 具体装饰器
class MilkDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 2;
  }

  description() {
    return this.coffee.description() + ", 加奶";
  }
}

class SugarDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 1;
  }

  description() {
    return this.coffee.description() + ", 加糖";
  }
}

// 使用示例
let coffee = new Coffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);

console.log(coffee.description()); // "简单咖啡, 加奶, 加糖"
console.log(coffee.cost()); // 13
```

#### 3. 代理模式 {#代理模式}

**解释**：为其他对象提供一种代理以控制对这个对象的访问。

**优点**：

- 控制对象访问
- 添加额外功能
- 延迟加载

**使用场景**：

- 远程代理
- 虚拟代理
- 保护代理
- 缓存代理

```javascript
// 真实对象
class RealImage {
  constructor(filename) {
    this.filename = filename;
    this.loadFromDisk();
  }

  loadFromDisk() {
    console.log(`加载图片: ${this.filename}`);
  }

  display() {
    console.log(`显示图片: ${this.filename}`);
  }
}

// 代理对象
class ProxyImage {
  constructor(filename) {
    this.filename = filename;
    this.realImage = null;
  }

  display() {
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }
}

// 使用示例
const image = new ProxyImage("test.jpg");
// 此时还没有加载图片
image.display(); // 加载图片: test.jpg, 显示图片: test.jpg
image.display(); // 显示图片: test.jpg (直接显示，不再加载)
```

#### 4. 外观模式 {#外观模式}

**解释**：为子系统中的一组接口提供一个一致的界面，外观模式定义了一个高层接口，这个接口使得子系统更加容易使用。

**优点**：

- 简化客户端调用
- 降低系统耦合度
- 提供统一接口

**使用场景**：

- 复杂系统简化
- 第三方库封装
- 子系统整合

```javascript
// 子系统
class CPU {
  freeze() {
    console.log("CPU 冻结");
  }
  jump(position) {
    console.log(`CPU 跳转到位置: ${position}`);
  }
  execute() {
    console.log("CPU 执行");
  }
}

class Memory {
  load(position, data) {
    console.log(`内存加载数据到位置: ${position}`);
  }
}

class HardDrive {
  read(lba, size) {
    console.log(`硬盘读取: LBA ${lba}, 大小 ${size}`);
  }
}

// 外观
class ComputerFacade {
  constructor() {
    this.cpu = new CPU();
    this.memory = new Memory();
    this.hardDrive = new HardDrive();
  }

  start() {
    this.cpu.freeze();
    this.memory.load(0, this.hardDrive.read(0, 1024));
    this.cpu.jump(0);
    this.cpu.execute();
  }
}

// 使用示例
const computer = new ComputerFacade();
computer.start();
```

#### 5. 桥接模式 {#桥接模式}

**解释**：将抽象部分与实现部分分离，使它们都可以独立地变化。

**优点**：

- 抽象和实现分离
- 提高系统可扩展性
- 减少继承层次

**使用场景**：

- 多维度变化
- 避免继承爆炸
- 抽象和实现需要独立变化

```javascript
// 实现接口
class DrawAPI {
  drawCircle(x, y, radius) {
    throw new Error("drawCircle method must be implemented");
  }
}

class RedCircle extends DrawAPI {
  drawCircle(x, y, radius) {
    console.log(`绘制红色圆形: 位置(${x}, ${y}), 半径 ${radius}`);
  }
}

class GreenCircle extends DrawAPI {
  drawCircle(x, y, radius) {
    console.log(`绘制绿色圆形: 位置(${x}, ${y}), 半径 ${radius}`);
  }
}

// 抽象类
class Shape {
  constructor(drawAPI) {
    this.drawAPI = drawAPI;
  }

  draw() {
    throw new Error("draw method must be implemented");
  }
}

class Circle extends Shape {
  constructor(x, y, radius, drawAPI) {
    super(drawAPI);
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw() {
    this.drawAPI.drawCircle(this.x, this.y, this.radius);
  }
}

// 使用示例
const redCircle = new Circle(100, 100, 10, new RedCircle());
const greenCircle = new Circle(100, 100, 10, new GreenCircle());

redCircle.draw();
greenCircle.draw();
```

#### 6. 组合模式 {#组合模式}

**解释**：将对象组合成树形结构以表示"部分-整体"的层次结构，使得用户对单个对象和组合对象的使用具有一致性。

**优点**：

- 统一处理单个对象和组合对象
- 简化客户端代码
- 容易添加新类型的组件

**使用场景**：

- 树形结构
- 文件系统
- UI 组件树

```javascript
// 组件接口
class Component {
  add(component) {
    throw new Error("add method must be implemented");
  }

  remove(component) {
    throw new Error("remove method must be implemented");
  }

  getChild(i) {
    throw new Error("getChild method must be implemented");
  }

  operation() {
    throw new Error("operation method must be implemented");
  }
}

// 叶子节点
class Leaf extends Component {
  constructor(name) {
    super();
    this.name = name;
  }

  operation() {
    console.log(`叶子节点: ${this.name}`);
  }
}

// 复合节点
class Composite extends Component {
  constructor(name) {
    super();
    this.name = name;
    this.children = [];
  }

  add(component) {
    this.children.push(component);
  }

  remove(component) {
    const index = this.children.indexOf(component);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  getChild(i) {
    return this.children[i];
  }

  operation() {
    console.log(`复合节点: ${this.name}`);
    this.children.forEach((child) => child.operation());
  }
}

// 使用示例
const root = new Composite("根节点");
const branch1 = new Composite("分支1");
const branch2 = new Composite("分支2");
const leaf1 = new Leaf("叶子1");
const leaf2 = new Leaf("叶子2");

root.add(branch1);
root.add(branch2);
branch1.add(leaf1);
branch2.add(leaf2);

root.operation();
```

#### 7. 享元模式 {#享元模式}

**解释**：运用共享技术有效地支持大量细粒度对象的复用。

**优点**：

- 减少内存使用
- 提高性能
- 支持大量对象

**使用场景**：

- 大量相似对象
- 内存敏感应用
- 对象池管理

```javascript
// 享元工厂
class FlyweightFactory {
  constructor() {
    this.flyweights = {};
  }

  getFlyweight(key) {
    if (!this.flyweights[key]) {
      this.flyweights[key] = new ConcreteFlyweight(key);
    }
    return this.flyweights[key];
  }

  getCount() {
    return Object.keys(this.flyweights).length;
  }
}

// 具体享元
class ConcreteFlyweight {
  constructor(intrinsicState) {
    this.intrinsicState = intrinsicState;
  }

  operation(extrinsicState) {
    console.log(`享元: ${this.intrinsicState}, 外部状态: ${extrinsicState}`);
  }
}

// 使用示例
const factory = new FlyweightFactory();

const flyweight1 = factory.getFlyweight("A");
const flyweight2 = factory.getFlyweight("A");
const flyweight3 = factory.getFlyweight("B");

flyweight1.operation("状态1");
flyweight2.operation("状态2");
flyweight3.operation("状态3");

console.log(factory.getCount()); // 2 (只有 A 和 B 两个享元对象)
```

## 行为型模式

#### 1. 观察者模式 {#观察者模式}

**解释**：定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。

**优点**：

- 支持广播通信
- 降低对象间耦合度
- 易于扩展和维护

**使用场景**：

- 事件处理系统
- 消息推送
- 数据绑定

```javascript
// 主题（被观察者）
class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

// 观察者
class Observer {
  constructor(name) {
    this.name = name;
  }

  update(data) {
    console.log(`${this.name} 收到通知: ${data}`);
  }
}

// 使用示例
const subject = new Subject();
const observer1 = new Observer("观察者1");
const observer2 = new Observer("观察者2");

subject.addObserver(observer1);
subject.addObserver(observer2);

subject.notify("数据更新了！");
```

#### 2. 模板方法模式 {#模板方法模式}

**解释**：定义一个操作中的算法骨架，将某些步骤延迟到子类中实现，使得子类可以不改变算法的结构即可重定义该算法的某些特定步骤。

**优点**：

- 代码复用
- 扩展性好
- 符合开闭原则

**使用场景**：

- 算法框架
- 工作流程
- 钩子函数

```javascript
// 抽象类
class Beverage {
  prepare() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    if (this.customerWantsCondiments()) {
      this.addCondiments();
    }
  }

  boilWater() {
    console.log("烧开水");
  }

  brew() {
    throw new Error("brew method must be implemented");
  }

  pourInCup() {
    console.log("倒入杯中");
  }

  addCondiments() {
    throw new Error("addCondiments method must be implemented");
  }

  customerWantsCondiments() {
    return true; // 钩子方法
  }
}

// 具体实现
class Coffee extends Beverage {
  brew() {
    console.log("用沸水冲泡咖啡");
  }

  addCondiments() {
    console.log("加入糖和牛奶");
  }
}

class Tea extends Beverage {
  brew() {
    console.log("用沸水浸泡茶叶");
  }

  addCondiments() {
    console.log("加入柠檬");
  }
}

// 使用示例
const coffee = new Coffee();
const tea = new Tea();

console.log("制作咖啡:");
coffee.prepare();

console.log("\n制作茶:");
tea.prepare();
```

#### 3. 策略模式 {#策略模式}

**解释**：定义一系列算法，把它们封装起来，并且使它们可以互相替换，策略模式让算法独立于使用算法的客户而变化。

**优点**：

- 算法可以自由切换
- 避免使用多重条件判断
- 扩展性好

**使用场景**：

- 支付方式选择
- 排序算法
- 表单验证

```javascript
// 策略接口
class PaymentStrategy {
  pay(amount) {
    throw new Error("pay method must be implemented");
  }
}

// 具体策略
class CreditCardPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`使用信用卡支付: $${amount}`);
  }
}

class PayPalPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`使用PayPal支付: $${amount}`);
  }
}

class CashPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`使用现金支付: $${amount}`);
  }
}

// 上下文
class ShoppingCart {
  constructor() {
    this.paymentStrategy = null;
  }

  setPaymentStrategy(strategy) {
    this.paymentStrategy = strategy;
  }

  checkout(amount) {
    if (this.paymentStrategy) {
      this.paymentStrategy.pay(amount);
    } else {
      console.log("请选择支付方式");
    }
  }
}

// 使用示例
const cart = new ShoppingCart();
cart.setPaymentStrategy(new CreditCardPayment());
cart.checkout(100);

cart.setPaymentStrategy(new PayPalPayment());
cart.checkout(50);
```

#### 4. 职责链模式 {#职责链模式}

**解释**：将请求的发送者和接收者解耦，让多个对象都有机会处理这个请求，直到有一个对象处理它为止。

**优点**：

- 降低耦合度
- 增强了给对象指派职责的灵活性
- 增加新的处理类很方便

**使用场景**：

- 审批流程
- 异常处理
- 过滤器链

```javascript
// 处理器基类
class Handler {
  constructor() {
    this.nextHandler = null;
  }

  setNext(handler) {
    this.nextHandler = handler;
    return handler;
  }

  handle(request) {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

// 具体处理器
class ConcreteHandlerA extends Handler {
  handle(request) {
    if (request.type === "A") {
      console.log(`处理器A处理请求: ${request.content}`);
      return true;
    }
    return super.handle(request);
  }
}

class ConcreteHandlerB extends Handler {
  handle(request) {
    if (request.type === "B") {
      console.log(`处理器B处理请求: ${request.content}`);
      return true;
    }
    return super.handle(request);
  }
}

class ConcreteHandlerC extends Handler {
  handle(request) {
    if (request.type === "C") {
      console.log(`处理器C处理请求: ${request.content}`);
      return true;
    }
    return super.handle(request);
  }
}

// 使用示例
const handlerA = new ConcreteHandlerA();
const handlerB = new ConcreteHandlerB();
const handlerC = new ConcreteHandlerC();

handlerA.setNext(handlerB).setNext(handlerC);

const request1 = { type: "A", content: "请求A" };
const request2 = { type: "B", content: "请求B" };
const request3 = { type: "C", content: "请求C" };

handlerA.handle(request1);
handlerA.handle(request2);
handlerA.handle(request3);
```

#### 5. 命令模式 {#命令模式}

**解释**：将一个请求封装为一个对象，从而让你可以用不同的请求对客户进行参数化，对请求排队或记录请求日志，以及支持可撤销的操作。

**优点**：

- 降低系统耦合度
- 易于扩展新命令
- 支持撤销和重做

**使用场景**：

- 菜单操作
- 宏命令
- 事务处理

```javascript
// 命令接口
class Command {
  execute() {
    throw new Error("execute method must be implemented");
  }

  undo() {
    throw new Error("undo method must be implemented");
  }
}

// 接收者
class Light {
  turnOn() {
    console.log("灯亮了");
  }

  turnOff() {
    console.log("灯灭了");
  }
}

// 具体命令
class LightOnCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }

  execute() {
    this.light.turnOn();
  }

  undo() {
    this.light.turnOff();
  }
}

class LightOffCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }

  execute() {
    this.light.turnOff();
  }

  undo() {
    this.light.turnOn();
  }
}

// 调用者
class RemoteControl {
  constructor() {
    this.commands = [];
  }

  setCommand(command) {
    this.commands.push(command);
  }

  pressButton() {
    if (this.commands.length > 0) {
      const command = this.commands.shift();
      command.execute();
    }
  }

  pressUndo() {
    if (this.commands.length > 0) {
      const command = this.commands.pop();
      command.undo();
    }
  }
}

// 使用示例
const light = new Light();
const lightOn = new LightOnCommand(light);
const lightOff = new LightOffCommand(light);

const remote = new RemoteControl();
remote.setCommand(lightOn);
remote.setCommand(lightOff);

remote.pressButton(); // 灯亮了
remote.pressButton(); // 灯灭了
remote.pressUndo(); // 灯亮了
```

#### 6. 访问者模式 {#访问者模式}

**解释**：在不改变数据结构的前提下，定义作用于其元素的新操作。

**优点**：

- 易于增加新的操作
- 将数据结构与操作分离
- 符合开闭原则

**使用场景**：

- 编译器
- 文档处理
- 报表生成

```javascript
// 元素接口
class Element {
  accept(visitor) {
    throw new Error("accept method must be implemented");
  }
}

// 具体元素
class ConcreteElementA extends Element {
  accept(visitor) {
    visitor.visitConcreteElementA(this);
  }

  operationA() {
    return "元素A的操作";
  }
}

class ConcreteElementB extends Element {
  accept(visitor) {
    visitor.visitConcreteElementB(this);
  }

  operationB() {
    return "元素B的操作";
  }
}

// 访问者接口
class Visitor {
  visitConcreteElementA(element) {
    throw new Error("visitConcreteElementA method must be implemented");
  }

  visitConcreteElementB(element) {
    throw new Error("visitConcreteElementB method must be implemented");
  }
}

// 具体访问者
class ConcreteVisitor1 extends Visitor {
  visitConcreteElementA(element) {
    console.log(`访问者1访问元素A: ${element.operationA()}`);
  }

  visitConcreteElementB(element) {
    console.log(`访问者1访问元素B: ${element.operationB()}`);
  }
}

class ConcreteVisitor2 extends Visitor {
  visitConcreteElementA(element) {
    console.log(`访问者2访问元素A: ${element.operationA()}`);
  }

  visitConcreteElementB(element) {
    console.log(`访问者2访问元素B: ${element.operationB()}`);
  }
}

// 对象结构
class ObjectStructure {
  constructor() {
    this.elements = [];
  }

  attach(element) {
    this.elements.push(element);
  }

  detach(element) {
    const index = this.elements.indexOf(element);
    if (index !== -1) {
      this.elements.splice(index, 1);
    }
  }

  accept(visitor) {
    this.elements.forEach((element) => element.accept(visitor));
  }
}

// 使用示例
const objectStructure = new ObjectStructure();
const elementA = new ConcreteElementA();
const elementB = new ConcreteElementB();

objectStructure.attach(elementA);
objectStructure.attach(elementB);

const visitor1 = new ConcreteVisitor1();
const visitor2 = new ConcreteVisitor2();

objectStructure.accept(visitor1);
objectStructure.accept(visitor2);
```

#### 7. 状态模式 {#状态模式}

**解释**：允许对象在内部状态改变时改变它的行为，对象看起来好像修改了它的类。

**优点**：

- 消除庞大的条件分支语句
- 状态转换逻辑与状态对象合成一体
- 易于增加新的状态

**使用场景**：

- 游戏状态管理
- 工作流引擎
- 订单状态

```javascript
// 状态接口
class State {
  handle(context) {
    throw new Error("handle method must be implemented");
  }
}

// 具体状态
class ConcreteStateA extends State {
  handle(context) {
    console.log("当前状态: A");
    context.setState(new ConcreteStateB());
  }
}

class ConcreteStateB extends State {
  handle(context) {
    console.log("当前状态: B");
    context.setState(new ConcreteStateC());
  }
}

class ConcreteStateC extends State {
  handle(context) {
    console.log("当前状态: C");
    context.setState(new ConcreteStateA());
  }
}

// 上下文
class Context {
  constructor() {
    this.state = new ConcreteStateA();
  }

  setState(state) {
    this.state = state;
  }

  request() {
    this.state.handle(this);
  }
}

// 使用示例
const context = new Context();

context.request(); // 当前状态: A
context.request(); // 当前状态: B
context.request(); // 当前状态: C
context.request(); // 当前状态: A
```

#### 8. 备忘录模式 {#备忘录模式}

**解释**：在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，这样以后就可以将该对象恢复到原先保存的状态。

**优点**：

- 保持封装边界
- 简化发起人
- 提供状态恢复机制

**使用场景**：

- 撤销功能
- 游戏存档
- 事务回滚

```javascript
// 备忘录
class Memento {
  constructor(state) {
    this.state = state;
  }

  getState() {
    return this.state;
  }
}

// 发起人
class Originator {
  constructor() {
    this.state = "";
  }

  setState(state) {
    this.state = state;
  }

  getState() {
    return this.state;
  }

  saveStateToMemento() {
    return new Memento(this.state);
  }

  getStateFromMemento(memento) {
    this.state = memento.getState();
  }
}

// 管理者
class CareTaker {
  constructor() {
    this.mementoList = [];
  }

  add(memento) {
    this.mementoList.push(memento);
  }

  get(index) {
    return this.mementoList[index];
  }
}

// 使用示例
const originator = new Originator();
const careTaker = new CareTaker();

originator.setState("状态 #1");
originator.setState("状态 #2");
careTaker.add(originator.saveStateToMemento());

originator.setState("状态 #3");
careTaker.add(originator.saveStateToMemento());

originator.setState("状态 #4");

console.log("当前状态: " + originator.getState());
originator.getStateFromMemento(careTaker.get(0));
console.log("第一次保存的状态: " + originator.getState());
originator.getStateFromMemento(careTaker.get(1));
console.log("第二次保存的状态: " + originator.getState());
```

#### 9. 迭代器模式 {#迭代器模式}

**解释**：提供一种方法顺序访问一个聚合对象中的各个元素，而又不暴露其内部的表示。

**优点**：

- 简化聚合类
- 支持多种遍历方式
- 符合单一职责原则

**使用场景**：

- 集合遍历
- 数据库查询结果
- 文件系统遍历

```javascript
// 迭代器接口
class Iterator {
  hasNext() {
    throw new Error("hasNext method must be implemented");
  }

  next() {
    throw new Error("next method must be implemented");
  }
}

// 聚合接口
class Aggregate {
  createIterator() {
    throw new Error("createIterator method must be implemented");
  }
}

// 具体聚合
class ConcreteAggregate extends Aggregate {
  constructor() {
    super();
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  createIterator() {
    return new ConcreteIterator(this);
  }
}

// 具体迭代器
class ConcreteIterator extends Iterator {
  constructor(aggregate) {
    super();
    this.aggregate = aggregate;
    this.current = 0;
  }

  hasNext() {
    return this.current < this.aggregate.items.length;
  }

  next() {
    if (this.hasNext()) {
      return this.aggregate.items[this.current++];
    }
    return null;
  }
}

// 使用示例
const aggregate = new ConcreteAggregate();
aggregate.addItem("项目1");
aggregate.addItem("项目2");
aggregate.addItem("项目3");

const iterator = aggregate.createIterator();

while (iterator.hasNext()) {
  console.log(iterator.next());
}
```

#### 10. 解释器模式 {#解释器模式}

**解释**：给定一个语言，定义它的文法的一种表示，并定义一个解释器，这个解释器使用该表示来解释语言中的句子。

**优点**：

- 易于改变和扩展文法
- 每个文法规则都可以表示为一个类
- 实现文法较为容易

**使用场景**：

- 编译器
- 表达式求值
- 配置文件解析

```javascript
// 抽象表达式
class Expression {
  interpret(context) {
    throw new Error("interpret method must be implemented");
  }
}

// 终结符表达式
class TerminalExpression extends Expression {
  constructor(data) {
    super();
    this.data = data;
  }

  interpret(context) {
    return context.includes(this.data);
  }
}

// 非终结符表达式
class OrExpression extends Expression {
  constructor(expr1, expr2) {
    super();
    this.expr1 = expr1;
    this.expr2 = expr2;
  }

  interpret(context) {
    return this.expr1.interpret(context) || this.expr2.interpret(context);
  }
}

class AndExpression extends Expression {
  constructor(expr1, expr2) {
    super();
    this.expr1 = expr1;
    this.expr2 = expr2;
  }

  interpret(context) {
    return this.expr1.interpret(context) && this.expr2.interpret(context);
  }
}

// 使用示例
function getMaleExpression() {
  const robert = new TerminalExpression("Robert");
  const john = new TerminalExpression("John");
  return new OrExpression(robert, john);
}

function getMarriedWomanExpression() {
  const julie = new TerminalExpression("Julie");
  const married = new TerminalExpression("Married");
  return new AndExpression(julie, married);
}

const isMale = getMaleExpression();
const isMarriedWoman = getMarriedWomanExpression();

console.log("John is male? " + isMale.interpret("John"));
console.log(
  "Julie is a married woman? " + isMarriedWoman.interpret("Married Julie")
);
```

---

## 📚 总结

### 🎯 设计模式的核心价值

1. **提高代码质量**: 使代码更加清晰、可读、可维护
2. **增强可扩展性**: 便于添加新功能而不影响现有代码
3. **降低耦合度**: 减少模块间的依赖关系
4. **提高复用性**: 相同的解决方案可以在不同场景中复用

### 🔧 前端开发中的实际应用

#### 常用场景

- **组件库开发**: 工厂模式、装饰器模式
- **状态管理**: 单例模式、观察者模式
- **路由系统**: 策略模式、状态模式
- **表单处理**: 策略模式、职责链模式
- **事件系统**: 观察者模式、命令模式

#### 选择建议

1. **简单场景**: 优先考虑单例、工厂、观察者
2. **复杂交互**: 考虑状态、命令、职责链
3. **性能优化**: 考虑代理、享元、备忘录
4. **扩展需求**: 考虑策略、装饰器、适配器

### 📖 学习建议

1. **理解原理**: 不要死记硬背，要理解每个模式解决的问题
2. **实践应用**: 在实际项目中尝试使用，从简单开始
3. **组合使用**: 多个模式可以组合使用，发挥更大威力
4. **适度使用**: 不要过度设计，保持代码简洁

### 🔗 相关资源

- [JavaScript 设计模式与开发实践](https://github.com/ConardLi/awesome-coding-js)
- [React 设计模式](https://reactpatterns.com/)
- [Vue 设计模式](https://vuejs.org/guide/extras/ways-of-using-vue.html)
- [TypeScript 设计模式](https://refactoring.guru/design-patterns/typescript)
