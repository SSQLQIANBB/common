import type { AxiosInstance, AxiosRequestConfig } from 'axios';
type CreateAxiosOptions = any;
type RequestOptions = any;
export declare enum ContentTypeEnum {
    JSON = "application/json;charset=UTF-8",
    TEXT = "text/plain;charset=UTF-8",
    FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
    FORM_DATA = "multipart/form-data;charset=UTF-8"
}
export declare enum RequestEnum {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}
export declare class Axios {
    private axiosInstance;
    private readonly options;
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
    post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    /**
     * @description Interceptor configuration
     */
    private setupInterceptors;
}
export {};
