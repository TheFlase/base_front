# 个人简历页面项目

## 项目简介

这是一个现代化的个人简历网页，使用纯 HTML 和 CSS 构建。该项目适合前端初学者学习 HTML5 语义化标签、CSS3 样式、Flexbox 布局和响应式设计。

## 学习目标

通过完成这个项目，你将学会：

1. ✅ HTML5 语义化标签的正确使用
2. ✅ CSS 变量（Custom Properties）的使用
3. ✅ Flexbox 布局技术
4. ✅ CSS 动画和过渡效果
5. ✅ 响应式设计和媒体查询
6. ✅ 现代 CSS 命名规范

## 项目特性

- 🎨 现代化的设计风格
- 📱 完全响应式，支持各种设备
- ✨ 流畅的动画效果
- 🎯 清晰的信息层级
- 💼 专业的简历布局
- 🚀 纯静态页面，无需任何依赖

## 项目结构

```
personal-resume/
├── index.html          # 主 HTML 文件
├── style.css           # 样式文件
└── README.md           # 项目说明
```

## 如何使用

### 方法 1：直接打开
双击 `index.html` 文件，使用浏览器打开即可查看。

### 方法 2：使用 Live Server（推荐）
1. 在 VSCode 中安装 Live Server 插件
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"
4. 浏览器会自动打开并实时刷新

## 核心知识点讲解

### 1. HTML5 语义化标签

```html
<header>  <!-- 页头 -->
<main>    <!-- 主要内容 -->
<section> <!-- 章节 -->
<article> <!-- 独立内容 -->
<footer>  <!-- 页脚 -->
```

**为什么使用语义化标签？**
- 提高代码可读性
- 有利于 SEO
- 方便屏幕阅读器等辅助技术

### 2. CSS 变量

```css
:root {
    --primary-color: #2563eb;
    --spacing-md: 1.5rem;
}

.header {
    background-color: var(--primary-color);
    padding: var(--spacing-md);
}
```

**优势：**
- 统一管理主题颜色
- 易于维护和修改
- 支持 JavaScript 动态修改

### 3. Flexbox 布局

```css
.profile {
    display: flex;
    align-items: center;
    gap: 2rem;
}
```

**常用属性：**
- `display: flex` - 启用 Flexbox
- `align-items` - 交叉轴对齐
- `justify-content` - 主轴对齐
- `gap` - 项目间距

### 4. 渐变背景

```css
background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
```

### 5. CSS 动画

```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.section {
    animation: fadeInUp 0.6s ease;
}
```

### 6. 响应式设计

```css
@media (max-width: 768px) {
    .profile {
        flex-direction: column;
    }
}
```

## 自定义指南

### 修改个人信息

在 `index.html` 中找到对应的部分：

```html
<h1 class="name">你的名字</h1>
<p class="title">你的职位</p>
```

### 修改主题颜色

在 `style.css` 的 `:root` 中修改颜色变量：

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
}
```

### 添加头像

替换头像 URL：

```html
<img src="你的头像URL或本地路径" alt="头像">
```

## 扩展练习

完成基础项目后，尝试以下扩展：

1. **深色模式**
   - 添加深色主题切换按钮
   - 使用 JavaScript 切换 CSS 类

2. **打印样式**
   - 添加 `@media print` 样式
   - 优化打印效果

3. **添加动画效果**
   - 技能条动画加载
   - 滚动触发动画

4. **添加图标**
   - 使用 Font Awesome 或其他图标库
   - 替换 emoji 图标

5. **多语言支持**
   - 添加语言切换功能
   - 准备中英文两个版本

## 常见问题

### Q: 头像不显示怎么办？
A: 可以使用本地图片或在线图片服务（如 Unsplash）。

### Q: 如何让页面居中？
A: 使用 `.container` 类，它已经设置了 `max-width` 和 `margin: 0 auto`。

### Q: 响应式设计在哪些设备上测试？
A: 建议测试以下尺寸：
- 桌面：1920px、1440px、1024px
- 平板：768px、834px
- 手机：375px、414px

## 浏览器兼容性

- ✅ Chrome (推荐)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ IE 11（需要添加 polyfills）

## 学习资源

- [MDN - HTML 教程](https://developer.mozilla.org/zh-CN/docs/Web/HTML)
- [MDN - CSS 教程](https://developer.mozilla.org/zh-CN/docs/Web/CSS)
- [CSS-Tricks - Flexbox 指南](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Can I Use](https://caniuse.com/) - 检查浏览器兼容性

## 下一步

完成这个项目后，你可以继续学习：

1. 响应式布局练习项目
2. JavaScript 基础项目
3. 使用 JavaScript 增强简历功能

---

💡 **提示**：不要只是复制代码，要理解每一行代码的作用。尝试修改样式，看看会发生什么变化！

