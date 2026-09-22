# 待办事项列表项目

## 项目简介

这是一个功能完整的待办事项管理应用，使用原生 JavaScript 构建。项目展示了 DOM 操作、事件处理、LocalStorage 数据持久化、状态管理等核心 JavaScript 技能。

## 学习目标

通过这个项目，你将学会：

1. ✅ 数组的增删改查操作
2. ✅ LocalStorage 数据持久化
3. ✅ 动态 DOM 创建和操作
4. ✅ 事件委托模式
5. ✅ 简单的状态管理
6. ✅ 用户输入验证
7. ✅ 条件渲染
8. ✅ 数据过滤和统计

## 项目特性

- ✨ **完整的 CRUD 操作**：添加、查看、编辑、删除
- 💾 **数据持久化**：使用 LocalStorage 保存数据
- 🎯 **状态管理**：完成/未完成状态切换
- 🔍 **过滤功能**：按状态筛选显示
- 📊 **实时统计**：显示总数、活动、已完成数量
- ⌨️ **键盘支持**：快捷键操作
- 📱 **响应式设计**：完美适配移动端
- 🎨 **现代化 UI**：流畅的动画效果

## 项目结构

```
todo-list/
├── index.html          # 主 HTML 文件
├── style.css           # 样式文件
├── script.js           # JavaScript 逻辑
└── README.md           # 项目说明
```

## 如何使用

### 基本操作
1. **添加**：在输入框输入内容，点击"添加"或按 Enter
2. **完成**：点击待办事项左侧的复选框
3. **编辑**：点击编辑图标（✎），修改后点击保存（✓）
4. **删除**：点击删除图标（🗑）
5. **过滤**：点击"全部"、"活动"、"已完成"按钮
6. **清除**：清除已完成或清空全部

### 键盘快捷键
- `Enter` - 添加待办事项
- `Ctrl/Cmd + K` - 快速聚焦到输入框
- `Ctrl/Cmd + D` - 清除已完成
- `Escape` - 取消编辑

## 核心知识点详解

### 1. 数据结构

```javascript
const todo = {
    id: 1234567890,              // 唯一标识
    text: "学习 JavaScript",     // 待办内容
    completed: false,            // 完成状态
    createdAt: "2025-01-01"      // 创建时间
};

let todos = []; // 待办事项数组
```

### 2. LocalStorage 操作

```javascript
// 保存数据
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// 读取数据
function loadTodos() {
    const stored = localStorage.getItem('todos');
    if (stored) {
        todos = JSON.parse(stored);
    }
}
```

**注意事项：**
- LocalStorage 只能存储字符串
- 需要使用 JSON.stringify() 和 JSON.parse()
- 有容量限制（通常 5-10MB）
- 同步操作，大量数据可能影响性能

### 3. 数组操作

```javascript
// 添加（添加到开头）
todos.unshift(newTodo);

// 删除
todos = todos.filter(t => t.id !== idToDelete);

// 更新
const todo = todos.find(t => t.id === idToUpdate);
todo.text = "新内容";

// 过滤
const activeTodos = todos.filter(t => !t.completed);
```

### 4. 事件委托

```javascript
// 在父元素上监听事件
todoList.addEventListener('click', (e) => {
    // 找到最近的待办事项元素
    const todoItem = e.target.closest('.todo-item');
    if (!todoItem) return;
    
    // 根据点击的元素执行不同操作
    if (e.target.classList.contains('btn-delete')) {
        deleteTodo(todoItem.dataset.id);
    }
});
```

**优势：**
- 减少事件监听器数量
- 支持动态添加的元素
- 提高性能

### 5. 动态 DOM 创建

```javascript
// 方法1：模板字符串（推荐）
function createTodoHTML(todo) {
    return `
        <li class="todo-item" data-id="${todo.id}">
            <span>${todo.text}</span>
        </li>
    `;
}

// 方法2：createElement（更安全）
function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = todo.id;
    li.textContent = todo.text;
    return li;
}
```

### 6. 状态管理

```javascript
let currentFilter = 'all';     // 当前过滤器
let editingId = null;          // 正在编辑的 ID

// 根据状态渲染不同内容
function render() {
    const filteredTodos = getFilteredTodos();
    // ... 渲染逻辑
}
```

### 7. 数据验证

```javascript
function addTodo() {
    const text = todoInput.value.trim();
    
    // 验证空输入
    if (!text) {
        // 显示错误提示
        return;
    }
    
    // 继续处理...
}
```

### 8. HTML 转义（安全性）

```javascript
// 防止 XSS 攻击
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 使用
`<span>${escapeHtml(todo.text)}</span>`
```

## 代码架构

### 模块化组织

```javascript
// 1. 全局变量
let todos = [];

// 2. 初始化
function init() { }

// 3. 事件处理
function attachEventListeners() { }

// 4. CRUD 操作
function addTodo() { }
function deleteTodo() { }
function updateTodo() { }

// 5. 渲染
function render() { }

// 6. 工具函数
function formatDate() { }
```

## 常见问题

### Q: 为什么刷新页面数据还在？
A: 使用了 LocalStorage 持久化存储，数据保存在浏览器本地。

### Q: 如何清除所有数据？
A: 
```javascript
// 方法1：使用清空按钮
// 方法2：控制台执行
localStorage.removeItem('todos');
```

### Q: 数据存储有大小限制吗？
A: 是的，LocalStorage 通常限制在 5-10MB。对于待办事项这类应用完全够用。

### Q: 如何备份数据？
A: 在控制台执行：
```javascript
TodoApp.exportTodos(); // 下载 JSON 文件
```

### Q: 支持多用户吗？
A: 当前版本不支持。每个浏览器/设备的数据是独立的。

## 扩展练习

### 初级扩展
1. **添加时间戳显示**
   - 显示创建时间
   - 显示修改时间

2. **添加优先级**
   - 高、中、低三个级别
   - 不同颜色标识

3. **搜索功能**
   - 按关键字搜索
   - 实时过滤

### 中级扩展
1. **分类标签**
   - 添加标签系统
   - 按标签分类

2. **截止日期**
   - 设置到期时间
   - 过期提醒

3. **拖拽排序**
   - 使用 HTML5 Drag API
   - 手动排序

4. **数据统计图表**
   - 完成率图表
   - 每日完成趋势

### 高级扩展
1. **云端同步**
   - 使用 Firebase 或其他后端
   - 多设备同步

2. **协作功能**
   - 多人共享列表
   - 任务分配

3. **PWA 支持**
   - 离线访问
   - 桌面安装

4. **撤销/重做**
   - 实现操作历史栈
   - 支持撤销和重做

## 调试技巧

### Chrome DevTools

```javascript
// 1. 查看数据
console.table(todos);

// 2. 查看 LocalStorage
// Application -> Local Storage -> 你的域名

// 3. 监控变量变化
watch todos

// 4. 断点调试
debugger;
```

### 常见错误

**错误1：数据不保存**
```javascript
// 错误：忘记调用 saveTodos()
function addTodo() {
    todos.push(newTodo);
    render(); // ❌ 数据没保存
}

// 正确
function addTodo() {
    todos.push(newTodo);
    saveTodos(); // ✅
    render();
}
```

**错误2：XSS 安全问题**
```javascript
// 危险：直接插入用户输入
innerHTML = `<span>${todo.text}</span>`; // ❌

// 安全：转义 HTML
innerHTML = `<span>${escapeHtml(todo.text)}</span>`; // ✅
```

**错误3：事件监听器重复添加**
```javascript
// 错误：每次渲染都添加
function render() {
    button.addEventListener('click', handler); // ❌
}

// 正确：使用事件委托或只添加一次
todoList.addEventListener('click', (e) => {
    if (e.target.matches('.btn-delete')) {
        // 处理删除
    }
}); // ✅
```

## 性能优化

### 1. 防抖输入
```javascript
let debounceTimer;
input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        // 执行搜索
    }, 300);
});
```

### 2. 虚拟滚动
- 对于大量数据（1000+条）
- 只渲染可见区域
- 使用第三方库如 `react-window`

### 3. 批量操作
```javascript
// 避免频繁 DOM 操作
// 使用 DocumentFragment
const fragment = document.createDocumentFragment();
todos.forEach(todo => {
    fragment.appendChild(createTodoElement(todo));
});
todoList.appendChild(fragment);
```

## 学习资源

- [MDN - Array 方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN - LocalStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)
- [JavaScript.info - 事件委托](https://zh.javascript.info/event-delegation)

## 下一步

完成这个项目后，建议：

1. 学习 ES6+ 新特性
2. 尝试使用 TypeScript 重写
3. 学习前端框架（React、Vue）
4. 了解状态管理库（Redux、MobX）

---

💡 **建议**：先独立完成基础功能，再查看代码。遇到问题先思考，再搜索！

🎯 **挑战**：尝试不看代码，从零开始实现这个待办事项应用！

