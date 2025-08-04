# npm 脚本传参详解

## 目录

- [命令行参数解析基础](#命令行参数解析基础)
- [npm 脚本传参](#npm-脚本传参)
- [参数解析工具](#参数解析工具)
- [最佳实践](#最佳实践)

## 命令行参数解析基础

### 1. 原生 Node.js 参数解析

#### process.argv 数组

```javascript
// 执行命令：node test.js -x -r -n5 aaa bbb ccc -abc bn -mu -bnbn -io -i8o9

console.log(process.argv);
// 输出：
// [
//   '/Users/xy/.nvm/versions/node/v18.20.6/bin/node',
//   '/Users/xy/XY/study/s_parser/test.js',
//   '-x',
//   '-r',
//   '-n5',
//   'aaa',
//   'bbb',
//   'ccc',
//   '-abc',
//   'bn',
//   '-mu',
//   '-bnbn',
//   '-io',
//   '-i8o9'
// ]
```

#### 参数解析规则

- **参数位置不固定**：可以放在选项中间、选项之前
- **布尔类型短选项可以合并**：`-xy` → `-x:true, -y:true`
- **长选项不会合并**：`--xy` → `xy:true`
- **选项和值可以用等号或空格分隔**：
  - `-x=1` → `x:1`
  - `-y 2` → `y:2`
  - `-n5` → `n:5`
- **使用 `--` 分隔**：`--` 之后的所有内容都会作为参数

## npm 脚本传参

### 1. 基本语法

```bash
# 通过 npm run 传递参数
npm run start -- --param=value -x -y

# 或者使用 npm 配置参数
npm run start -- --config=production
```

### 2. 参数传递规则

#### 使用 `--` 传递参数

```bash
npm run start -- --msg=hello -x -r --xy 90 hj
```

#### npm 配置参数

```bash
# 这些参数会被转换为环境变量
npm run start -- --mog=hello
# 转换为：npm_config_mog=hello

# 注意：--msg=hello 会把 hello 放到参数里，而不是配置里
```

### 3. 在脚本中接收参数

```javascript
// package.json
{
  "scripts": {
    "start": "node index.js"
  }
}

// index.js
console.log('process.argv:', process.argv);
console.log('npm_config_mog:', process.env.npm_config_mog);
```

## 参数解析工具

### 1. minimist

#### 基本使用

```javascript
const minimist = require("minimist");

// 解析命令行参数
const argv = minimist(process.argv.slice(2));

console.log(argv);
// 输出：
// {
//   _: [ 'aaa', 'bbb', 'ccc' ],
//   x: true,
//   r: true,
//   n: [ 5, true, true ],
//   a: true,
//   b: true,
//   c: 'bn',
//   m: true,
//   u: true,
//   i: '8o9',
//   o: true
// }
```

#### 高级配置

```javascript
const minimist = require("minimist");

const argv = minimist(process.argv.slice(2), {
  // 指定布尔类型选项
  boolean: ["x", "y"],

  // 指定字符串类型选项
  string: ["name", "config"],

  // 指定默认值
  default: {
    port: 3000,
    env: "development",
  },

  // 指定别名
  alias: {
    p: "port",
    t: "template",
    h: "help",
  },

  // 指定哪些参数不解析
  unknown: function (arg) {
    return arg === "-u"; // -u 参数会被解析，其他未知参数不会
  },
});
```

#### 配置选项说明

- **boolean**: 指定哪些选项为布尔类型
- **string**: 指定哪些选项为字符串类型
- **default**: 设置默认值
- **alias**: 设置选项别名
- **unknown**: 自定义未知参数处理

### 2. Commander.js

#### 基本使用

```javascript
const { Command } = require("commander");
const program = new Command();

program
  .name("string-util")
  .description("一些字符串工具的 CLI")
  .version("0.8.0");

program
  .command("split")
  .description("分割字符串为字符数组")
  .argument("<string>", "分割的字符串")
  .option("--first", "只展示第一个子串")
  .option("-s, --separator <char>", "分割字符", ",")
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
  });

program.parse();
```

#### 使用示例

```bash
# 基本使用
node comm.js split "ak,d,cc" -s ","

# 查看帮助
node comm.js split -h

# 输出帮助信息：
# Usage: string-util split [options] <string>
#
# 分割字符串为字符数组
#
# Arguments:
#   string  分割的字符串
#
# Options:
#   --first              只展示第一个子串
#   -s, --separator <char>  分割字符 (default: ",")
#   -h, --help           display help for command
```

#### 参数类型说明

- **尖括号 `<>`**: 必填参数
- **方括号 `[]`**: 可选参数
- **选项**: 使用 `-` 或 `--` 前缀

### 3. 工具对比

| 特性       | process.argv | minimist | commander |
| ---------- | ------------ | -------- | --------- |
| 易用性     | 低           | 中       | 高        |
| 功能完整性 | 基础         | 中等     | 完整      |
| 帮助信息   | 无           | 无       | 自动生成  |
| 类型检查   | 无           | 基础     | 完整      |
| 子命令支持 | 无           | 无       | 支持      |

## 最佳实践

### 1. 选择合适的工具

#### 简单脚本

```javascript
// 使用 minimist
const minimist = require("minimist");
const argv = minimist(process.argv.slice(2), {
  boolean: ["help", "version"],
  alias: { h: "help", v: "version" },
});

if (argv.help) {
  console.log("Usage: node script.js [options]");
  process.exit(0);
}
```

#### 复杂 CLI 工具

```javascript
// 使用 commander
const { Command } = require("commander");
const program = new Command();

program.name("my-cli").description("我的 CLI 工具").version("1.0.0");

program
  .command("build")
  .description("构建项目")
  .option("-e, --env <environment>", "环境", "development")
  .option("--minify", "压缩代码")
  .action((options) => {
    console.log("构建环境:", options.env);
    console.log("是否压缩:", options.minify);
  });

program.parse();
```

### 2. 参数验证

```javascript
const minimist = require("minimist");

function validateArgs(argv) {
  const required = ["config", "output"];

  for (const arg of required) {
    if (!argv[arg]) {
      console.error(`缺少必需参数: --${arg}`);
      process.exit(1);
    }
  }

  // 验证参数类型
  if (argv.port && isNaN(argv.port)) {
    console.error("端口必须是数字");
    process.exit(1);
  }
}

const argv = minimist(process.argv.slice(2));
validateArgs(argv);
```

### 3. 环境变量处理

```javascript
// 结合 npm 配置和环境变量
const config = {
  port: process.env.npm_config_port || process.env.PORT || 3000,
  env: process.env.npm_config_env || process.env.NODE_ENV || "development",
  debug:
    process.env.npm_config_debug === "true" || process.env.DEBUG === "true",
};

console.log("配置:", config);
```

### 4. 错误处理

```javascript
const { Command } = require("commander");

const program = new Command();

program
  .command("process")
  .argument("<file>", "输入文件")
  .option("-o, --output <file>", "输出文件")
  .action((file, options) => {
    try {
      // 处理逻辑
      console.log("处理文件:", file);
      console.log("输出文件:", options.output);
    } catch (error) {
      console.error("处理失败:", error.message);
      process.exit(1);
    }
  });

program.parse();
```

## 总结

1. **简单场景**：使用 `process.argv` 或 `minimist`
2. **复杂 CLI**：使用 `commander.js`
3. **npm 脚本**：使用 `--` 传递参数
4. **参数验证**：始终验证必需参数和参数类型
5. **错误处理**：提供清晰的错误信息和帮助信息

选择合适的参数解析工具可以大大提高开发效率和用户体验。
