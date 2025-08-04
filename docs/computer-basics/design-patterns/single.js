class Single {
  constructor() {}
  
}
Single.instance = null;
Single.getInstance = function () {
  if (!Single.instance) {
    Single.instance = new Single();
  }
  return Single.instance;
};

const single = Single.getInstance();
const single2 = Single.getInstance();
console.log(single === single2);