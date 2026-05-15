import { describe, expect, it, vi } from 'vitest';
import { axiosTransform } from '../packages/http/axiosTransform';
import { RequestEnum, ResultEnum, type Result } from '../packages/http/types';

describe('axiosTransform', () => {
  it('returns native response or raw data when requested', () => {
    const response = { data: { code: ResultEnum.SUCCESS, data: { id: 1 } } };

    expect(axiosTransform.transformResponseHook!(response as any, { isReturnNativeResponse: true })).toBe(response);
    expect(axiosTransform.transformResponseHook!(response as any, { isTransformResponse: false })).toEqual(response.data);
  });

  it('unwraps successful data without treating falsey values as missing', () => {
    const dataResponse = { data: { code: ResultEnum.SUCCESS, data: 0, body: 1 } satisfies Result<number> };
    const bodyResponse = { data: { code: ResultEnum.ASYNC_SUCCESS, body: false } };

    expect(axiosTransform.transformResponseHook!(dataResponse as any, { isTransformResponse: true })).toBe(0);
    expect(axiosTransform.transformResponseHook!(bodyResponse as any, { isTransformResponse: true })).toBe(false);
  });

  it('throws and calls error handler for failed business codes', () => {
    const errorHandler = vi.fn();

    expect(() =>
      axiosTransform.transformResponseHook!(
        { data: { code: ResultEnum.ERROR, message: 'failed' } } as any,
        { isTransformResponse: true, errorHandler }
      )
    ).toThrow('failed');
    expect(errorHandler).toHaveBeenCalledWith('failed');
  });

  it('builds request urls, timestamps, formatted params and post query strings', () => {
    const getConfig = axiosTransform.beforeRequestHook!(
      {
        url: '/users',
        method: RequestEnum.GET,
        params: {
          name: '  alice  '
        }
      },
      { apiUrl: '/api', joinPrefix: true, urlPrefix: '/v1', joinTime: false, formatDate: true }
    );

    expect(getConfig.url).toBe('/api/v1/users');
    expect(getConfig.params).toEqual({ name: 'alice' });

    const postConfig = axiosTransform.beforeRequestHook!(
      {
        url: '/users',
        method: RequestEnum.POST,
        params: { role: 'admin' },
        data: { name: 'alice' }
      },
      { joinParamsToUrl: true, joinTime: false, formatDate: true }
    );

    expect(postConfig.url).toBe('/users?role=admin&name=alice');
  });

  it('does not require localStorage in non-browser runtimes', () => {
    const config = axiosTransform.requestInterceptors!({ headers: {}, requestOptions: { withToken: true } }, {} as any);

    expect(config.headers).toEqual({});
  });
});
