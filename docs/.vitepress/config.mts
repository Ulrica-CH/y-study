import { defineConfig } from "vitepress";

export default defineConfig({
  title: "MichstaBe",
  description:
    "XY的前端技术学习记录，涵盖JavaScript、Vue3、构建工具、数据结构算法等",
  lang: "zh-CN",
  head: [["link", { rel: "icon", href: "/logo.jpeg" }]],

  themeConfig: {
    siteTitle: "MichstaBe",

    nav: [
      { text: "首页", link: "/" },
      {
        text: "计算机基础",
        items: [
          { text: "二进制与编码", link: "/computer-related/binary/index" },
          { text: "正则表达式", link: "/computer-related/regular-expression/index" },
          {
            text: "数据结构与算法",
            link: "/computer-related/data-structures/index",
          },
          { text: "设计模式", link: "/computer-related/design-patterns/index" },
          { text: "计算机网络", link: "/computer-related/network/index" },
          { text: "浏览器原理", link: "/computer-related/browser/index" },
        ],
      },
      {
        text: "前端技术",
        items: [
          { text: "前端基础", link: "/front-basic/index" },
          { text: "JavaScript进阶", link: "/front-advanced/javascript/index" },
          { text: "TypeScript", link: "/front-advanced/typescript/index" },
          { text: "手写实现", link: "/front-advanced/handwritten/index" },
        ],
      },
      {
        text: "框架技术",
        items: [
          { text: "Vue", link: "/front-framework/Vue/base1" },
          { text: "React", link: "/front-framework/react/index" },
        ],
      },
      {
        text: "工程化",
        items: [
          { text: "架构思想", link: "/engineering/micro-kernel/index" },
          { text: "代码规范", link: "/engineering/eslint/index" },
          { text: "NodeJS", link: "/engineering/node/index" },
          { text: "包管理工具", link: "/engineering/package-managers/index" },
          { text: "构建工具", link: "/engineering/build-tools/index" },
          { text: "性能优化", link: "/engineering/performance/index" },
          { text: "微前端", link: "/engineering/micro-frontend/index" },
          { text: "AI工具", link: "/engineering/ai/index" },
          { text: "版本控制", link: "/engineering/git/index" },
        ],
      },
      {
        text: "实践记录",
        items: [
          { text: "项目记录", link: "/record/project-record/index" },
          { text: "踩坑记录", link: "/record/pit-record/index" },
        ],
      },
      {
        text: "工具汇总",
        items: [
          { text: "常用命令", link: "/summary/command/index" },
          { text: "实用软件", link: "/summary/software/index" },
          { text: "快速导航", link: "/summary/website/index" },
        ],
      },
    ],

    sidebar: {
      "/computer-related/": [
        {
          text: "计算机基础",
          items: [
            { text: "二进制与编码", link: "/computer-related/binary/index" },
            { text: "正则表达式", link: "/computer-related/regular-expression/index" },
            {
              text: "数据结构与算法",
              link: "/computer-related/data-structures/index",
            },
            {
              text: "设计模式",
              link: "/computer-related/design-patterns/index",
            },
            {
              text: "计算机网络",
              link: "/computer-related/network/index",
              collapsed: false,
              items: [
                // { text: "概述", link: "/computer-related/network/index" },
                {
                  text: "物理层",
                  link: "/computer-related/network/physical-layer/index",
                },
                {
                  text: "数据链路层",
                  link: "/computer-related/network/data-link-layer/index",
                },
                {
                  text: "网络层",
                  link: "/computer-related/network/network-layer/index",
                },
                {
                  text: "传输层",
                  link: "/computer-related/network/transport-layer/index",
                },
                {
                  text: "应用层",
                  link: "/computer-related/network/application-layer/index",
                },
              ],
            },
            {
              text: "浏览器原理",
              link: "/computer-related/browser/index",
              collapsed: false,
              items: [
                { text: "浏览器架构", link: "/computer-related/browser/index" },
                {
                  text: "事件循环",
                  link: "/computer-related/browser/architecture",
                },
                {
                  text: "浏览器渲染",
                  link: "/computer-related/browser/render/index",
                },
                { text: "V8引擎", link: "/computer-related/browser/v8" },
                {
                  text: "垃圾回收",
                  link: "/computer-related/browser/garbage-collection",
                },
                { text: "浏览器缓存", link: "/computer-related/browser/cache" },
                {
                  text: "浏览器安全",
                  link: "/computer-related/browser/security",
                },
              ],
            },
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
          items: [
            { text: "HTML", link: "/front-basic/html/index" },
            { text: "CSS", link: "/front-basic/css/index" },
            { text: "JavaScript", link: "/front-basic/javascript/index" },
          ],
        },
      ],
      "/front-framework/Vue/": [
        {
          text: "基础梳理",
          items: [
            { text: "基础梳理一", link: "/front-framework/Vue/base1" },
            { text: "基础梳理二", link: "/front-framework/Vue/base2" },
            { text: "基础梳理三", link: "/front-framework/Vue/base3" },
          ],
        },
        {
          text: "源码架构",
          items: [
            { text: "总体架构", link: "/front-framework/Vue/core1" },
            { text: "编译时原理", link: "/front-framework/Vue/compile" },
            { text: "响应式原理", link: "/front-framework/Vue/reactivity" },
            { text: "虚拟DOM", link: "/front-framework/Vue/virtual-dom" },
            { text: "运行时原理", link: "/front-framework/Vue/runtime" },
            { text: "Pinia", link: "/front-framework/Vue/pinia" },
            { text: "VueRouter", link: "/front-framework/Vue/vue-router" },
          ],
        },
      ],
      "/front-advanced/javascript/": [
        {
          text: "JavaScript进阶",
          collapsed: false,
          items: [
            {
              text: "类型转换",
              link: "/front-advanced/javascript/type-conversion/index",
            },
            {
              text: "执行上下文",
              link: "/front-advanced/javascript/execution-context",
            },
            {
              text: "变量声明",
              link: "/front-advanced/javascript/variable-declaration",
            },
            { text: "闭包", link: "/front-advanced/javascript/closure" },
            { text: "this指向", link: "/front-advanced/javascript/this" },
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
            { text: "async/await", link: "/front-advanced/javascript/async" },
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
              text: "TypeScript基础",
              link: "/front-advanced/typescript/basic/index",
            },
          ],
        },
      ],
      "/engineering/build-tools/": [
        {
          text: "构建工具",
          items: [
            {
              text: "Webpack",
              link: "/engineering/build-tools/Webpack/index",
              collapsed: false,
              items: [
                {
                  text: "Webpack基础",
                  link: "/engineering/build-tools/Webpack/basic/index",
                },
                {
                  text: "WebpackLoader",
                  link: "/engineering/build-tools/Webpack/loader/index",
                },
                {
                  text: "WebpackPlugin",
                  link: "/engineering/build-tools/Webpack/plugin/index",
                },
               
                {
                  text: "WebpackHMR",
                  link: "/engineering/build-tools/Webpack/hmr/index",
                },

                {
                  text: "WebpackSourceMap",
                  link: "/engineering/build-tools/Webpack/source-map/index",
                },
                {
                  text: "Webpack优化",
                  link: "/engineering/build-tools/Webpack/optimization/index",
                },
                {
                  text: "Webpack流程",
                  link: "/engineering/build-tools/Webpack/process/index",
                },
              ],
            },
            { text: "Rollup", link: "/engineering/build-tools/Rollup/index" },
            { text: "Vite", link: "/engineering/build-tools/Vite/index",
              collapsed: false,
              items: [
                { text: "Vite基础", link: "/engineering/build-tools/Vite/basic/index" },
                
                { text: "VitePlugin", link: "/engineering/build-tools/Vite/plugin/index" },
                { text: "ViteDevServer", link: "/engineering/build-tools/Vite/dev-server/index" },
                
                { text: "Vite优化", link: "/engineering/build-tools/Vite/optimization/index" },
                { text: "Vite流程", link: "/engineering/build-tools/Vite/process/index" },
              ],
             },
            { text: "EsBuild", link: "/engineering/build-tools/EsBuild/index" },
            {
              text: "Turbopack",
              link: "/engineering/build-tools/Turbopack/index",
            },
          ],
        },
      ],
      "/engineering/": [
        {
          text: "工程化",
          items: [
            { text: "微内核架构", link: "/engineering/micro-kernel/index" },
            { text: "Monorepo", link: "/engineering/monorepo/index" },
            { text: "代码规范", link: "/engineering/eslint/index" },
            {
              text: "NodeJS",
              link: "/engineering/node/index",
              collapsed: false,
              items: [
                { text: "进程", link: "/engineering/node/process/index" },
                { text: "集群", link: "/engineering/node/cluster/index" },
                {
                  text: "事件循环",
                  link: "/engineering/node/event-loop/index",
                },
                { text: "模块化", link: "/engineering/node/modules/index" },
                { text: "Buffer", link: "/engineering/node/buffer/index" },
              ],
            },
            {
              text: "包管理工具",
              collapsed: false,
              items: [
                {
                  text: "npm",
                  link: "/engineering/package-managers/npm/index",
                },
                {
                  text: "yarn",
                  link: "/engineering/package-managers/yarn/index",
                },
                {
                  text: "pnpm",
                  link: "/engineering/package-managers/pnpm/index",
                },
              ],
            },
            { text: "构建工具", link: "/engineering/build-tools/index" },
            {
              text: "性能优化",
              link: "/engineering/performance/index",
              collapsed: false,
              items: [
                {
                  text: "浏览器性能优化概念",
                  link: "/engineering/performance/web-performance/index",
                },
                {
                  text: "浏览器性能优化补充",
                  link: "/engineering/performance/web-performance/supplement",
                },
                {
                  text: "懒加载",
                  link: "/engineering/performance/web-performance/lazy-load",
                },
                {
                  text: "浏览器性能优化实战",
                  link: "/engineering/performance/web-performance/real-combat",
                },
                {
                  text: "Webpack性能优化",
                  link: "/engineering/performance/webpack-performance/index",
                },
                {
                  text: "Vite性能优化",
                  link: "/engineering/performance/vite-performance/index",
                },
              ],
            },
            { text: "微前端", link: "/engineering/micro-frontend/index" },
            {
              text: "AI工具",
              link: "/engineering/ai/index",
              collapsed: false,
              items: [{ text: "MCP", link: "/engineering/ai/mcp/index" }],
            },
            { text: "版本控制", link: "/engineering/git/index" },
          ],
        },
      ],

      "/summary/": [
        {
          text: "工具汇总",
          items: [
            {
              text: "常用命令",
              collapsed: false,
              items: [
                { text: "Node命令", link: "/summary/command/node/index" },
                { text: "Git命令", link: "/summary/command/git/index" },
                { text: "Docker命令", link: "/summary/command/docker/index" },
                { text: "Linux命令", link: "/summary/command/linux/index" },
              ],
            },
            { text: "实用软件", link: "/summary/software/index" },
            { text: "快速导航", link: "/summary/website/index" },
            {
              text: "远程部署",
              link: "/summary/command/remote-deployment/index",
            },
          ],
        },
      ],

      "/record/": [
        {
          text: "实践记录",
          items: [
            {
              text: "项目记录",
              link: "/record/project-record/index",
              items: [
                {
                  text: "组件封装",
                  link: "/record/project-record/components/index",
                },
                {
                  text: "业务组件",
                  link: "/record/project-record/business-components/index",
                },
              ],
            },
            {
              text: "踩坑记录",
              link: "/record/pit-record/index",
              items: [
                { text: "常见问题", link: "/record/pit-record/common/index" },
              ],
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/Ulrica-CH/Study_Node" },
      { icon: "website", link: "https://michstabe.cn" },
    ],

    footer: {
      copyright: "Copyright © 2024 XY - 前端技术学习笔记",
    },

    search: {
      provider: "local",
    },
  },
});
