let { AsyncParallelHook } = require("tapable");
// let queue = new AsyncParallelHook(["name"]);
// console.time("cost");
// queue.tap("1", function (name) {
//   console.log(1);
// });
// queue.tap("2", function (name) {
//   console.log(2);
// });
// queue.tap("3", function (name) {
//   console.log(3);
// });
// queue.callAsync("zhufeng", (err) => {
//   console.log(err);
//   console.timeEnd("cost");
// });


let queue = new AsyncParallelHook(["name"]);
console.time("cost");
queue.tapAsync("1", function (name, callback) {
  setTimeout(function () {
    console.log(1);
    callback();
  }, 1000);
});
queue.tapAsync("2", function (name, callback) {
  setTimeout(function () {
    console.log(2);
    callback();
  }, 800);
});
queue.tapAsync("3", function (name, callback) {
  setTimeout(function () {
    console.log(3);
    callback();
  }, 1000);
});
queue.callAsync("zhufeng", (err) => {
  console.log(err);
  console.timeEnd("cost");
});