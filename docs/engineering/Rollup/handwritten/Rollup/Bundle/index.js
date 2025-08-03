const Module = require("../Module");
const fs = require("fs");
const MagicString = require("magic-string");
class Bundle {
  constructor(options) {
    this.entryPath = options.entryPath;
  }

  build(outputPath) {
    const entryModule = this.fetchModule(this.entryPath);
    this.statements = entryModule.expandAllStatements(true);//展开所有的语句
    const { code } = this.generate();//生成打包后的代码
    fs.writeFileSync(outputPath, code);//写入文件系统
   
  }
  generate() {
    let magicString = new MagicString.Bundle();
    // 所有展开的语句 statements
    this.statements.forEach(statement => {
      const source = statement._source.clone();
      magicString.addSource({
        content: source,
        separator: '\n'
      })
    })
    return { code: magicString.toString() }
  }
  fetchModule(importee) {
    const modulePath = importee;
    const code = fs.readFileSync(modulePath, "utf-8");
    const module = new Module({
      code,
      path: modulePath,
      bundle: this,
    });
    return module;
  }
}
module.exports = Bundle;