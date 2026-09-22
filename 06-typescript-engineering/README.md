# 阶段6：TypeScript + 工程化

## 学习目标

- 掌握 TypeScript 核心语法
- 理解类型系统
- 学会使用泛型
- 掌握前端工程化配置
- 理解模块化和打包
- 学会编写单元测试
- 掌握 CI/CD 基础

## 项目列表

### 1. 组件库开发（component-library）
**难度**：⭐⭐⭐⭐⭐  
**技术栈**：TypeScript + React/Vue + Storybook + Rollup  
**学习要点**：
- TypeScript 类型定义
- 组件设计原则
- 文档驱动开发
- 打包配置
- NPM 包发布
- 单元测试

**功能特性**：
- 通用组件封装
- TypeScript 类型导出
- 组件文档
- 主题定制
- 按需加载
- 单元测试覆盖

### 2. 全栈应用（fullstack-app）
**难度**：⭐⭐⭐⭐⭐  
**技术栈**：Next.js + TypeScript + Prisma + PostgreSQL  
**学习要点**：
- SSR/SSG
- API Routes
- 数据库设计
- 身份认证
- 部署上线
- SEO 优化

**功能特性**：
- 服务端渲染
- RESTful API
- 数据库 CRUD
- 用户认证
- 文件上传
- 生产部署

## TypeScript 核心语法

### 1. 基本类型

```typescript
// 基本类型
let isDone: boolean = false;
let count: number = 10;
let name: string = "张三";

// 数组
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

// 元组
let x: [string, number] = ["hello", 10];

// 枚举
enum Color {
    Red,
    Green,
    Blue
}
let c: Color = Color.Green;

// Any 和 Unknown
let notSure: any = 4;
let uncertain: unknown = 4;

// Void, Null, Undefined
function warnUser(): void {
    console.log("警告");
}

// Never
function error(message: string): never {
    throw new Error(message);
}
```

### 2. 接口（Interface）

```typescript
interface User {
    id: number;
    name: string;
    age?: number;          // 可选属性
    readonly email: string; // 只读属性
}

const user: User = {
    id: 1,
    name: "张三",
    email: "zhangsan@example.com"
};

// 函数接口
interface SearchFunc {
    (source: string, subString: string): boolean;
}

const mySearch: SearchFunc = (src, sub) => {
    return src.includes(sub);
};

// 可索引接口
interface StringArray {
    [index: number]: string;
}

const myArray: StringArray = ["Bob", "Fred"];
```

### 3. 类型别名（Type）

```typescript
type Point = {
    x: number;
    y: number;
};

type ID = number | string;

type UserWithAddress = User & {
    address: string;
};

// 联合类型
type Status = "pending" | "success" | "error";
let status: Status = "pending";
```

### 4. 泛型

```typescript
// 泛型函数
function identity<T>(arg: T): T {
    return arg;
}

let output1 = identity<string>("myString");
let output2 = identity(123); // 类型推断

// 泛型接口
interface GenericIdentityFn<T> {
    (arg: T): T;
}

// 泛型类
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

// 泛型约束
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```

### 5. 类（Class）

```typescript
class Animal {
    private name: string;          // 私有
    protected age: number;         // 受保护
    public species: string;        // 公共（默认）
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    
    move(distance: number = 0) {
        console.log(`${this.name} 移动了 ${distance}m`);
    }
}

class Dog extends Animal {
    bark() {
        console.log("汪汪汪!");
    }
}

// 抽象类
abstract class Department {
    abstract printName(): void;
    
    printMeeting(): void {
        console.log("开会中...");
    }
}
```

### 6. 函数

```typescript
// 函数类型
function add(x: number, y: number): number {
    return x + y;
}

// 可选参数和默认参数
function buildName(firstName: string, lastName?: string) {
    return lastName ? `${firstName} ${lastName}` : firstName;
}

function buildName2(firstName: string, lastName = "Smith") {
    return `${firstName} ${lastName}`;
}

// 剩余参数
function buildName3(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}

// 函数重载
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === "number") {
        return Number(x.toString().split("").reverse().join(""));
    } else {
        return x.split("").reverse().join("");
    }
}
```

### 7. 高级类型

```typescript
// 交叉类型
type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

// 类型守卫
function isString(test: any): test is string {
    return typeof test === "string";
}

// 映射类型
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Partial<T> = {
    [P in keyof T]?: T[P];
};

// 条件类型
type NonNullable<T> = T extends null | undefined ? never : T;

// Utility Types
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

### 8. 装饰器

```typescript
// 类装饰器
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
}

// 方法装饰器
function enumerable(value: boolean) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        descriptor.enumerable = value;
    };
}

class Greeter2 {
    @enumerable(false)
    greet() {
        return "Hello";
    }
}
```

## TypeScript 配置

### tsconfig.json

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "ESNext",
        "lib": ["ES2020", "DOM", "DOM.Iterable"],
        "jsx": "react-jsx",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "moduleResolution": "node",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"]
        }
    },
    "include": ["src"],
    "exclude": ["node_modules", "dist"]
}
```

## 前端工程化

### 1. 包管理器

```bash
# npm
npm install
npm run dev
npm run build

# pnpm（推荐，更快更省空间）
pnpm install
pnpm dev
pnpm build

# yarn
yarn
yarn dev
yarn build
```

### 2. 代码规范

**ESLint 配置：**
```javascript
// .eslintrc.js
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended'
    ],
    rules: {
        'no-console': 'warn',
        '@typescript-eslint/no-unused-vars': 'error'
    }
};
```

**Prettier 配置：**
```json
// .prettierrc
{
    "semi": true,
    "singleQuote": true,
    "tabWidth": 4,
    "trailingComma": "es5"
}
```

### 3. Git Hooks

**Husky + lint-staged：**
```json
// package.json
{
    "husky": {
        "hooks": {
            "pre-commit": "lint-staged"
        }
    },
    "lint-staged": {
        "*.{js,jsx,ts,tsx}": [
            "eslint --fix",
            "prettier --write"
        ]
    }
}
```

### 4. 单元测试

**Jest + Testing Library：**
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
    it('应该渲染按钮', () => {
        render(<Button>点击</Button>);
        expect(screen.getByText('点击')).toBeInTheDocument();
    });
    
    it('点击时应该调用回调', async () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>点击</Button>);
        
        await userEvent.click(screen.getByText('点击'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
```

### 5. CI/CD

**GitHub Actions 示例：**
```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
    build:
        runs-on: ubuntu-latest
        
        steps:
            - uses: actions/checkout@v2
            
            - name: Setup Node.js
              uses: actions/setup-node@v2
              with:
                  node-version: '18'
            
            - name: Install dependencies
              run: npm ci
            
            - name: Run tests
              run: npm test
            
            - name: Build
              run: npm run build
```

## 学习时间建议

- 全职学习：持续学习
- 业余学习：持续学习
- 这是一个需要持续精进的阶段

## 学习资源

- [TypeScript 官方文档](https://www.typescriptlang.org/zh/)
- [TypeScript 入门教程](https://ts.xcatliu.com/)
- [深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese/)
- [Jest 文档](https://jestjs.io/zh-Hans/)
- [Vite 文档](https://cn.vitejs.dev/)

## 推荐工具

- **构建工具**：Vite、Webpack、Rollup
- **测试工具**：Jest、Vitest、Cypress
- **文档工具**：Storybook、VitePress
- **代码质量**：ESLint、Prettier、Husky
- **部署平台**：Vercel、Netlify、Railway

## 项目结构（组件库示例）

```
component-library/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── styles/
│   └── index.ts
├── docs/
├── tests/
├── .storybook/
├── tsconfig.json
├── vite.config.ts
├── package.json
└── README.md
```

## 下一步

完成这些项目后，你已经具备了：
- 扎实的前端基础
- 框架开发能力
- 工程化思维
- 团队协作能力

可以继续深入：
- 性能优化
- 架构设计
- 开源贡献
- 技术分享

---

💡 **提示**：TypeScript 和工程化能力是高级前端工程师的必备技能！

🎉 **恭喜**：完成所有阶段后，你已经是一名合格的前端工程师了！

