// ==================== 全局变量 ====================
let todos = [];
let currentFilter = 'all';
let editingId = null;

// DOM 元素
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const emptyState = document.getElementById('emptyState');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const totalCount = document.getElementById('totalCount');
const activeCount = document.getElementById('activeCount');
const completedCount = document.getElementById('completedCount');

// ==================== 初始化 ====================
function init() {
    loadTodos();
    render();
    attachEventListeners();
    console.log('待办事项应用已加载！');
}

// ==================== 事件监听 ====================
function attachEventListeners() {
    // 添加按钮
    addBtn.addEventListener('click', addTodo);
    
    // 输入框回车键
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
    // 过滤按钮
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentFilter = btn.dataset.filter;
            
            // 更新按钮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            render();
        });
    });
    
    // 清除已完成
    clearCompletedBtn.addEventListener('click', clearCompleted);
    
    // 清空全部
    clearAllBtn.addEventListener('click', clearAll);
    
    // 事件委托 - 处理列表项的点击事件
    todoList.addEventListener('click', handleTodoClick);
}

// ==================== 添加待办事项 ====================
function addTodo() {
    const text = todoInput.value.trim();
    
    // 验证输入
    if (!text) {
        todoInput.classList.add('shake');
        setTimeout(() => todoInput.classList.remove('shake'), 300);
        return;
    }
    
    // 创建新的待办事项
    const todo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    // 添加到数组开头
    todos.unshift(todo);
    
    // 清空输入框
    todoInput.value = '';
    
    // 保存并渲染
    saveTodos();
    render();
    
    console.log('添加待办事项:', todo);
}

// ==================== 处理待办事项点击 ====================
function handleTodoClick(e) {
    const todoItem = e.target.closest('.todo-item');
    if (!todoItem) return;
    
    const todoId = parseInt(todoItem.dataset.id);
    
    // 点击复选框
    if (e.target.classList.contains('todo-checkbox')) {
        toggleTodo(todoId);
    }
    
    // 点击编辑按钮
    if (e.target.closest('.btn-edit')) {
        startEdit(todoId);
    }
    
    // 点击删除按钮
    if (e.target.closest('.btn-delete')) {
        deleteTodo(todoId);
    }
    
    // 点击保存按钮
    if (e.target.closest('.btn-save')) {
        saveEdit(todoId);
    }
    
    // 点击取消按钮
    if (e.target.closest('.btn-cancel')) {
        cancelEdit();
    }
}

// ==================== 切换完成状态 ====================
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        render();
        console.log('切换状态:', todo);
    }
}

// ==================== 开始编辑 ====================
function startEdit(id) {
    editingId = id;
    render();
    
    // 聚焦到编辑输入框
    const editInput = document.querySelector(`[data-id="${id}"] .todo-input-edit`);
    if (editInput) {
        editInput.focus();
        editInput.select();
        
        // 按回车保存
        editInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveEdit(id);
            }
        });
        
        // 按 Esc 取消
        editInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                cancelEdit();
            }
        });
    }
}

// ==================== 保存编辑 ====================
function saveEdit(id) {
    const editInput = document.querySelector(`[data-id="${id}"] .todo-input-edit`);
    if (!editInput) return;
    
    const newText = editInput.value.trim();
    
    // 验证输入
    if (!newText) {
        editInput.classList.add('shake');
        setTimeout(() => editInput.classList.remove('shake'), 300);
        return;
    }
    
    // 更新文本
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.text = newText;
        editingId = null;
        saveTodos();
        render();
        console.log('更新待办事项:', todo);
    }
}

// ==================== 取消编辑 ====================
function cancelEdit() {
    editingId = null;
    render();
}

// ==================== 删除待办事项 ====================
function deleteTodo(id) {
    // 添加删除动画
    const todoItem = document.querySelector(`[data-id="${id}"]`);
    if (todoItem) {
        todoItem.classList.add('removing');
        
        setTimeout(() => {
            todos = todos.filter(t => t.id !== id);
            saveTodos();
            render();
            console.log('删除待办事项:', id);
        }, 300);
    }
}

// ==================== 清除已完成 ====================
function clearCompleted() {
    if (!todos.some(t => t.completed)) return;
    
    if (confirm('确定要清除所有已完成的待办事项吗？')) {
        todos = todos.filter(t => !t.completed);
        saveTodos();
        render();
        console.log('清除已完成的待办事项');
    }
}

// ==================== 清空全部 ====================
function clearAll() {
    if (todos.length === 0) return;
    
    if (confirm('确定要清空所有待办事项吗？此操作不可恢复！')) {
        todos = [];
        saveTodos();
        render();
        console.log('清空所有待办事项');
    }
}

// ==================== 渲染 ====================
function render() {
    // 过滤待办事项
    const filteredTodos = getFilteredTodos();
    
    // 更新统计
    updateStats();
    
    // 更新按钮状态
    updateButtons();
    
    // 如果没有待办事项，显示空状态
    if (filteredTodos.length === 0) {
        todoList.innerHTML = '';
        emptyState.classList.add('show');
        return;
    }
    
    emptyState.classList.remove('show');
    
    // 渲染列表
    todoList.innerHTML = filteredTodos.map(todo => createTodoHTML(todo)).join('');
}

// ==================== 获取过滤后的待办事项 ====================
function getFilteredTodos() {
    switch (currentFilter) {
        case 'active':
            return todos.filter(t => !t.completed);
        case 'completed':
            return todos.filter(t => t.completed);
        default:
            return todos;
    }
}

// ==================== 创建待办事项 HTML ====================
function createTodoHTML(todo) {
    const isEditing = editingId === todo.id;
    
    return `
        <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
            <div class="todo-checkbox"></div>
            <div class="todo-content">
                ${isEditing ? `
                    <input 
                        type="text" 
                        class="todo-input-edit" 
                        value="${escapeHtml(todo.text)}"
                    >
                ` : `
                    <span class="todo-text">${escapeHtml(todo.text)}</span>
                `}
            </div>
            <div class="todo-actions">
                ${isEditing ? `
                    <button class="btn-action btn-save" title="保存">✓</button>
                    <button class="btn-action btn-cancel" title="取消">✕</button>
                ` : `
                    <button class="btn-action btn-edit" title="编辑">✎</button>
                    <button class="btn-action btn-delete" title="删除">🗑</button>
                `}
            </div>
        </li>
    `;
}

// ==================== 转义 HTML ====================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==================== 更新统计 ====================
function updateStats() {
    const total = todos.length;
    const active = todos.filter(t => !t.completed).length;
    const completed = todos.filter(t => t.completed).length;
    
    totalCount.textContent = total;
    activeCount.textContent = active;
    completedCount.textContent = completed;
}

// ==================== 更新按钮状态 ====================
function updateButtons() {
    const hasCompleted = todos.some(t => t.completed);
    const hasAny = todos.length > 0;
    
    clearCompletedBtn.disabled = !hasCompleted;
    clearAllBtn.disabled = !hasAny;
}

// ==================== LocalStorage 操作 ====================
// 保存到 LocalStorage
function saveTodos() {
    try {
        localStorage.setItem('todos', JSON.stringify(todos));
        console.log('数据已保存到 LocalStorage');
    } catch (e) {
        console.error('保存失败:', e);
        alert('保存失败，请检查浏览器存储设置');
    }
}

// 从 LocalStorage 加载
function loadTodos() {
    try {
        const stored = localStorage.getItem('todos');
        if (stored) {
            todos = JSON.parse(stored);
            console.log('从 LocalStorage 加载了', todos.length, '个待办事项');
        }
    } catch (e) {
        console.error('加载失败:', e);
        todos = [];
    }
}

// ==================== 工具函数 ====================
// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    // 一分钟内
    if (diff < 60000) {
        return '刚刚';
    }
    
    // 一小时内
    if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000);
        return `${minutes}分钟前`;
    }
    
    // 一天内
    if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `${hours}小时前`;
    }
    
    // 格式化日期
    return date.toLocaleDateString('zh-CN', {
        month: 'short',
        day: 'numeric'
    });
}

// ==================== 导出数据（额外功能） ====================
function exportTodos() {
    const dataStr = JSON.stringify(todos, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `todos-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    console.log('数据已导出');
}

// ==================== 导入数据（额外功能） ====================
function importTodos(jsonData) {
    try {
        const imported = JSON.parse(jsonData);
        if (Array.isArray(imported)) {
            todos = imported;
            saveTodos();
            render();
            console.log('数据已导入');
        }
    } catch (e) {
        console.error('导入失败:', e);
        alert('导入失败，请检查文件格式');
    }
}

// ==================== 键盘快捷键 ====================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K: 聚焦到输入框
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        todoInput.focus();
    }
    
    // Ctrl/Cmd + D: 清除已完成
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        clearCompleted();
    }
});

// ==================== 启动应用 ====================
init();

// 暴露到全局（用于控制台调试）
window.TodoApp = {
    todos,
    exportTodos,
    importTodos,
    render
};

console.log('💡 提示：');
console.log('- 使用 TodoApp.exportTodos() 导出数据');
console.log('- 使用 Ctrl/Cmd + K 快速聚焦输入框');
console.log('- 使用 Ctrl/Cmd + D 清除已完成');

