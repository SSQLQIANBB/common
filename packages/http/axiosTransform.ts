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

    if (hasSuccess) return data || body;

    let errorMsg = '';

    switch (code) {
      case ResultEnum.TIMEOUT:
        errorMsg = '请求超时';
        break;
      default:
        errorMsg = message || msg;
    }


    if (options.errorHandler) {
      options.errorHandler(errorMsg);
    } else {
      console.error(errorMsg);
    }
    throw new Error(errorMsg || '请求失败');
  },

  beforeRequestHook(config, options) {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;

    if (joinPrefix) config.url = `${urlPrefix}${config.url}`;

    if (apiUrl && isString(apiUrl)) config.url = `${apiUrl}${config.url}`;

    const params = config.params || {};

    const data = config.data || null;

    formatDate && data && formatRequestDate(data);

    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
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

  /**
   * @description 请求拦截
   */
  requestInterceptors(config: CreateAxiosOptions, options): AxiosRequestConfig {
    console.log(options);
    // 暂定localStorage获取token, 补充store后调整；
    const token = localStorage.getItem('token');

    if (token && config?.requestOptions?.withToken !== false) {
      config.headers!['Authtoken'] = token;
    }

    return config;
  }
  // requestInterceptorCatch(err: Error) {},
  /**
   * @description 响应拦截处理
   */
  // responseInterceptors(res) {},
  // responseInterceptorsCatch(err: Error) {
  //   // 处理错误请求
  // }
};