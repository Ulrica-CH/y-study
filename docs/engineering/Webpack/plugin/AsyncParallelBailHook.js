// 创建
const { AsyncParallelBailHook } = require("tapable");
// 注册
const hook = new AsyncParallelBailHook(["name", "age"]);
// hook.tapAsync("1", (name, age, callback) => {
//   setTimeout(() => {
//     console.log(1, name, age);
//     callback();
//   }, 1000);
// });
// hook.tapAsync("2", (name, age, callback) => {
//   setTimeout(() => {
//     console.log(2, name, age);
//     callback('wrong');
//   }, 2000);
// });
// hook.tapAsync("3", (name, age, callback) => {
//   setTimeout(() => {
//     console.log(3, name, age);
//     callback('wrong');
//   }, 3000);
// });
// // 调用
// hook.callAsync("xxxy", 10, () => {
//   console.log("done");
// });
hook.tapPromise("1", (name, age) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(1, name, age);
      resolve("1");
    }, 1000);
  });
});
hook.tapPromise("2", (name, age) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2, name, age);
      resolve("2");
    }, 2000);
  });
});
hook.tapPromise("3", (name, age) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(3, name, age);
      resolve("第二个");
    }, 3000);
  });
});
//调用
hook.promise("xxxy", 10).then((res) => {
  console.log("done");
});
// 打印结果
