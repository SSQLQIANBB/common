import { Axios } from './Axios';
export { Axios } from './Axios';
export { axiosTransform } from './axiosTransform';
export * from './axiosCancel';
export * from './helper';
export * from './types';
export declare const http: Axios;
export declare const request: <T = any>(config: import("axios").AxiosRequestConfig, options?: import("./types").RequestOptions) => Promise<T>;
