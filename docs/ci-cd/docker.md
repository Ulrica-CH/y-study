# Docker 常用命令汇总

## 容器管理

### 查看容器

```bash
# 查看运行中的容器
docker ps

# 查看所有容器（包括已停止的）
docker ps -a

# 查看容器详细信息
docker inspect <container_id>

# 查看容器日志
docker logs <container_id>
docker logs -f <container_id>  # 实时查看日志
docker logs --tail 100 <container_id>  # 查看最后100行日志
```

### 启动/停止容器

```bash
# 启动容器
docker start <container_id>
docker start <container_name>

# 停止容器
docker stop <container_id>
docker stop <container_name>

# 强制停止容器
docker kill <container_id>
docker kill <container_name>

# 重启容器
docker restart <container_id>
docker restart <container_name>

# 暂停/恢复容器
docker pause <container_id>
docker unpause <container_id>
```

### 删除容器

```bash
# 删除已停止的容器
docker rm <container_id>

# 强制删除运行中的容器
docker rm -f <container_id>

# 删除所有已停止的容器
docker container prune

# 删除所有容器（危险操作）
docker rm -f $(docker ps -aq)
```

## Docker Compose

### 基本操作

```bash
# 启动服务
docker-compose up
docker-compose up -d  # 后台运行

# 停止服务
docker-compose down

# 重启服务
docker-compose restart

# 查看服务状态
docker-compose ps

# 查看服务日志
docker-compose logs
docker-compose logs -f  # 实时查看
docker-compose logs <service_name>  # 查看特定服务

# 构建服务
docker-compose build
docker-compose build --no-cache  # 不使用缓存重新构建

# 拉取镜像
docker-compose pull
```

### 服务管理

```bash
# 启动特定服务
docker-compose up <service_name>

# 停止特定服务
docker-compose stop <service_name>

# 重启特定服务
docker-compose restart <service_name>

# 查看特定服务日志
docker-compose logs <service_name>
docker-compose logs -f <service_name>
```

## 镜像管理

### 查看镜像

```bash
# 查看本地镜像
docker images
docker image ls

# 查看镜像详细信息
docker inspect <image_name>
```

### 镜像操作

```bash
# 拉取镜像
docker pull <image_name>

# 删除镜像
docker rmi <image_id>
docker rmi <image_name>

# 强制删除镜像
docker rmi -f <image_id>

# 删除所有未使用的镜像
docker image prune -a
```

## 网络管理

### 查看网络

```bash
# 查看所有网络
docker network ls

# 查看网络详细信息
docker network inspect <network_name>
```

### 网络操作

```bash
# 创建网络
docker network create <network_name>

# 删除网络
docker network rm <network_name>

# 连接容器到网络
docker network connect <network_name> <container_id>

# 断开容器与网络的连接
docker network disconnect <network_name> <container_id>
```

## 数据卷管理

### 查看数据卷

```bash
# 查看所有数据卷
docker volume ls

# 查看数据卷详细信息
docker volume inspect <volume_name>
```

### 数据卷操作

```bash
# 创建数据卷
docker volume create <volume_name>

# 删除数据卷
docker volume rm <volume_name>

# 删除所有未使用的数据卷
docker volume prune
```

## 系统信息

### 查看系统状态

```bash
# 查看 Docker 系统信息
docker info

# 查看 Docker 版本
docker version

# 查看 Docker 磁盘使用情况
docker system df

# 查看 Docker 统计信息
docker stats
docker stats --no-stream  # 只显示一次
```

### 清理系统

```bash
# 清理未使用的数据
docker system prune

# 清理所有未使用的数据（包括镜像）
docker system prune -a

# 清理构建缓存
docker builder prune
```

## 常用组合命令

### 一键清理

```bash
# 停止所有容器
docker stop $(docker ps -aq)

# 删除所有容器
docker rm $(docker ps -aq)

# 删除所有镜像
docker rmi $(docker images -q)

# 清理所有未使用的资源
docker system prune -a --volumes
```

### 查看容器资源使用

```bash
# 查看所有容器资源使用情况
docker stats --no-stream

# 查看特定容器资源使用
docker stats <container_name>
```

### 进入容器

```bash
# 进入运行中的容器
docker exec -it <container_id> /bin/bash
docker exec -it <container_id> /bin/sh

# 以 root 用户进入容器
docker exec -it -u root <container_id> /bin/bash
```

## 实用技巧

### 查看容器端口映射

```bash
docker port <container_id>
```

### 复制文件到/从容器

```bash
# 复制文件到容器
docker cp <local_file> <container_id>:/path/in/container

# 从容器复制文件
docker cp <container_id>:/path/in/container <local_file>
```

### 查看容器进程

```bash
docker top <container_id>
```

### 提交容器为新镜像

```bash
docker commit <container_id> <new_image_name>
```

## 故障排查

### 查看容器详细信息

```bash
# 查看容器配置
docker inspect <container_id>

# 查看容器日志
docker logs <container_id>

# 查看容器资源使用
docker stats <container_id>
```

### 重启 Docker 服务

```bash
# Linux
sudo systemctl restart docker

# macOS
osascript -e 'quit app "Docker"'
open -a Docker
```

## 注意事项

1. **容器 ID 和名称**：大多数命令既可以用容器 ID，也可以用容器名称
2. **权限问题**：某些操作可能需要 sudo 权限
3. **数据持久化**：删除容器前确保重要数据已备份或使用数据卷
4. **网络连接**：确保容器间网络配置正确
5. **资源限制**：注意容器资源使用情况，避免影响主机性能
