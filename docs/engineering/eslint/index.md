# Eslint

- 一款高度可配置的 JavaScript 静态代码检查工具，已成为 JS 代码检查的事实标准

- 先通过解析器(parser)将 JavaScript 代码解析为抽象语法树(AST)

- 再调用规则(rule)对 AST 进行检查，从而实现对代码的检查

- v9 以下

  - parser

    - 默认使用 Espree 进行 JavaScript 解析

  - extends

    - 可以理解为 plugins + rules

  - plugins

  - rules

  - globals

- v9

  - 单一配置文件 ‌：ESLint 9 不再支持多种配置文件来源（如.eslintrc.js、.eslintrc.json 等），而是要求所有配置都在一个单一的配置文件中，通常是 eslint.config.js。

  - ‌**基于 JS 原生导入**‌：新的配置系统基于 JavaScript 的导入语句，而不是基于 npm 包名的旧方式。这意味着插件和共享配置需要通过 import 语句来引入，而不是通过 extend 语句。

  - ‌**更清晰的继承结构**‌：新的配置系统使得配置的继承结构更加清晰和易于管理，减少了复杂的嵌套和结构问题。

  - 导出的是数组，不在意是对象

  - .eslintrc 文件不再支持 ‌：ESLint 9 不再支持旧的配置文件格式，如.eslintrc、.eslintrc.js 等。所有配置必须迁移到新的扁平配置系统中。

  - ‌ESLintIgnore 文件不再支持 ‌：.eslintignore 文件也被弃用，取而代之的是在配置文件中使用 ignores 属性来指定需要忽略的文件。

- 原理

- 参数处理 --- Eslint 类 CLIEngine 类

- 代码处理 --- lint 类

- 把源码 parse 成 AST。而 eslint 的 parser 也是可以切换的，需要先找到用啥 parser：

  - 默认是 Eslint 自带的 espree，也可以通过配置来切换成别的 parser，比如 @eslint/babel-parser、@typescript/eslint-parser 等。

  - 遍历 rules 来对不同的事件进行监听

  - 遍历 AST，然后遇到不同的 AST 会 emit 不同的事件。rule 里处理什么 AST 就会监听什么事件，这样通过事件监听的方式，就可以在遍历 AST 的过程中，执行不同的 rule 了。

  - 遍历完一遍 AST，也就调用了所有的 rules，这就是 rule 的运行机制

  - lint problem 是检查的结果，也就是从哪一行（line）哪一列（column）到哪一行（endLine）哪一列（endColumn），有什么错误（message）。

  - 通过字符串替换实现自动 fix

  - 遍历完 AST，调用了所有的 rules，收集到了 linting problems 之后，就可以进行 fix 了
