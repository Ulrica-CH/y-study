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
