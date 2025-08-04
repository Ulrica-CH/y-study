你可以在以下这些高质量网站快速查阅关于 `rsync`、`scp`、`sftp`、`ftp` 等命令的参数、用法和示例：

---

## 🔍 综合类 Linux 命令查询网站

### 1. [https://explainshell.com/](https://explainshell.com/)

* 📌 功能：逐个解释命令中的每一个参数（支持 rsync、scp 等）
* ✅ 优势：清晰、交互式，非常适合学习复杂命令
* 🧪 示例：输入 `rsync -avz` 它会图解每一个参数

---

### 2. [https://cheat.sh/](https://cheat.sh/)

* 📌 功能：命令行 cheat sheet（支持 curl 查询）
* ✅ 优势：快速、内容简洁
* 📦 示例：

  ```bash
  curl cheat.sh/rsync
  curl cheat.sh/scp
  ```

---

### 3. [https://tldr.sh/](https://tldr.sh/)

* 📌 功能：命令简明手册（Too Long; Didn't Read）
* ✅ 优势：官方命令行客户端支持离线使用，内容浓缩、适合快速记忆
* 🧪 安装并使用示例：

  ```bash
  npm install -g tldr
  tldr rsync
  ```

---

### 4. [https://linux.die.net/man/](https://linux.die.net/man/)

* 📌 功能：Linux 官方 man 手册网页版
* ✅ 优势：详细、权威
* 📘 示例：

  * [rsync man page](https://linux.die.net/man/1/rsync)
  * [scp man page](https://linux.die.net/man/1/scp)

---

### 5. [https://command-not-found.com/](https://command-not-found.com/)

* 📌 功能：查询 Linux 命令的用途和常用参数
* ✅ 优势：覆盖面广、界面简洁
* 🔍 示例：搜索 `rsync`、`sftp` 可查看简介和用法

---

## 🧰 开发者工具类

### 6. DevDocs（支持离线）

* 📌 地址：[https://devdocs.io/](https://devdocs.io/)
* ✅ 优势：支持搜索 `bash`、`linux`、`ssh`、`man` 页面
* 🖥️ 可以在浏览器中离线缓存

---

如果你更偏好中文资料，还可以参考：

### 中文推荐

* [菜鸟教程 - Linux 命令](https://www.runoob.com/linux/linux-command-manual.html)
* [Linux公社](https://www.linuxidc.com/)（适合查找中文社区教程）
* [开源中国社区 OSChina](https://www.oschina.net/p/linux)

---

📌 **建议：**

* **初学者** 用 `tldr` 和 `cheat.sh`
* **深入了解参数细节** 用 `man` 页面或 `explainshell`
* **中文学习者** 可以辅助用 runoob 和 Linux 社区文章

需要我帮你写一个 Bash 脚本一键查询这些网站的命令文档吗？
