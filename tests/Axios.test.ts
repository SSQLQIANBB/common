import { describe, expect, it, vi } from 'vitest';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Axios } from '../packages/http/Axios';
import { ContentTypeEnum, type CreateAxiosOptions } from '../packages/http/types';

function createAdapter(handler: (config: AxiosRequestConfig) => AxiosResponse | Promise<AxiosResponse>) {
  return vi.fn(async (config: AxiosRequestConfig) => handler(config));
}

describe('Axios wrapper', () => {
  it('supports url-first get/post/patch helpers while preserving config-first calls', async () => {
    const adapter = createAdapter(config => ({
      data: { url: config.url, method: config.method, data: config.data },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: config as any
    }));
    const http = new Axios({ adapter });

    await expect(http.get('/users', { params: { page: 1 } })).resolves.toMatchObject({
      data: { url: '/users', method: 'get' }
    });
    await expect(http.post('/users', { name: 'alice' })).resolves.toMatchObject({
      data: { url: '/users', method: 'post', data: '{"name":"alice"}' }
    });
    await expect(http.patch({ url: '/users/1', data: { name: 'bob' } })).resolves.toMatchObject({
      data: { url: '/users/1', method: 'patch' }
    });
  });

  it('serializes form-url-encoded request data except for GET requests', async () => {
    const http = new Axios({ headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED } });

    expect(
      http.supportFormData({
        method: 'POST',
        data: { ids: [1, 2], name: 'alice' }
      }).data
    ).toBe('ids%5B%5D=1&ids%5B%5D=2&name=alice');

    expect(
      http.supportFormData({
        method: 'GET',
        data: { name: 'alice' }
      }).data
    ).toEqual({ name: 'alice' });
  });

  it('runs transform hooks and request catch hooks', async () => {
    const adapter = createAdapter(config => ({
      data: { ok: true, url: config.url },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: config as any
    }));
    const http = new Axios({
      adapter,
      requestOptions: { joinTime: false },
      transform: {
        beforeRequestHook(config, options) {
          expect(options.joinTime).toBe(false);
          return { ...config, url: `/api${config.url}` };
        },
        transformResponseHook(response) {
          return response.data;
        },
        requestCatchHook(error) {
          return Promise.reject(error);
        }
      }
    });

    await expect(http.get({ url: '/users' })).resolves.toEqual({ ok: true, url: '/api/users' });
  });

  it('keeps interceptors after reconfiguring axios', async () => {
    const seenHeaders: unknown[] = [];
    const adapter = createAdapter(config => {
      seenHeaders.push(config.headers);
      return {
        data: { ok: true },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: config as any
      };
    });
    const options: CreateAxiosOptions = {
      adapter,
      transform: {
        requestInterceptors(config) {
          config.headers = { ...config.headers, 'X-Test': '1' };
          return config;
        }
      }
    };
    const http = new Axios(options);

    await http.get({ url: '/before' });
    http.configAxios({ adapter });
    await http.get({ url: '/after' });

    expect(String(seenHeaders[0])).toContain('X-Test');
    expect(String(seenHeaders[1])).toContain('X-Test');
  });
});
