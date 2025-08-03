## 依赖预解析

- 解决了三个问题
  - 不同的第三方包导出格式可能不同
  - 路径的查找处理 from 'loadsh' -> './node_modules/lodash'
  - 多包传输问题 -> 合并到一个文件并输出为 ESM,缓存起来，写入 .vite/deps 文件夹
