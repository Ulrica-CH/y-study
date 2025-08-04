# 行为型模式

> 简化对象之间的交互和职责分配

## 1. 观察者模式 {#观察者模式}

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

## 2. 模板方法模式 {#模板方法模式}

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

## 3. 策略模式 {#策略模式}

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

## 4. 职责链模式 {#职责链模式}

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

## 5. 命令模式 {#命令模式}

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

## 6. 访问者模式 {#访问者模式}

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

## 7. 状态模式 {#状态模式}

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

## 8. 备忘录模式 {#备忘录模式}

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

## 9. 迭代器模式 {#迭代器模式}

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

## 10. 解释器模式 {#解释器模式}

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
