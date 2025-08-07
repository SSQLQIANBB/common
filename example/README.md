# Personal Utils Example

这是一个演示如何使用 `personal-utils` 库的 Vue 3 示例项目。

## 功能

- 演示如何导入和使用 `personal-utils` 库中的函数
- 展示 HTTP 工具函数的使用方法
- 提供交互式的测试界面

## 运行示例

### 使用 pnpm workspace（推荐）

```bash
# 在项目根目录下
pnpm example:setup    # 一键设置（安装依赖 + 构建库 + 启动开发服务器）
pnpm example:dev      # 启动开发服务器
pnpm example:build    # 构建生产版本
pnpm example:preview  # 预览构建结果
```

### 直接在 example 目录下运行

```bash
cd example
pnpm dev    # 启动开发服务器
pnpm build  # 构建生产版本
pnpm preview # 预览构建结果
```

## 项目结构

```
example/
├── index.html          # HTML 入口文件
├── main.ts             # TypeScript 入口文件
├── App.vue             # Vue 主组件
├── package.json        # 项目依赖配置（使用 workspace:* 引用）
├── vite.config.ts      # Vite 构建配置
├── tsconfig.json       # TypeScript 配置
└── tsconfig.node.json  # Node.js TypeScript 配置
```

## 使用说明

1. 示例项目通过 `workspace:*` 引用根目录的 `personal-utils` 库
2. 在 `App.vue` 中可以看到如何导入和使用库中的函数
3. 点击 "Test HTTP Function" 按钮可以测试 HTTP 工具函数
4. 结果会显示在页面上，同时也会在浏览器控制台输出

## 开发

如果你修改了根目录的库代码，需要重新构建库：

```bash
# 在项目根目录下
pnpm build
```

然后刷新示例页面即可看到更新。

## Workspace 优势

使用 pnpm workspace 模式的优势：

- **自动链接**: 无需手动管理本地依赖
- **版本同步**: 确保使用最新的本地库版本
- **依赖共享**: 避免重复安装相同的依赖
- **开发效率**: 支持热重载和实时更新
