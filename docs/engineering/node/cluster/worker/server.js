// worker/server.js (修正版)
const http = require("http");

process.on("message", (data, serverHandle) => {
  if (data === "server" && serverHandle) {
    // 创建新的 HTTP 服务器并使用传递的 handle
    const server = http.createServer((req, res) => {
      res.end(`Response from process ${process.pid}: ${data}`);
    });
    
    // 使用传递的 handle 监听
    server.listen(serverHandle, () => {
      console.log(`Worker ${process.pid} is listening on shared port`);
    });
  }
});

console.log(`Worker ${process.pid} started`);