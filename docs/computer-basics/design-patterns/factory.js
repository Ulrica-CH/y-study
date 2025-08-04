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

