import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "个人笔记",
  description:
    "XY的前端技术学习记录，涵盖JavaScript、Vue3、构建工具、数据结构算法等",
  lang: "zh-CN",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: "前端技术学习笔记",
    nav: [
      { text: "首页", link: "/" },
      { text: "计算机相关", link: "/computer-related/" },

      // { text: "浏览器原理", link: "/browser/" },
      { text: "前端基础", link: "/front-basic/" },
      { text: "JS高级", link: "/js-advanced/" },
      // { text: "进阶原理", link: "/advanced-principles/" },
      // { text: "TypeScript", link: "/typescript/" },
      { text: "前端框架", link: "/front-framework/" },
      // { text: "前端性能", link: "/front-performance/" },
      { text: "NodeJS", link: "/node/" },
      { text: "工程化", link: "/engineering/" },
      { text: "手写实现", link: "/handwritten/" },
      { text: "项目记录", link: "/project-record/" },
      { text: "常用命令", link: "/command/" },
    ],

    sidebar: {
      "/browser/": [
        {
          text: "浏览器原理",
          items: [{ text: "浏览器原理", link: "/browser/principles" }],
        },
      ],
      "/front-basic/": [
        {
          text: "前端基础",
          items: [{ text: "前端基础", link: "/front-basic/principles" }],
        },
      ],
      "/js-advanced/": [
        {
          text: "JavaScript基础",
          items: [
            { text: "JavaScript原理", link: "/javascript/principles" },
            { text: "ES6+特性", link: "/javascript/es6" },
            { text: "TypeScript", link: "/javascript/typescript" },
            { text: "正则表达式", link: "/javascript/regex" },
            { text: "this与原型", link: "/javascript/this-prototype" },
            { text: "事件循环", link: "/javascript/event-loop" },
            { text: "Promise基础", link: "/javascript/promise" },
            { text: "生成器与迭代器", link: "/javascript/generator-iterator" },
            { text: "Proxy与Reflect", link: "/javascript/proxy-reflect" },
            { text: "Symbol与MapSet", link: "/javascript/symbol-mapset" },
            { text: "模块化", link: "/javascript/modules" },
          ],
        },
      ],
      "/typescript/": [
        {
          text: "TypeScript",
          items: [{ text: "TypeScript", link: "/typescript/basic/index" }],
        },
      ],
      "/front-framework/": [
        {
          text: "vue3",
          items: [
            { text: "Vue3基础", link: "/vue3/basic" },
            { text: "Vue3核心原理", link: "/vue3/core" },
            { text: "响应式系统", link: "/vue3/reactivity" },
            { text: "组件库开发", link: "/vue3/component-library" },
          ],
        },
        {
          text: "React",
        },
      ],
      "/engineering/": [
        {
          text: "构建工具",
          items: [
            // { text: "包管理工具", link: "/build-tools/package-managers" },
            { text: "Webpack", link: "/engineering/Webpack/index" },
            { text: "Vite", link: "/engineering/vite/index" },
            { text: "Rollup", link: "/engineering/Rollup/index" },
            { text: "EsBuild", link: "/engineering/EsBuild/index" },
            { text: "Gulp", link: "/engineering/Gulp/index" },
            { text: "Babel", link: "/engineering/Babel/index" },
          ],
        },
        {
          text: "工程化",
          items: [
            { text: "微内核架构", link: "/engineering/micro-kernel" },
            { text: "包管理工具", link: "/engineering/package-managers" },
            { text: "脚手架", link: "/engineering/scaffold" },
            { text: "微前端", link: "/engineering/micro-frontend" },
            { text: "性能优化", link: "/engineering/performance" },
            { text: "可视化", link: "/engineering/visualization" },
            { text: "AI相关", link: "/engineering/ai/index" },
            { text: "GIT", link: "/engineering/git/index" },
          ],
        },
      ],
      "/computer-related/": [
        {
          text: "计算机基础",
          items: [
            { text: "浏览器原理", link: "/computer-basics/browser/index" },
            { text: "事件循环", link: "/computer-basics/event-loop/index" },
            { text: "V8引擎", link: "/computer-basics/v8" },
            { text: "计算机网络", link: "/computer-basics/network" },
            { text: "二进制与编码", link: "/computer-basics/binary" },
          ],
        },
        {
          text: "数据结构与算法",
          items: [
            { text: "基础数据结构", link: "/data-structures/basic" },
            { text: "排序算法", link: "/data-structures/sorting" },
            { text: "算法思想", link: "/data-structures/algorithms" },
            { text: "进阶数据结构", link: "/data-structures/advanced" },
          ],
        },
      ],
      "/handwritten/": [
        {
          text: "手写实现",
          items: [
            { text: "函数相关", link: "/handwritten/functions" },
            { text: "工具函数", link: "/handwritten/utils" },
            { text: "数组相关", link: "/handwritten/arrays" },
            { text: "算法实现", link: "/handwritten/algorithms" },
          ],
        },
      ],
      "/ci-cd/": [
        {
          text: "Docker",
          items: [{ text: "Docker基础", link: "/ci-cd/docker" }],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/your-username/Study_Node" },
    ],

    // footer: {
    //   // message: "Released under the MIT License.",
    //   copyright: "Copyright © 2024-XY 前端技术学习笔记",
    // },

    search: {
      provider: "local",
    },
  },
});
