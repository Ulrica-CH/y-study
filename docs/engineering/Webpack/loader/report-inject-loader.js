const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");

module.exports = function (source) {
  const ast = parse(source, {
    sourceType: "module",
    plugins: ["jsx"],
  });

  const filePath = this.resourcePath.replace(/\\/g, "/");
  let hasReportDefined = false;
  traverse(ast, {
    Program(path) {
      // 检查是否已有 __report 函数定义
      path.node.body.forEach((node) => {
        if (t.isFunctionDeclaration(node) && node.id.name === "__report") {
          hasReportDefined = true;
        }
      });

      // 如果没有定义，插入函数到最前面
      if (!hasReportDefined) {
        const reportFunc = t.functionDeclaration(
          t.identifier("__report"),
          [t.identifier("file")],
          t.blockStatement([
            t.expressionStatement(
              t.callExpression(
                t.memberExpression(
                  t.identifier("console"),
                  t.identifier("log")
                ),
                [t.stringLiteral("调用来自文件:"), t.identifier("file")]
              )
            ),
          ])
        );

        path.node.body.unshift(reportFunc);
      }
    },
    CallExpression(path) {
      // console.log(path.ca)
      // ❗️避免对 __report 自己再注入
      const callee = path.get("callee");

      // 只处理不是 __report() 的调用
      if (callee.isIdentifier({ name: "__report" })) {
        return; // 跳过
      }

      const reportNode = t.expressionStatement(
        t.callExpression(t.identifier("__report"), [t.stringLiteral(filePath)])
      );

      if (callee.node.name === "toPrint") {
        path.insertBefore(reportNode);
      }
    },
  });

  const { code } = generate(ast);
  return code;
};
