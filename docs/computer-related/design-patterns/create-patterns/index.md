# 创建型

> 管理实例的创建,增加代码灵活性

## 单例模式 {#单例模式}

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

## 工厂模式 {#工厂模式}

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

## 抽象工厂模式 {#抽象工厂模式}

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

## 建造者模式 {#建造者模式}

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

## 原型模式 {#原型模式}

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

---
