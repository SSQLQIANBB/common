<template>
  <main class="app">
    <header class="page-header">
      <p class="eyebrow">@sycsq/common</p>
      <h1>Vue usage examples</h1>
    </header>

    <section class="demo-grid">
      <article
        v-for="demo in demos"
        :key="demo.key"
        class="demo-card"
      >
        <div>
          <h2>{{ demo.title }}</h2>
          <p>{{ demo.description }}</p>
        </div>

        <button
          class="demo-button"
          :disabled="loadingKey === demo.key"
          @click="demo.run"
        >
          {{ loadingKey === demo.key ? 'Running...' : 'Run' }}
        </button>

        <pre v-if="results[demo.key]">{{ formatResult(results[demo.key]) }}</pre>
      </article>
    </section>
  </main>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import {
    Axios,
    ContentTypeEnum,
    ResultEnum,
    axiosTransform,
    isEmpty,
    isString,
    isUrl
  } from '@sycsq/common';

  type DemoKey = 'get' | 'post' | 'businessError' | 'requestError' | 'utils';

  interface DemoItem {
    key: DemoKey;
    title: string;
    description: string;
    run: () => Promise<void> | void;
  }

  class ApiError extends Error {
    code?: string;
    detail?: unknown;

    constructor(message: string, code?: string, detail?: unknown) {
      super(message);
      this.name = 'ApiError';
      this.code = code;
      this.detail = detail;
    }
  }

  const loadingKey = ref<DemoKey | ''>('');
  const results = ref<Partial<Record<DemoKey, unknown>>>({});

  const sleep = (ms: number) => new Promise(resolve => window.setTimeout(resolve, ms));

  function makeResponse(config: any, data: unknown) {
    return {
      data,
      status: 200,
      statusText: 'OK',
      headers: {},
      config
    };
  }

  function parseRequestData(data: unknown) {
    if (typeof data !== 'string') return data;

    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  }

  const api = new Axios({
    timeout: 3000,
    headers: {
      'Content-Type': ContentTypeEnum.JSON
    },
    transform: {
      ...axiosTransform,
      requestCatchHook(error) {
        return Promise.reject(new ApiError(error.message, 'NETWORK_ERROR', error));
      }
    },
    requestOptions: {
      joinPrefix: false,
      isReturnNativeResponse: false,
      isTransformResponse: true,
      joinParamsToUrl: false,
      formatDate: true,
      joinTime: false,
      ignoreCancelToken: true,
      withToken: false,
      errorHandler(message, context) {
        console.warn('[global business error]', context.code, message);
      },
      errorFactory(message, context) {
        return new ApiError(message, context.code, context.responseData);
      }
    },
    async adapter(config: any) {
      await sleep(250);

      const url = String(config.url || '');

      if (url === '/users') {
        return makeResponse(config, {
          code: ResultEnum.SUCCESS,
          data: {
            list: [
              { id: 1, name: 'Alice' },
              { id: 2, name: 'Bob' }
            ],
            params: config.params
          }
        });
      }

      if (url === '/users/create') {
        return makeResponse(config, {
          code: ResultEnum.SUCCESS,
          data: {
            id: 3,
            ...parseRequestData(config.data)
          }
        });
      }

      if (url === '/business-error') {
        return makeResponse(config, {
          code: ResultEnum.ERROR,
          message: 'User name already exists',
          data: { field: 'name' }
        });
      }

      throw new Error('Mock network disconnected');
    }
  });

  async function runDemo(key: DemoKey, task: () => Promise<unknown>) {
    loadingKey.value = key;

    try {
      results.value[key] = await task();
    } catch (error) {
      results.value[key] =
        error instanceof ApiError
          ? {
              name: error.name,
              message: error.message,
              code: error.code,
              detail: error.detail
            }
          : error;
    } finally {
      loadingKey.value = '';
    }
  }

  const demos = computed<DemoItem[]>(() => [
    {
      key: 'get',
      title: 'GET request',
      description: 'Use the default response transform to unwrap data from a successful business response.',
      run: () => runDemo('get', () => api.get('/users', { params: { page: 1, keyword: 'alice' } }))
    },
    {
      key: 'post',
      title: 'POST request',
      description: 'Use URL-first post(url, data, config, options) syntax.',
      run: () => runDemo('post', () => api.post('/users/create', { name: 'Cindy', role: 'admin' }))
    },
    {
      key: 'businessError',
      title: 'Global custom exception',
      description: 'A failed business code is converted into ApiError by requestOptions.errorFactory.',
      run: () => runDemo('businessError', () => api.get('/business-error'))
    },
    {
      key: 'requestError',
      title: 'Per-request exception override',
      description: 'A single request can return its own Error from errorHandler.',
      run: () =>
        runDemo('requestError', () =>
          api.get('/business-error', undefined, {
            errorHandler(message, context) {
              return new ApiError(`Scoped handler: ${message}`, `SCOPED_${context.code}`, {
                url: context.response?.config.url
              });
            }
          })
        )
    },
    {
      key: 'utils',
      title: 'Utility functions',
      description: 'Import common type and value guards from the package root.',
      run: () =>
        runDemo('utils', async () => ({
          isString: isString('hello'),
          isEmpty: isEmpty({}),
          isUrl: isUrl('https://example.com')
        }))
    }
  ]);

  function formatResult(value: unknown) {
    return JSON.stringify(value, null, 2);
  }
</script>

<style scoped>
  .app {
    width: min(1120px, calc(100vw - 32px));
    margin: 0 auto;
    padding: 40px 0;
    color: #20242a;
    font-family:
      Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      sans-serif;
  }

  .page-header {
    margin-bottom: 24px;
  }

  .eyebrow {
    margin: 0 0 8px;
    color: #52616f;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0;
    text-transform: uppercase;
  }

  h1,
  h2,
  p {
    margin-top: 0;
  }

  h1 {
    margin-bottom: 0;
    font-size: 52px;
    line-height: 1;
  }

  .demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
  }

  .demo-card {
    display: grid;
    gap: 16px;
    align-content: start;
    min-height: 280px;
    padding: 18px;
    border: 1px solid #d9e1e8;
    border-radius: 8px;
    background: #ffffff;
    box-shadow: 0 12px 28px rgb(18 38 63 / 8%);
  }

  h2 {
    margin-bottom: 8px;
    font-size: 18px;
    line-height: 1.25;
  }

  .demo-card p {
    margin-bottom: 0;
    color: #52616f;
    font-size: 14px;
    line-height: 1.55;
  }

  .demo-button {
    width: 104px;
    min-height: 40px;
    border: 0;
    border-radius: 6px;
    background: #155eef;
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
  }

  .demo-button:disabled {
    background: #8aa7e9;
    cursor: wait;
  }

  pre {
    min-height: 120px;
    max-height: 260px;
    margin: 0;
    padding: 12px;
    overflow: auto;
    border-radius: 6px;
    background: #111827;
    color: #e5e7eb;
    font-size: 13px;
    line-height: 1.45;
    white-space: pre-wrap;
    word-break: break-word;
  }

  @media (max-width: 560px) {
    .app {
      width: min(100% - 24px, 1120px);
      padding: 24px 0;
    }

    .demo-card {
      min-height: 0;
    }

    h1 {
      font-size: 34px;
      line-height: 1.05;
    }
  }
</style>
