# 状态管理

## CompositionAPi 基础状态管理

## Provide/inject 深层次跨级管理

- 传输 props 场景
- 国际化场景 全局切换
- 主题切换场景

## Vuex

- 单向数据流,单一状态树,一个全局对象
- vuex 需要 namespace 来模块化 this.$store.commit('user/setName', 'John')
- 状态提交流程复杂,需要 dispatch actions 提交 mutation 再修改 state
- 对 TS 支持差

## pinia

- 单向数据流,单一状态树,天生支持模块化管理
- 两种写法
  - 面向对象
  - 函数式编程写法
- 设计理念
- 插件化机制
  - 一个函数,会拿到 pinia contentText 参数进行一些处理比如本地存储
- 原理
  - 响应式系统：利用 Vue 3 的 reactive 和 ref 实现响应式
  - 依赖收集：自动收集使用 store 的组件依赖
  - 状态共享：通过 Map 管理全局 store 实例
  - 自动更新：状态变化时自动触发组件更新

## vue-dumi
