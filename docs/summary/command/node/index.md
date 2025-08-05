# Node.js 常用命令与API参考

## 目录

- [Path 模块](#path-模块)
- [Process 模块](#process-模块)
- [File System (fs) 模块](#file-system-fs-模块)
- [HTTP 模块](#http-模块)
- [URL 模块](#url-模块)
- [Query String 模块](#query-string-模块)
- [Buffer 模块](#buffer-模块)
- [Events 模块](#events-模块)
- [Stream 模块](#stream-模块)
- [Child Process 模块](#child-process-模块)
- [OS 模块](#os-模块)
- [Util 模块](#util-模块)
- [Crypto 模块](#crypto-模块)
- [Zlib 模块](#zlib-模块)
- [常用第三方模块](#常用第三方模块)

---

## Path 模块

### 路径解析与操作

```javascript
const path = require('path');

// 路径解析 - 返回绝对路径
path.resolve('foo', 'bar', 'baz/asdf', 'quux', '..');
// 返回: /absolute/path/to/foo/bar/baz/asdf

// 路径拼接 - 返回规范化路径
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// 返回: '/foo/bar/baz/asdf'

// 获取文件名
path.basename('/foo/bar/baz/asdf/quux.html');
// 返回: 'quux.html'
path.basename('/foo/bar/baz/asdf/quux.html', '.html');
// 返回: 'quux'

// 获取目录名
path.dirname('/foo/bar/baz/asdf/quux');
// 返回: '/foo/bar/baz/asdf'

// 获取文件扩展名
path.extname('index.html');
// 返回: '.html'

// 解析路径对象
path.parse('/home/user/dir/file.txt');
// 返回: {
//   root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }

// 格式化路径对象
path.format({
  root: '/',
  dir: '/home/user/dir',
  base: 'file.txt'
});
// 返回: '/home/user/dir/file.txt'

// 判断是否为绝对路径
path.isAbsolute('/foo/bar'); // true
path.isAbsolute('./foo/bar'); // false

// 获取相对路径
path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
// 返回: '../../impl/bbb'

// 规范化路径
path.normalize('/foo/bar//baz/asdf/quux/..');
// 返回: '/foo/bar/baz/asdf'
```

---

## Process 模块

### 进程信息与控制

```javascript
// 进程ID
console.log(process.pid);

// 当前工作目录
console.log(process.cwd());
process.chdir('/tmp'); // 改变工作目录

// 环境变量
console.log(process.env.NODE_ENV);
process.env.CUSTOM_VAR = 'value';

// 命令行参数
console.log(process.argv);
// [node路径, 脚本路径, 参数1, 参数2, ...]

// 平台信息
console.log(process.platform); // 'darwin', 'win32', 'linux'
console.log(process.arch); // 'x64', 'arm64', 'ia32'

// Node.js版本
console.log(process.version);
console.log(process.versions);

// 内存使用情况
console.log(process.memoryUsage());
// {
//   rss: 4935680,
//   heapTotal: 1826816,
//   heapUsed: 650472,
//   external: 49879,
//   arrayBuffers: 9386
// }

// CPU使用情况
console.log(process.cpuUsage());

// 进程退出
process.exit(0); // 正常退出
process.exit(1); // 错误退出

// 退出前清理
process.on('exit', (code) => {
  console.log(`进程退出，退出码: ${code}`);
});

// 未捕获异常处理
process.on('uncaughtException', (err) => {
  console.error('未捕获的异常:', err);
  process.exit(1);
});

// 未处理的Promise拒绝
process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的Promise拒绝:', reason);
});
```

### 标准输入输出

```javascript
// 标准输入
process.stdin.setEncoding('utf8');
process.stdin.on('data', (data) => {
  console.log('收到输入:', data.trim());
  process.exit(0);
});

// 标准输出
process.stdout.write('Hello World\n');
process.stdout.write(Buffer.from('Hello Buffer\n'));

// 标准错误
process.stderr.write('错误信息\n');

// 格式化输出
console.log('普通日志');
console.error('错误日志');
console.warn('警告日志');
console.info('信息日志');
console.debug('调试日志');

// 格式化输出
console.log('用户: %s, 年龄: %d', '张三', 25);
console.log('对象: %o', { name: '张三', age: 25 });

// 计时器
console.time('操作耗时');
// ... 执行操作
console.timeEnd('操作耗时');

// 表格输出
console.table([
  { name: '张三', age: 25, city: '北京' },
  { name: '李四', age: 30, city: '上海' }
]);

// 堆栈跟踪
console.trace('调用堆栈');
```

---

## File System (fs) 模块

### 同步文件操作

```javascript
const fs = require('fs');

// 读取文件
const data = fs.readFileSync('file.txt', 'utf8');
const buffer = fs.readFileSync('file.txt');

// 写入文件
fs.writeFileSync('output.txt', 'Hello World');
fs.writeFileSync('output.txt', Buffer.from('Hello Buffer'));

// 追加文件
fs.appendFileSync('log.txt', '新日志条目\n');

// 检查文件是否存在
if (fs.existsSync('file.txt')) {
  console.log('文件存在');
}

// 获取文件信息
const stats = fs.statSync('file.txt');
console.log('文件大小:', stats.size);
console.log('创建时间:', stats.birthtime);
console.log('修改时间:', stats.mtime);
console.log('是否为文件:', stats.isFile());
console.log('是否为目录:', stats.isDirectory());

// 创建目录
fs.mkdirSync('newdir', { recursive: true });

// 读取目录
const files = fs.readdirSync('.');
console.log('目录内容:', files);

// 删除文件
fs.unlinkSync('file.txt');

// 删除目录
fs.rmdirSync('emptydir');

// 重命名文件
fs.renameSync('oldname.txt', 'newname.txt');

// 复制文件
fs.copyFileSync('source.txt', 'dest.txt');

// 创建符号链接
fs.symlinkSync('target.txt', 'link.txt');
```

### 异步文件操作

```javascript
const fs = require('fs').promises;

// 异步读取文件
async function readFile() {
  try {
    const data = await fs.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error('读取文件失败:', err);
  }
}

// 异步写入文件
async function writeFile() {
  try {
    await fs.writeFile('output.txt', 'Hello World');
    console.log('文件写入成功');
  } catch (err) {
    console.error('写入文件失败:', err);
  }
}

// 异步获取文件信息
async function getFileInfo() {
  try {
    const stats = await fs.stat('file.txt');
    console.log('文件大小:', stats.size);
  } catch (err) {
    console.error('获取文件信息失败:', err);
  }
}

// 异步读取目录
async function readDirectory() {
  try {
    const files = await fs.readdir('.');
    console.log('目录内容:', files);
  } catch (err) {
    console.error('读取目录失败:', err);
  }
}
```

### 文件流操作

```javascript
const fs = require('fs');

// 创建读取流
const readStream = fs.createReadStream('large-file.txt', {
  encoding: 'utf8',
  highWaterMark: 64 * 1024 // 64KB
});

// 创建写入流
const writeStream = fs.createWriteStream('output.txt');

// 管道操作
readStream.pipe(writeStream);

// 监听事件
readStream.on('data', (chunk) => {
  console.log('读取数据块:', chunk.length);
});

readStream.on('end', () => {
  console.log('文件读取完成');
});

readStream.on('error', (err) => {
  console.error('读取错误:', err);
});

writeStream.on('finish', () => {
  console.log('文件写入完成');
});

writeStream.on('error', (err) => {
  console.error('写入错误:', err);
});
```

---

## HTTP 模块

### 创建HTTP服务器

```javascript
const http = require('http');

// 创建服务器
const server = http.createServer((req, res) => {
  // 设置响应头
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // 获取请求信息
  console.log('请求方法:', req.method);
  console.log('请求URL:', req.url);
  console.log('请求头:', req.headers);
  
  // 处理请求体
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  
  req.on('end', () => {
    console.log('请求体:', body);
    
    // 发送响应
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'Hello World' }));
  });
});

// 监听端口
server.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000');
});

// 错误处理
server.on('error', (err) => {
  console.error('服务器错误:', err);
});
```

### 发送HTTP请求

```javascript
const http = require('http');

// GET请求
const getOptions = {
  hostname: 'api.example.com',
  port: 80,
  path: '/users',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

const getReq = http.request(getOptions, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('响应数据:', JSON.parse(data));
  });
});

getReq.on('error', (err) => {
  console.error('请求错误:', err);
});

getReq.end();

// POST请求
const postOptions = {
  hostname: 'api.example.com',
  port: 80,
  path: '/users',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const postData = JSON.stringify({
  name: '张三',
  age: 25
});

const postReq = http.request(postOptions, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('响应数据:', JSON.parse(data));
  });
});

postReq.on('error', (err) => {
  console.error('请求错误:', err);
});

postReq.write(postData);
postReq.end();
```

---

## URL 模块

### URL解析与构建

```javascript
const url = require('url');

// 解析URL
const parsedUrl = url.parse('https://example.com:8080/path?query=value#hash');
console.log(parsedUrl);
// {
//   protocol: 'https:',
//   slashes: true,
//   auth: null,
//   host: 'example.com:8080',
//   port: '8080',
//   hostname: 'example.com',
//   hash: '#hash',
//   search: '?query=value',
//   query: 'query=value',
//   pathname: '/path',
//   path: '/path?query=value',
//   href: 'https://example.com:8080/path?query=value#hash'
// }

// 构建URL
const urlObject = {
  protocol: 'https:',
  host: 'example.com',
  pathname: '/api/users',
  query: { id: 123, name: '张三' }
};

const constructedUrl = url.format(urlObject);
console.log(constructedUrl);
// 'https://example.com/api/users?id=123&name=%E5%BC%A0%E4%B8%89'

// 解析查询字符串
const queryString = 'name=张三&age=25&city=北京';
const parsedQuery = url.parse(`?${queryString}`, true).query;
console.log(parsedQuery);
// { name: '张三', age: '25', city: '北京' }

// 构建查询字符串
const queryObject = { name: '张三', age: 25, city: '北京' };
const formattedQuery = url.format({ query: queryObject });
console.log(formattedQuery);
// '?name=%E5%BC%A0%E4%B8%89&age=25&city=%E5%8C%97%E4%BA%AC'

// 解析相对URL
const baseUrl = 'https://example.com/api/';
const relativeUrl = '../users?id=123';
const resolvedUrl = url.resolve(baseUrl, relativeUrl);
console.log(resolvedUrl);
// 'https://example.com/users?id=123'
```

---

## Query String 模块

### 查询字符串处理

```javascript
const querystring = require('querystring');

// 解析查询字符串
const query = 'name=张三&age=25&city=北京';
const parsed = querystring.parse(query);
console.log(parsed);
// { name: '张三', age: '25', city: '北京' }

// 序列化对象为查询字符串
const obj = { name: '张三', age: 25, city: '北京' };
const stringified = querystring.stringify(obj);
console.log(stringified);
// 'name=%E5%BC%A0%E4%B8%89&age=25&city=%E5%8C%97%E4%BA%AC'

// 使用自定义分隔符
const customParsed = querystring.parse('name:张三;age:25', ';', ':');
console.log(customParsed);
// { name: '张三', age: '25' }

const customStringified = querystring.stringify(obj, ';', ':');
console.log(customStringified);
// 'name:%E5%BC%A0%E4%B8%89;age:25;city:%E5%8C%97%E4%BA%AC'

// 编码和解码
const encoded = querystring.escape('张三&李四');
console.log(encoded);
// '%E5%BC%A0%E4%B8%89%26%E6%9D%8E%E5%9B%9B'

const decoded = querystring.unescape('%E5%BC%A0%E4%B8%89%26%E6%9D%8E%E5%9B%9B');
console.log(decoded);
// '张三&李四'
```

---

## Buffer 模块

### 缓冲区操作

```javascript
const { Buffer } = require('buffer');

// 创建Buffer
const buf1 = Buffer.alloc(10); // 创建10字节的零填充Buffer
const buf2 = Buffer.allocUnsafe(10); // 创建10字节的未初始化Buffer
const buf3 = Buffer.from('Hello World'); // 从字符串创建
const buf4 = Buffer.from([1, 2, 3, 4, 5]); // 从数组创建

// Buffer操作
const buf = Buffer.from('Hello World');
console.log(buf.toString()); // 'Hello World'
console.log(buf.toString('hex')); // '48656c6c6f20576f726c64'
console.log(buf.toString('base64')); // 'SGVsbG8gV29ybGQ='

// 写入Buffer
const writeBuf = Buffer.alloc(10);
writeBuf.write('Hello', 0, 5, 'utf8');
console.log(writeBuf.toString()); // 'Hello'

// 读取Buffer
const readBuf = Buffer.from('Hello World');
console.log(readBuf.readUInt8(0)); // 72 (H的ASCII码)
console.log(readBuf.readUInt16BE(0)); // 18537
console.log(readBuf.readUInt16LE(0)); // 25960

// Buffer拼接
const bufA = Buffer.from('Hello');
const bufB = Buffer.from(' World');
const combined = Buffer.concat([bufA, bufB]);
console.log(combined.toString()); // 'Hello World'

// Buffer比较
const buf1 = Buffer.from('Hello');
const buf2 = Buffer.from('Hello');
const buf3 = Buffer.from('World');
console.log(Buffer.compare(buf1, buf2)); // 0 (相等)
console.log(Buffer.compare(buf1, buf3)); // -1 (buf1 < buf3)

// Buffer复制
const source = Buffer.from('Hello World');
const target = Buffer.alloc(11);
source.copy(target);
console.log(target.toString()); // 'Hello World'

// Buffer切片
const original = Buffer.from('Hello World');
const sliced = original.slice(0, 5);
console.log(sliced.toString()); // 'Hello'

// Buffer填充
const fillBuf = Buffer.alloc(10);
fillBuf.fill('A');
console.log(fillBuf.toString()); // 'AAAAAAAAAA'

// Buffer查找
const searchBuf = Buffer.from('Hello World');
console.log(searchBuf.indexOf('World')); // 6
console.log(searchBuf.includes('Hello')); // true
```

---

## Events 模块

### 事件发射器

```javascript
const EventEmitter = require('events');

// 创建事件发射器
const myEmitter = new EventEmitter();

// 监听事件
myEmitter.on('event', (arg1, arg2) => {
  console.log('事件触发:', arg1, arg2);
});

// 一次性监听器
myEmitter.once('onceEvent', () => {
  console.log('一次性事件触发');
});

// 发射事件
myEmitter.emit('event', '参数1', '参数2');
myEmitter.emit('onceEvent');
myEmitter.emit('onceEvent'); // 不会触发

// 移除监听器
const listener = (data) => console.log('监听器:', data);
myEmitter.on('removeEvent', listener);
myEmitter.removeListener('removeEvent', listener);

// 移除所有监听器
myEmitter.removeAllListeners('event');

// 获取监听器数量
console.log(myEmitter.listenerCount('event'));

// 获取事件名称列表
console.log(myEmitter.eventNames());

// 设置最大监听器数量
myEmitter.setMaxListeners(20);

// 错误处理
myEmitter.on('error', (err) => {
  console.error('事件错误:', err);
});

// 继承EventEmitter
class MyClass extends EventEmitter {
  constructor() {
    super();
  }
  
  doSomething() {
    this.emit('done', '操作完成');
  }
}

const instance = new MyClass();
instance.on('done', (message) => {
  console.log(message);
});
instance.doSomething();
```

---

## Stream 模块

### 流操作

```javascript
const { Readable, Writable, Transform, Duplex } = require('stream');

// 创建可读流
class MyReadable extends Readable {
  constructor(options) {
    super(options);
    this.data = ['Hello', 'World', 'Stream'];
    this.index = 0;
  }
  
  _read() {
    if (this.index < this.data.length) {
      this.push(this.data[this.index]);
      this.index++;
    } else {
      this.push(null); // 结束流
    }
  }
}

// 创建可写流
class MyWritable extends Writable {
  constructor(options) {
    super(options);
  }
  
  _write(chunk, encoding, callback) {
    console.log('写入数据:', chunk.toString());
    callback();
  }
}

// 创建转换流
class MyTransform extends Transform {
  constructor(options) {
    super(options);
  }
  
  _transform(chunk, encoding, callback) {
    const transformed = chunk.toString().toUpperCase();
    this.push(transformed);
    callback();
  }
}

// 使用流
const readable = new MyReadable();
const writable = new MyWritable();
const transform = new MyTransform();

readable.pipe(transform).pipe(writable);

// 流事件
readable.on('data', (chunk) => {
  console.log('读取数据:', chunk.toString());
});

readable.on('end', () => {
  console.log('读取完成');
});

readable.on('error', (err) => {
  console.error('读取错误:', err);
});

writable.on('finish', () => {
  console.log('写入完成');
});

writable.on('error', (err) => {
  console.error('写入错误:', err);
});

// 管道操作
const fs = require('fs');
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);

// 错误处理
readStream.on('error', (err) => {
  console.error('读取错误:', err);
  writeStream.end();
});

writeStream.on('error', (err) => {
  console.error('写入错误:', err);
});
```

---

## Child Process 模块

### 子进程管理

```javascript
const { spawn, exec, execFile, fork } = require('child_process');

// spawn - 创建子进程
const ls = spawn('ls', ['-la'], {
  cwd: '/tmp',
  env: process.env
});

ls.stdout.on('data', (data) => {
  console.log('输出:', data.toString());
});

ls.stderr.on('data', (data) => {
  console.error('错误:', data.toString());
});

ls.on('close', (code) => {
  console.log('进程退出，退出码:', code);
});

// exec - 执行命令
exec('ls -la', (error, stdout, stderr) => {
  if (error) {
    console.error('执行错误:', error);
    return;
  }
  console.log('输出:', stdout);
  if (stderr) {
    console.error('错误输出:', stderr);
  }
});

// execFile - 执行文件
execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    console.error('执行错误:', error);
    return;
  }
  console.log('Node版本:', stdout);
});

// fork - 创建Node.js子进程
const child = fork('./child.js', ['arg1', 'arg2'], {
  silent: false // 继承父进程的stdio
});

child.on('message', (message) => {
  console.log('收到子进程消息:', message);
});

child.send({ type: 'hello', data: 'world' });

// 子进程文件 (child.js)
process.on('message', (message) => {
  console.log('收到父进程消息:', message);
  process.send({ type: 'response', data: 'received' });
});

// 进程间通信
const { spawn } = require('child_process');
const child = spawn('node', ['child.js'], {
  stdio: ['pipe', 'pipe', 'pipe', 'ipc']
});

child.on('message', (message) => {
  console.log('子进程消息:', message);
});

child.send('Hello from parent');

// 进程池
const os = require('os');
const cluster = require('cluster');

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 退出`);
    cluster.fork(); // 重启工作进程
  });
} else {
  // 工作进程代码
  require('./server.js');
}
```

---

## OS 模块

### 操作系统信息

```javascript
const os = require('os');

// 平台信息
console.log('平台:', os.platform()); // 'darwin', 'win32', 'linux'
console.log('架构:', os.arch()); // 'x64', 'arm64', 'ia32'
console.log('类型:', os.type()); // 'Darwin', 'Windows_NT', 'Linux'
console.log('发行版:', os.release()); // 内核版本

// CPU信息
console.log('CPU核心数:', os.cpus().length);
console.log('CPU型号:', os.cpus()[0].model);
console.log('CPU速度:', os.cpus()[0].speed);

// 内存信息
console.log('总内存:', os.totalmem());
console.log('空闲内存:', os.freemem());
console.log('内存使用率:', ((os.totalmem() - os.freemem()) / os.totalmem() * 100).toFixed(2) + '%');

// 网络接口
console.log('网络接口:', os.networkInterfaces());

// 用户信息
console.log('主机名:', os.hostname());
console.log('用户目录:', os.homedir());
console.log('临时目录:', os.tmpdir());
console.log('用户名:', os.userInfo().username);

// 系统运行时间
console.log('系统运行时间:', os.uptime());

// 负载平均值 (仅Linux/macOS)
console.log('负载平均值:', os.loadavg());

// 常量
console.log('行结束符:', JSON.stringify(os.EOL));
console.log('常量:', os.constants);
```

---

## Util 模块

### 实用工具函数

```javascript
const util = require('util');

// 格式化字符串
const formatted = util.format('Hello %s, you are %d years old', '张三', 25);
console.log(formatted); // 'Hello 张三, you are 25 years old'

// 检查类型
console.log(util.isArray([1, 2, 3])); // true
console.log(util.isBoolean(true)); // true
console.log(util.isBuffer(Buffer.from('hello'))); // true
console.log(util.isDate(new Date())); // true
console.log(util.isError(new Error())); // true
console.log(util.isFunction(() => {})); // true
console.log(util.isNull(null)); // true
console.log(util.isNumber(123)); // true
console.log(util.isObject({})); // true
console.log(util.isRegExp(/test/)); // true
console.log(util.isString('hello')); // true
console.log(util.isSymbol(Symbol())); // true
console.log(util.isUndefined(undefined)); // true

// 继承
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound`);
};

function Dog(name) {
  Animal.call(this, name);
}

util.inherits(Dog, Animal);

const dog = new Dog('Rex');
dog.speak(); // 'Rex makes a sound'

// 深度比较
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
console.log(util.isDeepStrictEqual(obj1, obj2)); // true

// 转换为字符串
const obj = { name: '张三', age: 25 };
console.log(util.inspect(obj, { depth: null, colors: true }));

// 回调转Promise
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

async function readFileAsync() {
  try {
    const data = await readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

// 文本编码
const TextEncoder = util.TextEncoder;
const TextDecoder = util.TextDecoder;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const encoded = encoder.encode('Hello World');
const decoded = decoder.decode(encoded);
console.log(decoded); // 'Hello World'

// 调试工具
const debug = util.debuglog('myapp');
debug('这是一条调试信息');

// 废弃警告
util.deprecate(() => {
  console.log('这个函数已废弃');
}, '这个函数将在下一个版本中移除')();
```

---

## Crypto 模块

### 加密解密

```javascript
const crypto = require('crypto');

// 哈希函数
const hash = crypto.createHash('sha256');
hash.update('Hello World');
console.log('SHA256:', hash.digest('hex'));

// HMAC
const hmac = crypto.createHmac('sha256', 'secret-key');
hmac.update('Hello World');
console.log('HMAC:', hmac.digest('hex'));

// 随机数生成
const randomBytes = crypto.randomBytes(16);
console.log('随机字节:', randomBytes.toString('hex'));

// 对称加密
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

// 加密
const cipher = crypto.createCipher(algorithm, key);
let encrypted = cipher.update('Hello World', 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log('加密结果:', encrypted);

// 解密
const decipher = crypto.createDecipher(algorithm, key);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log('解密结果:', decrypted);

// 非对称加密
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});

// 使用公钥加密
const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from('Hello World'));
console.log('公钥加密:', encryptedData.toString('base64'));

// 使用私钥解密
const decryptedData = crypto.privateDecrypt(privateKey, encryptedData);
console.log('私钥解密:', decryptedData.toString());

// 数字签名
const sign = crypto.createSign('SHA256');
sign.update('Hello World');
const signature = sign.sign(privateKey, 'hex');
console.log('数字签名:', signature);

// 验证签名
const verify = crypto.createVerify('SHA256');
verify.update('Hello World');
const isValid = verify.verify(publicKey, signature, 'hex');
console.log('签名验证:', isValid);

// 密码哈希
const password = 'myPassword123';
const salt = crypto.randomBytes(16).toString('hex');
const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
console.log('密码哈希:', hash);

// 验证密码
function verifyPassword(password, salt, hash) {
  const testHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return testHash === hash;
}

console.log('密码验证:', verifyPassword('myPassword123', salt, hash));
```

---

## Zlib 模块

### 压缩解压

```javascript
const zlib = require('zlib');
const fs = require('fs');

// Gzip压缩
const gzip = zlib.createGzip();
const input = fs.createReadStream('input.txt');
const output = fs.createWriteStream('input.txt.gz');

input.pipe(gzip).pipe(output);

// Gzip解压
const gunzip = zlib.createGunzip();
const compressed = fs.createReadStream('input.txt.gz');
const decompressed = fs.createWriteStream('output.txt');

compressed.pipe(gunzip).pipe(decompressed);

// Deflate压缩
const deflate = zlib.createDeflate();
const deflateStream = fs.createReadStream('input.txt').pipe(deflate);

// Deflate解压
const inflate = zlib.createInflate();
const inflateStream = deflateStream.pipe(inflate);

// 同步压缩
const data = 'Hello World';
const compressed = zlib.gzipSync(data);
const decompressed = zlib.gunzipSync(compressed);
console.log('解压结果:', decompressed.toString());

// 压缩级别
const gzipLevel9 = zlib.createGzip({ level: 9 });
const gzipLevel1 = zlib.createGzip({ level: 1 });

// 压缩字典
const dictionary = Buffer.from('Hello World');
const deflateWithDict = zlib.createDeflate({ dictionary });
const inflateWithDict = zlib.createInflate({ dictionary });

// 压缩统计
const stats = zlib.gzipSync(data);
console.log('压缩前大小:', Buffer.byteLength(data));
console.log('压缩后大小:', stats.length);
console.log('压缩率:', ((1 - stats.length / Buffer.byteLength(data)) * 100).toFixed(2) + '%');
```

---

## 常用第三方模块

### Express.js

```javascript
const express = require('express');
const app = express();

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// 路由
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/api/users', (req, res) => {
  res.json({ message: 'User created' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Axios

```javascript
const axios = require('axios');

// GET请求
axios.get('https://api.example.com/users')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

// POST请求
axios.post('https://api.example.com/users', {
  name: '张三',
  age: 25
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error);
});

// 配置
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
