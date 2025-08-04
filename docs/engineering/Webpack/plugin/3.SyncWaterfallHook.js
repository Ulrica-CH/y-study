const {SyncWaterfallHook} = require('tapable');
const slice = Array.prototype.slice;
class SyncWaterfallHook1{
    constructor(args) {
        this.args= args;
        this.taps=[];
    }
    tap(name,fn) {
        this.taps.push(fn);
    }
    call() {
        let args = slice.call(arguments,0,this.args.length);
        let first=args[0];
        let result;
        let i=0;
        while(i<this.taps.length){
            first = result||first;
            result = this.taps[i++](first,...args.slice(1));
        }
    }
}
/**
 * 如果前一个 tap 有返回值，就用这个返回值作为下一个 tap 的第一个参数
 * 如果前一个 tap 返回 undefined，就保持使用上一个有效的返回值
 */
const hook = new SyncWaterfallHook(['name','age']);
hook.tap('1',(name,age)=>{
    console.log(1,name,age);
    return 1;
});
hook.tap('2',(name,age)=>{
    console.log(2,name,age);
    return ;
});
hook.tap('3',(name,age)=>{
    console.log(3,name,age);
    return 3;
});

hook.call('zhufeng',10);