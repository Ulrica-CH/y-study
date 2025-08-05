# 业务组件集成

## 1. **私有 NPM 包方案**

### 1.1 创建组件库包

```Bash
# 创建组件库项目
mkdir company-ui-components
cd company-ui-components
npm init -y
```

```JSON
// package.json
{
  "name": "@company/element-ui-components",
  "version": "1.0.0",
  "description": "基于 Element UI 的业务组件库",
  "main": "dist/index.js",
  "files": [
    "dist",
    "src"
  ],
  "peerDependencies": {
    "vue": "^2.6.0",
    "element-ui": "^2.15.0"
  },
  "scripts": {
    "build": "vue-cli-service build --target lib --name index src/index.js",
    "publish": "npm run build && npm publish"
  }
}
```

### 1.2 组件库结构

```Markdown
company-ui-components/
├── src/
│   ├── components/
│   │   ├── CommonTable/
│   │   │   ├── index.vue
│   │   │   ├── config.js
│   │   │   └── control/
│   │   ├── CommonForm/
│   │   │   ├── index.vue
│   │   │   └── config.js
│   │   └── CommonDialog/
│   │       ├── index.vue
│   │       └── config.js
│   ├── utils/
│   │   ├── request.js
│   │   └── common.js
│   └── index.js
├── package.json
└── README.md
```

### 1.3 入口文件

```JavaScript
// src/index.js
import CommonTable from './components/CommonTable/index.vue'
import CommonForm from './components/CommonForm/index.vue'
import CommonDialog from './components/CommonDialog/index.vue'

// 导出组件
export {
  CommonTable,
  CommonForm,
  CommonDialog
}

// 导出工具函数
export { request, formatDate } from './utils'

// Vue 插件形式
export default {
  install(Vue) {
    Vue.component('CommonTable', CommonTable)
    Vue.component('CommonForm', CommonForm)
    Vue.component('CommonDialog', CommonDialog)
  }
}
```

### 1.4 发布和使用

```Bash
# 发布到私有 NPM
npm publish --access public

# 在项目中使用
npm install @company/element-ui-components
```

```JavaScript
// 在项目中使用
import { CommonTable, CommonForm } from '@company/element-ui-components'

export default {
  components: {
    CommonTable,
    CommonForm
  }
}
```

## 2. **Git Submodule 方案**

### 2.1 创建组件库仓库

```Bash
# 创建组件库 Git 仓库
git init company-components
cd company-components

# 添加组件文件
mkdir components
cp -r /path/to/CommonTable components/
cp -r /path/to/CommonForm components/
cp -r /path/to/CommonDialog components/

git add .
git commit -m "Initial commit: Add common components"
git remote add origin git@github.com:company/company-components.git
git push -u origin main
```

### 2.2 在项目中使用 Submodule

```Bash
# 在项目根目录添加 submodule
git submodule add git@github.com:company/company-components.git src/components/common

# 或者指定分支
git submodule add -b main git@github.com:company/company-components.git src/components/common
```

### 2.3 管理 Submodule

```Bash
# 更新 submodule
git submodule update --remote

# 初始化 submodule（新克隆项目时）
git submodule init
git submodule update

# 进入 submodule 目录进行修改
cd src/components/common
git checkout main
git pull origin main
```

### 2.4 项目配置

```JavaScript
// 在项目中使用
import CommonTable from '@/components/common/components/CommonTable'
import CommonForm from '@/components/common/components/CommonForm'
import CommonDialog from '@/components/common/components/CommonDialog'

export default {
  components: {
    CommonTable,
    CommonForm,
    CommonDialog
  }
}
```

## 3. **Monorepo 方案**

### 3.1 使用 Lerna 或 Nx

```Bash
# 安装 Lerna
npm install -g lerna

# 初始化 monorepo
lerna init

# 创建组件包
lerna create @company/common-table
lerna create @company/common-form
lerna create @company/common-dialog
```

### 3.2 项目结构

```Markdown
company-monorepo/
├── packages/
│   ├── common-table/
│   │   ├── src/
│   │   │   └── index.vue
│   │   ├── package.json
│   │   └── README.md
│   ├── common-form/
│   │   ├── src/
│   │   │   └── index.vue
│   │   ├── package.json
│   │   └── README.md
│   └── common-dialog/
│       ├── src/
│       │   └── index.vue
│       ├── package.json
│       └── README.md
├── lerna.json
└── package.json
```

### 3.3 统一管理

```JSON
// lerna.json
{
  "packages": ["packages/*"],
  "version": "independent",
  "npmClient": "npm",
  "command": {
    "publish": {
      "conventionalCommits": true,
      "message": "chore(release): publish"
    }
  }
}
```

```Bash
# 统一发布所有包
lerna publish

# 统一安装依赖
lerna bootstrap

# 运行所有包的测试
lerna run test
```

## 4. **CDN 方案**

### 4.1 构建并上传到 CDN

```JavaScript
// webpack.config.js
module.exports = {
  entry: {
    'company-components': './src/index.js'
  },
  output: {
    filename: '[name].js',
    library: 'CompanyComponents',
    libraryTarget: 'umd'
  }
}
```

### 4.2 在项目中使用 CDN

```HTML
<!-- 在 index.html 中引入 -->
<script src="https://cdn.company.com/company-components.js"></script>
```

```JavaScript
// 在项目中使用
const { CommonTable, CommonForm } = window.CompanyComponents

export default {
  components: {
    CommonTable,
    CommonForm
  }
}
```

## 5. **本地文件同步方案**

### 5.1 使用脚本同步

```JavaScript
// scripts/sync-components.js
const fs = require('fs')
const path = require('path')

const sourceDir = path.resolve(__dirname, '../shared-components')
const targetDirs = [
  path.resolve(__dirname, '../project1/src/components'),
  path.resolve(__dirname, '../project2/src/components'),
  path.resolve(__dirname, '../project3/src/components')
]

function syncComponents() {
  const components = ['CommonTable', 'CommonForm', 'CommonDialog']

  components.forEach(component => {
    const sourcePath = path.join(sourceDir, component)

    targetDirs.forEach(targetDir => {
      const targetPath = path.join(targetDir, component)

      // 复制文件夹
      if (fs.existsSync(sourcePath)) {
        fs.cpSync(sourcePath, targetPath, { recursive: true })
        console.log(`✅ 同步 ${component} 到 ${targetDir}`)
      }
    })
  })
}

syncComponents()
```

### 5.2 使用 Git Hooks

```Bash
# .git/hooks/post-commit
#!/bin/bash

# 提交后自动同步组件
node scripts/sync-components.js
```

## 6. **推荐方案对比**

| 方案          | 优点                 | 缺点                 | 适用场景     |
| ------------- | -------------------- | -------------------- | ------------ |
| NPM 包        | 版本管理好，使用简单 | 需要维护发布流程     | 组件相对稳定 |
| Git Submodule | 实时同步，版本控制   | 管理复杂，容易出错   | 组件频繁更新 |
| Monorepo      | 统一管理，依赖清晰   | 学习成本高           | 大型项目     |
| CDN           | 加载快，缓存好       | 需要网络，版本控制难 | 静态资源     |
| 文件同步      | 简单直接             | 容易冲突，管理困难   | 小团队       |

## 7. **最佳实践建议**

### 7.1 对于你的情况，我推荐 **NPM 包方案**：

```Bash
# 1. 创建组件库
mkdir company-element-components
cd company-element-components

# 2. 初始化项目
npm init -y

# 3. 安装依赖
npm install --save-dev vue vue-cli-service element-ui

# 4. 复制组件
cp -r /path/to/CommonTable src/components/
cp -r /path/to/CommonForm src/components/
cp -r /path/to/CommonDialog src/components/

# 5. 构建和发布
npm run build
npm publish
```

### 7.2 版本管理策略

```JSON
// package.json
{
  "name": "@company/element-components",
  "version": "1.0.0",
  "scripts": {
    "build": "vue-cli-service build --target lib --name index src/index.js",
    "dev": "vue-cli-service serve",
    "test": "vue-cli-service test:unit",
    "publish:patch": "npm version patch && npm publish",
    "publish:minor": "npm version minor && npm publish",
    "publish:major": "npm version major && npm publish"
  }
}
```

### 7.3 使用示例

```JavaScript
// 在项目中使用
import { CommonTable, CommonForm, CommonDialog } from '@company/element-components'

// 或者全局注册
import CompanyComponents from '@company/element-components'
Vue.use(CompanyComponents)
```

这样你就可以：

1. **统一管理**所有公共组件
2. **版本控制**组件的更新
3. **简化维护**，修改一处，所有项目受益
4. **保持兼容性**，通过版本管理避免破坏性更新
