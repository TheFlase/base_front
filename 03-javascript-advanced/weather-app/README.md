# 天气预报应用

## 项目简介

一个功能完整的天气预报应用，使用 OpenWeatherMap API 获取实时天气数据。项目展示了异步编程、API 调用、错误处理等核心技能。

## 功能特性

- 🌤️ 实时天气查询
- 🔍 城市搜索
- 📍 地理位置自动定位
- 🌡️ 温度单位切换（℃/℉）
- 📅 5天天气预报
- 🎨 动态天气图标
- 💾 最近搜索历史

## 学习要点

1. ✅ Fetch API 使用
2. ✅ async/await 异步编程
3. ✅ Promise 错误处理
4. ✅ Geolocation API
5. ✅ JSON 数据处理
6. ✅ API 密钥管理
7. ✅ 环境变量使用

## 如何使用

### 1. 获取 API 密钥

1. 访问 [OpenWeatherMap](https://openweathermap.org/api)
2. 注册账号并获取免费 API 密钥
3. 在项目中使用你的 API 密钥

### 2. 运行项目

```javascript
// 在 script.js 中替换你的 API 密钥
const API_KEY = '你的API密钥';
```

## 核心代码示例

### 获取天气数据
```javascript
async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=zh_cn`
        );
        
        if (!response.ok) {
            throw new Error('城市不存在');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('获取天气失败:', error);
        throw error;
    }
}
```

### 使用地理位置
```javascript
function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('浏览器不支持地理位置'));
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            position => resolve(position),
            error => reject(error)
        );
    });
}
```

## API 文档

### OpenWeatherMap API

**当前天气：**
```
GET https://api.openweathermap.org/data/2.5/weather
参数：
  - q: 城市名称（如：Beijing）
  - appid: API 密钥
  - units: metric（公制）或 imperial（英制）
  - lang: zh_cn（中文）
```

**5天预报：**
```
GET https://api.openweathermap.org/data/2.5/forecast
```

## 注意事项

⚠️ **API 限制**：
- 免费版每分钟最多 60 次请求
- 免费版数据更新频率：每 10 分钟

⚠️ **安全性**：
- 不要将 API 密钥直接提交到 GitHub
- 使用环境变量存储密钥
- 生产环境使用后端代理

## 扩展练习

1. 添加天气预警功能
2. 显示日出日落时间
3. 添加空气质量指数
4. 支持多城市对比
5. 添加天气动画背景

---

💡 **提示**：学习如何阅读 API 文档是非常重要的技能！

