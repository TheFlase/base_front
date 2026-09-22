# 阶段4：React 框架项目

## 学习目标

- 掌握 React 核心概念（组件、Props、State）
- 熟练使用 React Hooks
- 理解组件生命周期
- 掌握状态管理（Context API、Redux）
- 学会 React Router 路由管理
- 理解虚拟 DOM 和性能优化

## 项目列表

### 1. 电商商城（ecommerce-shop）
**难度**：⭐⭐⭐⭐  
**技术栈**：React 18 + React Router + Context API + LocalStorage  
**学习要点**：
- 组件化开发
- 状态提升和传递
- Context API 全局状态
- 路由配置和导航
- 购物车逻辑
- 表单处理

**功能特性**：
- 商品列表和搜索
- 商品详情页
- 购物车管理
- 订单结算
- 用户登录/注册
- 订单历史

### 2. 后台管理系统（admin-dashboard）
**难度**：⭐⭐⭐⭐  
**技术栈**：React + Ant Design + ECharts + Mock Data  
**学习要点**：
- UI 组件库使用
- 数据可视化
- 表格操作（CRUD）
- 权限控制
- 布局设计
- 响应式设计

**功能特性**：
- 数据统计面板
- 用户管理
- 商品管理
- 订单管理
- 图表展示
- 权限管理

### 3. 社交媒体信息流（social-media-feed）
**难度**：⭐⭐⭐  
**技术栈**：React + Firebase/Mock API  
**学习要点**：
- 无限滚动
- 图片上传
- 实时更新
- 点赞评论
- 用户交互
- 性能优化

**功能特性**：
- 发布动态
- 点赞评论
- 关注用户
- 个人主页
- 消息通知
- 搜索功能

## 环境准备

### 安装 Node.js 和 npm

```bash
# 检查是否安装
node -v
npm -v

# 推荐版本
# Node.js: v18+ 
# npm: v9+
```

### 创建 React 项目

```bash
# 使用 Create React App
npx create-react-app my-app
cd my-app
npm start

# 或使用 Vite（推荐，更快）
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

## React 核心概念

### 1. 组件

```jsx
// 函数组件（推荐）
function Welcome(props) {
    return <h1>你好, {props.name}</h1>;
}

// 使用组件
<Welcome name="张三" />
```

### 2. Props（属性）

```jsx
// 父组件传递 props
function App() {
    return <UserCard name="张三" age={25} />;
}

// 子组件接收 props
function UserCard({ name, age }) {
    return (
        <div>
            <h2>{name}</h2>
            <p>年龄: {age}</p>
        </div>
    );
}
```

### 3. State（状态）

```jsx
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>计数: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                增加
            </button>
        </div>
    );
}
```

### 4. useEffect Hook

```jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        // 组件挂载或 userId 变化时执行
        fetchUser(userId).then(data => setUser(data));
        
        // 清理函数（可选）
        return () => {
            // 组件卸载时执行
        };
    }, [userId]); // 依赖数组
    
    if (!user) return <div>加载中...</div>;
    
    return <div>{user.name}</div>;
}
```

### 5. 事件处理

```jsx
function Button() {
    const handleClick = (e) => {
        e.preventDefault();
        console.log('按钮被点击了！');
    };
    
    return <button onClick={handleClick}>点击我</button>;
}
```

### 6. 条件渲染

```jsx
function Greeting({ isLoggedIn }) {
    return (
        <div>
            {isLoggedIn ? (
                <h1>欢迎回来！</h1>
            ) : (
                <h1>请先登录</h1>
            )}
        </div>
    );
}
```

### 7. 列表渲染

```jsx
function UserList({ users }) {
    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}
```

### 8. 表单处理

```jsx
function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // 处理登录逻辑
        console.log(email, password);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">登录</button>
        </form>
    );
}
```

## 常用 Hooks

### useState - 状态管理
```jsx
const [state, setState] = useState(initialValue);
```

### useEffect - 副作用
```jsx
useEffect(() => {
    // 副作用代码
}, [dependencies]);
```

### useContext - 上下文
```jsx
const value = useContext(MyContext);
```

### useReducer - 复杂状态
```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

### useCallback - 缓存函数
```jsx
const memoizedCallback = useCallback(() => {
    doSomething(a, b);
}, [a, b]);
```

### useMemo - 缓存值
```jsx
const memoizedValue = useMemo(() => {
    return computeExpensiveValue(a, b);
}, [a, b]);
```

### useRef - 引用
```jsx
const inputRef = useRef(null);
// 访问 DOM: inputRef.current
```

## React Router

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">首页</Link>
                <Link to="/about">关于</Link>
            </nav>
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/user/:id" element={<User />} />
            </Routes>
        </BrowserRouter>
    );
}
```

## 状态管理

### Context API
```jsx
// 创建 Context
const UserContext = React.createContext();

// 提供者
function App() {
    const [user, setUser] = useState(null);
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <ChildComponent />
        </UserContext.Provider>
    );
}

// 消费者
function ChildComponent() {
    const { user } = useContext(UserContext);
    return <div>{user?.name}</div>;
}
```

## 学习时间建议

- 全职学习：2-3 个月
- 业余学习：4-6 个月
- 每天学习时间：3-5 小时

## 学习资源

- [React 官方文档](https://react.dev/)
- [React 中文文档](https://zh-hans.react.dev/)
- [React Router 文档](https://reactrouter.com/)
- [Ant Design](https://ant.design/)
- [Material-UI](https://mui.com/)

## 推荐工具和库

### UI 组件库
- Ant Design
- Material-UI
- Chakra UI
- Tailwind CSS

### 状态管理
- Redux Toolkit
- Zustand
- Jotai
- MobX

### 工具库
- Axios（HTTP 请求）
- React Query（数据获取）
- React Hook Form（表单）
- Day.js（日期处理）

## 最佳实践

1. **组件拆分**：保持组件小而专注
2. **Props 验证**：使用 TypeScript 或 PropTypes
3. **状态提升**：在合适的层级管理状态
4. **性能优化**：使用 memo、useMemo、useCallback
5. **代码规范**：使用 ESLint 和 Prettier
6. **文件组织**：按功能模块组织文件

## 项目结构示例

```
src/
├── components/       # 通用组件
│   ├── Button/
│   ├── Card/
│   └── Modal/
├── pages/           # 页面组件
│   ├── Home/
│   ├── About/
│   └── User/
├── hooks/           # 自定义 Hooks
├── context/         # Context 定义
├── utils/           # 工具函数
├── api/             # API 调用
├── styles/          # 样式文件
├── App.jsx          # 根组件
└── main.jsx         # 入口文件
```

## 调试工具

- React DevTools（浏览器扩展）
- Redux DevTools
- Chrome DevTools

## 下一步

完成这些项目后，你将准备好学习：
- Next.js（React SSR 框架）
- TypeScript
- Redux Toolkit
- React Native（移动端开发）

---

💡 **提示**：React 的核心是组件化思想，多多练习组件的拆分和复用！

