import type {
  AxiosInstance,
  AxiosInterceptorOptions,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig
} from 'axios';
import axios from 'axios';
// import { AxiosCanceler } from './axiosCancel';
import qs from 'qs';

type CreateAxiosOptions = any;
type RequestOptions = any;
type Result = any;

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

const isFunction = (v: any): boolean => typeof v === 'function';

export class VAxios {
  private axiosInstance: AxiosInstance;

  private readonly options: CreateAxiosOptions;

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

    this.createAxios(config);
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

    const contentType = headers?.['Content-Type'] || headers?.['content-type'];

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    )
      return config;

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' })
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

  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options);
  }

  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options);
  }

  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options);
  }

  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options);
  }
  /**
   * @description Interceptor configuration
   */
  private setupInterceptors() {
    const transform = this.getTransform();

    if (!transform) return;

    const { requestInterceptors, requestInterceptorsCatch, responseInterceptors, responseInterceptorsCatch } =
      transform;

    // 待办：取消请求
    // const axiosCanceler = new AxiosCanceler();

    // Request interceptor configuration process
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig<any>) => {
        const {
          headers: { ignoreCancelToken }
        } = config;

        const ignoreCancel =
          ignoreCancelToken !== undefined ? ignoreCancelToken : this.options.requestOptions?.ignoreCancelToken;

        console.log(ignoreCancel);
        // if (!ignoreCancel) axiosCanceler.addPending(config);

        if (requestInterceptors && isFunction(requestInterceptors)) {
          config = requestInterceptors(config, this.options);
        }

        return config;
      },
      (err: any) => {
        if (requestInterceptorsCatch && isFunction(requestInterceptorsCatch)) return requestInterceptorsCatch(err);
      },
      {
        synchronous: false,
        runWhen: config => {
          console.log(config);
          return true;
        }
      } as AxiosInterceptorOptions
    );

    // Response result interceptor processing
    this.axiosInstance.interceptors.response.use(
      (res: AxiosResponse<any, any>) => {
        // if (res?.config) axiosCanceler.removePending(res.config);

        if (responseInterceptors && isFunction(responseInterceptors)) res = responseInterceptors(res);

        return res;
      },
      (err: any) => {
        if (responseInterceptorsCatch && isFunction(responseInterceptorsCatch)) return responseInterceptorsCatch(err);
      }
    );
  }
}
