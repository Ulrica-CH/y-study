const { SyncBailHook } = require("tapable");
const slice = Array.prototype.slice;
class SyncBailHook1 {
  constructor(args) {
    this.args = args;
    this.taps = [];
  }
  tap(name, fn) {
    this.taps.push(fn);
  }
  call() {
    let args = slice.call(arguments, 0, this.args.length);
    let result;
    let i = 0;
    while (i < this.taps.length && !result) {
      result = this.taps[i++](...args);
    }
  }
}

/** 当回调函数返回非undefined值的时候会停止调用后续的回调 */
const hook = new SyncBailHook(["name", "age"]);
hook.tap("1", (name, age) => {
  console.log(1, name, age);
  //return 1;
});
hook.tap("2", (name, age) => {
  console.log(2, name, age);
  return 2;
});
hook.tap("3", (name, age) => {
  console.log(3, name, age);
  return 3;
});

/**
 * 1 xy 10
 * 2 xy 10
 */
hook.call("xy", 10);
