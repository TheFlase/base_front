# 阶段2：JavaScript 基础

## 学习目标

- 掌握 JavaScript 基础语法
- 理解 DOM 操作
- 熟练使用事件处理
- 学会数组和对象操作
- 掌握本地存储（LocalStorage）
- 理解函数和作用域

## 项目列表

### 1. 计算器应用（calculator）
**难度**：⭐⭐  
**学习要点**：
- DOM 元素选择和操作
- 事件监听（click 事件）
- JavaScript 基本运算
- 字符串和数字转换
- 错误处理

**功能特性**：
- 基本运算（加减乘除）
- 小数点计算
- 清除和删除功能
- 键盘输入支持
- 结果显示

### 2. 待办事项列表（todo-list）
**难度**：⭐⭐⭐  
**学习要点**：
- 数组操作（增删改查）
- LocalStorage 数据持久化
- 动态 DOM 创建和删除
- 事件委托
- 状态管理

**功能特性**：
- 添加待办事项
- 标记完成/未完成
- 删除事项
- 编辑事项
- 过滤显示（全部/活动/已完成）
- 数据本地存储

### 3. 交互式问答游戏（interactive-quiz）
**难度**：⭐⭐  
**学习要点**：
- 对象和数组的使用
- 条件判断
- 计时器（setTimeout/setInterval）
- 页面状态切换
- 分数计算

**功能特性**：
- 多选题问答
- 答案验证
- 分数统计
- 进度显示
- 结果页面
- 重新开始功能

## 开始学习

```bash
# 进入项目目录
cd 02-javascript-basics

# 选择一个项目开始
cd calculator

# 使用浏览器打开 index.html
# 或使用 VSCode 的 Live Server 插件
```

## 学习时间建议

- 全职学习：3-4 周
- 业余学习：2-3 个月
- 每天学习时间：2-4 小时

## JavaScript 核心概念

### 1. 变量和数据类型
```javascript
// 变量声明
let name = "张三";        // 字符串
const age = 25;           // 数字（常量）
var isStudent = true;     // 布尔值

// 数据类型
let arr = [1, 2, 3];      // 数组
let obj = {key: "value"}; // 对象
let nothing = null;       // 空值
let notDefined;           // undefined
```

### 2. 函数
```javascript
// 函数声明
function greet(name) {
    return `你好, ${name}!`;
}

// 箭头函数
const add = (a, b) => a + b;
```

### 3. DOM 操作
```javascript
// 选择元素
const element = document.querySelector('.class');
const elements = document.querySelectorAll('.class');

// 修改内容
element.textContent = "新内容";
element.innerHTML = "<strong>HTML内容</strong>";

// 修改样式
element.style.color = "red";
element.classList.add('active');
```

### 4. 事件处理
```javascript
// 添加事件监听
button.addEventListener('click', function() {
    console.log('按钮被点击了！');
});

// 事件委托
parent.addEventListener('click', (e) => {
    if (e.target.matches('.child')) {
        // 处理子元素点击
    }
});
```

### 5. LocalStorage
```javascript
// 保存数据
localStorage.setItem('key', 'value');
localStorage.setItem('user', JSON.stringify({name: '张三'}));

// 读取数据
const value = localStorage.getItem('key');
const user = JSON.parse(localStorage.getItem('user'));

// 删除数据
localStorage.removeItem('key');
localStorage.clear(); // 清空所有
```

## 学习资源

- [MDN JavaScript 教程](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
- [JavaScript.info](https://zh.javascript.info/)
- [FreeCodeCamp JavaScript](https://www.freecodecamp.org/chinese/learn)
- [JavaScript30](https://javascript30.com/)（30个练习项目）

## 调试技巧

### Chrome DevTools
```javascript
// 1. Console 输出
console.log('调试信息');
console.table([{name: '张三'}, {name: '李四'}]);
console.error('错误信息');

// 2. 断点调试
debugger; // 在这里暂停

// 3. 查看变量
console.dir(element); // 查看对象详情
```

### 常见错误
- `Uncaught TypeError`: 类型错误，检查变量类型
- `Uncaught ReferenceError`: 变量未定义
- `Uncaught SyntaxError`: 语法错误

## 项目扩展建议

完成基础项目后，可以尝试：

1. **计算器增强**
   - 添加科学计算功能
   - 添加历史记录
   - 支持括号运算

2. **待办事项增强**
   - 添加截止日期
   - 添加优先级标记
   - 支持分类标签
   - 添加搜索功能

3. **问答游戏增强**
   - 添加倒计时
   - 添加难度选择
   - 添加排行榜
   - 支持多种题型

## 最佳实践

1. **代码组织**
   - 使用有意义的变量名
   - 添加注释说明
   - 函数保持简短

2. **错误处理**
   - 验证用户输入
   - 使用 try-catch 捕获错误
   - 提供友好的错误提示

3. **性能优化**
   - 避免在循环中操作 DOM
   - 使用事件委托
   - 合理使用缓存

4. **可维护性**
   - 模块化代码
   - 避免全局变量污染
   - 使用常量管理配置

## 下一步

完成这些项目后，你将准备好学习：
- JavaScript 进阶（ES6+）
- 异步编程（Promise、async/await）
- 前端框架（React、Vue）

---

💡 **记住**：JavaScript 的核心是练习。不要只看代码，一定要亲自动手写！

