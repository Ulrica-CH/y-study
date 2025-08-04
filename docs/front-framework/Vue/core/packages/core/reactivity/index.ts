import { track } from "../effect";

const map = new WeakMap();
enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
}
export function reactive(target: object) {
  /** 判断是否已经代理过 */
  if (map.has(target)) return map.get(target);
  /** 如果已经代理过，直接返回 */
  if (target[ReactiveFlags.IS_REACTIVE]) return target;
  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      if (key === ReactiveFlags.IS_REACTIVE) return true;
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      return Reflect.set(target, key, value, receiver);
    },
  });
  map.set(target, proxy);
  return proxy;
}
