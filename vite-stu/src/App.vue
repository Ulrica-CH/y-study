<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";

console.log(import.meta.env);

// ❌ 报错！process is not defined
// console.log(process.env);
</script>

<template>
  <HelloWorld msg="cs" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
</style>
