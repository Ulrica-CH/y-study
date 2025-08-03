const Scope = require("./Scope");
const a = 1;
function b() {
  const b = 2;
  return function () {
    const c = 3;
    console.log(a, b, c);
  };
}

let globalScope = new Scope({ name: "global", scopes: ['a'], parent: null });
let oneScope = new Scope({ name: "one", scopes: ["b"], parent: globalScope });
let twoScope = new Scope({ name: "two", scopes: ["c"], parent: oneScope });
console.log(
  twoScope.findDefiningScope("a").name,
  twoScope.findDefiningScope("b").name,
  twoScope.findDefiningScope("c").name
);
