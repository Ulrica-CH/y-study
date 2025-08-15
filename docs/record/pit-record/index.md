# 踩坑记录

## 概述

这里记录了开发过程中遇到的各种问题和解决方案，避免重复踩坑。

## 常见问题

### JavaScript 相关

#### 异步问题
```javascript
// 问题：异步函数中的this指向
const obj = {
  name: 'test',
  asyncMethod: async function() {
    // 这里的this可能丢失
    setTimeout(() => {
      console.log(this.name); // undefined
    }, 1000);
  }
};

// 解决方案：使用箭头函数或bind
const obj = {
  name: 'test',
  asyncMethod: async function() {
    setTimeout(() => {
      console.log(this.name); // test
    }, 1000);
  }
};
```

#### 闭包陷阱
```javascript
// 问题：循环中的闭包
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 3, 3, 3
  }, 1000);
}

// 解决方案：使用let或IIFE
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 0, 1, 2
  }, 1000);
}
```

### CSS 相关

#### 布局问题
```css
/* 问题：flex布局中的高度塌陷 */
.container {
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1; /* 可能不生效 */
}

/* 解决方案：设置容器高度 */
.container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 或具体高度 */
}
```

#### 响应式问题
```css
/* 问题：移动端适配 */
.container {
  width: 375px; /* 固定宽度 */
}

/* 解决方案：使用相对单位 */
.container {
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
}
```

### 框架相关

#### Vue 问题
```javascript
// 问题：响应式数据更新
data() {
  return {
    list: []
  }
},
methods: {
  updateList() {
    this.list[0] = 'new item'; // 可能不触发更新
  }
}

// 解决方案：使用Vue.set或数组方法
methods: {
  updateList() {
    this.$set(this.list, 0, 'new item');
    // 或
    this.list.splice(0, 1, 'new item');
  }
}
```

#### React 问题
```javascript
// 问题：状态更新
const [count, setCount] = useState(0);

const increment = () => {
  setCount(count + 1); // 可能不准确
  setCount(count + 1);
};

// 解决方案：使用函数式更新
const increment = () => {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
};
```

## 性能问题

### 内存泄漏
```javascript
// 问题：事件监听器未清理
class Component {
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }
  
  // 缺少componentWillUnmount
}

// 解决方案：及时清理
class Component {
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
}
```

### 渲染优化
```javascript
// 问题：不必要的重渲染
function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <ExpensiveComponent /> {/* 每次都会重渲染 */}
    </div>
  );
}

// 解决方案：使用React.memo
const ExpensiveComponent = React.memo(() => {
  return <div>Expensive content</div>;
});
```

## 构建问题

### Webpack 配置
```javascript
// 问题：热更新不生效
module.exports = {
  devServer: {
    hot: true,
    // 缺少其他配置
  }
};

// 解决方案：完整配置
module.exports = {
  devServer: {
    hot: true,
    open: true,
    port: 3000,
    historyApiFallback: true
  }
};
```

### 依赖问题
```bash
# 问题：依赖版本冲突
npm ls package-name

# 解决方案：使用npm-check-updates
npx npm-check-updates -u
npm install
```

## 部署问题

### 路径问题
```javascript
// 问题：生产环境路径错误
const apiUrl = 'http://localhost:3000/api';

// 解决方案：使用环境变量
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
```

### 缓存问题
```html
<!-- 问题：静态资源缓存 -->
<script src="/static/js/main.js"></script>

<!-- 解决方案：添加版本号或hash -->
<script src="/static/js/main.js?v=1.0.0"></script>
```

## 最佳实践

1. **记录问题** - 及时记录遇到的问题和解决方案
2. **搜索优先** - 遇到问题先搜索，避免重复造轮子
3. **测试验证** - 解决方案要经过测试验证
4. **文档化** - 将解决方案整理成文档，方便团队共享

## 学习资源

- [Stack Overflow](https://stackoverflow.com/)
- [GitHub Issues](https://github.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [技术博客](https://medium.com/) 