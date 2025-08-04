# 🛡️ SSH 使用大全（含常用命令参数）

## 🔗 基本连接命令

```bash
ssh user@host
```

### 常用参数：

| 参数                 | 说明                                        |
| -------------------- | ------------------------------------------- |
| `-p <port>`          | 指定 SSH 端口（默认 22）                    |
| `-i <identity_file>` | 使用指定的私钥连接（默认 `~/.ssh/id_rsa`）  |
| `-v/-vv/-vvv`        | 输出连接调试信息（逐级加详细）              |
| `-o`                 | 设置配置项（如 `StrictHostKeyChecking=no`） |

📌 示例：

```bash
ssh -p 2222 -i ~/.ssh/id_rsa user@host
```

---

## 🧬 公钥登录配置（免密登录）

### 1. 生成密钥对

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

- `-t`：加密类型（如 rsa、ed25519）
- `-b`：密钥位数（rsa 常用 2048 或 4096）

生成后默认存放于：

```
~/.ssh/id_rsa      # 私钥（保密）
~/.ssh/id_rsa.pub  # 公钥
```

### 2. 上传公钥到服务器

```bash
ssh-copy-id user@host
```

- 会将 `id_rsa.pub` 写入远程的 `~/.ssh/authorized_keys`
- 需要首次输入密码

也可以手动上传：

```bash
cat ~/.ssh/id_rsa.pub | ssh user@host 'mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys'
```

---

## 🔄 远程执行命令

```bash
ssh user@host "command"
```

📌 示例：

```bash
ssh root@192.168.1.1 "ls -al /var/www"
```

---

## 📦 文件传输

### 使用 `scp`（单向复制）

```bash
scp [-r] [-P port] source user@host:/target/path
```

- `-r`：递归目录
- `-P`：指定端口（注意是大写 P）

📌 示例：

```bash
scp -P 2222 -r ./dist user@host:/var/www/
```

---

### 使用 `rsync`（高效同步）

```bash
rsync -avz -e "ssh -p 2222" ./dist/ user@host:/var/www/
```

- `-a`：归档模式（保留权限、时间等）
- `-v`：详细输出
- `-z`：压缩传输
- `-e`：指定远程 shell（如指定端口、私钥）

---

## 🔁 端口转发（SSH 隧道）

### 1. 本地端口转发（Local Forwarding）

```bash
ssh -L <local_port>:<remote_host>:<remote_port> user@ssh_host
```

- 将本地端口映射到远程服务

📌 示例：

```bash
ssh -L 3307:127.0.0.1:3306 user@remote_host
```

> 本地访问 `localhost:3307` 即访问远程的 `3306`（MySQL）

---

### 2. 远程端口转发（Remote Forwarding）

```bash
ssh -R <remote_port>:<local_host>:<local_port> user@ssh_host
```

📌 示例：

```bash
ssh -R 8888:localhost:8080 user@remote_host
```

> 远程服务器访问 `localhost:8888` 会反向访问你本地的 `8080`

---

### 3. 动态端口转发（SOCKS 代理）

```bash
ssh -D <local_port> user@host
```

📌 示例：

```bash
ssh -D 1080 user@host
```

> 本地开启一个 SOCKS5 代理（可配合浏览器代理使用）

---

## 🔧 SSH 配置文件（\~/.ssh/config）

简化命令：

```bash
Host myserver
    HostName 192.168.1.1
    User root
    Port 2222
    IdentityFile ~/.ssh/id_rsa
```

连接命令简化为：

```bash
ssh myserver
```

---

## 🔐 修改默认端口和登录策略（服务端）

修改 `/etc/ssh/sshd_config`：

```text
Port 2222
PermitRootLogin no
PasswordAuthentication no
```

然后重启服务：

```bash
sudo systemctl restart ssh
```

---

## 🧹 常用辅助命令

### 测试 SSH 连通性（不执行命令）

```bash
ssh -T user@host
```

### 测试指定端口是否通（等价于 telnet）

```bash
nc -zv host 22
```

---

## 🧪 SSH 常见错误排查

| 错误信息                        | 原因                                      |
| ------------------------------- | ----------------------------------------- |
| `Permission denied (publickey)` | 密钥未生效或未加到 `authorized_keys` 中   |
| `Connection refused`            | SSH 服务未启动或端口不对                  |
| `Host key verification failed`  | 主机指纹变化，需清理 `~/.ssh/known_hosts` |
| `Operation timed out`           | 网络不通或端口被防火墙拦截                |

---

