## 集群

## 分布式和集群

### 什么是分布式？

**分布式系统**是指运行在多台独立计算机上的系统，这些计算机通过网络连接，协同工作来完成一个共同的任务。

**核心特征：**

- 多台物理机器
- 网络通信
- 数据分散存储
- 容错能力
- 可扩展性

### 什么是集群？

**集群**是指多个相同的服务实例运行在一台或多台机器上，共同处理请求，提高系统的并发处理能力和可用性。

**核心特征：**

- 相同的服务副本
- 负载均衡
- 故障转移
- 水平扩展

### 详细对比

| 特性         | 分布式              | 集群               |
| ------------ | ------------------- | ------------------ |
| **部署范围** | 多台物理机器        | 单台或多台机器     |
| **服务类型** | 不同服务组件        | 相同服务实例       |
| **通信方式** | 网络通信 (HTTP/RPC) | 进程间通信 + 网络  |
| **数据存储** | 分散存储            | 共享存储           |
| **复杂度**   | 高                  | 中等               |
| **扩展方式** | 功能扩展 + 性能扩展 | 主要是性能扩展     |
| **故障处理** | 服务降级、熔断      | 进程重启、负载转移 |

#### 核心区别

1. **分布式系统**：

   - **目标**：将复杂的大系统拆分成独立的小服务
   - **特点**：不同的服务，不同的功能，运行在不同的机器上
   - **例子**：用户服务、订单服务、支付服务分别部署在不同服务器

2. **集群系统**：
   - **目标**：提高单一服务的处理能力和可用性
   - **特点**：相同的服务，多个副本，可以运行在同一台或多台机器
   - **例子**：一个网站应用运行多个实例来处理更多用户请求

#### 简单类比

- **分布式**：像一个公司的不同部门（人事部、财务部、技术部），各司其职
- **集群**：**像一个部门里有多个相同职位的员工，分担工作量**

## 开启多进程

```javascript
const { fork } = require("child_process");
const path = require("path");
const http = require("http");
const os = require("os");
const cpus = os.cpus().length;
console.log(cpus);
for (let i = 0; i < cpus; i++) {
  let cp = fork("server.js", {
    cwd: path.resolve(__dirname, "worker"),
  });
  cp.send(
    "server",
    http
      .createServer((req, res) => {
        res.end("Hello World");
      })
      .listen(3400)
  );
  cp.on("exit", (code, signal) => {
    console.log(
      `Worker ${cp.pid} exited with code ${code} and signal ${signal}`
    );
  });
}
```

server.js

```javascript
const http = require("http");

process.on("message", (data, server) => {
  http
    .createServer((req, res) => {
      res.end(process.pid + " " + data);
    })
    .listen(server);
});

console.log("server start");
```

## cluster 模块

cluster 创建集群，是"本地集群"（单机多进程），而不是"分布式集群"（多机多进程）

### 开启多进程

```javascript
if (cluster.isMaster) {
  //child process fork 会以当前文件创建子进程
  //并且isMaster 为false 此时就会执行else方法
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else {
  http
    .createServer((req, res) => {
      res.end("Hello World");
    })
    .listen(9099);
}
```

也可以抽离文件

```javascript
cluster.setupMaster({
  exec: require("path").resolve(__dirname, "worker/server.js"),
});

for (let i = 0; i < cpus; i++) {
  /**
   * 以当前文件创建子进程
   */
  cluster.fork("server.js");
}
```

### 监听进程状态

```javascript
cluster.on("exit", (worker, code, signal) => {
  console.log(`worker ${worker.process.pid} died`);
  cluster.fork();
});
```

## pm2

process manager,统一管理进程启动,重启等,在后台运行,不占用命令行

- start
- stop
- restart
- delete
- logs
- list
- --watch
- -i max 最大核心数开启进程
- pm2 init 初始化 --> ecosystem.config.js
- pm2 start npm -- run dev
- pm2 kill 杀死所有进程
- 可以通过 ecosystem.config.js 的 deploy 配置部署到服务器并提交到 git

```javascript
  deploy: {
    production: {
      user: "root",
      host: "11.11.11.146",
      ref: "origin/master",
      repo: "https://github.com/cs/pm2-test.git",
      path: "/home",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
    },
  },
```
