# Personal Utils

一个基于 Vite 构建的 TypeScript 工具库，提供 HTTP 请求封装和常用工具函数，支持完整的类型声明。

## ✨ 特性

- 🚀 基于 Vite 构建，支持 ES Module 和 UMD 格式
- 📦 完整的 TypeScript 类型支持
- 🔧 封装的 HTTP 请求工具，基于 Axios
- 🛠️ 丰富的工具函数集合
- 📱 支持浏览器和 Node.js 环境
- 🎯 零配置，开箱即用

## 📦 安装

```bash
npm install @sycsq/common
# 或
yarn add @sycsq/common
# 或
pnpm add @sycsq/common
```

## 🚀 快速开始

### HTTP 工具使用

```typescript
import { http } from '@sycsq/common';

// GET 请求
const getData = async () => {
  try {
    const response = await http.get('/api/users');
    console.log(response.data);
  } catch (error) {
    console.error('请求失败:', error);
  }
};

// POST 请求
const createUser = async (userData: any) => {
  try {
    const response = await http.post('/api/users', userData);
    console.log('用户创建成功:', response.data);
  } catch (error) {
    console.error('创建失败:', error);
  }
};
```

### 工具函数使用

```typescript
import { isString, isEmpty, isUrl } from '@sycsq/common';

// 类型检查
console.log(isString('hello')); // true
console.log(isString(123)); // false

// 空值检查
console.log(isEmpty('')); // true
console.log(isEmpty([])); // true
console.log(isEmpty({})); // true

// URL 验证
console.log(isUrl('https://example.com')); // true
console.log(isUrl('not-a-url')); // false
```

## 📚 API 文档

### HTTP 模块

#### 配置选项

```typescript
interface RequestOptions {
  joinPrefix?: boolean; // 是否添加 URL 前缀
  isReturnNativeResponse?: boolean; // 是否返回原生响应
  isTransformResponse?: boolean; // 是否转换响应数据
  joinParamsToUrl?: boolean; // POST 请求是否将参数添加到 URL
  formatDate?: boolean; // 是否格式化日期参数
  apiUrl?: string; // API 基础地址
  urlPrefix?: string; // URL 前缀
  joinTime?: boolean; // 是否添加时间戳
  ignoreCancelToken?: boolean; // 是否忽略重复请求
  withToken?: boolean; // 是否携带 Token
}
```

#### 请求方法

- `http.get(url, config?)` - GET 请求
- `http.post(url, data?, config?)` - POST 请求
- `http.put(url, data?, config?)` - PUT 请求
- `http.delete(url, config?)` - DELETE 请求
- `http.patch(url, data?, config?)` - PATCH 请求

### 工具函数模块

#### 类型检查函数

- `is(val, type)` - 检查值是否为指定类型
- `isString(val)` - 检查是否为字符串
- `isNumber(val)` - 检查是否为数字
- `isBoolean(val)` - 检查是否为布尔值
- `isObject(val)` - 检查是否为对象
- `isArray(val)` - 检查是否为数组
- `isFunction(val)` - 检查是否为函数
- `isDate(val)` - 检查是否为日期
- `isPromise(val)` - 检查是否为 Promise
- `isRegExp(val)` - 检查是否为正则表达式

#### 值检查函数

- `isDef(val)` - 检查是否已定义
- `isUnDef(val)` - 检查是否未定义
- `isNull(val)` - 检查是否为 null
- `isEmpty(val)` - 检查是否为空值
- `isNullOrUnDef(val)` - 检查是否为 null 或 undefined

#### 环境检查函数

- `isServer` - 是否为服务端环境
- `isClient` - 是否为客户端环境
- `isWindow(val)` - 检查是否为 Window 对象
- `isElement(val)` - 检查是否为 DOM 元素
- `isUrl(path)` - 检查是否为有效 URL

## 🏗️ 项目结构

```
personal-utils/
├── packages/                    # 源代码
│   ├── index.ts               # 主入口文件
│   ├── http/                  # HTTP 工具模块
│   │   ├── Axios.ts          # Axios 封装类
│   │   ├── axiosTransform.ts # 请求/响应转换器
│   │   ├── axiosCancel.ts    # 请求取消处理
│   │   ├── helper.ts         # 辅助函数
│   │   ├── types.ts          # 类型定义
│   │   └── index.ts          # HTTP 模块入口
│   └── utils/                # 工具函数模块
│       └── index.ts          # 工具函数集合
├── lib/                       # 构建输出
│   ├── index.esm.js          # ES 模块格式
│   ├── index.umd.js          # UMD 格式
│   └── index.d.ts            # 类型声明
├── types/                     # 类型声明文件
├── example/                   # Vue 3 示例项目
├── pnpm-workspace.yaml       # pnpm workspace 配置
└── package.json               # 项目配置
```

## 🛠️ 开发

### 环境要求

- Node.js >= 16
- pnpm >= 7

### 安装依赖

```bash
pnpm install
```

### 开发命令

```bash
# 构建库
pnpm build

# 仅构建类型声明
pnpm build:types

# 开发模式
pnpm dev

# 启动示例项目
pnpm example:dev

# 一键设置（推荐）
pnpm example:setup
```

### 示例项目

项目包含一个完整的 Vue 3 示例，展示如何使用库中的功能：

```bash
# 启动示例项目
pnpm example:dev

# 构建示例项目
pnpm example:build

# 预览构建结果
pnpm example:preview
```

## 📝 类型支持

本库提供完整的 TypeScript 类型支持，包括：

- 所有工具函数的类型定义
- HTTP 请求配置的类型定义
- 响应数据的类型定义
- 完整的 IntelliSense 支持

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🔗 相关链接

- [Vite](https://vitejs.dev/) - 构建工具
- [Axios](https://axios-http.com/) - HTTP 客户端
- [TypeScript](https://www.typescriptlang.org/) - 编程语言
