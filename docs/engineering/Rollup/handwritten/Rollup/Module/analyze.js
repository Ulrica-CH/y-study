const walk = require("../../../basic/AST/walk.js");
const Scope = require("../../../basic/scope/Scope.js");
module.exports = function (ast, code, module) {
  ast.body.forEach((statement) => {
    Object.defineProperties(statement, {
      _included: { value: false, writable: true },
      _module: { value: module },
      _source: { value: code.snip(statement.start, statement.end) },
      _dependsOn: {
        value: {},
        writable: true,
        enumerable: false,
        configurable: true,
      },
      //
      _defines: {
        value: {},
        writable: true,
        enumerable: false,
        configurable: true,
      },
    });
    // 收集imports
    if (statement.type === "ImportDeclaration") {
      const source = statement.source.value;
      statement.specifiers.forEach((specifier) => {
        let importName = specifier.imported.name; //导入的变量名
        let localName = specifier.local.name; //本地的变量名
        module.imports[localName] = { source, importName };
      });
      // 收集exports
    } else if (statement.type === "ExportNamedDeclaration") {
      const declaration = statement.declaration;
      if (declaration && declaration.type === "VariableDeclaration") {
        const declarations = declaration.declarations;
        declarations.forEach((variableDeclarator) => {
          const localName = variableDeclarator.id.name; //name
          const exportName = localName;
          module.exports[exportName] = { localName };
        });
      }
    }
    console.log(module.imports, module.exports);
  });
  // 第二轮循环
  //  判断用到了哪些变量
  // 还要判断那些是全局变量 哪些是局部变量
  let currentScope = new Scope({
    name: "当前模块全局作用域",
    scopes: [],
    parent: null,
  });
  
  ast.body.forEach((statement) => {
    const addToScope = (name) => {
      currentScope.add(name); //把name变量放入当前的作用域
      //如果没有父亲，相当 于就是根作用域或者 当前的作用域是一个块级作用域的话
      if (!currentScope.parent) {
        //如果没有父作用域，说明这是一个顶级作用域
        statement._defines[name] = true; //在一级节点定义一个变量name _defines.say=true
        module.definitions[name] = statement;
      }
    };
    walk(statement, {
      enter: (node) => {
        if (node.type === "Identifier") {
          // console.log(statement,statement._dependsOn)
          statement._dependsOn[node.name] = true;
        }
        let newScope;
        switch (node.type) {
          case "FunctionDeclaration":
            addToScope(node.id.name);
            newScope = new Scope({
              name: node.id.name,
              scopes: node.params.map((param) => param.name),
              parent: currentScope,
            });

            break;
          case "VariableDeclaration":
            node.declarations.forEach((declaration) => {
              addToScope(declaration.id.name);
            });
          // addToScope();
          default:
            break;
        }
        if (newScope) {
          Object.defineProperty(node, "_scope", { value: newScope });
          currentScope = newScope;
        }
      },
      leave: (node) => {
        if (Object.hasOwnProperty(node, "_scope")) {
          currentScope = currentScope.parent;
        }
      },
    });

    console.log("statement", statement._defines);
  });
  // console.log(ast.body);
};
