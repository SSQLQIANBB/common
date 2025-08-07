# Personal Utils

一个基于 Rollup/Vite 构建的 TypeScript 工具库，支持完整的类型声明。

## 项目结构

```
personal-utils/
├── packages/           # 源代码
│   ├── index.ts       # 主入口文件
│   └── http/          # HTTP 工具模块
├── lib/               # 构建输出（包含类型声明）
│   ├── index.d.ts     # 主类型声明文件
│   ├── http.d.ts      # HTTP 模块类型声明
│   ├── index.esm.js   # ES 模块格式
│   └── index.umd.js   # UMD 格式
├── example/           # Vue 3 示例项目
├── pnpm-workspace.yaml # pnpm workspace 配置
└── package.json       # 根目录配置
```

## 开发环境

本项目使用 pnpm workspace 模式管理多包项目。

### 安装依赖

```bash
pnpm install
```

### 构建库

```bash
pnpm build
```

### 仅构建类型声明

```bash
pnpm build:types
```

### 开发模式

```bash
pnpm dev
```

## 示例项目

### 启动示例项目

```bash
# 一键设置（推荐）
pnpm example:setup

# 或者分步执行
pnpm example:install  # 安装示例项目依赖
pnpm example:dev      # 启动示例开发服务器
```

### 示例项目脚本

```bash
pnpm example:dev      # 启动开发服务器
pnpm example:build    # 构建生产版本
pnpm example:preview  # 预览构建结果
```

## 库的使用

### 安装

```bash
npm install personal-utils
```

### 使用示例

```typescript
import { http } from 'personal-utils';

const result = http();
console.log(result); // { a: 100 }
```

### TypeScript 支持

本库提供完整的 TypeScript 类型支持：

```typescript
import { http } from 'personal-utils';

// 完整的类型提示和检查
const result: { a: number } = http();
```

## 开发工作流

1. 修改 `packages/` 目录下的源代码
2. 运行 `pnpm build` 构建库和类型声明
3. 在示例项目中测试功能
4. 提交代码

## 技术栈

- **构建工具**: Vite (基于 Rollup)
- **语言**: TypeScript
- **包管理**: pnpm workspace
- **示例框架**: Vue 3 + TypeScript
- **类型支持**: 完整的 TypeScript 类型声明
