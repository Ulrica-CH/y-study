## 结构型模式

> 简化对象之间的复杂关系

## 1. 适配器模式 {#适配器模式}

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

## 2. 装饰器模式 {#装饰器模式}

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

## 3. 代理模式 {#代理模式}

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

## 4. 外观模式 {#外观模式}

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

## 5. 桥接模式 {#桥接模式}

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

## 6. 组合模式 {#组合模式}

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

## 7. 享元模式 {#享元模式}

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
