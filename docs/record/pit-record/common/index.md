# 常见问题

## 概述

这里收集了开发过程中经常遇到的问题和解决方案。

## 开发环境问题

### Node.js 版本问题
```bash
# 问题：Node.js版本不兼容
Error: Cannot find module 'xxx'

# 解决方案：使用nvm管理Node.js版本
nvm install 16
nvm use 16
```

### 依赖安装问题
```bash
# 问题：依赖安装失败
npm ERR! code ENOENT

# 解决方案：清理缓存重新安装
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### 端口占用问题
```bash
# 问题：端口被占用
Error: listen EADDRINUSE :::3000

# 解决方案：查找并杀死进程
lsof -ti:3000 | xargs kill -9
```

## 代码问题

### 异步问题
```javascript
// 问题：异步函数中的错误处理
async function fetchData() {
  const response = await fetch('/api/data');
  return response.json(); // 可能抛出错误
}

// 解决方案：添加错误处理
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
```

### 内存泄漏
```javascript
// 问题：事件监听器未清理
useEffect(() => {
  window.addEventListener('resize', handleResize);
  // 缺少清理函数
}, []);

// 解决方案：添加清理函数
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

## 构建问题

### Webpack 配置问题
```javascript
// 问题：模块找不到
Module not found: Can't resolve './xxx'

// 解决方案：检查路径和文件扩展名
module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
};
```

### 打包体积过大
```javascript
// 问题：打包文件过大
// 解决方案：代码分割和优化
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};
```

## 部署问题

### 路径问题
```javascript
// 问题：生产环境路径错误
// 解决方案：使用环境变量
const apiUrl = process.env.NODE_ENV === 'production' 
  ? 'https://api.production.com' 
  : 'http://localhost:3000';
```

### 缓存问题
```html
<!-- 问题：静态资源缓存 -->
<!-- 解决方案：添加版本号 -->
<script src="/static/js/main.js?v=1.0.0"></script>
```

## 性能问题

### 渲染性能
```javascript
// 问题：不必要的重渲染
// 解决方案：使用React.memo和useMemo
const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return expensiveProcessing(data);
  }, [data]);
  
  return <div>{processedData}</div>;
});
```

### 网络性能
```javascript
// 问题：重复请求
// 解决方案：使用缓存
const cache = new Map();

async function fetchWithCache(url) {
  if (cache.has(url)) {
    return cache.get(url);
  }
  
  const response = await fetch(url);
  const data = await response.json();
  cache.set(url, data);
  return data;
}
```

## 调试技巧

### 浏览器调试
```javascript
// 使用debugger语句
function complexFunction() {
  debugger; // 浏览器会在这里暂停
  // 复杂逻辑
}

// 使用console.trace()追踪调用栈
function traceFunction() {
  console.trace('Function called');
}
```

### 网络调试
```javascript
// 使用fetch的详细日志
fetch('/api/data')
  .then(response => {
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    return response.json();
  })
  .then(data => {
    console.log('Response data:', data);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
```

## 最佳实践

1. **错误处理** - 始终添加适当的错误处理
2. **日志记录** - 记录关键操作和错误信息
3. **性能监控** - 监控应用性能指标
4. **代码审查** - 定期进行代码审查

## 学习资源

- [MDN Web Docs](https://developer.mozilla.org/)
- [Stack Overflow](https://stackoverflow.com/)
- [GitHub Issues](https://github.com/) 