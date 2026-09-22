# 阶段3：JavaScript 进阶

## 学习目标

- 掌握 ES6+ 现代 JavaScript 语法
- 理解异步编程（Promise、async/await）
- 熟练使用 Fetch API 调用接口
- 学会错误处理和调试
- 理解模块化开发
- 掌握高级数组方法

## 项目列表

### 1. 天气预报应用（weather-app）
**难度**：⭐⭐⭐  
**学习要点**：
- Fetch API 调用第三方接口
- async/await 异步编程
- Promise 错误处理
- 地理位置 API
- JSON 数据处理
- 动态 UI 更新

**功能特性**：
- 实时天气查询
- 城市搜索
- 5天天气预报
- 天气图标显示
- 温度单位切换
- 地理位置自动定位

### 2. 图片画廊（photo-gallery）
**难度**：⭐⭐⭐  
**学习要点**：
- Unsplash API 集成
- 无限滚动加载
- Intersection Observer API
- 图片懒加载
- 搜索防抖
- 模态框实现

**功能特性**：
- 图片瀑布流布局
- 搜索图片
- 无限滚动加载
- 图片预览（灯箱效果）
- 图片下载
- 收藏功能

### 3. 记账应用（expense-tracker）
**难度**：⭐⭐⭐  
**学习要点**：
- 复杂数据结构管理
- 图表库（Chart.js）
- 日期处理
- 数据统计和分析
- CSV 导出
- IndexedDB（可选）

**功能特性**：
- 添加收入/支出
- 分类管理
- 数据可视化（饼图、折线图）
- 日期筛选
- 统计报表
- 数据导出

## 学习时间建议

- 全职学习：1-2 个月
- 业余学习：3-4 个月
- 每天学习时间：3-5 小时

## ES6+ 核心特性

### 1. 箭头函数
```javascript
// 传统函数
function add(a, b) {
    return a + b;
}

// 箭头函数
const add = (a, b) => a + b;

// 数组方法中使用
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2);
```

### 2. 解构赋值
```javascript
// 对象解构
const user = { name: '张三', age: 25 };
const { name, age } = user;

// 数组解构
const [first, second] = [1, 2, 3];

// 函数参数解构
function greet({ name, age }) {
    console.log(`${name}, ${age}岁`);
}
```

### 3. 模板字符串
```javascript
const name = '张三';
const age = 25;

// 传统方式
const msg1 = '我叫' + name + '，今年' + age + '岁';

// 模板字符串
const msg2 = `我叫${name}，今年${age}岁`;

// 多行字符串
const html = `
    <div>
        <h1>${name}</h1>
    </div>
`;
```

### 4. Promise
```javascript
// 创建 Promise
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('数据加载成功');
        }, 1000);
    });
};

// 使用 Promise
fetchData()
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

### 5. async/await
```javascript
// 定义异步函数
async function fetchUser() {
    try {
        const response = await fetch('/api/user');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('错误:', error);
        throw error;
    }
}

// 使用
fetchUser().then(user => console.log(user));
```

### 6. 模块化
```javascript
// export.js - 导出
export const name = '张三';
export function greet() {
    console.log('Hello');
}

export default {
    name,
    greet
};

// import.js - 导入
import { name, greet } from './export.js';
import myModule from './export.js';
```

### 7. 展开运算符
```javascript
// 数组
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];

// 对象
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };

// 函数参数
const numbers = [1, 2, 3];
Math.max(...numbers);
```

### 8. 高级数组方法
```javascript
const users = [
    { id: 1, name: '张三', age: 25 },
    { id: 2, name: '李四', age: 30 },
    { id: 3, name: '王五', age: 35 }
];

// map - 映射转换
const names = users.map(u => u.name);

// filter - 过滤
const adults = users.filter(u => u.age >= 30);

// find - 查找
const user = users.find(u => u.id === 2);

// reduce - 累加
const totalAge = users.reduce((sum, u) => sum + u.age, 0);

// some - 存在
const hasYoung = users.some(u => u.age < 30);

// every - 全部
const allAdults = users.every(u => u.age >= 18);

// sort - 排序
const sorted = users.sort((a, b) => a.age - b.age);
```

## Fetch API

### 基本用法
```javascript
// GET 请求
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('错误:', error));

// POST 请求
fetch('https://api.example.com/data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: '张三',
        age: 25
    })
})
    .then(response => response.json())
    .then(data => console.log(data));
```

### 使用 async/await
```javascript
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('获取数据失败:', error);
        throw error;
    }
}
```

## 错误处理

### try-catch
```javascript
try {
    // 可能出错的代码
    const data = JSON.parse(jsonString);
} catch (error) {
    // 处理错误
    console.error('解析失败:', error.message);
} finally {
    // 无论如何都会执行
    console.log('完成');
}
```

### Promise 错误处理
```javascript
fetchData()
    .then(data => processData(data))
    .catch(error => {
        // 统一错误处理
        console.error('错误:', error);
        showErrorMessage(error.message);
    })
    .finally(() => {
        // 清理工作
        hideLoading();
    });
```

## 开始学习

```bash
# 进入项目目录
cd 03-javascript-advanced

# 选择一个项目开始
cd weather-app

# 使用浏览器打开 index.html
```

## 学习资源

- [MDN - Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN - async/await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN - Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)
- [ES6 入门教程](https://es6.ruanyifeng.com/)

## 推荐 API

### 免费公开 API
- [OpenWeatherMap](https://openweathermap.org/api) - 天气数据
- [Unsplash API](https://unsplash.com/developers) - 高质量图片
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - 测试 API
- [CoinGecko](https://www.coingecko.com/en/api) - 加密货币数据
- [TheMealDB](https://www.themealdb.com/api.php) - 食谱数据

## 最佳实践

### 1. 错误处理
```javascript
// ✅ 好的做法
async function fetchUser(id) {
    try {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) throw new Error('用户不存在');
        return await response.json();
    } catch (error) {
        console.error('获取用户失败:', error);
        return null; // 返回默认值
    }
}

// ❌ 不好的做法
async function fetchUser(id) {
    const response = await fetch(`/api/users/${id}`);
    return await response.json(); // 没有错误处理
}
```

### 2. 避免回调地狱
```javascript
// ❌ 回调地狱
getData(function(a) {
    getMoreData(a, function(b) {
        getMoreData(b, function(c) {
            console.log(c);
        });
    });
});

// ✅ 使用 async/await
async function processData() {
    const a = await getData();
    const b = await getMoreData(a);
    const c = await getMoreData(b);
    console.log(c);
}
```

### 3. 并发请求
```javascript
// 并发执行（更快）
const [user, posts, comments] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments()
]);

// 串行执行（较慢）
const user = await fetchUser();
const posts = await fetchPosts();
const comments = await fetchComments();
```

## 调试技巧

```javascript
// 1. 使用 console.table
console.table(users);

// 2. 使用 console.time
console.time('fetchData');
await fetchData();
console.timeEnd('fetchData');

// 3. 使用 debugger
function processData(data) {
    debugger; // 在这里暂停
    return data.map(item => item * 2);
}

// 4. 使用 Chrome DevTools
// Network 面板查看请求
// Console 面板调试
// Sources 面板断点
```

## 项目扩展建议

1. **添加 Loading 状态**
2. **实现缓存机制**
3. **添加重试逻辑**
4. **优化性能（防抖、节流）**
5. **添加单元测试**

## 下一步

完成这些项目后，你将准备好学习：
- 前端框架（React、Vue）
- TypeScript
- 前端工程化工具

---

💡 **提示**：异步编程是 JavaScript 的核心，多多练习 Promise 和 async/await！

