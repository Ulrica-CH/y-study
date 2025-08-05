# 进程

## 非阻塞的 I/O

“非阻塞的 I/O” 是一种 输入/输出操作模式，其核心思想是：

> 发起 I/O 请求后，不必等待操作完成，而是立即返回，继续执行其他任务

非阻塞的关键特性：

- I/O 操作调用后立即返回（返回一个未完成的状态）

- 结果可能通过回调函数、事件监听、Promise 等异步方式通知完成

- 程序主线程不会因为等待而卡住

> NodeJS 是单进程(可以开启多进程)单线程应用程序，通过事件驱动和非阻塞I/，可以处理高并发请求。

- 程序不需要为每个连接创建一个线程，而是在一个线程里通过事件循环管理成千上万个连接，极大提高了并发处理能力
- 传统多线程模型
  - 每个请求开一个线程。
  - 每个线程等待数据库、磁盘等 I/O 操作完成。
  - 线程数量爆炸，占用大量内存、CPU 切换代价大。
- 异步 + 事件驱动模型
  - 只用一个主线程
  - 所有 I/O（数据库、文件、网络）都通过“非阻塞”方式发起
  - 把完成后的回调函数注册给“事件循环（Event Loop）”
  - 当某个 I/O 完成，事件循环调用对应的回调函数

## 开启多进程(子进程)

Node.js 提供了四种创建子进程的方法：

- spawn
- fork
- exec
- execFile

## 详细解释

### 1. spawn

`spawn` 是最基础的进程创建方法，用于启动一个新的进程。

**特点：**

- 返回一个流（stream），可以实时获取输出
- 适合处理大量数据或长时间运行的进程
- 不会缓存输出，内存占用小
- 可以传递参数数组

**使用场景：**

- 需要实时获取进程输出
- 处理大量数据
- 长时间运行的进程

```javascript
const { spawn } = require("child_process");

// 启动一个进程
const child = spawn("ls", ["-la"]);

// 监听输出
child.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

child.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

child.on("close", (code) => {
  console.log(`子进程退出，退出码 ${code}`);
});
```

### 2. fork

`fork` 是 `spawn` 的特殊形式，专门用于创建 Node.js 进程。

**特点：**

- 只能创建 Node.js 进程
- 自动建立 IPC（进程间通信）通道
- 可以传递消息
- 适合 CPU 密集型任务
- 每个子进程运行在独立的 V8 引擎实例中
- 可以充分利用多核 CPU

**使用场景：**

- 需要进程间通信
- CPU 密集型计算
- 需要共享数据的场景
- 需要并行处理大量计算任务

```javascript
const { fork } = require("child_process");

// 创建子进程
const child = fork("./child.js");

// 发送消息给子进程
child.send({ message: "Hello from parent" });

// 接收子进程消息
child.on("message", (msg) => {
  console.log("收到子进程消息:", msg);
});

child.on("exit", (code) => {
  console.log(`子进程退出，退出码 ${code}`);
});
```

### 3. exec

`exec` 用于执行 shell 命令，并将结果作为回调返回。

**特点：**

- 执行 shell 命令
- 将输出缓存到内存中
- 有最大缓冲区限制（默认 200KB）
- 适合执行简单命令

**使用场景：**

- 执行简单的 shell 命令
- 不需要实时输出的场景
- 命令执行时间较短

```javascript
const { exec } = require("child_process");

// 执行shell命令
exec("ls -la", (error, stdout, stderr) => {
  if (error) {
    console.error(`执行错误: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
```

### 4. execFile

`execFile` 直接执行可执行文件，不通过 shell。

**特点：**

- 直接执行可执行文件（包括系统命令如 ls、cat、grep 等）
- 不通过 shell，更安全，避免 shell 注入攻击
- 性能更好，没有 shell 解析开销
- 参数需要是数组形式
- 可以执行任何可执行文件，包括系统命令

**使用场景：**

- 执行可执行文件
- 执行系统命令（如 ls、cat、grep 等）
- 需要更好的安全性
- 性能要求较高的场景

```javascript
const { execFile } = require("child_process");

// 执行系统命令（ls 是可执行文件）
execFile("ls", ["-la"], (error, stdout, stderr) => {
  if (error) {
    console.error(`执行错误: ${error}`);
    return;
  }
  console.log(`目录列表: ${stdout}`);
});

// 执行Node.js可执行文件
execFile("node", ["--version"], (error, stdout, stderr) => {
  if (error) {
    console.error(`执行错误: ${error}`);
    return;
  }
  console.log(`Node.js版本: ${stdout}`);
});

// 执行Python脚本
execFile("/usr/bin/python3", ["script.py"], (error, stdout, stderr) => {
  if (error) {
    console.error(`执行错误: ${error}`);
    return;
  }
  console.log(`Python输出: ${stdout}`);
});
```

## 方法对比

| 方法     | 用途              | 输出处理 | 安全性 | 性能 | 适用场景               |
| -------- | ----------------- | -------- | ------ | ---- | ---------------------- |
| spawn    | 启动进程          | 流式     | 高     | 高   | 大量数据、长时间运行   |
| fork     | 创建 Node.js 进程 | 消息传递 | 高     | 高   | 进程间通信、CPU 密集   |
| exec     | 执行 shell 命令   | 缓存     | 中     | 中   | 简单命令、快速执行     |
| execFile | 执行可执行文件    | 缓存     | 高     | 高   | 可执行文件、安全要求高 |

## 重要说明：exec vs execFile

### exec 执行 shell 命令

会创建一个命令行,将命令放到命令行中执行,支持 shell 特性
可能会消耗大量内存

```javascript
// exec 通过shell执行，支持shell特性
exec('ls -la | grep ".js$"', (error, stdout, stderr) => {
  // 支持管道、重定向等shell特性
});
```

### execFile 直接执行可执行文件

```javascript
// execFile 直接执行可执行文件，不通过shell
execFile("ls", ["-la"], (error, stdout, stderr) => {
  // 不支持管道、重定向等shell特性
  // 但可以执行任何可执行文件，包括系统命令
});
```

**关键区别：**

- `exec` 通过 shell 执行，支持 shell 的所有特性（管道、重定向、环境变量等）
- `execFile` 直接执行可执行文件，不支持 shell 特性，但更安全、性能更好
- 系统命令如 `ls`、`cat`、`grep` 等都是可执行文件，所以 `execFile` 可以执行它们

## 为什么 fork 适合 CPU 密集型任务？

### 1. **Node.js 单线程限制**

Node.js 是单线程的，所有 JavaScript 代码都在主线程（事件循环）中执行：

```javascript
// 主线程中的 CPU 密集型任务会阻塞整个应用
function cpuIntensiveTask() {
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += Math.sqrt(i);
  }
  return result;
}

// 这会阻塞主线程，影响其他请求处理
console.log(cpuIntensiveTask());
```

### 2. **fork 的并行处理能力**

`fork` 创建的子进程可以并行执行，充分利用多核 CPU：

```javascript
const { fork } = require("child_process");
const os = require("os");

// 获取 CPU 核心数
const numCPUs = os.cpus().length;

// 创建多个子进程并行处理
for (let i = 0; i < numCPUs; i++) {
  const child = fork("./worker.js");

  child.send({
    taskId: i,
    data: generateLargeDataSet(),
  });

  child.on("message", (result) => {
    console.log(`任务 ${result.taskId} 完成:`, result.result);
  });
}
```

### 3. **独立的 V8 引擎实例**

每个 `fork` 的子进程都有独立的 V8 引擎实例：

```javascript
// worker.js - 子进程文件
process.on("message", (data) => {
  // 在独立的 V8 引擎中执行 CPU 密集型计算
  const result = performHeavyCalculation(data.data);

  // 通过 IPC 通道返回结果
  process.send({
    taskId: data.taskId,
    result: result,
  });
});

function performHeavyCalculation(data) {
  // 这个计算不会阻塞主进程
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += Math.sqrt(i) * Math.sin(i);
  }
  return result;
}
```

### 4. **进程间通信的优势**

`fork` 提供了高效的进程间通信机制：

```javascript
// 主进程
const child = fork("./worker.js");

// 发送大量数据给子进程
child.send({
  operation: "matrixMultiplication",
  matrixA: largeMatrixA,
  matrixB: largeMatrixB,
});

// 接收计算结果
child.on("message", (result) => {
  console.log("矩阵乘法完成:", result);
});

// 子进程 (worker.js)
process.on("message", (data) => {
  if (data.operation === "matrixMultiplication") {
    const result = multiplyMatrices(data.matrixA, data.matrixB);
    process.send(result);
  }
});
```

### 5. **实际性能对比**

```javascript
// 单线程处理（阻塞）
console.time("单线程");
const results = [];
for (let i = 0; i < 4; i++) {
  results.push(cpuIntensiveTask());
}
console.timeEnd("单线程"); // 约 4 秒

// 多进程处理（并行）
console.time("多进程");
const promises = [];
for (let i = 0; i < 4; i++) {
  const child = fork("./worker.js");
  promises.push(
    new Promise((resolve) => {
      child.on("message", resolve);
      child.send({ taskId: i });
    })
  );
}

Promise.all(promises).then(() => {
  console.timeEnd("多进程"); // 约 1 秒
});
```

### 6. **适用场景总结**

`fork` 特别适合以下 CPU 密集型场景：

- **数学计算**：矩阵运算、数值分析、加密算法
- **图像处理**：图片压缩、滤镜应用、格式转换
- **数据分析**：大数据集处理、统计分析
- **机器学习**：模型训练、特征提取
- **加密解密**：大量数据的加密/解密操作

## 三个参数

对应文件修饰符 0 1 2

- process.stdin (0) - 标准输入
- process.stdout (1) - 标准输出
- process.stderr (2) - 标准错误

所以当 fs.open()的时候,文件修饰符从 0 开始

## 实际应用示例

### 使用 spawn 处理大量数据

```javascript
const { spawn } = require("child_process");

// 处理大文件
const child = spawn("grep", ["pattern", "large-file.txt"]);

let data = "";
child.stdout.on("data", (chunk) => {
  data += chunk;
});

child.on("close", () => {
  console.log("处理完成:", data);
});
```

### 使用 fork 进行 CPU 密集计算

```javascript
// parent.js
const { fork } = require("child_process");

const child = fork("./worker.js");

child.send({ numbers: [1, 2, 3, 4, 5] });

child.on("message", (result) => {
  console.log("计算结果:", result);
});

// worker.js
process.on("message", (data) => {
  const result = data.numbers.reduce((sum, num) => sum + num * num, 0);
  process.send(result);
});
```

### 使用 exec 执行简单命令

```javascript
const { exec } = require("child_process");

exec('echo "Hello World"', (error, stdout, stderr) => {
  if (error) {
    console.error("执行错误:", error);
    return;
  }
  console.log("输出:", stdout);
});
```

### 使用 execFile 执行可执行文件

```javascript
const { execFile } = require("child_process");

execFile("/usr/bin/python3", ["script.py"], (error, stdout, stderr) => {
  if (error) {
    console.error("执行错误:", error);
    return;
  }
  console.log("Python脚本输出:", stdout);
});
```
