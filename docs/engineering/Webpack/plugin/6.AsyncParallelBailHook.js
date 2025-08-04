let { AsyncParallelBailHook } = require("tapable");

/**
 * 有一个任务返回值不为空就直接结束
 * 对于promise来说，resolve还reject并没有区别
 * 区别在于你是否传给它们的参数
 */
// let queue = new AsyncParallelBailHook(["name"]);
// console.time("cost");
// queue.tap("1", function (name) {
//   console.log(1);
//   return "Wrong";
// });
// queue.tap("2", function (name) {
//   console.log(2);
// });
// queue.tap("3", function (name) {
//   console.log(3);
// });
// queue.callAsync("xy", (err) => {
//   console.log(err);
//   console.timeEnd("cost");
// });

// let { AsyncParallelBailHook } = require("tapable");
// let queue = new AsyncParallelBailHook(["name"]);
// console.time("cost");
// queue.tapAsync("1", function (name, callback) {
//   console.log(1);
//   callback("Wrong1");
// });
// queue.tapAsync("2", function (name, callback) {
//   console.log(2);
//   callback();
// });
// queue.tapAsync("3", function (name, callback) {
//   console.log(3);
//   callback();
// });
// /**
//  * 1
//  * Wrong1
//  * cost: 3.001ms
//  */
// queue.callAsync("xy", (err) => {
//   console.log(err);
//   console.timeEnd("cost");
// });


let queue = new AsyncParallelBailHook(["name"]);
console.time("cost");
queue.tapPromise("1", function (name) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log(1);
      //对于promise来说，resolve还reject并没有区别
      //区别在于你是否传给它们的参数
      resolve(1);
    }, 1000);
  });
});
queue.tapPromise("2", function (name) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log(2);
      resolve();
    }, 2000);
  });
});

queue.tapPromise("3", function (name) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log(3);
      resolve();
    }, 3000);
  });
});

/**
 * 1
 * 成功 1
 * cost: 1.007s
 * 2
 * 3
 */
queue.promise("xy").then(
  (result) => {
    console.log("成功", result);
    console.timeEnd("cost");
  },
  (err) => {
    console.error("失败", err);
    console.timeEnd("cost");
  }
);