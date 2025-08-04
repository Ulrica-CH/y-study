import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MichstaBe",
  head: [["link", { rel: "icon", href: "/logo.jpeg" }]],

  description:
    "XY的前端技术学习记录，涵盖JavaScript、Vue3、构建工具、数据结构算法等",
  lang: "zh-CN",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: "MichstaBe",

    nav: [
      { text: "首页", link: "/" },
      {
        text: "计算机",
        items: [
          { text: "二进制与编码", link: "/computer-related/binary/index" },
          { text: "设计模式", link: "/computer-related/design-patterns/index" },
          { text: "计算机网络", link: "/computer-related/network/index" },
          {
            text: "数据结构与算法",
            link: "/computer-related/data-structures/index",
          },
          { text: "浏览器原理", link: "/computer-related/browser/index" },
        ],
      },
      {
        text: "前端基础",
        items: [
          { text: "HTML", link: "/front-basic/html/index" },
          { text: "CSS", link: "/front-basic/css/index" },
          { text: "JavaScript", link: "/front-basic/javascript/index" },
        ],
      },
      {
        text: "前端进阶",
        items: [

          { text: "正则表达式", link: "/front-advanced/javascript/regex" },
          { text: "JavaScript高级", link: "/front-advanced/javascript/index" },
          { text: "TypeScript", link: "/front-advanced/typescript/index" },
          { text: "手写实现", link: "/front-advanced/handwritten/index" },
        ],
      },
      {
        text: "前端框架",
        items: [
          { text: "Vue", link: "/front-framework/Vue/base1" },
          { text: "React", link: "/front-framework/react/index" },
        ],
      },
      {
        text: "工程化",
        items: [
          { text: "微内核架构", link: "/engineering/micro-kernel/index" },
          { text: "Monorepo模式", link: "/engineering/monorepo/index" },
          { text: "Babel编译", link: "/engineering/micro-kernel/index" },
          { text: "NodeJS", link: "/engineering/node/index" },
          { text: "包管理工具", link: "/engineering/package-managers/index" },
          { text: "构建工具", link: "/engineering/build-tools/index" },
          { text: "性能优化", link: "/engineering/performance/index" },
          { text: "微前端", link: "/engineering/micro-frontend/index" },
          { text: "AI相关", link: "/engineering/ai/index" },
          { text: "GIT", link: "/engineering/git/index" },
          { text: "脚手架", link: "/engineering/scaffold/index" },
        ],
      },
      // { text: "手写实现", link: "/handwritten/" },
      {
        text: "开发记录",
        items: [
          { text: "踩坑记录", link: "/project-record/index" },
          { text: "项目记录", link: "/project-record/project-record/index" },
        ],
      },
      {
        text: "常用汇总",
        items: [
          { text: "实用软件", link: "/summary/index" },
          { text: "快速导航", link: "/summary/website/index" },
          { text: "常用命令", link: "/summary/command/index" },
        ],
      },
      // {
      //   text: "提效工具",
      //   items: [{ text: "提效工具", link: "/command/index" }],
      // },
    ],

    sidebar: {
      "/computer-related/binary/": [
        {
          text: "二进制与编码",
          items: [
            { text: "二进制与编码", link: "/computer-related/binary/index" },
          ],
        },
      ],
      "/computer-related/design-patterns/": [
        {
          text: "设计模式",
          collapsed: false,
          items: [
            {
              text: "基础概念",
              link: "/computer-related/design-patterns/index",
            },
            {
              text: "创建型模式",
              link: "/computer-related/design-patterns/create-patterns/index",
            },
            {
              text: "结构型模式",
              link: "/computer-related/design-patterns/structural-patterns/index",
            },
            {
              text: "行为型模式",
              link: "/computer-related/design-patterns/behavioral-patterns/index",
            },
          ],
        },
      ],

      "/front-basic/": [
        {
          text: "前端基础",
          items: [{ text: "前端基础", link: "/front-basic/principles" }],
        },
      ],
      "/front-framework/Vue/": [
        {
          text: "基础梳理",
          items: [
            {
              text: "基础梳理一",
              link: "/front-framework/Vue/base1",
            },
            {
              text: "基础梳理二",
              link: "/front-framework/Vue/base2",
            },
            {
              text: "基础梳理三",
              link: "/front-framework/Vue/base3",
            },
          ],
        },
        {
          text: "源码架构",
          items: [
            {
              text: "总体架构",
              link: "/front-framework/Vue/core1",
            },
            {
              text: "编译时原理",
              link: "/front-framework/Vue/compile",
            },
            {
              text: "响应式原理",
              link: "/front-framework/Vue/reactivity",
            },
            {
              text: "运行时原理",
              link: "/front-framework/Vue/runtime",
            },
            {
              text: "Pinia",
              link: "/front-framework/Vue/pinia",
            },
            {
              text: "VueRouter",
              link: "/front-framework/Vue/vue-router",
            },
          ],
        },
      ],
      "/front-advanced/javascript/": [
        {
          text: "JavaScript原理",
          collapsed: false,
          items: [
           
            {
              text: "执行上下文",
              link: "/front-advanced/javascript/execution-context",
            },
            {
              text: "变量声明",
              link: "/front-advanced/javascript/variable-declaration",
            },
            {
              text: "闭包",
              link: "/front-advanced/javascript/closure",
            },
            {
              text: "this",
              link: "/front-advanced/javascript/this",
            },
            {
              text: "原型链",
              link: "/front-advanced/javascript/prototype-chain",
            },
            { text: "ES6+特性", link: "/front-advanced/javascript/es6" },
            {
              text: "面向对象",
              link: "/front-advanced/javascript/object-oriented/index",
            },

            { text: "Promise基础", link: "/front-advanced/javascript/promise" },
            {
              text: "生成器与迭代器",
              link: "/front-advanced/javascript/generator-iterator",
            },
            {
              text: "async/await",
              link: "/front-advanced/javascript/async",
            },
            {
              text: "手写Promise",
              link: "/front-advanced/javascript/handwritten/promise",
            },
            {
              text: "Proxy与Reflect",
              link: "/front-advanced/javascript/proxy-reflect",
            },
            {
              text: "Symbol与MapSet",
              link: "/front-advanced/javascript/symbol-mapset",
            },
            {
              text: "异常处理",
              link: "/front-advanced/javascript/handwritten/index",
            },
            { text: "模块化", link: "/front-advanced/javascript/modules" },
          ],
        },
      ],
      "/front-advanced/typescript/": [
        {
          text: "TypeScript",
          items: [
            {
              text: "TypeScript",
              link: "/front-advanced/typescript/basic/index",
            },
          ],
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
      "/engineering/build-tools/": [
        {
          text: "Webpack",
          collapsed: false,
          items: [
            {
              text: "基础",
              link: "/engineering/build-tools/Webpack/index",
            },
            {
              text: "loader",
              items: [
                {
                  text: "常用loader",
                  link: "/engineering/build-tools/Webpack/index",
                },
                {
                  text: "自定义loader",
                  link: "/engineering/build-tools/Webpack/index",
                },
              ],
            },
            {
              text: "plugin",
              items: [
                {
                  text: "常用插件",
                  link: "/engineering/build-tools/Webpack/index",
                },
                {
                  text: "tapable",
                  link: "/engineering/build-tools/Webpack/index",
                },
                {
                  text: "自定义插件",
                  link: "/engineering/build-tools/Webpack/index",
                },
                {
                  text: "个人手写插件汇总",
                  link: "/engineering/build-tools/Webpack/index",
                },
              ],
            },
            {
              text: "优化",
              items: [
                {
                  text: "分包",
                  link: "/engineering/build-tools/Webpack/index",
                },
                {
                  text: "缓存",
                  link: "/engineering/build-tools/Webpack/index",
                },
                {
                  text: "压缩",
                  link: "/engineering/build-tools/Webpack/index",
                },
                {
                  text: "Tree Shaking",
                  link: "/engineering/build-tools/Webpack/index",
                },
              ],
            },
            {
              text: "HMR",
              link: "/engineering/build-tools/Webpack/index",
            },
            {
              text: "模块联邦",
              link: "/engineering/build-tools/Webpack/index",
            },
            {
              text: "构建流程",
              link: "/engineering/build-tools/Webpack/index",
            },
          ],
        },
        {
          text: "Rollup",
          collapsed: false,
          items: [
            {
              text: "基础",
              link: "/engineering/build-tools/Webpack/index",
            },
          ],
        },
        {
          text: "Vite",
          collapsed: false,
          items: [
            {
              text: "基础",
              link: "/engineering/build-tools/Webpack/index",
            },
          ],
        },
        {
          text: "EsBuild",
          collapsed: false,
          items: [
            {
              text: "基础",
              link: "/engineering/build-tools/Webpack/index",
            },
          ],
        },

        {
          text: "Tsup",
          collapsed: false,
          items: [
            {
              text: "基础",
              link: "/engineering/build-tools/Webpack/index",
            },
          ],
        },
        {
          text: "Turbopack",
          collapsed: false,
          items: [
            {
              text: "基础",
              link: "/engineering/build-tools/Webpack/index",
            },
          ],
        },
      ],
      "/node/": [
        {
          text: "NodeJS",
          items: [{ text: "脚本传参", link: "/node/script-params/index" }],
        },
      ],
      "/engineering/": [
        { text: "微内核架构", link: "/engineering/micro-kernel" },
        { text: "Monorepo模式", link: "/engineering/monorepo" },
        { text: "Babel编译", link: "/engineering/babel" },
        { text: "NodeJS", link: "/engineering/node" },
        { text: "包管理工具", link: "/engineering/package-managers" },
        { text: "构建工具", link: "/engineering/build-tools" },
        { text: "性能优化", link: "/engineering/performance" },
        { text: "微前端", link: "/engineering/micro-frontend" },
      ],
      "/computer-related/browser/": [
        {
          text: "浏览器原理",
          collapsed: false,

          items: [
            {
              text: "浏览器架构",
              link: "/computer-related/browser/index",
            },
            {
              text: "事件循环",
              link: "/computer-related/browser/architecture",
            },
            {
              text: "浏览器渲染",
              link: "/computer-related/browser/render",
            },
            {
              text: "V8引擎",
              link: "/computer-related/browser/v8",
            },
            {
              text: "垃圾回收",
              link: "/computer-related/browser/garbage-collection",
            },
            {
              text: "浏览器缓存",
              link: "/computer-related/browser/cache",
            },
            {
              text: "浏览器安全",
              link: "/computer-related/browser/security",
            },
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
      "/project-record/": [
        {
          text: "项目记录",
          items: [{ text: "项目记录", link: "/project-record/index" }],
        },
      ],
      "/command/": [
        {
          text: "常用命令",
          items: [
            { text: "查询网站", link: "/command/website/index" },
            { text: "远程部署", link: "/command/remote-deployment/index" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/Ulrica-CH/Study_Node" },
      { icon: "website", link: "https://michstabe.cn" },
    ],

    footer: {
      // message: "Released under the MIT License.",
      copyright: "Copyright © 2024-XY 前端技术学习笔记",
    },

    search: {
      provider: "local",
    },
  },
});
