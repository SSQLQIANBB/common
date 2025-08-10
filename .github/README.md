# GitHub Actions 自动发布配置

本项目配置了 GitHub Actions 工作流，实现提交到 main 分支时自动构建和发布到 NPM。

## 🚀 工作流说明

### 触发条件
- 推送到 `main` 分支
- 忽略以下文件的变更：
  - `*.md` 文件
  - `.gitignore`
  - `LICENSE`
  - `.github/**`
  - `example/**`

### 执行步骤
1. **检出代码** - 获取最新代码
2. **设置环境** - 配置 Node.js 18 和 pnpm 8
3. **安装依赖** - 使用 pnpm 安装项目依赖
4. **构建项目** - 执行 TypeScript 编译和 Vite 构建
5. **生成类型** - 生成 TypeScript 类型声明文件
6. **版本管理** - 自动检查并更新版本号
7. **发布到 NPM** - 自动发布到 npm 仓库
8. **创建 Release** - 在 GitHub 上创建发布版本

## ⚙️ 环境变量配置

### 必需的环境变量

在 GitHub 仓库的 Settings → Secrets and variables → Actions 中添加以下密钥：

#### `NPM_TOKEN`
- **获取方式**: 在 [npmjs.com](https://www.npmjs.com/) 登录后，进入 Profile → Access Tokens
- **权限**: 选择 "Automation" 类型，确保有发布权限
- **用途**: 用于自动发布包到 NPM

### 自动提供的环境变量

- `GITHUB_TOKEN` - GitHub 自动提供，用于创建 Release

## 🔧 手动发布命令

如果需要在本地手动发布，可以使用以下命令：

```bash
# 增加 patch 版本并发布
pnpm publish:patch

# 增加 minor 版本并发布  
pnpm publish:minor

# 增加 major 版本并发布
pnpm publish:major

# 仅更新版本号
pnpm version:patch
pnpm version:minor
pnpm version:major
```

## 📋 版本管理规则

- **首次发布**: 使用 `package.json` 中的初始版本
- **后续发布**: 如果本地版本与 NPM 版本相同，自动增加 patch 版本
- **版本格式**: 遵循语义化版本 (SemVer) 规范

## 🚨 注意事项

1. **权限检查**: 确保 GitHub Actions 有足够的权限访问仓库
2. **NPM 权限**: 确保 NPM_TOKEN 有发布 `@sycsq/common` 包的权限
3. **版本冲突**: 避免手动修改版本号，让工作流自动管理
4. **构建失败**: 如果构建失败，检查依赖和构建配置

## 🔍 故障排除

### 常见问题

1. **构建失败**
   - 检查 `pnpm install` 是否成功
   - 验证 TypeScript 配置
   - 检查 Vite 构建配置

2. **发布失败**
   - 验证 NPM_TOKEN 是否正确
   - 检查包名是否可用
   - 确认版本号是否冲突

3. **权限问题**
   - 检查 GitHub Actions 权限设置
   - 验证 NPM 账户权限

### 查看日志

在 GitHub 仓库的 Actions 标签页中查看工作流执行日志，定位具体问题。

## 📚 相关链接

- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [NPM 发布指南](https://docs.npmjs.com/cli/v8/commands/npm-publish)
- [语义化版本](https://semver.org/) 