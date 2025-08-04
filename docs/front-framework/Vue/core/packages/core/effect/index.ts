/**
 * 全局变量，表示“当前正在执行的 effect（副作用函数）”
 * effect(fn) 执行时，fn 里面会访问响应式数据。
 * 响应式数据的 getter 需要知道“是谁在用我”，才能把当前 effect 收集为依赖
 */

export let activeEffect: any = null;
export function effect(fn: any) {
  const _effect = new ReactiveEffect(fn);
  _effect.run();
}

class ReactiveEffect {
  public active = true;
  public deps = [];
  /**
   * 保存上一个 activeEffect，实现 effect 的嵌套支持
   */
  public parent = null;
  constructor(public fn: any) {}
  run() {
    if (!this.active) {
      return this.fn();
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      return this.fn();
    } finally {
      activeEffect = this.parent;
      this.parent = null;
    }
  }
}

const targetMap = new WeakMap();
export function track(target: any, key: any) {
  if (!activeEffect) return;
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  let shouldTrack = !dep.has(activeEffect);
  if (shouldTrack) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}
