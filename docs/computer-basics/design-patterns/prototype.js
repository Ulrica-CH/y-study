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