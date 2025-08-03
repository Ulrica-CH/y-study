const acorn = require("acorn"); // CommonJS 'acorn'
const  walk  = require("./walk");
const code = `console.log('Hello, world!');let a = 1;`;
const ast = acorn.parse(code);


ast.body.forEach((statement) => {
  walk(statement, {
    enter: (node) => {
      console.log("enter", node.type);
      return false;
    },
    leave: (node) => {
      console.log("leave", node.type);
      return false;
    },
  });
});
