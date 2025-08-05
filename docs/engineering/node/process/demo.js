const { spawn ,execFile} = require("child_process");
const path = require("path");

/**
 * 1.stdio: "ignore", 忽略子进程的输出
 * 2.stdio: [0,1,2] === stdio: [process.stdin, process.stdout, process.stderr]  === stdio: inherit
 *   子进程的输出会打印到控制台 ,但是父进程无法读取，也就是进程间无法通信
 * 3.stdio: ['pipe','pipe','pipe'] ===  stdio: pipe
 *   子进程通过process.stdout.write(sum+'');写入
 *   父进程通过cp.stdout.on("data", (data) => { console.log(data.toString());});读取
 * 4.默认就是stdio: pipe 通过流的方式
 */
// const cp = spawn("node", ["sum.js"], {
//   cwd: path.resolve(__dirname, "worker"),
//   //   stdio: "ignore",
//   //   stdio: [0,1,2]
// //   stdio: ["pipe", "pipe", "pipe"],
// });
// console.log(process.pid, cp.pid);
// cp.stdout.on("data", (data) => {
//   console.log("父进程读取", data.toString());
// });
// cp.on("close", (code) => {
//   console.log(`子进程关闭，退出码 ${code}`);
// });
// cp.on("error", (err) => {
//   console.log(err);
// });

// cp.on("exit", (code) => {
//   console.log(`子进程退出，退出码 ${code}`);
// });
// const { execFile } = require('child_process');

execFile('node', ['sum.js'], {
    cwd:path.resolve(__dirname,'worker')
}, (error, stdout, stderr) => {
  if (error) {
    console.error('执行错误:', error);
    return;
  }
  console.log('node脚本输出:', stdout);
});

execFile('sh', ['demo.sh'], {
  cwd:path.resolve(__dirname,'worker')
}, (error, stdout, stderr) => {
if (error) {
  console.error('执行错误:', error);
  return;
}
console.log('node脚本输出:', stdout);
});

execFile('ls', ['-l'], {
  cwd:path.resolve(__dirname,'worker')
}, (error, stdout, stderr) => {
  if (error) {
    console.error('执行错误:', error);
    return;
  }
  console.log('ls脚本输出:', stdout);
});