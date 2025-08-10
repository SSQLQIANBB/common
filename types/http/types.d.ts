import type { AxiosRequestConfig, AxiosResponse } from 'axios';
export interface RequestOptions {
    joinParamsToUrl?: boolean;
    formatDate?: boolean;
    isTransformResponse?: boolean;
    isReturnNativeResponse?: boolean;
    joinPrefix?: boolean;
    apiUrl?: string;
    urlPrefix?: string;
    joinTime?: boolean;
    ignoreCancelToken?: boolean;
    withToken?: boolean;
    errorHandler?: Function;
}
export interface Result<T = any> {
    code: string;
    type: 'success' | 'error' | 'warning';
    message: string;
    msg: string;
    body: T;
    data: T;
}
export declare enum ResultEnum {
    SUCCESS = "200",
    ASYNC_SUCCESS = "202",
    ERROR = "-1",
    TIMEOUT = "10042",
    TYPE = "success",
    CERT_VALID = "409-iam-cert-valid"
}
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
export interface CreateAxiosOptions extends AxiosRequestConfig {
    transform?: AxiosTransform;
    requestOptions?: RequestOptions;
}
export declare abstract class AxiosTransform<T = any, D = any> {
    beforeRequestHook?: (config: AxiosRequestConfig<D>, options: RequestOptions) => AxiosRequestConfig;
    requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;
    transformResponseHook?: (res: AxiosResponse<T>, options: RequestOptions) => any;
    requestInterceptors?: (config: CreateAxiosOptions, options: CreateAxiosOptions) => AxiosRequestConfig<D>;
    responseInterceptors?: (res: AxiosResponse<T, D>) => AxiosResponse<T, D>;
    requestInterceptorsCatch?: (err: Error) => void;
    responseInterceptorsCatch?: (err: Error) => void;
}
export type Recordable<T = any> = Record<string, T>;
