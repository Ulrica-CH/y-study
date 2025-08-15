# NPM

## npm 脚本传参

### 直接 ndoe index.js

```bash
node test.js -x -r -n5 aaa bbb ccc -abc bn -mu -bnbn -io -i8o9
```

- 直接使用 process.argv

```js
	- [
  '/Users/xy/.nvm/versions/node/v18.20.6/bin/node',
  '/Users/xy/XY/study/s_parser/test.js',
  '-x',
  '-r',
  '-n5',
  'aaa',
  'bbb',
  'ccc',
...
]
```

- 使用 minimist
  https://www.npmjs.com/package/minimist

```js
-{
  _: ["aaa", "bbb", "ccc"],
  x: true,
  r: true,
  n: [5, true, true],
  a: true,
  b: true,
  c: "bn",
  m: true,
  u: true,
  i: "8o9",
  o: true,
};
```

- 参数解析规则

- 参数的位置并不固定，可以放在选项中间、选项之前

- 布尔类型的短选项可以合并 -xy --> -x:true -y:true

- 长选项不会合并

- --xy ---> xy:true

- 选项和选项值之间可以用等号也可以用空格隔开

-x=1 --> x:1
-y 2 --> y:2
-n5 --> n:5 这样也可以

- 如果有的选项你想作为参数，可以加上 --，-- 之后的所有内容都会作为参数

-- -y 2 -aaa=m --后面无论怎么写，都会放到参数里

- minimist 支持传递参数

```js
const argv = minimist(process.argv.slice(2), {
    boolean: ['x'],
    string: ['y']

});
```

- 选项就有两种 string 和 boolean，可以在 boolean 和 string 选项显示声明

- node ./index2.js -x 1 -y

- x:true y:''

x 虽然传入的选项值是 1 但被当做 boolean 解析为了 true

- 指定哪些解析哪些不解析

```js
- unknown(arg) {
  return arg === '-u'
  }

- node ./index2.js -x 1 -y -z dong

node ./index2.js -x 1 -y -u dong

- z 不会解析，u 会解析

- 指定默认值

default: { y: 2333 }

- node ./index2.js -x 1

- y:2333 也会解析出来

- 制定别名 alias: { p: 'port', t: 'template' }

- 缺点：只是解析参数，不能打印 help 信息、不支持解析命令自动执行对应函数，一切都要自己来做
```

- commander
  https://www.npmjs.com/package/commander?activeTab=readme

```js
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

```
- node comm.js split ak,d,cc -s ','

[ 'ak', 'd', 'cc' ]

- commander 是链式调用的风格，description 传入命令描述、argument 是参数、option 是选项。

如果选项有别名、选项值，都是在 option 第一个参数里声明

- node comm.js split -h

Usage: string-util split [options] <string>

分割字符串为字符数组

Arguments: string 分割的字符串
```

```bash
Options:
--first 只展示第一个子串
-s, --separator <char> 分割字符 (default: ",")
-h, --help display help for commandOptions:
--first 只展示第一个子串
-s, --separator <char> 分割字符 (default: ",")
-h, --help display help for command
```

- 尖括号代表必填、方括号代表可选。

参数值、选项值，一般都用尖括号展示

选项和子命令是可选的，用方括号展示

## 通过 npm run start 等脚本

### npm run start --mog=hello -x -r --xy 90 hj

- --mog=hello 也是选项 给到 npm_config_mog=hello

- 但如果是--msg=hello 会把 hello 放到参数里

- -- 后面的都会放到参数

## install 原理

npm 从 registry 仓库中下载包时，其实是下载一个压缩包，这个压缩包有对应的配置文件来记录压缩包的对应信息。

**安装流程：**

1. 执行 `npm i webpack -D` 时，会先去查找配置文件
2. 看配置文件有没有对应下载记录，有则会根据配置文件进而找到已经下载过的压缩包，解压到对应的 `node_modules` 文件夹中
3. 没有下载记录则去 registry 仓库进行下载（版本一致会直接从缓存中获取，版本不一致则下载新内容）

**优势：**

- 极大优化下载流程，缓解本地带宽
- 提高下载使用效率
- 降低 registry 仓库的高并发压力

## package-lock.json

1. 会在我们第一次安装库时，自动生成，该文件记录了对应所有的详细版本，关键记录来自构建依赖关系
2. 第一次比如下载 axios，他会依赖其他库，会构建一条完整的关系链并记录好，再去下载
3. 存在锁文件，后续使用 `npm install` 进行安装时，都会通过锁文件去安装一致的版本（查找缓存），找到则直接从本地获取，没找到则取 registry 仓库下载，最终解压缩到 `node_modules` 文件夹
4. 下载版本不一致（例如我们明确下载更新版本），则重新构建依赖关系，去仓库下载压缩包解压缩到 `node_modules`，然后重新构建 lock 锁文件

**作用：** 锁定依赖的具体版本，确保每次安装依赖时都能获得完全一致的依赖树（包括间接依赖）。

## 缓存机制

**查看缓存：** `npm get cache`

缓存包含两个主要目录：

- **content-v2**：存储实际的包内容
- **index-v5**：多层的哈希文件夹
  - 用于存储项目依赖项或缓存文件，这样做的好处是可以避免不同版本或内容的依赖之间产生冲突，并确保每个缓存文件是唯一的且不会覆盖其他版本的文件
  - index-v5 是一个索引目录，记录 content-v2 的一个索引或者说是位置，也就是 `name + version + integrity`（完整校验值）的一个哈希值。如果 lock 锁文件内的这三者和 index-v5 能够对上，就会去 content-v2 找到我们缓存的那个文件

## 依赖版本规范

### semver 版本规范

**版本号格式：** `X.Y.Z`

1. **X 主版本号（major）**：做了不兼容的 API 修改（可能不兼容之前的版本，也称为破坏性更新）
2. **Y 次版本号（minor）**：做了向下兼容的功能性新增（新功能增加，但是兼容之前的版本）
3. **Z 修订号（patch）**：做了向下兼容的问题修正（没有新功能，修复了之前版本的 bug）

### 版本前缀说明

1. **x.y.z**：表示一个明确的版本号
2. **^x.y.z**：表示 x 是保持不变的，y 和 z 永远安装最新的版本
3. **~x.y.z**：表示 x 和 y 保持不变的，z 永远安装最新的版本

**区别：**

- `^` 的弹性空间比 `~` 更大，但后者更为稳定
- 从配置中存在的比例，可以预估一下对稳定性的需求有多高

**注意事项：**

- 主版本号为 0 的特殊情况，表示该软件仍在初始开发阶段，API 可能频繁发生变化且不稳定，最好不使用

## install 问题

### npm 低版本问题

**包依赖嵌套问题：**

- 公共的依赖，无法复用，占用磁盘空间大

**文件路径问题：**

- Windows 的文件路径最长是 260 多个字符，这样嵌套是会超过 Windows 路径的长度限制

### npm v3 以上

- 也采用了铺平的方式
- 都通过 lock 文件来锁定文件版本

### npx

npm 5.2 之后自带的一个命令，解决了在项目开发过程中，频繁需要安装全局工具包所带来的困扰。

**使用场景示例：**

1. 全局安装 webpack5，项目里使用 webpack4
2. 当在命令行执行 webpack，他会去当前目录找，但是项目里的 webpack 是安装在 `node_modules/bin` 下的，找不到就会用全局的

**解决方案：**

1. **npm run 脚本**：npm run 实质就是去 `node_modules/bin` 下面去找可执行命令，自然就用的局部的
2. **npx**：npx 替代 npm，查找顺序会和 scripts 属性一样，先从当前 `node_modules` 文件夹下寻找

**bin 文件夹下的可执行命令：**

- `.cmd` 文件用于 Windows 的 CMD
- `.ps1` 文件用于 Windows 的 PowerShell
- 没有后缀的文件是为 Linux、macOS 等 Unix 系统设计的可执行脚本，通常通过 Shell（如 Bash）直接执行

## npm run 原理

1. `npm run` 命令首先在当前项目的 `node_modules/.bin` 目录中查找运行文件的路径的可执行命令
2. 如果在项目的 `node_modules/.bin` 中没有找到，它会尝试在全局的 `node_modules` 目录中查找
3. 如果全局目录中也没有，npm 会继续在系统的环境变量中查找
4. 如果这些位置都没有找到，npm 会报错，指出无法找到命令

## 依赖类型

### dependencies（生产依赖）

- 安装时包默认会将包添加到生产依赖，这是因为放在生产依赖下一定不会出问题，顶多就是构建时候多一些包

### devDependencies（开发依赖）

- `npm install` 时，dependencies 和 devDependencies 都会被安装
- 但是如果在生产环境下（例如运行 `npm install --only=prod` 或设置 `NODE_ENV=production` 环境变量时），devDependencies 不会被安装

**开发环境依赖设置：**

```bash
npm install xxx --save-dev  # 全写
npm install xxx --D         # 简写
```

### peerDependencies（对等依赖）

- 我们依赖的一个包，它必须是以另外一个宿主包为前提的，设置该项依赖来自 peerDependencies 属性

**示例：**

- 如果安装 **element-plus**，而没有手动安装对应的 Vue，在 npm 7 及以上版本中，npm 会自动尝试安装符合要求的 Vue 3，并且会尝试解决版本冲突

**作用：**

- 对于像 React 或 Vue 这样的框架，如果每个插件或者 UI 组件都把 React 或 Vue 作为自己的依赖项，那么在项目中会出现多个版本的框架副本，这不仅浪费空间，还可能导致版本冲突
- 使用 peerDependencies 可以确保只有一个版本的宿主包（例如 Vue 或 React）存在，被依赖的包就被称为宿主包

## postinstall

> postinstall 是 npm 包管理器的一个生命周期脚本，在 npm install 完成后自动执行。

npm install 的执行流程：

1. preinstall # 安装前执行
2. install # 安装过程
3. postinstall # 安装后执行 ⭐️
4. prepublish # 发布前执行
5. prepare # 准备阶段

### 主要用途

- 自动应用补丁
  - npm install 后自动应用 patch-package 补丁
- 构建项目
- 设置环境

### patch-package

允许你直接修改 node_modules 中的第三方包，并将这些修改保存为补丁文件，方便团队协作和部署

```bash
# 安装 patch-package
npm install patch-package --save-dev

# 安装 postinstall-postinstall (用于自动应用补丁)
npm install postinstall-postinstall --save-dev


# 生成补丁文件
npx patch-package some-package
```

```json
// package.json
{
  "scripts": {
    "postinstall": "patch-package"
  }
}
```

> 高级用法

```bash
# 查看特定包的补丁
npx patch-package --reverse some-package

# 查看所有补丁
ls patches/


# 删除特定包的补丁
rm patches/some-package+1.2.3.patch


# 当第三方包更新时：
# 1. 更新依赖
npm update some-package

# 2. 重新应用补丁（可能需要手动解决冲突）
npx patch-package some-package
```
