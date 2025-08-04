## computed

## 响应式工具

- ref
  - 如果是对象 其实是用 reactive 处理
- reactive
  - 直接赋值是失去响应式,因为改变了指针
  - 解构如果是基本类型,会失去响应式,其实本质上也是指针内存地址变了
- readonly
- shallowRef
  - 浅层响应式,仅追踪 .value 引用变化 的 ref，不会对对象内部属性进行深层响应式转换
  - 只有当整个 .value 被替换时才会触发更新。

```vue
const state = shallowRef({ count: 0, user: { name: 'Alice' } }) watchEffect(()
=> { console.log('state.value:', state.value) }) state.value.count++ // 不会触发
watchEffect 更新 state.value = { count: 1 } // 会触发更新
```

- triggerRef
  - 配合 shallowRef
  - 手动触发一个 shallowRef 的依赖更新

```vue
import { shallowRef, triggerRef } from 'vue' const obj = shallowRef({ count: 0
}) obj.value.count++ triggerRef(obj) // 手动触发更新
```

- shallowReactive
- effectScope
  - 批量管理响应式效果,把相关的 watchEffect、computed 等放在一个作用域里
  - 组件卸载时，作用域内的所有效果会自动停止,不需要手动停止
  - 父作用域停止时，子作用域也会停止
  - scope.run scope.stop
- customRef (重点)
  - track 收集一下依赖 告诉 Vue 有人在用这个值
  - trigger 告诉 Vue 值变了, 触发视图的更新
  - 场景 定义一个防抖

```vue
function myRef(value,timerNum){ let timer // 这个return返回的是自定义的ref
return customRef((track,trigger)=>{ // 这个return返回的是自定义ref里面的逻辑
return{ get(){ // 通知Vue追踪数据的变化 track() return value }, set(newValue){
clearTimeout(timer) timer= setTimeout(() => { value=newValue //
通知vue去重新解析模板 trigger() }, timerNum); } } }) } // let
keyWord=ref('hello') // 使用vue提供的ref let keyWord=myRef('hello',500) //
使用程序员自定义的ref
```

## 生命周期函数

- credted 相当于就是 setup 里
- onBeforeMount
- 第一次收集依赖
- onRenderTracked(看一下)
- onMounted
- 触发更新
- onRenderTriggered(看一下)
- onBeforeUpdated
- 重新收集依赖
- onRenderTracked
- onUpdated
- 卸载
- onBeforeUnmount
- onUnmounted
- onErrorCaptured
  - 错误边界处理
  - 用于捕获后代组件的错误
- 配合 keep-alive
- onActivated
- oDeactivated
- 父子生命周期
  - 父组件到 onRenderTracked
  - 子组件挂载后,父组件在 onMounted
  - update 同理,子组件更新后,父组件在 onUpdated

## 异步组件

- 为了优化性能,仅在需要需要的时候再去服务器加载组件
- 比如大渲染数据组件,图表组件
- defineAsyncComponent 接受一个返回 Promise 的加载函数
- 只有在渲染时候,才会引入对应 chunk 文件(打包会分包)
- ES 模块的动态导入 import 会返回 Promise 所以可以配合其使用
- 实现原理
  - 1

```vue
import {defineAsyncComponent} from 'vue' cons asyncComp =
defineAsyncComponent(() => { import('./comp1.vue') })
```

- Suspense
  - 内置组件,协调对异步依赖的处理,等待异步组件加载时渲染一个加载状态
  - 可以通过 rollup-plugin-visualizer 分析可视化报告

## Teleport

- 挂在到任意节点
- 适用于弹出层,Popover 等

## 自定义指令

- 一个对象,里面有很多生命周期函数
- 参数(el，bindings)

```vue
<div v-example:foo.bar="baz">

// binding 参数
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* `baz` 的值 */,
  oldValue: /* 上一次更新时 `baz` 的值 */
}
```

- 全球注册 app.directive

```JavaScript
const myDirective = { // 在绑定元素的 attribute 前 // 或事件监听器应用前调用
    created(el, binding, vnode) { 
        // 下面会介绍各个参数的细节 }, // 在元素被插入到DOM 前调用 
        beforeMount(el, binding, vnode) {};
        // 在绑定元素的父组件 及他自己的所有子节点都挂载完成后调用 
        mounted(el, binding, vnode) {};
        // 绑定元素的父组件更新前调用 
        beforeUpdate(el, binding, vnode, prevVnode) {};
        // 在绑定元素的父组件 及他自己的所有子节点都更新后调用 
        updated(el, binding, vnode, prevVnode) {};
        // 绑定元素的父组件卸载前调用 
        beforeUnmount(el, binding, vnode) {};
        // 绑定元素的父组件卸载后调用 
        unmounted(el, binding, vnode) {} 
    }
}
```

## 自定义 CompositionApi

- 一种思想,一种编程范式
- 复用逻辑,和 UI 解耦,函数式编程思想
