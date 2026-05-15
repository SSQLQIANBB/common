import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { type CreateAxiosOptions, type RequestOptions } from './types';
export declare class Axios {
    private axiosInstance;
    private options;
    constructor(options: CreateAxiosOptions);
    /**
     * @description  create axios instance
     */
    private createAxios;
    /**
     * get transform options
     */
    private getTransform;
    /**
     * get instance
     */
    getAxios(): AxiosInstance;
    /**
     * @description Reconfigure axios
     */
    configAxios(config: CreateAxiosOptions): void;
    /**
     * @description set general header
     */
    setHeader(headers: any): void;
    supportFormData(config: AxiosRequestConfig): AxiosRequestConfig<any>;
    request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    patch<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    /**
     * @description Interceptor configuration
     */
    private setupInterceptors;
}
