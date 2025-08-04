# Vu3

## 学习框架三个方向

- 框架本身
- 打包构建
- 相关生态

## Mixin 问题

- 作用域 变量污染
- 不透明,难以查找

## reactive ref

- reactive 要作为对象使用(针对对象)
- ref 在模板种自动拆包 (ref 底层也会转为 reactive)

## 响应式丢失问题

- reactive 定义的变量重新赋值会失去响应式，而 ref 不会
  - 对象赋值的时候实际上是引用地址赋值
  - 对 ref 定义的变量重新赋值时会进入 set 函数，且重新赋值的是一个对象的话，那么它会再次进入 toReactive 函数进行数据劫持
- 解构响应式对象会造成响应式丢失
  - 在解构赋值中，如果是原始类型的话是按照值传递，如果是引用类型的话是按照引用地址传递

## watch

- watch 响应式变更后
- watchEffect 响应式变更后
- watchSyncEffect DOM 更新前
- watchPostEffect DOM 更新后

## 生命周期

- onMounted
- onUpdated
- onUnmonted
- onMounted

## 宏定义

-指编译期的特殊语法指令，主要用于 Vue SFC（单文件组件）的 `<script setup>` 语法糖中。

- 这些“宏”其实是编译器指令，在代码编译阶段会被特殊处理，帮助开发者简化代码和提升开发体验。
- 编译期消失，不会出现在最终的运行时代码中

## 开放封闭

- OCP 原则 五大原则（SOLID）之一
- 对扩展开放，对修改封闭
  - 组件应该允许通过配置、插槽、props、继承、组合等方式扩展其功能或表现
  - 组件的内部实现一旦稳定，不应该因为新需求而频繁修改原有代码，避免引入新 bug

## 泛型 generic

```vue
<script setup lang="ts" generic="T extends Record<string, any>">
interface Props<T> {
  modelValue: T;
  fields: Array<{
    key: keyof T;
    label: string;
    type: "text" | "number" | "email";
  }>;
}

const props = defineProps<Props<T>>();
const emit = defineEmits<{
  "update:modelValue": [value: T];
}>();
</script>
```

## 内置组件

## 运行时组件

- 可以在任意时刻通过 createApp 创建一个组件实例，并挂载到任意 DOM 节点

## 无渲染组件

- 组件只包括了逻辑而不需要自己渲染内容,视图输出是通过作用域插槽交给了消费者组件管理

```vue
<MouseTraker v-slot="{ x, y }">{{x}}</MouseTraker>
```

## v-model

- Vue2
  - 原生标签

```vue
<!-- 原始代码 -->
<input v-model="message" />

<!-- 编译后等价于 -->
<input :value="message" @input="message = $event.target.value" />
```

- 自定义组件

```vue
<!-- 父组件 -->
<MyInput v-model="message" />

<!-- 等价于 -->
<MyInput :value="message" @input="message = $event" />
```

```vue
<!-- MyInput 组件 -->
<template>
  <input :value="value" @input="$emit('input', $event.target.value)" />
</template>

<script>
export default {
  props: ["value"],
  emits: ["input"],
};
</script>
```

- Vue3

  - 原生标签

  - 自定义组件

```vue
<!-- 父组件 -->
<MyInput v-model="message" />

<!-- 等价于 -->
<MyInput :modelValue="message" @update:modelValue="message = $event" />
```

```vue
<!-- MyInput 组件 -->
<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineProps<{ modelValue: string }>()
defineEmits<{ 'update:modelValue': [value: string] }>()
</script>
```
