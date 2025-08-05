# Linux 命令速查手册 

## 📁 文件系统操作核心

### `ls` - 文件列表查看神器

#### 基础语法

```bash
ls [选项] [目录/文件...]
```

#### 核心参数深度解析

- **`-l`** (long format): 长格式显示，包含权限、所有者、大小、时间
- **`-a`** (all): 显示所有文件，包括以`.`开头的隐藏文件
- **`-h`** (human-readable): 文件大小以 K/M/G 显示，提升可读性
- **`-t`** (time): 按修改时间排序，最新的在前
- **`-S`** (size): 按文件大小排序，最大的在前
- **`-r`** (reverse): 反向排序
- **`-R`** (recursive): 递归显示子目录内容

#### 实战应用场景

```bash
# 前端项目文件分析
ls -lah                    # 查看所有文件详细信息
# 输出解读: drwxr-xr-x  5 user  staff   160B  1月 15 10:30 src

# 按大小排序找出最大文件
ls -lahS                   # 找出占用空间最大的文件
ls -lahS | head -10        # 只看前10个最大文件

# 按时间排序查看最新修改
ls -laht                   # 最新修改的文件在前
ls -laht src/              # 查看src目录最新修改

# 递归查看项目结构
ls -R src/ | head -50      # 查看src目录树形结构

# 查找特定类型文件
ls -la *.js               # 查看所有JS文件
ls -la **/*.vue           # 查看所有Vue文件（需要开启globstar）
```

#### 性能优化技巧

```bash
# 大目录优化查看
ls -1 | wc -l             # 快速统计文件数量，避免全部显示
ls -la --color=never      # 禁用颜色输出，提升性能
ls -U                     # 不排序，原始顺序输出，最快速度
```

#### 架构思维应用

- **项目结构分析**: 通过`ls -la`快速了解项目文件组织
- **权限审计**: 检查关键文件的权限设置是否合理
- **构建产物检查**: 验证 build 后的文件是否正确生成

---

### `find` - 强大的文件搜索引擎

#### 基础语法

```bash
find [路径] [表达式] [动作]
```

#### 核心参数架构解析

- **`-name`**: 按文件名搜索（支持通配符）
- **`-type`**: 按文件类型搜索（f=文件, d=目录, l=链接）
- **`-size`**: 按文件大小搜索（+100M 表示大于 100M）
- **`-mtime`**: 按修改时间搜索（-7 表示 7 天内）
- **`-exec`**: 对找到的文件执行命令
- **`-delete`**: 直接删除找到的文件
- **`-maxdepth`**: 限制搜索深度

#### 前端项目实战应用

```bash
# 清理构建缓存文件
find . -name "node_modules" -type d -exec rm -rf {} +
find . -name "dist" -type d -exec rm -rf {} +
find . -name ".DS_Store" -delete

# 查找大文件优化项目
find . -type f -size +10M                    # 找出大于10M的文件
find . -type f -size +10M -exec ls -lh {} \; # 显示大文件详情
find . -name "*.png" -size +1M               # 找出大于1M的图片

# 代码质量检查
find src/ -name "*.js" -exec grep -l "console.log" {} \;  # 找出包含console.log的文件
find src/ -name "*.vue" -mtime -1             # 找出昨天修改的Vue文件
find . -name "*.js" -empty                    # 找出空的JS文件

# 批量操作文件
find src/ -name "*.js" -exec eslint {} \;    # 批量ESLint检查
find public/ -name "*.png" -exec imagemin {} \; # 批量图片压缩
```

#### 高级搜索模式

```bash
# 复杂条件组合
find . \( -name "*.js" -o -name "*.ts" \) -type f  # 查找JS或TS文件
find . -name "*.vue" -not -path "*/node_modules/*" # 排除node_modules
find . -name "*.log" -mtime +30 -delete            # 删除30天前的日志

# 性能优化搜索
find . -maxdepth 3 -name "*.js"              # 限制搜索深度
find . -name "*.js" -print0 | xargs -0 grep "pattern" # 零字节分隔，处理特殊文件名
```

#### 架构级应用场景

- **项目清理自动化**: 编写脚本定期清理临时文件
- **代码审计**: 查找不符合规范的代码文件
- **部署前检查**: 确保没有测试文件进入生产环境

---

### `grep` - 文本搜索与模式匹配专家

#### 基础语法

```bash
grep [选项] '模式' [文件...]
```

#### 参数深度剖析

- **`-r`** (recursive): 递归搜索目录
- **`-i`** (ignore-case): 忽略大小写
- **`-n`** (line-number): 显示行号
- **`-v`** (invert): 反向匹配，显示不匹配的行
- **`-E`** (extended-regexp): 使用扩展正则表达式
- **`-A n`** (after): 显示匹配行后 n 行
- **`-B n`** (before): 显示匹配行前 n 行
- **`-C n`** (context): 显示匹配行前后 n 行

#### 前端开发实战场景

```bash
# 代码搜索与分析
grep -r "import.*vue" src/                   # 查找Vue导入语句
grep -rn "TODO\|FIXME" src/                  # 查找待办事项
grep -r "console\." src/ --include="*.js"    # 只在JS文件中搜索console

# API接口分析
grep -r "axios\|fetch" src/                  # 查找API调用
grep -rn "http://\|https://" src/            # 查找硬编码的URL
grep -r "/api/" src/ -A 2 -B 2               # 查找API路径并显示上下文

# 错误排查
grep -r "Error\|Exception" logs/             # 查找错误日志
grep -v "INFO" app.log | grep -v "DEBUG"     # 过滤掉INFO和DEBUG日志
grep -E "(404|500|502)" nginx.log            # 查找HTTP错误状态码

# 配置文件分析
grep -v "^#" config.js | grep -v "^$"        # 去除注释和空行
grep -n "port\|host" *.config.js             # 查找端口和主机配置
```

#### 高级正则模式

```bash
# 复杂模式匹配
grep -E "^(import|export)" src/**/*.js       # 匹配导入导出语句
grep -P "(?<=@)\w+" src/**/*.vue             # 使用Perl正则查找装饰器
grep -o "http[s]*://[^'\"]*" src/**/*.js     # 提取URL地址

# 性能优化技巧
grep -l "pattern" *.js                       # 只显示包含模式的文件名
grep -c "pattern" *.js                       # 只显示匹配行数
grep --mmap "pattern" large_file.log         # 内存映射模式处理大文件
```

#### 架构思维应用

- **代码规范检查**: 搜索不符合团队规范的代码模式
- **依赖分析**: 分析项目中的依赖关系和引用
- **安全审计**: 查找潜在的安全漏洞和敏感信息

---

## 🔧 系统管理与监控

### `ps` - 进程状态监控大师

#### 基础语法

```bash
ps [选项]
```

#### 参数架构解析

- **`a`**: 显示所有用户的进程
- **`u`**: 显示用户友好格式
- **`x`**: 显示没有控制终端的进程
- **`-e`**: 显示所有进程（等同于-A）
- **`-f`**: 完整格式显示
- **`-o`**: 自定义输出格式

#### 前端开发进程管理

```bash
# Node.js进程监控
ps aux | grep node                           # 查找所有Node进程
ps aux | grep -E "(webpack|vite|npm)"       # 查找构建工具进程
ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%cpu | head # 按CPU使用率排序

# 开发服务器管理
ps aux | grep -E ":3000|:8080|:4200"        # 查找开发服务器进程
ps -o pid,cmd | grep "webpack-dev-server"   # 查找webpack开发服务器
pgrep -f "vue-cli-service serve"             # 查找Vue开发服务器PID

# 内存使用分析
ps aux --sort=-%mem | head -10               # 内存使用最多的10个进程
ps -o pid,vsz,rss,comm | grep node          # Node进程内存详情
```

#### 高级进程分析

```bash
# 进程树分析
ps -ejH                                      # 显示进程树
ps axjf                                      # 森林视图显示进程关系
pstree -p $(pgrep node)                      # 显示Node进程树

# 自定义输出格式
ps -eo pid,ppid,user,cmd,etime,%cpu,%mem --sort=-%cpu
ps -eo pid,cmd,lstart | grep webpack        # 显示进程启动时间
```

#### 架构级监控策略

- **资源使用优化**: 监控开发工具的资源消耗
- **进程依赖分析**: 了解进程间的父子关系
- **性能瓶颈定位**: 快速找到消耗资源的进程

---

### `top` / `htop` - 实时系统监控专家

#### 基础语法

```bash
top [选项]
htop [选项]
```

#### 核心功能解析

- **实时更新**: 默认 3 秒刷新一次系统状态
- **交互操作**: 支持键盘交互进行排序、过滤
- **资源监控**: CPU、内存、负载、进程状态全览
- **进程管理**: 直接在界面中杀死进程

#### 前端开发监控实战

```bash
# 启动监控
top                                          # 基础系统监控
htop                                         # 增强版监控（推荐）
top -p $(pgrep -d, node)                     # 只监控Node进程

# 监控特定进程
top -p $(pgrep webpack)                      # 监控webpack进程
htop -p $(pgrep -f "vue-cli-service")       # 监控Vue CLI进程
```

#### 交互式操作技巧

```bash
# top交互命令
P                                            # 按CPU使用率排序
M                                            # 按内存使用率排序
T                                            # 按运行时间排序
k                                            # 杀死进程
q                                            # 退出

# htop交互优势
F2                                           # 进入设置
F3                                           # 搜索进程
F4                                           # 过滤进程
F5                                           # 树形视图
F6                                           # 排序选择
```

#### 性能分析应用

- **构建性能优化**: 监控 webpack/vite 构建时的资源使用
- **开发环境调优**: 识别占用过多资源的开发工具
- **系统瓶颈诊断**: 快速定位系统性能问题

---

## 🌐 网络操作与调试

### `curl` - HTTP 请求瑞士军刀

#### 基础语法

```bash
curl [选项] [URL...]
```

#### 参数深度解析

- **`-X`**: 指定 HTTP 方法（GET, POST, PUT, DELETE 等）
- **`-H`**: 添加 HTTP 头信息
- **`-d`**: 发送 POST 数据
- **`-o`**: 输出到文件
- **`-O`**: 使用远程文件名保存
- **`-L`**: 跟随重定向
- **`-v`**: 详细输出（调试用）
- **`-s`**: 静默模式
- **`-w`**: 输出格式化信息

#### 前端 API 测试实战

```bash
# 基础API测试
curl -X GET "http://localhost:3000/api/users"
curl -X POST -H "Content-Type: application/json" \
     -d '{"name":"test","email":"test@example.com"}' \
     "http://localhost:3000/api/users"

# 认证API测试
curl -H "Authorization: Bearer token123" \
     "http://localhost:3000/api/protected"
curl -u username:password "http://localhost:3000/api/auth"

# 文件上传测试
curl -X POST -F "file=@image.png" \
     "http://localhost:3000/api/upload"
curl -X POST -F "avatar=@avatar.jpg" -F "name=John" \
     "http://localhost:3000/api/profile"

# 性能测试
curl -w "时间详情:\n连接时间: %{time_connect}s\n首字节时间: %{time_starttransfer}s\n总时间: %{time_total}s\n" \
     "http://localhost:3000/api/slow"
```

#### 高级调试技巧

```bash
# 详细调试信息
curl -v "http://localhost:3000/api/debug"     # 显示请求响应详情
curl -I "http://localhost:3000"               # 只获取响应头
curl --trace-ascii debug.txt "http://localhost:3000" # 保存调试信息

# 批量测试
curl -K urls.txt                              # 从文件读取URL列表
curl "http://localhost:3000/api/test[1-10]"   # 批量请求

# 错误处理
curl --fail "http://localhost:3000/api/test"  # HTTP错误时返回非零状态码
curl --retry 3 "http://localhost:3000/api/unstable" # 重试机制
```

#### 架构级应用场景

- **API 集成测试**: 验证前后端接口对接
- **性能基准测试**: 测量 API 响应时间
- **环境健康检查**: 检查各环境服务状态

---

### `netstat` / `ss` - 网络连接分析专家

#### 基础语法

```bash
netstat [选项]
ss [选项]
```

#### 参数深度解析

- **`-t`**: 显示 TCP 连接
- **`-u`**: 显示 UDP 连接
- **`-l`**: 只显示监听端口
- **`-n`**: 数字格式显示（不解析域名）
- **`-p`**: 显示进程信息
- **`-r`**: 显示路由表

#### 前端开发网络诊断

```bash
# 端口占用检查
netstat -tulnp | grep :3000                 # 检查3000端口占用
ss -tulnp | grep :8080                      # 检查8080端口占用（更快）
lsof -i :4200                               # 查看4200端口占用进程

# 开发服务器连接分析
netstat -an | grep :3000                    # 查看3000端口所有连接
ss -t -a | grep :8080                       # 查看8080端口TCP连接
netstat -i                                  # 查看网络接口统计

# 网络性能监控
ss -s                                        # 网络连接统计摘要
netstat -s                                  # 详细网络统计信息
```

#### 故障排查实战

```bash
# 连接状态分析
netstat -ant | awk '{print $6}' | sort | uniq -c # 统计连接状态
ss -o state established                     # 只显示已建立的连接

# 进程网络使用
netstat -tulnp | grep node                  # 查看Node.js网络使用
ss -p | grep webpack                        # 查看webpack网络连接
```

#### 架构思维应用

- **端口冲突解决**: 快速定位端口占用问题
- **网络性能诊断**: 分析网络连接状态和性能
- **服务依赖分析**: 了解服务间的网络依赖关系

---

## 📦 包管理与依赖控制

### `npm` - Node.js 包管理核心

#### 基础语法

```bash
npm [命令] [选项] [包名]
```

#### 核心命令架构解析

- **`install`**: 安装依赖包
- **`update`**: 更新依赖包
- **`audit`**: 安全审计
- **`list`**: 查看依赖树
- **`outdated`**: 查看过期包
- **`cache`**: 缓存管理

#### 前端项目依赖管理实战

```bash
# 依赖安装策略
npm install                                  # 安装package.json中的依赖
npm install --production                     # 只安装生产依赖
npm install --frozen-lockfile               # 使用精确的lockfile版本
npm ci                                       # 清洁安装（CI环境推荐）

# 包管理精细化控制
npm install lodash --save                    # 安装到dependencies
npm install @types/node --save-dev           # 安装到devDependencies
npm install -g @vue/cli                      # 全局安装
npm install lodash@^4.17.0                   # 安装特定版本

# 依赖分析与优化
npm list --depth=0                           # 查看顶级依赖
npm list lodash                              # 查看特定包的依赖路径
npm outdated                                 # 查看可更新的包
npm audit                                    # 安全漏洞检查
npm audit fix                                # 自动修复安全问题

# 性能优化
npm cache verify                             # 验证缓存完整性
npm cache clean --force                      # 强制清理缓存
npm dedupe                                   # 去重依赖
```

#### 高级包管理策略

```bash
# 版本管理
npm version patch                            # 升级补丁版本
npm version minor                            # 升级次版本
npm version major                            # 升级主版本

# 发布管理
npm publish                                  # 发布包
npm unpublish package@version                # 撤销发布
npm deprecate package@version "message"      # 废弃包版本

# 配置管理
npm config list                              # 查看配置
npm config set registry https://registry.npm.taobao.org/ # 设置镜像源
npm config get registry                      # 查看当前源
```

#### 架构级依赖治理

- **依赖安全管理**: 定期进行安全审计和更新
- **版本锁定策略**: 使用 lockfile 确保环境一致性
- **包体积优化**: 分析和优化依赖包大小

---

### `yarn` - 快速可靠的包管理器

#### 基础语法

```bash
yarn [命令] [选项] [包名]
```

#### 核心优势解析

- **并行安装**: 多包同时下载，速度更快
- **确定性安装**: 通过 yarn.lock 确保一致性
- **离线模式**: 支持离线安装已缓存的包
- **工作区支持**: 原生支持 monorepo 架构

#### Yarn vs NPM 性能对比实战

```bash
# 安装速度对比
time npm install                             # 测试npm安装时间
time yarn install                            # 测试yarn安装时间

# 缓存策略
yarn cache list                              # 查看缓存包
yarn cache dir                               # 查看缓存目录
yarn cache clean                             # 清理缓存

# 依赖管理
yarn add lodash                              # 添加依赖
yarn add -D webpack                          # 添加开发依赖
yarn upgrade lodash                          # 升级特定包
yarn upgrade-interactive                     # 交互式升级

# 工作区管理（Monorepo）
yarn workspaces info                         # 查看工作区信息
yarn workspace package-a add lodash         # 为特定工作区添加依赖
```

#### 高级特性应用

```bash
# Plug'n'Play模式
yarn install --pnp                          # 启用PnP模式
yarn dlx create-react-app my-app             # 临时运行包

# 安全与审计
yarn audit                                   # 安全审计
yarn audit --summary                         # 审计摘要
yarn policies set-version latest             # 设置yarn版本策略
```

---

## 🚀 前端构建与部署

### `webpack` - 模块打包架构核心

#### 基础语法

```bash
webpack [选项] [入口文件]
```

#### 构建模式深度解析

- **`--mode development`**: 开发模式，优化构建速度
- **`--mode production`**: 生产模式，优化输出大小
- **`--watch`**: 监听文件变化自动重新构建
- **`--analyze`**: 分析打包结果

#### 前端构建优化实战

```bash
# 开发环境构建
webpack --mode development --watch          # 开发模式监听构建
webpack-dev-server --mode development       # 启动开发服务器
webpack --mode development --devtool source-map # 生成源码映射

# 生产环境构建
webpack --mode production                    # 生产构建
webpack --mode production --optimize-minimize # 最小化输出
webpack-bundle-analyzer dist/main.js        # 分析打包结果

# 性能优化构建
webpack --mode production --profile --json > stats.json # 生成构建统计
webpack --mode production --env.analyze     # 启用分析模式
```

#### 构建性能监控

```bash
# 构建时间分析
webpack --mode production --progress        # 显示构建进度
time webpack --mode production              # 测量构建时间

# 缓存策略
webpack --mode production --cache           # 启用缓存
rm -rf node_modules/.cache && webpack       # 清除缓存重新构建
```

#### 架构级构建优化

- **代码分割策略**: 合理配置 chunk 分割
- **缓存优化**: 利用持久化缓存提升构建速度
- **体积优化**: 通过 tree-shaking 和压缩减小包体积

---

### `pm2` - Node.js 进程管理专家

#### 基础语法

```bash
pm2 [命令] [选项] [应用]
```

#### 核心功能架构

- **进程守护**: 自动重启崩溃的进程
- **负载均衡**: 多实例负载均衡
- **日志管理**: 统一日志收集和轮转
- **监控面板**: 实时监控进程状态

#### 生产环境部署实战

```bash
# 应用启动管理
pm2 start app.js --name "my-app"            # 启动应用并命名
pm2 start ecosystem.config.js               # 使用配置文件启动
pm2 start app.js -i max                     # 启动最大CPU核心数实例
pm2 start app.js --watch                    # 监听文件变化自动重启

# 进程管理操作
pm2 list                                     # 查看所有进程
pm2 show my-app                              # 查看应用详情
pm2 restart my-app                           # 重启应用
pm2 reload my-app                            # 优雅重载（零停机）
pm2 stop my-app                              # 停止应用
pm2 delete my-app                            # 删除应用

# 日志管理
pm2 logs                                     # 查看所有日志
pm2 logs my-app                              # 查看特定应用日志
pm2 logs --lines 100                         # 查看最近100行日志
pm2 flush                                    # 清空日志
```

#### 高级配置与监控

```bash
# 配置文件管理
pm2 init                                     # 生成配置文件模板
pm2 start ecosystem.config.js --env production # 使用生产环境配置

# 监控与性能
pm2 monit                                    # 实时监控面板
pm2 web                                      # Web监控界面
pm2 describe my-app                          # 详细进程信息

# 集群管理
pm2 scale my-app 4                           # 扩展到4个实例
pm2 gracefulReload all                       # 优雅重载所有进程
```

#### 架构级部署策略

- **零停机部署**: 使用 reload 实现无缝更新
- **资源监控**: 实时监控 CPU、内存使用情况
- **故障恢复**: 自动重启和错误日志收集

---

## 🐳 容器化部署

### `docker` - 容器化技术核心

#### 基础语法

```bash
docker [选项] 命令 [参数]
```

#### 容器生命周期管理

- **镜像管理**: 构建、拉取、推送镜像
- **容器运行**: 创建、启动、停止容器
- **数据管理**: 数据卷和网络配置
- **资源控制**: CPU、内存限制

#### 前端应用容器化实战

```bash
# 镜像构建与管理
docker build -t my-frontend:latest .        # 构建前端应用镜像
docker build -t my-frontend:v1.0 --no-cache . # 无缓存构建
docker images                                # 查看本地镜像
docker rmi my-frontend:old                   # 删除旧镜像

# 容器运行管理
docker run -d -p 80:80 --name frontend my-frontend:latest # 后台运行
docker run -it --rm my-frontend:latest sh   # 交互式运行并自动删除
docker run -d -p 80:80 -v $(pwd):/app my-frontend # 挂载本地目录

# 容器操作
docker ps                                    # 查看运行中容器
docker ps -a                                # 查看所有容器
docker stop frontend                         # 停止容器
docker start frontend                        # 启动容器
docker restart frontend                      # 重启容器
docker rm frontend                           # 删除容器

# 容器调试
docker logs frontend                         # 查看容器日志
docker logs -f frontend                      # 实时查看日志
docker exec -it frontend sh                 # 进入容器shell
docker inspect frontend                      # 查看容器详细信息
```

#### 多阶段构建优化

```bash
# 构建优化策略
docker build --target=builder .             # 构建特定阶段
docker build --build-arg NODE_ENV=production . # 传递构建参数
docker system prune                          # 清理无用镜像和容器
docker image prune -a                        # 清理所有未使用镜像

# 资源监控
docker stats                                 # 实时查看容器资源使用
docker stats frontend                        # 查看特定容器资源
docker system df                             # 查看Docker磁盘使用
```

#### 架构级容器化策略

- **多阶段构建**: 减小生产镜像体积
- **资源限制**: 合理配置 CPU 和内存限制
- **健康检查**: 配置容器健康检查机制

---

### `docker-compose` - 多容器编排专家

#### 基础语法

```bash
docker-compose [选项] [命令] [参数]
```

#### 服务编排架构

- **服务定义**: 定义多个相关服务
- **网络管理**: 服务间网络通信
- **数据持久化**: 数据卷管理
- **环境配置**: 多环境配置管理

#### 前端全栈应用编排实战

```bash
# 服务启动管理
docker-compose up                            # 启动所有服务
docker-compose up -d                         # 后台启动服务
docker-compose up --build                    # 构建并启动服务
docker-compose up frontend                   # 只启动前端服务

# 服务管理操作
docker-compose ps                            # 查看服务状态
docker-compose logs                          # 查看所有服务日志
docker-compose logs frontend                 # 查看前端服务日志
docker-compose exec frontend sh              # 进入前端服务容器

# 服务控制
docker-compose stop                          # 停止所有服务
docker-compose start                         # 启动所有服务
docker-compose restart frontend              # 重启前端服务
docker-compose down                          # 停止并删除所有服务
docker-compose down -v                       # 停止服务并删除数据卷

# 扩缩容管理
docker-compose scale frontend=3              # 扩展前端服务到3个实例
docker-compose up --scale api=2              # 启动时扩展API服务
```

#### 高级编排特性

```bash
# 配置管理
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up # 多文件配置
docker-compose config                        # 验证配置文件
docker-compose pull                          # 拉取服务镜像

# 监控与调试
docker-compose top                           # 查看服务进程
docker-compose events                        # 监听服务事件
```

#### 架构级编排策略

- **服务依赖管理**: 合理配置服务启动顺序
- **网络隔离**: 不同环境的网络隔离策略
- **数据持久化**: 重要数据的持久化方案

---

## 🔄 版本控制与协作

### `git` - 分布式版本控制系统

#### 基础语法

```bash
git [选项] <命令> [参数]
```

#### 核心概念架构

- **工作区**: 当前编辑的文件状态
- **暂存区**: 准备提交的文件状态
- **版本库**: 已提交的历史记录
- **远程仓库**: 团队协作的中央仓库

#### 前端项目版本管理实战

```bash
# 仓库初始化与克隆
git init                                     # 初始化本地仓库
git clone https://github.com/user/repo.git  # 克隆远程仓库
git clone -b develop https://github.com/user/repo.git # 克隆特定分支
git remote add origin https://github.com/user/repo.git # 添加远程仓库

# 文件状态管理
git status                                   # 查看文件状态
git status -s                                # 简洁状态显示
git add .                                    # 添加所有文件到暂存区
git add -A                                   # 添加所有变更（包括删除）
git add -p src/components/                   # 交互式添加部分文件

# 提交管理
git commit -m "feat: add user authentication" # 提交暂存区文件
git commit -am "fix: resolve login bug"      # 添加并提交已跟踪文件
git commit --amend                           # 修改最后一次提交
git commit --amend --no-edit                 # 修改最后一次提交但不改消息

# 历史查看
git log --oneline                            # 简洁日志
git log --graph --oneline --all              # 图形化显示所有分支
git log --since="2 weeks ago"               # 查看最近两周提交
git log --author="John"                      # 查看特定作者提交
git log --grep="fix"                         # 搜索提交消息
git show HEAD~2                              # 查看倒数第三次提交详情
```

#### 分支管理策略

```bash
# 分支操作
git branch                                   # 查看本地分支
git branch -r                                # 查看远程分支
git branch -a                                # 查看所有分支
git branch feature/user-profile              # 创建新分支
git checkout feature/user-profile            # 切换分支
git checkout -b feature/user-profile         # 创建并切换分支
git switch main                              # 切换到main分支（新语法）
git switch -c feature/new-feature            # 创建并切换分支（新语法）

# 分支合并
git merge feature/user-profile               # 合并分支到当前分支
git merge --no-ff feature/user-profile       # 非快进合并（保留分支历史）
git rebase main                              # 将当前分支变基到main
git rebase -i HEAD~3                         # 交互式变基最近3次提交

# 分支清理
git branch -d feature/user-profile           # 删除已合并分支
git branch -D feature/user-profile           # 强制删除分支
git push origin --delete feature/old         # 删除远程分支
```

#### 远程协作管理

```bash
# 远程操作
git remote -v                                # 查看远程仓库
git fetch origin                             # 获取远程更新（不合并）
git pull origin main                         # 拉取并合并远程main分支
git pull --rebase origin main                # 拉取并变基
git push origin feature/user-profile         # 推送分支到远程
git push -u origin feature/user-profile      # 推送并设置上游分支
git push --force-with-lease                  # 安全的强制推送

# 标签管理
git tag                                      # 查看所有标签
git tag v1.0.0                               # 创建轻量标签
git tag -a v1.0.0 -m "Release version 1.0.0" # 创建带注释标签
git push origin v1.0.0                       # 推送标签
git push origin --tags                       # 推送所有标签
```

#### 高级 Git 技巧

```bash
# 文件操作
git mv old-file.js new-file.js               # 重命名文件
git rm file.js                               # 删除文件
git rm --cached file.js                      # 从版本控制中移除但保留文件

# 撤销操作
git checkout -- file.js                     # 撤销工作区修改
git reset HEAD file.js                      # 撤销暂存区修改
git reset --soft HEAD~1                     # 软重置（保留工作区和暂存区）
git reset --hard HEAD~1                     # 硬重置（丢弃所有修改）
git revert HEAD                              # 创建新提交撤销上次提交

# 暂存管理
git stash                                    # 暂存当前修改
git stash push -m "work in progress"         # 带消息暂存
git stash list                               # 查看暂存列表
git stash pop                                # 恢复最近暂存
git stash apply stash@{1}                    # 应用特定暂存
git stash drop stash@{0}                     # 删除暂存
```

#### 架构级版本管理策略

- **分支策略**: 采用 Git Flow 或 GitHub Flow 工作流
- **提交规范**: 使用 Conventional Commits 规范
- **代码审查**: 通过 Pull Request 进行代码审查

---

## 📊 系统监控与性能分析

### `iotop` - I/O 监控专家

#### 基础语法

```bash
iotop [选项]
```

#### 核心监控指标

- **读写速度**: 实时显示进程 I/O 读写速度
- **累计 I/O**: 显示进程累计 I/O 量
- **I/O 优先级**: 显示和修改进程 I/O 优先级
- **磁盘使用**: 按进程显示磁盘使用情况

#### 前端构建 I/O 性能分析

```bash
# 基础I/O监控
iotop                                        # 实时I/O监控
iotop -o                                     # 只显示有I/O活动的进程
iotop -a                                     # 显示累计I/O统计
iotop -p $(pgrep webpack)                    # 监控webpack进程I/O

# 构建性能分析
iotop -d 1                                   # 1秒刷新间隔
iotop -k                                     # 以KB/s显示速度
iotop -b -n 10                               # 批处理模式，输出10次
```

#### 架构级 I/O 优化

- **构建缓存优化**: 监控缓存读写效率
- **磁盘性能调优**: 识别 I/O 瓶颈并优化
- **并发构建分析**: 分析并发构建的 I/O 影响

---

### `vmstat` - 虚拟内存统计专家

#### 基础语法

```bash
vmstat [选项] [间隔] [次数]
```

#### 核心性能指标

- **内存使用**: 显示内存使用统计
- **CPU 使用**: 显示 CPU 使用率分布
- **I/O 统计**: 显示磁盘 I/O 统计
- **系统负载**: 显示系统整体负载

#### 前端开发环境性能监控

```bash
# 基础性能监控
vmstat 1                                     # 每秒显示一次统计
vmstat 1 10                                  # 每秒显示，共10次
vmstat -S M                                  # 以MB为单位显示内存

# 开发环境性能分析
vmstat 1 | while read line; do echo "$(date): $line"; done # 带时间戳监控
watch -n 1 'vmstat | tail -1'               # 持续监控最新数据
```

#### 性能指标解读

```bash
# 关键指标说明
# r: 运行队列长度（CPU繁忙程度）
# b: 阻塞进程数量（I/O等待）
# swpd: 使用的虚拟内存量
# free: 空闲内存量
# buff: 缓冲区内存
# cache: 缓存内存
# si/so: 换入/换出内存页
# bi/bo: 块设备读入/写出
# in: 中断次数
# cs: 上下文切换次数
# us: 用户态CPU时间
# sy: 系统态CPU时间
# id: 空闲CPU时间
# wa: I/O等待时间
```

---

## 🔐 安全管理与权限控制

### `chmod` - 文件权限管理专家

#### 基础语法

```bash
chmod [选项] 模式 文件...
```

#### 权限系统架构解析

- **用户权限**: 所有者(u)、组(g)、其他(o)
- **权限类型**: 读(r=4)、写(w=2)、执行(x=1)
- **权限表示**: 数字模式和符号模式
- **特殊权限**: SUID、SGID、Sticky 位

#### 前端项目权限管理实战

```bash
# 基础权限设置
chmod 755 deploy.sh                         # 设置脚本可执行权限
chmod 644 *.js                              # 设置JS文件为可读写
chmod -R 755 dist/                          # 递归设置目录权限
chmod u+x build.sh                          # 给所有者添加执行权限

# 开发环境权限配置
chmod 600 .env                              # 环境配置文件只有所有者可读写
chmod 700 ~/.ssh/                           # SSH目录只有所有者可访问
chmod 644 ~/.ssh/id_rsa.pub                 # 公钥文件可读
chmod 600 ~/.ssh/id_rsa                     # 私钥文件只有所有者可读

# 批量权限管理
find . -type f -name "*.sh" -exec chmod +x {} \; # 给所有shell脚本添加执行权限
find . -type d -exec chmod 755 {} \;        # 设置所有目录权限
find . -type f -exec chmod 644 {} \;        # 设置所有文件权限
```

#### 权限故障排查

```bash
# 权限检查
ls -la file.js                              # 查看文件详细权限
stat file.js                                # 查看文件状态和权限
namei -l /path/to/file                       # 查看路径权限链

# 权限修复
chmod --reference=good_file bad_file         # 参考其他文件设置权限
chmod -R --reference=template/ target/      # 递归参考设置权限
```

#### 架构级权限策略

- **最小权限原则**: 只给予必要的最小权限
- **权限继承**: 合理设置目录默认权限
- **安全审计**: 定期检查关键文件权限

---

### `chown` - 文件所有权管理专家

#### 基础语法

```bash
chown [选项] 用户[:组] 文件...
```

#### 所有权管理架构

- **用户所有权**: 文件所属用户
- **组所有权**: 文件所属组
- **递归更改**: 批量更改目录所有权
- **权限传递**: 所有权变更的权限影响

#### 前端部署所有权管理

```bash
# 基础所有权设置
chown nginx:nginx /var/www/html/             # 设置web目录所有权
chown -R www-data:www-data dist/             # 递归设置构建产物所有权
chown user:user ~/.npm/                      # 设置npm缓存目录所有权

# 部署环境权限配置
chown root:root /etc/nginx/nginx.conf        # 设置配置文件所有权
chown -R app:app /opt/myapp/                 # 设置应用目录所有权
chown deploy:deploy ~/.ssh/authorized_keys   # 设置SSH密钥所有权

# 批量所有权管理
find /var/www -type f -exec chown www-data:www-data {} \; # 批量设置文件所有权
find /var/www -type d -exec chown www-data:www-data {} \; # 批量设置目录所有权
```

#### 所有权故障恢复

```bash
# 权限恢复
chown -R --reference=/template/dir /target/dir # 参考目录设置所有权
chown -R $(stat -c '%U:%G' /reference/file) /target/ # 参考文件设置所有权
```

---

## 🛠 开发工具与调试

### `strace` - 系统调用跟踪专家

#### 基础语法

```bash
strace [选项] 命令 [参数]
strace [选项] -p PID
```

#### 系统调用分析架构

- **系统调用跟踪**: 监控程序的系统调用
- **文件访问分析**: 跟踪文件读写操作
- **网络调用监控**: 监控网络相关系统调用
- **性能分析**: 分析系统调用耗时

#### 前端应用调试实战

```bash
# 基础调试
strace node app.js                           # 跟踪Node.js应用系统调用
strace -p $(pgrep webpack)                   # 跟踪webpack进程
strace -e trace=file node app.js             # 只跟踪文件相关调用
strace -e trace=network node app.js          # 只跟踪网络相关调用

# 性能分析
strace -c node app.js                        # 统计系统调用次数和耗时
strace -T node app.js                        # 显示每个系统调用耗时
strace -f node app.js                        # 跟踪子进程

# 调试文件访问
strace -e trace=openat,read,write node app.js # 跟踪文件I/O操作
strace -o trace.log node app.js              # 输出到文件
```

#### 高级调试技巧

```bash
# 过滤和分析
strace -e trace=!clock_gettime,gettimeofday node app.js # 排除时间相关调用
strace -e write=1,2 node app.js               # 跟踪标准输出和错误输出
strace -s 1000 node app.js                   # 显示更长的字符串内容
```

#### 架构级调试应用

- **性能瓶颈定位**: 找出耗时的系统调用
- **文件访问优化**: 分析文件读写模式
- **故障排查**: 深入分析程序异常行为

---

### `lsof` - 文件和进程关联分析专家

#### 基础语法

```bash
lsof [选项] [文件/目录/进程]
```

#### 文件描述符分析架构

- **进程文件关联**: 显示进程打开的文件
- **端口占用分析**: 查看网络端口占用情况
- **文件锁定检查**: 检查文件是否被进程锁定
- **资源泄露检测**: 发现文件描述符泄露

#### 前端开发故障排查实战

```bash
# 端口占用检查
lsof -i :3000                               # 查看3000端口占用
lsof -i :8080-8090                          # 查看端口范围占用
lsof -i tcp:80                              # 查看TCP 80端口
lsof -i udp                                 # 查看所有UDP连接

# 进程文件分析
lsof -p $(pgrep node)                       # 查看Node进程打开的文件
lsof -c webpack                             # 查看webpack相关进程文件
lsof -u username                            # 查看特定用户打开的文件

# 文件占用检查
lsof /var/log/app.log                       # 查看谁在使用日志文件
lsof +D /project/dir                        # 查看目录下所有文件占用
lsof | grep deleted                         # 查找已删除但仍被占用的文件

# 网络连接分析
lsof -i -P                                  # 显示所有网络连接（不解析端口名）
lsof -i -n                                  # 显示网络连接（不解析主机名）
lsof -i @192.168.1.100                      # 查看特定IP的连接
```

#### 高级分析技巧

```bash
# 组合查询
lsof -i :3000 -t | xargs ps -p             # 查看占用3000端口的进程详情
lsof -i | grep LISTEN                       # 查看所有监听端口
lsof -nP | grep :80                         # 查看80端口相关连接

# 实时监控
watch -n 1 'lsof -i :3000'                 # 实时监控端口占用
lsof -r 2 -i :3000                         # 每2秒刷新端口占用信息
```

#### 架构级应用场景

- **端口冲突解决**: 快速定位端口占用进程
- **资源泄露检测**: 发现文件描述符泄露问题
- **网络连接分析**: 分析应用网络连接状态

---

## 💡 高级技巧与最佳实践

### 命令组合与管道艺术

#### 管道操作深度解析

```bash
# 数据处理管道
ps aux | grep node | awk '{print $2}' | xargs kill -9 # 杀死所有node进程
find . -name "*.js" | xargs grep -l "console.log" | wc -l # 统计包含console.log的文件数

# 日志分析管道
tail -f /var/log/nginx/access.log | grep -E "(404|500)" | awk '{print $1}' | sort | uniq -c | sort -nr
# 实时分析nginx错误IP并排序

# 系统监控管道
ps aux --sort=-%cpu | head -10 | awk '{print $11, $3}' | column -t
# 显示CPU使用最高的10个进程

# 文件统计管道
find . -name "*.js" -exec wc -l {} + | sort -nr | head -10
# 找出代码行数最多的10个JS文件
```

#### 高级文本处理

```bash
# 复杂文本分析
awk '/ERROR/ {count++} END {print "错误总数:", count}' app.log
sed -n '100,200p' large_file.txt | grep "pattern" # 只处理第100-200行
grep -oP '(?<=")[^"]*(?=")' config.json | sort | uniq # 提取JSON中的字符串值

# 数据格式转换
cat data.csv | awk -F',' '{print $1 "\t" $3}' | column -t # CSV转制表符分隔
jq '.users[] | {name: .name, email: .email}' users.json # JSON数据提取
```

### 性能监控自动化脚本

#### 系统监控脚本

```bash
#!/bin/bash
# 系统性能监控脚本
monitor_system() {
    echo "=== 系统性能监控 $(date) ==="
    echo "CPU使用率:"
    top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1

    echo "内存使用情况:"
    free -h | grep Mem | awk '{print "使用: " $3 "/" $2 " (" $3/$2*100 "%)"}'

    echo "磁盘使用情况:"
    df -h | grep -E '^/dev/' | awk '{print $5 " " $6}' | sort -nr

    echo "网络连接数:"
    netstat -an | grep ESTABLISHED | wc -l
}

# 每分钟监控一次
while true; do
    monitor_system
    sleep 60
done
```

#### 前端构建监控脚本

```bash
#!/bin/bash
# 前端构建性能监控
build_monitor() {
    echo "开始构建监控..."
    start_time=$(date +%s)

    # 监控构建过程
    npm run build &
    BUILD_PID=$!

    while kill -0 $BUILD_PID 2>/dev/null; do
        echo "构建进行中... CPU: $(ps -p $BUILD_PID -o %cpu= | tr -d ' ')%"
        echo "内存使用: $(ps -p $BUILD_PID -o rss= | awk '{print $1/1024 "MB"}')"
        sleep 5
    done

    end_time=$(date +%s)
    duration=$((end_time - start_time))
    echo "构建完成，耗时: ${duration}秒"

    # 分析构建产物
    echo "构建产物大小:"
    du -sh dist/
    find dist/ -name "*.js" -exec ls -lh {} \; | awk '{print $5 " " $9}' | sort -hr
}
```

### 环境配置与别名优化

#### 高效别名配置

```bash
# ~/.bashrc 或 ~/.zshrc 中添加
# 基础命令增强
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
alias ..='cd ..'
alias ...='cd ../..'
alias grep='grep --color=auto'

# Git快捷操作
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'
alias gl='git pull'
alias gd='git diff'
alias gb='git branch'
alias gco='git checkout'

# 前端开发快捷键
alias nrs='npm run serve'
alias nrd='npm run dev'
alias nrb='npm run build'
alias nrt='npm run test'
alias ni='npm install'
alias nis='npm install --save'
alias nid='npm install --save-dev'

# 系统监控快捷键
alias ports='netstat -tulanp'
alias meminfo='free -m -l -t'
alias psmem='ps auxf | sort -nr -k 4'
alias pscpu='ps auxf | sort -nr -k 3'

# Docker快捷操作
alias dps='docker ps'
alias dpsa='docker ps -a'
alias di='docker images'
alias dcu='docker-compose up'
alias dcd='docker-compose down'
```

#### 环境变量优化

```bash
# 开发环境变量
export NODE_ENV=development
export PATH="$HOME/.npm-global/bin:$PATH"
export EDITOR=vim

# 前端构建优化
export NODE_OPTIONS="--max-old-space-size=4096"
export WEBPACK_ANALYZE=true

# 代理设置
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=http://proxy.company.com:8080
export NO_PROXY=localhost,127.0.0.1,.local
```

### 自动化部署脚本

#### 前端部署自动化

```bash
#!/bin/bash
# 前端自动化部署脚本
deploy_frontend() {
    echo "开始前端部署流程..."

    # 检查环境
    if ! command -v node &> /dev/null; then
        echo "错误: Node.js 未安装"
        exit 1
    fi

    # 拉取最新代码
    echo "拉取最新代码..."
    git pull origin main

    # 安装依赖
    echo "安装依赖..."
    npm ci

    # 运行测试
    echo "运行测试..."
    npm run test:unit
    if [ $? -ne 0 ]; then
        echo "测试失败，部署终止"
        exit 1
    fi

    # 构建项目
    echo "构建项目..."
    npm run build

    # 备份旧版本
    if [ -d "/var/www/html/backup" ]; then
        rm -rf /var/www/html/backup
    fi
    if [ -d "/var/www/html/current" ]; then
        mv /var/www/html/current /var/www/html/backup
    fi

    # 部署新版本
    echo "部署新版本..."
    cp -r dist/ /var/www/html/current

    # 重启服务
    echo "重启Nginx..."
    sudo systemctl reload nginx

    echo "部署完成！"
}

# 回滚函数
rollback_deployment() {
    echo "开始回滚..."
    if [ -d "/var/www/html/backup" ]; then
        rm -rf /var/www/html/current
        mv /var/www/html/backup /var/www/html/current
        sudo systemctl reload nginx
        echo "回滚完成！"
    else
        echo "没有备份版本可以回滚"
        exit 1
    fi
}
```

---

## 📚 学习路径与进阶建议

### 架构师级命令掌握路径

#### 初级阶段（1-2 个月）

1. **文件系统基础**: `ls`, `cd`, `mkdir`, `cp`, `mv`, `rm`
2. **文本处理**: `cat`, `grep`, `sed`, `awk`
3. **进程管理**: `ps`, `kill`, `jobs`, `nohup`
4. **网络基础**: `ping`, `curl`, `wget`

#### 中级阶段（3-6 个月）

1. **高级文件操作**: `find`, `xargs`, `rsync`
2. **系统监控**: `top`, `htop`, `iotop`, `netstat`
3. **包管理**: `npm`, `yarn`, `apt`, `yum`
4. **版本控制**: `git` 高级操作

#### 高级阶段（6-12 个月）

1. **容器化**: `docker`, `docker-compose`
2. **进程管理**: `pm2`, `systemctl`
3. **性能调优**: `strace`, `lsof`, `vmstat`
4. **自动化脚本**: `bash`, `cron`, `systemd`

#### 架构师阶段（1 年以上）

1. **系统架构**: 服务编排、负载均衡
2. **监控体系**: 日志聚合、指标监控
3. **安全管理**: 权限控制、安全审计
4. **DevOps 实践**: CI/CD、基础设施即代码

### 最佳实践总结

#### 命令使用原则

1. **安全第一**: 谨慎使用 `rm -rf`, `chmod 777` 等危险命令
2. **测试先行**: 在生产环境前先在测试环境验证
3. **备份习惯**: 重要操作前先备份
4. **文档记录**: 记录重要的命令和配置

#### 性能优化策略

1. **资源监控**: 定期监控系统资源使用情况
2. **缓存利用**: 合理使用各种缓存机制
3. **并发控制**: 避免过多并发操作导致系统负载过高
4. **定期清理**: 定期清理日志、缓存等临时文件

#### 团队协作规范

1. **命令标准化**: 团队内统一命令使用规范
2. **脚本共享**: 共享常用的自动化脚本
3. **知识传承**: 定期分享命令使用技巧
4. **故障预案**: 制定常见问题的解决预案

---

**记住**: 命令行不仅是工具，更是架构师思维的体现。掌握这些命令的本质是理解系统运行原理，从而更好地设计和优化系统架构。

**持续学习**: 技术在不断发展，新的工具和命令也在不断涌现。保持学习的心态，关注新技术的发展趋势。

**实践为王**: 再多的理论都不如实际动手操作。在安全的环境中多练习，在实际项目中多应用。
