# @sycsq/common Vue Example

这是一个基于 Vue 3 + Vite 的示例项目，用来演示如何在业务项目中使用 `@sycsq/common`。

## 运行

在仓库根目录执行：

```bash
pnpm example:dev
pnpm example:build
pnpm example:preview
```

也可以进入 `example` 目录执行：

```bash
cd example
pnpm dev
pnpm build
pnpm preview
```

如果修改了根目录 `packages` 下的库代码，先在仓库根目录重新构建：

```bash
pnpm build
```

## 示例内容

`App.vue` 中包含这些用法：

- `http.get`/`Axios#get` 的 GET 请求示例
- `Axios#post(url, data, config, options)` 的 URL-first 写法
- `axiosTransform` 成功响应解包
- `requestOptions.errorFactory` 全局创建自定义异常
- 单次请求通过 `errorHandler` 返回自定义异常
- `requestCatchHook` 处理网络或 Axios 异常
- `isString`、`isEmpty`、`isUrl` 等工具函数调用

示例使用 `Axios` 的 `adapter` mock 响应，不依赖真实后端接口。

## 自定义异常处理

业务失败响应会先调用 `errorHandler(message, context)`。如果该函数返回 `Error` 实例，则直接抛出这个异常；如果没有返回异常，则继续使用 `errorFactory(message, context)` 创建异常；如果两者都没有提供，则抛出默认 `Error`。

```ts
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
  transform: axiosTransform,
  requestOptions: {
    isTransformResponse: true,
    errorFactory(message, context) {
      return new ApiError(message, context.code, context.responseData);
    }
  }
});
```

单次请求也可以覆盖：

```ts
await api.get('/users', undefined, {
  errorHandler(message, context) {
    return new ApiError(message, `REQUEST_${context.code}`);
  }
});
```

网络错误、超时、Axios 拦截器错误建议放在 `requestCatchHook` 或 `responseInterceptorsCatch` 中处理。
