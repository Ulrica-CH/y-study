# React 框架

## 概述

React 是一个用于构建用户界面的 JavaScript 库，由 Facebook 开发并开源。

## 核心概念

### 组件
```jsx
// 函数组件
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// 类组件
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### JSX
```jsx
// JSX 语法
const element = (
  <div>
    <h1>Hello World</h1>
    <p>Welcome to React</p>
  </div>
);

// 编译后
const element = React.createElement(
  'div',
  null,
  React.createElement('h1', null, 'Hello World'),
  React.createElement('p', null, 'Welcome to React')
);
```

### 状态管理
```jsx
// useState Hook
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

## Hooks

### 常用 Hooks
```jsx
// useEffect - 副作用处理
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);

// useContext - 上下文
const ThemeContext = React.createContext('light');
const theme = useContext(ThemeContext);

// useReducer - 复杂状态管理
const [state, dispatch] = useReducer(reducer, initialState);
```

### 自定义 Hooks
```jsx
// 自定义 Hook
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}
```

## 性能优化

### React.memo
```jsx
// 避免不必要的重渲染
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});
```

### useMemo 和 useCallback
```jsx
// 缓存计算结果
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// 缓存函数
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

## 状态管理

### Context API
```jsx
// 创建 Context
const ThemeContext = React.createContext();

// Provider 组件
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 使用 Context
function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}
```

### Redux
```jsx
// Action
const increment = () => ({
  type: 'INCREMENT'
});

// Reducer
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
  }
};

// Store
const store = createStore(counterReducer);
```

## 路由

### React Router
```jsx
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/users/:id" component={User} />
      </Switch>
    </BrowserRouter>
  );
}
```

## 最佳实践

1. **组件设计** - 单一职责、可复用
2. **状态管理** - 合理使用本地状态和全局状态
3. **性能优化** - 使用 React.memo、useMemo 等
4. **代码规范** - 使用 ESLint、Prettier

## 学习资源

- [React 官方文档](https://reactjs.org/)
- [React Hooks 文档](https://reactjs.org/docs/hooks-intro.html)
- [React Router 文档](https://reactrouter.com/) 