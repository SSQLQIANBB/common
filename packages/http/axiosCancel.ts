import axios, { type AxiosRequestConfig, type Canceler } from 'axios';

import { isFunction } from '../utils';

let pendingMap = new Map<string, Canceler>();

export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&');

export class AxiosCanceler {
  addPending(config: AxiosRequestConfig) {
    this.removePending(config);

    let url = getPendingUrl(config);

    url = url.split('?')[0];
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel: Canceler) => {
        if (!pendingMap.has(url)) {
          pendingMap.set(url, cancel);
        }
      });
  }

  removePending(config: AxiosRequestConfig) {
    let url = getPendingUrl(config);

    url = url?.split('?')[0];
    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url);

      cancel && isFunction(cancel) && cancel(url);

      pendingMap.delete(url);
    }
  }

  removeAllPending() {
    pendingMap.forEach(cancel => {
      cancel && isFunction(cancel) && cancel();
    });

    pendingMap.clear();
  }

  reset(): void {
    pendingMap = new Map<string, Canceler>();
  }
}