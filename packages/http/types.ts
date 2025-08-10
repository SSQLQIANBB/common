import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface RequestOptions {
  // Splicing request parameters to url
  joinParamsToUrl?: boolean;
  // Format request parameter time
  formatDate?: boolean;
  // Whether to process the request result
  isTransformResponse?: boolean;
  // Whether to return native response headers
  // For example: use this attribute when you need to get the response headers
  isReturnNativeResponse?: boolean;
  // Whether to join url
  joinPrefix?: boolean;
  // Interface address, use the default apiUrl if you leave it blank
  apiUrl?: string;
  // 请求拼接路径
  urlPrefix?: string;
  // Whether to add a timestamp
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  // Whether to send token in header
  withToken?: boolean;
  // error handle
  errorHandler?: Function
}

export interface Result<T = any> {
  code: string;
  type: 'success' | 'error' | 'warning';
  message: string;
  msg: string;
  body: T;
  data: T;
}

export enum ResultEnum {
  SUCCESS = '200',
  ASYNC_SUCCESS = '202',
  ERROR = '-1',
  TIMEOUT = '10042',
  TYPE = 'success',
  CERT_VALID = '409-iam-cert-valid'
}

export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // text
  TEXT = 'text/plain;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8'
}

export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export interface CreateAxiosOptions extends AxiosRequestConfig {
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
}

export abstract class AxiosTransform<T = any, D = any> {
  beforeRequestHook?: (config: AxiosRequestConfig<D>, options: RequestOptions) => AxiosRequestConfig;

  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;

  transformResponseHook?: (res: AxiosResponse<T>, options: RequestOptions) => any;

  requestInterceptors?: (config: CreateAxiosOptions, options: CreateAxiosOptions) => AxiosRequestConfig<D>;

  responseInterceptors?: (res: AxiosResponse<T, D>) => AxiosResponse<T, D>;

  requestInterceptorsCatch?: (err: Error) => void;

  responseInterceptorsCatch?: (err: Error) => void;
}

export type Recordable<T = any> = Record<string, T>;