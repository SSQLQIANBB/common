# @sycsq/common

中文 | [English](#english)

`@sycsq/common` 是一个基于 TypeScript 和 Vite 构建的通用工具库，提供 Axios 请求封装、请求辅助函数、请求取消管理和常用类型判断工具。

## 特性

- TypeScript 类型声明
- 基于 Axios 的 HTTP 客户端封装
- 支持请求/响应转换钩子
- 支持重复请求取消、时间戳参数、日期参数格式化
- 支持 ESM 和 UMD 构建产物
- 包含 Vitest 单元测试和 GitHub Actions 自动化检查

## 环境要求

- Node.js `^20.19.0 || >=22.12.0`
- pnpm `>= 7`

## 安装

```bash
npm install @sycsq/common
```

```bash
yarn add @sycsq/common
```

```bash
pnpm add @sycsq/common
```

## 快速开始

### 按需引入

推荐在业务项目中优先使用子路径引入，避免因为根入口同时暴露 HTTP 和工具函数而让打包器分析更多模块：

```typescript
import { isEmpty, isString } from '@sycsq/common/utils';
import { http } from '@sycsq/common/http';
import { joinTimestamp } from '@sycsq/common/http/helper';
```

包本身已配置 `sideEffects: false`，并提供独立的 ESM/CJS 子路径产物。`axios` 会作为外部运行时依赖处理，库构建不会把 Axios 打进产物。

### HTTP 请求

```typescript
import { http } from '@sycsq/common';

const users = await http.get('/api/users', {
  params: { page: 1 }
});

const created = await http.post('/api/users', {
  name: 'Alice'
});
```

也可以使用配置对象形式：

```typescript
import { request } from '@sycsq/common';

const result = await request({
  url: '/api/users',
  method: 'GET',
  params: { page: 1 }
});
```

### 工具函数

```typescript
import { isEmpty, isString, isUrl } from '@sycsq/common';

isString('hello'); // true
isEmpty({}); // true
isUrl('https://example.com'); // true
```

## 导出内容

根入口会继续导出全部公共 API，兼容已有用法：

```typescript
import {
  Axios,
  AxiosCanceler,
  axiosTransform,
  http,
  request,
  isString,
  isEmpty,
  joinTimestamp,
  setObjToUrlParams
} from '@sycsq/common';
```

## HTTP API

### 默认实例

```typescript
import { http, request } from '@sycsq/common';
```

- `http`：默认 Axios 封装实例
- `request`：`http.request.bind(http)` 的快捷导出

### 请求方法

每个方法都支持配置对象形式；常用方法也支持 URL 优先形式。

```typescript
http.request<T>(config, options?)
http.get<T>(config, options?)
http.get<T>(url, config?, options?)
http.post<T>(config, options?)
http.post<T>(url, data?, config?, options?)
http.put<T>(config, options?)
http.put<T>(url, data?, config?, options?)
http.delete<T>(config, options?)
http.delete<T>(url, config?, options?)
http.patch<T>(config, options?)
http.patch<T>(url, data?, config?, options?)
```

### 创建自定义实例

```typescript
import { Axios, ContentTypeEnum, axiosTransform } from '@sycsq/common';

const api = new Axios({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': ContentTypeEnum.JSON
  },
  transform: axiosTransform,
  requestOptions: {
    joinPrefix: false,
    isReturnNativeResponse: false,
    isTransformResponse: true,
    joinParamsToUrl: false,
    formatDate: true,
    apiUrl: '',
    urlPrefix: '',
    joinTime: true,
    ignoreCancelToken: true,
    withToken: true
  }
});
```

### RequestOptions

```typescript
interface RequestOptions {
  joinParamsToUrl?: boolean;
  formatDate?: boolean;
  isTransformResponse?: boolean;
  isReturnNativeResponse?: boolean;
  joinPrefix?: boolean;
  apiUrl?: string;
  urlPrefix?: string;
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  withToken?: boolean;
  errorHandler?: ErrorHandler;
  errorFactory?: ErrorFactory;
}

interface RequestErrorContext<T = any> {
  code?: string;
  message: string;
  response?: AxiosResponse<Result<T>>;
  responseData?: Result<T>;
  options: RequestOptions;
}

type ErrorHandler<T = any> = (
  message: string,
  context: RequestErrorContext<T>
) => void | Error;

type ErrorFactory<T = any> = (
  message: string,
  context: RequestErrorContext<T>
) => Error;
```

### 响应转换规则

默认 `axiosTransform` 会根据业务响应结构处理数据：

- `isReturnNativeResponse: true`：返回完整 Axios 响应
- `isTransformResponse: false`：返回 `response.data`
- 成功业务码 `200` 或 `202`：返回 `data`，如果 `data` 为 `undefined` 则返回 `body`
- 失败业务码：先调用 `errorHandler(message, context)`；如果返回 `Error`，直接抛出；否则调用 `errorFactory(message, context)` 创建异常；如果都未配置，则抛出默认 `Error`

### 自定义异常处理

业务错误和网络错误建议分开处理：

- 业务错误：后端正常响应，但 `code` 不是成功码，使用 `errorHandler` 或 `errorFactory`
- 网络错误：请求失败、超时、Axios adapter 或拦截器异常，使用 `requestCatchHook` 或 `responseInterceptorsCatch`

全局异常工厂示例：

```typescript
import { Axios, axiosTransform } from '@sycsq/common';

class ApiError extends Error {
  constructor(
    message: string,
    public code?: string,
    public detail?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const api = new Axios({
  transform: {
    ...axiosTransform,
    requestCatchHook(error) {
      return Promise.reject(new ApiError(error.message, 'NETWORK_ERROR', error));
    }
  },
  requestOptions: {
    isTransformResponse: true,
    errorHandler(message, context) {
      console.warn('[business error]', context.code, message);
    },
    errorFactory(message, context) {
      return new ApiError(message, context.code, context.responseData);
    }
  }
});
```

单次请求覆盖示例：

```typescript
await api.get('/users', undefined, {
  errorHandler(message, context) {
    return new ApiError(`Scoped handler: ${message}`, `SCOPED_${context.code}`);
  }
});
```

兼容旧用法：只传 `errorHandler(message)` 仍然有效；如果不返回 `Error`，库会继续抛出默认异常或 `errorFactory` 生成的异常。

### 辅助函数

```typescript
joinTimestamp(join, restful)
formatRequestDate(params)
setObjToUrlParams(baseUrl, obj)
```

### 请求取消

```typescript
import { AxiosCanceler } from '@sycsq/common';

const canceler = new AxiosCanceler();

canceler.addPending(config);
canceler.removePending(config);
canceler.removeAllPending();
canceler.reset();
```

## 工具函数 API

### 类型判断

- `is(val, type)`
- `isString(val)`
- `isNumber(val)`
- `isBoolean(val)`
- `isObject(val)`
- `isArray(val)`
- `isFunction(val)`
- `isDate(val)`
- `isPromise(val)`
- `isRegExp(val)`
- `isSymbol(val)`

### 值判断

- `isDef(val)`
- `isUnDef(val)`
- `isNull(val)`
- `isNullAndUnDef(val)`
- `isNullOrUnDef(val)`
- `isEmpty(val)`

### 环境与 DOM 判断

- `isServer`
- `isClient`
- `isWindow(val)`
- `isElement(val)`
- `isUrl(path)`

## 开发

```bash
pnpm install
```

```bash
pnpm test
```

```bash
pnpm build
```

```bash
pnpm build:types
```

## 示例项目

仓库包含一个 Vue 示例项目：

```bash
pnpm example:dev
pnpm example:build
pnpm example:preview
```

示例项目位于 `example/`，通过 `workspace:*` 引用当前仓库源码。它覆盖：

- GET 请求与 POST 请求
- URL-first 和配置对象两种请求写法
- 成功业务响应解包
- 全局 `errorFactory` 自定义异常
- 单次请求 `errorHandler` 覆盖异常
- `requestCatchHook` 处理网络异常
- `isString`、`isEmpty`、`isUrl` 等工具函数

示例使用 Axios `adapter` mock 数据，不依赖真实后端接口。

## 自动化

项目包含两个 GitHub Actions 工作流：

- `CI`：在 pull request 和 `main` 分支 push 时执行 `pnpm install --frozen-lockfile`、`pnpm test` 和 `pnpm build`
- `Publish Package`：在 `main` 分支相关源码变更或手动触发时执行测试、构建、npm 发布和 GitHub Release 创建

发布到 npm 需要在仓库的 `Settings -> Secrets and variables -> Actions` 中配置：

- `NPM_TOKEN`：npm automation token，需要具备发布 `@sycsq/common` 的权限

## 构建体积策略

- 多入口构建：`index`、`http`、`utils` 和细粒度 HTTP 子模块分别输出
- 依赖外部化：`axios` 不会被打入库产物，避免宿主项目重复打包
- 移除额外运行时依赖：form-urlencoded 序列化由轻量内置实现完成
- 禁用 public 目录复制，npm 包只包含运行所需文件
- 使用 ESM + CJS 双格式，并通过 `exports` 暴露子路径入口

## 项目结构

```text
.
├── .github/workflows/      # GitHub Actions workflows
├── example/                # Vue example
├── packages/               # Source code
│   ├── http/               # HTTP wrapper and helpers
│   ├── utils/              # Utility functions
│   └── index.ts            # Package entry
├── tests/                  # Unit tests
├── types/                  # Generated declaration files
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── vite.config.ts
```

## 许可证

MIT

---

## English

`@sycsq/common` is a TypeScript utility library built with Vite. It provides an Axios-based HTTP wrapper, request helpers, request cancellation management, and common type guard utilities.

## Features

- TypeScript declaration files
- Axios-based HTTP client wrapper
- Request and response transform hooks
- Duplicate request cancellation, timestamp parameters, and date parameter formatting
- ESM and UMD build outputs
- Vitest unit tests and GitHub Actions automation

## Requirements

- Node.js `^20.19.0 || >=22.12.0`
- pnpm `>= 7`

## Installation

```bash
npm install @sycsq/common
```

```bash
yarn add @sycsq/common
```

```bash
pnpm add @sycsq/common
```

## Quick Start

### On-demand Imports

Prefer subpath imports in application projects so bundlers only need to analyze the module family you actually use:

```typescript
import { isEmpty, isString } from '@sycsq/common/utils';
import { http } from '@sycsq/common/http';
import { joinTimestamp } from '@sycsq/common/http/helper';
```

The package is marked with `sideEffects: false` and ships independent ESM/CJS subpath outputs. `axios` is treated as an external runtime dependency, so it is not bundled into the library output.

### HTTP Requests

```typescript
import { http } from '@sycsq/common';

const users = await http.get('/api/users', {
  params: { page: 1 }
});

const created = await http.post('/api/users', {
  name: 'Alice'
});
```

You can also use the config-object form:

```typescript
import { request } from '@sycsq/common';

const result = await request({
  url: '/api/users',
  method: 'GET',
  params: { page: 1 }
});
```

### Utility Functions

```typescript
import { isEmpty, isString, isUrl } from '@sycsq/common';

isString('hello'); // true
isEmpty({}); // true
isUrl('https://example.com'); // true
```

## Exports

The root entry still re-exports every public API for backward compatibility:

```typescript
import {
  Axios,
  AxiosCanceler,
  axiosTransform,
  http,
  request,
  isString,
  isEmpty,
  joinTimestamp,
  setObjToUrlParams
} from '@sycsq/common';
```

## HTTP API

### Default Instance

```typescript
import { http, request } from '@sycsq/common';
```

- `http`: default wrapped Axios instance
- `request`: shortcut for `http.request.bind(http)`

### Request Methods

Every method supports the config-object form. Common methods also support the URL-first form.

```typescript
http.request<T>(config, options?)
http.get<T>(config, options?)
http.get<T>(url, config?, options?)
http.post<T>(config, options?)
http.post<T>(url, data?, config?, options?)
http.put<T>(config, options?)
http.put<T>(url, data?, config?, options?)
http.delete<T>(config, options?)
http.delete<T>(url, config?, options?)
http.patch<T>(config, options?)
http.patch<T>(url, data?, config?, options?)
```

### Custom Instance

```typescript
import { Axios, ContentTypeEnum, axiosTransform } from '@sycsq/common';

const api = new Axios({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': ContentTypeEnum.JSON
  },
  transform: axiosTransform,
  requestOptions: {
    joinPrefix: false,
    isReturnNativeResponse: false,
    isTransformResponse: true,
    joinParamsToUrl: false,
    formatDate: true,
    apiUrl: '',
    urlPrefix: '',
    joinTime: true,
    ignoreCancelToken: true,
    withToken: true
  }
});
```

### RequestOptions

```typescript
interface RequestOptions {
  joinParamsToUrl?: boolean;
  formatDate?: boolean;
  isTransformResponse?: boolean;
  isReturnNativeResponse?: boolean;
  joinPrefix?: boolean;
  apiUrl?: string;
  urlPrefix?: string;
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  withToken?: boolean;
  errorHandler?: ErrorHandler;
  errorFactory?: ErrorFactory;
}

interface RequestErrorContext<T = any> {
  code?: string;
  message: string;
  response?: AxiosResponse<Result<T>>;
  responseData?: Result<T>;
  options: RequestOptions;
}

type ErrorHandler<T = any> = (
  message: string,
  context: RequestErrorContext<T>
) => void | Error;

type ErrorFactory<T = any> = (
  message: string,
  context: RequestErrorContext<T>
) => Error;
```

### Response Transform Behavior

The default `axiosTransform` processes business responses as follows:

- `isReturnNativeResponse: true`: returns the full Axios response
- `isTransformResponse: false`: returns `response.data`
- Success codes `200` or `202`: returns `data`; if `data` is `undefined`, returns `body`
- Failed business codes: calls `errorHandler(message, context)` first. If it returns an `Error`, that error is thrown. Otherwise `errorFactory(message, context)` is used to create the error. If neither is configured, a default `Error` is thrown.

### Custom Error Handling

Handle business errors and network errors separately:

- Business errors: the server responds successfully, but `code` is not a success code. Use `errorHandler` or `errorFactory`.
- Network errors: request failures, timeouts, Axios adapter errors, or interceptor errors. Use `requestCatchHook` or `responseInterceptorsCatch`.

Global error factory example:

```typescript
import { Axios, axiosTransform } from '@sycsq/common';

class ApiError extends Error {
  constructor(
    message: string,
    public code?: string,
    public detail?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const api = new Axios({
  transform: {
    ...axiosTransform,
    requestCatchHook(error) {
      return Promise.reject(new ApiError(error.message, 'NETWORK_ERROR', error));
    }
  },
  requestOptions: {
    isTransformResponse: true,
    errorHandler(message, context) {
      console.warn('[business error]', context.code, message);
    },
    errorFactory(message, context) {
      return new ApiError(message, context.code, context.responseData);
    }
  }
});
```

Per-request override example:

```typescript
await api.get('/users', undefined, {
  errorHandler(message, context) {
    return new ApiError(`Scoped handler: ${message}`, `SCOPED_${context.code}`);
  }
});
```

The old style `errorHandler(message)` remains compatible. If the handler does not return an `Error`, the wrapper will continue by throwing the default error or the error from `errorFactory`.

### Helpers

```typescript
joinTimestamp(join, restful)
formatRequestDate(params)
setObjToUrlParams(baseUrl, obj)
```

### Request Cancellation

```typescript
import { AxiosCanceler } from '@sycsq/common';

const canceler = new AxiosCanceler();

canceler.addPending(config);
canceler.removePending(config);
canceler.removeAllPending();
canceler.reset();
```

## Utility API

### Type Guards

- `is(val, type)`
- `isString(val)`
- `isNumber(val)`
- `isBoolean(val)`
- `isObject(val)`
- `isArray(val)`
- `isFunction(val)`
- `isDate(val)`
- `isPromise(val)`
- `isRegExp(val)`
- `isSymbol(val)`

### Value Guards

- `isDef(val)`
- `isUnDef(val)`
- `isNull(val)`
- `isNullAndUnDef(val)`
- `isNullOrUnDef(val)`
- `isEmpty(val)`

### Environment and DOM Guards

- `isServer`
- `isClient`
- `isWindow(val)`
- `isElement(val)`
- `isUrl(path)`

## Development

```bash
pnpm install
```

```bash
pnpm test
```

```bash
pnpm build
```

```bash
pnpm build:types
```

## Example Project

The repository includes a Vue example project:

```bash
pnpm example:dev
pnpm example:build
pnpm example:preview
```

The example project is located in `example/` and references the local package through `workspace:*`. It covers:

- GET and POST requests
- URL-first and config-object request styles
- Successful business response unwrapping
- Global custom errors through `errorFactory`
- Per-request custom errors through `errorHandler`
- Network error handling through `requestCatchHook`
- Utility functions such as `isString`, `isEmpty`, and `isUrl`

The example uses an Axios `adapter` to mock data, so it does not require a real backend API.

## Automation

This project includes two GitHub Actions workflows:

- `CI`: runs `pnpm install --frozen-lockfile`, `pnpm test`, and `pnpm build` on pull requests and pushes to `main`
- `Publish Package`: runs tests, builds the package, publishes to npm, and creates a GitHub Release on relevant `main` branch changes or manual dispatch

Publishing to npm requires this repository secret under `Settings -> Secrets and variables -> Actions`:

- `NPM_TOKEN`: an npm automation token with permission to publish `@sycsq/common`

## Bundle Size Strategy

- Multi-entry build: `index`, `http`, `utils`, and fine-grained HTTP submodules are emitted separately
- Externalized dependency: `axios` is not bundled into the package output, preventing duplicate vendor code in host projects
- Removed extra runtime dependency: form-urlencoded serialization uses a lightweight internal implementation
- Public asset copying is disabled, so the npm package only includes runtime files
- ESM and CJS outputs are both exposed through package `exports`

## Project Structure

```text
.
├── .github/workflows/      # GitHub Actions workflows
├── example/                # Vue example
├── packages/               # Source code
│   ├── http/               # HTTP wrapper and helpers
│   ├── utils/              # Utility functions
│   └── index.ts            # Package entry
├── tests/                  # Unit tests
├── types/                  # Generated declaration files
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── vite.config.ts
```

## License

MIT
