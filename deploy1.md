基于你的需求，我推荐采用**独立部署 + 统一代理**的方案，这样可以实现项目的独立更新和部署：

## 🚀 推荐方案：独立 Docker Compose + 统一 Caddy 代理

### 1. **项目组织结构**
```
服务器根目录/
├── y-monitor-m/              # 监控项目 (独立部署)
│   ├── docker-compose.yml
│   └── .env
├── nav-project/              # 导航页项目 (独立部署)
│   ├── docker-compose.yml
│   └── .env
├── docs-project/             # 学习笔记项目 (独立部署)
│   ├── docker-compose.yml
│   └── .env
└── caddy/                    # 统一代理服务
    ├── docker-compose.yml
    ├── Caddyfile
    └── config/
```

### 2. **部署策略**

#### **每个项目独立部署**
- 每个项目有自己的 `docker-compose.yml`
- 独立的端口映射
- 独立的网络配置
- 独立的更新和重启

#### **Caddy 统一代理**
- 独立的 Caddy 服务
- 配置所有域名的路由规则
- 统一的 SSL 证书管理
- 不依赖任何具体项目

### 3. **端口分配**
```
监控项目: 8080
导航页项目: 8081  
学习笔记项目: 8082
Caddy 代理: 80/443
```

### 4. **GitHub Actions 自动化部署**

#### **每个项目的 Actions 配置**
```yaml
# 以学习笔记为例
name: Deploy Docs
on:
  push:
    branches: [main]
    paths: ['docs/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build and Deploy
        run: |
          # 构建项目
          # 推送到服务器
          # 重启对应项目的 Docker 容器
```

### 5. **优势**

#### **独立更新**
- 修改文档项目 → 只重启 docs-project 容器
- 修改导航页 → 只重启 nav-project 容器
- 修改监控项目 → 只重启 y-monitor-m 容器
- Caddy 代理 → 无需重启

#### **自动化部署**
- 每个项目独立的 GitHub Actions
- 基于文件路径触发部署
- 精确的更新范围

#### **资源隔离**
- 每个项目独立的容器网络
- 独立的资源限制
- 故障隔离

### 6. **Caddy 配置示例**
```caddyfile
# Caddyfile
michstabe.cn {
    reverse_proxy localhost:8081
}

docs.michstabe.cn {
    reverse_proxy localhost:8082
}

monitor.michstabe.cn {
    reverse_proxy localhost:8080
}
```

### 7. **部署流程**

#### **初始部署**
1. 部署 Caddy 代理服务
2. 分别部署三个项目
3. 配置域名解析

#### **日常更新**
1. 推送代码到 GitHub
2. GitHub Actions 自动构建
3. 推送到服务器
4. 重启对应项目的容器
5. Caddy 自动处理路由

### 8. **监控和维护**
- 每个项目独立的日志
- 独立的健康检查
- 独立的备份策略
- 统一的监控面板

### 9. **扩展性**
- 新增项目只需添加新的 Docker Compose
- 在 Caddy 中添加新的路由规则
- 不影响现有项目

这样的架构让你可以：
- **独立更新**：修改任何项目都不影响其他项目
- **自动化部署**：通过 GitHub Actions 实现精确的自动化
- **资源隔离**：每个项目独立运行，互不干扰
- **易于维护**：清晰的职责分离和部署流程