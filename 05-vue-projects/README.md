# 阶段5：Vue 框架项目

## 学习目标

- 掌握 Vue 3 核心概念
- 熟练使用 Composition API
- 理解响应式原理
- 掌握 Vue Router 和 Pinia 状态管理
- 学会组件通信
- 理解 Vue 生命周期

## 项目列表

### 1. 博客系统（blog-system）
**难度**：⭐⭐⭐⭐  
**技术栈**：Vue 3 + Vite + Vue Router + Pinia + Markdown  
**学习要点**：
- Composition API
- 动态路由
- Markdown 渲染
- 文章分类和标签
- 评论系统
- 搜索功能

**功能特性**：
- 文章列表和详情
- Markdown 编辑器
- 分类和标签管理
- 评论功能
- 搜索和筛选
- 用户中心

### 2. 音乐播放器（music-player）
**难度**：⭐⭐⭐  
**技术栈**：Vue 3 + Audio API + Pinia  
**学习要点**：
- Audio API 使用
- 状态管理
- 动画效果
- 歌词同步
- 播放列表
- 自定义指令

**功能特性**：
- 音乐播放控制
- 播放列表管理
- 歌词滚动显示
- 进度条控制
- 音量调节
- 播放模式切换

### 3. 任务管理系统（task-management）
**难度**：⭐⭐⭐  
**技术栈**：Vue 3 + Element Plus + Vuex/Pinia  
**学习要点**：
- 拖拽功能
- 看板视图
- 筛选排序
- 团队协作
- 权限管理
- 实时更新

**功能特性**：
- 任务看板（Kanban）
- 任务拖拽排序
- 任务分配
- 优先级管理
- 截止日期提醒
- 团队协作

## 环境准备

### 创建 Vue 项目

```bash
# 使用 Vite（推荐）
npm create vite@latest my-vue-app -- --template vue
cd my-vue-app
npm install
npm run dev

# 或使用 Vue CLI
npm install -g @vue/cli
vue create my-vue-app
cd my-vue-app
npm run serve
```

## Vue 3 核心概念

### 1. 组件基础

```vue
<template>
    <div class="greeting">
        <h1>{{ message }}</h1>
        <button @click="handleClick">点击</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('你好，Vue 3！');

function handleClick() {
    message.value = '按钮被点击了！';
}
</script>

<style scoped>
.greeting {
    color: blue;
}
</style>
```

### 2. 响应式数据

```javascript
import { ref, reactive, computed, watch } from 'vue';

// ref - 基本类型
const count = ref(0);
count.value++; // 修改值

// reactive - 对象类型
const state = reactive({
    name: '张三',
    age: 25
});
state.age++; // 直接修改

// computed - 计算属性
const doubleCount = computed(() => count.value * 2);

// watch - 侦听器
watch(count, (newValue, oldValue) => {
    console.log(`count 从 ${oldValue} 变为 ${newValue}`);
});
```

### 3. 生命周期钩子

```javascript
import { onMounted, onUpdated, onUnmounted } from 'vue';

onMounted(() => {
    console.log('组件已挂载');
});

onUpdated(() => {
    console.log('组件已更新');
});

onUnmounted(() => {
    console.log('组件已卸载');
});
```

### 4. Props 和 Emit

```vue
<!-- 父组件 -->
<template>
    <ChildComponent
        :message="parentMessage"
        @custom-event="handleEvent"
    />
</template>

<script setup>
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

const parentMessage = ref('来自父组件的消息');

function handleEvent(data) {
    console.log('收到子组件事件:', data);
}
</script>

<!-- 子组件 -->
<template>
    <div>
        <p>{{ message }}</p>
        <button @click="sendEvent">发送事件</button>
    </div>
</template>

<script setup>
const props = defineProps({
    message: String
});

const emit = defineEmits(['custom-event']);

function sendEvent() {
    emit('custom-event', '子组件的数据');
}
</script>
```

### 5. v-model 双向绑定

```vue
<template>
    <input v-model="text" />
    <p>{{ text }}</p>
    
    <!-- 自定义组件使用 v-model -->
    <CustomInput v-model="text" />
</template>

<script setup>
import { ref } from 'vue';

const text = ref('');
</script>
```

### 6. 条件渲染

```vue
<template>
    <div v-if="isVisible">显示的内容</div>
    <div v-else>隐藏时显示这个</div>
    
    <!-- v-show: 切换 display -->
    <div v-show="isVisible">使用 v-show</div>
</template>
```

### 7. 列表渲染

```vue
<template>
    <ul>
        <li v-for="item in items" :key="item.id">
            {{ item.name }}
        </li>
    </ul>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([
    { id: 1, name: '项目1' },
    { id: 2, name: '项目2' },
    { id: 3, name: '项目3' }
]);
</script>
```

### 8. 插槽（Slots）

```vue
<!-- 父组件 -->
<template>
    <Card>
        <template #header>
            <h2>标题</h2>
        </template>
        
        <p>主要内容</p>
        
        <template #footer>
            <button>确定</button>
        </template>
    </Card>
</template>

<!-- Card 组件 -->
<template>
    <div class="card">
        <div class="header">
            <slot name="header"></slot>
        </div>
        <div class="body">
            <slot></slot>
        </div>
        <div class="footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
```

## Vue Router

```javascript
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/about',
            name: 'About',
            component: About
        },
        {
            path: '/user/:id',
            name: 'User',
            component: () => import('./views/User.vue') // 懒加载
        }
    ]
});

export default router;
```

### 路由导航

```vue
<template>
    <!-- 声明式导航 -->
    <router-link to="/">首页</router-link>
    <router-link to="/about">关于</router-link>
    
    <!-- 路由视图 -->
    <router-view />
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// 编程式导航
function goToAbout() {
    router.push('/about');
    // router.push({ name: 'About' });
}

// 获取路由参数
const userId = route.params.id;
</script>
```

## Pinia 状态管理

```javascript
// stores/counter.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
    state: () => ({
        count: 0
    }),
    
    getters: {
        doubleCount: (state) => state.count * 2
    },
    
    actions: {
        increment() {
            this.count++;
        },
        
        async fetchData() {
            const data = await fetch('/api/data');
            this.count = data.count;
        }
    }
});

// 在组件中使用
import { useCounterStore } from '@/stores/counter';

const counter = useCounterStore();
counter.increment();
console.log(counter.count);
console.log(counter.doubleCount);
```

## Composition API

### setup 函数

```vue
<script>
export default {
    setup() {
        const count = ref(0);
        
        function increment() {
            count.value++;
        }
        
        return {
            count,
            increment
        };
    }
};
</script>
```

### script setup（推荐）

```vue
<script setup>
import { ref } from 'vue';

const count = ref(0);

function increment() {
    count.value++;
}

// 自动暴露给模板
</script>
```

### 自定义 Composables

```javascript
// composables/useCounter.js
import { ref, computed } from 'vue';

export function useCounter(initialValue = 0) {
    const count = ref(initialValue);
    const doubleCount = computed(() => count.value * 2);
    
    function increment() {
        count.value++;
    }
    
    function decrement() {
        count.value--;
    }
    
    return {
        count,
        doubleCount,
        increment,
        decrement
    };
}

// 在组件中使用
import { useCounter } from '@/composables/useCounter';

const { count, doubleCount, increment } = useCounter(10);
```

## 学习时间建议

- 全职学习：2-3 个月
- 业余学习：4-6 个月
- 每天学习时间：3-5 小时

## 学习资源

- [Vue 3 官方文档](https://cn.vuejs.org/)
- [Vue Router 文档](https://router.vuejs.org/zh/)
- [Pinia 文档](https://pinia.vuejs.org/zh/)
- [Vite 文档](https://cn.vitejs.dev/)
- [Element Plus](https://element-plus.org/zh-CN/)

## 推荐工具和库

### UI 组件库
- Element Plus
- Ant Design Vue
- Naive UI
- Vuetify

### 工具库
- VueUse（Composition API 工具集）
- Axios（HTTP 请求）
- Day.js（日期处理）
- Lodash-es（工具函数）

### 开发工具
- Vite（构建工具）
- Vue DevTools（调试工具）
- ESLint + Prettier（代码规范）

## 项目结构示例

```
src/
├── assets/          # 静态资源
├── components/      # 通用组件
│   ├── common/
│   └── business/
├── views/           # 页面组件
├── router/          # 路由配置
├── stores/          # Pinia stores
├── composables/     # 组合式函数
├── utils/           # 工具函数
├── api/             # API 调用
├── styles/          # 全局样式
├── App.vue          # 根组件
└── main.js          # 入口文件
```

## Vue 3 vs Vue 2

| 特性 | Vue 2 | Vue 3 |
|------|-------|-------|
| API 风格 | Options API | Composition API |
| 响应式 | Object.defineProperty | Proxy |
| 性能 | 较好 | 更快 |
| TypeScript | 支持有限 | 完美支持 |
| 包大小 | 较大 | 更小 |
| Fragment | 不支持 | 支持 |
| Teleport | 不支持 | 支持 |

## 最佳实践

1. **使用 Composition API**：更好的代码组织
2. **使用 `<script setup>`**：更简洁的语法
3. **合理使用 ref 和 reactive**
4. **提取可复用逻辑到 composables**
5. **使用 TypeScript**：类型安全
6. **按功能组织代码**：而非文件类型

## 下一步

完成这些项目后，你将准备好学习：
- Nuxt.js（Vue SSR 框架）
- TypeScript + Vue
- 微前端架构
- 移动端开发（Uni-app）

---

💡 **提示**：Vue 3 的 Composition API 让代码更易于组织和复用，多多实践！

