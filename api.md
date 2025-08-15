# api

- 通过 compiler.hooks.normalModuleFactory，当创建 NormalModule 时，会触发 normalModuleFactory 钩子
- factory.hooks.parser，解析道 js 时候
- parser.hooks.importSpecifier，解析到 import 时候
- 判断是不是 sfc 组件，进行收集 比如

  ```javascript
  'views/home/index': [
    {
      identifierName: 'releaseGeTiDemandNoSign',
      sourceModuleName: 'api/home'
    },
    { identifierName: 'loanRequest', sourceModuleName: 'api/home' }
  ],
  ```

1. 解析请求与创建模块 → 触发 normalModuleFactory 相关钩子
2. 执行 Loader（vue-loader 在这一步把 .vue 拆成多个子模块并注入 normalizer 等）
3. 得到最终 JS 源码后创建 Parser 并解析 → 触发 parser.hooks.importSpecifier/exportSpecifier

- 根据 export 语句来收集 url，这里主要是操作 ASt 语法树
  ![](./images/ast.png)

  ```javascript
  try {
    // request的调用第一句认为是直接构造request参数。其他情况暂不处理
    const properties =
      statement.declaration.body.body[0].argument.arguments[0].properties;
    if (properties) {
      for (const propertie of properties) {
        const key = propertie.key.name;
        let value = propertie.value;
        if (key === "url") {
          // 针对不同value类型，例如有字符串拼接等，获取?前的url，开头不包含/
          if (value.type === "CallExpression") {
            value = value.callee.object.callee.object.value;
          } else if (value.type === "BinaryExpression") {
            value = value.left.value;
          } else {
            value = value.value;
          }
          if (value.startsWith("/")) {
            value = value.replace("/", "");
          }
          value = value.split("?")[0];
          // console.log('******* export ' + moduleName + ' ' + exportName + ' ' + key + '=' + value)
          let exportUrlList = this.moduleExportUrlList[moduleName];
          if (!exportUrlList) {
            exportUrlList = {};
            this.moduleExportUrlList[moduleName] = exportUrlList;
          }
          exportUrlList[exportName] = value;
        }
      }
    }
  } catch (e) {
    console.log(
      "******* export error " +
        moduleName +
        " " +
        exportName +
        " " +
        identifierName
    );
    // console.warn(e)
  }
  ```

  - 注意这里是 webpack 只会处理被依赖的文件 比如@/api/demo.js 这个文件没被用到，那么是不会管的

  - 另外会进行递归收集以来处理，比如引入了@/store，那么的 store 里引入的的 api 也会被处理

  ```javascript
  'api/home': {
    getBankList: 'api/city/locan/get-bank-list',
    getCompanyList: 'api/company/company-query',
    loanRequest: 'api/city/locan/loan-request',
    releaseGeTiDemandNoSign: 'api/financial/app/release-demand-no-login'
  },
  ```

- 记录问题

  - source 会有很多垃圾不需要的资源，比如在处理 vue 文件，vue-loader 会自动地注入一些 import，导致在 importSpecifier 的参数 source 会有垃圾的东西，需要 indexO('node_modules' === -1)过滤掉

  ```javascript
  "source":"!../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js"
  ```

  > 这是 vue-loader 为每个 .vue 组件自动注入的运行时依赖。它会在把单文件组件编译成 JS 模块时，插入对 componentNormalizer.js 的导入，用来规范化组件选项。因此你会在 parser.hooks.importSpecifier 里看到：
  > source: !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js
  > 前缀 ! 是内联 loader 语法的一部分，不是你业务代码写的 import。

  - 关于路径问题 windows 和 mac 的斜杠不一样，需要处理，widows 是 \，mac 是 /，需要处理
    - 通过正则匹配进行统一替换，最终在转回去
