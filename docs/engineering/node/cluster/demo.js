const { fork } = require("child_process");
const path = require("path");
const http = require("http");
const os = require("os");
const cluster = require("cluster");
const cpus = os.cpus().length;
// console.log('CPU 核心数:', cpus);

// // 创建主服务器
// const server = http.createServer();
// server.listen(3400, () => {
//   console.log('主服务器启动在端口 3400');
// });

// for (let i = 0; i < cpus - 1; i++) {
//   let cp = fork("server.js", {
//     cwd: path.resolve(__dirname, "worker"),
//   });

//   // 传递服务器 handle 给子进程
//   cp.send("server", server);

//   cp.on("exit", (code, signal) => {
//     console.log(`Worker ${cp.pid} exited with code ${code} and signal ${signal}`);
//   });
// }

// if (cluster.isMaster) {
//   //child process fork 会以当前文件创建子进程
//   //并且isMaster 为false 此时就会执行else方法
//   for (let i = 0; i < cpus; i++) {
//     cluster.fork();
//   }
// } else {
//   http
//     .createServer((req, res) => {
//       res.end("Hello World");
//     })
//     .listen(9099);
// }
console.log(process.cwd(),process.__dirname,__filename)
cluster.setupMaster({
  exec: require("path").resolve(__dirname, "worker/server.js"),
});
cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
});
for (let i = 0; i < cpus; i++) {
    /** 
     * 以当前文件创建子进程
     */
  cluster.fork('server.js');
}