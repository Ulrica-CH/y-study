# Monorepo

## 代码组织方式

- 单仓库单应用

  - 协作效率低，分割，无法统一

- 多仓库多应用

  - 浪费资源多，无法复用

- 单仓库多应用

  - 统一构建，部署，协作效率高

  - 规范化统一化，复用共用包，节省资源

  - pnpm.workspace.yaml 配置工作区

  - pnpm add @monorepo/ui --workspace 工作区安装依赖

  - pnpm run --filter @monorepo/ui dev 启动子包

  - apps 一般指子应用 packages 指子包

    - 思考：apps 下面有 vue 和 react 应用，相关依赖安装到根目录还是子目录？

    - 从长远看：安装到根目录，因为后续可能还有别的 vue react 应用

## 用单一仓库管理多子应用，多子包的工程化项目管理方式