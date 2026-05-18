import { isString } from '../utils';
import { formatRequestDate, joinTimestamp, setObjToUrlParams } from './helper';
import {
  RequestEnum,
  type CreateAxiosOptions,
  type AxiosTransform,
  type Result,
  type RequestOptions,
  ResultEnum
} from './types';
import type { AxiosResponse, AxiosRequestConfig } from 'axios';

export const axiosTransform: AxiosTransform = {
  transformResponseHook(res: AxiosResponse<Result>, options: RequestOptions) {
    const { isTransformResponse, isReturnNativeResponse } = options;

    if (isReturnNativeResponse) return res;

    if (!isTransformResponse) return res.data;

    const { data: responseData } = res;

    if (!responseData) {
      return '[HTTP] Request has no return value';
    }

    const { code, body, data, message, msg } = responseData;

    const successCodeArr: string[] = [ResultEnum.ASYNC_SUCCESS, ResultEnum.SUCCESS];
    const hasSuccess = responseData && Reflect.has(responseData, 'code') && successCodeArr.includes(code);

    if (hasSuccess) return data !== undefined ? data : body;

    let errorMsg = '';

    switch (code) {
      case ResultEnum.TIMEOUT:
        errorMsg = '请求超时';
        break;
      default:
        errorMsg = message || msg;
    }

    const messageText = errorMsg || '请求失败';
    const errorContext = {
      code,
      message: messageText,
      response: res,
      responseData,
      options
    };

    if (options.errorHandler) {
      const handledError = options.errorHandler(messageText, errorContext);
      if (handledError instanceof Error) throw handledError;
    } else {
      console.error(messageText);
    }

    throw options.errorFactory?.(messageText, errorContext) ?? new Error(messageText);
  },

  beforeRequestHook(config, options) {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;

    if (joinPrefix && urlPrefix) config.url = `${urlPrefix}${config.url}`;

    if (apiUrl && isString(apiUrl)) config.url = `${apiUrl}${config.url}`;

    const params = config.params || {};

    const data = config.data || null;

    formatDate && data && formatRequestDate(data);

    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        config.url = `${config.url}${params}${joinTimestamp(joinTime, true)}`;

        config.params = undefined;
      }
    } else if (!isString(params)) {
      formatDate && formatRequestDate(params);

      if (Reflect.has(config, 'data') && config.data) config.data = data;
      if (Reflect.has(config, 'params') && config.params) config.params = params;

      if (joinParamsToUrl) config.url = setObjToUrlParams(config.url!, { ...config.params, ...config.data });
    } else {
      config.url += params;
      config.params = undefined;
    }

    return config;
  },

  requestInterceptors(config: CreateAxiosOptions, options): AxiosRequestConfig {
    void options;

    const token =
      typeof globalThis !== 'undefined' && 'localStorage' in globalThis
        ? globalThis.localStorage?.getItem('token')
        : null;

    if (token && config?.requestOptions?.withToken !== false) {
      config.headers = config.headers || {};
      if ('set' in config.headers && typeof config.headers.set === 'function') {
        config.headers.set('Authtoken', token);
      } else {
        config.headers['Authtoken'] = token;
      }
    }

    return config;
  }
};
