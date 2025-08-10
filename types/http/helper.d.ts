import type { Recordable } from './types';
export declare function joinTimestamp<T extends boolean>(join: boolean, restful: T): T extends true ? string : object;
export declare function formatRequestDate(params: Recordable): void;
export declare function setObjToUrlParams(baseUrl: string, obj: any): string;
