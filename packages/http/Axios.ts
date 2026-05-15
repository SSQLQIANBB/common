import type {
  AxiosInstance,
  AxiosInterceptorOptions,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig
} from 'axios';
import axios from 'axios';
import { AxiosCanceler } from './axiosCancel';
import { isString } from '../utils';
import { ContentTypeEnum, RequestEnum, type CreateAxiosOptions, type RequestOptions, type Result } from './types';

const isFunction = (v: any): boolean => typeof v === 'function';

function stringifyFormUrlencoded(data: unknown): string {
  const pairs: string[] = [];

  const append = (key: string, value: unknown) => {
    if (value === undefined) return;

    if (value === null) {
      pairs.push(`${encodeURIComponent(key)}=`);
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(item => append(`${key}[]`, item));
      return;
    }

    if (typeof value === 'object') {
      Object.entries(value as Record<string, unknown>).forEach(([childKey, childValue]) => {
        append(`${key}[${childKey}]`, childValue);
      });
      return;
    }

    pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  };

  if (data && typeof data === 'object') {
    Object.entries(data as Record<string, unknown>).forEach(([key, value]) => append(key, value));
  }

  return pairs.join('&');
}

export class Axios {
  private axiosInstance: AxiosInstance;

  private options: CreateAxiosOptions;

  constructor(options: CreateAxiosOptions) {
    this.options = options;

    this.axiosInstance = axios.create(options);

    // 注册拦截器
    this.setupInterceptors();
  }

  /**
   * @description  create axios instance
   */
  private createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config);
  }

  /**
   * get transform options
   */
  private getTransform() {
    const { transform } = this.options;

    return transform;
  }

  /**
   * get instance
   */
  public getAxios() {
    return this.axiosInstance;
  }

  /**
   * @description Reconfigure axios
   */
  configAxios(config: CreateAxiosOptions) {
    if (!this.axiosInstance) return;

    this.options = {
      ...this.options,
      ...config,
      requestOptions: {
        ...this.options.requestOptions,
        ...config.requestOptions
      },
      transform: config.transform || this.options.transform
    };
    this.createAxios(this.options);
    this.setupInterceptors();
  }

  /**
   * @description set general header
   */
  setHeader(headers: any): void {
    if (!this.axiosInstance) return;

    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers;

    const contentType =
      typeof headers?.get === 'function'
        ? headers.get('Content-Type')
        : headers?.['Content-Type'] || headers?.['content-type'];

    if (
      !String(contentType || '').includes(ContentTypeEnum.FORM_URLENCODED) ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    )
      return config;

    return {
      ...config,
      data: stringifyFormUrlencoded(config.data)
    };
  }

  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: CreateAxiosOptions | null = config;

    const transform = this.getTransform();

    const { requestOptions } = this.options;

    const opt: RequestOptions = { ...requestOptions, ...options };

    const { beforeRequestHook, requestCatchHook, transformResponseHook } = transform || {};

    if (beforeRequestHook && isFunction(beforeRequestHook)) conf = beforeRequestHook(conf, opt);

    conf.requestOptions = opt;

    conf = this.supportFormData(conf);

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<Result, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformResponseHook && isFunction(transformResponseHook)) {
            try {
              const ret = transformResponseHook(res, opt);

              resolve(ret);
            } catch (err) {
              reject(err || new Error('request error!'));
            }

            return;
          }

          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt));

            return;
          }

          reject(e);
        });
    });
  }

  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;

  get<T = any>(url: string, config?: AxiosRequestConfig, options?: RequestOptions): Promise<T>;

  get<T = any>(configOrUrl: AxiosRequestConfig | string, configOrOptions?: AxiosRequestConfig | RequestOptions, options?: RequestOptions): Promise<T> {
    const config = isString(configOrUrl)
      ? ({ ...(configOrOptions as AxiosRequestConfig), url: configOrUrl } as AxiosRequestConfig)
      : configOrUrl;
    const requestOptions = isString(configOrUrl) ? options : (configOrOptions as RequestOptions);

    return this.request({ ...config, method: RequestEnum.GET }, requestOptions);
  }

  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig, options?: RequestOptions): Promise<T>;

  post<T = any>(
    configOrUrl: AxiosRequestConfig | string,
    dataOrOptions?: any,
    config?: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    const requestConfig = isString(configOrUrl)
      ? ({ ...config, url: configOrUrl, data: dataOrOptions } as AxiosRequestConfig)
      : configOrUrl;
    const requestOptions = isString(configOrUrl) ? options : (dataOrOptions as RequestOptions);

    return this.request({ ...requestConfig, method: RequestEnum.POST }, requestOptions);
  }

  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig, options?: RequestOptions): Promise<T>;

  put<T = any>(
    configOrUrl: AxiosRequestConfig | string,
    dataOrOptions?: any,
    config?: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    const requestConfig = isString(configOrUrl)
      ? ({ ...config, url: configOrUrl, data: dataOrOptions } as AxiosRequestConfig)
      : configOrUrl;
    const requestOptions = isString(configOrUrl) ? options : (dataOrOptions as RequestOptions);

    return this.request({ ...requestConfig, method: RequestEnum.PUT }, requestOptions);
  }

  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;

  delete<T = any>(url: string, config?: AxiosRequestConfig, options?: RequestOptions): Promise<T>;

  delete<T = any>(
    configOrUrl: AxiosRequestConfig | string,
    configOrOptions?: AxiosRequestConfig | RequestOptions,
    options?: RequestOptions
  ): Promise<T> {
    const config = isString(configOrUrl)
      ? ({ ...(configOrOptions as AxiosRequestConfig), url: configOrUrl } as AxiosRequestConfig)
      : configOrUrl;
    const requestOptions = isString(configOrUrl) ? options : (configOrOptions as RequestOptions);

    return this.request({ ...config, method: RequestEnum.DELETE }, requestOptions);
  }

  patch<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig, options?: RequestOptions): Promise<T>;

  patch<T = any>(
    configOrUrl: AxiosRequestConfig | string,
    dataOrOptions?: any,
    config?: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    const requestConfig = isString(configOrUrl)
      ? ({ ...config, url: configOrUrl, data: dataOrOptions } as AxiosRequestConfig)
      : configOrUrl;
    const requestOptions = isString(configOrUrl) ? options : (dataOrOptions as RequestOptions);

    return this.request({ ...requestConfig, method: 'PATCH' }, requestOptions);
  }
  /**
   * @description Interceptor configuration
   */
  private setupInterceptors() {
    const transform = this.getTransform();

    if (!transform) return;

    const { requestInterceptors, requestInterceptorsCatch, responseInterceptors, responseInterceptorsCatch } =
      transform;

    const axiosCanceler = new AxiosCanceler();

    // Request interceptor configuration process
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig<any>) => {
        const ignoreCancelToken = config.headers?.ignoreCancelToken;

        const ignoreCancel =
          ignoreCancelToken !== undefined ? ignoreCancelToken : this.options.requestOptions?.ignoreCancelToken;

        if (!ignoreCancel) axiosCanceler.addPending(config);

        if (requestInterceptors && isFunction(requestInterceptors)) {
          config = requestInterceptors(config, this.options) as InternalAxiosRequestConfig<any>;
        }

        return config;
      },
      (err: any) => {
        if (requestInterceptorsCatch && isFunction(requestInterceptorsCatch)) return requestInterceptorsCatch(err);

        return Promise.reject(err);
      },
      {
        synchronous: false,
        runWhen: () => true
      } as AxiosInterceptorOptions
    );

    // Response result interceptor processing
    this.axiosInstance.interceptors.response.use(
      (res: AxiosResponse<any, any>) => {
        if (res?.config) axiosCanceler.removePending(res.config);

        if (responseInterceptors && isFunction(responseInterceptors)) res = responseInterceptors(res);

        return res;
      },
      (err: any) => {
        if (err?.config) axiosCanceler.removePending(err.config);

        if (responseInterceptorsCatch && isFunction(responseInterceptorsCatch)) return responseInterceptorsCatch(err);

        return Promise.reject(err);
      }
    );
  }
}
