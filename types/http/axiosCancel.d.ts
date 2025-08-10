import { type AxiosRequestConfig } from 'axios';
export declare const getPendingUrl: (config: AxiosRequestConfig) => string;
export declare class AxiosCanceler {
    addPending(config: AxiosRequestConfig): void;
    removePending(config: AxiosRequestConfig): void;
    removeAllPending(): void;
    reset(): void;
}
