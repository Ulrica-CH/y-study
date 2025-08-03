const acorn = require("acorn");
const MagicString = require("magic-string");
const analyze = require("./analyze");
class Module {
  constructor(options) {
    this.code = new MagicString(options.code);
    this.path = options.path;
    this.bundle = options.bundle;

    this.ast = acorn.parse(this.code, {
      sourceType: "module",
      ecmaVersion: "8",
    });
    this.imports = {}
    this.exports = {}
    this.definitions = {}

    // 遍历处理AST
    analyze(this.ast, this.code, this);
    console.log('this.definitions',this.definitions)
  }
  expandAllStatements() {
    let allStatements = [];
    this.ast.body.forEach(statement => {
      let statements = this.expandStatement(statement);
      allStatements.push(...statements);
    });
    return allStatements;
  }
  expandStatement(statement) {
    statement._included = true;
    let result = [];
    result.push(statement);
    return result;
  }
}

module.exports = Module;
